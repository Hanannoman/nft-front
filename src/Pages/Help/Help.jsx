    import React from "react";
    import "./Help.css";

    export default function Help() {
    return (
        <div className="help-container">

        <h1 className="help-title">Help Center</h1>

        <section className="help-card">
            <h2>Wallets and Addresses</h2>
            <p>
            TON addresses usually look like <code>EQ…</code> or <code>UQ…</code>.  
            You paste yours in Profile to <strong>link</strong> it to your account.  
            Never paste a <strong>seed phrase</strong> or <strong>private key</strong>.
            </p>
        </section>
        <section className="help-card security">
            <h2>Security</h2>
            <p>
            <strong>Never</strong> share your seed phrase, recovery words, or private keys.  
            This app only needs your <strong>public</strong> address.
            </p>
        </section>

        <section className="help-card">
            <h2>Troubleshooting</h2>
            <ul>
            <li><strong>CORS</strong> — open the client using <code>http://localhost</code>.</li>
            <li><strong>401</strong> — log in again; token may have expired.</li>
            <li><strong>Cannot buy your own NFT</strong> — expected behavior.</li>
            </ul>
        </section>

        <section className="help-card">
            <h2>Glossary</h2>
            <dl>
            <dt>nanoTON</dt>
            <dd>Smallest TON unit used in this app.</dd>

            <dt>TON</dt>
            <dd>1 TON = 10⁹ nanoTON.</dd>

            <dt>Memo / comment</dt>
            <dd>Short text attached to a TON transfer.</dd>

            <dt>Buyer / Seller</dt>
            <dd>Buyer initiates purchase; seller owns the NFT.</dd>

            <dt>Owner</dt>
            <dd>User who currently owns the NFT in the app database.</dd>
            </dl>
        </section>

        <footer className="help-footer">
            <a href="/">Back to Home</a> or <a href="/marketplace">Marketplace</a>
        </footer>

        </div>
    );
    }