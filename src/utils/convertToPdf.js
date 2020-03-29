import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
// This one lets you improve the PDF sharpness by scaling up the HTML node tree to render as an image before getting pasted on the PDF.
function print(quality, id) {
  const filename = 'ThisIsYourPDFFilename.pdf';

  if (!document.getElementById(id)) {
    return
  }
  const el = document.querySelector(`#${id}`)

  html2canvas(el, {width: el.scrollWidth, height: el.scrollHeight}).then(
    canvas => {
      let pdf = new jsPDF('landscape');
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, width, height);
      pdf.save(filename);
    }
  );
}

export default print;
