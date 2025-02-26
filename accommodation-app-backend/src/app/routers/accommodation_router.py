from fastapi import APIRouter, Depends
from typing import List, Optional
from sqlalchemy.orm import Session
from src.app.database.database import get_database_session
from src.app.services.accommodation_service import AccommodationService
from src.app.schemas.accommodation_schemas import AccommodationCreateSchema, AccommodationSchema, MessageResponse

router = APIRouter(prefix="/acomodacoes", tags=["Acomodações"])

def get_accommodation_service(db: Session = Depends(get_database_session)):
    return AccommodationService(db)

@router.post("/create", response_model=MessageResponse)
async def create_accommodation(accommodation: AccommodationCreateSchema, service: AccommodationService = Depends(get_accommodation_service)):
    return service.create(accommodation)

@router.post("/create_multiple", response_model=MessageResponse)
async def create_multiple_accommodations(accommodation_list: List[AccommodationCreateSchema], service: AccommodationService = Depends(get_accommodation_service)):
    return service.create_multiple(accommodation_list)

@router.get("/{id}", response_model=AccommodationSchema)
async def get_accommodation_by_id(id: int, service: AccommodationService = Depends(get_accommodation_service)):
    return service.get_by_id(id)

@router.get("/", response_model=List[AccommodationSchema])
async def list_accommodations(service: AccommodationService = Depends(get_accommodation_service), location: Optional[str] = None):
    return service.list(location)
