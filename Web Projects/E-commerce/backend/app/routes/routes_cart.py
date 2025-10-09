from fastapi import APIRouter, Depends, HTTPException, Response, status, Cookie
from sqlalchemy.orm import Session
from database import SessionLocal, get_db
from routes_auth import get_current_user
from models import CartItem, Product
import uuid


router = APIRouter()

def get_db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Helper functions
def get_or_create_guest(response: Response, guest_id: str = Cookie(None)):
    if not guest_id:
        guest_id = str(uuid.uuid4())
        response.set_cookie(
            key="guest_id",
            value=guest_id,
            httponly=True,
            secure=True,
            samesite="lax",
            max_age=30*24*60*60
        )
    return guest_id


@router.get("/cart")
def view_cart(response: Response, current_user = Depends(get_current_user),
              guest_id: str = Cookie(None), db: Session = Depends(get_db)):
    
    if current_user:
        items = db.query(CartItem).filter(CartItem.user_id == current_user.id).all()
    else:
        guest_id = get_or_create_guest(response, guest_id)
        items = db.query(CartItem).filter(CartItem.guest_id == guest_id).all()

    return {"cart": [{"product_id": item.product_id, "quantity": item.quantity} for item in items]}


@router.post("/cart/add")
def add_to_cart(product_id: int, response: Response, quantity: int = 1,
                current_user = Depends(get_current_user), guest_id: str = Cookie(None),
                db: Session = Depends(get_db)
                ):
    
    # Check if product exists
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
            )
    
    if current_user:
        item = db.query(CartItem).filter(
            CartItem.user_id == current_user.id, CartItem.product_id == product_id
        ).first()
    else:
        guest_id = get_or_create_guest(response, guest_id)
        item = db.query(CartItem).filter(
            CartItem.guest_id == guest_id, CartItem.product_id == product_id
        ).first()

    if item:
        item.quantity += quantity
    else:
        new_item = CartItem(
            product_id = product_id,
            quantity = quantity,
            user_id = current_user.id if current_user else None,
            guest_id = None if current_user else guest_id
        )
        db.add(new_item)

    db.commit()
    return {"message": "Added to cart"}


@router.put("cart/update")
def update_cart(product_id: int, response: Response, quantity: int,
                current_user = Depends(get_current_user), guest_id: str = Cookie(None),
                db: Session = Depends(get_db)
                ):
    
    if quantity <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Quantity must be positive"
            )
    
    if current_user:
        item = db.query(CartItem).filter(
            CartItem.user_id == current_user.id, CartItem.product_id == product_id
        ).first()
    else:
        guest_id = get_or_create_guest(response, guest_id)
        item = db.query(CartItem).filter(
            CartItem.guest_id == guest_id, CartItem.product_id == product_id
        ).first()

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item no in cart"
            )
    
    item.quantity = quantity
    db.commit()
    return {"message": "Cart updated"}


@router.delete("/cart/remove")
def remove_from_cart(product_id: int, response: Response, current_user = Depends(get_current_user),
                    guest_id: str = Cookie(None), db: Session = Depends(get_db)
                    ):
    
    if current_user:
        item = db.query(CartItem).filter(
            CartItem.user_id == current_user.id, CartItem.product_id == product_id
        ).first()
    else:
        guest_id = get_or_create_guest(response, guest_id)
        item = db.query(CartItem).filter(
            CartItem.guest_id == guest_id, CartItem.product_id == product_id
        ).first()

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not in cart"
        )
    
    db.delete(item)
    db.commit()
    return {"message": "Removed from cart"}