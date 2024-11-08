// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import { UserProvider } from "./context/UserContext";
// import Header from "./components/Header";
// import Login from "./pages/Login";

// function App() {
//     const router = createBrowserRouter([
//         {
//             path: "/",
//             element: (
//                 <div className="h-screen w-full">
//                     <Header />
//                 </div>
//             ),
//         },
//         {
//             path: "/login",
//             element: <Login />,
//         },
//     ]);

//     return (
//         <UserProvider>
//             <RouterProvider router={router} />
//         </UserProvider>
//     );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Fallback from "./pages/Fallback";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar"; 
import Login from "./pages/Login"; 
import Header from "./components/Header";


function App() {
    return (
        <>
        <UserProvider>
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <div className="App flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/signup" element={<Signup />} />  
                            <Route path="*" element={<Fallback />} />
                            <Route path="/login" element={<Login/>} />
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