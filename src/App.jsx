import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation.jsx";
import Home from "./pages/Home.jsx";
import ExploreGraph from "./pages/ExploreGraph.jsx";
import Timeline from "./pages/Timeline.jsx";
import Ask from "./pages/Ask.jsx";
import About from "./pages/About.jsx";
import Jinshang from "./pages/Jinshang.jsx";
import Travel from "./pages/Travel.jsx";
import SanDiaoCaiSu from "./components/SanDiaoCaiSu.jsx";

function AppContent() {
  const location = useLocation();
  const isFullBleedRoute = ["/", "/timeline", "/explore", "/travel", "/ask", "/jinshang"].includes(location.pathname);
  const pageShellClassName = isFullBleedRoute ? "page-shell page-shell--fullbleed" : "page-shell";

  return (
    <div className="app-shell">
      <Navigation />
      <main className={pageShellClassName}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<SanDiaoCaiSu />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/ask" element={<Ask />} />
          <Route path="/about" element={<About />} />
          <Route path="/jinshang" element={<Jinshang />} />
          <Route path="/travel" element={<Travel />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
