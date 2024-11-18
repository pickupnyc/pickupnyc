import { useState } from "react";

import { useUser } from "../hooks/useUser";

import Modal from "../components/Modal";
import MatchForm from "../components/MatchForm";

const Matches = () => {
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [showAuthError, setShowAuthError] = useState(false);

    const handleOpenForm = () => {
        if (!user) {
            setShowAuthError(true);
            setTimeout(() => setShowAuthError(false), 3000);
        } else {
            setIsOpen(true);
        }
    };

    const handleCloseForm = () => {
        setIsOpen(false);
    };

    return (
        <div className="mx-auto flex w-full max-w-[1440px] flex-col px-24 py-8">
            <div className="relative flex w-full flex-col items-center justify-center gap-y-4 rounded-xl bg-gray-100 p-4">
                <button
                    onClick={handleOpenForm}
                    className="flex max-w-[140px] justify-center rounded-full border-2 border-darkGreen bg-darkGreen px-6 py-4 text-offWhite hover:bg-offWhite hover:text-darkGreen"
                >
                    Create +
                </button>
                {showAuthError && (
                    <div className="absolute -bottom-10 rounded-md bg-red-500 px-4 py-2 text-white">
                        Only valid users can create a match!
                    </div>
                )}
            </div>

            <Modal isOpen={isOpen} onClose={handleCloseForm}>
                <MatchForm />
            </Modal>
        </div>
    );
};

export default Matches;
