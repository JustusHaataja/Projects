from typing import List
from fastapi import APIRouter, Depends, Query, status

from app.models import BookingCreate, BookingResponse
from app.services import BookingService
from app.repositories import BookingRepository


router = APIRouter(prefix="/api/v1", tags=["bookings"])


# Dependency injection for service
def get_booking_service() -> BookingService:
    """Dependency to get booking service instance"""
    
    repository = BookingRepository()
    
    return BookingService(repository)


# Singleton repository to maintain state across requests
_repository_instance = BookingRepository()


def get_repository() -> BookingRepository:
    """Get singleton repository instance"""
    
    return _repository_instance


def get_booking_service_with_singleton(
    repository: BookingRepository = Depends(get_repository)
) -> BookingService:
    """Dependency to get booking service with singleton repository"""
    
    return BookingService(repository)


@router.post(
    "/bookings",
    response_model = BookingResponse,
    status_code = status.HTTP_201_CREATED,
    summary = "Create a new booking",
    description = "Book a meeting room for a specific time period"
)
def create_booking(
    booking_data: BookingCreate,
    service: BookingService = Depends(get_booking_service_with_singleton)
) -> BookingResponse:
    """
    Create a new booking with the following validations:
    - Room must exist (1-5)
    - Start time cannot be in the past
    - Start time must be before end time
    - No overlapping bookings for the same room
    - Times must be in 15-minute blocks
    
    Returns:
        - 201: Booking created successfully
        - 400: Invalid request (past time, invalid time range, invalid time blocks)
        - 404: Room not found
        - 409: Room already booked for the requested time
    """
    
    booking = service.create_booking(booking_data)
    
    return BookingResponse.model_validate(booking)


@router.get(
    "/rooms/{room_id}/bookings",
    response_model = List[BookingResponse],
    status_code = status.HTTP_200_OK,
    summary = "Get all bookings for a room",
    description = "Retrieve all bookings for a specific room, optionally filtered to show only upcoming bookings"
)
def get_room_bookings(
    room_id: int,
    from_now: bool = Query(
        False,
        description = "If true, only return bookings that end after the current time"
    ),
    service: BookingService = Depends(get_booking_service_with_singleton)
) -> List[BookingResponse]:
    """
    Get all bookings for a specific room.
    
    Query parameters:
    - from_now: If true, only return upcoming bookings (default: false)
    
    Returns:
        - 200: List of bookings (may be empty)
        - 404: Room not found
    """
    
    bookings = service.get_room_bookings(room_id, from_now)
    
    return [BookingResponse.model_validate(booking) for booking in bookings]


@router.delete(
    "/bookings/{booking_id}",
    status_code = status.HTTP_204_NO_CONTENT,
    summary = "Cancel a booking",
    description = "Cancel/delete an existing booking"
)
def cancel_booking(
    booking_id: str,
    service: BookingService = Depends(get_booking_service_with_singleton)
) -> None:
    """
    Cancel a booking by ID.
    
    Returns:
        - 204: Booking cancelled successfully
        - 404: Booking not found
    """
    
    service.cancel_booking(booking_id)
