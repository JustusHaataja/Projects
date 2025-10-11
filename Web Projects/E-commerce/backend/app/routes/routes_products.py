from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Product as ProductModel
from schemas import Product
from typing import List


router = APIRouter(tags=["Products"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---- Routes ----
@router.get("/", response_model=List[Product])
def get_products(db: Session = Depends(get_db)):
    return db.query(ProductModel).all()


@router.get("/{product_id}", response_model=Product)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(ProductModel).filter(ProductModel.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
            )
    return product