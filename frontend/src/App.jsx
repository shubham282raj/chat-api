import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home";

function App() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
