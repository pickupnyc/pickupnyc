import { useState } from "react";
import { useUser } from "../hooks/useUser";

import Modal from "../components/Modal";
import MatchForm from "../components/MatchForm";
import AllMatches from "../components/AllMatches";
import Toast from "../components/Toast";

const Matches = () => {
    const { user } = useUser();

    const [isOpen, setIsOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [borough, setBorough] = useState("");
    const [sortOption, setSortOption] = useState("recent");

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

    const handleBoroughChange = (event) => {
        setBorough(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    return (
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-y-8 px-24 py-8">
            <div className="flex w-full items-center justify-between">
                <div className="flex gap-x-4">
                    <select
                        onChange={handleBoroughChange}
                        className="rounded border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-darkGreen"
                    >
                        <option value="">All Boroughs</option>
                        <option value="Manhattan">Manhattan</option>
                        <option value="Brooklyn">Brooklyn</option>
                        <option value="Queens">Queens</option>
                        <option value="Bronx">Bronx</option>
                        <option value="Staten Island">Staten Island</option>
                    </select>

                    <select
                        onChange={handleSortChange}
                        className="rounded border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-darkGreen"
                    >
                        <option value="recent">Sort by Recent</option>
                        <option value="latestStart">Sort by Latest Start Date</option>
                    </select>
                </div>
                <button
                    onClick={handleOpenForm}
                    className="rounded border-2 border-darkGreen bg-darkGreen px-5 py-2.5 font-bold text-offWhite transition-colors hover:bg-offWhite hover:text-darkGreen"
                >
                    Create +
                </button>
            </div>

            <AllMatches borough={borough} sortOption={sortOption} />

            <Modal isOpen={isOpen} onClose={handleCloseForm}>
                <MatchForm onClose={handleCloseForm} />
            </Modal>
            <Toast show={showToast} onClose={handleCloseToast} />
        </div>
    );
};

export default Matches;
