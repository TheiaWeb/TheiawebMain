const quoteForm = document.getElementById('quoteForm');
const pdfContainer = document.getElementById('pdfContainer');

quoteForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(quoteForm);
    const clientName = formData.get('clientName');
    const address = formData.get('address');
    const email = formData.get('email');

    const response = await fetch(`http://127.0.0.1:5001/formtheia/us-central1/generatePDFQuote?clientName=${clientName}&address=${address}&email=${email}`);
    const pdfBlob = await response.blob();

    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Create a download link for the PDF
    const downloadLink = document.createElement('a');
    downloadLink.href = pdfUrl;
    downloadLink.download = 'quote.pdf'; // Change the filename if desired
    downloadLink.textContent = 'Download PDF';

    // Add the download link to the container
    pdfContainer.innerHTML = '';
    pdfContainer.appendChild(downloadLink);
});
