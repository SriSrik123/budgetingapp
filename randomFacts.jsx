import React, { useState} from 'react';

const FunFact = () => {
  const funFacts = [
    "People who budget save an average of 20% more each year than those who don't.",
    "Using cash instead of a card can help reduce impulse spending by up to 30%.",
    "50% of Americans don't have a budget — but those who do feel more in control of their finances.",
    "Budgeting just 10 minutes a week can lead to major improvements in savings and debt reduction.",
    "Creating a grocery budget can reduce monthly food expenses by up to 25%.",
    "The 50/30/20 rule is a popular budgeting method: 50% needs, 30% wants, 20% savings."
  ];

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    return funFacts[randomIndex];
  };

  const [currentFact, setCurrentFact] = useState(getRandomFact());

  const handleNewFact = () => {
    setCurrentFact(getRandomFact());
  };

  return (
    <div className="flex flex-col items-center text-center p-4 bg-green-100 rounded-lg shadow-md max-w-md mx-auto relative">
      <h2 className="text-xl font-bold mb-2">💡 Budgeting Fun Fact</h2>
      <div className="mb-4 h-[100px] flex justify-center items-center text-center">
        <p className="px-2">{currentFact}</p>
      </div>
      <button
        onClick={handleNewFact}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        🔁 New Fact
      </button>
    </div>
  );
};

export default FunFact;
