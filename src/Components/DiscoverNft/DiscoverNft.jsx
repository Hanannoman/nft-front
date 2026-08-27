import React, { useEffect, useState } from "react";
import "./DiscoverNft.css";
import Title from "../Title/Title";
import NftMainCard from "../NftMainCard/NftMainCard";
import ButtonTitleResponsive from "../ButtonTitleResponsive/ButtonTitleResponsive";
import EyeIcon from "./../../assets/Images/icons/Eye.svg";
import { useNavigate } from "react-router-dom";
import { getAllNfts, deleteNft } from "../../api/nfts";
import { toast } from 'react-toastify'

export default function DiscoverNft() {
  const navigate = useNavigate();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        const data = await getAllNfts({ status: "listed" });
        setNfts(data.slice(0, 3));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNfts();
  }, []);

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
              setNfts((prev) => prev.filter((nft) => nft.id !== id));
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
  if (loading)
    return (
      <div className="ys-discover-sec">
        <p style={{ color: "var(--primary-text-color)", textAlign: "center" }}>
          Loading...
        </p>
      </div>
    );
  if (error)
    return (
      <div className="ys-discover-sec">
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      </div>
    );

  return (
    <div className="ys-discover-sec">
      <div>
        <div className="tilt-discover">
          <Title
            title={"Discover More NFTs"}
            paragraph={"Explore new trending NFTs"}
            buttonText={"See All"}
            myIcon={EyeIcon}
            showButton={true}
            onButtonClick={() => navigate("/marketplace")}
          />
        </div>

        <div className="ys-descover">
          {nfts.map((nft) => (
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

        <div className="ys-div-btn-res">
          <ButtonTitleResponsive
            myButtonText={"See All"}
            icon={EyeIcon}
            onClick={() => navigate("/marketplace")}
          />
        </div>
      </div>
    </div>
  );
}
