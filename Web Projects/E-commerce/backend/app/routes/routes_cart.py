from fastapi import APIRouter, Depends, HTTPException, Response, status, Cookie
from sqlalchemy.orm import Session
from routes.routes_auth import get_current_user
from database import get_db
from models import CartItem, Product
from typing import Optional
import uuid

router = APIRouter(tags=["Cart"])

# ---- Helper: Set Cookie Safely ----
def ensure_guest_id(response: Response, guest_id: Optional[str]) -> str:
    if not guest_id:
        new_guest_id = str(uuid.uuid4())
        response.set_cookie(
            key="guest_id",
            value=new_guest_id,
            httponly=True,          # JavaScript cannot access it (security)
            max_age=60*60*24*30,    # 30 days
            samesite="lax",         # Allows localhost communication
            secure=False            # MUST be False for localhost (HTTP)
        )
        return new_guest_id
    return guest_id

# ---- Routes ----

@router.get("/", summary="View cart")
def view_cart(
    response: Response,
    current_user = Depends(get_current_user),
    guest_id: Optional[str] = Cookie(None),
    db: Session = Depends(get_db)
):
    # Ensure guest_id exists even on view (so we track them immediately)
    final_guest_id = ensure_guest_id(response, guest_id)

    if current_user:
        return db.query(CartItem).filter(CartItem.user_id == current_user.id).all()
    else:
        return db.query(CartItem).filter(CartItem.guest_id == final_guest_id).all()


@router.post("/add", summary="Add item to cart")
def add_to_cart(
    product_id: int, 
    response: Response, 
    quantity: int = 1,
    current_user = Depends(get_current_user),
    guest_id: Optional[str] = Cookie(None),
    db: Session = Depends(get_db)
):
    final_guest_id = ensure_guest_id(response, guest_id)

    # Check if product exists
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # Find existing cart item
    query = db.query(CartItem)
    if current_user:
        query = query.filter(CartItem.user_id == current_user.id)
    else:
        query = query.filter(CartItem.guest_id == final_guest_id)
    
    cart_item = query.filter(CartItem.product_id == product_id).first()

    if cart_item:
        cart_item.quantity += quantity
    else:
        new_item = CartItem(
            product_id=product_id,
            quantity=quantity,
            user_id=current_user.id if current_user else None,
            guest_id=None if current_user else final_guest_id
        )
        db.add(new_item)
    
    db.commit()
    return {"message": "Item added", "guest_id": final_guest_id}


@router.delete("/remove/{product_id}", summary="Remove item")
def remove_from_cart(
    product_id: int,
    response: Response,
    current_user = Depends(get_current_user),
    guest_id: Optional[str] = Cookie(None),
    db: Session = Depends(get_db)
):
    final_guest_id = ensure_guest_id(response, guest_id)

    query = db.query(CartItem)
    if current_user:
        query = query.filter(CartItem.user_id == current_user.id)
    else:
        query = query.filter(CartItem.guest_id == final_guest_id)

    cart_item = query.filter(CartItem.product_id == product_id).first()

    if not cart_item:
        raise HTTPException(status_code=404, detail="Item not found in cart")

    db.delete(cart_item)
    db.commit()
    return {"message": "Item removed"}


@router.put("/update/{product_id}", summary="Update quantity")
def update_quantity(
    product_id: int,
    quantity: int,
    response: Response,
    current_user = Depends(get_current_user),
    guest_id: Optional[str] = Cookie(None),
    db: Session = Depends(get_db)
):
    final_guest_id = ensure_guest_id(response, guest_id)

    query = db.query(CartItem)
    if current_user:
        query = query.filter(CartItem.user_id == current_user.id)
    else:
        query = query.filter(CartItem.guest_id == final_guest_id)

    cart_item = query.filter(CartItem.product_id == product_id).first()

    if not cart_item:
        raise HTTPException(status_code=404, detail="Item not found")

    if quantity <= 0:
        db.delete(cart_item)
    else:
        cart_item.quantity = quantity
    
    db.commit()
    return {"message": "Cart updated"}