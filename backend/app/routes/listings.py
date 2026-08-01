from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import ListingCreate, ListingOut
from app import crud

router = APIRouter(prefix="/listings", tags=["Listings"])


@router.post("/", response_model=ListingOut)
def add_listing(listing: ListingCreate, db: Session = Depends(get_db)):
    return crud.create_listing(db, listing)


@router.get("/", response_model=list[ListingOut])
def read_listings(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_listings(db, skip, limit)