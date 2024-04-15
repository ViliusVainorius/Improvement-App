import React from "react";
import { useAuth } from "../../contexts/authContext";
import NotFound from "../NotFound";
import Navbar from "../bars/Navbar";
import "./profile.css"
import ProfileInformation from "./ProfileComponents/ProfileInformation";

const Profile = () => {

    const { userLoggedIn, currentUser } = useAuth()


    return (
        <>
            {!userLoggedIn && <NotFound />}
            {userLoggedIn
                &&
                <>
                    <Navbar />
                    <div className="component-wrapper">
                        <ProfileInformation currentUser={currentUser} />
                    </div>
                </>
            }
        </>
    );
}

export default Profile;