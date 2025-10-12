from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Product as ProductModel
from ..schemas import Product
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
def get_products(db: Session = Depends(get_db),
                 skip: int = Query(0, ge=0),
                 limit: int = Query(20, le=100),
                 category_id: int | None = None,
                 search: str | None = None,
                 min_price: float | None = None,
                 max_price: float | None = None
                ):
    query = db.query(ProductModel)

    # Define current prices
    if not ProductModel.sale_price:
        price = ProductModel.price
    else:
        price = ProductModel.sale_price

    if category_id:
        query = query.filter(ProductModel.category_id == category_id)
    if search:
        query = query.filter(ProductModel.name.ilike(f"%{search}%"))
    if min_price is not None:
        query = query.filter(price >= min_price)
    if max_price is not None:
        query = query.filter(price <= max_price)

    products = query.offset(skip).limit(limit).all()

    return products


@router.get("/{product_id}", response_model=Product)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(ProductModel).filter(ProductModel.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
            )
    return product