from datetime import datetime, timedelta
from typing import List, Optional
from fastapi import HTTPException, status

from app.models import Booking, BookingCreate
from app.repositories import BookingRepository


class BookingService:
    """Service layer for booking business logic"""
    
    def __init__(self, repository: BookingRepository):
        self.repository = repository
    

    def create_booking(self, booking_data: BookingCreate) -> Booking:
        """
        Create a new booking with business rule validation
        
        Business rules:
        1. Room must exist (1-5)
        2. Start time cannot be in the past
        3. Start time must be before end time
        4. No overlapping bookings for the same room
        5. Optional: Bookings in 15-minute blocks
        """
        
        # Rule 1: Validate room exists
        if not self.repository.is_valid_room_id(booking_data.room_id):
            raise HTTPException(
                status_code = status.HTTP_404_NOT_FOUND,
                detail = f"Room {booking_data.room_id} not found. Valid rooms are 1-5."
            )
        
        # Rule 2: Start time cannot be in the past
        now = datetime.now()
        if booking_data.start_time < now:
            raise HTTPException(
                status_code = status.HTTP_400_BAD_REQUEST,
                detail = "Cannot book in the past. Start time must be in the future."
            )
        
        # Rule 3: Start time must be before end time
        if booking_data.start_time >= booking_data.end_time:
            raise HTTPException(
                status_code = status.HTTP_400_BAD_REQUEST,
                detail = "Start time must be before end time."
            )
        
        # Rule 5: (Optional) Validate 15-minute blocks
        self._validate_15min_blocks(booking_data.start_time, booking_data.end_time)
        
        # Rule 4: Check for overlapping bookings
        overlapping = self.repository.get_overlapping_bookings(
            booking_data.room_id,
            booking_data.start_time,
            booking_data.end_time
        )
        
        if overlapping:
            raise HTTPException(
                status_code = status.HTTP_409_CONFLICT,
                detail = f"Room {booking_data.room_id} is already booked for the requested time period."
            )
        
        # Create the booking
        booking = self.repository.create(booking_data.model_dump())
        
        return booking
    

    def get_room_bookings(
        self, 
        room_id: int, 
        from_now: bool = False
    ) -> List[Booking]:
        """
        Get all bookings for a specific room
        
        Args:
            room_id: The room ID to query
            from_now: If True, only return upcoming bookings
        """
        
        # Validate room exists
        if not self.repository.is_valid_room_id(room_id):
            raise HTTPException(
                status_code = status.HTTP_404_NOT_FOUND,
                detail = f"Room {room_id} not found. Valid rooms are 1-5."
            )
        
        from_time = datetime.now() if from_now else None
        
        return self.repository.get_by_room(room_id, from_time)
    

    def cancel_booking(self, booking_id: str) -> None:
        """
        Cancel a booking
        
        Args:
            booking_id: The ID of the booking to cancel
        """
        
        # Check if booking exists
        booking = self.repository.get_by_id(booking_id)
        if not booking:
            raise HTTPException(
                status_code = status.HTTP_404_NOT_FOUND,
                detail = f"Booking {booking_id} not found."
            )
        
        # Delete the booking
        self.repository.delete(booking_id)
    

    def _validate_15min_blocks(self, start_time: datetime, end_time: datetime) -> None:
        """
        Validate that booking times are in 15-minute blocks
        
        This is an optional feature that ensures bookings start and end at
        :00, :15, :30, or :45 minutes.
        """
        
        valid_minutes = {0, 15, 30, 45}
        
        if start_time.minute not in valid_minutes:
            raise HTTPException(
                status_code = status.HTTP_400_BAD_REQUEST,
                detail = f"Start time must be in 15-minute blocks (00, 15, 30, or 45 minutes). Got {start_time.minute} minutes."
            )
        
        if end_time.minute not in valid_minutes:
            raise HTTPException(
                status_code = status.HTTP_400_BAD_REQUEST,
                detail = f"End time must be in 15-minute blocks (00, 15, 30, or 45 minutes). Got {end_time.minute} minutes."
            )
        
        # Validate minimum duration (15 minutes)
        duration = end_time - start_time
        if duration < timedelta(minutes=15):
            raise HTTPException(
                status_code = status.HTTP_400_BAD_REQUEST,
                detail = "Booking duration must be at least 15 minutes."
            )
