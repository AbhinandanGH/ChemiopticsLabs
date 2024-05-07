import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import "./SamplePage.css";

const SamplePage = () => {
  // State variables
  const [name, setName] = useState('');
  const [samples, setSamples] = useState([]);
  const [recentSampleId, setRecentSampleId] = useState('');
  const [recentLabCode, setRecentLabCode] = useState('');
  const [recentSampleInfo, setRecentSampleInfo] = useState({});
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  // Fetching data from backend on component mount
  useEffect(() => {
    // Fetching user name
    axios.get('/api/getName')
      .then(response => {
        setName(response.data.name);
      })
      .catch(error => {
        console.error('Error fetching name:', error);
      });

    // Fetching recent sample IDs and lab codes
    axios.get('/api/getRecentSampleIdsAndLabCodes')
      .then(response => {
        setRecentSampleId(response.data.recentSampleId);
        setRecentLabCode(response.data.recentLabCode);
      })
      .catch(error => {
        console.error('Error fetching recent sample info:', error);
      });

    // Fetching recent sample info
    axios.get('/api/getRecentSampleInfo')
      .then(response => {
        setRecentSampleInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching recent sample info:', error);
      });
  }, []);

  // Function to generate bill
  const handleGenerateBill = () => {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [297, 210],
    });

    // PDF content
    const companyName = "CHEMIOPTICS LABS";
    const companyAddress =
      "R.H.KULKARNI COMPLEX, BVB COLLEGE CAMPUS\nVIDYANAGAR, HUBLI DHARWAD, KARNATAKA 580031";
    const billDate = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const customerName = "To, " + name;
    const cin = "CIN: UBSIDOTG2019PTC138544";
    const gstin = "GSTIN: 29AAICC4517DIZS";
    const customerNo = "CUSTOMER No: 1025";
    const invoiceNo = "TAX INVOICE NO: CHPL";

    // Adding text to PDF
    pdf.setFontSize(14);
    pdf.text(`DATE: ${billDate}`, 270, 10, { align: "right" });
    pdf.setFont("helvetica", "normal");
    pdf.text(customerName, 10, 30);
    const smallFontSize = 10;
    pdf.setFontSize(smallFontSize);
    pdf.text(cin, 250, 35, { align: "right" });
    pdf.text(gstin, 250, 40, { align: "right" });
    pdf.text(customerNo, 250, 45, { align: "right" });
    pdf.text(invoiceNo, 250, 50, { align: "right" });
    const centerPosX = pdf.internal.pageSize.getWidth() / 2;
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    const companyNameY = 10;
    pdf.text(companyName, centerPosX, companyNameY, { align: "center" });
    pdf.setFontSize(10);
    const lines = pdf.splitTextToSize(companyAddress, pdf.internal.pageSize.getWidth() - 20);
    const addressHeight = lines.length * 5;
    const addressY = companyNameY + 5;
    pdf.text(lines, centerPosX, addressY, { align: "center" });
    const tableHeaders = ["S.No", "DESCRIPTION", "AMOUNT (In Rs)"];
    const tableHeaderXOffsets = [10, 40, 140];
    const tableHeaderYOffset = 60;
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    tableHeaders.forEach((header, index) => {
      pdf.text(header, tableHeaderXOffsets[index], tableHeaderYOffset);
    });
    let tableRowYOffset = tableHeaderYOffset + 5;
    samples.forEach((sample, rowIndex) => {
      const slNo = rowIndex + 1;
      const description = ` ${sample.sampleId}`;
      const amount = GetTestPrice(sample.sampleId);
      pdf.setFont("helvetica", "normal");
      pdf.text(slNo.toString(), tableHeaderXOffsets[0], tableRowYOffset);
      pdf.text(description, tableHeaderXOffsets[1], tableRowYOffset, {
        width: 80,
        align: "left",
      });
      pdf.text(amount.toString(), tableHeaderXOffsets[2], tableRowYOffset);
      tableRowYOffset += 7;
    });
    const tableFooterYOffset = tableRowYOffset + 10;
    const rightAlignedXPosition = pdf.internal.pageSize.getWidth() - 10;
    pdf.text("Total (Before Tax):", rightAlignedXPosition - 150, tableFooterYOffset);
    pdf.text("INR", rightAlignedXPosition - 100, tableFooterYOffset);
    pdf.text(`${total.toFixed(2)}`, rightAlignedXPosition - 92, tableFooterYOffset);
    pdf.text("CGST (9%)", rightAlignedXPosition - 150, tableFooterYOffset + 10);
    pdf.text("INR", rightAlignedXPosition - 100, tableFooterYOffset + 10);
    pdf.text(`${cgst}`, rightAlignedXPosition - 92, tableFooterYOffset + 10);
    pdf.text("SGST (9%)", rightAlignedXPosition - 150, tableFooterYOffset + 20);
    pdf.text("INR", rightAlignedXPosition - 100, tableFooterYOffset + 20);
    pdf.text(`${sgst}`, rightAlignedXPosition - 92, tableFooterYOffset + 20);
    pdf.setFont("helvetica", "bold");
    pdf.text("Grand Total:", rightAlignedXPosition - 150, tableFooterYOffset + 30);
    pdf.text("INR", rightAlignedXPosition - 100, tableFooterYOffset + 30);
    pdf.text(`${totalaftertax}`, rightAlignedXPosition - 92, tableFooterYOffset + 30);
    const fileName = `bill_${name}.pdf`;
    pdf.save(fileName);
  };

  // Function to get the price of a sample
  const GetTestPrice = (sampleId) => {
    switch (sampleId) {
      case "WasteWaterPremium":
        return 2000;
      case "WasteWaterComplete":
        return 2500;
      case "ConstructionWater":
        return 1500;
      case "DrinkingWaterPremium":
        return 850;
      case "DrinkingWaterComplete":
        return 1500;
      case "GroundWaterPremium":
        return 1200;
      case "GroundWaterComplete":
        return 1500;
      case "IrrigationWater":
        return 1200;
      case "SurfaceWater":
        return 1500;
      default:
        return 0;
    }
  };

  // Calculating total, CGST, SGST, and total after tax
  const total = samples.reduce((acc, sample) => {
    const samplePrice = GetTestPrice(sample.sampleId);
    return acc + samplePrice;
  }, 0);
  const cgst = (total * 0.09).toFixed(2);
  const sgst = (total * 0.09).toFixed(2);
  const totalaftertax = (parseFloat(total) + parseFloat(cgst) + parseFloat(sgst)).toFixed(2);

  // JSX
  return (
    <div className="samplePage">
      <h1>CHEMIOPTICS LABS</h1>
      <div className="sample-page-title">
        <p>Samples</p>
      </div>
      <ul>
        {/* Displaying sample details */}
        {samples.map((sample, index) => (
          <li key={index}>
            <div className="sampleDescription">
              <div>
                Sample ID {index + 1}:{" "}
                <a
                  href={`/ticksheet/${sample.sampleId}`}
                  style={{ textDecoration: "underline" }}
                >
                  {sample.sampleId}
                </a>
              </div>
              <div>
                Lab Code:{" "}
                <a
                  href={`/ticksheet/${sample.labCode}`}
                  style={{ textDecoration: "underline" }}
                >
                  {sample.labCode}
                </a>
              </div>
              <p id="testPrice">INR: {GetTestPrice(sample.sampleId)}</p>
            </div>
          </li>
        ))}
      </ul>
      {/* Displaying recent sample info */}
      <div className="sampleTotal">
        <div id="recentSampleInfo">
          Sample ID: {recentSampleInfo.sampleId}<br />
          Lab Code: {recentSampleInfo.labCode}
        </div>
      </div>
      {/* Button to generate bill */}
      <div className="billButton">
        <button onClick={handleGenerateBill}>Generate Bill</button>
      </div>
    </div>
  );
};

export default SamplePage;
