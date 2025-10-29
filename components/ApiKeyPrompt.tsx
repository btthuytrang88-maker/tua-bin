import React from 'react';

interface ApiKeyPromptProps {
    onSelectKey: () => void;
}

const ApiKeyPrompt: React.FC<ApiKeyPromptProps> = ({ onSelectKey }) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-300 to-sky-400 flex flex-col items-center justify-center p-4 font-sans text-center">
            <div className="max-w-md w-full bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/30">
                <h1 className="text-3xl font-bold text-slate-800 mb-4">Chào mừng bạn!</h1>
                <p className="text-slate-600 mb-6">
                    Ứng dụng này sử dụng API của Google Gemini để cung cấp các giải thích thông minh.
                    Để tiếp tục, vui lòng chọn API Key của bạn.
                </p>
                <button
                    onClick={onSelectKey}
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
                    aria-label="Chọn API Key để bắt đầu"
                >
                    Chọn API Key
                </button>
                <p className="text-xs text-slate-500 mt-4">
                    Việc sử dụng API có thể phát sinh chi phí.
                    <a 
                        href="https://ai.google.dev/gemini-api/docs/billing" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sky-600 hover:underline ml-1"
                    >
                        Tìm hiểu thêm
                    </a>
                </p>
            </div>
        </div>
    );
};

export default ApiKeyPrompt;