import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ticksheet.css';
import { Link } from 'react-router-dom';

const Ticksheet = () => {
  const [samples, setSamples] = useState([]);
  const [selectedParameters, setSelectedParameters] = useState([]);
  const [manuallySelectedParameters, setManuallySelectedParameters] = useState([]); // New state
  const navigate = useNavigate();
  const location = useLocation();
  const sample = location.state;

  useEffect(() => {
    const storedSamples = JSON.parse(localStorage.getItem('samplesData')) || [];
    setSamples(storedSamples);

    

    const sampleId = localStorage.getItem('selectedSampleId');
    const labCode = localStorage.getItem('selectedLabCode');

    if (sampleId) {
      selectWaterBasedOnSampleId(sampleId);
    }

    const storedManuallySelectedParameters = JSON.parse(localStorage.getItem('manuallySelectedParameters')) || [];
    setManuallySelectedParameters(storedManuallySelectedParameters);
  }, []);

 
   useEffect(() => {
    const storedSelectedParameters = JSON.parse(localStorage.getItem('selectedParameters')) || [];
    setSelectedParameters(storedSelectedParameters);
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedParameters', JSON.stringify(selectedParameters));
  }, [selectedParameters]);

  const handleCheckboxChange = (parameter) => {
    setSelectedParameters((prevSelected) => {
      if (prevSelected.includes(parameter)) {
        return prevSelected.filter((selected) => selected !== parameter);
      } else {
        return [...prevSelected, parameter];
      }
    });
  };


  const selectWaterBasedOnSampleId = (sampleId) => {
    // Implement logic to automatically select parameters based on sampleId
    switch (sampleId) {
      case 'WasteWaterPremium':
        selectWastePremium();
        break;
      case 'WasteWaterComplete':
        selectWasteComplete();
        break;
      case 'ConstructionWater':
        selectConstruction();
        break;
      case 'DrinkingWaterPremium':
        selectDrinkingPremium ();
        break;
      case 'DrinkingWaterComplete':
        selectDrinkingComplete();
        break;
      case 'GroundWaterPremium':
        selectGroundWaterPremium();
        break;
      case 'GroundWaterComplete':
        selectGroundWaterComplete();
        break;
      case 'IrrigationWater':
        selectIrrigation();
        break;
      case 'SurfaceWater':
        selectSurface();
        break;
      default:
        break;
    }
  };


  // Function to select checkboxes for Waste parameters
  const selectWastePremium = () => {
    const wasteParameters = [3,7,8,10,11,18,19,20,21,22,24,26,28];
    wasteParameters.forEach((rowNumber) => selectCheckbox(rowNumber));
  };

  const selectWasteComplete = () => {
    const wasteParameters = [1, 3, 5, 7, 8, 9, 10, 11, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28];
    wasteParameters.forEach((rowNumber) => selectCheckbox(rowNumber));
  };


  const selectConstruction = () => {
    const constructionParameters = [8, 20, 26, 29, 30];
    constructionParameters.forEach((rowNumber) => selectCheckbox(rowNumber));
  };

  const selectDrinkingPremium = () => {
    const drinkingParameters = [5,10,11,13,14,15,16,17,18,20,21,22,23,24,25,28];
    drinkingParameters.forEach((rowNumber) => selectCheckbox(rowNumber));
  };
  const selectDrinkingComplete = () => {
    const drinkingParameters = [1, 2, 4, 5, 6, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 27, 25, 28, 22];
    drinkingParameters.forEach((rowNumber) => selectCheckbox(rowNumber));
  };


  const selectGroundWaterPremium= () => {
    const groundWasteParameters = [4,5,8,10,11,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28];
    groundWasteParameters.forEach((rowNumber) => selectCheckbox(rowNumber));
  };

  const selectGroundWaterComplete= () => {
    const groundWasteParameters = [1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 27, 24, 28, 22, 25, 26, 28];
    groundWasteParameters.forEach((rowNumber) => selectCheckbox(rowNumber));
  };

  const selectIrrigation = () => {
    const irrigationGroundWasteParameters = [1, 4, 5, 8, 10, 11, 13, 15, 20, 21, 23, 25, 26, 28];
    irrigationGroundWasteParameters.forEach((rowNumber) => selectCheckbox(rowNumber));
  };

  const selectSurface = () => {
    const surfaceGroundWasteParameters = [2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 1, 27, 25, 24];
    surfaceGroundWasteParameters.forEach((rowNumber) => selectCheckbox(rowNumber));
  };

  // Function to select a checkbox for a given row number
  const selectCheckbox = (rowNumber) => {
    // Get the checkbox element for the specified row number
    const checkbox = document.querySelector(`tbody tr:nth-child(${rowNumber}) input[type="checkbox"]`);

    // Check the checkbox if not already checked
    if (checkbox && !checkbox.checked) {
      checkbox.checked = true; // Set the checked property to true
      handleCheckboxChange(`Parameter ${rowNumber}`); // Call handleCheckboxChange with a parameter (you can replace it with the actual parameter name)
      //console.log(`Row ${rowNumber} is selected.`); // Log a message to the console
    }
  };

 
  const navigateToSamplePage = () => {
    navigate('/samplePage', { state: { name: sample && sample.name } });
  };

  return (  // JSX structure representing the component's UI
    <div className="ticksheet">
      <h2>Physico-Chemical Parameters to be analyzed</h2>
      {/* 
      <div>
      <h2>Samples</h2>
      <ul>
        {samples.map((sample, index) => (
          <li key={index}>
            <p>Sample ID: {sample.sampleId}</p>
            <p>Lab Code: {sample.labCode}</p>
          </li>
        ))}
      </ul>
       </div> */}

{sample && (
        <div>
          <p>Sample ID: {sample.sampleId}</p>
          <p>Lab Code: {sample.labCode}</p>
        </div>
      )}
   
        
    



      {/* <div className="button-container">
        <button onClick={selectWaste}>Waste Water</button>
        <button onClick={selectConstruction}>Construction Water</button>
        <button onClick={selectDrinking}>Drinking Water</button>
        <button onClick={selectGround}>Ground Water</button>
        <button onClick={selectIrrigation}>Irrigation Water</button>
        <button onClick={selectSurface}>Irrigation Water</button>
      </div> */}


      <div className="navigation-container">
        <button onClick={navigateToSamplePage}>Back to Sample Page</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Sl.no</th>
            <th>Parameters</th>
            <th>Test Method</th>
            <th>Tick</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Acidity as CaCO3, mg/L</td>
            <td>APHA 24thth Edition 2310-B</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Acidity as CaCO3')} /></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Bicarbonates as HCO3, mg/L</td>
            <td>APHA 24thth Edition 2320-B</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Bicarbonates as HCO3')} /></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Biochemical Oxygen demand (BOD) for 3days @27°C, mg/L</td>
            <td>IS 3025:Part 44:2023</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Biochemical Oxygen demand (BOD) for 3days @27°C')} /></td>
          </tr>
          <tr>
            <td>4</td>
            <td>Boron as B, mg/L</td>
            <td>APHA 24th Edition 4500-B</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Boron as B')} /></td>
          </tr>
          <tr>
            <td>5</td>
            <td>Calcium as Ca, mg/l</td>
            <td>APHA 24th Edition 3500-Ca,B</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Calcium as Ca')} /></td>
          </tr>
          <tr>
            <td>6</td>
            <td>Carbonates as CO3, mg/L</td>
            <td>APHA 24th Edition 2320-B</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Carbonates as CO2')} /></td>
          </tr>
          <tr>
            <td>7</td>
            <td>Chemical Oxygen Demand (COD), mg/L</td>
            <td>APHA 24th Edition 5220-B</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Chemical Oxygen Demand (COD)')} /></td>
          </tr>
          <tr>
            <td>8</td>
            <td>Chloride as Cl, mg/L</td>
            <td>APHA 24th Edition 4500-Cl,B</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Chloride as Cl')} /></td>
          </tr>
          <tr>
            <td>9</td>
            <td>Chlorine Residual, mg/L</td>
            <td>APHA 24th Edition 4500-Cl-B</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Chlorine Residual')} /></td>
          </tr>
          <tr>
            <td>10</td>
            <td>Color, Hazen</td>
            <td>APHA 24th Edition 2120-B</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Color, Hazen')} /></td>
          </tr>
          <tr>
            <td>11</td>
            <td>Conductivity @25°C, µS/cm</td>
            <td>APHA 24th Edition 2510-B</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Conductivity @25°C')} /></td>
          </tr>
          <tr>
            <td>12</td>
            <td>Dissolved Oxygen, mg/L</td>
            <td>APHA 24th Edition 4500-O,B</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Dissolved Oxygen')} /></td>
          </tr>
          <tr>
            <td>13</td>
            <td>Fluoride as F, mg/L</td>
            <td>APHA 24th Edition 4500-F,D</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Fluoride as F')} /></td>
          </tr>
          <tr>
            <td>14</td>
            <td>Iron as Fe, mg/L</td>
            <td>APHA 24thth Edition 3500 Fe-B</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Iron as Fe')} /></td>
          </tr>
          <tr>
            <td>15</td>
            <td>Magnesium as Mg, mg/L</td>
            <td>APHA 24th Edition 3500-Mg,B</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Magnesium as Mg')} /></td>
          </tr>
          <tr>
            <td>16</td>
            <td>Nitrate as NO3, mg/L</td>
            <td>APHA 24th Edition 4500-NO3, в</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Nitrate as NO3')} /></td>
          </tr>
          <tr>
            <td>17</td>
            <td>Nitrite as NO2, mg/L</td>
            <td>APHA 24th Edition 4500 NO2 B</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Nitrite as NO2')} /></td>
          </tr>
          <tr>
            <td>18</td>
            <td>Odour</td>
            <td>IS 3025:part 5:2018</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Odour')} /></td>
          </tr>
          <tr>
            <td>19</td>
            <td>Oil & Grease, mg/L</td>
            <td>APHA 24th Edition 5520-B</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Oil & Grease')} /></td>
          </tr>
          <tr>
            <td>20</td>
            <td>pH @25°C</td>
            <td>APHA 24th Edition 4500-B</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('pH @25°C')} /></td>
          </tr>
          <tr>
            <td>21</td>
            <td>Sulfate as SO4, mg/L</td>
            <td>APHA 24thh Edition 4500,SO4,E</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Sulfate as SO4')} /></td>
          </tr>
          <tr>
            <td>22</td>
            <td>Temperature, °C</td>
            <td>APHA 24thh Edition 2550-B</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Temperature, °C')} /></td>
          </tr>
          <tr>
            <td>23</td>
            <td>Total Alkalinity, mg/L</td>
            <td>APHA 24th Edition 2320-B</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Total Alkalinity')} /></td>
          </tr>
          <tr>
            <td>24</td>
            <td>Total Dissolved Solids @180°C, mg/L</td>
            <td>APHA 24th Edition 2540 C</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Total Dissolved Solids @180°C')} /></td>
          </tr>
          <tr>
            <td>25</td>
            <td>Total Hardness, mg/L</td>
            <td>APHA 24thth Edition 2340-C</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Total Hardness')} /></td>
          </tr>
          <tr>
            <td>26</td>
            <td>Total Suspended Solids, mg/L</td>
            <td>APHA 24th Edition 2540 D</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Total Suspended Solids')} /></td>
          </tr>
          <tr>
            <td>27</td>
            <td>Total Solids, mg/L</td>
            <td>APHA 24th Edition 2540-B</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Total Solids')} /></td>
          </tr>
          <tr>
            <td>28</td>
            <td>Turbidity, NTU</td>
            <td>APHA 24th Edition 2130-B</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Turbidity')} /></td>
          </tr>
          <tr>
            <td>29</td>
            <td>Volume of 0.02 N H2SO4 required to neutralize 100 ml of sample with mixed indicator</td>
            <td>IS: 3025 (Part-23) 2023</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Volume of 0.02 N H2SO4')} /></td>
          </tr>
          <tr>
            <td>30</td>
            <td>Volume of 0.02 N NaOH required to neutralize 100 ml of sample with Phenolphthalein indicator</td>
            <td>IS: 3025 (Part-22) 1986</td>
            <td><input type="checkbox" onChange={() => handleCheckboxChange('Volume of 0.02 N NaOH')} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Ticksheet;  // Export the TickSheet component
