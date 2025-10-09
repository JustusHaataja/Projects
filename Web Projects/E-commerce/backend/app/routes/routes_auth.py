from fastapi import APIRouter, Depends, HTTPException, Response, Cookie, status
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