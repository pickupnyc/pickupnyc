import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/auth/login/success", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                    },
                });

                if (response.ok) {
                    const resObject = await response.json();
                    setUser(resObject.user);
                } else {
                    throw new Error("Authentication failed");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
