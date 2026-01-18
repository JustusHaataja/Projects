from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse

from app.controllers import router


# Create FastAPI application
app = FastAPI(
    title = "Meeting Room Reservation API",
    description = "REST API for booking meeting rooms",
    version = "1.0.0",
    docs_url = "/docs",
    default_response_class = ORJSONResponse,
)

# Configure CORS (allow all origins for this POC)
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

# Include routers
app.include_router(router)


@app.get("/", tags=["health"])
def root():
    """Root endpoint - API health check"""
    
    return {
        "status": "online",
        "service": "Meeting Room Reservation API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health", tags=["health"])
def health_check():
    """Health check endpoint"""
    
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host = "0.0.0.0", port = 8000)