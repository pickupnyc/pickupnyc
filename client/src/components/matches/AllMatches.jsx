import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import MatchCard from "./MatchCard";

const AllMatches = ({ borough, sortOption }) => {
    const [matches, setMatches] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([]);

    useEffect(() => {
        const fetchAllMatches = async () => {
            const response = await fetch("/api/pickup");
            const data = await response.json();
            console.log(data);
            setMatches(data.pickupGames);
        };

        fetchAllMatches();
    }, []);

    useEffect(() => {
        let filtered = matches;
        if (borough) {
            filtered = filtered.filter((match) => match.borough === borough);
        }

        if (sortOption === "recent") {
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sortOption === "latestStart") {
            filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        }

        setFilteredMatches(filtered);
    }, [matches, borough, sortOption]);

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredMatches.length > 0 ? (
                    filteredMatches.map((match) => (
                        <MatchCard
                            key={match.id}
                            id={match.id}
                            host={match.host}
                            title={match.title}
                            borough={match.borough}
                            date={match.date}
                            time={match.time}
                            location={match.location}
                            count={match.count}
                            capacity={match.capacity}
                            premium={match.premium}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-3xl text-gray-500">Loading matches...</p>
                )}
            </div>
        </div>
    );
};

AllMatches.propTypes = {
    borough: PropTypes.string.isRequired,
    sortOption: PropTypes.string.isRequired,
};

export default AllMatches;
