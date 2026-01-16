from datetime import datetime
from typing import Dict, List, Optional
import uuid
from app.models import Booking


class BookingRepository:
    """In-memory repository for managing bookings"""
    
    def __init__(self):
        # Storage: booking_id -> Booking
        self._bookings: Dict[str, Booking] = {}
        
        # Valid room IDs
        self._valid_room_ids = {1, 2, 3, 4, 5}
    

    def create(self, booking_data: dict) -> Booking:
        """Create a new booking"""
        
        booking_id = str(uuid.uuid4())
        
        booking = Booking(
            id = booking_id,
            **booking_data,
            created_at = datetime.now()
        )
        
        self._bookings[booking_id] = booking
        
        return booking
    

    def get_by_id(self, booking_id: str) -> Optional[Booking]:
        """Get a booking by ID"""
        
        return self._bookings.get(booking_id)
    

    def get_by_room(self, room_id: int, from_time: Optional[datetime] = None) -> List[Booking]:
        """Get all bookings for a specific room, optionally filtered by time"""
        
        bookings = [
            booking for booking in self._bookings.values()
            if booking.room_id == room_id
        ]
        
        if from_time:
            bookings = [
                booking for booking in bookings
                if booking.end_time >= from_time
            ]
        
        # Sort by start time
        bookings.sort(key = lambda b: b.start_time)
        
        return bookings
    

    def get_overlapping_bookings(
        self, 
        room_id: int, 
        start_time: datetime, 
        end_time: datetime,
        exclude_booking_id: Optional[str] = None
    ) -> List[Booking]:
        """
        Find bookings that overlap with the given time range for a specific room.
        Two bookings overlap if: start1 < end2 AND start2 < end1
        """
        
        overlapping = []
        
        for booking in self._bookings.values():
            if booking.room_id != room_id:
                continue
            
            if exclude_booking_id and booking.id == exclude_booking_id:
                continue
            
            # Check for overlap: start1 < end2 AND start2 < end1
            if booking.start_time < end_time and start_time < booking.end_time:
                overlapping.append(booking)
        
        return overlapping
    

    def delete(self, booking_id: str) -> bool:
        """Delete a booking by ID. Returns True if deleted, False if not found"""
        
        if booking_id in self._bookings:
            del self._bookings[booking_id]
            return True
        
        return False
    

    def is_valid_room_id(self, room_id: int) -> bool:
        """Check if room ID is valid"""
        
        return room_id in self._valid_room_ids
    

    def get_all(self) -> List[Booking]:
        """Get all bookings"""
        
        return list(self._bookings.values())
