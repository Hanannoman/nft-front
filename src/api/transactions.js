
const BASE_URL = 'http://localhost:3000/api/v1';

export async function fetchMyTransactions() {
  const response = await fetch(`${BASE_URL}/transactions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch transactions");
  return response.json();
}

export async function assignTxHash(transactionId, tonTxHash) {
  console.log('sending txHash:', tonTxHash)
  const response = await fetch(`${BASE_URL}/transactions/${transactionId}/assign-hash`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
      body: JSON.stringify({ txHash: tonTxHash }),
  });
  const data = await response.json();
  console.log('assign-hash response:', data); // ← شوفي شو بيقول الباك
  if (!response.ok) throw new Error(data.message || "Failed to assign tx hash");
  return data;
}

export async function confirmTransaction(transactionId, tonTxHash) {
  const response = await fetch(`${BASE_URL}/transactions/${transactionId}/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ txHash: tonTxHash }), // ← أضيفي هاد
  });
  const data = await response.json();
  console.log('confirm response:', data);
  if (!response.ok) throw new Error(data.message || "Failed to confirm transaction");
  return data;
}
