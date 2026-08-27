export default function ProfileDetails({ user, editing, formData, setFormData }) {
  return (
    <section className="pf-details">
      <div className="pf-stats-row">
        <div className="pf-stat">
          <span className="pf-stat-label">Email</span>
          {editing ? (
            <input
              className="pf-field-input"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email"
              type="email"
            />
          ) : (
            <span className="pf-stat-value">{user?.email}</span>
          )}
        </div>

        <div className="pf-stat">
          <span className="pf-stat-label">Wallet</span>
          <span className="pf-stat-value pf-stat-value--mono">
            {user?.walletAddress ?? "—"}
          </span>
        </div>

        <div className="pf-stat">
          <span className="pf-stat-label">Network</span>
          <span className="pf-stat-value pf-stat-tag">Testnet</span>
        </div>
      </div>

      {editing && (
        <div className="pf-password-row">
          <span className="pf-stat-label">New Password</span>
          <input
            className="pf-field-input"
            type="password"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            placeholder="Leave blank to keep current"
          />
        </div>
      )}
    </section>
  );
}