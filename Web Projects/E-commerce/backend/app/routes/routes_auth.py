from fastapi import APIRouter, Depends, HTTPException, Response, Cookie, status, Request
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from auth import hash_password, verify_password, create_jwt, verify_jwt
from schemas import UserCreate, UserLogin
import sqlalchemy

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    query = sqlalchemy.text("SELECT * FROM users WHERE email = :email")
    result = db.execute(query, {"email": user.email}).fetchone()
    if result:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
            )
    
    hashed = hash_password(user.password)
    insert = sqlalchemy.text("INSERT INTO users (name,email,password_hash) VALUES (:name,:email,:password)")
    db.execute(insert, {"name": user.name, "email": user.email, "password": hashed})
    db.commit()
    return {"message": "User registered succesfully"}


@router.post("/login")
def login(user: UserLogin, response: Response, db: Session = Depends(get_db)):
    query = sqlalchemy.text("SELECT * FROM users WHERE email = :email")
    result = db.execute(query, {"email": user.email}).fetchone()
    if not result or not verify_password(user.password, result.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
            )
    
    token = create_jwt(result.id)
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=3600*24*7
        )
    return {"message": "Logged in succesfully"}


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out"}


def get_current_user(access_token: str = Cookie(None), db: Session = Depends(get_db)):
    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing access token"
            )
    
    user_id = verify_jwt(access_token)
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
            )
    
    query = sqlalchemy.text("SELECT * FROM users WHERE id = :id")
    user = db.execute(query, {"id": user_id}).fetchone()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return user