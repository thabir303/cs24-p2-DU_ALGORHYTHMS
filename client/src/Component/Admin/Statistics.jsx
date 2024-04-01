import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

function Statistics() {
  const [statistics, setStatistics] = useState([]);
  const [dailyFuelCost, setDailyFuelCost] = useState({});
  const [dailyTotalCost, setDailyTotalCost] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const fuelChartRef = useRef(null);
  const totalCostChartRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    calculateDailyFuelCost();
    calculateDailyTotalCost();
  }, [statistics]); // Fix dependency array

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/bills');
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateTotalWeight = (statistics) => {
    return statistics.reduce((total, entry) => total + entry.weight, 0);
  };

  const calculateTotalCost = (statistics) => {
    return statistics.reduce((total, entry) => total + entry.cost, 0);
  };

  const calculateDailyFuelCost = () => {
    const dailyCosts = {};
    statistics.forEach(entry => {
      const date = new Date(entry.arrivalTime).toLocaleDateString();
      const fuelCost = (entry.distance * entry.costPerKm) / 1000; 
      dailyCosts[date] = (dailyCosts[date] || 0) + fuelCost;
    });
    setDailyFuelCost(dailyCosts);
  };

  const calculateDailyTotalCost = () => {
    const dailyCosts = {};
    statistics.forEach(entry => {
      const date = new Date(entry.arrivalTime).toLocaleDateString();
      const fuelCost = (entry.distance * entry.costPerKm) / 1000;
      const totalCost = fuelCost + entry.cost;
      dailyCosts[date] = (dailyCosts[date] || 0) + totalCost;
    });
    setDailyTotalCost(dailyCosts);
  };

  useEffect(() => {
    if (fuelChartRef.current) {
      fuelChartRef.current.destroy();
    }
    const ctx = document.getElementById('fuelCostChart');
    if (ctx) {
      fuelChartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(dailyFuelCost),
          datasets: [
            {
              label: 'Daily Fuel Cost',
              data: Object.values(dailyFuelCost),
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [dailyFuelCost]);

  useEffect(() => {
    if (totalCostChartRef.current) {
      totalCostChartRef.current.destroy();
    }
    const ctx = document.getElementById('totalCostChart');
    if (ctx) {
      totalCostChartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(dailyTotalCost),
          datasets: [
            {
              label: 'Daily Total Cost',
              data: Object.values(dailyTotalCost),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [dailyTotalCost]);

  const handleClick = () => {
    setShowInfo(true);
  };

  const handleBack = () => {
    setShowInfo(false);
  };

  return (
    <div>
      <h1 className='bg-blue-300'>Dashboard Statistics View</h1>
      <div className='bg-slate-400'>
        <h2>Real-time Monitoring of Waste Collection</h2>
        <p>Total Bills: {statistics.length}</p>
        <p>Total Weight Collected: {calculateTotalWeight(statistics)}</p>
        <p>Total Cost: {calculateTotalCost(statistics)}</p>
      </div>
      {showInfo ? (
        <button className='bg-red-500 text-white px-4 py-2 rounded mt-4' onClick={handleBack}>
          Show Less
        </button>
      ) : (
        <button className='bg-green-500 text-white px-4 py-2 rounded mt-4' onClick={handleClick}>
          Show Bills
        </button>
      )}


      {showInfo && (
              <div className='my-3'>
              <h2 className='bg-orange-200'>Waste Collection Statistics at Each STS and Landfill Site</h2>
              {statistics.map((entry, index) => (
        <div key={index} className='bg-gray-100 rounded-lg p-4 mb-4'>
          <div className='grid grid-cols-2 gap-x-4'>
            <div className='flex items-center'>
              <p className='font-semibold'>STS Location ID:</p>
              <p className='ml-2'>{entry.stsLocationId}</p>
            </div>
            <div className='flex items-center'>
              <p className='font-semibold'>Landfill Location ID:</p>
              <p className='ml-2'>{entry.landfillLocationId}</p>
            </div>
            <div className='flex items-center'>
              <p className='font-semibold'>Arrival Time:</p>
              <p className='ml-2'>{new Date(entry.arrivalTime).toLocaleString()}</p>
            </div>
            <div className='flex items-center'>
              <p className='font-semibold'>Departure Time:</p>
              <p className='ml-2'>{new Date(entry.departureTime).toLocaleString()}</p>
            </div>
            <div className='flex items-center'>
              <p className='font-semibold'>Distance:</p>
              <p className='ml-2'>{entry.distance} km</p>
            </div>
            <div className='flex items-center'>
              <p className='font-semibold'>Time:</p>
              <p className='ml-2'>{entry.time} minutes</p>
            </div>
            <div className='flex items-center'>
              <p className='font-semibold'>Weight:</p>
              <p className='ml-2'>{entry.weight} units</p>
            </div>
            <div className='flex items-center'>
              <p className='font-semibold'>Cost Per Km:</p>
              <p className='ml-2'>${entry.costPerKm}</p>
            </div>
            <div className='flex items-center'>
              <p className='font-semibold'>Cost:</p>
              <p className='ml-2'>${entry.cost}</p>
            </div>
          </div>
        </div>
      ))}
           </div>
      
      )}
      <div className=''>
        <h2>Daily Fuel Cost Statistics for the Trucks</h2>
        <canvas id='fuelCostChart' width='400' height='200'></canvas>
      </div>
      <div className=''>
        <h2>Daily Total Cost Statistics for the Trucks</h2>
        <canvas id='totalCostChart' width='400' height='200'></canvas>
      </div>
      <div>
        <h2>Reports Generation</h2>
      </div>
    </div>
  );
}

export default Statistics;