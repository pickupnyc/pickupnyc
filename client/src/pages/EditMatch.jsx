import { useParams, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import EditMatchForm from "../components/matches/EditMatchForm";
import Modal from "../components/ui/Modal";

const EditMatch = () => {
    const { id } = useParams();
    const [matchData, setMatchData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    // Modal state
    const [isOpen, setIsOpen] = useState(true);

    const handleCloseForm = () => {
        setIsOpen(false);
        navigate("/matches")
    };

    useEffect(() => {
        const fetchMatchData = async () => {
            try {
                const response = await fetch(`/api/pickup/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch match data");
                }
                const data = await response.json();
                setMatchData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMatchData();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-y-8 px-24 py-8">
            <Modal isOpen={isOpen} onClose={handleCloseForm}>
                <EditMatchForm matchData={matchData} />
            </Modal>
        </div>
    );
};

export default EditMatch;

