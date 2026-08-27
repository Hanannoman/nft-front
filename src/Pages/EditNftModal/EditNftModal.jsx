import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaTimes, FaSave } from "react-icons/fa";
import { getNftById, updateNft, updateNftJson, listNft } from "../../api/nfts";
import "./EditNftModal.css";
import { toast } from 'react-toastify'

export default function EditNftModal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getNftById(id);
        const nftData = data.nft ?? data;
        setNft(nftData);
        setTitle(nftData.title);
        setDescription(nftData.description || "");
        setPreview(nftData.imageUrl);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSave() {
    if (!title.trim()) { alert("Title is required"); return; }
    setSaving(true);
    try {
      if (image) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);
        await updateNft(id, formData);
      } else {
        await updateNftJson(id, { title, description });
      }
      toast.success("NFT updated successufly");
      navigate("/profile");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="pf-loading">
        <div className="pf-spinner" />
      </div>
    );
  }

  return (
    <div className="edit-nft-page">
      <div className="edit-nft-header">
        <h2>Edit NFT</h2>
        <button className="edit-nft-close" onClick={() => navigate("/profile")}>
          <FaTimes />
        </button>
      </div>
      <p className="edit-nft-subtitle">Update your NFT details below</p>

      <div className="edit-nft-body">
        {/* صورة */}
        <div className="modal-img-wrap">
          <img src={preview} alt="preview" className="modal-img" />
          <label className="modal-img-label">
            Change Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>
        </div>

        {/* Title */}
        <div className="modal-field">
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter NFT name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="modal-field">
          <label>
            Description{" "}
            <span style={{ color: "#6b7280", fontWeight: 400 }}>optional</span>
          </label>
          <textarea
            rows={4}
            placeholder="Describe your NFT..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Save */}
        <button
          className="modal-save-btn"
          onClick={handleSave}
          disabled={saving}
        >
          <FaSave /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}