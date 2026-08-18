import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface GeneratePdfOptions {
  page1Element: HTMLElement;
  page2Element: HTMLElement;
}

const CAPTURE_ATTRIBUTE = 'data-contract-pdf-capture';

/** Captures the two page-sized contract elements and returns a two-page PDF Blob. */
export async function generateContractPdf({
  page1Element,
  page2Element,
}: GeneratePdfOptions): Promise<Blob> {
  const pdf = new jsPDF('p', 'mm', 'letter');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const canvas1 = await captureContractPage(page1Element);
  const imgData1 = canvas1.toDataURL('image/jpeg', 1.0);
  pdf.addImage(imgData1, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

  pdf.addPage();
  const canvas2 = await captureContractPage(page2Element);
  const imgData2 = canvas2.toDataURL('image/jpeg', 1.0);
  pdf.addImage(imgData2, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

  return pdf.output('blob');
}

async function captureContractPage(pageElement: HTMLElement): Promise<HTMLCanvasElement> {
  const captureId = crypto.randomUUID();
  pageElement.setAttribute(CAPTURE_ATTRIBUTE, captureId);
  const restoreStyles = applyHtml2CanvasSafeStyles(pageElement);

  try {
    return await html2canvas(pageElement, {
      scale: 3,
      useCORS: false,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      removeContainer: true,
      onclone: (clonedDocument) => {
        const clonedPage = clonedDocument.querySelector<HTMLElement>(
          `[${CAPTURE_ATTRIBUTE}="${captureId}"]`,
        );
        if (clonedPage) applyHtml2CanvasSafeStyles(clonedPage);
      },
    });
  } finally {
    restoreStyles();
    pageElement.removeAttribute(CAPTURE_ATTRIBUTE);
  }
}

function applyHtml2CanvasSafeStyles(pageElement: HTMLElement): () => void {
  const elements = [pageElement, ...Array.from(pageElement.querySelectorAll<HTMLElement>('*'))];
  const previousStyles = elements.map((element) => ({
    element,
    style: element.getAttribute('style'),
  }));

  for (const element of elements) {
    const hasImageBackground = element.style.backgroundImage !== '';
    element.style.color = '#000000';
    element.style.backgroundColor =
      element === pageElement || hasImageBackground ? '#ffffff' : 'transparent';
    element.style.borderColor = '#000000';
    element.style.borderTopColor = '#000000';
    element.style.borderRightColor = '#000000';
    element.style.borderBottomColor = '#000000';
    element.style.borderLeftColor = '#000000';
    element.style.boxShadow = 'none';
    element.style.textShadow = 'none';
    element.style.outlineColor = '#000000';
    element.style.textDecorationColor = '#000000';
  }

  return () => {
    for (const { element, style } of previousStyles) {
      if (style === null) {
        element.removeAttribute('style');
      } else {
        element.setAttribute('style', style);
      }
    }
  };
}
