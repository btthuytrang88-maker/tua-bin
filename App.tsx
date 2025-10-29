import React, { useState, useMemo } from 'react';
import WindTurbine from './components/WindTurbine';
import ControlPanel from './components/ControlPanel';
import PowerOutput from './components/PowerOutput';
import Explanation from './components/Explanation';

type ComparisonMode = 'none' | 'length' | 'curvature';

const App: React.FC = () => {
    const [windSpeed, setWindSpeed] = useState(0); // Wind speed in km/h
    const [bladeLength, setBladeLength] = useState(100); // Blade length percentage
    const [bladeCurvature, setBladeCurvature] = useState(50); // Blade curvature from 0 to 100
    const [comparisonMode, setComparisonMode] = useState<ComparisonMode>('none');

    const STANDARD_CURVATURE_FOR_COMPARISON = 0; // Flat
    const BASE_LENGTH_FOR_COMPARISON = 75; // The fixed length for the first turbine during length comparison.


    const powerOutputs = useMemo(() => {
        const calculatePower = (bladeLengthPercentage: number, curvature: number) => {
            const CUT_IN_SPEED = 10;
            const RATED_SPEED = 50;
            const MAX_SPEED = 100;
            
            if (windSpeed < CUT_IN_SPEED) return 0;
            
            const windPowerFactor = Math.pow((windSpeed - CUT_IN_SPEED) / (RATED_SPEED - CUT_IN_SPEED), 2);
            const bladeLengthFactor = Math.pow(bladeLengthPercentage / 100, 2);
            // More curvature = more efficient. Factor from 0.8 (flat) to 1.2 (very curved)
            const bladeCurvatureFactor = 0.8 + (curvature / 100) * 0.4; 

            const power = windPowerFactor * 100 * bladeLengthFactor * bladeCurvatureFactor;

            if (windSpeed > MAX_SPEED) return Math.min(Math.round(100 * bladeLengthFactor * bladeCurvatureFactor), 125);

            return Math.min(Math.round(power), 125);
        };
        
        let turbine1Length: number;
        let turbine1Curvature: number;
        let turbine2Length: number;
        let turbine2Curvature: number;

        if (comparisonMode === 'length') {
            turbine1Length = BASE_LENGTH_FOR_COMPARISON;
            turbine1Curvature = bladeCurvature;
            turbine2Length = bladeLength; // Controlled by slider
            turbine2Curvature = bladeCurvature;
        } else if (comparisonMode === 'curvature') {
            turbine1Length = bladeLength;
            turbine1Curvature = STANDARD_CURVATURE_FOR_COMPARISON;
            turbine2Length = bladeLength; // Same length
            turbine2Curvature = bladeCurvature; // Controlled by slider
        } else { // mode === 'none'
            turbine1Length = bladeLength;
            turbine1Curvature = bladeCurvature;
            turbine2Length = bladeLength; // Not used, but for consistency
            turbine2Curvature = bladeCurvature; // Not used
        }
        
        const standardPower = calculatePower(turbine1Length, turbine1Curvature);
        let comparisonPower = 0;
        
        if (comparisonMode !== 'none') {
            comparisonPower = calculatePower(turbine2Length, turbine2Curvature);
        }


        return {
            standard: standardPower,
            comparison: comparisonPower,
        };
    }, [windSpeed, bladeCurvature, bladeLength, comparisonMode]);

    const handleReset = () => {
        setWindSpeed(0);
        setBladeLength(100); // Reset to default size
        setBladeCurvature(50); // Reset to default curvature
        setComparisonMode('none');
    };

    const handleComparisonModeChange = (mode: 'length' | 'curvature') => {
        setComparisonMode(prev => {
            const isTogglingOff = prev === mode;
            if (isTogglingOff) {
                // When turning off any comparison, restore default blade settings
                setBladeLength(100);
                setBladeCurvature(50);
                return 'none';
            } else {
                // When turning on a new mode or switching between modes
                if (mode === 'length') {
                    // Set initial state for length comparison
                    setBladeLength(BASE_LENGTH_FOR_COMPARISON); 
                    setBladeCurvature(50); // Keep curvature normal for this comparison
                } else if (mode === 'curvature') {
                    // Set initial state for curvature comparison
                    setBladeCurvature(STANDARD_CURVATURE_FOR_COMPARISON);
                    setBladeLength(100); // Keep length normal for this comparison
                }
                return mode;
            }
        });
    };


    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-300 to-sky-400 flex flex-col items-center justify-center p-4 font-sans text-slate-800">
            <header className="text-center mb-6">
                <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.25)' }}>Mô Hình Máy Phát Điện Gió</h1>
                <p className="text-lg text-sky-100 mt-2">Điều chỉnh các thông số để xem cách tạo ra điện</p>
            </header>
            
            <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 flex flex-col items-center justify-center p-6 bg-white/50 rounded-2xl shadow-xl backdrop-blur-md border border-white/30">
                    
                    <div className="w-full flex flex-row justify-center items-end gap-8">
                        {/* Standard Turbine */}
                        <div className="flex-1 flex flex-col items-center">
                            <h3 className="text-lg font-semibold text-slate-700 mb-2 h-12 flex items-center justify-center text-center">
                                <span>&nbsp;</span>
                            </h3>
                            <WindTurbine 
                                windSpeed={windSpeed} 
                                powerOutput={powerOutputs.standard} 
                                bladeLength={comparisonMode === 'length' ? BASE_LENGTH_FOR_COMPARISON : bladeLength} 
                                bladeCurvature={comparisonMode === 'curvature' ? STANDARD_CURVATURE_FOR_COMPARISON : bladeCurvature} 
                            />
                            <div className="mt-4 w-full max-w-xs">
                                <PowerOutput powerOutput={powerOutputs.standard} />
                            </div>
                        </div>

                        {/* Comparison Turbine */}
                        <div className={`flex flex-col items-center transition-all duration-500 ease-in-out ${comparisonMode !== 'none' ? 'flex-1 opacity-100' : 'flex-none w-0 opacity-0 overflow-hidden'}`}>
                            <h3 className="text-lg font-semibold text-slate-700 mb-2 h-12 flex items-center justify-center text-center">
                                <span>&nbsp;</span>
                            </h3>
                             <WindTurbine 
                                windSpeed={windSpeed} 
                                powerOutput={powerOutputs.comparison} 
                                bladeLength={bladeLength} 
                                bladeCurvature={bladeCurvature}
                                isComparison={true}
                             />
                            <div className="mt-4 w-full max-w-xs">
                                <PowerOutput powerOutput={powerOutputs.comparison} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full max-w-md mt-8">
                       <ControlPanel 
                          windSpeed={windSpeed} 
                          setWindSpeed={setWindSpeed}
                          bladeLength={bladeLength}
                          setBladeLength={setBladeLength}
                          bladeCurvature={bladeCurvature}
                          setBladeCurvature={setBladeCurvature}
                          comparisonMode={comparisonMode}
                          onComparisonModeChange={handleComparisonModeChange}
                          onReset={handleReset}
                       />
                    </div>
                </div>

                <div className="lg:col-span-1">
                  <Explanation comparisonMode={comparisonMode} />
                </div>
            </main>

            <footer className="mt-8 text-center text-sky-100 text-sm">
                <p>Được xây dựng bởi AI. Mô phỏng chỉ mang tính chất minh họa.</p>
            </footer>
        </div>
    );
};

export default App;