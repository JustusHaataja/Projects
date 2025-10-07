from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, database
from .database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="E-commerce Backend")

@app.get("/products")
def get_products(db: Session = Depends(get_db)):
    return db.query(models.Product).all()