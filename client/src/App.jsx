import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { UserProvider } from "./context/UserContext";
import Header from "./components/Header";
import Login from "./pages/Login";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <div className="h-screen w-full">
                    <Header />
                </div>
            ),
        },
        {
            path: "/login",
            element: <Login />,
        },
    ]);

    return (
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    );
}

export default App;
