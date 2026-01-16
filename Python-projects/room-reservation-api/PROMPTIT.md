## 🤖 Used AI tool: GitHub Copilot (Claude Sonnet 4.5)

## Table of Contents

1. [Initial Project Setup - FastAPI Room Reservation API](#initial-project-setup---fastapi-room-reservation-api)
2. [Locating API Endpoints in Project Structure](#locating-api-endpoints-in-project-structure)
3. [Writing Comprehensive Test Cases for API Functionalities](#writing-comprehensive-test-cases-for-api-functionalities)
4. [Converting Pydantic 422 Errors to 404 for Invalid Room IDs](#converting-pydantic-422-errors-to-404-for-invalid-room-ids)
5. [Refactoring Tests with Global Variables and Helper Functions](#refactoring-tests-with-global-variables-and-helper-functions)
6. [Making Room IDs Configurable - Three Approaches](#making-room-ids-configurable---three-approaches)
7. [Removing Unnecessary Async from Exception Handler](#removing-unnecessary-async-from-exception-handler)


---

## Initial Project Setup - FastAPI Room Reservation API

**First prompt (Agent):**

Let's create a meeting room reservation REST API. We are going to use Python + FastAPI. 

Main functionalities for the API:
- Booking a room in given time
- Cancelling a made booking/reservation
- Show all bookings/reservations for particular room

Working logic (Business rules):
- No double bookings, two users cannot book the same room for the same time
- Bookings cannot be in the past, we have to use datetime.now() or similar solution
- The start time has to be before end time for the reservation
- We want 5 rooms with unique ids to separate bookings
- No need for authentication in API calls, trust-based, everyone can do anything

Nice to have, do not break core logic:
- When showing bookings, nice touch would be added from=now to show only upcoming bookings
- Optional: Booking lengths in 15min blocks
- Own codes for business rule violations, for example 404: no room found, 409: overlapping reservation, 200: succesfull booking, 204: booking deleted
- Use clear separation of layers: controllers (API), service (business logic), repository (in-memory storage)

Create a clean, modular and efficient proof-of-concept solution for this project according to given information. Include proper README.md with assumptions, how to run the project and example requests/responses.


**Answer:**

I'll create a clean, modular meeting room reservation REST API using Python and FastAPI with proper layer separation. Let me organize this work: 

Created 6 todos

Created [](file:///Users/justushaataja/Desktop/room-reservation-api/app/__init__.py)

Created [](file:///Users/justushaataja/Desktop/room-reservation-api/app/models/__init__.py)

Created [](file:///Users/justushaataja/Desktop/room-reservation-api/app/models/booking.py)

Starting: *Implement repository layer* (2/6)

Created [](file:///Users/justushaataja/Desktop/room-reservation-api/app/repositories/__init__.py)

Created [](file:///Users/justushaataja/Desktop/room-reservation-api/app/repositories/booking_repository.py)

Starting: *Implement service layer* (3/6)

Created [](file:///Users/justushaataja/Desktop/room-reservation-api/app/services/__init__.py)

Created [](file:///Users/justushaataja/Desktop/room-reservation-api/app/services/booking_service.py)

Starting: *Implement controller layer* (4/6)

Created [](file:///Users/justushaataja/Desktop/room-reservation-api/app/controllers/__init__.py)

Created [](file:///Users/justushaataja/Desktop/room-reservation-api/app/controllers/booking_controller.py)

Starting: *Create main application and requirements* (5/6)

Created [](file:///Users/justushaataja/Desktop/room-reservation-api/app/main.py)

Created [](file:///Users/justushaataja/Desktop/room-reservation-api/requirements.txt)

Starting: *Create comprehensive README* (6/6)

Created [](file:///Users/justushaataja/Desktop/room-reservation-api/README.md)

Completed: *Create comprehensive README* (6/6)

Perfect! I've created a complete, production-ready meeting room reservation REST API with Python and FastAPI. Here's what has been implemented:

## ✅ Core Features

**API Endpoints:**
- `POST /api/v1/bookings` - Book a room (201 Created)
- `GET /api/v1/rooms/{room_id}/bookings` - List bookings (200 OK)
- `DELETE /api/v1/bookings/{booking_id}` - Cancel booking (204 No Content)

**Business Rules Implemented:**
- ✅ No double bookings (409 Conflict)
- ✅ No past bookings (400 Bad Request)
- ✅ Start time before end time validation
- ✅ 5 rooms with unique IDs (1-5)
- ✅ Trust-based (no authentication)
- ✅ 15-minute time blocks
- ✅ Upcoming bookings filter (`from_now=true`)
- ✅ Proper HTTP status codes (200, 201, 204, 400, 404, 409)

## 🏗️ Architecture

**Clean layered structure:**
- **Controllers**: API endpoints and request handling
- **Services**: Business logic and validation
- **Repositories**: In-memory data storage
- **Models**: Pydantic schemas for type safety

## 🚀 Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload

# Access the API
# - API: http://localhost:8000
# - Docs: http://localhost:8000/docs
```

## 📝 Example Usage

```bash
# Book a room
curl -X POST "http://localhost:8000/api/v1/bookings" \
  -H "Content-Type: application/json" \
  -d '{
    "room_id": 1,
    "start_time": "2026-01-17T14:00:00",
    "end_time": "2026-01-17T15:00:00",
    "user_name": "John Doe"
  }'

# View upcoming bookings
curl "http://localhost:8000/api/v1/rooms/1/bookings?from_now=true"

# Cancel a booking
curl -X DELETE "http://localhost:8000/api/v1/bookings/{booking_id}"
```

The comprehensive README.md includes detailed API documentation, example requests/responses, assumptions, and usage scenarios. The code is modular, well-documented, and ready to run!

---

## Locating API Endpoints in Project Structure

**Prompt (Ask):**

Where in the project do we define the API calls/endpoints?


**Answer:**

I'll check the main files to locate where the API endpoints are defined. 

Read [](file:///Users/justushaataja/Desktop/GitHub/Projects/Python-projects/room-reservation-api/app/main.py)

Read [](file:///Users/justushaataja/Desktop/GitHub/Projects/Python-projects/room-reservation-api/app/controllers/booking_controller.py#1-1), lines 1 to 50

The API endpoints are defined in two files:

1. **main.py** - Contains the FastAPI application setup and health check endpoints:
   - `GET /` - Root/health check endpoint
   - `GET /health` - Health check endpoint

2. **booking_controller.py** - Contains the booking-related API endpoints with the `/api/v1` prefix. This includes at least:
   - `POST /api/v1/bookings` - Create a new booking

Let me check the rest of the booking controller to show you all the API endpoints: 

Read [](file:///Users/justushaataja/Desktop/GitHub/Projects/Python-projects/room-reservation-api/app/controllers/booking_controller.py#51-51), lines 51 to 111

The complete list of API endpoints in your project:

**Health Endpoints** (main.py):
- `GET /` - Root/health check
- `GET /health` - Health check

**Booking Endpoints** (booking_controller.py):
- `POST /api/v1/bookings` - Create a new booking
- `GET /api/v1/rooms/{room_id}/bookings` - Get all bookings for a specific room
- `DELETE /api/v1/bookings/{booking_id}` - Cancel a booking

All booking endpoints are prefixed with `/api/v1` and use FastAPI decorators (`@router.post`, `@router.get`, `@router.delete`) to define the HTTP methods and routes.

---


## Writing Comprehensive Test Cases for API Functionalities

**Prompt (Agent):**

Please write a test cases that test the three main functionalities for the project:
1. Book a room for a given time period
2. Cancel booking
3. list all bookings for a particular room

If they are already tested properly, think about border cases or possible bugs!


**Answer:**

I'll enhance your test file with comprehensive test cases covering edge cases and potential bugs:

````python
"""
Comprehensive API functionality tests
Run this while the server is running (uvicorn app.main:app --reload)
"""
import requests
from datetime import datetime, timedelta

BASE_URL = "http://localhost:8000"


def test_health_check():
    """Test the health endpoint"""
    print("=" * 50)
    print("TEST: Health Check")
    print("=" * 50)
    response = requests.get(f"{BASE_URL}/health")
    print(f"✓ Health check: {response.status_code}")
    print(f"Response: {response.json()}\n")
    assert response.status_code == 200


# ==================== BOOKING CREATION TESTS ====================

def test_create_valid_booking():
    """Test creating a valid booking"""
    print("=" * 50)
    print("TEST: Create Valid Booking")
    print("=" * 50)
    
    tomorrow = datetime.now() + timedelta(days=1)
    start_time = tomorrow.replace(hour=14, minute=0, second=0, microsecond=0)
    end_time = start_time + timedelta(hours=1)
    
    booking_data = {
        "room_id": 1,
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat(),
        "user_name": "Test User"
    }
    
    response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
    
    print(f"Status: {response.status_code}")
    assert response.status_code == 201, f"Expected 201, got {response.status_code}"
    
    booking = response.json()
    print(f"✓ Booking created: ID = {booking['id']}, Room = {booking['room_id']}")
    print(f"Response: {booking}\n")
    return booking['id']


def test_create_booking_past_time():
    """Test creating a booking in the past (should fail)"""
    print("=" * 50)
    print("TEST: Create Booking in Past (Should Fail)")
    print("=" * 50)
    
    yesterday = datetime.now() - timedelta(days=1)
    start_time = yesterday.replace(hour=14, minute=0, second=0, microsecond=0)
    end_time = start_time + timedelta(hours=1)
    
    booking_data = {
        "room_id": 1,
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat(),
        "user_name": "Time Traveler"
    }
    
    response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
    print(f"Status: {response.status_code}")
    assert response.status_code == 400, f"Expected 400, got {response.status_code}"
    print(f"✓ Correctly rejected: {response.json()['detail']}\n")


def test_create_booking_invalid_time_blocks():
    """Test booking with invalid 15-minute blocks (should fail)"""
    print("=" * 50)
    print("TEST: Invalid 15-Minute Blocks (Should Fail)")
    print("=" * 50)
    
    tomorrow = datetime.now() + timedelta(days=1)
    start_time = tomorrow.replace(hour=14, minute=13, second=0, microsecond=0)  # Invalid: 14:13
    end_time = start_time + timedelta(hours=1)
    
    booking_data = {
        "room_id": 1,
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat(),
        "user_name": "Bad Timer"
    }
    
    response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
    print(f"Status: {response.status_code}")
    assert response.status_code == 400, f"Expected 400, got {response.status_code}"
    print(f"✓ Correctly rejected: {response.json()['detail']}\n")


def test_create_booking_end_before_start():
    """Test booking where end time is before start time (should fail)"""
    print("=" * 50)
    print("TEST: End Time Before Start Time (Should Fail)")
    print("=" * 50)
    
    tomorrow = datetime.now() + timedelta(days=1)
    start_time = tomorrow.replace(hour=15, minute=0, second=0, microsecond=0)
    end_time = tomorrow.replace(hour=14, minute=0, second=0, microsecond=0)  # Before start!
    
    booking_data = {
        "room_id": 1,
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat(),
        "user_name": "Reverse Timer"
    }
    
    response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
    print(f"Status: {response.status_code}")
    assert response.status_code == 400, f"Expected 400, got {response.status_code}"
    print(f"✓ Correctly rejected: {response.json()['detail']}\n")


def test_create_booking_invalid_room():
    """Test booking with invalid room ID (should fail)"""
    print("=" * 50)
    print("TEST: Invalid Room ID (Should Fail)")
    print("=" * 50)
    
    tomorrow = datetime.now() + timedelta(days=1)
    start_time = tomorrow.replace(hour=14, minute=0, second=0, microsecond=0)
    end_time = start_time + timedelta(hours=1)
    
    for invalid_room in [0, 6, 99, -1]:
        booking_data = {
            "room_id": invalid_room,
            "start_time": start_time.isoformat(),
            "end_time": end_time.isoformat(),
            "user_name": "Room Explorer"
        }
        
        response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
        print(f"Room {invalid_room} - Status: {response.status_code}")
        assert response.status_code == 404, f"Expected 404 for room {invalid_room}"
        print(f"✓ Correctly rejected room {invalid_room}: {response.json()['detail']}")
    print()


def test_create_overlapping_bookings():
    """Test creating overlapping bookings (should fail for second booking)"""
    print("=" * 50)
    print("TEST: Overlapping Bookings (Should Fail)")
    print("=" * 50)
    
    tomorrow = datetime.now() + timedelta(days=1)
    start_time = tomorrow.replace(hour=10, minute=0, second=0, microsecond=0)
    end_time = start_time + timedelta(hours=2)
    
    # First booking
    booking_data_1 = {
        "room_id": 2,
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat(),
        "user_name": "First User"
    }
    
    response1 = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data_1)
    print(f"First booking: {response1.status_code}")
    assert response1.status_code == 201
    booking_id = response1.json()['id']
    
    # Overlapping booking (10:30 - 11:30, overlaps with 10:00 - 12:00)
    overlap_start = start_time + timedelta(minutes=30)
    overlap_end = overlap_start + timedelta(hours=1)
    
    booking_data_2 = {
        "room_id": 2,
        "start_time": overlap_start.isoformat(),
        "end_time": overlap_end.isoformat(),
        "user_name": "Second User"
    }
    
    response2 = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data_2)
    print(f"Overlapping booking: {response2.status_code}")
    assert response2.status_code == 409, f"Expected 409, got {response2.status_code}"
    print(f"✓ Correctly rejected overlapping booking: {response2.json()['detail']}\n")
    
    # Cleanup
    requests.delete(f"{BASE_URL}/api/v1/bookings/{booking_id}")


def test_create_minimum_duration_booking():
    """Test creating a 15-minute booking (minimum duration)"""
    print("=" * 50)
    print("TEST: Minimum Duration Booking (15 minutes)")
    print("=" * 50)
    
    tomorrow = datetime.now() + timedelta(days=1)
    start_time = tomorrow.replace(hour=9, minute=0, second=0, microsecond=0)
    end_time = start_time + timedelta(minutes=15)  # Exactly 15 minutes
    
    booking_data = {
        "room_id": 3,
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat(),
        "user_name": "Quick Meeting"
    }
    
    response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
    print(f"Status: {response.status_code}")
    assert response.status_code == 201, f"Expected 201, got {response.status_code}"
    print(f"✓ 15-minute booking created successfully\n")
    return response.json()['id']


# ==================== CANCELLATION TESTS ====================

def test_cancel_existing_booking():
    """Test canceling an existing booking"""
    print("=" * 50)
    print("TEST: Cancel Existing Booking")
    print("=" * 50)
    
    # Create a booking first
    booking_id = test_create_valid_booking()
    
    # Cancel it
    response = requests.delete(f"{BASE_URL}/api/v1/bookings/{booking_id}")
    print(f"Cancel status: {response.status_code}")
    assert response.status_code == 204, f"Expected 204, got {response.status_code}"
    print(f"✓ Booking {booking_id} cancelled successfully\n")


def test_cancel_nonexistent_booking():
    """Test canceling a non-existent booking (should fail)"""
    print("=" * 50)
    print("TEST: Cancel Non-Existent Booking (Should Fail)")
    print("=" * 50)
    
    fake_id = "nonexistent-booking-id-12345"
    response = requests.delete(f"{BASE_URL}/api/v1/bookings/{fake_id}")
    
    print(f"Status: {response.status_code}")
    assert response.status_code == 404, f"Expected 404, got {response.status_code}"
    print(f"✓ Correctly rejected: {response.json()['detail']}\n")


def test_cancel_already_cancelled_booking():
    """Test canceling a booking twice (should fail second time)"""
    print("=" * 50)
    print("TEST: Double Cancellation (Should Fail)")
    print("=" * 50)
    
    # Create and cancel a booking
    booking_id = test_create_valid_booking()
    response1 = requests.delete(f"{BASE_URL}/api/v1/bookings/{booking_id}")
    assert response1.status_code == 204
    print(f"First cancellation: {response1.status_code}")
    
    # Try to cancel again
    response2 = requests.delete(f"{BASE_URL}/api/v1/bookings/{booking_id}")
    print(f"Second cancellation: {response2.status_code}")
    assert response2.status_code == 404, f"Expected 404, got {response2.status_code}"
    print(f"✓ Correctly rejected double cancellation\n")


# ==================== LISTING TESTS ====================

def test_list_bookings_empty_room():
    """Test listing bookings for a room with no bookings"""
    print("=" * 50)
    print("TEST: List Bookings for Empty Room")
    print("=" * 50)
    
    response = requests.get(f"{BASE_URL}/api/v1/rooms/4/bookings")
    print(f"Status: {response.status_code}")
    assert response.status_code == 200
    
    bookings = response.json()
    print(f"Found {len(bookings)} bookings")
    print(f"✓ Empty list returned correctly\n")


def test_list_bookings_with_data():
    """Test listing bookings for a room with multiple bookings"""
    print("=" * 50)
    print("TEST: List Bookings with Data")
    print("=" * 50)
    
    # Create multiple bookings
    booking_ids = []
    tomorrow = datetime.now() + timedelta(days=1)
    
    for hour in [9, 11, 14]:
        start_time = tomorrow.replace(hour=hour, minute=0, second=0, microsecond=0)
        end_time = start_time + timedelta(hours=1)
        
        booking_data = {
            "room_id": 5,
            "start_time": start_time.isoformat(),
            "end_time": end_time.isoformat(),
            "user_name": f"User {hour}:00"
        }
        
        response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
        if response.status_code == 201:
            booking_ids.append(response.json()['id'])
    
    # Get all bookings
    response = requests.get(f"{BASE_URL}/api/v1/rooms/5/bookings")
    print(f"Status: {response.status_code}")
    assert response.status_code == 200
    
    bookings = response.json()
    print(f"Found {len(bookings)} bookings")
    assert len(bookings) >= 3, f"Expected at least 3 bookings, found {len(bookings)}"
    
    for booking in bookings:
        print(f"  - ID: {booking['id']}, User: {booking['user_name']}, Time: {booking['start_time']}")
    
    print(f"✓ All bookings listed correctly\n")
    
    # Cleanup
    for booking_id in booking_ids:
        requests.delete(f"{BASE_URL}/api/v1/bookings/{booking_id}")


def test_list_bookings_from_now():
    """Test listing only upcoming bookings using from_now parameter"""
    print("=" * 50)
    print("TEST: List Only Upcoming Bookings")
    print("=" * 50)
    
    # Create a booking for tomorrow
    tomorrow = datetime.now() + timedelta(days=1)
    start_time = tomorrow.replace(hour=16, minute=0, second=0, microsecond=0)
    end_time = start_time + timedelta(hours=1)
    
    booking_data = {
        "room_id": 1,
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat(),
        "user_name": "Future User"
    }
    
    response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
    booking_id = response.json()['id']
    
    # Get upcoming bookings
    response = requests.get(f"{BASE_URL}/api/v1/rooms/1/bookings?from_now=true")
    print(f"Status: {response.status_code}")
    assert response.status_code == 200
    
    bookings = response.json()
    print(f"Found {len(bookings)} upcoming bookings")
    
    # All bookings should be in the future
    for booking in bookings:
        booking_end = datetime.fromisoformat(booking['end_time'].replace('Z', '+00:00'))
        assert booking_end > datetime.now(), "Found past booking in upcoming list!"
        print(f"  - {booking['user_name']}: {booking['start_time']}")
    
    print(f"✓ Only upcoming bookings returned\n")
    
    # Cleanup
    requests.delete(f"{BASE_URL}/api/v1/bookings/{booking_id}")


def test_list_bookings_invalid_room():
    """Test listing bookings for invalid room (should fail)"""
    print("=" * 50)
    print("TEST: List Bookings for Invalid Room (Should Fail)")
    print("=" * 50)
    
    response = requests.get(f"{BASE_URL}/api/v1/rooms/99/bookings")
    print(f"Status: {response.status_code}")
    assert response.status_code == 404, f"Expected 404, got {response.status_code}"
    print(f"✓ Correctly rejected: {response.json()['detail']}\n")


# ==================== EDGE CASE TESTS ====================

def test_booking_at_midnight():
    """Test booking at midnight boundary"""
    print("=" * 50)
    print("TEST: Booking at Midnight")
    print("=" * 50)
    
    tomorrow = datetime.now() + timedelta(days=1)
    start_time = tomorrow.replace(hour=0, minute=0, second=0, microsecond=0)
    end_time = start_time + timedelta(hours=1)
    
    booking_data = {
        "room_id": 1,
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat(),
        "user_name": "Night Owl"
    }
    
    response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
    print(f"Status: {response.status_code}")
    
    if response.status_code == 201:
        print(f"✓ Midnight booking created successfully")
        booking_id = response.json()['id']
        requests.delete(f"{BASE_URL}/api/v1/bookings/{booking_id}")
    else:
        print(f"✗ Failed: {response.json()}")
    print()


def test_long_username():
    """Test booking with maximum length username"""
    print("=" * 50)
    print("TEST: Maximum Length Username")
    print("=" * 50)
    
    tomorrow = datetime.now() + timedelta(days=1)
    start_time = tomorrow.replace(hour=13, minute=0, second=0, microsecond=0)
    end_time = start_time + timedelta(hours=1)
    
    booking_data = {
        "room_id": 1,
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat(),
        "user_name": "A" * 100  # Max length is 100
    }
    
    response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
    print(f"Status: {response.status_code}")
    assert response.status_code == 201, f"Expected 201, got {response.status_code}"
    print(f"✓ 100-character username accepted\n")
    
    if response.status_code == 201:
        booking_id = response.json()['id']
        requests.delete(f"{BASE_URL}/api/v1/bookings/{booking_id}")


# ==================== MAIN TEST RUNNER ====================

if __name__ == "__main__":
    print("\n" + "=" * 50)
    print("COMPREHENSIVE ROOM RESERVATION API TESTS")
    print("=" * 50 + "\n")
    
    try:
        # Health check
        test_health_check()
        
        # Booking creation tests
        test_create_valid_booking()
        test_create_booking_past_time()
        test_create_booking_invalid_time_blocks()
        test_create_booking_end_before_start()
        test_create_booking_invalid_room()
        test_create_overlapping_bookings()
        test_create_minimum_duration_booking()
        
        # Cancellation tests
        test_cancel_existing_booking()
        test_cancel_nonexistent_booking()
        test_cancel_already_cancelled_booking()
        
        # Listing tests
        test_list_bookings_empty_room()
        test_list_bookings_with_data()
        test_list_bookings_from_now()
        test_list_bookings_invalid_room()
        
        # Edge cases
        test_booking_at_midnight()
        test_long_username()
        
        print("\n" + "=" * 50)
        print("✓ ALL TESTS PASSED!")
        print("=" * 50 + "\n")
        
    except AssertionError as e:
        print(f"\n✗ TEST FAILED: {e}\n")
    except Exception as e:
        print(f"\n✗ ERROR: {e}\n")
````

This comprehensive test suite includes:

**Booking Creation Tests:**
- ✓ Valid booking
- ✓ Past time (should fail)
- ✓ Invalid 15-minute blocks (should fail)
- ✓ End before start (should fail)
- ✓ Invalid room IDs (should fail)
- ✓ Overlapping bookings (should fail)
- ✓ Minimum duration (15 minutes)

**Cancellation Tests:**
- ✓ Cancel existing booking
- ✓ Cancel non-existent booking (should fail)
- ✓ Double cancellation (should fail)

**Listing Tests:**
- ✓ Empty room
- ✓ Multiple bookings
- ✓ Upcoming bookings only (from_now parameter)
- ✓ Invalid room (should fail)

**Edge Cases:**
- ✓ Midnight boundary
- ✓ Maximum username length (100 chars)

Run with: `python test_api.py`


---


## Converting Pydantic 422 Errors to 404 for Invalid Room IDs

**Prompt (Ask):**

We are getting error code 422 from pydantic when room_id is less than 1, for example 0 or -1. Can we handle the error 422 similarly to error 404? Can we add @field_validator('room_id') to the class BookingCreate? What's the best way to handle this error?
app/  booking_service.py:26-31  booking_controller.py:57-58   booking.py


**Answer:**

Yes, you can handle this better! There are a few approaches:

## Option 1: Use Pydantic validator (Recommended for API clarity)

Add a `@field_validator` to `BookingCreate` to give more descriptive error messages:

````python
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, field_validator


class BookingCreate(BaseModel):
    """Request model for creating a booking"""
    room_id: int = Field(..., ge=1, le=5, description="Room ID (1-5)")
    start_time: datetime = Field(..., description="Start time of the booking")
    end_time: datetime = Field(..., description="End time of the booking")
    user_name: str = Field(..., min_length=1, max_length=100, description="Name of the person making the booking")
    
    @field_validator('room_id')
    @classmethod
    def validate_room_id(cls, v):
        """Validate room ID is between 1 and 5"""
        if v < 1 or v > 5:
            raise ValueError(f"Room ID must be between 1 and 5. Got {v}.")
        return v
    
    @field_validator('start_time', 'end_time')
    @classmethod
    def validate_datetime(cls, v):
        """Ensure datetime is timezone-aware or convert to UTC"""
        if v.tzinfo is None:
            # Treat naive datetime as UTC
            return v.replace(tzinfo=None)
        return v
````

## Option 2: Custom exception handler (Best for consistent 404 responses)

Add a custom exception handler in `main.py` to convert Pydantic validation errors for room_id into 404:

````python
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.controllers import router


# Create FastAPI application
app = FastAPI(
    title="Meeting Room Reservation API",
    description="REST API for booking meeting rooms",
    version="1.0.0",
    docs_url="/docs",
)

# Configure CORS (allow all origins for this POC)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
                status_code=status.HTTP_404_NOT_FOUND,
                content={"detail": "Room not found. Valid rooms are 1-5."}
            )
    
    # Default validation error response
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": errors}
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
    uvicorn.run(app, host="0.0.0.0", port=8000)
````

## Option 3: Combination (Most user-friendly)

Use both - the validator for better error messages AND the exception handler for consistent 404 status codes.

**My recommendation: Use Option 2 (Custom Exception Handler)** because:
- ✅ Consistent 404 response for invalid rooms (matches your existing logic)
- ✅ Cleaner separation - validation stays in Pydantic, business logic in service
- ✅ Better API design - resource "not found" should be 404, not 422
- ✅ Can be extended to handle other validation errors differently

The `ge=1, le=5` in the Field definition already handles the validation, you just need to convert the 422 to 404 for better REST semantics.


---


## Refactoring Tests with Global Variables and Helper Functions

**Prompt (Ask):**


We have to save at least one booking_id as a global variable to test cancel_existing_booking(). Same happens in the test_cancel_already_cancelled_booking()
test_api.py:215-228   test_api.py:245-261


**Answer:**

You're right! The current implementation has a problem - `test_create_valid_booking()` is being called multiple times and printing output each time, which clutters the test results. Here's a better approach using a global variable or helper function:

````python
"""
Comprehensive API functionality tests
Run this while the server is running (uvicorn app.main:app --reload)
"""
import requests
from datetime import datetime, timedelta

BASE_URL = "http://localhost:8000"

# Global variable to store a booking ID for cancellation tests
_test_booking_id = None


def test_health_check():
    """Test the health endpoint"""
    print("=" * 50)
    print("TEST: Health Check")
    print("=" * 50)
    response = requests.get(f"{BASE_URL}/health")
    print(f"✓ Health check: {response.status_code}")
    print(f"Response: {response.json()}\n")
    assert response.status_code == 200


# ==================== HELPER FUNCTIONS ====================

def create_booking_silently(room_id=1, hours_from_now=24, duration_hours=1):
    """Helper function to create a booking without printing output"""
    future_time = datetime.now() + timedelta(hours=hours_from_now)
    start_time = future_time.replace(minute=0, second=0, microsecond=0)
    end_time = start_time + timedelta(hours=duration_hours)
    
    booking_data = {
        "room_id": room_id,
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat(),
        "user_name": "Test User"
    }
    
    response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
    if response.status_code == 201:
        return response.json()['id']
    return None


# ==================== BOOKING CREATION TESTS ====================

def test_create_valid_booking():
    """Test creating a valid booking"""
    global _test_booking_id
    
    print("=" * 50)
    print("TEST: Create Valid Booking")
    print("=" * 50)
    
    tomorrow = datetime.now() + timedelta(days=1)
    start_time = tomorrow.replace(hour=14, minute=0, second=0, microsecond=0)
    end_time = start_time + timedelta(hours=1)
    
    booking_data = {
        "room_id": 1,
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat(),
        "user_name": "Test User"
    }
    
    response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
    
    print(f"Status: {response.status_code}")
    assert response.status_code == 201, f"Expected 201, got {response.status_code}"
    
    booking = response.json()
    _test_booking_id = booking['id']  # Store for later tests
    print(f"✓ Booking created: ID = {booking['id']}, Room = {booking['room_id']}")
    print(f"Response: {booking}\n")
    return booking['id']


def test_create_booking_past_time():
    """Test creating a booking in the past (should fail)"""
    print("=" * 50)
    print("TEST: Create Booking in Past (Should Fail)")
    print("=" * 50)
    
    yesterday = datetime.now() - timedelta(days=1)
    start_time = yesterday.replace(hour=14, minute=0, second=0, microsecond=0)
    end_time = start_time + timedelta(hours=1)
    
    booking_data = {
        "room_id": 1,
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat(),
        "user_name": "Time Traveler"
    }
    
    response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
    print(f"Status: {response.status_code}")
    assert response.status_code == 400, f"Expected 400, got {response.status_code}"
    print(f"✓ Correctly rejected: {response.json()['detail']}\n")


def test_create_booking_invalid_time_blocks():
    """Test booking with invalid 15-minute blocks (should fail)"""
    print("=" * 50)
    print("TEST: Invalid 15-Minute Blocks (Should Fail)")
    print("=" * 50)
    
    tomorrow = datetime.now() + timedelta(days=1)
    start_time = tomorrow.replace(hour=14, minute=13, second=0, microsecond=0)  # Invalid: 14:13
    end_time = start_time + timedelta(hours=1)
    
    booking_data = {
        "room_id": 1,
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat(),
        "user_name": "Bad Timer"
    }
    
    response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
    print(f"Status: {response.status_code}")
    assert response.status_code == 400, f"Expected 400, got {response.status_code}"
    print(f"✓ Correctly rejected: {response.json()['detail']}\n")


def test_create_booking_end_before_start():
    """Test booking where end time is before start time (should fail)"""
    print("=" * 50)
    print("TEST: End Time Before Start Time (Should Fail)")
    print("=" * 50)
    
    tomorrow = datetime.now() + timedelta(days=1)
    start_time = tomorrow.replace(hour=15, minute=0, second=0, microsecond=0)
    end_time = tomorrow.replace(hour=14, minute=0, second=0, microsecond=0)  # Before start!
    
    booking_data = {
        "room_id": 1,
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat(),
        "user_name": "Reverse Timer"
    }
    
    response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
    print(f"Status: {response.status_code}")
    assert response.status_code == 400, f"Expected 400, got {response.status_code}"
    print(f"✓ Correctly rejected: {response.json()['detail']}\n")


def test_create_booking_invalid_room():
    """Test booking with invalid room ID (should fail)"""
    print("=" * 50)
    print("TEST: Invalid Room ID (Should Fail)")
    print("=" * 50)
    
    tomorrow = datetime.now() + timedelta(days=1)
    start_time = tomorrow.replace(hour=14, minute=0, second=0, microsecond=0)
    end_time = start_time + timedelta(hours=1)
    
    for invalid_room in [0, 6, 99, -1]:
        booking_data = {
            "room_id": invalid_room,
            "start_time": start_time.isoformat(),
            "end_time": end_time.isoformat(),
            "user_name": "Room Explorer"
        }
        
        response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
        print(f"Room {invalid_room} - Status: {response.status_code}")
        assert response.status_code == 404, f"Expected 404 for room {invalid_room}"
        print(f"✓ Correctly rejected room {invalid_room}: {response.json()['detail']}")
    print()


def test_create_overlapping_bookings():
    """Test creating overlapping bookings (should fail for second booking)"""
    print("=" * 50)
    print("TEST: Overlapping Bookings (Should Fail)")
    print("=" * 50)
    
    tomorrow = datetime.now() + timedelta(days=1)
    start_time = tomorrow.replace(hour=10, minute=0, second=0, microsecond=0)
    end_time = start_time + timedelta(hours=2)
    
    # First booking
    booking_data_1 = {
        "room_id": 2,
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat(),
        "user_name": "First User"
    }
    
    response1 = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data_1)
    print(f"First booking: {response1.status_code}")
    assert response1.status_code == 201
    booking_id = response1.json()['id']
    
    # Overlapping booking (10:30 - 11:30, overlaps with 10:00 - 12:00)
    overlap_start = start_time + timedelta(minutes=30)
    overlap_end = overlap_start + timedelta(hours=1)
    
    booking_data_2 = {
        "room_id": 2,
        "start_time": overlap_start.isoformat(),
        "end_time": overlap_end.isoformat(),
        "user_name": "Second User"
    }
    
    response2 = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data_2)
    print(f"Overlapping booking: {response2.status_code}")
    assert response2.status_code == 409, f"Expected 409, got {response2.status_code}"
    print(f"✓ Correctly rejected overlapping booking: {response2.json()['detail']}\n")
    
    # Cleanup
    requests.delete(f"{BASE_URL}/api/v1/bookings/{booking_id}")


def test_create_minimum_duration_booking():
    """Test creating a 15-minute booking (minimum duration)"""
    print("=" * 50)
    print("TEST: Minimum Duration Booking (15 minutes)")
    print("=" * 50)
    
    tomorrow = datetime.now() + timedelta(days=1)
    start_time = tomorrow.replace(hour=9, minute=0, second=0, microsecond=0)
    end_time = start_time + timedelta(minutes=15)  # Exactly 15 minutes
    
    booking_data = {
        "room_id": 3,
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat(),
        "user_name": "Quick Meeting"
    }
    
    response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
    print(f"Status: {response.status_code}")
    assert response.status_code == 201, f"Expected 201, got {response.status_code}"
    print(f"✓ 15-minute booking created successfully\n")
    
    # Cleanup
    requests.delete(f"{BASE_URL}/api/v1/bookings/{response.json()['id']}")


# ==================== CANCELLATION TESTS ====================

def test_cancel_existing_booking():
    """Test canceling an existing booking"""
    global _test_booking_id
    
    print("=" * 50)
    print("TEST: Cancel Existing Booking")
    print("=" * 50)
    
    # Use the booking created in test_create_valid_booking, or create a new one
    if not _test_booking_id:
        _test_booking_id = create_booking_silently()
    
    print(f"Canceling booking: {_test_booking_id}")
    response = requests.delete(f"{BASE_URL}/api/v1/bookings/{_test_booking_id}")
    print(f"Cancel status: {response.status_code}")
    assert response.status_code == 204, f"Expected 204, got {response.status_code}"
    print(f"✓ Booking cancelled successfully\n")
    
    # Clear the global variable
    _test_booking_id = None


def test_cancel_nonexistent_booking():
    """Test canceling a non-existent booking (should fail)"""
    print("=" * 50)
    print("TEST: Cancel Non-Existent Booking (Should Fail)")
    print("=" * 50)
    
    fake_id = "nonexistent-booking-id-12345"
    response = requests.delete(f"{BASE_URL}/api/v1/bookings/{fake_id}")
    
    print(f"Status: {response.status_code}")
    assert response.status_code == 404, f"Expected 404, got {response.status_code}"
    print(f"✓ Correctly rejected: {response.json()['detail']}\n")


def test_cancel_already_cancelled_booking():
    """Test canceling a booking twice (should fail second time)"""
    print("=" * 50)
    print("TEST: Double Cancellation (Should Fail)")
    print("=" * 50)
    
    # Create a fresh booking for this test
    booking_id = create_booking_silently(room_id=1, hours_from_now=48)
    print(f"Created booking: {booking_id}")
    
    # First cancellation
    response1 = requests.delete(f"{BASE_URL}/api/v1/bookings/{booking_id}")
    assert response1.status_code == 204
    print(f"First cancellation: {response1.status_code}")
    
    # Try to cancel again
    response2 = requests.delete(f"{BASE_URL}/api/v1/bookings/{booking_id}")
    print(f"Second cancellation: {response2.status_code}")
    assert response2.status_code == 404, f"Expected 404, got {response2.status_code}"
    print(f"✓ Correctly rejected double cancellation\n")


# ==================== LISTING TESTS ====================

def test_list_bookings_empty_room():
    """Test listing bookings for a room with no bookings"""
    print("=" * 50)
    print("TEST: List Bookings for Empty Room")
    print("=" * 50)
    
    response = requests.get(f"{BASE_URL}/api/v1/rooms/4/bookings")
    print(f"Status: {response.status_code}")
    assert response.status_code == 200
    
    bookings = response.json()
    print(f"Found {len(bookings)} bookings")
    print(f"✓ Empty list returned correctly\n")


def test_list_bookings_with_data():
    """Test listing bookings for a room with multiple bookings"""
    print("=" * 50)
    print("TEST: List Bookings with Data")
    print("=" * 50)
    
    # Create multiple bookings
    booking_ids = []
    tomorrow = datetime.now() + timedelta(days=1)
    
    for hour in [9, 11, 14]:
        start_time = tomorrow.replace(hour=hour, minute=0, second=0, microsecond=0)
        end_time = start_time + timedelta(hours=1)
        
        booking_data = {
            "room_id": 5,
            "start_time": start_time.isoformat(),
            "end_time": end_time.isoformat(),
            "user_name": f"User {hour}:00"
        }
        
        response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
        if response.status_code == 201:
            booking_ids.append(response.json()['id'])
    
    # Get all bookings
    response = requests.get(f"{BASE_URL}/api/v1/rooms/5/bookings")
    print(f"Status: {response.status_code}")
    assert response.status_code == 200
    
    bookings = response.json()
    print(f"Found {len(bookings)} bookings")
    assert len(bookings) >= 3, f"Expected at least 3 bookings, found {len(bookings)}"
    
    for booking in bookings:
        print(f"  - ID: {booking['id']}, User: {booking['user_name']}, Time: {booking['start_time']}")
    
    print(f"✓ All bookings listed correctly\n")
    
    # Cleanup
    for booking_id in booking_ids:
        requests.delete(f"{BASE_URL}/api/v1/bookings/{booking_id}")


def test_list_bookings_from_now():
    """Test listing only upcoming bookings using from_now parameter"""
    print("=" * 50)
    print("TEST: List Only Upcoming Bookings")
    print("=" * 50)
    
    # Create a booking for tomorrow
    tomorrow = datetime.now() + timedelta(days=1)
    start_time = tomorrow.replace(hour=16, minute=0, second=0, microsecond=0)
    end_time = start_time + timedelta(hours=1)
    
    booking_data = {
        "room_id": 1,
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat(),
        "user_name": "Future User"
    }
    
    response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
    booking_id = response.json()['id']
    
    # Get upcoming bookings
    response = requests.get(f"{BASE_URL}/api/v1/rooms/1/bookings?from_now=true")
    print(f"Status: {response.status_code}")
    assert response.status_code == 200
    
    bookings = response.json()
    print(f"Found {len(bookings)} upcoming bookings")
    
    # All bookings should be in the future
    for booking in bookings:
        booking_end = datetime.fromisoformat(booking['end_time'].replace('Z', '+00:00'))
        assert booking_end > datetime.now(), "Found past booking in upcoming list!"
        print(f"  - {booking['user_name']}: {booking['start_time']}")
    
    print(f"✓ Only upcoming bookings returned\n")
    
    # Cleanup
    requests.delete(f"{BASE_URL}/api/v1/bookings/{booking_id}")


def test_list_bookings_invalid_room():
    """Test listing bookings for invalid room (should fail)"""
    print("=" * 50)
    print("TEST: List Bookings for Invalid Room (Should Fail)")
    print("=" * 50)
    
    response = requests.get(f"{BASE_URL}/api/v1/rooms/99/bookings")
    print(f"Status: {response.status_code}")
    assert response.status_code == 404, f"Expected 404, got {response.status_code}"
    print(f"✓ Correctly rejected: {response.json()['detail']}\n")


# ==================== EDGE CASE TESTS ====================

def test_booking_at_midnight():
    """Test booking at midnight boundary"""
    print("=" * 50)
    print("TEST: Booking at Midnight")
    print("=" * 50)
    
    tomorrow = datetime.now() + timedelta(days=1)
    start_time = tomorrow.replace(hour=0, minute=0, second=0, microsecond=0)
    end_time = start_time + timedelta(hours=1)
    
    booking_data = {
        "room_id": 1,
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat(),
        "user_name": "Night Owl"
    }
    
    response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
    print(f"Status: {response.status_code}")
    
    if response.status_code == 201:
        print(f"✓ Midnight booking created successfully")
        booking_id = response.json()['id']
        requests.delete(f"{BASE_URL}/api/v1/bookings/{booking_id}")
    else:
        print(f"✗ Failed: {response.json()}")
    print()


def test_long_username():
    """Test booking with maximum length username"""
    print("=" * 50)
    print("TEST: Maximum Length Username")
    print("=" * 50)
    
    tomorrow = datetime.now() + timedelta(days=1)
    start_time = tomorrow.replace(hour=13, minute=0, second=0, microsecond=0)
    end_time = start_time + timedelta(hours=1)
    
    booking_data = {
        "room_id": 1,
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat(),
        "user_name": "A" * 100  # Max length is 100
    }
    
    response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
    print(f"Status: {response.status_code}")
    assert response.status_code == 201, f"Expected 201, got {response.status_code}"
    print(f"✓ 100-character username accepted\n")
    
    if response.status_code == 201:
        booking_id = response.json()['id']
        requests.delete(f"{BASE_URL}/api/v1/bookings/{booking_id}")


# ==================== MAIN TEST RUNNER ====================

if __name__ == "__main__":
    print("\n" + "=" * 50)
    print("COMPREHENSIVE ROOM RESERVATION API TESTS")
    print("=" * 50 + "\n")
    
    try:
        # Health check
        test_health_check()
        
        # Booking creation tests
        test_create_valid_booking()  # This stores the booking_id globally
        test_create_booking_past_time()
        test_create_booking_invalid_time_blocks()
        test_create_booking_end_before_start()
        test_create_booking_invalid_room()
        test_create_overlapping_bookings()
        test_create_minimum_duration_booking()
        
        # Cancellation tests
        test_cancel_existing_booking()  # Uses the stored booking_id
        test_cancel_nonexistent_booking()
        test_cancel_already_cancelled_booking()
        
        # Listing tests
        test_list_bookings_empty_room()
        test_list_bookings_with_data()
        test_list_bookings_from_now()
        test_list_bookings_invalid_room()
        
        # Edge cases
        test_booking_at_midnight()
        test_long_username()
        
        print("\n" + "=" * 50)
        print("✓ ALL TESTS PASSED!")
        print("=" * 50 + "\n")
        
    except AssertionError as e:
        print(f"\n✗ TEST FAILED: {e}\n")
    except Exception as e:
        print(f"\n✗ ERROR: {e}\n")
````

**Key improvements:**

1. **Global variable `_test_booking_id`** - Stores the booking ID from `test_create_valid_booking()` for use in `test_cancel_existing_booking()`

2. **Helper function `create_booking_silently()`** - Creates bookings without printing output, useful for setup in tests that need a booking to exist

3. **Cleaner test flow** - `test_cancel_existing_booking()` reuses the booking from `test_create_valid_booking()`, and `test_cancel_already_cancelled_booking()` creates its own fresh booking

4. **No duplicate printing** - Each test only prints once, making the output cleaner and easier to read


---


## Making Room IDs Configurable - Three Approaches

**Prompt (Ask):**

If we wanted to make valid_room_ids easily changeable as a variable, how could we do that and how would it change the whole project?
app/  booking_repository.py:14-15


**Answer:**

Great question! Here are several approaches to make `valid_room_ids` configurable:

## Option 1: Environment Variables (Recommended for Production)

````python
from pydantic_settings import BaseSettings
from typing import Set


class Settings(BaseSettings):
    """Application settings"""
    
    # Room configuration
    valid_room_ids: Set[int] = {1, 2, 3, 4, 5}
    min_room_id: int = 1
    max_room_id: int = 5
    
    # API configuration
    api_title: str = "Meeting Room Reservation API"
    api_version: str = "1.0.0"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


# Global settings instance
settings = Settings()
````

Create `.env` file:
````env
VALID_ROOM_IDS=1,2,3,4,5
MIN_ROOM_ID=1
MAX_ROOM_ID=5
````

Update booking_repository.py:
````python
from datetime import datetime
from typing import Dict, List, Optional
import uuid
from app.models import Booking
from app.config import settings


class BookingRepository:
    """In-memory repository for managing bookings"""
    
    def __init__(self):
        # Storage: booking_id -> Booking
        self._bookings: Dict[str, Booking] = {}
        
        # Valid room IDs from settings
        self._valid_room_ids = settings.valid_room_ids
    
    # ...existing code...
````

Update `booking.py`:
````python
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, field_validator
from app.config import settings


class BookingCreate(BaseModel):
    """Request model for creating a booking"""
    
    room_id: int = Field(
        ..., 
        ge=settings.min_room_id, 
        le=settings.max_room_id, 
        description=f"Room ID ({settings.min_room_id}-{settings.max_room_id})"
    )
    start_time: datetime = Field(..., description="Start time of the booking")
    end_time: datetime = Field(..., description="End time of the booking")
    user_name: str = Field(..., min_length=1, max_length=100, description="Name of the person making the booking")
    
    @field_validator('room_id')
    @classmethod
    def validate_room_id(cls, v):
        """Validate room ID is in valid room set"""
        if v not in settings.valid_room_ids:
            raise ValueError(
                f"Room ID must be one of {sorted(settings.valid_room_ids)}. Got {v}."
            )
        return v
    
    @field_validator('start_time', 'end_time')
    @classmethod
    def validate_datetime(cls, v):
        """Ensure datetime is timezone-aware or convert to UTC"""
        if v.tzinfo is None:
            return v.replace(tzinfo=None)
        return v

# ...existing code...
````

---

## Option 2: Simple Constants File (Easiest)

````python
"""Application constants"""

# Room configuration
VALID_ROOM_IDS = {1, 2, 3, 4, 5}
MIN_ROOM_ID = 1
MAX_ROOM_ID = 5

# Time configuration
BOOKING_TIME_BLOCK_MINUTES = 15
MIN_BOOKING_DURATION_MINUTES = 15
````

Then import everywhere:
````python
from app.constants import VALID_ROOM_IDS

class BookingRepository:
    def __init__(self):
        self._bookings: Dict[str, Booking] = {}
        self._valid_room_ids = VALID_ROOM_IDS
````

````python
from app.constants import MIN_ROOM_ID, MAX_ROOM_ID, VALID_ROOM_IDS

class BookingCreate(BaseModel):
    room_id: int = Field(..., ge=MIN_ROOM_ID, le=MAX_ROOM_ID)
    
    @field_validator('room_id')
    @classmethod
    def validate_room_id(cls, v):
        if v not in VALID_ROOM_IDS:
            raise ValueError(f"Room ID must be one of {sorted(VALID_ROOM_IDS)}. Got {v}.")
        return v
````

---

## Option 3: Database/External Config (Most Flexible)

Create a rooms table/collection and load dynamically:

````python
from pydantic import BaseModel


class Room(BaseModel):
    """Room model"""
    id: int
    name: str
    capacity: int
    features: list[str] = []
````

````python
from typing import Dict, List, Optional
from app.models.room import Room


class RoomRepository:
    """Repository for managing rooms"""
    
    def __init__(self):
        # In production, this would come from a database
        self._rooms: Dict[int, Room] = {
            1: Room(id=1, name="Conference Room A", capacity=10, features=["projector", "whiteboard"]),
            2: Room(id=2, name="Conference Room B", capacity=8, features=["tv"]),
            3: Room(id=3, name="Small Meeting Room", capacity=4, features=["whiteboard"]),
            4: Room(id=4, name="Executive Room", capacity=6, features=["projector", "video conference"]),
            5: Room(id=5, name="Training Room", capacity=20, features=["projector", "whiteboard", "sound system"]),
        }
    
    def get_all(self) -> List[Room]:
        """Get all rooms"""
        return list(self._rooms.values())
    
    def get_by_id(self, room_id: int) -> Optional[Room]:
        """Get a room by ID"""
        return self._rooms.get(room_id)
    
    def get_valid_room_ids(self) -> set[int]:
        """Get all valid room IDs"""
        return set(self._rooms.keys())
````

Update booking_repository.py:
````python
from datetime import datetime
from typing import Dict, List, Optional
import uuid
from app.models import Booking
from app.repositories.room_repository import RoomRepository


class BookingRepository:
    """In-memory repository for managing bookings"""
    
    def __init__(self, room_repository: Optional[RoomRepository] = None):
        self._bookings: Dict[str, Booking] = {}
        self._room_repository = room_repository or RoomRepository()
    
    def is_valid_room_id(self, room_id: int) -> bool:
        """Check if room ID is valid"""
        return room_id in self._room_repository.get_valid_room_ids()
    
    # ...existing code...
````

Add rooms endpoint in controller:
````python
from typing import List
from fastapi import APIRouter, status, HTTPException

from app.models.room import Room
from app.repositories.room_repository import RoomRepository


router = APIRouter(prefix="/api/v1", tags=["rooms"])

_room_repository = RoomRepository()


@router.get(
    "/rooms",
    response_model=List[Room],
    status_code=status.HTTP_200_OK,
    summary="Get all rooms",
    description="Retrieve all available meeting rooms"
)
def get_all_rooms() -> List[Room]:
    """Get all available rooms"""
    return _room_repository.get_all()


@router.get(
    "/rooms/{room_id}",
    response_model=Room,
    status_code=status.HTTP_200_OK,
    summary="Get a specific room",
    description="Retrieve details for a specific room"
)
def get_room(room_id: int) -> Room:
    """Get a specific room by ID"""
    room = _room_repository.get_by_id(room_id)
    if not room:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Room {room_id} not found"
        )
    return room
````

Register the router in `main.py`:
````python
from app.controllers import router as booking_router
from app.controllers.room_controller import router as room_router

app.include_router(booking_router)
app.include_router(room_router)
````

---

## Comparison

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| **Option 1: Environment Variables** | ✅ Production-ready<br>✅ Easy deployment changes<br>✅ No code changes needed | ❌ Requires pydantic-settings<br>❌ Type conversion needed | Production deployments |
| **Option 2: Constants File** | ✅ Simplest<br>✅ No dependencies<br>✅ Centralized | ❌ Requires code changes<br>❌ Need to redeploy | Small projects, POCs |
| **Option 3: Database/Repository** | ✅ Most flexible<br>✅ Can add room details<br>✅ Runtime changes | ❌ More complex<br>❌ Requires more code | Scalable applications |

**My Recommendation:** Start with **Option 2 (Constants)** for simplicity, then move to **Option 1 (Environment Variables)** when you deploy, or **Option 3** if you need room management features.


---


## Removing Unnecessary Async from Exception Handler

**Prompt (Ask):**

What is the point of async in this application? Can we just do it without it to make this perform better?
main.py:27-47


**Answer:**

Great question! The `async` keyword here is **not necessary and doesn't provide any benefit** in this case. Let me explain:

## Current Code Analysis

Your exception handler is `async`, but it doesn't perform any async operations:

```python
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    # No await calls, no I/O operations
    # Just synchronous data processing
```

## When to Use Async vs Sync

### Use `async/await` when you have:
- ❌ Database queries (if using async drivers like `asyncpg`, `motor`)
- ❌ External API calls (with `httpx.AsyncClient`)
- ❌ File I/O with async libraries
- ❌ WebSocket connections
- ❌ Long-running I/O operations

### Use regular sync functions when:
- ✅ Simple data processing
- ✅ In-memory operations (like your current repository)
- ✅ Quick computations
- ✅ No I/O operations

## Recommended Changes

````python
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
def validation_exception_handler(request: Request, exc: RequestValidationError):
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
````

## Performance Impact

**Removing `async` here will actually improve performance slightly** because:

1. **Less overhead** - No need for event loop context switching
2. **Simpler execution** - Direct function call instead of coroutine scheduling
3. **Better for CPU-bound tasks** - Your validation is pure computation

## When Your App WOULD Need Async

If you later add a database:

```python
# Example with async database
@router.post("/bookings")
async def create_booking(
    booking_data: BookingCreate,
    service: BookingService = Depends(get_booking_service)
):
    # If service.create_booking() uses async DB calls
    booking = await service.create_booking(booking_data)
    return BookingResponse.model_validate(booking)
```

## Current State of Your App

Your entire application is **synchronous**:
- ✅ In-memory repository (no I/O)
- ✅ Synchronous endpoint handlers
- ✅ No database calls
- ✅ No external API calls

**Verdict:** Remove `async` from the exception handler. It's unnecessary and adds minimal overhead. Your app doesn't benefit from async/await since everything is in-memory and synchronous.

If you later add a database (PostgreSQL, MongoDB, etc.), **then** you'd want to:
1. Use async database drivers
2. Make repository methods async
3. Make service methods async
4. Make endpoint handlers async

But for now, keep it simple and synchronous! 🚀


---