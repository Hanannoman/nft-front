import { FaTag, FaTimes, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NftCard({ 
  nft, 
  listingId, listingPrice, 
  setListingId, setListingPrice, 
  onList, onDelete, onEdit  
}) {
  const isDraft = nft.status === "draft";
  const isSold = nft.status === "sold";
  const canList = isDraft || isSold;
  const navigate = useNavigate();

  return (
    <div className="pf-nft-card">
      <div className="pf-nft-img-wrap" onClick={() => navigate(`/show-nft-info/${nft.id}`)}>
        <img src={nft.imageUrl} alt={nft.title} className="pf-nft-img" />
        <span className={`pf-nft-badge pf-nft-badge--${nft.status}`}>
          {nft.status === 'draft' ? "Draft" : nft.status === 'sold' ? "Sold" : "Listed"}
        </span>
      </div>

      <div className="pf-nft-info">
        <p className="pf-nft-title">{nft.title}</p>
        {isDraft && nft.description && (
          <p className="pf-nft-desc">{nft.description}</p>
        )}
        {!isDraft && (
          <p className="pf-nft-price">
            {(Number(nft.priceNanoTon) / 1_000_000_000).toFixed(2)} TON
          </p>
        )}
      </div>

      <div className="pf-nft-actions">
        {canList && (
          listingId === nft.id ? (
            <div className="pf-nft-list-row">
              <input
                className="pf-nft-price-input"
                type="number"
                min="0"
                step="0.1"
                placeholder="Price in TON"
                value={listingPrice[nft.id] || ""}
                onChange={e => setListingPrice({ ...listingPrice, [nft.id]: e.target.value })}
              />
              <button className="pf-nft-btn pf-nft-btn--list" onClick={() => onList(nft.id)}>
                <FaTag /> List
              </button>
              <button className="pf-nft-btn pf-nft-btn--cancel" onClick={() => setListingId(null)}>
                <FaTimes />
              </button>
            </div>
          ) : (
            <button className="pf-nft-btn pf-nft-btn--list" onClick={() => setListingId(nft.id)}>
              <FaTag /> {isSold ? "Re-list for sale" : "List for sale"}
            </button>
          )
        )}

        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          {isDraft && (
            <button className="pf-nft-btn pf-nft-btn--edit" onClick={() => onEdit(nft)} style={{ flex: 1 }}>
              <FaEdit /> Edit
            </button>
          )}
          <button className="pf-nft-btn pf-nft-btn--delete" onClick={() => onDelete(nft.id)} style={{ flex: 1 }}>
            <FaTimes /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}