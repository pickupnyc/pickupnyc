import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MatchInfo = () => {
    const { id } = useParams();
    const [pickupData, setPickupData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPickupDetails = async () => {
            try {
                const response = await fetch(`/api/participants/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch pickup details");
                }
                const data = await response.json();
                setPickupData(data);
            } catch (err) {
                console.error(err);
                setError(err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPickupDetails();
        }
    }, [id]);

    const formatTime = (timeString) => {
        const [hours, minutes, seconds] = timeString.split(":");
        const date = new Date();
        date.setHours(hours, minutes, seconds);
        return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
    };

    return (
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-y-8 px-24 py-8">
            <h1 className="text-2xl font-bold">Match Info</h1>
            {pickupData && (
                <div className="flex flex-row gap-x-8 text-xl">
                    <img src="/field.webp" className="w-[300px] rounded-xl" />
                    <div className="">
                        <p>
                            <strong>Title:</strong> {pickupData.title}
                        </p>
                        <p>
                            <strong>Borough:</strong> {pickupData.borough}
                        </p>
                        <p>
                            <strong>Date:</strong> {new Date(pickupData.date).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Time:</strong> {formatTime(pickupData.time)}
                        </p>
                        <p>
                            <strong>Location:</strong> {pickupData.location}
                        </p>
                        <p>
                            <strong>Rules:</strong> {pickupData.rules || "No rules."}
                        </p>
                        <p>
                            <strong>Current Participants:</strong> {pickupData.count}/{pickupData.capacity}
                        </p>
                        <p>
                            <strong>Premium:</strong> {pickupData.premium ? "Yes" : "No"}
                        </p>
                    </div>
                </div>
            )}

            {loading && <p>Loading participants...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {!loading && !error && (
                <div>
                    <h2 className="text-xl font-semibold">Participants</h2>
                    {pickupData && pickupData.participants.length > 0 ? (
                        <ul className="list-disc pl-6 text-xl">
                            {pickupData.participants.map((participant, index) => (
                                <li key={index}>
                                    {participant.username} - {participant.status}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No participants for this match.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default MatchInfo;
