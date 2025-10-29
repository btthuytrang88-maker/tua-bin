import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
    // Luôn tạo một instance mới để đảm bảo sử dụng API key mới nhất đã chọn.
    return new GoogleGenAI({ apiKey: process.env.API_KEY as string });
}

export const getWindPowerExplanation = async (): Promise<string> => {
    try {
        const client = getAiClient();
        const prompt = `
        Hãy giải thích cách tua-bin gió tạo ra điện một cách siêu ngắn gọn, dành cho các bạn nhỏ tiểu học.
        Chỉ cần 3 bước đơn giản.

        Dùng các câu văn thật ngắn và dễ hiểu. Ví dụ:
        * Gió thổi làm cánh quạt quay.
        * Cánh quạt làm máy phát điện chạy.
        * Máy phát điện tạo ra điện!

        Sử dụng định dạng markdown đơn giản với tiêu đề (###) và các gạch đầu dòng (*).
        `;

        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Lỗi khi gọi Gemini API:", error);
        throw error;
    }
};

export const getBladeLengthExplanation = async (): Promise<string> => {
    try {
        const client = getAiClient();
        const prompt = `
        Hãy giải thích tại sao cánh quạt tua-bin gió dài hơn lại tạo ra nhiều điện hơn.
        Giải thích thật đơn giản, như cho trẻ em, trong khoảng 1-3 câu ngắn gọn.
        Sử dụng markdown cho câu trả lời. Ví dụ:
        **Cánh quạt dài hơn, đón được nhiều gió hơn!**
        Giống như một chiếc chong chóng lớn sẽ quay nhanh hơn khi có gió vậy.
        `;

        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Lỗi khi gọi Gemini API cho giải thích chiều dài cánh quạt:", error);
        throw error;
    }
};

export const getBladeCurvatureExplanation = async (): Promise<string> => {
    try {
        const client = getAiClient();
        const prompt = `
        Hãy giải thích tại sao cánh quạt tua-bin gió lại được làm cong mà không phải làm phẳng.
        Giải thích thật đơn giản như cho trẻ em, trong khoảng 1-3 câu ngắn gọn.
        Hãy so sánh nó với cánh máy bay để dễ hình dung.
        Sử dụng markdown cho câu trả lời. Ví dụ:
        **Cánh quạt cong giống như cánh máy bay!**
        Khi gió thổi qua, nó tạo ra một lực đẩy (giống như lực nâng máy bay), làm cho cánh quạt quay tít và tạo ra nhiều điện hơn.
        `;

        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Lỗi khi gọi Gemini API cho giải thích độ cong cánh quạt:", error);
        throw error;
    }
};