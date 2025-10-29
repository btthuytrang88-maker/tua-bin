import React, { useState, useCallback } from 'react';
import { getWindPowerExplanation, getBladeLengthExplanation, getBladeCurvatureExplanation } from '../services/geminiService.ts';

interface ExplanationProps {
    comparisonMode: 'none' | 'length' | 'curvature';
    onApiKeyError: () => void;
}

const Explanation: React.FC<ExplanationProps> = ({ comparisonMode, onApiKeyError }) => {
    const [explanation, setExplanation] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [bladeExplanation, setBladeExplanation] = useState<string>('');
    const [isBladeLoading, setIsBladeLoading] = useState<boolean>(false);
    const [bladeError, setBladeError] = useState<string | null>(null);

    const [curvatureExplanation, setCurvatureExplanation] = useState<string>('');
    const [isCurvatureLoading, setIsCurvatureLoading] = useState<boolean>(false);
    const [curvatureError, setCurvatureError] = useState<string | null>(null);

    const checkApiKeyError = (error: unknown) => {
        if (error instanceof Error) {
            const message = error.message.toLowerCase();
            if (message.includes("api key not found") || 
                message.includes("provide an api key") ||
                message.includes("requested entity was not found")) {
                onApiKeyError();
                return true;
            }
        }
        return false;
    }

    const fetchExplanation = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setExplanation('');
        try {
            const result = await getWindPowerExplanation();
            setExplanation(result);
        } catch (err) {
            if (!checkApiKeyError(err)) {
                setError('Không thể tải giải thích. Vui lòng thử lại.');
            }
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [onApiKeyError]);

    const fetchBladeExplanation = useCallback(async () => {
        setIsBladeLoading(true);
        setBladeError(null);
        setBladeExplanation('');
        try {
            const result = await getBladeLengthExplanation();
            setBladeExplanation(result);
        } catch (err) {
             if (!checkApiKeyError(err)) {
                setBladeError('Không thể tải giải thích. Vui lòng thử lại.');
            }
            console.error(err);
        } finally {
            setIsBladeLoading(false);
        }
    }, [onApiKeyError]);

    const fetchCurvatureExplanation = useCallback(async () => {
        setIsCurvatureLoading(true);
        setCurvatureError(null);
        setCurvatureExplanation('');
        try {
            const result = await getBladeCurvatureExplanation();
            setCurvatureExplanation(result);
        } catch (err) {
            if (!checkApiKeyError(err)) {
                setCurvatureError('Không thể tải giải thích. Vui lòng thử lại.');
            }
            console.error(err);
        } finally {
            setIsCurvatureLoading(false);
        }
    }, [onApiKeyError]);

    const renderFormattedText = (text: string) => {
        return text.split('\n').map((paragraph, index) => {
            if (paragraph.startsWith('###')) {
                return <h3 key={index} className="text-lg font-semibold text-orange-600 mt-4 mb-2">{paragraph.replace('###', '').trim()}</h3>
            }
             if (paragraph.startsWith('**')) {
                return <p key={index} className="font-bold my-2 text-blue-800">{paragraph.replace(/\*\*/g, '')}</p>
            }
            if (paragraph.startsWith('*')) {
                 return <li key={index} className="ml-6 list-disc">{paragraph.replace('*', '').trim()}</li>
            }
            return <p key={index} className="mb-2 text-gray-700">{paragraph}</p>
        })
    }

    return (
        <div className="p-6 bg-white/50 rounded-2xl shadow-xl backdrop-blur-md border border-white/30 text-slate-700">
            <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">Giải Thích Bằng AI</h2>
            
            {/* Giải thích cơ bản */}
            {!explanation && !isLoading && (
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Nhấn nút bên dưới để tìm hiểu nguyên lý tạo ra điện từ gió.</p>
                    <button
                        onClick={fetchExplanation}
                        className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105"
                    >
                        Nguyên lý cơ bản
                    </button>
                </div>
            )}
            {isLoading && (
                 <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="ml-3 text-blue-700">AI đang giải thích...</p>
                </div>
            )}
            {error && <p className="text-red-600 text-center">{error}</p>}
            {explanation && (
                <div className="prose max-w-none">
                    {renderFormattedText(explanation)}
                </div>
            )}

            {/* Giải thích động */}
            {(comparisonMode !== 'none') && <hr className="my-6 border-t border-white/50" />}

            {comparisonMode === 'length' && (
                <div>
                    {!bladeExplanation && !isBladeLoading && (
                         <div className="text-center">
                            <p className="text-gray-600 mb-4">Tại sao chiều dài cánh quạt lại quan trọng?</p>
                            <button
                                onClick={fetchBladeExplanation}
                                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105"
                            >
                                Tìm hiểu
                            </button>
                        </div>
                    )}
                    {isBladeLoading && (
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-500"></div>
                            <p className="ml-3 text-sky-600">Đang tải...</p>
                        </div>
                    )}
                    {bladeError && <p className="text-red-600 text-center">{bladeError}</p>}
                    {bladeExplanation && (
                        <div className="prose max-w-none">
                            {renderFormattedText(bladeExplanation)}
                        </div>
                    )}
                </div>
            )}

            {comparisonMode === 'curvature' && (
                <div>
                    {!curvatureExplanation && !isCurvatureLoading && (
                        <div className="text-center">
                            <p className="text-gray-600 mb-4">Khám phá bí mật đằng sau độ cong của cánh quạt.</p>
                            <button
                                onClick={fetchCurvatureExplanation}
                                className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105"
                            >
                                Tìm hiểu
                            </button>
                        </div>
                    )}
                    {isCurvatureLoading && (
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
                            <p className="ml-3 text-green-600">Đang tải...</p>
                        </div>
                    )}
                    {curvatureError && <p className="text-red-600 text-center">{curvatureError}</p>}
                    {curvatureExplanation && (
                         <div className="prose max-w-none">
                            {renderFormattedText(curvatureExplanation)}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Explanation;