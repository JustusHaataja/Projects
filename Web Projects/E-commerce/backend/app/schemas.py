from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str   # Plain text input, we will hash it


class UserLogin(BaseModel):
    email: str
    password: str

    
class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        orm_mode = True


class CartItemCreate(BaseModel):
    product_id: int
    quantity: int

class CartItemOut(BaseModel):
    id: int
    user_id: int
    product_id: int
    quantity: int

    class Config:
        orm_mode = True
