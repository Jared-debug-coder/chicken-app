import React, { useState } from 'react';
import Cage from './views/cages/Cage';
// import './App.module.css';
// import styles from './App.module.css';

const App = () => {
  const [cages, setCages] = useState([]);
  const [numCages, setNumCages] = useState(''); // State to store number of cages to add
  const [error, setError] = useState(''); // State to store error message if invalid input
  const [isCagesAdded, setIsCagesAdded] = useState(false); // State to track if cages have been added

  // Function to handle number input change
  const handleNumCagesChange = (e) => {
    setNumCages(e.target.value);
  };

  // Function to add cages based on the input number
  const addCages = () => {
    const numberOfCages = parseInt(numCages, 10);

    // Validate input (check if it's a valid number and greater than 0)
    if (isNaN(numberOfCages) || numberOfCages <= 0) {
      setError('Please enter a valid number greater than 0');
      return;
    }

    setError(''); // Clear error if the input is valid

    // Create the specified number of cages
    const newCages = Array.from({ length: numberOfCages }, (_, cageIndex) => ({
      id: cages.length + cageIndex + 1,
      partitions: Array.from({ length: 32 }, () => ({
        chickens: 4,
        eggsCollected: 0,
        comments: '',
      })),
    }));

    setCages(newCages);
    setIsCagesAdded(true);
  };

  return (
    <div className="eggventory-app">
      <h1 className="companyname">EggVentory</h1>
      
      
      <div> 
        {!isCagesAdded && ( // Only show the input and button if cages have not been added
          <>
            <label>Enter number of cages: </label>
            <input
              type="number"
              value={numCages}
              onChange={handleNumCagesChange}
              min="1"
              placeholder="Number of cages"
              className="input-cage-number"
            />
            <button onClick={addCages} className="btn-add-cages">Add Cages</button>
          </>
        )}
        {error && <p className="error-message">{error}</p>} {/* Display error message if input is invalid */}
      </div>
      {isCagesAdded && cages.map((cage) => <Cage key={cage.id} cage={cage} />)}
    </div>
  );
};

export default App;
