import React from "react";
import Sidebar from "./Sidebar"; // Assuming Sidebar component is imported from the correct location
import Navbar from './Navbar'; // Assuming NavBar component is imported from the correct location
import Tasks from './Tasks'; // Import the Tasks component

const Home = () => {
    return (
        <div className="flex h-screen font-custom-font"> {/* Set the container height to 100vh */}
            <Sidebar className="h-screen" /> {/* Set the sidebar height to 100% of its parent */}
            <div className="flex flex-col w-full">
                <Navbar />
                <div className="p-6 h-full w-full bg-pink-200 overflow-y-auto"> {/* Make the main content scrollable */}
                    <Tasks /> {/* Add the Tasks component */}
                </div>
            </div>
        </div>
    );
};

export default Home;
