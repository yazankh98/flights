import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/homaPage/HomePage";
import ResultsPage from "./components/ResultsPage/ResultsPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/results" element={<ResultsPage/>} />
      </Routes>
    </Router>
  );
}

export default App;