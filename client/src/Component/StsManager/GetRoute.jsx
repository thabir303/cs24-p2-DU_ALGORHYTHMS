import { useState } from 'react';
import L from 'leaflet';

const GetRoute = () => {
  const [formData, setFormData] = useState({
    registrationNumber: '',
    wardNumber: '',
    landfillId: '',
    arrivalTime: '',
    departureTime: '',
    weight: ''
  });
//   const [routePoints, setRoutePoints] = useState([]);

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
  
    fetch('http://localhost:8080/api/view-map', {
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
      // Store response data in a variable
      if (data && data.solution && data.solution.routes) {
        const points = extractRoutePoints(data);
        // setRoutePoints(points);
        plotRouteOnMap(points);
      }
      console.log('Stored data:', ); // Log stored data
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };
  
  const extractRoutePoints = (data) => {
    const points = [];
    data.solution.routes.forEach(route => {
      route.points.forEach(point => {
        points.push(point.coordinates);
      });
    });
    return points;
  };
  
  
  const plotRouteOnMap = (points) => {
    if (!Array.isArray(points) || points.length === 0) {
      throw new Error('Error: Coordinates not found');
    }
  
    const map = L.map('map').setView([52.52, 13.405], 13); // Setting initial view to Berlin
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  
    // Plotting markers for each coordinate point
    points.forEach(point => {
      if (Array.isArray(point) && point.length === 2) {
        const [lat, lon] = point;
        console.log(lat,lon);
        if (!isNaN(lat) && !isNaN(lon)) {
          L.marker([lat, lon]).addTo(map);
        } else {
          throw new Error('Error: Invalid coordinate values');
        }
      } else {
        throw new Error('Error: Invalid coordinate format');
      }
    });
  };
  
  //console.log(formData);

  return (
    <div>
         <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <label style={{ marginBottom: '10px', color: '#333', fontSize: '18px' }}>
          Registration Number:
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
        <br />
        <label style={{ marginBottom: '10px', color: '#333', fontSize: '18px' }}>
          Ward Number:
          <input
            type="number"
            name="wardNumber"
            value={formData.wardNumber}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
        <br />
        <label style={{ marginBottom: '10px', color: '#333', fontSize: '18px' }}>
          Landfill ID:
          <input
            type="text"
            name="landfillId"
            value={formData.landfillId}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
        <br />
        <label style={{ marginBottom: '10px', color: '#333', fontSize: '18px' }}>
          Arrival Time:
          <input
            type="datetime-local"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
        <br />
        <label style={{ marginBottom: '10px', color: '#333', fontSize: '18px' }}>
          Departure Time:
          <input
            type="datetime-local"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
        <br />
        <label style={{ marginBottom: '10px', color: '#333', fontSize: '18px' }}>
          Weight:
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
        <br />
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Submit
        </button>
      </form>
      <div id="map" style={{ height: '400px', width: '100%' }}></div>
    </div>
  );
};

export default GetRoute;