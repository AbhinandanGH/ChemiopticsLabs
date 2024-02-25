import jsPDF from 'jspdf';
import React, { useState } from 'react';
import './ClientForm.css';

const ClientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    numberofsamples: 1,
    samples: Array(1).fill({ sampleId: '', labCode: '' }),
    email: '',
    phone: '',
    address: '',
    sample: '',
    sampleDate: '',
    sampleTime: '',
    collectorName: '',
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
  });

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
    } else {
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

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const pdf = new jsPDF();
    const docWidth = pdf.internal.pageSize.getWidth();
    const companyName = "CHEMIOPTICS HEALTHCARE PVT LTD (Testing Division)";
    const textWidth = pdf.getStringUnitWidth(companyName) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
  
    const xCoordinate = (docWidth - textWidth) / 2;
    let yOffset = 10;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text(companyName, xCoordinate, yOffset);
    yOffset += 15;  // Increase spacing after the company name
    pdf.setFont("helvetica", "normal");
    pdf.text("Client Information Form", 10, yOffset);
    yOffset += 10;
  
    pdf.setFontSize(12);
    pdf.text(`Date: ${getCurrentDate()}`, 10, yOffset + 5);  // Adjusted yOffset
    pdf.text(`Name: ${formData.name}`, 10, yOffset + 15);  // Adjusted yOffset
    yOffset += 10;
    pdf.text(`Number of Samples: ${formData.numberofsamples}`, 10, yOffset);
    yOffset += 10;
    pdf.setFont("helvetica", "bold");
    formData.samples.forEach((sample, index) => {
      yOffset += 10;
      pdf.text(`Sample ${index + 1}:`, 10, yOffset);
      yOffset += 10;
      pdf.text(`Sample ID: ${sample.sampleId}`, 20, yOffset);
      yOffset += 10;
      pdf.text(`Lab Code: ${sample.labCode}`, 20, yOffset);
    });
    pdf.setFont("helvetica", "normal");
    yOffset += 10;
    pdf.text(`Email: ${formData.email}`, 10, yOffset);
    yOffset += 10;
    pdf.text(`Phone: ${formData.phone}`, 10, yOffset);
    yOffset += 10;
    pdf.text(`Address: ${formData.address}`, 10, yOffset);
    yOffset += 10;
    pdf.text(`Description of the sample: ${formData.sample}`, 10, yOffset);
    yOffset += 10;
    pdf.text(`Sample Collection Date: ${formData.sampleDate}`, 10, yOffset);
    yOffset += 10;
    pdf.text(`Time at which sample collected: ${formData.sampleTime}`, 10, yOffset);
    yOffset += 10;
    pdf.text(`Collector's Name: ${formData.collectorName}`, 10, yOffset);
    yOffset += 10;
  
    pdf.text("Examination of the sample:", 10, yOffset);
    yOffset += 10;
    Object.entries(formData.examination).forEach(([key, value], index) => {
      if (value) {
        const label = document.querySelector(`label[for=${key}]`).textContent;
        pdf.text(`- ${label}`, 20, yOffset + index * 10);
      }
    });
    yOffset += Object.keys(formData.examination).length * 10 + 10;
  
    pdf.text("Client's Signature:", 10, yOffset);
    pdf.text("__________________________", 10, yOffset + 10);
  
    pdf.text("Collector's Signature:", 10, yOffset + 30);
    pdf.text("__________________________", 10, yOffset + 40);
  
    pdf.save('client_information.pdf');
  };
  
  return (
    <div className="container">
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
                 <option value="wastewater">Waste water</option>
                 <option value="drinkingwater">Drinking water</option>
                 <option value="irrigationwater">Irrigation water</option>
                 <option value="groundwater">Ground water</option>
                 <option value="surfacewater">Surface water</option>
                 <option value="constructionwater">Construction water</option>
             </select>
            </div>
            <div className="input-group">
              <label htmlFor={`labCode${index + 1}`}>Lab Code {index + 1}:</label>
              <input
                type="text"
                pattern='chpl[0-9]{1,9}|CHPL[0-9]{1,9}'
                placeholder='eg: CHPL000'
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
            required
          />
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
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            rows="4"
            value={formData.address}
            onChange={(e) => handleChange(e)}
            required
          ></textarea>
        </div>

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
          <label htmlFor="collectorName">Collector's Name:</label>
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
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default ClientForm;
