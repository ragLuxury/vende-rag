import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface GeneratePdfOptions {
  page1Element: HTMLElement;
  page2Element: HTMLElement;
}

function isUnsupportedColor(value: string): boolean {
  return /\b(oklab|oklch|lab|lch|color-mix)\(/i.test(value);
}

function sanitizeUnsupportedColors(root: HTMLElement): () => void {
  const previousValues: Array<[HTMLElement, string, string]> = [];
  const elements = [root, ...Array.from(root.querySelectorAll<HTMLElement>('*'))];

  for (const element of elements) {
    const computed = window.getComputedStyle(element);
    const replacements: Array<[string, string]> = [
      ['color', '#000000'],
      ['background-color', '#ffffff'],
      ['border-color', '#000000'],
      ['border-top-color', '#000000'],
      ['border-right-color', '#000000'],
      ['border-bottom-color', '#000000'],
      ['border-left-color', '#000000'],
    ];

    for (const [property, fallback] of replacements) {
      const value = computed.getPropertyValue(property);
      if (!isUnsupportedColor(value)) continue;

      previousValues.push([element, property, element.style.getPropertyValue(property)]);
      element.style.setProperty(property, fallback);
    }
  }

  return () => {
    for (const [element, property, value] of previousValues) {
      if (value) element.style.setProperty(property, value);
      else element.style.removeProperty(property);
    }
  };
}

async function captureContractPage(element: HTMLElement, options: Parameters<typeof html2canvas>[1]) {
  const restoreColors = sanitizeUnsupportedColors(element);
  try {
    return await html2canvas(element, options);
  } finally {
    restoreColors();
  }
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

  const canvas1 = await captureContractPage(page1Element, captureOptions);
  const imgData1 = canvas1.toDataURL('image/jpeg', 0.98);
  pdf.addImage(imgData1, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'NONE');

  pdf.addPage();
  const canvas2 = await captureContractPage(page2Element, captureOptions);
  const imgData2 = canvas2.toDataURL('image/jpeg', 0.98);
  pdf.addImage(imgData2, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'NONE');

  return pdf.output('blob');
}
