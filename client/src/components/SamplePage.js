import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { jsPDF } from "jspdf";
import "./SamplePage.css";

const SamplePage = () => {
  const location = useLocation();
  const name = location.state && location.state.name;
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    const storedSamples = JSON.parse(localStorage.getItem("samplesData")) || [];
    setSamples(storedSamples);
  }, []);

  const handleSampleClick = (sampleId) => {
    localStorage.setItem("selectedSampleId", sampleId);
  };


  const handleGenerateBill = () => {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [297, 210],
    });

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

    pdf.setFontSize(14);
    pdf.text(`DATE: ${billDate}`, 270, 10, { align: "right" });

    pdf.setFont("helvetica", "normal");
    pdf.text(customerName, 10, 30);

    // Set the font size
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

    const textOffset = 10;
    const inrOffset = 100;
    const numberOffset = -8;

    pdf.text("Total (Before Tax):", rightAlignedXPosition - 150, tableFooterYOffset);
    pdf.text("INR", rightAlignedXPosition - inrOffset, tableFooterYOffset);
    pdf.text(`${total.toFixed(2)}`, rightAlignedXPosition - inrOffset - numberOffset, tableFooterYOffset);

    pdf.text("CGST (9%)", rightAlignedXPosition - 150, tableFooterYOffset + textOffset);
    pdf.text("INR", rightAlignedXPosition - inrOffset, tableFooterYOffset + textOffset);
    pdf.text(`${cgst}`, rightAlignedXPosition - inrOffset - numberOffset, tableFooterYOffset + textOffset);

    pdf.text("SGST (9%)", rightAlignedXPosition - 150, tableFooterYOffset + 2 * textOffset);
    pdf.text("INR", rightAlignedXPosition - inrOffset, tableFooterYOffset + 2 * textOffset);
    pdf.text(`${sgst}`, rightAlignedXPosition - inrOffset - numberOffset, tableFooterYOffset + 2 * textOffset);

    pdf.setFont("helvetica", "bold");
    pdf.text("Grand Total:", rightAlignedXPosition - 150, tableFooterYOffset + 3 * textOffset);
    pdf.text("INR", rightAlignedXPosition - inrOffset, tableFooterYOffset + 3 * textOffset);
    pdf.text(`${totalaftertax}`, rightAlignedXPosition - inrOffset - numberOffset, tableFooterYOffset + 3 * textOffset);

    const fileName = `bill_${name}.pdf`;
    pdf.save(fileName);
  };


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
        break;
    }
  };
  const total = samples.reduce((acc, sample) => {
    const samplePrice = GetTestPrice(sample.sampleId);
    return acc + samplePrice;
  }, 0);

  // Calculate CGST and SGST
  const cgst = (total * 0.09).toFixed(2); // 9% CGST
  const sgst = (total * 0.09).toFixed(2); // 9% SGST

  const totalaftertax = (parseFloat(total) + parseFloat(cgst) + parseFloat(sgst)).toFixed(2); // Total after tax

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
              state: { sample },
            }}
          >
            <li onClick={() => handleSampleClick(sample.sampleId)}>
              <div className="sampleDescription">
                <div>
                  Sample ID {index + 1}: <p>{sample.sampleId}</p>
                </div>
                <div>
                  Lab Code: <p id="labcode">{sample.labCode}</p>
                </div>
                <p id="testPrice">INR: {GetTestPrice(sample.sampleId)}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
      <div className="sampleTotal" >

        <div id="total">Total: INR {total}</div>
        <div id="cgst">CGST (9%): INR {cgst}</div>
        <div id="sgst">SGST (9%): INR {sgst}</div>
        <div id="totalaftertax">Grand Total: INR {totalaftertax}</div>
        <button onClick={handleGenerateBill}>Generate Bill</button>
      </div>
    </div>
  );
};

export default SamplePage;
