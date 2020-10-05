import html2canvas from "html2canvas";

export default ({ title, bg, dom }) =>
  new Promise((resolve) => {
    setTimeout(() => {
      html2canvas(dom, {
        scale: 5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: bg,
      }).then((canvas) => {
        saveAs(canvas.toDataURL("image/jpeg", 80 / 100), `${title}.png`);
      });
    }, 250);
  });

// https://stackoverflow.com/questions/31656689/how-to-save-img-to-users-local-computer-using-html2canvas
const downloadAsPNG = (uri, filename) => {
  const link = document.createElement("a");

  if (typeof link.download === "string") {
    link.href = uri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
};
