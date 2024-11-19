import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MatchInfo = () => {
    const { id } = useParams();
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await fetch(`/api/participants/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch participants");
                }
                const data = await response.json();
                setParticipants(data);
            } catch (err) {
                console.error(err);
                setError(err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchParticipants();
        }
    }, [id]);

    return (
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-y-8 px-24 py-8">
            <h1 className="text-2xl font-bold">Match Info</h1>
            <p>Match ID: {id}</p>

            {loading && <p>Loading participants...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {!loading && !error && (
                <div>
                    <h2 className="text-xl font-semibold">Participants</h2>
                    {participants.length > 0 ? (
                        <ul className="list-disc pl-6">
                            {participants.map((participant) => (
                                <li key={participant.id}>
                                    {participant.user_id} - Status: {participant.status}
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
