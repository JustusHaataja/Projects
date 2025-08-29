### README for Sorting Algorithms Visualizer

# Sorting Algorithms Visualizer

Welcome to the **Sorting Algorithms Visualizer**, a web application designed to help you understand and visualize how various sorting algorithms work. This project provides an interactive and educational experience, allowing users to see the step-by-step process of sorting an array using popular algorithms.

### Live Demo
Check out the live demo of the site here: [Sorting Algorithms Visualizer](https://algorithmsbyjustus.netlify.app/)

---

## Features

- **Interactive Visualizations**: Watch sorting algorithms in action with real-time animations.
- **Multiple Algorithms**: Includes a variety of sorting algorithms such as:
  - Bubble Sort
  - Quick Sort
  - Merge Sort
  - Heap Sort
  - Insertion Sort
  - Selection Sort
  - Counting Sort
  - Radix Sort
  - Bogo Sort (for fun!)
- **Customizable Array**: Adjust the size of the array and generate new random arrays.
- **Algorithm Information**: Learn about each algorithm with detailed descriptions and time complexity analysis.

---

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **TypeScript**: For type-safe development.
- **CSS**: For styling the application.
- **Font Awesome**: For icons and visual enhancements.

### Backend
- **FastAPI**: For handling API requests and sorting logic.
- **Python**: For implementing the sorting algorithms.
- **Uvicorn**: For running the FastAPI server.

### Deployment
- **Frontend**: Hosted on [Netlify](https://www.netlify.com/).
- **Backend**: Hosted on [Render](https://render.com/).

---

## Project Structure

```
.
├── backend/                # Backend code for sorting algorithms
│   ├── api/                # API routes
│   ├── sorting_algorithms/ # Sorting algorithm implementations
│   ├── main.py             # Entry point for the FastAPI server
│   └── requirements.txt    # Python dependencies
├── frontend/               # Frontend code for the React application
│   ├── public/             # Static assets
│   ├── src/                # React components and pages
│   ├── package.json        # Node.js dependencies
│   └── tsconfig.json       # TypeScript configuration
└── README.md               # Project documentation
```

---

## Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **Python** (v3.9 or higher)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/sorting-algorithms-visualizer.git
   cd sorting-algorithms-visualizer
   ```

2. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**:
   ```bash
   cd ../backend
   pip install -r requirements.txt
   ```

---

## Running the Application

### Start the Backend
1. Navigate to the [`backend`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fjustushaataja%2FDesktop%2FAlgorithms%2Fbackend%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/justushaataja/Desktop/Algorithms/backend") directory:
   ```bash
   cd backend
   ```
2. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

### Start the Frontend
1. Navigate to the [`frontend`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fjustushaataja%2FDesktop%2FAlgorithms%2Ffrontend%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/justushaataja/Desktop/Algorithms/frontend") directory:
   ```bash
   cd frontend
   ```
2. Run the React development server:
   ```bash
   npm start
   ```

3. Open your browser and go to `http://localhost:3000`.

---

## Contributing

Contributions are welcome! If you'd like to improve this project, feel free to fork the repository and submit a pull request.

---

## Author

Created by **Justus Haataja**.  
Feel free to connect with me on [GitHub](https://github.com/JustusHaataja).