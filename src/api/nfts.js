const BASE_URL = 'http://localhost:3000/api/v1';

// ── helper داخلي ─────────────────────────────────────────────
function extractArray(data) {
  return data.items ?? data.nfts ?? (Array.isArray(data) ? data : []);
}

// جيب كل الـ NFTs (no auth)
export async function getAllNfts({ status } = {}) {
  const url = new URL(`${BASE_URL}/nfts`);
  if (status) url.searchParams.set('status', status);
  const res = await fetch(url.toString());
  const data = await res.json();
  return extractArray(data);
}
// دالة داخلية مع auth
async function getAllNftsAuth({ status } = {}) {
  const url = new URL(`${BASE_URL}/nfts`);
  if (status) url.searchParams.set('status', status);
  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    cache :'no-store'
  });
  const data = await res.json();
  console.log('status:', status, 'data:', data);
  return extractArray(data);
}

// جيب NFTs المستخدم الحالي
export async function getMyNfts() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [drafts, listed , sold] = await Promise.all([
    getAllNftsAuth({ status: 'draft' }),
    getAllNftsAuth({ status: 'listed' }),
    getAllNftsAuth({ status: 'sold' })
  ]);
  const all = [...drafts, ...listed, ...sold];
  return all.filter(nft => nft.owner?.id === user?.id);
}

// NFT واحد بالـ ID (no auth)
export async function getNftById(id) {
  const res = await fetch(`${BASE_URL}/nfts/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch NFT');
  return data;
}

// إنشاء NFT (auth required)
export async function createNft({ title, description, image }) {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('image', image);
  const res = await fetch(`${BASE_URL}/nfts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create NFT');
  return data;
}

// تعديل NFT بـ FormData (مع صورة)
export async function updateNft(id, formData) {
  const res = await fetch(`${BASE_URL}/nfts/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update NFT');
  return data;
}

// تعديل NFT بـ JSON (بدون صورة)
export async function updateNftJson(id, body) {
  const res = await fetch(`${BASE_URL}/nfts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update NFT');
  return data;
}

// حذف NFT
export async function deleteNft(id) {
  const res = await fetch(`${BASE_URL}/nfts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete NFT');
  return data;
}

/**
 * 3. دالة جلب تفاصيل NFT معين باستخدام الـ ID
 * GET /api/v1/nfts/:id
 */
export async function getNFTDetails(id) {
  const res = await fetch(`${BASE_URL}/nfts/${id}`, {
    method: "GET",
    // هذه الصفحة عامة حسب التوثيق ولا تحتاج Auth بشكل إجباري، ولكن نمرر التوكن احتياطاً لو كان موجوداً
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch NFT details");
  }

  return await res.json();
}






// عرض NFT للبيع
export async function listNft(id, priceNanoTon) {
  const res = await fetch(`${BASE_URL}/nfts/${id}/list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ priceNanoTon }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to list NFT');
  return data;
}



// بدء عملية شراء
export async function purchaseNft(id) {
  const res = await fetch(`${BASE_URL}/nfts/${id}/purchase`, {method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to initiate purchase');
  return data;
}