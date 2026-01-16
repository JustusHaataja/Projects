from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.controllers import router


# Create FastAPI application
app = FastAPI(
    title = "Meeting Room Reservation API",
    description = "REST API for booking meeting rooms",
    version = "1.0.0",
    docs_url = "/docs",
)

# Configure CORS (allow all origins for this POC)
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)


# Custom exception handler for validation errors
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """
    Handle validation errors and convert room_id validation to 404
    """
    errors = exc.errors()
    
    # Check if error is related to room_id
    for error in errors:
        if 'room_id' in error.get('loc', []):
            return JSONResponse(
                status_code = status.HTTP_404_NOT_FOUND,
                content = {"detail": "Room not found. Valid rooms are 1-5."}
            )
    
    # Default validation error response
    return JSONResponse(
        status_code = status.HTTP_422_UNPROCESSABLE_ENTITY,
        content = {"detail": errors}
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
