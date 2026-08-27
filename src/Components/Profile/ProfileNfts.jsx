import { FaPlus } from "react-icons/fa";
import NftCard from "../NftCard/NftCard";
import { useNavigate } from "react-router-dom";

export default function ProfileNfts({
  draftNfts, listedNfts,soldNfts = [] ,nftsLoading,
  listingId, listingPrice,
  setListingId, setListingPrice,
  onList, onDelete, onCreateNft, onEdit 
}) {
  const totalNfts = draftNfts.length + listedNfts.length + soldNfts.length;
  const navigate=useNavigate();

  return (
    <section className="pf-nfts-section">
      <div className="pf-nfts-header">
        <h3 className="pf-nfts-title">Your NFTs</h3>
        <button className="pf-btn pf-btn-create" onClick={onCreateNft}>
          <FaPlus /> Create NFT
        </button>
      </div>

      {nftsLoading ? (
        <div className="pf-nfts-loading">
          <div className="pf-spinner" />
        </div>
      ) : totalNfts === 0 ? (
        <div className="pf-nfts-empty">
          <p className="pf-nfts-empty-text">You don't have any NFTs yet</p>
          <button className="pf-btn pf-btn-create" onClick={onCreateNft}>
            <FaPlus /> Create your first NFT
          </button>
        </div>
      ) : (
        <>
          {draftNfts.length > 0 && (
            <>
              <p className="pf-nfts-group-label">Drafts — not published yet</p>
              <div className="pf-nfts-grid">
                {draftNfts.map(nft => (
                  <NftCard
                    key={nft.id}
                    onClick={()=>navigate(`/show-nft-info/nft.id`)}
                    nft={nft}
                    listingId={listingId}
                    listingPrice={listingPrice}
                    setListingId={setListingId}
                    setListingPrice={setListingPrice}
                    onList={onList}
                    onDelete={onDelete}
                    onEdit={onEdit} 
                  />
                ))}
              </div>
            </>
          )}

          {listedNfts.length > 0 && (
            <>
              <p className="pf-nfts-group-label">Listed for sale</p>
              <div className="pf-nfts-grid">
                {listedNfts.map(nft => (
                  <NftCard
                    key={nft.id}
                    nft={nft}
                    listingId={listingId}
                    listingPrice={listingPrice}
                    setListingId={setListingId}
                    setListingPrice={setListingPrice}
                    onList={onList}
                    onDelete={onDelete}
                    onEdit={onEdit}  
                  />
                ))}
              </div>
            </>
          )}
          {soldNfts.length > 0 && (
  <>
    <p className="pf-nfts-group-label"> Sold</p>
    <div className="pf-nfts-grid">
      {soldNfts.map(nft => (
        <NftCard
          key={nft.id}
          nft={nft}
          listingId={listingId}
          listingPrice={listingPrice}
          setListingId={setListingId}
          setListingPrice={setListingPrice}
          onList={onList}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  </>
      )}
        </>
      )}
    </section>
  );
}