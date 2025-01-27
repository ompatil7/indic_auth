import React from "react";

const LevelCard = ({ level, onSelect }) => {
  return (
    <div 
      className="bg-gradient-to-tr from-[#9089fc] to-[#f1f2b5] rounded-lg p-4 h-80 w-80 shadow-lg cursor-pointer hover:scale-105 transform transition-all flex flex-col justify-center items-center "
      onClick={() => onSelect(level)}
    >
      <div className="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-2">
        Lesson {level.id}
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{level.name}</h3>
    </div>
  );
};

export default LevelCard;