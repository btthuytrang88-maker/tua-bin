import React from 'react';

interface ApiKeyPromptProps {
    onSelectKey: () => void;
}

const ApiKeyPrompt: React.FC<ApiKeyPromptProps> = ({ onSelectKey }) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-300 to-sky-400 flex flex-col items-center justify-center p-4 font-sans text-center">
            <div className="max-w-lg w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/40">
                <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-sky-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5.002L10 18.451l7.834-13.449A11.954 11.954 0 0110 1.944zM10 4.302a9.954 9.954 0 015.658 2.34l-5.658 9.758-5.658-9.758A9.954 9.954 0 0110 4.302z" clipRule="evenodd" />
                    </svg>
                    Yêu cầu API Key
                </h1>
                <p className="text-slate-600 mb-8">
                    Để sử dụng tính năng giải thích bằng AI, bạn cần chọn API key của Google.
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
                            <h2 className="font-semibold text-slate-700">Chọn Key của bạn một cách an toàn</h2>
                            <p className="text-sm text-slate-500 mt-1 mb-3">
                                Sau khi đã có key, hãy quay lại đây và nhấn nút bên dưới. Một hộp thoại an toàn sẽ hiện ra để bạn **CHỌN** key của mình từ danh sách.
                            </p>
                            
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md my-4" role="alert">
                                <p className="font-bold">Quan trọng</p>
                                <p className="text-sm">Vì lý do bảo mật, bạn sẽ **không thể dán key trực tiếp** vào trang này. Bạn phải chọn nó từ hộp thoại của Google.</p>
                            </div>

                            <button
                                onClick={onSelectKey}
                                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 flex items-center justify-center"
                                aria-label="Mở hộp thoại an toàn để chọn API Key"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                                Mở Hộp Thoại & Chọn Key
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