import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUser, FaTag, FaArrowLeft ,FaShoppingCart} from "react-icons/fa";
import { getNFTDetails, purchaseNft } from "../../api/nfts";
import { toast } from 'react-toastify'
import "./ShowNftInfo.css";

const BASE_URL = 'http://localhost:3000/api/v1';

export default function ShowNftInfo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tonPriceUsd, setTonPriceUsd] = useState(null);

  useEffect(() => {
    if (id && id !== "nft.id") {
      loadNftDetails();
      loadTonPrice();
    } else {
      setError("Invalid NFT ID provided");
      setLoading(false);
    }
  }, [id]);

  async function loadNftDetails() {
    try {
      setLoading(true);
      setError("");
      const data = await getNFTDetails(id);
      const nftData = data.nft ?? data.data ?? data;
      setNft(nftData);
    } catch (err) {
      setError(err.message ?? "Failed to load NFT details");
    } finally {
      setLoading(false);
    }
  }

  async function loadTonPrice() {
  try {
    // CoinGecko مباشرة من الفرونت
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
    const data = await res.json();
    setTonPriceUsd(data['the-open-network']?.usd ?? null);
  } catch {
    // لو ما اشتغل ما رح يظهر USD
  }
}
async function handleBuy() {
  try {
    await purchaseNft(id);
    navigate('/transactions');
  } catch (err) {
    // لو في معاملة موجودة، روح لـ Transactions 
    if (err.message.includes('already in progress')) {
      navigate('/transactions');
    } else {
      toast.error(err.message);
    }
  }
}


  if (loading) {
    return (
      <div className="nft-details-loading">
        <div className="nft-details-spinner" />
      </div>
    );
  }

  if (error || !nft) {
    return (
      <div className="nft-details-error-wrap">
        <p className="nft-details-error-text">{error || "NFT not found"}</p>
        <button className="nft-details-back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Go Back
        </button>
      </div>
    );
  }

  const priceInTon = nft.priceNanoTon ? parseFloat(nft.priceNanoTon) / 1_000_000_000 : 0;
  const priceInUsd = tonPriceUsd ? (priceInTon * tonPriceUsd).toFixed(2) : null;
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isOwner = currentUser?.id === nft?.owner?.id;
  

  return (
    <div className="nft-details-wrapper">
      <button className="nft-details-back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back to Gallery
      </button>

      <div className="nft-details-container">
        {/* الصورة */}
        <div className="nft-details-media">
          <img
            src={nft.imageUrl ?? `http://localhost:3000/${nft.imagePath}`}
            alt={nft.title}
            className="nft-details-img"
            onError={(e) => { e.target.src = "https://placehold.co/600x600?text=NFT+Image"; }}
          />
        </div>

        {/* المعلومات */}
        <div className="nft-details-info">
          <div className="nft-details-header">
            <h1 className="nft-details-title">{nft.title}</h1>
          </div>

          {/* المالك */}
          <div className="nft-details-owner-box">
            <div className="nft-details-owner-avatar"><FaUser /></div>
            <div className="nft-details-owner-meta">
              <span className="nft-details-owner-label">Owned By</span>
              <span className="nft-details-owner-name">
                {nft.owner?.name ?? "Unknown Collector"}
              </span>
            </div>
          </div>

          {/* الوصف */}
          <div className="nft-details-desc-box">
            <h3>Description</h3>
            <p>{nft.description || "No description provided for this digital asset."}</p>
          </div>

          {/* السعر */}
          <div className="nft-details-action-box">
              <div className="nft-details-price-wrap">
                  <span className="nft-details-price-label">Current Price</span>
                  <h2 className="nft-details-price-value">
                  <FaTag className="nft-details-price-icon" />
                  {priceInTon.toFixed(2)} TON
                  </h2>
                {priceInUsd && (
                <span className="nft-details-price-usd">≈ ${priceInUsd} USD</span>
    )}
  </div>

  {!isOwner && nft.status === 'listed' && (
  <button
    className="nft-details-buy-btn"
    onClick={handleBuy}
  >
    <FaShoppingCart /> Buy Now
  </button>
)}


  {isOwner && (
    <p className="nft-details-owner-note">You own this NFT</p>
  )}
</div>


        </div>
      </div>
    </div>
  );
}