from datetime import datetime, timezone
from pydantic import BaseModel, Field, field_validator


class BookingCreate(BaseModel):
    """Request model for creating a booking"""

    room_id: int = Field(..., ge = 1, le = 5, description = "Room ID (1-5)")
    start_time: datetime = Field(..., description = "Start time of the booking")
    end_time: datetime = Field(..., description = "End time of the booking")
    user_name: str = Field(..., min_length = 1, max_length = 100, description = "Name of the person making the booking")


    @field_validator('room_id')
    @classmethod
    def validate_room_id(cls, value):
        """Validate room ID is between 1 and 5"""
        
        if value < 1 or value > 5:
            raise ValueError(f"Room ID must be between 1 and 5. Got {value}.")
        
        return value


    @field_validator('start_time', 'end_time')
    @classmethod
    def validate_datetime(cls, value: datetime) -> datetime:
        """
        Ensure datetime is timezone-aware and convert to UTC
        
        Rejects naive datetimes (without timezone info) to prevent ambiguity.
        Accepts any timezone-aware datetime and converts it to UTC for consistent storage.
        
        Example valid inputs:
        - "2026-01-18T14:00:00Z"
        - "2026-01-18T14:00:00+00:00"
        - "2026-01-18T15:00:00+01:00" (converts to UTC)
        
        Raises:
            ValueError: If datetime is timezone-naive
        """
        
        if value.tzinfo is None or value.tzinfo.utcoffset(value) is None:
            # Reject naive datetimes - require timezone information
            raise ValueError("Datetime must be timezone-aware (UTC)")
        
        # Convert to UTC for consistent storage
        return value.astimezone(timezone.utc)


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
