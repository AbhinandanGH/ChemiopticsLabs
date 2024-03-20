// ClientForm.js
import jsPDF from 'jspdf';
import React, { useState } from 'react';
import './ClientForm.css';
import { useNavigate } from 'react-router-dom';


const ClientForm = ({ onSubmit }) => {
  const [setRedirect] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    numberofsamples: 1,
    samples: Array(1).fill({ sampleId: '', labCode: '' }),
    email: '',
    phone: '',
    address: {
      line1: '',
      line2: '',
      pincode: '',
      landmark: ''
    },
    sample: '',
    sampleDate: '',
    sampleTime: '',
    collectorName: '',
    collectedDate: '',
    collectedTime: '',
    examination: {
      suitable: false,
      damage: false,
      satisfactory: false,
      labeling: false,
      quantity: false,
      preserved: false,
      containerSuitable: false,
      containerDamage: false,
      dateAndTimeSatisfactory: false,
      properLabeling: false,
      quantitySuitable: false,
      samplePreserved: false,
    },
    Decision: '',
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setFormData({ ...formData, [name]: value });

  };

  const handleChange = (e, index, field) => {
    const { name, value, type, checked } = e.target;

    if (name === 'numberofsamples') {
      const numberOfSamples = parseInt(value);
      const newSamples = Array.from({ length: numberOfSamples }, () => ({
        sampleId: '',
        labCode: '',
      }));
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        samples: newSamples,
      }));
    } else if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        examination: {
          ...prevData.examination,
          [value]: checked,
        },
      }));
    } else if (index !== undefined && field) {
      setFormData((prevData) => ({
        ...prevData,
        samples: prevData.samples.map((sample, i) =>
          i === index ? { ...sample, [field]: value } : sample
        ),
      }));
    }
    else if (name.startsWith('line') || name === 'pincode' || name === 'landmark') {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name]: value,
        },
      }));
    }
    else if (name === 'Decision') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getCurrentDate = () => formatDate(new Date().toISOString());
  const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pdf = new jsPDF();
      const docWidth = pdf.internal.pageSize.getWidth();
      const index = 0;

      // Company Name
      const companyName = "CHEMIOPTICS HEALTHCARE PVT LTD";
      const companyNameWidth = pdf.getStringUnitWidth(companyName) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
      const companyNameX = (docWidth - companyNameWidth) / 2;

      const testing = "(Testing Division)";
      const testingWidth = pdf.getStringUnitWidth(testing) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
      const testingNameX = (docWidth - testingWidth) / 2;


      let yOffset = 10;
      // // Print Address
      // pdf.setFont("times", "roman");
      // pdf.setFontSize(12);
      // pdf.text(address, addressX, yOffset);





      // Print Company Name
      pdf.setFont("times", "bold");
      pdf.setFontSize(18);
      pdf.text(companyName, companyNameX, yOffset);

      // Adjust yOffset
      yOffset += 15;

      // Print testing
      pdf.setFont("times", "bold");
      pdf.setFontSize(18);
      pdf.text(testing, testingNameX, yOffset);

      // Adjust yOffset
      yOffset += 10;

      // Print Address
      //     pdf.setFont("times", "roman");
      // pdf.setFontSize(12);
      // pdf.text(address, addressX, yOffset);

      // Adjust yOffset
      yOffset += 15;

      // Print Client Information Form and Date
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);

      pdf.text("Client Information", 10, yOffset);
      pdf.setFontSize(12);

      pdf.text(`Date:`, 10, yOffset + 10);
      pdf.setFont("helvetica", "normal");
      pdf.text(`${formData.collectedDate}`, 100, yOffset + 10);

      // Print Time
      pdf.setFont("times", "bold");
      pdf.setFontSize(12);
      pdf.text(`Time:`, 10, yOffset + 20);
      pdf.setFont("helvetica", "normal");
      pdf.text(`${formData.collectedTime}`, 100, yOffset + 20);

      pdf.setFontSize(12);
      // Print other details
      pdf.setFont("helvetica", "bold");
      pdf.text("Name:", 10, yOffset + 30);
      pdf.setFont("helvetica", "normal");
      pdf.text(`${formData.name}`, 100, yOffset + 30);
      yOffset += 40;

      pdf.setFont("helvetica", "bold");
      pdf.text("Phone:", 10, yOffset);
      pdf.setFont("helvetica", "normal");
      pdf.text(`${formData.phone}`, 100, yOffset);
      yOffset += 10;

      pdf.setFont("helvetica", "bold");
      pdf.text("Address Line1:", 10, yOffset);
      pdf.setFont("helvetica", "normal");
      pdf.text(`${formData.address.line1}`, 100, yOffset);
      yOffset += 10;

      pdf.setFont("helvetica", "bold");
      pdf.text("Address Line2:", 10, yOffset);
      pdf.setFont("helvetica", "normal");
      pdf.text(`${formData.address.line2}`, 100, yOffset);
      yOffset += 10;



      pdf.setFont("helvetica", "bold");
      pdf.text("Pincode:", 10, yOffset);
      pdf.setFont("helvetica", "normal");
      pdf.text(`${formData.address.pincode}`, 100, yOffset);
      yOffset += 10;


      pdf.setFont("helvetica", "bold");
      pdf.text("Description of the sample:", 10, yOffset);
      pdf.setFont("helvetica", "normal");
      pdf.text(`${formData.sample}`, 100, yOffset);
      yOffset += 10;

      pdf.setFont("helvetica", "bold");
      pdf.text("Sample Collection Date:", 10, yOffset);
      pdf.setFont("helvetica", "normal");
      pdf.text(`${formData.sampleDate}`, 100, yOffset);
      yOffset += 10;

      pdf.setFont("helvetica", "bold");
      pdf.text("Time at which sample collected:", 10, yOffset);
      pdf.setFont("helvetica", "normal");
      pdf.text(`${formData.sampleTime}`, 100, yOffset);
      yOffset += 10;

      pdf.setFont("helvetica", "bold");
      pdf.text("Sample Received and Inspected by:", 10, yOffset);
      pdf.setFont("helvetica", "normal");
      pdf.text(`${formData.collectorName}`, 100, yOffset);
      yOffset += 10;

      pdf.setFont("helvetica", "bold");
      pdf.text("Decision Rule/Statement of Conformity:", 10, yOffset);
      pdf.setFont("helvetica", "normal");
      pdf.text(`${formData.Decision}`, 100, yOffset);
      yOffset += 10;


      // Print Examination of the sample
      // pdf.text("Examination of the sample:", 10, yOffset);
      // yOffset += 10;
      // Object.entries(formData.examination).forEach(([key, value], index) => {
      //   if (value) {
      //     const label = document.querySelector(`label[for=${key}]`).textContent;
      //     pdf.text(`- ${label}`, 20, yOffset + index * 10);
      //   }
      // });
      yOffset += Object.keys(formData.examination).length * 3 + 3;

      // Print Signatures

      pdf.text("Collector's Signature:", 10, yOffset + 30);
      pdf.text("__________________________", 10, yOffset + 40);

      // Save PDF
      const fileName = `Client_Ack_${formData.name}.pdf`;
      pdf.save(fileName);

      // Send form data to the server
      const response = await fetch('http://localhost:3000/api/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if the server successfully stored the data
      if (response.ok) {
        console.log('Form data stored successfully!');

        // Redirect to the desired URL after successful form submission
        //  window.location.href = 'http://localhost:3001/ticksheet'; // Replace with your desired URL
      } else {
        console.error('Error storing form data:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending form data to server:', error);
    }



    // onSubmit();
    // navigate('/ticksheet')

    localStorage.setItem('samplesData', JSON.stringify(formData.samples));
    localStorage.setItem('formData', JSON.stringify(formData));
    // Redirect to SamplePage component after successful form submission
    navigate('/samplePage');
    // navigate('/samplePage', { state: { clientInfo: formData } });
     navigate('/samplePage', { state: { name: formData.name } });
  };

  // if (redirect) {
  //   return <SamplePage samples={formData.samples} />;
  // }

  return (
    <div className="client-form-container">
      <form id="clientForm" onSubmit={handleSubmit}>
        <h1>CHEMIOPTICS HEALTHCARE PVT LTD</h1>
        <h2>(Testing Division)</h2>
        <h2>Client Information Form</h2>

        <div className="input-group">
          <label htmlFor="name">Sample Identifier (Mr./Mrs./Ms.):</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="addressLine1">Address Line 1:</label>
          <input
            type="text"
            id="addressLine1"
            name="line1"
            value={formData.addressline1}
            onChange={handleChange}
            required />
        </div>
        <div className="input-group">
          <label htmlFor="addressLine2">Address Line 2:</label>
          <input type="text" id="addressLine2" name="line2" value={formData.addressline2} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="landmark">Landmark:</label>
          <input type="text" id="landmark" name="landmark" value={formData.landmark} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="pincode">Pincode:</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            placeholder='E.g. 580031'
            pattern='^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$'
            value={formData.pincode}
            onChange={handleChange}
            required />
        </div>

        <div className="input-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Format: 1234567890"
            value={formData.phone}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='E.g. abc.xyz@email.com'
            value={formData.email}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="numberofsamples">Number of Samples:</label>
          <select
            id="numberofsamples"
            name="numberofsamples"
            value={formData.numberofsamples}
            onChange={handleChange}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {formData.samples.map((sample, index) => (
          <div key={index}>
            <div className="input-group">
              <label htmlFor={`sampleId${index + 1}`}>Sample ID {index + 1}:</label>
              <select
                id={`sampleId${index + 1}`}
                name={`sampleId${index + 1}`}
                value={sample.sampleId}
                onChange={(e) => handleChange(e, index, 'sampleId')}
                required
              >
                <option value="">Select Sample ID</option>
                {/* <option value="wastewater">Waste water</option> */}
                <optgroup label="Drinking Water">
                  <option value="DrinkingWaterPremium">Drinking-Premium</option>
                  <option value="DrinkingWaterComplete">Drinking-Complete</option>
                </optgroup>
                <optgroup label="Waste Water">
                  <option value="WasteWaterPremium">Waste-Premium</option>
                  <option value="WasteWaterComplete">Waste-Complete</option>
                </optgroup>
                <optgroup label="Ground Water">
                  <option value="GroundWaterPremium">Ground-Premium</option>
                  <option value="GroundWaterComplete">Ground-Complete</option>
                </optgroup>
                <option value="SurfaceWater">Surface Water</option>
                <option value="IrrigationWater">Irrigation Water</option>
                <option value="ConstructionWater">Construction Water</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor={`labCode${index + 1}`}>Lab Code {index + 1}:</label>
              <input
                type="text"
                pattern='chpl[0-9]{1,9}|CHPL[0-9]{1,9}'
                placeholder='E.g. CHPL000'
                id={`labCode${index + 1}`}
                name={`labCode${index + 1}`}
                value={sample.labCode}
                onChange={(e) => handleChange(e, index, 'labCode')}
                required
              />
            </div>
          </div>
        ))}

        <div className="input-group">
          <label htmlFor="sample">Description of the sample:</label>
          <select
            id="sample"
            name="sample"
            value={formData.sample}
            onChange={(e) => handleChange(e)}
            required
          >
            <option value="">Select Description</option>
            <option value="Container - Polypropene, Quantity - 1-2 liters">
              Container - Polypropene, Quantity - 1-2 liters
            </option>
            <option value="Container - Polypropene, Quantity - 2 liters">
              Container - Polypropene, Quantity - 2 liters
            </option>
            <option value="Container - Glass, Quantity - 1-2 liters">
              Container - Glass, Quantity - 1-2 liters
            </option>
            <option value="Container - Glass, Quantity - 2 liters">
              Container - Glass, Quantity - 2 liters
            </option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="sampleDate">Sample Collection Date:</label>
          <input
            type="date"
            id="sampleDate"
            name="sampleDate"
            value={formData.sampleDate}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="sampleTime">Time at which sample collected:</label>
          <input
            type="time"
            id="sampleTime"
            name="sampleTime"
            value={formData.sampleTime}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div className="input-group">
          <label>Examination of the sample:</label>
          <div className="checkbox-group">
            <div>
              <input
                type="checkbox"
                id="suitable"
                name="examination"
                value="suitable"
                checked={formData.examination.suitable}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="suitable">Does the container suit for parameters to be analyzed</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="satisfactory"
                name="examination"
                value="satisfactory"
                checked={formData.examination.satisfactory}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="satisfactory">Is the date and time of the sample collection satisfactory for parameters to be analyzed</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="labeling"
                name="examination"
                value="labeling"
                checked={formData.examination.labeling}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="labeling">Is proper labeling/stickers maintained</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="quantity"
                name="examination"
                value="quantity"
                checked={formData.examination.quantity}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="quantity">Does the quantity/volume of the sample suit for the analysis of the desired parameters</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="preserved"
                name="examination"
                value="preserved"
                checked={formData.examination.preserved}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="preserved">Is the sample preserved as per the requirements</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="damage"
                name="examination"
                value="damage"
                checked={formData.examination.damage}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="damage">Any damage/leakage of the container has been observed</label>
            </div>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="collectorName">Sample inspected and received by:</label>
          <input
            type="text"
            id="collectorName"
            name="collectorName"
            value={formData.collectorName}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div className="input-group">
          <fieldset>
            <legend><b>Decision Rule/Statement Of Conformity:</b></legend>
            <div className='Radio'>
              {/* Required Radio Button */}
              <label htmlFor="Required">
                <input
                  type="radio"
                  id="Required"
                  name="Decision"
                  value="Required"
                  checked={formData.Decision === 'Required'}
                  onChange={(e) => handleChange(e)}
                  required
                />
                Required
              </label>

              {/* Not Required Radio Button */}
              <label htmlFor="notRequired">
                <input
                  type="radio"
                  id="notRequired"
                  name="Decision"
                  value="Not Required"
                  checked={formData.Decision === 'Not Required'}
                  onChange={(e) => handleChange(e)}
                />
                Not Required
              </label>
            </div>
          </fieldset>
        </div>

        <div className="input-group">
          <input type="hidden" name="currentDate" value={formData.collectedDate = getCurrentDate()} />
          <input type="hidden" name="currentTime" value={formData.collectedTime = getCurrentTime()} />
          <input type="submit" value="Submit" />
        </div>

      </form>
    </div>
  );
};

export default ClientForm;
