import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Export text content as PDF
 * @param {string} content - The text content to export
 * @param {string} filename - The filename for the PDF
 * @param {string} title - Optional title for the PDF
 */
export const exportTextAsPDF = (content, filename = 'document.pdf', title = '') => {
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 10;
  const maxWidth = pageWidth - 2 * margin;

  // Add title if provided
  if (title) {
    doc.setFont('helvetica', 14);
    doc.text(title, margin, margin + 10);
    doc.setFont('helvetica', 10);
  }

  // Split text into lines
  const lines = doc.splitTextToSize(content, maxWidth);
  let yPosition = title ? margin + 20 : margin + 10;

  lines.forEach((line) => {
    if (yPosition > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }
    doc.text(line, margin, yPosition);
    yPosition += 5;
  });

  doc.save(filename);
};

/**
 * Export HTML element as PDF
 * @param {HTMLElement} element - The DOM element to export
 * @param {string} filename - The filename for the PDF
 */
export const exportHTMLAsPDF = async (element, filename = 'document.pdf') => {
  try {
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(filename);
  } catch (error) {
    console.error('Error exporting PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};

/**
 * Copy text to clipboard
 * @param {string} text - The text to copy
 * @returns {Promise<boolean>} - Success status
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
};

/**
 * Generate a formatted table as text
 * @param {Array<Object>} data - Array of objects to convert to table
 * @param {Array<string>} columns - Column names
 * @returns {string} - Formatted table text
 */
export const generateTableText = (data, columns) => {
  if (!data || data.length === 0) return '';

  // Calculate column widths
  const colWidths = columns.map(col => Math.max(col.length, 15));

  // Header row
  let table = columns
    .map((col, i) => col.padEnd(colWidths[i]))
    .join(' | ') + '\n';
  table += colWidths.map(width => '-'.repeat(width)).join('-+-') + '\n';

  // Data rows
  data.forEach(row => {
    table += columns
      .map((col, i) => String(row[col] || '').padEnd(colWidths[i]))
      .join(' | ') + '\n';
  });

  return table;
};

/**
 * Download a file
 * @param {string} content - The file content
 * @param {string} filename - The filename
 * @param {string} type - The MIME type (default: 'text/plain')
 */
export const downloadFile = (content, filename, type = 'text/plain') => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:${type};charset=utf-8,${encodeURIComponent(content)}`);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

/**
 * Format date as DD/MM/YYYY
 * @param {Date|string} date - The date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Create a PDF document with standard Rajasthan school header
 * @returns {jsPDF} - A new jsPDF instance with header
 */
export const createRajasthanSchoolPDF = (schoolName = 'Government School') => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 10;

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(schoolName, margin, margin + 5, { maxWidth: pageWidth - 2 * margin, align: 'center' });

  doc.setFontSize(10);
  doc.text('Rajasthan Board of Secondary Education (RBSE)', margin, margin + 12, {
    maxWidth: pageWidth - 2 * margin,
    align: 'center',
  });

  // Line
  doc.setDrawColor(0, 0, 0);
  doc.line(margin, margin + 15, pageWidth - margin, margin + 15);

  return doc;
};

/**
 * Save data to IndexedDB
 * @param {string} storeName - The store name
 * @param {any} data - The data to save
 * @param {string} key - Optional key for the data
 */
export const saveToIndexedDB = (storeName, data, key = null) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('SarathiDB', 1);

    request.onerror = () => reject(request.error);

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);

      const saveRequest = key
        ? store.put({ ...data, id: key }, key)
        : store.add(data);

      saveRequest.onsuccess = () => resolve(saveRequest.result);
      saveRequest.onerror = () => reject(saveRequest.error);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    };
  });
};

/**
 * Retrieve data from IndexedDB
 * @param {string} storeName - The store name
 * @param {string} key - Optional key to retrieve specific data
 */
export const getFromIndexedDB = (storeName, key = null) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('SarathiDB', 1);

    request.onerror = () => reject(request.error);

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);

      const getRequest = key ? store.get(key) : store.getAll();

      getRequest.onsuccess = () => resolve(getRequest.result);
      getRequest.onerror = () => reject(getRequest.error);
    };
  });
};
