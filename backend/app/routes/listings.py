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

@router.get("/latest", response_model=list[ListingOut])
def latest_listings(limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_latest_listings(db, limit)