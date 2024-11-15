import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { UserProvider } from "./context/UserContext";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Fallback from "./pages/Fallback";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Header from "./components/Header";
import Matches from "./pages/Matches";
import Forum from "./pages/Forum";

function App() {
    return (
        <>
            <UserProvider>
                <Router>
                    <div className="flex h-screen flex-col bg-offWhite">
                        <Header />
                        <div className="flex-grow">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="*" element={<Fallback />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/matches" element={<Matches />} />
                                <Route path="/forum" element={<Forum />} />
                            </Routes>
                        </div>
                        <Footer />
                    </div>
                </Router>
            </UserProvider>
        </>
    );
}

export default App;
