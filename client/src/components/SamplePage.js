import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './SamplePage.css'; // Import the CSS file

const SamplePage = () => {
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    // Retrieve samples data from localStorage
    const storedSamples = JSON.parse(localStorage.getItem('samplesData')) || [];
    setSamples(storedSamples);
  }, []);

  return (
    <div className="samplePage">
      <h1>CHEMIOPTICS LABS</h1>
      <div className="sample-page-title">
        <p>Samples</p>
      </div>
     
      <ul>
        {samples.map((sample, index) => (
          <li key={index}>
            Sample ID {index + 1}:{' '}
            <Link
              to={{
                pathname: `/ticksheet/${index}`, // Include the sample index in the URL
                state: { sample } // Pass the entire sample object as state
              }}
            >
              {sample.sampleId}
            </Link>
            <br />
            Lab Code: {sample.labCode}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SamplePage;
