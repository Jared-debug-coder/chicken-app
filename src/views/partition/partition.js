import React, { useState } from 'react';


const Partition = ({ partition, partitionIndex }) => {
  const [eggsCollected, setEggsCollected] = useState(partition.eggsCollected);
  const [comment, setComment] = useState(partition.comments);
  const [error, setError] = useState(''); // State for error message

  const handleEggsChange = (e) => {
    const value = e.target.value;

    // Validate that the value is between 0 and 4
    if (value === "" || value >= 0 || value <= 4) {
      setEggsCollected(value);
      setError(''); // Clear error message if the value is valid
    } else {
      setError('Error: Eggs collected cannot be more than 4.');
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div class="partition">
      <h4>Partition {partitionIndex}</h4>
      <p>Chickens: {partition.chickens}</p>
      <div>
        <label>Eggs Collected:</label>
        <input
          type="number"
          value={eggsCollected}
          onChange={handleEggsChange}
          min="0"
          max="4"
          step="1" // Ensure input is integer
        />
      </div>
      {/* Display error message if there is an error */}
      {error && <p class="error-message">{error}</p>}
      <div>
        <textarea
          placeholder="Add comment"
          value={comment}
          onChange={handleCommentChange}
        />
      </div>
    </div>
  );
};

export default Partition;

