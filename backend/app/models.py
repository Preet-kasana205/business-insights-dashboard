from sqlalchemy import Column, Integer, String, TIMESTAMP, func
from app.database import Base


class Listing(Base):
    __tablename__ = "listing_master"

    id = Column(Integer, primary_key=True, index=True)
    business_name = Column(String(255), nullable=False)
    category = Column(String(100))
    city = Column(String(100))
    address = Column(String(500))
    phone = Column(String(20))
    source = Column(String(100))
    created_at = Column(TIMESTAMP, server_default=func.now())