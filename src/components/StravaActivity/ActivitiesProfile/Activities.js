import { useAuth } from "../../../contexts/authContext";
import Navbar from "../../bars/Navbar";
import NotFound from "../../NotFound";
import ActivitiesListing from "./ActivitiesListing";
import './activities.css';

const Activities = () => {
    const { userLoggedIn, currentUser } = useAuth()


    return (
        <>
            {!userLoggedIn && <NotFound />}
            {userLoggedIn
                &&
                <>
                    <Navbar />
                    <ActivitiesListing />
                </>
            }
        </>
    );
}

export default Activities;