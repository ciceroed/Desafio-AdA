from sqlalchemy.orm import Session
from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError
from src.myapp.repositories.accommodation_repository import AccommodationRepository
from src.myapp.schemas.accommodation_schemas import AccommodationCreateSchema

class AccommodationService:
    def __init__(self, db: Session):
        self.repository = AccommodationRepository(db)

    def create(self, accommodation: AccommodationCreateSchema):
        try:
            return self.repository.create(accommodation)
        except SQLAlchemyError as e:
            raise HTTPException(status_code=500, detail=f"Accommodation creation failed: {str(e)}")

    def create_multiple(self, accommodation_list: list[AccommodationCreateSchema]):
        try:
            return self.repository.create_multiple(accommodation_list)
        except SQLAlchemyError as e:
            raise HTTPException(status_code=500, detail=f"Accommodations creation failed: {str(e)}")

    def get_by_id(self, id: int):
        accommodation = self.repository.get_by_id(id)
        if not accommodation:
            raise HTTPException(status_code=404, detail="Accommodation not found")
        return accommodation

    def list(self, location: str = None):
        accommodations = self.repository.list(location)
        if not accommodations:
            raise HTTPException(status_code=404, detail="No accommodation found")
        return accommodations
