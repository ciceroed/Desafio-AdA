from fastapi import FastAPI
from sqlalchemy.orm import Session
from src.app.database.database import engine, SessionLocal
from src.app.models import accommodation_model
from src.app.models.accommodation_model import Accommodation
from src.app.schemas.accommodation_schemas import AccommodationCreateSchema
from src.app.repositories.accommodation_repository import AccommodationRepository

def create_tables():
    accommodation_model.Base.metadata.create_all(bind=engine)

def populate_accommodations():
    db: Session = SessionLocal()
    try:
        has_data = db.query(Accommodation).first()
        if not has_data:
            sample_accommodations = [
                AccommodationCreateSchema(
                    name="Apartamento em Copacabana",
                    location="Rio de Janeiro",
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7mwvgZ3NoicDsYXGML2Ek72r02S9-Bl2OXA&s",
                    price_night=250.0
                ),
                AccommodationCreateSchema(
                    name="Chalé na Serra Gaúcha",
                    location="Gramado",
                    image="https://a0.muscache.com/im/pictures/a203a85a-2a62-44c0-a5da-55dd6574b937.jpg?im_w=320",
                    price_night=350.0
                ),
                AccommodationCreateSchema(
                    name="Casa de Praia em Florianópolis",
                    location="Florianópolis",
                    image="https://cdnuso.com/17405/2022/10/9030fbfab4307855201bee5b20f3003d.jpg",
                    price_night=400.0
                ),
                AccommodationCreateSchema(
                    name="Apartamento a beira mar em Florianópolis",
                    location="Florianópolis",
                    image="https://img.olx.com.br/images/84/844464235314725.jpg",
                    price_night=400.0
                )
            ]
            repo = AccommodationRepository(db)
            repo.create_multiple(sample_accommodations)
    finally:
        db.close()


def configure_startup_events(app: FastAPI):
    @app.on_event("startup")
    def on_startup():
        create_tables()
        populate_accommodations()
