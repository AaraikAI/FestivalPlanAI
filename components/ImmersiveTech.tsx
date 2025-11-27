
import React, { useState } from 'react';

// AR Simulation Component
export const ARDecorPreview: React.FC = () => {
    const [activeDecor, setActiveDecor] = useState<string | null>(null);

    return (
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-96 bg-gray-100 group">
            <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                <span>👓</span> AR Live Preview
            </div>
            
            {/* Base Venue Image */}
            <img 
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800" 
                className="w-full h-full object-cover" 
                alt="Venue"
            />

            {/* AR Overlays */}
            {activeDecor === 'floral' && (
                <div className="absolute inset-0 pointer-events-none animate-in fade-in duration-700">
                    <img 
                      src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop" 
                      className="absolute top-0 left-0 w-full h-2/3 object-cover opacity-90 mix-blend-multiply" 
                      style={{ maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }}
                      alt="Floral Decoration" 
                    />
                    <div className="absolute bottom-10 left-10 bg-white/80 p-2 rounded text-xs font-bold text-pink-700">🌺 Floral Package Applied</div>
                </div>
            )}
            {activeDecor === 'lights' && (
                <div className="absolute inset-0 pointer-events-none">
                     <div className="absolute inset-0 bg-yellow-500/10 mix-blend-overlay animate-pulse"></div>
                     <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_10px_yellow]"></div>
                     <div className="absolute top-20 right-20 w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_10px_yellow]"></div>
                     <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-yellow-200 rounded-full shadow-[0_0_15px_yellow]"></div>
                     {/* Simulating Bokeh */}
                     <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,0,0.2)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
                </div>
            )}

            {/* Controls */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl flex gap-3 overflow-x-auto">
                <button 
                  onClick={() => setActiveDecor(null)} 
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeDecor === null ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
                >
                  Original
                </button>
                <button 
                  onClick={() => setActiveDecor('floral')} 
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${activeDecor === 'floral' ? 'bg-pink-600 text-white border-pink-600' : 'bg-pink-50 text-pink-700 border-pink-200'}`}
                >
                  🌺 Floral Arch
                </button>
                <button 
                  onClick={() => setActiveDecor('lights')} 
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${activeDecor === 'lights' ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}
                >
                  ✨ Fairy Lights
                </button>
            </div>
        </div>
    );
};

// VR Tour Component
export const VRVenueTour: React.FC = () => {
    return (
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-96 bg-black group cursor-move">
            <div className="absolute top-4 left-4 z-10 bg-indigo-600/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                <span>🥽</span> VR 360° Tour
            </div>
             
             {/* Simulating 360 Pan via Animation */}
            <div className="w-[200%] h-full animate-[panImage_20s_linear_infinite] flex">
                 <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1600" className="w-1/2 h-full object-cover" />
                 <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1600" className="w-1/2 h-full object-cover scale-x-[-1]" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="w-12 h-12 border-2 border-white/50 rounded-full flex items-center justify-center">
                     <div className="w-1 h-1 bg-white rounded-full"></div>
                 </div>
            </div>

            <style>{`
                @keyframes panImage {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
};

// IoT Smart Controls
export const IoTControls: React.FC = () => {
    const [lights, setLights] = useState(true);
    const [ac, setAc] = useState(24);

    return (
        <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-xl border border-gray-700">
            <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <h3 className="font-bold text-sm uppercase tracking-wider">Smart Venue Connected</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div 
                  className={`p-4 rounded-xl border transition-all duration-300 ${lights ? 'bg-yellow-500/20 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.2)]' : 'bg-gray-800 border-gray-700'}`}
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className={`text-2xl transition-all ${lights ? 'scale-110' : 'opacity-50'}`}>💡</span>
                        <div className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${lights ? 'bg-yellow-500' : 'bg-gray-600'}`} onClick={() => setLights(!lights)}>
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${lights ? 'translate-x-4' : 'translate-x-0'}`}></div>
                        </div>
                    </div>
                    <p className="font-bold">Main Lights</p>
                    <p className="text-xs opacity-70 transition-opacity">{lights ? 'On - 80% Brightness' : 'Off'}</p>
                </div>

                <div className="p-4 rounded-xl border border-blue-500/50 bg-blue-500/10">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-2xl">❄️</span>
                        <div className="flex gap-1">
                            <button onClick={() => setAc(ac-1)} className="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 active:scale-95 transition-transform">-</button>
                            <button onClick={() => setAc(ac+1)} className="w-6 h-6 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 active:scale-95 transition-transform">+</button>
                        </div>
                    </div>
                    <p className="font-bold">Climate</p>
                    <p className="text-xs opacity-70">{ac}°C - Cooling</p>
                </div>
            </div>
        </div>
    );
};
