import React from "react";
import { useAuth } from "../../contexts/authContext";
import NotFound from "../NotFound";
import Navbar from "../bars/Navbar";

const Profile = () => {
    const { userLoggedIn, currentUser } = useAuth()

    return (
        <>
            {!userLoggedIn && <NotFound />}
            {userLoggedIn
                &&
                <>
                    <Navbar />
                </>
            }
        </>
    );
}

export default Profile;