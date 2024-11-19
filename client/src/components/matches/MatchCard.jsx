import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

import PropTypes from "prop-types";

import Toast from "../ui/Toast";
import { Users, UserPlus, Settings, Info, Calendar, Building, MapPin, Clock, BadgeCheck } from "lucide-react";

const MatchCard = ({ id, host, title, borough, date, time, location, count, capacity, premium }) => {
    const { user } = useUser();
    const [showRegisterError, setShowRegisterError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const formatTime = (timeString) => {
        const [hours, minutes, seconds] = timeString.split(":");
        const date = new Date();
        date.setHours(hours, minutes, seconds);
        return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
    };

    const handleRegisterUser = async () => {
        if (!user) {
            setErrorMessage("Must be a valid user to join a match!");
            setShowRegisterError(true);
        } else {
            try {
                const response = await fetch("/api/participants", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        pickup_id: id,
                        user_id: user.user_id,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to register user for this match.");
                }

                const data = await response.json();
                console.log("User registered successfully:", data);
            } catch (error) {
                console.error("Error registering user:", error.message);
                setErrorMessage("Failed to register user to match.");
                setShowRegisterError(true);
            }
        }
    };

    const handleCloseRegisterError = () => {
        setShowRegisterError(false);
    };

    return (
        <div className="overflow-hidden rounded-lg border border-[#555] bg-white">
            <div className="h-40">
                <img src={"/field.webp"} alt={`${borough} Match`} className="h-full w-full object-cover" />
            </div>

            <div className="flex flex-col gap-y-2 p-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    {premium && <BadgeCheck className="text-yellow-500" />}
                </div>
                <div className="flex items-center gap-x-4">
                    <Building />
                    <p className="text-gray-600">{borough}</p>
                </div>
                <div className="flex items-center gap-x-4">
                    <Calendar />
                    <p className="text-gray-600">{new Date(date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-x-4">
                    <Clock />
                    <p className="text-gray-600">{formatTime(time)}</p>
                </div>
                <div className="flex items-center gap-x-4">
                    <MapPin />
                    <p className="text-gray-600">{location}</p>
                </div>
                <div className="flex items-center gap-x-4">
                    <Users />
                    <p className="text-gray-600">
                        {count}/{capacity}
                    </p>
                </div>
                <div className="flex items-center">
                    {user && user.user_id === host ? (
                        <>
                            <Link to={`/matches/edit/${id}`} className="ml-auto">
                                <button className="flex items-center justify-center gap-x-2 rounded-xl border-2 border-darkGreen bg-darkGreen px-3 py-2 text-white hover:bg-white hover:text-darkGreen">
                                    Edit <Settings size={20} />
                                </button>
                            </Link>
                            <Link to={`/matches/${id}`} className="ml-auto hover:text-darkGreen">
                                <Info />
                            </Link>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleRegisterUser}
                                className="ml-auto flex items-center justify-center gap-x-2 rounded-xl border-2 border-darkGreen bg-darkGreen px-3 py-2 text-white hover:bg-white hover:text-darkGreen"
                            >
                                Register <UserPlus size={20} />
                            </button>
                            <Link to={`/matches/${id}`} className="ml-auto hover:text-darkGreen">
                                <Info />
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <Toast show={showRegisterError} onClose={handleCloseRegisterError}>
                {errorMessage}
            </Toast>
        </div>
    );
};

MatchCard.propTypes = {
    id: PropTypes.number.isRequired,
    host: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    borough: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    capacity: PropTypes.number.isRequired,
    premium: PropTypes.bool.isRequired,
};

export default MatchCard;
