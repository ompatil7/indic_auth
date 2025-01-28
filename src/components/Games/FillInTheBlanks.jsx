import React, { useState, useEffect } from "react";

const sentences = [
  {
    text: "यह बिल्ली है।",
    english: "This is a cat.",
    missing: "बिल्ली",
    options: ["कुत्ता", "बिल्ली", "गाय"],
  },
  {
    text: "यह घर है।",
    english: "This is a house.",
    missing: "घर",
    options: ["गाड़ी", "घर", "पानी"],
  },
  {
    text: "यह जल है।",
    english: "This is water.",
    missing: "जल",
    options: ["जल", "हवा", "आग"],
  },
];

const FillInTheBlanks = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const generateSentence = (sentence, missingWord) => {
    return sentence.replace(missingWord, "___");
  };

  const speakSentence = (sentence) => {
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = "hi-IN";
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const sentence = sentences[currentQuestion].text;
    speakSentence(sentence);
  }, [currentQuestion]);

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    if (option === sentences[currentQuestion].missing) {
      setShowNextButton(true);
      setShowTranslation(true);
    }
  };

  const handleNext = () => {
    if (currentQuestion < sentences.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowNextButton(false);
      setShowTranslation(false);
    } else {
      alert("शाबाश! आपने सब सवाल हल कर लिए।");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-green-600 mb-6 text-center">खाली जगह भरो</h1>

      <div className="mb-8 text-center">
        {!showTranslation ? (
          <p className="text-xl mb-4">
            {generateSentence(
              sentences[currentQuestion].text,
              sentences[currentQuestion].missing
            )}
          </p>
        ) : (
          <div className="animate-fadeIn">
            <p className="text-xl font-semibold text-green-600 mb-2">
              {sentences[currentQuestion].text}
            </p>
            <p className="text-lg text-gray-600">
              {sentences[currentQuestion].english}
            </p>
          </div>
        )}

        <button
          className="text-2xl bg-none border-none cursor-pointer transform hover:scale-110 mt-4"
          onClick={() => speakSentence(sentences[currentQuestion].text)}
        >
          🔊
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {sentences[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={showNextButton}
            className={`px-6 py-3 text-lg rounded-md transition-all 
              ${
                selectedAnswer === option && option === sentences[currentQuestion].missing
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }
            `}
          >
            {option}
          </button>
        ))}
      </div>

      {showNextButton && (
        <button
          onClick={handleNext}
          className="px-6 py-3 text-lg rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-all"
        >
          {currentQuestion < sentences.length - 1 ? "अगला सवाल" : "समाप्त"}
        </button>
      )}
    </div>
  );
};

export default FillInTheBlanks;
