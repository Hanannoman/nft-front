import React, { useEffect, useState } from 'react';
import './Marketplace.css';
import NftMainCard from '../../Components/NftMainCard/NftMainCard';
import { getAllNfts, deleteNft } from '../../api/nfts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';

export default function Marketplace() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        const data = await getAllNfts({ status: 'listed' });
        setNfts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNfts();
  }, []);

  const filteredNfts = nfts.filter((nft) => {
    const matchesSearch = nft.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const priceInTon = Number(nft.priceNanoTon) / 1_000_000_000;
    const matchesMin = !minPrice || priceInTon >= Number(minPrice);
    const matchesMax = !maxPrice || priceInTon <= Number(maxPrice);
    return matchesSearch && matchesMin && matchesMax;
  });

  const handleDelete = (id) => {
    toast((t) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p style={{ margin: 0 }}>Are you sure you want to delete this NFT?</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await deleteNft(id);
                setNfts(prev => prev.filter(nft => nft.id !== id));
                toast.success("NFT deleted!");
              } catch (err) {
                toast.error(err.message);
              }
            }}
            style={{
              flex: 1, background: '#ef4444', color: '#fff', border: 'none',
              padding: '8px 0', borderRadius: '8px', cursor: 'pointer', fontWeight: 600
            }}
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            style={{
              flex: 1, background: '#374151', color: '#fff', border: 'none',
              padding: '8px 0', borderRadius: '8px', cursor: 'pointer', fontWeight: 600
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: Infinity, closeButton: false });
  };

  const handleEdit = (id) => {
    navigate(`/edit-nft/${id}`);
  };

  const handleBuy = (id) => {
    navigate(`/show-nft-info/${id}`);
  };

  return (
    <div className='bh-marketplace'>
      <div className='bh-marketplace-header'>
        <h1>Marketplace</h1>
        <p>Browse and collect exclusive NFTs</p>
      </div>

      <div className="bh-marketplace-filters">
        <div className="bh-marketplace-search">
          <FaSearch className="bh-marketplace-search-icon" />
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bh-marketplace-search-input"
          />
        </div>

        <div className="bh-marketplace-price-filter">
          <input
            type="number"
            placeholder="Min TON"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="bh-marketplace-price-input"
            min="0"
          />
          <span className="bh-marketplace-price-sep">—</span><input
            type="number"
            placeholder="Max TON"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="bh-marketplace-price-input"
            min="0"
          />
        </div>
      </div>

      {loading && (
        <p className='bh-marketplace-status'>Loading...</p>
      )}

      {error && (
        <p className='bh-marketplace-status bh-marketplace-error'>{error}</p>
      )}

      {!loading && !error && filteredNfts.length === 0 && (
        <p className='bh-marketplace-status'>No NFTs found.</p>
      )}

      <div className='bh-marketplace-grid'>
        {filteredNfts.map((nft) => (
          <NftMainCard
            key={nft.id}
            mainImg={nft.imageUrl}
            title={nft.title}
            dsecImg={nft.owner?.name}
            price={`${(Number(nft.priceNanoTon) / 1_000_000_000).toFixed(2)} TON`}
            x={false}
            status={nft.status}
            isOwner={currentUser?.id === nft.owner?.id}
            onEdit={() => handleEdit(nft.id)}
            onDelete={() => handleDelete(nft.id)}
            onBuy={() => handleBuy(nft.id)}
            nftId={nft.id}
          />
        ))}
      </div>
    </div>
  );
}