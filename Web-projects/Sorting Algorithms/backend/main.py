from fastapi import FastAPI
from api.sort_routes import router as sort_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Sorting Algorithm API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include sorting routes
app.include_router(sort_router)