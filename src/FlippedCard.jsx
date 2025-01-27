import React, { useState, useEffect } from "react";

const initialCards = [
  { id: 1, value: "\u0915\u0941\u0924\u094d\u0924\u093e", match: "\ud83d\udc15", type: "text" },
  { id: 2, value: "\u092c\u093f\u0932\u094d\u0932\u0940", match: "\ud83d\udc08", type: "text" },
  { id: 3, value: "\u0939\u093e\u0925\u0940", match: "\ud83d\udc18", type: "text" },
  { id: 7, value: "\u0936\u0947\u0930", match: "\ud83e\udd81", type: "text" },
  { id: 9, value: "\u0917\u093e\u092f", match: "\ud83d\udc04", type: "text" },
  { id: 12, value: "\u0918\u094b\u095c\u093e", match: "\ud83d\udc0e", type: "text" },
  { id: 4, value: "\ud83d\udc15", match: "\u0915\u0941\u0924\u094d\u0924\u093e", type: "emoji" },
  { id: 5, value: "\ud83d\udc08", match: "\u092c\u093f\u0932\u094d\u0932\u0940", type: "emoji" },
  { id: 6, value: "\ud83d\udc18", match: "\u0939\u093e\u0925\u0940", type: "emoji" },
  { id: 8, value: "\ud83e\udd81", match: "\u0936\u0947\u0930", type: "emoji" },
  { id: 10, value: "\ud83d\udc04", match: "\u0917\u093e\u092f", type: "emoji" },
  { id: 11, value: "\ud83d\udc13", match: "\u092e\u0941\u0930\u094d\u0917\u093e", type: "emoji" },
];

function FlippedCard() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [wrongPair, setWrongPair] = useState([]);

  useEffect(() => {
    const shuffledCards = initialCards
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
  }, []);

  const handleFlip = (card) => {
    if (disabled) return;

    setFlippedCards((prev) => [...prev, card]);

    if (flippedCards.length === 1) {
      setDisabled(true);

      const firstCard = flippedCards[0];
      const secondCard = card;

      if (
        firstCard.value === secondCard.match ||
        firstCard.match === secondCard.value
      ) {
        setCards((prev) =>
          prev.map((c) =>
            c.value === firstCard.value || c.value === secondCard.value
              ? { ...c, matched: true }
              : c
          )
        );
        resetTurn();
      } else {
        setWrongPair([firstCard, secondCard]);
        setTimeout(() => {
          setWrongPair([]);
          resetTurn();
        }, 1000);
      }
    }
  };

  const resetTurn = () => {
    setFlippedCards([]);
    setDisabled(false);
  };

  const isCardWrong = (card) => {
    return wrongPair.includes(card);
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-5">
      <div className="grid grid-cols-4 gap-4 max-w-lg w-full">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`relative w-full aspect-[4/5] perspective cursor-pointer`}
            onClick={() =>
              !flippedCards.includes(card) && !card.matched && handleFlip(card)
            }
          >
            <div
              className={`absolute w-full h-full rounded-lg shadow-md flex justify-center items-center transition-transform duration-500 transform 
                ${flippedCards.includes(card) || card.matched ? "rotate-y-0 bg-white" : "rotate-y-180 bg-blue-500"}
                ${card.matched ? "border-4 border-green-500" : ""}
                ${isCardWrong(card) ? "border-4 border-red-500" : ""}`}
            >
              <span
                className={`${
                  flippedCards.includes(card) || card.matched
                    ? card.type === "emoji"
                      ? "text-5xl"
                      : "text-lg"
                    : "hidden"
                }`}
              >
                {card.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlippedCard;