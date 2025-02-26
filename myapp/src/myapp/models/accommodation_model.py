from sqlalchemy import Column, Integer, Float, String
from src.myapp.database.database import Base

class Accommodation(Base):
    __tablename__ = 'accommodations'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    image = Column(String)
    price_night = Column(Float)
    location = Column(String, index=True)