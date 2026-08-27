import { FaWallet } from "react-icons/fa";

export default function ProfileCover({ coverImage, user }) {
    return (
    <>
        <div className="pf-cover">
            <img src={coverImage} alt="cover" className="pf-cover-img" />
            <div className="pf-cover-overlay" />
            </div>
            <div className="pf-avatar-ring">
        <div className="pf-avatar">{user?.name?.[0]?.toUpperCase() ?? "?"}</div>
        </div>
    </>
    );
}
