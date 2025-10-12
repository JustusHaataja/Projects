from fastapi import APIRouter, Depends, HTTPException, Response, status, Cookie
from sqlalchemy.orm import Session
from .routes_auth import get_current_user
from ..database import SessionLocal
from ..models import CartItem, Product
from typing import Optional
from datetime import datetime, timezone
import uuid


router = APIRouter(tags=["Cart"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---- Helper functions ----
def get_or_create_guest(response: Response, guest_id: Optional[str]) -> str:
    if not guest_id:
        guest_id = str(uuid.uuid4())
        response.set_cookie(
            key="guest_id",
            value=guest_id,
            httponly=True,
            secure=True,
            samesite="lax",
            max_age= 60 * 60 * 24 * 14
        )
    return guest_id


def cart_filter(current_user, guest_id: Optional[str]):
    if current_user:
        return (CartItem.user_id == current_user.id)
    return (CartItem.guest_id == guest_id)


# ---- Routes ----
@router.get("/", summary="View cart")
def view_cart(response: Response, current_user = Depends(get_current_user),
              guest_id: Optional[str] = Cookie(None), db: Session = Depends(get_db)):
    # ensure guest cookie exists for anonymous users
    if not current_user:
        guest_id = get_or_create_guest(response, guest_id)

    items = db.query(CartItem).filter(cart_filter(current_user, guest_id)).all()
    result = [{"product_id": it.product_id, "quantity": it.quantity} for it in items]

    return {"cart": result}


@router.post("/add", summary="Add item to cart")
def add_to_cart(product_id: int, response: Response, quantity: int = 1,
                current_user = Depends(get_current_user), 
                guest_id: Optional[str] = Cookie(None),
                db: Session = Depends(get_db)):
    
    if quantity <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Quantity must be positive"
        )
    
    # Check if product exists
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
            )
    
    if not current_user:
        guest_id = get_or_create_guest(response, guest_id)

    existing = db.query(CartItem).filter(
        cart_filter(current_user, guest_id),
        CartItem.product_id == product_id
    ).first()

    if existing:
        existing.quantity += quantity
        existing.updated_at = datetime.now(timezone.utc)
    else:
        db.add(CartItem(
            user_id = current_user.id if current_user else None,
            guest_id = None if current_user else guest_id,
            product_id = product_id,
            quantity = quantity,
            created_at = datetime.now(timezone.utc),
            updated_at = datetime.now(timezone.utc)
        ))

    db.commit()
    return {"message": "Added to cart"}


@router.put("/update", summary="Update item quantity")
def update_cart(product_id: int, response: Response, quantity: int,
                current_user = Depends(get_current_user), guest_id: Optional[str] = Cookie(None),
                db: Session = Depends(get_db)):
    
    if quantity <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Quantity must be positive"
            )
    
    if not current_user:
        guest_id = get_or_create_guest(response, guest_id)

    item = db.query(CartItem).filter(
        cart_filter(current_user, guest_id),
        CartItem.product_id == product_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item no in cart"
            )
    
    item.quantity = quantity
    item.updated_at = datetime.now(timezone.utc)
    db.commit()
    return {"message": "Cart updated"}


@router.delete("/remove", summary="Remove item from cart")
def remove_from_cart(product_id: int, response: Response, current_user = Depends(get_current_user),
                    guest_id: Optional[str] = Cookie(None), db: Session = Depends(get_db)):
    
    if not current_user:
        guest_id = get_or_create_guest(response, guest_id)

    item = db.query(CartItem).filter(
        cart_filter(current_user, guest_id),
        CartItem.product_id == product_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not in cart"
        )
    
    db.delete(item)
    db.commit()
    return {"message": "Removed from cart"}