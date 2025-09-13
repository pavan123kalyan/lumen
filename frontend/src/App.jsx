import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BillingHistory from "./components/BillingHistory";
import Recommendations from "./components/Recommendations";

function App() {

  return (
    <Router>
      {/* Navigation */}
      <nav className="p-4 bg-gray-800 text-white flex gap-4">
        <Link to="/billing-history">Billing History</Link>
        <Link to="/recommendations">Recommendations</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/billing-history" element={<BillingHistory />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
    </Router>
  );
}

export default App;