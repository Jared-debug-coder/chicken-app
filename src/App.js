import React, { useState, useEffect } from 'react';
import Cage from './views/cages/Cage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './index.css';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [numCages, setNumCages] = useState('');
  const [error, setError] = useState('');
  const [isCagesAdded, setIsCagesAdded] = useState(false);
  const [date, setDate] = useState('');
  const [cages, setCages] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    setDate(formattedDate);
  }, []);

  const handleNumCagesChange = (e) => {
    setNumCages(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const addCages = () => {
    const numberOfCages = parseInt(numCages, 10);

    if (isNaN(numberOfCages) || numberOfCages <= 0) {
      setError('Please enter a valid number greater than 0');
      return;
    }

    setError('');
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

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleSignUp = () => {
    setIsSigningUp(true);
  };

  const handleSignUpSuccess = () => {
    setIsSigningUp(false);
  };

  const viewRecordedData = () => {
    alert('Viewing recorded data...');
  };

  if (isSigningUp) {
    return <SignUp onSignUpSuccess={handleSignUpSuccess} />;
  }

  if (!isSignedIn) {
    return <SignIn onSignIn={handleSignIn} onSignUp={handleSignUp} />;
  }

  return (
    <div className="eggventory-app">
      <h1 className="companyname">EggVentory</h1>
      <div className="date-section">
        <label>Date: </label>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          className="input-date"
        />
      </div>
      <div className="input-section">
        {!isCagesAdded && (
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
        {error && <p className="error-message">{error}</p>}
        <div className="view-data-section">
          <button onClick={viewRecordedData} className="btn-view-data">View Recorded Data</button>
        </div>
      </div>
      {isCagesAdded && cages.map((cage) => <Cage key={cage.id} cage={cage} />)}
    </div>
  );
};

export default App;
