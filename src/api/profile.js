const BASE_URL = 'http://localhost:3000/api/v1';

// جلب بيانات المستخدم
export async function getProfile() {

  // جلب التوكن من localStorage 
const token = localStorage.getItem('token');

  // إرسال request للباك
const response = await fetch(`${BASE_URL}/users/me`, {
    headers: {
    // تمرير التوكن بالـ Authorization header
    Authorization: `Bearer ${token}`
    },
});
  // تحويل الرد لـ JSON
const data = await response.json();

  // Error
if (!response.ok) throw new Error(data.message || 'Failed to load profile');
return data;
}
// تحديث بيانات المستخدم
export async function updateProfile(updates) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH', // تحديث جزئي
    headers: {
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
    });
    const data = await response.json();
  // معالجة الأخطاء
    if (!response.ok) throw new Error(data.message || 'Failed to update profile');
    return data;
}
// جلب nonce للمحفظة
export async function getWalletNonce() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/wallet/nonce`, {
    headers: {
        Authorization:`Bearer ${token}` 
    },
    });
    const data = await response.json();
  // nonce   للتوقيع (security step)
    if (!response.ok) throw new Error(data.message || 'Failed to get nonce');
    return data;
}

export async function linkWallet(walletAddress) {
    const token = localStorage.getItem('token');
    
  
    const response = await fetch(`${BASE_URL}/wallet/link`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ walletAddress}),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Failed to link wallet');
    return data;
}