import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import ThoughtBubble from './ThoughtBubble';
import { useSpeechState } from './Avatar';
import { ArrowLeft, Play, Mic } from 'lucide-react'; // Import icons from lucide-react

function LessonPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { levelFile } = location.state || { levelFile: 'swar.json' };
  
  const { isTeaching, setIsTeaching, setIsClapping, setBowing } = useSpeechState();
  const [highlightedWord, setHighlightedWord] = useState('');
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [lessonText, setLessonText] = useState('');
  const [englishText, setEnglishText] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [speechResult, setSpeechResult] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const loadLessons = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/syllabus/${levelFile}`);
        if (!response.ok) {
          throw new Error('Failed to load lesson data');
        }
        const data = await response.json();
        setLessons(data);
        if (data.length > 0) {
          setLessonText(data[0].text);
          setEnglishText(data[0].english);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading lessons:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };
    loadLessons();
  }, [levelFile]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.lang = "hi-IN";
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      setRecognition(recognitionInstance);
    }
  }, []);

  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  const playAudio = useCallback(async (text, callback) => {
    speechSynthesis.cancel();
    
    return new Promise((resolve) => {
      if (isSpeaking) {
        resolve();
        return;
      }

      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "hi-IN";
      speech.rate = 0.9;
      speech.pitch = 1.1;
      speech.volume = 1.0;

      setIsTeaching(true);
      setIsSpeaking(true);

      if (text === lessons[0]?.text) {
        setBowing(true);
        setTimeout(() => setBowing(false), 2000);
      }

      const targetWord = text.split('।')[0].split('से ')[1]?.split(' ')[0];
      if (targetWord) {
        setHighlightedWord(targetWord);
      }

      speech.onstart = () => {
        setIsTeaching(true);
      };

      speech.onend = () => {
        setIsTeaching(false);
        setHighlightedWord('');
        setIsSpeaking(false);
        if (callback) {
          callback();
        }
        resolve();
      };

      speech.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsTeaching(false);
        setHighlightedWord('');
        setIsSpeaking(false);
        resolve();
      };

      speechSynthesis.speak(speech);
    });
  }, [setIsTeaching, setBowing, lessons, isSpeaking]);

  const startSpeechRecognition = useCallback((expectedText) => {
    if (!recognition || isListening || isSpeaking) return;

    setIsListening(true);
    recognition.start();
    
    recognition.onresult = function(event) {
      const speechResultText = event.results[0][0].transcript.trim();
      setSpeechResult(speechResultText);
      setIsListening(false);

      if (speechResultText === expectedText) {
        setIsClapping(true);
        
        playAudio("बहुत बढ़िया! चलिए आगे बढ़ते हैं।").then(() => {
          setIsClapping(false);
          const nextLessonIndex = currentLesson + 1;
          if (nextLessonIndex < lessons.length) {
            setCurrentLesson(nextLessonIndex);
            setLessonText(lessons[nextLessonIndex].text);
            setEnglishText(lessons[nextLessonIndex].english);
          }
        });
      } else {
        playAudio("फिर से कोशिश कीजिए।");
      }
    };

    recognition.onerror = function(event) {
      console.error('Speech recognition error:', event);
      setIsListening(false);
      playAudio("फिर से कोशिश कीजिए।");
    };

    recognition.onend = function() {
      setIsListening(false);
    };
  }, [recognition, playAudio, currentLesson, lessons, setIsClapping, isListening, isSpeaking]);

  const teachLesson = useCallback(async () => {
    if (currentLesson < lessons.length && !isSpeaking) {
      const lesson = lessons[currentLesson];
      
      if (currentLesson === 0) {
        await playAudio(lesson.text);
        const nextLessonIndex = currentLesson + 1;
        if (nextLessonIndex < lessons.length) {
          setCurrentLesson(nextLessonIndex);
          setLessonText(lessons[nextLessonIndex].text);
          setEnglishText(lessons[nextLessonIndex].english);
        }
      } else {
        await playAudio(lesson.text);
        await new Promise(resolve => setTimeout(resolve, 500));
        await playAudio("मेरे बाद दोहराएँ");
        setTimeout(() => {
          startSpeechRecognition(lesson.expected);
        }, 500);
      }
    }
  }, [currentLesson, lessons, playAudio, startSpeechRecognition, isSpeaking]);

  useEffect(() => {
    let mounted = true;
    
    if (!isLoading && lessons.length > 0 && currentLesson === 0 && !isSpeaking) {
      const timer = setTimeout(() => {
        if (mounted) {
          teachLesson();
        }
      }, 1000);
      
      return () => {
        mounted = false;
        clearTimeout(timer);
      };
    }
  }, [isLoading, lessons, currentLesson, teachLesson, isSpeaking]);

  const renderHighlightedText = (text) => {
    if (!highlightedWord) return text;
    
    const parts = text.split(highlightedWord);
    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && (
              <span className="text-orange-500 font-bold">{highlightedWord}</span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#FDBA0D]">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <p className="mt-4 text-gray-800">Loading lesson...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#FDBA0D]">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Error Loading Lesson</h2>
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => navigate('/')}
          className="rounded-full bg-white p-4 shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
        >
          ←
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FDBA0D] p-5 flex flex-col items-center relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <ArrowLeft
          className="w-10 h-10 cursor-pointer"
          onClick={() => navigate('/home')}
        />
      </div>

      {/* Main Content */}
      <div className="w-full flex justify-center mt-16">
        <div className="relative w-[400px] h-[400px] rounded-full overflow-hidden bg-gray-100 shadow-lg">
          <div className="absolute inset-0">
            <Avatar
              cameraPosition={[0, -1, 8]}
              targetPosition={[0, 0, 0]}
              fov={45}
              enableZoom={false}
              minZoom={2}
              maxZoom={10}
              initialScale={4.5}
            />
          </div>
          {isTeaching && (
            <ThoughtBubble currentLesson={currentLesson} lessons={lessons} />
          )}
        </div>
      </div>

      <div className="flex flex-col items-center mt-5 w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
          <div
            className="bg-orange-500 h-full rounded-full"
            style={{ width: `${(currentLesson / lessons.length) * 100}%` }}
          />
        </div>

        {/* Lesson Text */}
        <div className="text-center text-lg font-semibold mb-3">
          <p className="text-gray-800">{renderHighlightedText(lessonText)}</p>
        </div>

        {/* English Translation */}
        <div className="text-center text-md mb-3 text-gray-500">
          {englishText}
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={teachLesson}
            className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600"
          >
            <Play className="w-6 h-6" />
          </button>
          <button
            onClick={() => startSpeechRecognition(lessonText)}
            className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600"
          >
            <Mic className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LessonPage;