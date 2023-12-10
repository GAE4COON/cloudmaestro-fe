import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from 'antd';
import styled from 'styled-components';

const DownloadPDF = ({ onExport }) => {
    const [isExporting, setIsExporting] = useState(false);

  function exportToPDF() {
    setIsExporting(true); // Start the export process
    onExport(true);

    setTimeout(() => {
        const input = document.getElementById("export-container");
        html2canvas(input, {
          width: input.scrollWidth,
          height: input.scrollHeight
        }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          var imgWidth = 210; // A4 페이지 너비(mm)
          var pageHeight = 297; // A4 페이지 높이(mm)
          var imgHeight = (canvas.height * imgWidth) / canvas.width;
          var heightLeft = imgHeight;
          var doc = new jsPDF("p", "mm", "a4");
          var position = 0;
      
          doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
      
          // 이미지가 페이지를 넘어갈 경우, 추가 페이지에 이미지를 추가함
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }
      
          doc.save("sample.pdf");
          setIsExporting(false); // Export process 종료
          onExport(false);
        });
      }, 100);
      
    }
      

  return (
    <ExportButton onClick={exportToPDF} disabled={isExporting}>
      {isExporting ? 'Exporting...' : 'EXPORT'}
    </ExportButton>
  );
};

export default DownloadPDF;

const ExportButton = styled(Button)`
    margin-top: 10px;
    box-sizing: border-box;
    position: relative;
    width: 120px;
    height: 40px;

    background: #FFFFFF;
    border: 1px solid #BABABA;
    border-radius: 7px;

    font-family: "Noto Sans KR", sans-serif !important;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    text-align: center;

    color: #809CDA;
`