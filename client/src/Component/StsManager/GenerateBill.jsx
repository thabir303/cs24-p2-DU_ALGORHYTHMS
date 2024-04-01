import { useState } from 'react';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';


const GenerateBill = () => {
  const [formData, setFormData] = useState({
    registrationNumber: '',
    wardNumber: '',
    landfillId: '',
    arrivalTime: '',
    departureTime: '',
    weight: ''
  });
  const [responseData, setResponseData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert wardNumber and weight to numbers
    const dataToSend = {
      ...formData,
      wardNumber: parseInt(formData.wardNumber),
      weight: parseInt(formData.weight)
    };

    fetch('http://localhost:8080/api/optimized-route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Response:', data);
      setResponseData(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      // Handle errors here
    });
  };

  function generatePDF() {
    const element = document.getElementById('pdfTable');
    if (element) {
      html2canvas(element, { scale: 2 }).then(canvas => {
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('bill.pdf');
      });
    } else {
      console.error('Element #pdfTable not found!');
    }
  }
  return (
    <div className="max-w-3xl mx-auto p-5">
      <form onSubmit={handleSubmit} className="mb-8">
        <label className="block mb-4 text-lg text-gray-700">
          Registration Number:
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-4 text-lg text-gray-700">
          Ward Number:
          <input
            type="number"
            name="wardNumber"
            value={formData.wardNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-4 text-lg text-gray-700">
          Landfill ID:
          <input
            type="text"
            name="landfillId"
            value={formData.landfillId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-4 text-lg text-gray-700">
          Arrival Time:
          <input
            type="datetime-local"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-4 text-lg text-gray-700">
          Departure Time:
          <input
            type="datetime-local"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-4 text-lg text-gray-700">
          Weight:
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {responseData && (
        <div className="mb-8">
          <table id="pdfTable" className="w-full border-collapse border border-gray-300">
            <tbody>
              {Object.entries(responseData).map(([key, value]) => (
                <tr key={key} className="border-b border-gray-300">
                  <td className="p-2 text-lg text-gray-700">{key}</td>
                  <td className="p-2 text-lg text-gray-700">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={generatePDF}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateBill;
