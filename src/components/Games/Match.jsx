import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import grapesImage from "../../assets/grapes.png";
import bananaImage from "../../assets/banana.png";
import mangoImage from "../../assets/mango.png";
import watermelonImage from "../../assets/watermelon.png";
import orangeImage from "../../assets/orange.png";

const preMatchedData = [
  { fruit: <img src={grapesImage} alt="Grapes" className="w-full h-full object-contain" />, fruitHindi: "अंगूर" },
  { fruit: <img src={bananaImage} alt="Banana" className="w-full h-full object-contain" />, fruitHindi: "केला" },
  { fruit: <img src={mangoImage} alt="Mango" className="w-full h-full object-contain" />, fruitHindi: "आम" },
  { fruit: <img src={watermelonImage} alt="Watermelon" className="w-full h-full object-contain" />, fruitHindi: "तरबूज" },
  { fruit: <img src={orangeImage} alt="Orange" className="w-full h-full object-contain" />, fruitHindi: "संतरा" },
];

const shuffledArray = (matchingData) => {
  return matchingData.slice().sort(() => Math.random() - 0.5);
};

export default function Game() {
  const [shuffledMatchedData, setShuffledMatchedData] = useState([]);
  const [pairedData, setPairedData] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    setShuffledMatchedData(shuffledArray(preMatchedData));
  }, []);

  const handleCapitalClick = (match) => {
    if (selectedMatch && match.fruitHindi === selectedMatch.fruitHindi) {
      const newPairedMatch = [...pairedData, { fruit: selectedMatch.fruit, fruitHindi: match.fruitHindi }];
      setPairedData(newPairedMatch);
    }
    setSelectedMatch(null);
  };

  const isMatched = (match) => {
    return pairedData.some((pairedMatch) => pairedMatch.fruitHindi === match.fruitHindi);
  };

  const win = pairedData.length === preMatchedData.length;

  return (
    <div className="flex flex-col items-center justify-center h-screen p-5 bg-yellow-300">
      <Link to="/" className="mb-6">
        <button className="px-4 py-2 text-lg font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all">
          Back to Lessons
        </button>
      </Link>

      <div className="w-full max-w-4xl flex flex-col items-center">
        {win && (
          <div className="p-4 mb-6 text-xl font-bold text-green-600 bg-green-100 border border-green-300 rounded-md">
            <h2>You Win!</h2>
          </div>
        )}

        <div className="flex justify-between w-full gap-8">
          <div className="flex flex-col items-center gap-4 w-1/2">
            {preMatchedData.map((match, index) => (
              <button
                key={index}
                onClick={() => setSelectedMatch(match)}
                className={`p-4 border rounded-md shadow-md bg-white transition-all 
                  ${isMatched(match) ? "bg-green-200 cursor-not-allowed" : "hover:bg-gray-200"} 
                  ${selectedMatch === match ? "border-blue-500" : ""}`}
                disabled={isMatched(match)}
              >
                {match.fruit}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 w-1/2">
            {shuffledMatchedData.map((match, index) => (
              <button
                key={index}
                onClick={() => handleCapitalClick(match)}
                className={`p-4 border rounded-md shadow-md bg-white transition-all 
                  ${isMatched(match) ? "bg-green-200 cursor-not-allowed" : "hover:bg-gray-200"} 
                  ${selectedMatch === null ? "cursor-not-allowed opacity-50" : ""}`}
                disabled={isMatched(match) || selectedMatch === null}
              >
                {match.fruitHindi}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
