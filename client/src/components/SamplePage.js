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

  const handleSampleClick = (sampleId) => {
    localStorage.setItem('selectedSampleId', sampleId);
  };

  return (
    <div className="samplePage">
      <h1>CHEMIOPTICS LABS</h1>
      <div className="sample-page-title">
        <p>Samples</p>
      </div>

      <ul>
        {samples.map((sample, index) => (
          <Link
            key={index}
            to={{
              pathname: `/ticksheet/${index}`,
              state: { sample }
            }}
          >
            <li onClick={() => handleSampleClick(sample.sampleId)}>
              Sample ID {index + 1}:{' '}
              {sample.sampleId}
              <br />
              Lab Code: {sample.labCode}
            </li>
            
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SamplePage;
