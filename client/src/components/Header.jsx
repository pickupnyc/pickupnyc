import { Link } from "react-router-dom";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

import { useUser } from "../hooks/useUser";

const Header = () => {
    const { user } = useUser();

    return (
        <div className="mx-auto flex h-20 w-full max-w-[1440px] flex-row items-center justify-between px-24 py-6 md:h-24">
            <div className="space-x-8">
                <Link to="/">
                    <span className="text-primary text-3xl font-bold">PickUpNYC</span>
                </Link>
            </div>
            <div className="flex flex-row gap-x-8">
                <Link to="/" className="hover:bg-teaGreen flex items-center rounded-full px-5 py-3">
                    <span className="text-primary font-bold tracking-wide">Home</span>
                </Link>
                <Link to="/matches" className="hover:bg-teaGreen flex items-center rounded-full px-5 py-3">
                    <span className="text-primary font-bold tracking-wide">Matches</span>
                </Link>
                <Link to="/forum" className="hover:bg-teaGreen flex items-center rounded-full px-5 py-3">
                    <span className="text-primary font-bold tracking-wide">Forum</span>
                </Link>
                <Link to="/help" className="hover:bg-teaGreen flex items-center rounded-full px-5 py-3">
                    <span className="text-primary font-bold tracking-wide">Help</span>
                </Link>
            </div>
            <div className="flex flex-row">
                {user ? <LogoutButton /> : <LoginButton />}
                {/* {user && (
                    <img
                        src={
                            "https://www.bing.com/ck/a?!&&p=d5c65e5da2ba3509a025e943e7942fb9c32759e9f3d4ef816073b732e1de37a4JmltdHM9MTczMDQxOTIwMA&ptn=3&ver=2&hsh=4&fclid=3fa412f8-9676-6bfa-1a78-07d9975f6a3a&u=a1L2ltYWdlcy9zZWFyY2g_cT1hdmF0YXIlMjBpY29uJkZPUk09SVFGUkJBJmlkPTk3Q0UyRUQ1QzlCOTRDOTgyN0U3RDUxNENDNDQ1RUI0MkVBODYwMTU&ntb=1"
                        }
                        alt="User Avatar"
                        className="ml-4 h-10 w-10 rounded-full"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${user.username}`;
                        }}
                    />
                )} */}
            </div>
        </div>
    );
};

export default Header;
