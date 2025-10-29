
import React from 'react';

interface PowerOutputProps {
    powerOutput: number;
}

const PowerOutput: React.FC<PowerOutputProps> = ({ powerOutput }) => {
    return (
        <div className="w-full p-4 bg-white/70 backdrop-blur-sm rounded-lg text-center h-full flex flex-col justify-center">
            <h2 className="block mb-2 text-sm font-medium text-gray-600">
                Sản lượng điện
            </h2>
            <div className="text-3xl font-bold text-yellow-500 tracking-wider" style={{textShadow: '0 1px 2px rgba(0,0,0,0.1)'}}>
                {powerOutput} <span className="text-xl font-normal text-yellow-500">%</span>
            </div>
        </div>
    );
};

export default PowerOutput;