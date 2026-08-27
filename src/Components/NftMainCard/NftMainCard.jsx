import React from 'react'
import './NftMainCard.css'
import { useNavigate } from 'react-router-dom';

export default function NftMainCard({ mainImg, title, dsecImg, price, x, isOwner, onEdit, onDelete, onBuy, nftId, status }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/show-nft-info/${nftId}`);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit && onEdit();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete && onDelete();
  };

  const handleBuy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onBuy && onBuy();
  };

  return (
    <div
      className={x ? 'bh-main-card-Artist' : 'bh-main-card-Discover'}
      onClick={handleCardClick}
    >
      <img className='bh-main-card-img' src={mainImg} alt="NFT_image" />
      <div className='bh-main-card-desc'>
        <h5>{title}</h5>
        <div className='bh-main-card-artist'>
          <p>{dsecImg}</p>
        </div>
        <div className='bh-main-card-price'>
          <div>
            <p className='bh-main-card-price-title'>Price</p>
            <p className='bh-main-card-price-number'>{price}</p>
          </div>
        </div>
      </div>

      <div className='bh-card-actions'>
      {isOwner ? (
  <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
    {status === 'draft' && (
      <button className='bh-card-btn bh-btn-edit' onClick={handleEdit} style={{ flex: 1 }}>
        Edit
      </button>
    )}
    <button className='bh-card-btn bh-btn-delete' onClick={handleDelete} style={{ flex: 1 }}>
      Delete
    </button>
  </div>
) : (
  <button className='bh-card-btn bh-btn-buy' onClick={handleBuy}>
    View Details
  </button>
)}

      </div>
    </div>
  );
}