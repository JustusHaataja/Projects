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


def test_create_booking_invalid_time_blocks(minute: int = 1):
    """Test booking with invalid 15-minute blocks (should fail)"""
    print("=" * 50)
    print("TEST: Invalid 15-Minute Blocks (Should Fail)")
    print("=" * 50)
    
    tomorrow = datetime.now() + timedelta(days=1)
    start_time = tomorrow.replace(hour=14, minute=minute, second=0, microsecond=0)
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


def test_get_all_bookings_empty():
    """Test getting all bookings when database is empty"""
    print("=" * 50)
    print("TEST: Get All Bookings (Empty)")
    print("=" * 50)
    
    response = requests.get(f"{BASE_URL}/api/v1/bookings")
    print(f"Status: {response.status_code}")
    assert response.status_code == 200
    
    bookings = response.json()
    print(f"Found {len(bookings)} total bookings across all rooms")
    print(f"✓ Successfully retrieved all bookings\n")


def test_get_all_bookings_multiple_rooms():
    """Test getting all bookings across multiple rooms"""
    print("=" * 50)
    print("TEST: Get All Bookings from Multiple Rooms")
    print("=" * 50)
    
    # Create bookings in different rooms
    booking_ids = []
    tomorrow = datetime.now() + timedelta(days=1)
    
    bookings_data = [
        (1, 9, "Room 1 User A"),
        (2, 10, "Room 2 User B"),
        (3, 11, "Room 3 User C"),
        (1, 14, "Room 1 User D"),
        (2, 15, "Room 2 User E"),
    ]
    
    for room_id, hour, user_name in bookings_data:
        start_time = tomorrow.replace(hour=hour, minute=0, second=0, microsecond=0)
        end_time = start_time + timedelta(hours=1)
        
        booking_data = {
            "room_id": room_id,
            "start_time": start_time.isoformat(),
            "end_time": end_time.isoformat(),
            "user_name": user_name
        }
        
        response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
        if response.status_code == 201:
            booking_ids.append(response.json()['id'])
    
    # Get all bookings
    response = requests.get(f"{BASE_URL}/api/v1/bookings")
    print(f"Status: {response.status_code}")
    assert response.status_code == 200
    
    all_bookings = response.json()
    print(f"Total bookings found: {len(all_bookings)}")
    assert len(all_bookings) >= 5, f"Expected at least 5 bookings, found {len(all_bookings)}"
    
    # Verify bookings are from different rooms
    rooms_in_response = set(b['room_id'] for b in all_bookings)
    print(f"Rooms with bookings: {sorted(rooms_in_response)}")
    
    # Display some bookings
    for booking in all_bookings[:5]:
        print(f"  - Room {booking['room_id']}: {booking['user_name']} at {booking['start_time'][:16]}")
    
    print(f"✓ All bookings from multiple rooms retrieved correctly\n")
    
    # Cleanup
    for booking_id in booking_ids:
        requests.delete(f"{BASE_URL}/api/v1/bookings/{booking_id}")


def test_get_all_bookings_from_now():
    """Test getting only upcoming bookings across all rooms"""
    print("=" * 50)
    print("TEST: Get All Upcoming Bookings (from_now=true)")
    print("=" * 50)
    
    # Create bookings for different rooms in the future
    booking_ids = []
    tomorrow = datetime.now() + timedelta(days=1)
    
    for room_id in [1, 2, 3]:
        start_time = tomorrow.replace(hour=10 + room_id, minute=0, second=0, microsecond=0)
        end_time = start_time + timedelta(hours=1)
        
        booking_data = {
            "room_id": room_id,
            "start_time": start_time.isoformat(),
            "end_time": end_time.isoformat(),
            "user_name": f"Future User Room {room_id}"
        }
        
        response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
        if response.status_code == 201:
            booking_ids.append(response.json()['id'])
    
    # Get only upcoming bookings
    response = requests.get(f"{BASE_URL}/api/v1/bookings?from_now=true")
    print(f"Status: {response.status_code}")
    assert response.status_code == 200
    
    upcoming_bookings = response.json()
    print(f"Found {len(upcoming_bookings)} upcoming bookings across all rooms")
    
    # Verify all bookings are in the future
    current_time = datetime.now()
    for booking in upcoming_bookings:
        booking_start = datetime.fromisoformat(booking['start_time'].replace('Z', '+00:00'))
        assert booking_start > current_time, f"Found past booking: {booking['user_name']}"
        print(f"  - Room {booking['room_id']}: {booking['user_name']} at {booking['start_time'][:16]}")
    
    print(f"✓ Only upcoming bookings returned across all rooms\n")
    
    # Cleanup
    for booking_id in booking_ids:
        requests.delete(f"{BASE_URL}/api/v1/bookings/{booking_id}")


def test_get_all_bookings_sorted_by_time():
    """Test that all bookings are sorted by start time"""
    print("=" * 50)
    print("TEST: All Bookings Sorted by Start Time")
    print("=" * 50)
    
    # Create bookings in random order
    booking_ids = []
    tomorrow = datetime.now() + timedelta(days=1)
    
    # Create bookings at different times in non-sequential order
    hours = [14, 9, 16, 11, 13]
    rooms = [1, 2, 3, 1, 2]
    
    for hour, room_id in zip(hours, rooms):
        start_time = tomorrow.replace(hour=hour, minute=0, second=0, microsecond=0)
        end_time = start_time + timedelta(hours=1)
        
        booking_data = {
            "room_id": room_id,
            "start_time": start_time.isoformat(),
            "end_time": end_time.isoformat(),
            "user_name": f"User {hour}:00"
        }
        
        response = requests.post(f"{BASE_URL}/api/v1/bookings", json=booking_data)
        if response.status_code == 201:
            booking_ids.append(response.json()['id'])
    
    # Get all bookings
    response = requests.get(f"{BASE_URL}/api/v1/bookings")
    assert response.status_code == 200
    
    all_bookings = response.json()
    
    # Verify they are sorted by start_time
    previous_time = None
    print("Bookings in order:")
    for booking in all_bookings:
        current_time = datetime.fromisoformat(booking['start_time'].replace('Z', '+00:00'))
        
        if previous_time:
            assert current_time >= previous_time, "Bookings are not sorted by start time!"
        
        print(f"  - {booking['start_time'][:16]} - Room {booking['room_id']}: {booking['user_name']}")
        previous_time = current_time
    
    print(f"✓ All {len(all_bookings)} bookings are correctly sorted by start time\n")
    
    # Cleanup
    for booking_id in booking_ids:
        requests.delete(f"{BASE_URL}/api/v1/bookings/{booking_id}")


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
        test_create_booking_invalid_time_blocks(minute=13)
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
        
        # Global bookings tests
        test_get_all_bookings_empty()
        test_get_all_bookings_multiple_rooms()
        test_get_all_bookings_from_now()
        test_get_all_bookings_sorted_by_time()
        
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