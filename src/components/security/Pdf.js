import html2canvas from "html2canvas";
import jsPDF from "jspdf";



const makePdf = {
    viewWithPdf: async () => {
        // 페이지를 캡처할 요소
        const element = document.getElementById('divToPrint');
        
        // 스크롤을 내리기 위한 값 (음수로 설정하여 아래로 스크롤)
        const scrollDown = 1000; // 예시로 1000px 아래로 스크롤
        
        // 캡처할 페이지의 스크롤 위치 설정
        const scrollY = -window.scrollY + scrollDown;
        
        // 페이지 높이와 스크롤 높이 설정
        const pageHeight = 841.89; // A4 페이지의 높이 (단위: pt)
        const scrollHeight = element.scrollHeight; // 요소의 총 높이 (단위: px)
        
        // 캡처할 페이지 수 계산
        const numPages = Math.ceil(scrollHeight / pageHeight);
        
        // PDF 문서 생성
        const doc = new jsPDF({
            orientation: "p",
            unit: "pt",
            format: "a4"
        });
        
        // 각 페이지를 캡처하고 PDF에 추가
        for (let page = 0; page < numPages; page++) {
            // 페이지의 시작 위치 계산
            const startY = -page * pageHeight + scrollY;
            
            // 해당 페이지만큼 스크롤 위치 이동
            element.scrollTo(0, page * pageHeight + scrollDown);
            
            // 페이지 캡처
            const canvas = await html2canvas(element, {
                scrollY: startY,
                windowWidth: element.scrollWidth,
                windowHeight: Math.min(pageHeight, scrollHeight - page * pageHeight)
            });
            
            // 캡처한 이미지를 PDF에 추가
            doc.addImage(canvas.toDataURL("image/jpeg", 1.0), "JPEG", 0, 0, 595.276, 841.89);
            
            // 다음 페이지로 이동하기 위해 추가 페이지 생성
            if (page < numPages - 1) {
                doc.addPage();
            }
        }
        
        // PDF 저장
        doc.save('downloaded.pdf');
    },
    _convertToImg: async () => {
        const element = document.getElementById('divToPrint');
        var doc = new jsPDF({
            orientation: "p",
            unit: "pt",
            format: "a4"
        });
        
        // 스크롤을 내리기 위한 값 (음수로 설정하여 아래로 스크롤)
        const scrollDown = 10; // 예시로 1000px 아래로 스크롤
        
        // 캡처할 페이지의 스크롤 위치 설정
        const scrollY = -window.scrollY + scrollDown;
        
        // 페이지 높이와 스크롤 높이 설정
        const pageHeight = 841.89; // A4 페이지의 높이 (단위: pt)
        const scrollHeight = element.scrollHeight; // 요소의 총 높이 (단위: px)
        
        // 캡처할 페이지 수 계산
        const numPages = Math.ceil(scrollHeight / pageHeight);
        
        // PDF 문서 생성

        // 각 페이지를 캡처하고 PDF에 추가
        for (let page = 0; page < numPages; page++) {
            // 페이지의 시작 위치 계산
            const startY = -page * pageHeight + scrollY;
            
            // 해당 페이지만큼 스크롤 위치 이동
            element.scrollTo(0, page * pageHeight + scrollDown);
            
            // 페이지 캡처
            const canvas = await html2canvas(element, {
                scrollY: startY,
                windowWidth: element.scrollWidth,
                windowHeight: Math.min(pageHeight, scrollHeight - page * pageHeight)
            });
            
            // 캡처한 이미지를 PDF에 추가
            doc.addImage(canvas.toDataURL("image/jpeg", 1.0), "JPEG", 0, 0, 595.276, 841.89);
            
            // 다음 페이지로 이동하기 위해 추가 페이지 생성
            if (page < numPages - 1) {
                doc.addPage();
            }
            
        }
        doc.save('downloaded.pdf');
       
    },
    _convertToPdf: (imageFile) => {
        const img = new Image();
        img.src = imageFile;
    
        img.onload = () => {
            const doc = new jsPDF({
                orientation: "p",
                unit: "mm",
                format: "a4"
            });
    
            // A4 페이지의 크기 설정
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
    
            // 여백 설정
            const margin = 10; // 여백을 10mm로 설정
            const printableWidth = pageWidth - 2 * margin; // 양쪽 여백을 고려한 출력 가능 너비
    
            
               // 이미지 크기 조정 (높이 축소)
            const scale = 0.; // 이미지 높이 축소 비율
            const imgHeight = (img.height * printableWidth / img.width) * scale;
            let heightLeft = imgHeight;

            let position = 0;

    
            // 첫 페이지에 이미지 추가
            doc.addImage(img, 'JPEG', margin, position, printableWidth, imgHeight);
            heightLeft -= pageHeight;
    
            // 추가 페이지에 대한 이미지 분할
            while (heightLeft > 0) {
                position -= pageHeight;
                doc.addPage();
                doc.addImage(img, 'JPEG', margin, position, printableWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            doc.save('downloaded.pdf');
    
        };
    },
    // _sendToServer and other methods if needed...
};

export default makePdf;
