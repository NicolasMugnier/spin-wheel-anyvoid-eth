import { JSX, useState } from 'react';
import { Wheel } from "react-custom-roulette";
import Confetti from "react-confetti";
import './App.css';

function App(): JSX.Element {
  const [labels, setLabels] = useState<{option: string, style: { backgroundColor: string }}[]>([]);
  const [newLabel, setNewLabel] = useState<string>("");
  const [selectedLabel, setSelectedLabel] = useState<string|null>(null);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [prizeNumber, setPrizeNumber] = useState<number>(0);

  const addLabel = (): void => {
    if (newLabel.trim() !== "") {
      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      setLabels([...labels, { option: newLabel, style: { backgroundColor: color } }]);
      setNewLabel("");
    }
  };

  const removeLabel = (index: number): void => {
    setLabels(labels.filter((_, i) => i !== index));
  };

  const spinWheel = (): void => {
    if (labels.length === 0 || spinning) return;
    setSpinning(true);
    const selectedIndex = Math.floor(Math.random() * labels.length);
    setPrizeNumber(selectedIndex);
  };

  return (
    <div className="container">
      {showConfetti && <Confetti 
                          gravity={0.1}
                          wind={0}
                        />
      }
      <h1>Spin the Wheel</h1>
      <input 
        type="text" 
        value={newLabel} 
        onChange={(e) => setNewLabel(e.target.value)} 
        placeholder="Enter name"
      />
      <button onClick={addLabel}>Add Participant</button>
      <button onClick={spinWheel} disabled={labels.length === 0 || spinning}>
        Spin Wheel
      </button>
      <div className="wheel-container">
        {labels.length > 0 ? (
          <Wheel 
            mustStartSpinning={spinning}
            prizeNumber={prizeNumber}
            data={labels}
            onStopSpinning={() => {
              setSpinning(false);
              setSelectedLabel(labels[prizeNumber].option);
              setLabels(labels.filter((_, i) => i !== prizeNumber));
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 5000);
            }}
            backgroundColors={["#f9c74f", "#f94144", "#43aa8b", "#577590"]}
            textColors={["#fff"]}
          />
        ) : (
          <p>No participants available</p>
        )}
      </div>
      {selectedLabel && <h2>Winner: {selectedLabel}</h2>}
      <ul>
        {labels.map((label, index) => (
          <li key={index} style={{ backgroundColor: label.style.backgroundColor }}>
            {label.option}
            <button onClick={() => removeLabel(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
