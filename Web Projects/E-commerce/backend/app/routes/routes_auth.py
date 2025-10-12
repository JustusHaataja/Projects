from fastapi import APIRouter, Depends, HTTPException, Response, Cookie, status
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import User, CartItem
from ..auth import hash_password, verify_password, create_jwt, verify_jwt
from ..schemas import UserCreate, UserLogin

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---- Helper ----
def get_current_user(access_token: str | None = Cookie(None), db: Session = Depends(get_db)):
    if not access_token:
        return None     # treat as anonymous; routes can raise if auth required
    
    user_id = verify_jwt(access_token)
    if not user_id:
        return None
    
    user = db.query(User).get(user_id)
    return user


# ---- Routes ----
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    exists = db.query(User).filter(User.email == user.email).first()

    if exists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    hashed = hash_password(user.password)
    new_user = User(name = user.name,
                    email = user.email,
                    password_hash = hashed)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered succesfully"}


@router.post("/login")
def login(credentials: UserLogin, response: Response,
          guest_id: str | None = Cookie(None), db: Session = Depends(get_db)):
    # Verify user by email
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user or not verify_password(credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # create JWT and set cookie
    token = create_jwt(user.id)
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age= 60 * 60 * 24 * 7
    )

    # Merge guest cart into user's cart if guest_id exists
    if guest_id:
        guest_items = db.query(CartItem).filter(CartItem.guest_id == guest_id).all()
        
        if guest_items:
            for g in guest_items:
                existing = db.query(CartItem).filter(
                    CartItem.user_id == user.id,
                    CartItem.product_id == g.product_id
                ).first()
                if existing:
                    existing.quantity += g.quantity
                    db.delete(g)
                else:
                    g.user_id = user.id
                    g.guest_id = None
            db.commit()
        
        # remove guest_id cookie after merge
        response.delete_cookie("guest_id")

    return {"message": "Logged in succesfully"}


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out"}
