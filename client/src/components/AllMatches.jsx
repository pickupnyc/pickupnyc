import { useState, useEffect } from "react"
import styles from "../components/Forum.module.css"

export default function AllMatches() {
    const [matches, setMatches] = useState([]);
    const [uniqueBoroughs, setUniqueBoroughs] = useState([]);
    const [activeKey, setActiveKey] = useState(null);



    useEffect(() => {
        const allMatches = async () => {
            const response = await fetch('/api/pickup');
            const data = await response.json();
            console.log(data);
            setMatches(data);
        }
        allMatches();
    }, []);

    useEffect(() => {
        setUniqueBoroughs([...new Set(matches.map((match) => match.borough))]);
        console.log(uniqueBoroughs);
        console.log("The line right above this is the list of unique boroughs.");
    }, [matches]);

    const toggleAccordion = (key) => {
        setActiveKey(activeKey === key ? null : key);
    };

    return (
        <div className={`accordion accordion-flush ${styles.accordionHead}`} id="accordionFlushExample">
            {uniqueBoroughs.map((borough) => (
                <div className="accordion-item" key={borough}>
                    <h2 className="accordion-header">
                        <button
                            className={`accordion-button ${activeKey !== borough ? 'collapsed' : ''}`}
                            type="button"
                            onClick={() => toggleAccordion(borough)}
                            aria-expanded={activeKey === borough}
                            aria-controls={`flush-collapse-${borough}`}
                        >
                            {borough}
                        </button>
                    </h2>
                    <div
                        id={`flush-collapse-${borough}`}
                        className={`accordion-collapse collapse ${activeKey === borough ? 'show' : ''}`}
                        aria-labelledby={`heading-${borough}`}
                    >
                        <div className={`accordion-body ${styles.accordionBody}`}>
                            {/* Display matches for this borough */}
                            {matches
                                .filter(match => match.borough === borough)
                                .map(match => (
                                    <div key={match.id} className="border-bottom py-3">
                                        {/* Add your match details here. This is just an example structure: */}
                                        <h5>Date: {match.date}</h5>
                                        <p>Location: {match.location}</p>
                                        <p>Time: {match.time}</p>
                                        {/* Add more match details as needed */}
                                    </div>
                                ))
                            }
                        </div>
                        
                    </div>
                </div>
            ))}
        </div>
    );
}