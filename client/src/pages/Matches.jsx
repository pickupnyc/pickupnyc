import { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import Modal from "../components/Modal";
import MatchForm from "../components/MatchForm";
import AllMatches from "../components/AllMatches";

const Matches = () => {
    const [matches, setMatches] = useState([]);
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenForm = () => {
        if (!user) {
            console.error("Must be authenticated!");
        } else {
            setIsOpen(true);
        }
    };

    const handleCloseForm = () => {
        setIsOpen(false);
    };


    
    return (
        <div className="mx-auto flex w-full max-w-[1440px] flex-col px-24 py-8">
            <div className="flex w-full items-center justify-center">
                <button
                    onClick={handleOpenForm}
                    className="flex max-w-[140px] justify-center rounded-full border-2 border-darkGreen bg-darkGreen px-6 py-4 text-offWhite hover:bg-offWhite hover:text-darkGreen"
                >
                    Create +
                </button>
            </div>

            <Modal isOpen={isOpen} onClose={handleCloseForm}>
                <MatchForm />
            </Modal>
            <AllMatches matches={matches} />
        </div>
    );
};

export default Matches;
