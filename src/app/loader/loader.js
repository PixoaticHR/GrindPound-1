import React from 'react';
import './style.css'; 

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader"> </div>{' '} Processing...
    </div>
  );
};

export default Loader;
