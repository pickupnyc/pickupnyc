import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="mx-auto w-full max-w-[1440px] px-24 py-8">
            <div className="relative flex h-full w-full flex-col gap-y-12 overflow-hidden rounded-lg p-20">
                <h1 className="text-primary text-6xl font-bold italic">Welcome to PickUpNYC</h1>
                <div className="flex flex-row justify-between">
                    <div className="flex w-1/2 flex-col gap-y-8 p-4">
                        <p className="text-left text-xl font-medium leading-relaxed">
                            Set up and join local soccer pickup matches easily. With filters for location, skill level,
                            and time, finding the perfect game is simple. Designed for all fans, it’s the ultimate app
                            for connecting, discussing, and playing soccer in New York City.
                        </p>
                        <Link
                            to="/login"
                            className="bg-darkGreen hover:text-darkGreen border-darkGreen text-offWhite hover:bg-offWhite flex max-w-[140px] justify-center rounded-full border-2 px-6 py-4"
                        >
                            <span className="font-bold">Join now</span>
                        </Link>
                        {/* <img src="/homepagelogo.png" alt="PickUp NYC Logo" className="mx-auto mt-5 h-auto w-1/2" /> */}
                    </div>
                    <img src="/homepage.png" alt="Home Page" className="h-auto w-1/2 rounded-xl" />
                </div>
            </div>
        </div>
    );
}

export default Home;
