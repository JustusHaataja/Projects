from datetime import datetime
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
    def validate_datetime(cls, value):
        """Ensure datetime is timezone-aware or convert to UTC"""
        
        if value.tzinfo is None:
            # Treat naive datetime as UTC
            return value.replace(tzinfo = None)
        
        return value


class Booking(BookingCreate):
    """Internal booking model with ID"""
    
    id: str = Field(..., description = "Unique booking ID")
    created_at: datetime = Field(default_factory = datetime.now, description = "When the booking was created")


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
