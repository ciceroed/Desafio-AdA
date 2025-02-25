from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List, Optional
from sqlalchemy.orm import Session
from pydantic import BaseModel
from src.myapp import models
from src.myapp.database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import SQLAlchemyError

app = FastAPI()

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
)

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

def get_database_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close

db_session = Annotated[Session, Depends(get_database_session)]

models.Base.metadata.create_all(bind=engine)

@app.post("/acomodacoes/create", response_model=AccommodationSchema)
async def create_accommodation(accommodation: AccommodationCreateSchema, db: db_session):
    try:
        new_accommodation = models.Accommodation(**accommodation.dict())
        db.add(new_accommodation)
        db.commit()
        db.refresh(new_accommodation)
        return new_accommodation
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao criar acomodação: {str(e)}")
    
@app.post("/acomodacoes/create_multiple", response_model=MessageResponse)
async def create_multiple_accommodation(accommodation_list: List[AccommodationCreateSchema], db: db_session):
    for accommodation in accommodation_list:    
        try:
            new_accommodation = models.Accommodation(**accommodation.dict())
            db.add(new_accommodation)
            db.commit()
            db.refresh(new_accommodation)
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=f"Erro ao criar acomodação: {str(e)}")
    return {"message": "Acomodações cadastradas com sucesso"}

@app.get("/acomodacoes/{id}")
async def get_accommodation_by_id(id: int, db: db_session):
    accommodation = db.query(models.Accommodation).filter(models.Accommodation.id == id).first()

    if not accommodation:
        raise HTTPException(status_code=404, detail="Acomodação não encontrada")

    return accommodation

@app.get("/acomodacoes", response_model=List[AccommodationSchema])
async def list_accommodations(
    db: db_session,
    location: Optional[str] = None  # Localização opcional
):
    query = db.query(models.Accommodation)

    if location:
        query = query.filter(models.Accommodation.location == location)

    accommodations = query.all()

    if not accommodations:
        raise HTTPException(status_code=404, detail="Nenhuma acomodação encontrada")

    return accommodations