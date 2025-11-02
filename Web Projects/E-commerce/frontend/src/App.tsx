import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<h1>Welcome to the E-commerce App</h1>} />
          {/* add more routes here */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
