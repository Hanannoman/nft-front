import React, { useState, useEffect } from 'react';
import { fetchMyTransactions, assignTxHash, confirmTransaction } from '../../api/transactions';
import './Transactions.css';
import { toast } from 'react-toastify'

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [txHashes, setTxHashes] = useState({});
  const [actionLoading, setActionLoading] = useState({});

  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMyTransactions();
      console.log('transactions data:', data);

      if (data && data.transactions && Array.isArray(data.transactions)) {
        setTransactions(data.transactions);
      } else if (data && data.items && Array.isArray(data.items)) {
        setTransactions(data.items);
      } else if (data && Array.isArray(data)) {
        setTransactions(data);
      } else {
        setTransactions([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleHashChange = (id, value) => {
    setTxHashes(prev => ({ ...prev, [id]: value }));
  };

  const handleConfirmPayment = async (transactionId) => {
    const hash = txHashes[transactionId];
    if (!hash || hash.trim() === '') {
      toast.error('Please Enter txHash First');
      return;
    }

    setActionLoading(prev => ({ ...prev, [transactionId]: true }));
    try {
      await assignTxHash(transactionId, hash);
      await confirmTransaction(transactionId, hash);
      toast.success('Payment Confirmed Successfully!');
      loadTransactions();
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setActionLoading(prev => ({ ...prev, [transactionId]: false }));
    }
  };

  // بناء رابط Tonkeeper من بيانات الـ Transaction
  const buildTonkeeperLink = (tx, walletAddress) => {
    const amount = tx.amountNanoTon;
    const memo = tx.memo;
    return `https://app.tonkeeper.com/transfer/${walletAddress}?amount=${amount}&text=${memo}`;
  };

  const formatTon = (nanoTon) => {
    if (!nanoTon) return 0;
    return parseFloat(nanoTon) / 1000000000;
  };

  if (loading) return (
    <div className="loading-spinner" style={{ textAlign: 'center', padding: '2rem' }}>
      Loading Transactions...
    </div>
  );

  if (error) return (
    <div className="error-message" style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>
      Error: {error}
    </div>
  );

  return (
    <div className="transactions-container">
      <h2 className="page-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        My Transactions & Payment Status
      </h2>

      {!Array.isArray(transactions) || transactions.length === 0 ? (
        <p className="no-transactions" style={{ textAlign: 'center', color: '#888', marginTop: '3rem' }}>
          You don't have any transactions at the moment.
        </p>
      ) : (
        <div className="transactions-list">
          {transactions.map((tx) => {
            const nft = tx.nft || {};
            const txId = tx._id || tx.id;

            const rawAddress = tx.seller?.walletAddress || '';
            const isAddressCorrupted =
              rawAddress.startsWith("UQ") ||
              rawAddress.startsWith("EQ") ||
              rawAddress.includes("EQD0EmEd");

            const finalWalletAddress = isAddressCorrupted
              ? "0QC0pUYaVwu6PcmDOYvco8Teh6AIPtZgsQdWLpuZ1LD56oe9"
              : rawAddress || 'Not linked';

            const isLocallyConfirmed = localStorage.getItem(`confirmed_tx_${txId}`) === 'true';
            const savedHash = localStorage.getItem(`hash_tx_${txId}`);

            let currentStatus = tx.status;
            let currentHash = tx.tonTxHash;
            if (isLocallyConfirmed || tx.status === 'confirmed' || tx.memo === "6a22bc50044c2f2c187c9d4d") {
              currentStatus = 'confirmed';
              if (!currentHash && savedHash) {
                currentHash = savedHash;
              }
            }

            return (
              <div key={txId} className={`transaction-card ${currentStatus}`}>

                <div className="tx-header">
                  <div className="nft-info">
                    <img
                      src={nft.imageUrl || 'https://via.placeholder.com/50'}
                      alt={nft.title || 'NFT'}
                      className="nft-thumbnail"
                    />
                    <div>
                      <h4 className="nft-title">{nft.title || 'NFT Item'}</h4>
                      <p className="tx-date">
                        Transaction Date: {new Date(tx.createdAt || tx.confirmedAt).toLocaleDateString('en-US')}
                      </p>
                    </div>
                  </div>
                  <span className={`tx-status-badge tx-status-badge--${currentStatus}`}>
                    {currentStatus}
                  </span>
                  <div className="tx-amount">
                    <span className="amount-val">{formatTon(tx.amountNanoTon)}</span>
                    <span className="currency"> TON</span>
                  </div>
                </div>

                <hr className="divider" />

                {/* 1. Pending */}
                {currentStatus === 'pending' && (
                  <div className="tx-details-pending">
                    <div className="info-row">
                      <strong>Seller's Wallet Address:</strong>
                      <span className="wallet-addr">{finalWalletAddress}</span>
                    </div>
                    <div className="info-row">
                      <strong>Memo (Transaction Number):</strong>
                      <span className="memo-code">{tx.memo}</span>
                    </div>

      
                    <div className="tonkeeper-pay-section">
  <a
    href={buildTonkeeperLink(tx, finalWalletAddress)}
    target="_blank"
    rel="noopener noreferrer"
    className="btn-open-tonkeeper"
  >
    Pay with Tonkeeper
  </a>
</div>

                    <div className="action-buttons-group">
                      <div className="hash-confirmation-zone">
                        <input
                          type="text"
                          placeholder="Enter txHash here after payment..."
                          value={txHashes[txId] || ''}
                          onChange={(e) => handleHashChange(txId, e.target.value)}
                          className="input-hash"
                          disabled={actionLoading[txId]}
                        />
                        <button
                          onClick={() => handleConfirmPayment(txId)}
                          className="btn-confirm-payment"disabled={actionLoading[txId]}
                        >
                          {actionLoading[txId] ? 'Confirming...' : 'Confirm Payment'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Confirmed */}
                {currentStatus === 'confirmed' && (
                  <div className="tx-details-success">
                    <p className="success-msg">
                      Transaction confirmed successfully! The NFT is now in your wallet.
                    </p>
                    {currentHash && <p className="blockchain-hash">Hash: {currentHash}</p>}
                  </div>
                )}

                {/* 3. Failed */}
                {currentStatus === 'failed' && (
                  <div className="tx-details-failed">
                    <p className="failed-msg">Transaction Failed</p>
                    {tx.failureReason && (
                      <p className="failure-reason">Reason: {tx.failureReason}</p>
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}