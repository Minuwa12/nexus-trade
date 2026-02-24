'use client';

import { useState } from 'react';

export default function VoiceJournalPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [sentiment, setSentiment] = useState<string | null>(null);

  const handleRecord = () => {
    if (isRecording) return;
    
    setIsRecording(true);
    setTranscript('');
    setSentiment(null);

    // This simulates the AI listening and transcribing your voice in real-time!
    setTimeout(() => setTranscript('Exiting half my position here...'), 1000);
    setTimeout(() => setTranscript('Exiting half my position here. Volume is drying up at the key resistance level...'), 2500);
    setTimeout(() => {
      setTranscript('Exiting half my position here. Volume is drying up at the key resistance level. I feel like I might be rushing this, but I want to secure profits before the news hits.');
      setSentiment('FEAR / RUSHED EXECUTION');
      setIsRecording(false);
    }, 4500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 mt-10">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-gray-200 tracking-widest uppercase">NLP Neural Link</h1>
        <p className="text-gray-500 font-medium text-sm tracking-wide">Speak your trade logic. The AI will analyze your psychological state.</p>
      </div>

      {/* Recording Interface */}
      <div className="bg-[#0a0a0a] border border-red-950/60 rounded-2xl p-10 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
        
        {/* Ambient background glow when recording */}
        {isRecording && (
          <div className="absolute inset-0 bg-red-900/10 blur-[80px] animate-pulse pointer-events-none"></div>
        )}

        {/* The Microphone Button */}
        <button 
          onClick={handleRecord}
          className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${
            isRecording 
              ? 'bg-red-700 shadow-[0_0_40px_rgba(185,28,28,0.6)] scale-110' 
              : 'bg-[#111] border border-red-900 hover:border-red-500 hover:bg-[#1a0505] shadow-lg'
          }`}
        >
          <div className={`w-8 h-8 rounded-full ${isRecording ? 'bg-white animate-pulse' : 'bg-red-700'}`}></div>
        </button>
        
        <p className="mt-6 text-xs font-bold tracking-widest text-gray-500 uppercase z-10">
          {isRecording ? 'Listening...' : 'Tap to Initiate'}
        </p>

        {/* AI Transcription Box */}
        <div className="mt-10 w-full max-w-2xl bg-[#050505] border border-gray-800 rounded-lg p-6 min-h-[120px] relative z-10">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Live Transcript</p>
          <p className="text-gray-300 font-mono text-sm leading-relaxed">
            {transcript || (isRecording ? <span className="animate-pulse text-red-700">|</span> : 'Awaiting audio input...')}
          </p>
        </div>

        {/* AI Sentiment Result */}
        {sentiment && (
          <div className="mt-6 border border-amber-600/50 bg-amber-900/10 px-6 py-3 rounded-full flex items-center space-x-3 z-10 animate-fade-in-up">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-600"></span>
            </span>
            <span className="text-amber-500 text-sm font-bold tracking-widest uppercase">
              AI Warning: {sentiment}
            </span>
          </div>
        )}

      </div>
    </div>
  );
}