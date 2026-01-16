from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, field_validator


class BookingCreate(BaseModel):
    """Request model for creating a booking"""
    room_id: int = Field(..., ge=1, le=5, description="Room ID (1-5)")
    start_time: datetime = Field(..., description="Start time of the booking")
    end_time: datetime = Field(..., description="End time of the booking")
    user_name: str = Field(..., min_length=1, max_length=100, description="Name of the person making the booking")
    
    @field_validator('start_time', 'end_time')
    @classmethod
    def validate_datetime(cls, v):
        """Ensure datetime is timezone-aware or convert to UTC"""
        if v.tzinfo is None:
            # Treat naive datetime as UTC
            return v.replace(tzinfo=None)
        return v


class Booking(BookingCreate):
    """Internal booking model with ID"""
    id: str = Field(..., description="Unique booking ID")
    created_at: datetime = Field(default_factory=datetime.now, description="When the booking was created")


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
