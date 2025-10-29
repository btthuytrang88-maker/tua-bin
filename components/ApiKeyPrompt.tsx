import React from 'react';

interface ApiKeyPromptProps {
    onSelectKey: () => void;
}

const ApiKeyPrompt: React.FC<ApiKeyPromptProps> = ({ onSelectKey }) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-300 to-sky-400 flex flex-col items-center justify-center p-4 font-sans text-center">
            <div className="max-w-lg w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/40">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Yêu cầu API Key</h1>
                <p className="text-slate-600 mb-8">
                    Để sử dụng tính năng giải thích bằng AI, bạn cần có API key của Google.
                </p>

                <div className="space-y-6 text-left">
                    {/* Step 1 */}
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-sky-500 text-white font-bold rounded-full flex items-center justify-center">1</div>
                        <div>
                            <h2 className="font-semibold text-slate-700">Tạo API Key (Nếu bạn chưa có)</h2>
                            <p className="text-sm text-slate-500 mt-1 mb-3">
                                Nhấn vào nút bên dưới để truy cập Google AI Studio và tạo một API key mới.
                                Thao tác này sẽ mở một tab mới.
                            </p>
                            <a 
                                href="https://aistudio.google.com/app/apikey" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                                Tạo API Key Mới
                            </a>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-sky-500 text-white font-bold rounded-full flex items-center justify-center">2</div>
                        <div>
                            <h2 className="font-semibold text-slate-700">Chọn API Key của bạn</h2>
                            <p className="text-sm text-slate-500 mt-1 mb-3">
                                Sau khi đã có key, hãy quay lại đây và nhấn nút bên dưới. Một hộp thoại an toàn sẽ hiện ra để bạn chọn key của mình.
                                <strong className="block mt-1 text-red-600">Lưu ý: Vì lý do bảo mật, bạn không thể dán key trực tiếp vào trang web.</strong>
                            </p>
                            <button
                                onClick={onSelectKey}
                                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
                                aria-label="Chọn API Key để bắt đầu"
                            >
                                Tiếp Tục & Chọn Key
                            </button>
                        </div>
                    </div>
                </div>

                 <p className="text-xs text-slate-500 mt-8">
                    Việc sử dụng API có thể phát sinh chi phí. 
                    <a 
                        href="https://ai.google.dev/gemini-api/docs/billing" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sky-600 hover:underline ml-1"
                    >
                        Tìm hiểu thêm về thanh toán.
                    </a>
                </p>
            </div>
        </div>
    );
};

export default ApiKeyPrompt;