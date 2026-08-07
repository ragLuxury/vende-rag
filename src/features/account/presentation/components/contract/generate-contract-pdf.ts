import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface GeneratePdfOptions {
  page1Element: HTMLElement;
  page2Element: HTMLElement;
}

/** Captures the two page-sized contract elements and returns a two-page PDF Blob. */
export async function generateContractPdf({
  page1Element,
  page2Element,
}: GeneratePdfOptions): Promise<Blob> {
  const captureOptions = {
    scale: 3,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
    removeContainer: true,
  };

  const pdf = new jsPDF('p', 'mm', 'letter');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const canvas1 = await html2canvas(page1Element, captureOptions);
  const imgData1 = canvas1.toDataURL('image/jpeg', 1.0);
  pdf.addImage(imgData1, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

  pdf.addPage();
  const canvas2 = await html2canvas(page2Element, captureOptions);
  const imgData2 = canvas2.toDataURL('image/jpeg', 1.0);
  pdf.addImage(imgData2, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

  return pdf.output('blob');
}
