import { useState, useCallback } from 'react';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import type { VideoSettings } from './components/PromptInput';
import GeneratingOverlay from './components/GeneratingOverlay';
import VideoResult from './components/VideoResult';
import Gallery from './components/Gallery';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Stats from './components/Stats';
import Footer from './components/Footer';

type AppState = 'idle' | 'generating' | 'result';

function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[128px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[128px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-fuchsia-600/5 rounded-full blur-[128px] animate-float" style={{ animationDelay: '4s' }} />
      
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

function HeroBanner() {
  return (
    <div className="text-center mb-10 animate-fadeIn">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm mb-6">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
        </span>
        Free AI Video Generator - No Login Required
      </div>
      <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
        Prompt Likho,{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400">
          Video Pao!
        </span>
      </h1>
      <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-2">
        🎬 Sirf apna idea likho aur AI amazing videos banayega. 
        Koi editing skill ki zaroorat nahi!
      </p>
      <p className="text-sm text-gray-600">
        Cinematic • Anime • Realistic • 3D • Watercolor • Cartoon
      </p>
    </div>
  );
}

export default function App() {
  const [state, setState] = useState<AppState>('idle');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [currentSettings, setCurrentSettings] = useState<VideoSettings>({
    duration: '8s',
    style: 'cinematic',
    resolution: '1080p',
  });

  const handleGenerate = useCallback((prompt: string, settings: VideoSettings) => {
    setCurrentPrompt(prompt);
    setCurrentSettings(settings);
    setState('generating');

    // Simulate video generation
    setTimeout(() => {
      setState('result');
    }, 8000);
  }, []);

  const handleReset = useCallback(() => {
    setState('idle');
    setCurrentPrompt('');
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white relative">
      <BackgroundEffects />
      <Header />

      <main className="relative z-10 px-4 sm:px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          {state === 'idle' && <HeroBanner />}

          {/* Main Content Area */}
          <div className="mb-16">
            {state === 'idle' && (
              <PromptInput onGenerate={handleGenerate} isGenerating={false} />
            )}
            {state === 'generating' && (
              <GeneratingOverlay prompt={currentPrompt} />
            )}
            {state === 'result' && (
              <VideoResult
                prompt={currentPrompt}
                settings={currentSettings}
                onReset={handleReset}
              />
            )}
          </div>

          {/* Stats */}
          {state === 'idle' && (
            <div className="mb-16">
              <Stats />
            </div>
          )}

          {/* How It Works */}
          {state === 'idle' && (
            <div className="mb-16">
              <HowItWorks />
            </div>
          )}

          {/* Features */}
          {state === 'idle' && (
            <div className="mb-16">
              <Features />
            </div>
          )}
        </div>

        {/* Gallery - wider */}
        {state === 'idle' && (
          <div className="max-w-6xl mx-auto mb-16">
            <Gallery />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
