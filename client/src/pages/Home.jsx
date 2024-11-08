import React from 'react';

function Home() {
    return (
        <>
            <div className="p-10">
                <h1 className="text-3xl text-blue-500 font-bold mb-5">Welcome to Pick Up NYC</h1>
                <div className="flex justify-center  p-5">
                    <img src='/homepage.png' alt="Home Page" className="rounded w-1/2 h-auto mr-5"/>
                    <div className="p-4 w-1/2">
                        <p className="text-lg leading-relaxed text-center">
                            PickupNYC enables users to set up and join local soccer pickup matches easily. With filters for location, skill level, and time, finding the perfect game is simple. Designed for all fans, it’s the ultimate app for connecting, discussion, and playing soccer in New York City.
                        </p>

                        <img src="/homepagelogo.png" alt="PickUp NYC Logo" className="w-1/2 h-auto mt-5 mx-auto"/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;