const API_URL = 'http://localhost:3000/api/v1';

export const sendMessageToAI = async (message) => {
    try {
        const response = await fetch(`${API_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error("تعذر الاتصال بالسيرفر " `${response.status}`);
        }

        const data = await response.json();
        return data.reply;
    } catch (error) {
        console.error("Error communicating with AI Backend:", error);
        throw error;
    }
};