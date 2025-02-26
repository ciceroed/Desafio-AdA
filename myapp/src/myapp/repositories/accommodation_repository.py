from sqlalchemy.orm import Session
from src.myapp.models.accommodation_model import Accommodation
from src.myapp.schemas.accommodation_schemas import AccommodationCreateSchema

class AccommodationRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, accommodation: AccommodationCreateSchema):
        new_accommodation = Accommodation(**accommodation.dict())
        self.db.add(new_accommodation)
        self.db.commit()
        self.db.refresh(new_accommodation)
        return {"message": "Accommodation succesfully created"}

    def create_multiple(self, accommodation_list: list[AccommodationCreateSchema]):
        accommodations = [Accommodation(**accommodation.dict()) for accommodation in accommodation_list]
        self.db.add_all(accommodations)
        self.db.commit()
        return {"message": "Accommodations succesfully created"}

    def get_by_id(self, id: int):
        return self.db.query(Accommodation).filter(Accommodation.id == id).first()

    def list(self, location: str = None):
        query = self.db.query(Accommodation)
        if location:
            query = query.filter(Accommodation.location == location)
        return query.all()
