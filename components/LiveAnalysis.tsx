
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { getRealTimeWeather } from '../services/weatherService';

// Mock live data generator
const generateData = () => {
    return Array.from({ length: 10 }, (_, i) => ({
        time: `${i * 10}m`,
        sentiment: 60 + Math.random() * 30, // Random score between 60-90
        energy: 50 + Math.random() * 40
    }));
};

export const SentimentTracker: React.FC = () => {
    const [data, setData] = useState(generateData());

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => {
                const newPoint = {
                    time: 'Now',
                    sentiment: 60 + Math.random() * 30,
                    energy: 50 + Math.random() * 40
                };
                return [...prev.slice(1), newPoint];
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        Live Crowd Mood
                    </h3>
                    <p className="text-xs text-gray-500">Real-time analysis via venue cameras</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">Positive</p>
                    <p className="text-xs text-gray-400">Current Vibe</p>
                </div>
            </div>
            
            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="time" hide />
                        <YAxis hide domain={[0, 100]} />
                        <Tooltip />
                        <Area type="monotone" dataKey="sentiment" stroke="#10B981" fillOpacity={1} fill="url(#colorSent)" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            
            <div className="mt-4 flex gap-4 text-xs font-medium text-gray-500">
                <div className="flex items-center gap-1">
                    <div className="w-3 h-1 bg-green-500 rounded-full"></div> Engagement
                </div>
            </div>
        </div>
    );
};

export const WeatherRisk: React.FC = () => {
    const [weather, setWeather] = useState<{temp: number, cond: string, humidity: number} | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            const data = await getRealTimeWeather();
            setWeather({
                temp: data.temperature,
                cond: data.condition,
                humidity: data.humidity
            });
            setLoading(false);
        };
        fetchWeather();
    }, []);

    const isRisky = weather ? (weather.temp > 35 || weather.temp < 10 || weather.cond.includes('Rain') || weather.cond.includes('Thunder')) : false;

    return (
        <div className={`bg-gradient-to-br ${isRisky ? 'from-orange-500 to-red-600' : 'from-blue-500 to-blue-600'} rounded-2xl p-6 text-white shadow-lg relative overflow-hidden transition-all duration-500`}>
            <div className="relative z-10">
                <h3 className="font-bold text-sm uppercase opacity-80 mb-4">AI Risk Prediction (Live)</h3>
                
                {loading ? (
                    <div className="animate-pulse flex flex-col gap-2">
                        <div className="h-8 w-24 bg-white/20 rounded"></div>
                        <div className="h-4 w-32 bg-white/20 rounded"></div>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <span className="text-4xl">{isRisky ? '🌧️' : '🌤️'}</span>
                                <p className="font-bold text-lg mt-2">{isRisky ? 'Moderate Risk' : 'Low Risk'}</p>
                                <p className="text-xs opacity-80">{weather?.cond}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold">{weather?.temp}°C</p>
                                <p className="text-xs opacity-80">Humidity: {weather?.humidity}%</p>
                            </div>
                        </div>

                        <div className="bg-white/10 rounded-lg p-3 text-xs">
                            <p><b>AI Suggestion:</b> {isRisky ? 'Keep indoor backup ready. Rain predicted.' : 'Ideal conditions for outdoor events.'}</p>
                        </div>
                    </>
                )}
            </div>
            
            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>
    );
};
