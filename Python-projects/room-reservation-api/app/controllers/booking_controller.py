from typing import List
from fastapi import APIRouter, Depends, Query, status

from app.models import BookingResponse, BookingCreate
from app.services import BookingService
from app.repositories import BookingRepository

router = APIRouter(prefix="/api/v1", tags=["bookings"])

_repo = BookingRepository()


def get_service() -> BookingService:
    return BookingService(_repo)


@router.post("/bookings", response_model = BookingResponse, status_code = status.HTTP_201_CREATED)
def create_booking(
    data: BookingCreate,
    service: BookingService = Depends(get_service),
):
    return service.create_booking(data)


@router.get("/rooms/{room_id}/bookings", response_model = List[BookingResponse])
def get_room_bookings(
    room_id: int,
    from_now: bool = Query(False),
    service: BookingService = Depends(get_service),
):
    return service.get_room_bookings(room_id, from_now)


@router.delete("/bookings/{booking_id}", status_code = status.HTTP_204_NO_CONTENT)
def cancel_booking(
    booking_id: str,
    service: BookingService = Depends(get_service),
):
    service.cancel_booking(booking_id)
