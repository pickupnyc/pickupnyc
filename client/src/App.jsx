import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { UserProvider } from "./context/UserContext";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Fallback from "./pages/Fallback";
import Footer from "./components/ui/Footer";
import Login from "./pages/Login";
import Header from "./components/ui/Header";
import Matches from "./pages/Matches";
import MatchInfo from "./pages/MatchInfo";
import Help from "./pages/Help";
import Forum from "./pages/Forum";
import EditMatch from "./pages/EditMatch";

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
                                <Route path="/login" element={<Login />} />
                                <Route path="/matches" element={<Matches />} />
                                <Route path="/matches/:id" element={<MatchInfo />} />
                                <Route path="/matches/edit/:id" element={<EditMatch />} />
                                <Route path="/forum" element={<Forum />} />
                                <Route path="/help" element={<Help />} />
                                <Route path="*" element={<Fallback />} />
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
