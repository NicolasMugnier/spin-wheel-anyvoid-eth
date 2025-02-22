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
    setLabels(labels.filter((_, i: number): boolean => i !== index));
  };

  const spinWheel = (): void => {
    setSelectedLabel(null);
    setShowConfetti(false);
    if (labels.length === 0 || spinning) return;
    setSpinning(true);
    const selectedIndex = Math.floor(Math.random() * labels.length);
    setPrizeNumber(selectedIndex);
  };

  const emojis: string[] = ["🎉", "🎊", "🏆", "🥳", "👏", "🔥"];

  return (
    <div className="container">
      {showConfetti && 
          <Confetti 
            gravity={0.1}
            wind={0}
          />
      }
      <h1>Spin the Wheel</h1>
      {selectedLabel && <h2>Winner: {selectedLabel} {emojis[Math.floor(Math.random() * emojis.length)]}</h2>}
      <button onClick={spinWheel} disabled={labels.length === 0 || spinning}>
        Spin Wheel
      </button><br/>
      <input 
        type="text" 
        value={newLabel} 
        onChange={(e) => setNewLabel(e.target.value)} 
        placeholder="Enter name"
        disabled={spinning}
      />
      <button onClick={addLabel} disabled={spinning}>Add Participant</button>
        {labels.length > 0 ? (
          <div className="wheel-container">
          <Wheel 
            mustStartSpinning={spinning}
            prizeNumber={prizeNumber}
            data={labels}
            onStopSpinning={() => {
              setSpinning(false);
              setSelectedLabel(labels[prizeNumber].option);
              setShowConfetti(true);
              setTimeout(() => {setShowConfetti(false);}, 5000);
            }}
            backgroundColors={["#f9c74f", "#f94144", "#43aa8b", "#577590"]}
            textColors={["#fff"]}
            spinDuration={1.0}
            innerRadius={0}
            outerBorderWidth={2}
            radiusLineWidth={2}
          />
          </div>
        ) : (
          <p>No participants available</p>
        )}
      <ul>
        {labels.map((label, index) => (
          <li key={index} style={{ backgroundColor: label.style.backgroundColor }}>
            {label.option}
            <button disabled={spinning} onClick={() => removeLabel(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
