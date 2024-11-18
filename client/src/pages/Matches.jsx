import { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import Modal from "../components/Modal";
import MatchForm from "../components/MatchForm";
import AllMatches from "../components/AllMatches";
import Toast from "../components/Toast";

const Matches = () => {
    const nullUser = {user_id: -1};
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleOpenForm = () => {
        if (!user) {
            setShowToast(true);
        } else {
            setIsOpen(true);
        }
    };

    const handleCloseForm = () => {
        setIsOpen(false);
    };

    const handleCloseToast = () => {
        setShowToast(false);
    };

    return (
        <div className="mx-auto flex w-full max-w-[1440px] flex-col px-24 py-8 md:px-12">
            <div className="w-full flex justify-end mb-8">
                <button
                    onClick={handleOpenForm}
                    className="font-bold py-2.5 px-5 rounded transition-colors border-2 border-darkGreen bg-darkGreen text-offWhite hover:bg-offWhite hover:text-darkGreen"
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
                <MatchForm onClose={handleCloseForm} />
            </Modal>
            <AllMatches user={user ? user : nullUser}/>
            <Toast 
                show={showToast}
                onClose={handleCloseToast}
            />
        </div>
    );
};

export default Matches;