from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.app.routers import accommodation_router
from src.app.models import accommodation_model
from src.app.database.database import engine

class Application:
    def __init__(self):
        self.app = FastAPI()
        self._setup_cors()
        self._include_routers()

    def _setup_cors(self):
        self.app.add_middleware(
            CORSMiddleware,
            allow_origins=["http://localhost:3000"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    def _include_routers(self):
        self.app.include_router(accommodation_router.router)

    def get_app(self):
        return self.app

app_instance = Application()
app = app_instance.get_app()

accommodation_model.Base.metadata.create_all(bind=engine)