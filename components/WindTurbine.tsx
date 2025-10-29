import React from 'react';

interface WindTurbineProps {
    windSpeed: number;
    powerOutput: number;
    bladeLength: number;
    bladeCurvature: number; // 0 (flat) to 100 (very curved)
    isComparison?: boolean;
}

const WindTurbine: React.FC<WindTurbineProps> = ({ windSpeed, powerOutput, bladeLength, bladeCurvature, isComparison = false }) => {
    // Constants for blade rotation calculation
    const CUT_IN_SPEED = 10; // The speed at which the turbine starts spinning
    const MAX_WIND_SPEED = 100; // The max speed from the slider
    const MAX_ROTATION_DURATION = 5; // seconds for one spin at cut-in speed (slower)
    const MIN_ROTATION_DURATION = 0.5; // seconds for one spin at max speed (faster)

    let rotationDuration = 0;
    if (windSpeed >= CUT_IN_SPEED) {
        // Linearly interpolate the duration based on the current wind speed
        const speedRange = MAX_WIND_SPEED - CUT_IN_SPEED;
        const durationRange = MAX_ROTATION_DURATION - MIN_ROTATION_DURATION;
        const speedFraction = (windSpeed - CUT_IN_SPEED) / speedRange;
        
        rotationDuration = MAX_ROTATION_DURATION - (speedFraction * durationRange);
        // Ensure duration doesn't go below the minimum, even if wind speed exceeds max
        rotationDuration = Math.max(rotationDuration, MIN_ROTATION_DURATION);
    }

    const bladeStyle: React.CSSProperties = {
        animationDuration: rotationDuration > 0 ? `${rotationDuration}s` : '0s',
        animationPlayState: windSpeed >= CUT_IN_SPEED ? 'running' : 'paused',
        transformOrigin: '100px 100px',
    };
    
    const bladeContainerStyle: React.CSSProperties = {
        transform: `scale(${bladeLength / 100})`,
        transformOrigin: '100px 100px',
        transition: 'transform 0.3s ease-in-out',
    };

    // Dynamically calculate blade path based on curvature for a more distinct visual effect
    const curvatureRatio = bladeCurvature / 100; // 0 to 1

    // Leading edge control points for a more pronounced curve
    const controlX = 98 - (curvatureRatio * 20); // from 98 (flatter) to 78 (very curved)
    const controlY = 80 - (curvatureRatio * 50); // from 80 (flatter) to 30 (very curved)

    // Trailing edge control points (makes blade look thicker/more scooped)
    const trailingControlX1 = 130 - (curvatureRatio * 5);  // 130 -> 125
    const trailingControlY1 = 50 + (curvatureRatio * 15); // 50 -> 65
    const trailingControlX2 = 120 - (curvatureRatio * 10); // 120 -> 110
    const trailingControlY2 = 80 + (curvatureRatio * 10);  // 80 -> 90
    
    const bladePath = `M100 100 Q ${controlX} ${controlY}, 115 40 C ${trailingControlX1} ${trailingControlY1}, ${trailingControlX2} ${trailingControlY2}, 100 100 Z`;


    const ledBrightness = powerOutput / 100;

    const ledGlowStyle: React.CSSProperties = {
        opacity: ledBrightness,
        transition: 'opacity 0.5s ease-in-out, filter 0.5s ease-in-out',
        filter: `drop-shadow(0 0 ${ledBrightness * 40}px #fef08a) drop-shadow(0 0 ${ledBrightness * 20}px #facc15)`,
    };
    
    // Calculate bulb color based on power output for a smooth transition from grey to yellow
    const bulbHue = 54 * ledBrightness;
    const bulbSaturation = 95 * ledBrightness; 
    const bulbLightness = 50 + 30 * ledBrightness; // from 50% (grey) to 80% (bright yellow)
    const bulbFillColor = `hsl(${bulbHue}, ${bulbSaturation}%, ${bulbLightness}%)`;
    
    const windOpacity = Math.min(windSpeed / 40, 1);
    const windAnimationSpeed = windSpeed > 0 ? Math.max(0.2, 1.5 - windSpeed / 70) : 0;
    
    const windStyle: React.CSSProperties = {
        opacity: windOpacity,
        transition: 'opacity 0.5s ease-in-out',
        animationDuration: windAnimationSpeed > 0 ? `${windAnimationSpeed}s` : 'none',
        animationPlayState: windSpeed > 5 ? 'running' : 'paused',
    };

    const electricityFlowStyle: React.CSSProperties = {
        opacity: powerOutput > 0 ? 0.9 : 0,
        transition: 'opacity 0.5s ease-in-out',
        animationDuration: powerOutput > 0 ? `${Math.max(0.2, 1.2 - powerOutput / 100)}s` : 'none',
        animationPlayState: powerOutput > 0 ? 'running' : 'paused',
    };


    return (
        <div className="w-full max-w-lg h-80 md:h-96 flex items-center justify-center">
            <svg viewBox="0 0 300 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                {/* Wind gusts */}
                <g 
                    className="animate-flow" 
                    style={windStyle} 
                    stroke="#38bdf8" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                    fill="none" 
                    strokeDasharray="20 30"
                >
                    <path d="M290 80 C 260 70, 240 90, 200 85" />
                    <path d="M270 105 C 250 100, 220 115, 180 110" />
                    <path d="M300 130 C 270 120, 250 140, 210 135" />
                    <path d="M280 155 C 255 150, 230 165, 190 160" />
                </g>
                
                {/* Ground */}
                <path d="M0 280 Q 150 250, 300 280 V 300 H 0 Z" fill="#22c55e" />
                
                 {/* Wire from Generator to LED */}
                <path d="M100 115 C 120 150, 150 250, 180 260" stroke="#a16207" strokeWidth="3" fill="none" />

                {/* Electricity Flow Animation */}
                <path
                    d="M100 115 C 120 150, 150 250, 180 260"
                    stroke="#fef08a"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="4 8"
                    className="animate-flow"
                    style={electricityFlowStyle}
                />

                {/* LED Light */}
                <g>
                    {/* Fixture */}
                    <rect x="165" y="260" width="30" height="15" rx="3" fill="#6b7280" />
                    {/* Glow and Bulb */}
                    <circle cx="180" cy="253" r="18" fill="#fef08a" style={ledGlowStyle} />
                    <circle 
                        cx="180" 
                        cy="253" 
                        r="12" 
                        fill={bulbFillColor}
                        stroke="#a16207" 
                        strokeWidth="2" 
                        style={{transition: 'fill 0.5s ease-in-out'}}
                    />
                </g>

                {/* Turbine Group */}
                <g>
                    {/* Tower */}
                    <path d="M95 110 L88 280 H 112 L 105 110 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
                    
                    {/* Base */}
                    <rect x="75" y="280" width="50" height="8" rx="3" fill="#94a3b8" />
                    
                    {/* Blades Group Container for scaling */}
                    <g style={bladeContainerStyle}>
                        {/* Blades Group for spinning */}
                        <g 
                            className="animate-spin-custom"
                            style={bladeStyle}
                        >
                            <path transform="rotate(0, 100, 100)" d={bladePath} fill="#fef9c3" stroke="#facc15" strokeWidth="1"/>
                            <path transform="rotate(120, 100, 100)" d={bladePath} fill="#fef9c3" stroke="#facc15" strokeWidth="1"/>
                            <path transform="rotate(240, 100, 100)" d={bladePath} fill="#fef9c3" stroke="#facc15" strokeWidth="1"/>
                        </g>
                    </g>
                    
                    {/* Nacelle (Generator housing) & Hub */}
                    <rect x="85" y="93" width="30" height="15" rx="5" fill="#cbd5e1"/>
                    <circle cx="100" cy="100" r="12" fill="#ef4444" />
                    <circle cx="100" cy="100" r="6" fill="#dc2626" />
                </g>

                {/* Labels and Callouts */}
                {!isComparison && (
                    <g fill="#334155" fontSize="12px" fontWeight="bold" textAnchor="start">
                        {/* Blade Label */}
                        <line x1="120" y1="40" x2="150" y2="20" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
                        <text x="155" y="22">Cánh quạt</text>
                        
                        {/* Generator Label */}
                        <line x1="115" y1="98" x2="140" y2="80" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
                        <text x="145" y="82">Máy phát điện</text>

                        {/* Tower Label */}
                        <line x1="88" y1="200" x2="50" y2="200" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
                        <text x="5" y="205" textAnchor="start">Trụ đỡ</text>
                        
                        {/* LED Label */}
                        <line x1="192" y1="253" x2="220" y2="240" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
                        <text x="225" y="240" dominantBaseline="middle">Đèn LED</text>
                    </g>
                )}
                
            </svg>
        </div>
    );
};

export default WindTurbine;