import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';

export default function Frog() {
  const hindi_vowels = useMemo(() => [
    'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 
    'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'
  ], []);

  const [currentTarget, setCurrentTarget] = useState('');
  const [score, setScore] = useState(0);
  const [canJump, setCanJump] = useState(true);

  const characterRef = useRef(null);
  const platformsContainerRef = useRef(null);

  const setNewTarget = useCallback(() => {
    setCurrentTarget(() => hindi_vowels[Math.floor(Math.random() * hindi_vowels.length)]);
  }, [hindi_vowels]);

  const jumpToPlatform = useCallback((platform) => {
    setCanJump(false);
    const character = characterRef.current;
    const platformsContainer = platformsContainerRef.current;

    if (!character || !platformsContainer) return;

    const targetRect = platform.getBoundingClientRect();
    const containerRect = platformsContainer.getBoundingClientRect();

    const targetX = targetRect.left - containerRect.left + targetRect.width / 2 - character.offsetWidth / 2;
    const targetY = containerRect.bottom - targetRect.bottom + targetRect.height / 2 - character.offsetHeight / 2;

    const startX = parseFloat(character.style.left || '0');
    const startY = parseFloat(character.style.bottom || '50');

    const jumpDuration = 800;
    const startTime = performance.now();

    const animateJump = (currentTime) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / jumpDuration, 1);

      const x = startX + t * (targetX - startX);
      const y = startY + t * (targetY - startY) - (4 * t * (1 - t)) * 120;

      character.style.left = `${x}px`;
      character.style.bottom = `${y}px`;

      if (t < 1) {
        requestAnimationFrame(animateJump);
      } else {
        setScore((prev) => prev + 1);
        setNewTarget();
        setCanJump(true);
      }
    };

    requestAnimationFrame(animateJump);
  }, [setNewTarget]);

  const handleJump = useCallback((platform) => {
    if (!canJump) return;

    const vowel = platform.dataset.vowel;

    if (vowel === currentTarget) {
      jumpToPlatform(platform);
    } else {
      platform.classList.add('animate-shake');
      setTimeout(() => platform.classList.remove('animate-shake'), 500);
    }
  }, [canJump, currentTarget, jumpToPlatform]);

  const handleKeyDown = useCallback((e) => {
    const index = '1234567890qwe'.indexOf(e.key);
    if (index >= 0 && index < hindi_vowels.length) {
      const platform = platformsContainerRef.current?.children[index];
      if (platform) handleJump(platform);
    }
  }, [hindi_vowels, handleJump]);

  useEffect(() => {
    setNewTarget();
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setNewTarget, handleKeyDown]);

  const platformsGrid = useMemo(() => (
    hindi_vowels.map((vowel, index) => (
      <div
        key={index}
        data-vowel={vowel}
        onClick={(e) => handleJump(e.currentTarget)}
        className="relative w-24 h-24 cursor-pointer bg-purple-200 rounded-full flex items-center justify-center text-2xl font-bold shadow-md transition-transform duration-300 hover:translate-y-[-5px]"
      >
        {vowel}
      </div>
    ))
  ), [hindi_vowels, handleJump]);

  return (
    <div className="text-center min-h-screen bg-gradient-to-b from-purple-600 via-purple-300 to-white flex flex-col items-center justify-center overflow-y-auto py-10">
      <div className="bg-white text-2xl font-semibold shadow-lg px-6 py-4 rounded-md mb-6">
        Score: <span className="text-purple-700">{score}</span>
      </div>
      <div className="bg-white text-xl font-medium shadow-lg px-5 py-3 rounded-md mb-6">
        Jump to: <span className="text-purple-900">{currentTarget}</span>
      </div>

      <div className="relative w-full max-w-4xl h-[80vh] bg-gradient-to-b from-purple-300 to-purple-100 rounded-md overflow-hidden shadow-lg">
        <div
          ref={characterRef}
          className="absolute w-20 h-20 text-5xl bottom-14 left-1/2 transform -translate-x-1/2 transition-transform duration-700"
        >
          🐸
        </div>
        <div
          ref={platformsContainerRef}
          className="absolute bottom-10 grid grid-cols-5 gap-8 p-6 w-full justify-items-center"
        >
          {platformsGrid}
        </div>
      </div>
    </div>
  );
}
