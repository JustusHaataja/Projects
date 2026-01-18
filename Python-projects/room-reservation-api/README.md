# Meeting Room Reservation API

A clean, modular REST API for booking meeting rooms built with Python and FastAPI. This is a proof-of-concept implementation with in-memory storage.

## Features

### Core Functionalities
- **Book a room**: Reserve a meeting room for a specific time period
- **Cancel a booking**: Remove an existing reservation
- **List bookings**: View all reservations for a particular room
- **View all bookings**: See all reservations across all rooms

### Business Rules
- ✅ No double bookings - same room cannot be booked twice for overlapping times
- ✅ No past bookings - all reservations must be in the future
- ✅ Valid time ranges - start time must be before end time
- ✅ 5 rooms available - rooms are identified by IDs 1-5

### Additional Features
- Trust-based system - no authentication required
- 15-minute blocks - bookings must start and end at :00, :15, :30, or :45
- Minimum duration - bookings must be at least 15 minutes long
- Filter bookings with `from_now` parameter to show only upcoming reservations
- Global bookings view - see all reservations across all rooms for dashboard/calendar views
- Proper HTTP status codes (200, 201, 204, 400, 404, 409)
- Clear layer separation (controllers, services, repositories)
- Interactive API documentation (Swagger UI)

## Assumptions & Design Decisions

### Assumptions
1. **Time Format**: All times are in ISO 8601 format (e.g., `2026-01-17T14:00:00`)
2. **Timezone**: Naive datetimes are treated as local time. For production, consider using timezone-aware datetimes.
3. **Storage**: In-memory storage means data is lost when the server restarts
4. **Concurrency**: No locking mechanism implemented for concurrent requests (suitable for POC only)
5. **Room Capacity**: All 5 rooms are assumed to be available and identical in features

### Design Decisions
1. **15-Minute Blocks**: Enforced to simplify scheduling and avoid conflicts
2. **Trust-Based**: No user authentication to keep the POC simple
3. **UUID for Booking IDs**: Ensures uniqueness across all bookings
4. **Singleton Repository**: Maintains state across requests within the same server instance
5. **Explicit HTTP Status Codes**: Clear error codes make the API self-documenting

### Limitations (POC)
- ⚠️ Data lost on server restart (no persistent storage)
- ⚠️ Thread-safe for concurrent requests, but in-memory storage limits scalability
- ⚠️ No authentication or authorization
- ⚠️ No logging or monitoring
- ⚠️ No rate limiting

## Architecture

The project follows a clean, layered architecture:

```
app/
├── controllers/      # API endpoints (FastAPI routes)
├── services/         # Business logic layer
├── repositories/     # Data access layer (in-memory storage)
└── models/          # Pydantic models for request/response
```

### Layer Responsibilities

- **Controllers** (`app/controllers/`): Handle HTTP requests/responses, input validation
- **Services** (`app/services/`): Implement business rules and orchestrate operations
- **Repositories** (`app/repositories/`): Manage data storage and retrieval
- **Models** (`app/models/`): Define data structures for API contracts

## Requirements

- Python 3.8+
- pip

## Installation & Setup

1. **Clone or navigate to the project directory**
   ```bash
   cd room-reservation-api
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   uvicorn app.main:app --reload
   ```

   The API will be available at: `http://localhost:8000`

5. **Access the interactive documentation**
   - Swagger UI: `http://localhost:8000/docs`


## API Endpoints

### 1. Create a Booking

**POST** `/api/v1/bookings`

Create a new room reservation.

**Request Body:**
```json
{
  "room_id": 1,
  "start_time": "2026-01-17T14:00:00",
  "end_time": "2026-01-17T15:00:00",
  "user_name": "John Doe"
}
```

**Success Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "room_id": 1,
  "start_time": "2026-01-17T14:00:00",
  "end_time": "2026-01-17T15:00:00",
  "user_name": "John Doe",
  "created_at": "2026-01-16T10:30:00"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid time (past, wrong order, not in 15-min blocks)
- `404 Not Found`: Invalid room ID
- `409 Conflict`: Room already booked for that time

**Example cURL:**
```bash
curl -X POST "http://localhost:8000/api/v1/bookings" \
  -H "Content-Type: application/json" \
  -d '{
    "room_id": 1,
    "start_time": "2026-01-17T14:00:00",
    "end_time": "2026-01-17T15:00:00",
    "user_name": "John Doe"
  }'
```

### 2. Get Room Bookings

**GET** `/api/v1/rooms/{room_id}/bookings`

Get all bookings for a specific room.

**Query Parameters:**
- `from_now` (optional, boolean): If `true`, only return upcoming bookings. Default: `false`

**Success Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "room_id": 1,
    "start_time": "2026-01-17T14:00:00",
    "end_time": "2026-01-17T15:00:00",
    "user_name": "John Doe",
    "created_at": "2026-01-16T10:30:00"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "room_id": 1,
    "start_time": "2026-01-17T16:00:00",
    "end_time": "2026-01-17T17:30:00",
    "user_name": "Jane Smith",
    "created_at": "2026-01-16T11:00:00"
  }
]
```

**Error Responses:**
- `404 Not Found`: Invalid room ID

**Example cURL:**
```bash
# Get all bookings for room 1
curl "http://localhost:8000/api/v1/rooms/1/bookings"

# Get only upcoming bookings for room 1
curl "http://localhost:8000/api/v1/rooms/1/bookings?from_now=true"
```

### 3. Get All Bookings

**GET** `/api/v1/bookings`

Get all bookings across all rooms. Useful for dashboard views, calendar displays, and statistics.

**Query Parameters:**
- `from_now` (optional, boolean): If `true`, only return upcoming bookings. Default: `false`

**Success Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "room_id": 1,
    "start_time": "2026-01-17T14:00:00",
    "end_time": "2026-01-17T15:00:00",
    "user_name": "John Doe",
    "created_at": "2026-01-16T10:30:00"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "room_id": 3,
    "start_time": "2026-01-17T16:00:00",
    "end_time": "2026-01-17T17:30:00",
    "user_name": "Jane Smith",
    "created_at": "2026-01-16T11:00:00"
  },
  {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "room_id": 2,
    "start_time": "2026-01-18T09:00:00",
    "end_time": "2026-01-18T10:30:00",
    "user_name": "Alice Johnson",
    "created_at": "2026-01-16T12:00:00"
  }
]
```

**Example cURL:**
```bash
# Get all bookings across all rooms
curl "http://localhost:8000/api/v1/bookings"

# Get only upcoming bookings across all rooms
curl "http://localhost:8000/api/v1/bookings?from_now=true"
```

### 4. Cancel a Booking

**DELETE** `/api/v1/bookings/{booking_id}`

Cancel an existing booking.

**Success Response (204 No Content):**
No response body.

**Error Responses:**
- `404 Not Found`: Booking not found

**Example cURL:**
```bash
curl -X DELETE "http://localhost:8000/api/v1/bookings/550e8400-e29b-41d4-a716-446655440000"
```

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Booking created successfully |
| 204 | No Content - Booking deleted successfully |
| 400 | Bad Request - Invalid input (past time, wrong time order, invalid time blocks) |
| 404 | Not Found - Room or booking not found |
| 409 | Conflict - Overlapping reservation detected |

## Example Usage Scenarios

### Scenario 1: Book a room for a meeting tomorrow

```bash
curl -X POST "http://localhost:8000/api/v1/bookings" \
  -H "Content-Type: application/json" \
  -d '{
    "room_id": 2,
    "start_time": "2026-01-17T09:00:00",
    "end_time": "2026-01-17T10:30:00",
    "user_name": "Alice Johnson"
  }'
```

### Scenario 2: Check what's booked in room 3 today and onwards

```bash
curl "http://localhost:8000/api/v1/rooms/3/bookings?from_now=true"
```

### Scenario 3: View all upcoming bookings across all rooms (Dashboard view)

```bash
curl "http://localhost:8000/api/v1/bookings?from_now=true"
```

### Scenario 4: Cancel a meeting

```bash
# First, get the booking ID from the list of bookings
curl "http://localhost:8000/api/v1/rooms/2/bookings"

# Then cancel using the booking ID
curl -X DELETE "http://localhost:8000/api/v1/bookings/YOUR_BOOKING_ID_HERE"
```

### Scenario 5: Handle a conflict (double booking attempt)

```bash
# First booking succeeds
curl -X POST "http://localhost:8000/api/v1/bookings" \
  -H "Content-Type: application/json" \
  -d '{
    "room_id": 1,
    "start_time": "2026-01-17T14:00:00",
    "end_time": "2026-01-17T15:00:00",
    "user_name": "User A"
  }'

# Second booking for overlapping time fails with 409 Conflict
curl -X POST "http://localhost:8000/api/v1/bookings" \
  -H "Content-Type: application/json" \
  -d '{
    "room_id": 1,
    "start_time": "2026-01-17T14:30:00",
    "end_time": "2026-01-17T15:30:00",
    "user_name": "User B"
  }'
```

## Development

### Project Structure
```
room-reservation-api/
├── app/
│   ├── __init__.py
│   ├── main.py                      # FastAPI application entry point
│   ├── controllers/
│   │   ├── __init__.py
│   │   └── booking_controller.py   # API routes
│   ├── services/
│   │   ├── __init__.py
│   │   └── booking_service.py      # Business logic
│   ├── repositories/
│   │   ├── __init__.py
│   │   └── booking_repository.py   # In-memory storage
│   └── models/
│       ├── __init__.py
│       └── booking.py              # Pydantic models
├── requirements.txt
└── README.md
```

### Running Tests
Currently, no automated tests are included in this POC. For production, consider adding:
- Unit tests for services and repositories
- Integration tests for API endpoints
- Test coverage reporting

### Future Enhancements
- [ ] Add persistent database (PostgreSQL, MongoDB)
- [ ] Implement user authentication (JWT)
- [ ] Add email notifications for bookings
- [ ] Room features and capacity management
- [ ] Recurring bookings support
- [ ] Booking modification endpoint
- [ ] Search and filter capabilities
- [ ] Rate limiting and API keys
- [ ] Comprehensive logging
- [ ] Docker containerization

## License

This is a proof-of-concept project for educational purposes.

## Contact

For questions or feedback, please open an issue in the repository.
