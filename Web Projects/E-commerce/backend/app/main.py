from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
import models, database, crud, schemas
from routes import routes_auth, routes_products, routes_cart
from database import engine, get_db, SessionLocal
from apscheduler.schedulers.background import BackgroundScheduler
from background_tasks import clean_old_guests
from fastapi.middleware.cors import CORSMiddleware


models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="E-commerce Backend")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes_auth.router, prefix="/auth")
app.include_router(routes_products.router, prefix="/products")
app.include_router(routes_cart.router, prefix="/cart")

@app.get("/products")
def get_products(db: Session = Depends(get_db)):
    return db.query(models.Product).all()


# ---- Users ----
# @app.post("/users/", response_model=schemas.UserOut)
# def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
#     db_user = crud.get_user_by_email(db, email=user.email)
#     if db_user:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Email already registered"
#             )
#     return crud.create_user(db, name=user.name, email=user.email, password=user.password)


# ---- Cart ----
# @app.post("/cart/", response_model=schemas.CartItem)
# def add_to_cart(item: schemas.CartItemCreate, user_id: int, db: Session = Depends(database.get_db)):
#     return crud.add_to_cart(db, user_id=user_id, product_id=item.product_id, quantity=item.quantity)


# @app.get("/cart/", response_model=list[schemas.CartItem])
# def get_cart(user_id: int, db: Session = Depends(database.get_db)):
#     return crud.get_cart_items(db, user_id=user_id)


# @app.delete("/cart/{cart_item_id}", response_model=schemas.CartItem)
# def remove_cart_item(cart_item_id: int, db: Session = Depends(database.get_db)):
#     item = crud.remove_from_cart(db, cart_item_id)
#     if not item:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Item not found"
#             )
#     return item


# ---- Background tasks ----
scheduler = BackgroundScheduler()

def scheduled_guest_cleanup():
    db = SessionLocal()
    try:
        count = clean_old_guests(db)
        if count > 0:
            print(f"[CLEANUP] Removed {count} old guest cart items.")
    finally:
        db.close()

scheduler.add_job(scheduled_guest_cleanup, "interval", hours=48)    # clean up every other day
scheduler.start()