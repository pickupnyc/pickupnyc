import { Link } from "react-router-dom";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

import { useUser } from "../hooks/useUser";

const Header = () => {
    const { user } = useUser();

    return (
        <div className="flex w-full flex-row items-center justify-between border-b border-gray-200 px-24 py-6 bg-red-500">
            <div className="space-x-8">
                <Link to="/" className="text-black font-bold">Home</Link>
                <Link to="/matches" className="text-black font-bold">Forum</Link>
            </div>
            <div className="flex flex-row items-center justify-center">
                {user ? <LogoutButton /> : <LoginButton />}
                {user  && (
                    <img
                        src={'https://www.bing.com/ck/a?!&&p=d5c65e5da2ba3509a025e943e7942fb9c32759e9f3d4ef816073b732e1de37a4JmltdHM9MTczMDQxOTIwMA&ptn=3&ver=2&hsh=4&fclid=3fa412f8-9676-6bfa-1a78-07d9975f6a3a&u=a1L2ltYWdlcy9zZWFyY2g_cT1hdmF0YXIlMjBpY29uJkZPUk09SVFGUkJBJmlkPTk3Q0UyRUQ1QzlCOTRDOTgyN0U3RDUxNENDNDQ1RUI0MkVBODYwMTU&ntb=1'}
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
