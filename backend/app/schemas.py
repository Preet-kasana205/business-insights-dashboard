from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ListingBase(BaseModel):
    business_name: str
    category: Optional[str] = None
    city: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    source: Optional[str] = None


class ListingCreate(ListingBase):
    pass


class ListingOut(ListingBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True