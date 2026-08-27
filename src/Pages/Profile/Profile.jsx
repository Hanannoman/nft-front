import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getProfile, updateProfile, getWalletNonce, linkWallet } from "../../api/profile";
import { getMyNfts, listNft, deleteNft } from "../../api/nfts"; 
import { toast } from 'react-toastify'

import ProfileCover from "../../Components/Profile/ProfileCover";
import ProfileHero from "../../Components/Profile/ProfileHero";
import ProfileDetails from "../../Components//Profile/ProfileDetails";
import LinkWalletForm from "../../Components//Profile/LinkWalletForm";
import ProfileNfts from "../../Components//Profile/ProfileNfts";

import coverImage from "../../assets/Images/Image-PlaceHolder_2.jpg";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [walletInput, setWalletInput] = useState("");
  const [showWalletInput, setShowWalletInput] = useState(false);

  const [myNfts, setMyNfts] = useState([]);
  const [nftsLoading, setNftsLoading] = useState(true);
  const [listingPrice, setListingPrice] = useState({});
  const [listingId, setListingId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    fetchProfile();
    fetchMyNfts();
  }, [location.key]);

  async function fetchProfile() {
    try {
      const data = await getProfile();
      setUser(data.user);
      setFormData({ name: data.user.name, email: data.user.email, password: "" });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchMyNfts() {
    try {
      const nfts = await getMyNfts();
      setMyNfts(nfts);
    } catch (err) {
      console.error("Failed to load NFTs:", err.message);
    } finally {
      setNftsLoading(false);
    }
  }

  async function handleSave() {
    try {
      const body = {};
      if (formData.name !== user.name) body.name = formData.name;
      if (formData.email !== user.email) body.email = formData.email;
      if (formData.password) body.password = formData.password;
      if (Object.keys(body).length === 0) { alert("No changes to save"); return; }
      const data = await updateProfile(body);

      setUser(data.user);
      setEditing(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleLinkWallet() {
    if (!walletInput.trim()) { toast.error("Please enter a wallet address"); return; }
    try {
      await getWalletNonce();
      const data = await linkWallet(walletInput.trim());

      setUser(data.user);
      setShowWalletInput(false);
      setWalletInput("");
      toast.success("Wallet linked successfully");
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleList(nftId) {
    const priceInput = listingPrice[nftId];
    if (!priceInput || isNaN(priceInput) ||  Number(priceInput) <= 0) {
      toast.error("Please enter a valid price in TON");
      return;
    }
    const priceNanoTon = String(Math.round(Number(priceInput) * 1_000_000_000));
    try {
      await listNft(nftId, priceNanoTon);
      toast.success("NFT listed for sale");
      setListingId(null);
      setListingPrice({});
      fetchMyNfts();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleDelete(nftId) {
    toast((t) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p style={{ margin: 0 }}>Are you sure you want to delete this NFT?</p><div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await deleteNft(nftId);
                setMyNfts(prev => prev.filter(n => n.id !== nftId));
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
  }

  if (loading) {
    return (
      <div className="pf-loading">
        <div className="pf-spinner" />
      </div>
    );
  }

  const draftNfts = myNfts.filter(n => n.status === "draft");
  const listedNfts = myNfts.filter(n => n.status === "listed");
  const soldNfts = myNfts.filter(n => n.status === "sold");

  return (
    <div className="pf-wrapper">
      <ProfileCover coverImage={coverImage} user={user} />
      <ProfileHero
        user={user}
        editing={editing}
        formData={formData}
        setFormData={setFormData}
        onEdit={() => setEditing(true)}
        onSave={handleSave}
        onCancel={() => {
          setEditing(false);
          setFormData({ name: user.name, email: user.email, password: "" });
        }}
        onShowWalletInput={() => setShowWalletInput(true)}
      />

      <ProfileDetails
        user={user}
        editing={editing}
        formData={formData}
        setFormData={setFormData}
      />

      {showWalletInput && (
        <LinkWalletForm
          walletInput={walletInput}
          setWalletInput={setWalletInput}
          onLink={handleLinkWallet}
          onCancel={() => setShowWalletInput(false)}
        />
      )}

      <ProfileNfts
        draftNfts={draftNfts}
        listedNfts={listedNfts}
        soldNfts={soldNfts}
        nftsLoading={nftsLoading}
        listingId={listingId}
        listingPrice={listingPrice}
        setListingId={setListingId}
        setListingPrice={setListingPrice}
        onList={handleList}
        onDelete={handleDelete}
        onEdit={(nft) => navigate(`/edit-nft/${nft.id}`)}
        onCreateNft={() => navigate("/createNft")}
      />
    </div>
  );
}