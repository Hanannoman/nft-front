
import { FaWallet, FaTimes } from "react-icons/fa";
export default function LinkWalletForm({ walletInput, setWalletInput, onLink, onCancel }) {
  return (
    <section className="pf-link-wallet">
      <div className="pf-link-wallet-inner">
        <FaWallet className="pf-link-wallet-icon" />
        <input
          className="pf-wallet-input"
          value={walletInput}
          onChange={e => setWalletInput(e.target.value)}
          placeholder="Enter TON wallet address (UQ...)"
        />
        <div className="pf-link-wallet-btns">
          <button className="pf-btn pf-btn-save" onClick={onLink}>
            <FaWallet /> Link Wallet
          </button>
          <button className="pf-btn pf-btn-cancel" onClick={onCancel}>
            <FaTimes /> Cancel
          </button>
        </div>
      </div>
    </section>
  );
}