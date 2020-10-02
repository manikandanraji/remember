import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default ({ title, bg, dom }) =>
  new Promise((resolve) => {
    setTimeout(() => {
      html2canvas(dom, {
        scale: 5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: bg,
      }).then((canvas) => {
        const image = canvas.toDataURL("image/jpeg", 80 / 100);

        const doc = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [canvas.width, canvas.height],
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        const widthRatio = pageWidth / canvas.width;
        const heightRatio = pageHeight / canvas.height;
        const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

        const canvasWidth = canvas.width * ratio;
        const canvasHeight = canvas.height * ratio;

        const marginX = (pageWidth - canvasWidth) / 2;
        const marginY = (pageHeight - canvasHeight) / 2;

        doc.addImage(
          image,
          "JPEG",
          marginX,
          marginY,
          canvasWidth,
          canvasHeight,
          null,
          "SLOW"
        );
        doc.save(`${title}.pdf`);
        resolve();
      });
    }, 250);
  });
