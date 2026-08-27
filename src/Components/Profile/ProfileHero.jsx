import { FaWallet, FaEdit, FaSave, FaTimes } from "react-icons/fa";

export default function ProfileHero({
    user, editing, formData, setFormData,
    onEdit, onSave, onCancel, onShowWalletInput
}) {
    return (
        <section className="pf-hero-info">
            <div className="pf-name-row">
        {editing ? (
            <input
            className="pf-name-input"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your name"
            />
        ) : (
            <h2 className="pf-name">{user?.name}</h2>
        )}

        <div className="pf-action-btns">
            {editing ? (
            <>
                <button className="pf-btn pf-btn-save" onClick={onSave}>
                <FaSave /> Save
                </button>
                <button className="pf-btn pf-btn-cancel" onClick={onCancel}>
                <FaTimes /> Cancel
                </button>
            </>
            ) : (
            <button className="pf-btn pf-btn-edit" onClick={onEdit}>
                <FaEdit /> Edit Profile
            </button>
            )}
        </div>
        </div>

        {user?.walletAddress ? (
        <div className="pf-wallet-row">
            <span className="pf-wallet-pill">
            <FaWallet className="pf-wallet-icon" />
            <span>{user.walletAddress}</span>
            </span>
            <button className="pf-wallet-pill pf-wallet-pill--empty" onClick={onShowWalletInput}>
            <FaEdit className="pf-wallet-icon" />
            <span>Change</span>
            </button>
        </div>
        ) : (
        <button className="pf-wallet-pill pf-wallet-pill--empty" onClick={onShowWalletInput}>
            <FaWallet className="pf-wallet-icon" />
            <span>Link TON Wallet</span>
        </button>
        )}
    </section>
    );
}