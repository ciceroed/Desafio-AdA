from pydantic import BaseModel
from typing import List

class AccommodationCreateSchema(BaseModel):
    name: str
    image: str
    price_night: float
    location: str

class AccommodationSchema(AccommodationCreateSchema):
    id: int

    class Config:
        orm_mode = True

class MessageResponse(BaseModel):
    message: str
