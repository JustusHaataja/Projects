from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, database, crud, schemas
from routes import routes_auth
from .database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="E-commerce Backend")
app.include_router(routes_auth.router, prefix="/auth")

@app.get("/products")
def get_products(db: Session = Depends(get_db)):
    return db.query(models.Product).all()


# ---- Users ----
@app.post("/users/", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db, name=user.name, email=user.email, password=user.password)


# ---- Cart ----
@app.post("/cart/", response_model=schemas.CartItemOut)
def add_to_cart(item: schemas.CartItemCreate, user_id: int, db: Session = Depends(database.get_db)):
    return crud.add_to_cart(db, user_id=user_id, product_id=item.product_id, quantity=item.quantity)


@app.get("/cart/", response_model=list[schemas.CartItemOut])
def get_cart(user_id: int, db: Session = Depends(database.get_db)):
    return crud.get_cart_items(db, user_id=user_id)


@app.delete("/cart/{cart_item_id}", response_model=schemas.CartItemOut)
def remove_cart_item(cart_item_id: int, db: Session = Depends(database.get_db)):
    item = crud.remove_from_cart(db, cart_item_id)
    if not item:
        raise HTTPException(status_code=400, detail="Item not found")
    return item