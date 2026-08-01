from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import listings

app = FastAPI(title="Business Listings Dashboard API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(listings.router)


@app.get("/")
def root():
    return {"message": "Business Listings Dashboard API is running"}