import React from 'react';

type ComparisonMode = 'none' | 'length' | 'curvature';

interface ControlPanelProps {
    windSpeed: number;
    setWindSpeed: (speed: number) => void;
    bladeLength: number;
    setBladeLength: (length: number) => void;
    bladeCurvature: number;
    setBladeCurvature: (curvature: number) => void;
    comparisonMode: ComparisonMode;
    onComparisonModeChange: (mode: 'length' | 'curvature') => void;
    onReset: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
    windSpeed, setWindSpeed, 
    bladeLength, setBladeLength,
    bladeCurvature, setBladeCurvature, 
    comparisonMode, onComparisonModeChange, 
    onReset,
}) => {
    const getWindSpeedStyle = (speed: number): { label: string; className: string } => {
        if (speed === 0) {
            return { label: 'Lặng gió', className: 'text-slate-500' };
        }
        if (speed < 40) {
            return { label: 'Yếu', className: 'text-sky-600' };
        }
        if (speed < 80) {
            return { label: 'Trung bình', className: 'text-orange-500' };
        }
        return { label: 'Mạnh', className: 'text-red-600' };
    };

    const windStyle = getWindSpeedStyle(windSpeed);

    return (
        <div className="w-full p-4 bg-white/70 backdrop-blur-sm rounded-lg text-center space-y-4">
            <div>
                <label htmlFor="wind-speed" className="block mb-2 text-sm font-medium text-gray-600">
                    Tốc độ gió: <span className={`font-bold text-lg ${windStyle.className}`}>{windStyle.label}</span>
                </label>
                <input
                    id="wind-speed"
                    type="range"
                    min="0"
                    max="100"
                    value={windSpeed}
                    onChange={(e) => setWindSpeed(Number(e.target.value))}
                    className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-sky-500"
                    aria-label="Điều chỉnh tốc độ gió"
                />
            </div>

            {comparisonMode === 'length' && (
                 <div>
                    <label htmlFor="blade-length" className="block mb-2 text-sm font-medium text-gray-600">
                        Chiều dài cánh quạt (So sánh)
                    </label>
                    <input
                        id="blade-length"
                        type="range"
                        min="50"
                        max="100"
                        value={bladeLength}
                        onChange={(e) => setBladeLength(Number(e.target.value))}
                        className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        aria-label="Điều chỉnh chiều dài cánh quạt"
                    />
                </div>
            )}

            {comparisonMode === 'curvature' && (
                 <div>
                    <label htmlFor="blade-curvature" className="block mb-2 text-sm font-medium text-gray-600">
                        Độ cong cánh quạt (So sánh)
                    </label>
                    <input
                        id="blade-curvature"
                        type="range"
                        min="0"
                        max="100"
                        value={bladeCurvature}
                        onChange={(e) => setBladeCurvature(Number(e.target.value))}
                        className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-green-500"
                        aria-label="Điều chỉnh độ cong cánh quạt"
                    />
                </div>
            )}
            
            <div className="border-t border-white/50 pt-4 space-y-2">
                 <p className="text-sm font-medium text-gray-600">Chế độ so sánh</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                        onClick={() => onComparisonModeChange('length')}
                        className={`w-full font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105 ${
                            comparisonMode === 'length' 
                                ? 'bg-red-500 hover:bg-red-400 text-white' 
                                : 'bg-blue-500 hover:bg-blue-400 text-white'
                        }`}
                        aria-live="polite"
                    >
                        {comparisonMode === 'length' ? 'Tắt So Sánh' : 'Chiều Dài'}
                    </button>
                    <button
                        onClick={() => onComparisonModeChange('curvature')}
                        className={`w-full font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105 ${
                            comparisonMode === 'curvature' 
                                ? 'bg-red-500 hover:bg-red-400 text-white' 
                                : 'bg-green-500 hover:bg-green-400 text-white'
                        }`}
                        aria-live="polite"
                    >
                        {comparisonMode === 'curvature' ? 'Tắt So Sánh' : 'Độ Cong'}
                    </button>
                </div>
                <button
                    onClick={onReset}
                    className="w-full font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105 bg-slate-600 hover:bg-slate-500 text-white"
                    aria-label="Bắt đầu lại mô phỏng"
                >
                    Bắt đầu lại
                </button>
            </div>
        </div>
    );
};

export default ControlPanel;