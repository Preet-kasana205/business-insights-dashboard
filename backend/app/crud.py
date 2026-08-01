from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models import Listing
from app.schemas import ListingCreate


def create_listing(db: Session, listing: ListingCreate):
    db_listing = Listing(**listing.model_dump())
    db.add(db_listing)
    db.commit()
    db.refresh(db_listing)
    return db_listing


def get_listings(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Listing).offset(skip).limit(limit).all()


def get_city_wise_count(db: Session):
    results = (
        db.query(Listing.city, func.count(Listing.id).label("count"))
        .group_by(Listing.city)
        .all()
    )
    return [{"city": city, "count": count} for city, count in results]


def get_category_wise_count(db: Session):
    results = (
        db.query(Listing.category, func.count(Listing.id).label("count"))
        .group_by(Listing.category)
        .all()
    )
    return [{"category": category, "count": count} for category, count in results]


def get_source_wise_count(db: Session):
    results = (
        db.query(Listing.source, func.count(Listing.id).label("count"))
        .group_by(Listing.source)
        .all()
    )
    return [{"source": source, "count": count} for source, count in results]

def get_total_count(db: Session):
    return db.query(func.count(Listing.id)).scalar()

def get_latest_listings(db: Session, limit: int = 10):
    return (
        db.query(Listing)
        .order_by(Listing.id.desc())
        .limit(limit)
        .all()
    )