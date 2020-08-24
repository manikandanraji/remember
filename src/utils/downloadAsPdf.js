import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default ({ title, bg, dom }) => {
  html2canvas(dom, {
    scale: 5,
    allowTaint: true,
    useCORS: true,
    backgroundColor: bg,
  }).then((canvas) => {
    const image = canvas.toDataURL("image/jpeg", 1.0);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const ratio = canvas.width / canvas.height;
    const width = pdf.internal.pageSize.getWidth();
    const height = width / ratio;

    pdf.addImage(image, "JPEG", 0, 0, width, height);
    pdf.save(`${title}.pdf`);
  });
};
