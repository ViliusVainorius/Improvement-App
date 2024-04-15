import ProfileStats from "./ProfileStats";

const ProfileInformation = ({ currentUser }) => {
    // console.log(currentUser)

    const email = (currentUser.email || '').toLowerCase();
    const atIndex = email.indexOf('@');
    const username = atIndex !== -1 ? email.substring(0, atIndex).charAt(0).toUpperCase() + email.substring(1, atIndex) : '';

    return (
        <>
            <div className="profile-info-div">
                <div className="profile-card">
                    <div className="image-wrapper">
                        <img src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" alt="profile-unknown" />
                    </div>
                    <div className="content-wrapper">
                        <div className="fixed-content">
                            <div className="profile-name">
                                {username}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="statistics-div">
                    <h2>Profile statistics</h2>
                    <ProfileStats user={currentUser} />
                </div>
            </div>
        </>
    );
}

export default ProfileInformation;