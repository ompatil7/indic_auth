import React, { useState, useEffect, useCallback } from "react";

const sentences = [
  {
    hindi: "आज का मौसम अच्छा है।",
    english: "The weather is nice today.",
    romanized: "Aaj ka mausam accha hai.",
    words: ["The", "weather", "is", "nice", "today"],
    extraWords: ["beautiful", "cold", "was", "will", "morning"]
  },
  {
    hindi: "मुझे यात्रा करना पसंद है।",
    english: "I like to travel.",
    romanized: "Mujhe yatra karna pasand hai.",
    words: ["I", "like", "to", "travel"],
    extraWords: ["want", "love", "hate", "going", "we"]
  },
  {
    hindi: "वह बहुत समझदार है।",
    english: "He/She is very wise.",
    romanized: "Woh bahut samajhdar hai.",
    words: ["He/She", "is", "very", "wise"],
    extraWords: ["they", "are", "was", "smart", "good"]
  },
  {
    hindi: "मेरे पास एक किताब है।",
    english: "I have a book.",
    romanized: "Mere paas ek kitaab hai.",
    words: ["I", "have", "a", "book"],
    extraWords: ["the", "had", "pen", "many", "will"]
  },
  {
    hindi: "हम शाम को पार्क में जाएंगे।",
    english: "We will go to the park in the evening.",
    romanized: "Hum shaam ko park mein jaayenge.",
    words: ["We", "will", "go", "to", "the", "park", "in", "the", "evening"],
    extraWords: ["morning", "today", "tomorrow", "they", "walk"]
  }
];

const Sentence = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isError, setIsError] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [highlightCorrect, setHighlightCorrect] = useState(false);

  const shuffleArray = useCallback((array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }, []);

  const initializeWords = useCallback(() => {
    const currentSentence = sentences[currentQuestion];
    const allWords = [...currentSentence.words, ...currentSentence.extraWords];
    setAvailableWords(shuffleArray(allWords));
  }, [currentQuestion, shuffleArray]);

  const speakSentence = useCallback(() => {
    const utterance = new SpeechSynthesisUtterance(sentences[currentQuestion].hindi);
    utterance.lang = "hi-IN";
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  }, [currentQuestion]);

  useEffect(() => {
    initializeWords();
    speakSentence();
  }, [initializeWords, speakSentence]);

  const handleWordSelect = (word) => {
    if (!selectedWords.includes(word)) {
      setSelectedWords([...selectedWords, word]);
      setAvailableWords(availableWords.filter((w) => w !== word));
      setIsError(false);
    }
  };

  const handleWordRemove = (word, index) => {
    const newSelected = [...selectedWords];
    newSelected.splice(index, 1);
    setSelectedWords(newSelected);
    setAvailableWords([...availableWords, word]);
    setIsError(false);
  };

  const checkAnswer = () => {
    const correctSentence = sentences[currentQuestion].words.join(" ");
    const userSentence = selectedWords.join(" ");

    if (correctSentence === userSentence) {
      setShowTranslation(true);
      setIsError(false);
      setHighlightCorrect(true);
      setFeedbackMessage("Correct Answer!");
      setTimeout(() => {
        setFeedbackMessage(null);
        if (currentQuestion < sentences.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedWords([]);
          setShowTranslation(false);
          setHighlightCorrect(false);
        } else {
          alert("आप सभी सवालों को हल कर चुके हैं!");
        }
      }, 2000);
    } else {
      setIsError(true);
      setFeedbackMessage("Wrong Answer! Try again.");
      setTimeout(() => {
        setFeedbackMessage(null);
        const allWords = [...selectedWords, ...availableWords];
        setSelectedWords([]);
        setAvailableWords(shuffleArray(allWords));
        setIsError(false);
      }, 1500);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-5 font-sans">
      <h1 className="text-2xl text-center font-bold text-purple-700 mb-6">Translate this sentence</h1>

      <div className="mb-8 flex items-center justify-center">
        <button
          onClick={speakSentence}
          className="text-2xl bg-none border-none cursor-pointer focus:outline-none mr-4"
        >
          🔊
        </button>
        <div
          className={`px-6 py-4 rounded-lg shadow-lg text-lg ${
            highlightCorrect ? "bg-green-100 border-2 border-green-500" : isError ? "bg-red-100 border-2 border-red-500" : "bg-white border"
          }`}
        >
          {sentences[currentQuestion].hindi}
        </div>
      </div>

      {showTranslation && (
        <div className="bg-gray-100 px-4 py-3 rounded-md shadow-md text-center mb-4">
          <p className="text-base text-gray-600">{sentences[currentQuestion].english}</p>
        </div>
      )}

      {feedbackMessage && (
        <div className={`px-4 py-2 rounded-md text-center mb-4 font-semibold ${
          highlightCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}>{feedbackMessage}</div>
      )}

      <div className="flex flex-wrap gap-3 p-3 bg-purple-100 border-2 border-purple-300 rounded-lg min-h-[80px] mb-5">
        {selectedWords.map((word, index) => (
          <button
            key={index}
            className="px-4 py-2 bg-purple-200 text-purple-800 rounded-lg shadow-md focus:outline-none"
            onClick={() => handleWordRemove(word, index)}
          >
            {word}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 p-3 bg-gray-100 border-2 border-gray-300 rounded-lg min-h-[80px] mb-6">
        {availableWords.map((word, index) => (
          <button
            key={index}
            className="px-4 py-2 bg-white text-gray-800 rounded-lg shadow-md hover:bg-gray-200 focus:outline-none"
            onClick={() => handleWordSelect(word)}
          >
            {word}
          </button>
        ))}
      </div>

      <button
        className={`w-full px-6 py-3 rounded-lg text-white font-bold transition-all ${
          selectedWords.length > 0
            ? "bg-purple-600 hover:bg-purple-700"
            : "bg-gray-300 cursor-not-allowed"
        } ${isError ? "bg-red-500" : ""}`}
        onClick={checkAnswer}
        disabled={selectedWords.length === 0}
      >
        CHECK
      </button>
    </div>
  );
};

export default Sentence;
