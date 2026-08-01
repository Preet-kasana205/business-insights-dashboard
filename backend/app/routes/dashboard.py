from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import crud

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/total")
def total_listings(db: Session = Depends(get_db)):
    return {"total": crud.get_total_count(db)}


@router.get("/city-wise")
def city_wise(db: Session = Depends(get_db)):
    return crud.get_city_wise_count(db)


@router.get("/category-wise")
def category_wise(db: Session = Depends(get_db)):
    return crud.get_category_wise_count(db)


@router.get("/source-wise")
def source_wise(db: Session = Depends(get_db)):
    return crud.get_source_wise_count(db)