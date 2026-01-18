from datetime import datetime, timezone
from pydantic import BaseModel, Field, field_validator
from fastapi import HTTPException, status
import string

# Define allowed characters once at module level (cached)
ALLOWED_CHARS = frozenset(string.ascii_letters + string.digits + "@._-+ ")


class BookingCreate(BaseModel):
    """Request model for creating a booking"""

    room_id: int = Field(..., description = "Room ID (1-5)")
    start_time: datetime = Field(..., description = "Start time of the booking")
    end_time: datetime = Field(..., description = "End time of the booking")
    user_name: str = Field(..., description = "Name of the person making the booking")


    @field_validator('room_id')
    @classmethod
    def validate_room_id(cls, value: int):
        """Validate room ID is between 1 and 5"""
        if value < 1 or value > 5:
            # Raise HTTPException directly for domain-specific error
            raise HTTPException(
                status_code = status.HTTP_404_NOT_FOUND,
                detail = f"Room {value} not found. Valid rooms are 1-5."
            )
        return value


    @field_validator('start_time', 'end_time')
    @classmethod
    def validate_datetime(cls, value: datetime) -> datetime:
        """Ensure datetime is timezone-aware and convert to UTC"""
        
        if value.tzinfo is None or value.tzinfo.utcoffset(value) is None:
            # Raise HTTPException with appropriate status code
            raise HTTPException(
                status_code = status.HTTP_400_BAD_REQUEST,
                detail = "Invalid datetime format. All datetime values must include timezone information (e.g., '2026-01-19T12:00:00Z' or '2026-01-19T12:00:00+00:00')."
            )
        
        # Convert to UTC
        return value.astimezone(timezone.utc)
    

    @field_validator('user_name')
    @classmethod
    def validate_user_name(cls, value: str) -> str:
        """Validate and sanitize user name"""
        
        value = value.strip()
        
        # Validate user_name exists
        if not value:
            raise HTTPException(
                status_code = status.HTTP_400_BAD_REQUEST,
                detail = "ser_name is required and cannot be empty or contain only whitespace."
            )
        
        # Validate user_name length
        if len(value) > 100:
            raise HTTPException(
                status_code = status.HTTP_400_BAD_REQUEST,
                detail = f"user_name exceeds maximum length of 100 characters. Provided length: {len(value)}."
            )
        
        # Validate characters
        # Allow more characters: alphanumeric, @, ., _, -, +
        # This supports: emails, usernames, UUIDs
        invalid = [c for c in value if c not in ALLOWED_CHARS]

        if invalid:
            invalid_chars = ''.join(dict.fromkeys(invalid))
            raise HTTPException(
                status_code = status.HTTP_400_BAD_REQUEST,
                detail = f"uuser_id contains invalid characters: '{invalid_chars}'. Allowed: letters, numbers, @, ., _, -, +"
            )
        
        return value


class Booking(BookingCreate):
    """Internal booking model with ID"""
    
    id: str = Field(..., description = "Unique booking ID")
    created_at: datetime = Field(
        default_factory = lambda: datetime.now(timezone.utc), 
        description = "When the booking was created"
    )


class BookingResponse(BaseModel):
    """Response model for booking operations"""
    
    id: str
    room_id: int
    start_time: datetime
    end_time: datetime
    user_name: str
    created_at: datetime
    
    class Config:
        from_attributes = True
