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
    <div class="samplePage" >
      <h1>CHEMIOPTICS LABS</h1>
      <div class ="sample-page-title"><p>Samples</p></div>
     
      <ul>
        {samples.map((sample, index) => (
          <li key={index}>
            Sample ID {index + 1}:{' '}
            <Link to={`/ticksheet/`}>{sample.sampleId}</Link>
            <br />
            Lab Code:{' '}
            <Link to={`/ticksheet/`}>{sample.labCode}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SamplePage;
