import React from "react";

function Help() {
    return (
        <main className="bg-offWhite min-h-screen py-10 px-4">
            <div className="container mx-auto max-w-4xl bg-white p-6 border-2 rounded-lg shadow-2xl">
                <h1 className="text-3xl font-bold text-darkGreen text-center mb-8">Help & FAQ</h1>
                
                {/* Section 1: Creating a Match */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">How to Create a Soccer Pickup Match</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        To create a soccer pickup match, first <strong>sign up</strong> for an account or <strong>log in</strong> if you already have one. Once you're logged in, navigate to the <strong>Matches</strong> page and click the button that says <strong>Create Match</strong>. From there, fill out all the required details, such as the time, location, and capacity of the match. Creators of pickup matches are allowed to <strong>edit</strong> or <strong>delete</strong> their matches at any time.
                    </p>
                </section>

                {/* Section 2: Joining a Match */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">How to Join a Match</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        To join a soccer pickup match, browse the list of available matches on the <strong>Matches</strong> page. Once you find a match you'd like to join, click the <strong>Join Match</strong> button. You can also use filters to find matches by <strong>time</strong>, <strong>location</strong>, or <strong>capacity</strong>. If a match reaches its maximum capacity, you will no longer be able to join that match.
                    </p>
                </section>

                {/* Section 3: Using the Forums */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Using the Forums</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Visit the <strong>Forums</strong> page to get more details about a match and see what other users are saying. You can post questions, share updates, or communicate with others in the community. This is a great way to coordinate or ask about specific match details.
                    </p>
                </section>

                {/* Section 4: Managing Your Account */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Managing Your Account</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        You can manage your account settings by clicking on your profile in the top-right corner. From there, you can update your personal information, change your password, and view your active matches. Remember to log out when you're done to keep your account secure.
                    </p>
                </section>

                {/* Section 5: Additional Support */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Need More Help?</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        If you have any further questions or encounter any issues, feel free to reach out to our support team via the <strong>Contact Us</strong> page. We're here to help!
                    </p>
                </section>
            </div>
        </main>
    );
}

export default Help;
