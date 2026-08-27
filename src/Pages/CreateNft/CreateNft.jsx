import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiUploadCloud, FiX, FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";
import { createNft } from "../../api/nfts";
import "./CreateNft.css";
import { toast } from 'react-toastify';

export default function CreateNft() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  const handleImageChange = (file) => {
    if (!file) return;
    const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast.error("Image must be JPEG, PNG, GIF, or WebP");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must not exceed 5MB"); // ← بدل setError
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!title.trim()) return toast.error("Please enter a title"); // ← بدل setError
    if (!image) return toast.error("Please upload an image");       // ← بدل setError
    setLoading(true);
    try {
      await createNft({ title, description, image });
      setSuccess(true);
      setTimeout(() => navigate("/profile"), 1800);
    } catch (err) {
      toast.error(err.message); 
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="cn-success-screen">
        <FiCheckCircle className="cn-success-icon" />
        <h2 className="cn-success-title">NFT Created!</h2>
        <p className="cn-success-sub">Redirecting to your profile…</p>
        <div className="cn-success-bar"><div className="cn-success-bar-fill" /></div>
      </div>
    );
  }

  return (
    <div className="cn-page">
      <div className="cn-container">
        <h1 className="cn-title">Create New NFT</h1>
        <p className="cn-subtitle">Fill in the details below to mint your NFT</p>

        <div className="cn-form">
          <div className="cn-field">
            <label className="cn-label">Title:</label>
            <input
              className="cn-input"
              type="text"
              placeholder="Enter NFT name"
              value={title}
              maxLength={100}
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>

          <div className="cn-field">
            <label className="cn-label">
              Description:
              <span className="cn-optional">optional</span>
            </label>
            <textarea
              className="cn-textarea"
              placeholder="Describe your NFT..."
              value={description}
              maxLength={500}
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="cn-avatar-wrap">
            <div
              className={`cn-avatar ${preview ? "cn-avatar--filled" : ""}`}
              onClick={() => fileInputRef.current.click()}
            >
              {preview ? (
                <>
                  <img src={preview} alt="preview" className="cn-avatar-img" />
                  <div className="cn-avatar-overlay">
                    <FiUploadCloud />
                    <span>Change</span>
                  </div>
                  <button
                    className="cn-avatar-remove"
                    onClick={(e) => { e.stopPropagation(); setImage(null); setPreview(null); }}
                    >
                    <FiX />
                  </button>
                </>
              ) : (
                <div className="cn-avatar-empty">
                  <FiUploadCloud className="cn-avatar-icon" />
                  <span>Upload Image</span>
                </div>
              )}
            </div>
            <p className="cn-avatar-hint">JPEG · PNG · GIF · WebP · Max 5MB</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              style={{ display: "none" }}
              onChange={(e) => handleImageChange(e.target.files[0])}
            />
          </div>


          <div className="cn-actions">
            <button className="cn-btn-cancel" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button
              className={`cn-btn-submit ${loading ? "cn-btn-submit--loading" : ""}`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? <><FiLoader className="cn-spin" /> Saving...</>
                : "Create NFT"
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}