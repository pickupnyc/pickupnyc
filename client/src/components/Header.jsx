import { Link } from "react-router-dom";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

import { useUser } from "../hooks/useUser";

const Header = () => {
    const { user } = useUser();

    return (
        <div className="flex w-full flex-row items-center justify-between border-b border-gray-200 px-24 py-6">
            <div className="">
                <Link to="/matches">Matches</Link>
            </div>
            <div className="flex flex-row items-center justify-center">
                {user ? <LogoutButton /> : <LoginButton />}
                {user && user.img && (
                    <img
                        src={user.img}
                        alt="User Avatar"
                        className="ml-4 h-10 w-10 rounded-full"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${user.username}`;
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default Header;
