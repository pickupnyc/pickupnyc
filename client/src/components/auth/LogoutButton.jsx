const LogoutButton = () => {
    const handleLogout = () => {
        window.open("/api/auth/logout", "_self");
    };

    return (
        <button
            aria-label="Logout button"
            className="bg-darkGreen hover:text-darkGreen border-darkGreen text-offWhite hover:bg-offWhite flex max-w-[140px] justify-center rounded-full border-2 px-6 py-2"
            onClick={handleLogout}
        >
            <span className="text-md font-bold tracking-wider">Logout</span>
        </button>
    );
};

export default LogoutButton;
