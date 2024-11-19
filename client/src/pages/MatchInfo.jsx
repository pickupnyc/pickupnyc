import { useParams } from "react-router-dom";

const MatchInfo = () => {
    const { id } = useParams();
    return (
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-y-8 px-24 py-8">
            <h1>Match Details</h1>
            <p>Match ID: {id}</p>
        </div>
    );
};

export default MatchInfo;
