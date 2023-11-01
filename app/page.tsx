"use client"
import React, { useState, useEffect } from 'react';

function CandlestickPage() {
  const [intradayData, setIntradayData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [isHistorical, setIsHistorical] = useState(false);

  useEffect(() => {
    const fetchIntradayData = async () => {
      try {
        // Replace with your data fetching logic for intraday data
        const response = await fetch('https://vaistrastockapi.up.railway.app/stock/candle?instrumentKey=NSE_INDEX%7CNifty%20Bank&interval=30minute');
        const result = await response.json();
        setIntradayData(result.data);
      } catch (error) {
        console.error('Error fetching intraday data:', error);
      }
    };

    const fetchHistoricalData = async () => {
      try {
        // Replace with your data fetching logic for historical data
        const response = await fetch('https://vaistrastockapi.up.railway.app/stock/historicalCandle?instrumentKey=NSE_INDEX%7CNifty%20Bank&interval=30minute&toDate=2023-10-19&fromDate=2023-10-18');
        const result = await response.json();
        setHistoricalData(result.data);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchIntradayData();
    fetchHistoricalData();
  }, []);
  


  const toggleTheme = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
  };

  const toggleData = (dataType) => {
    setIsHistorical(dataType === 'historical');
  };

  function CandlestickChart({ intradayData, historicalData, isHistorical, theme }) {
    const chartStyle = {
      width: '100%',
      height: '400px', // Adjust the height as needed
      backgroundColor: theme === 'dark' ? 'black' : 'white',
    };

    return (
      <div>
        {Array.isArray(intradayData) && Array.isArray(historicalData) ? (
          <div style={chartStyle}>
            {/* Render your candlestick chart here using CSS styling */}
          </div>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <CandlestickChart
        intradayData={intradayData}
        historicalData={historicalData}
        isHistorical={isHistorical}
        theme={theme}
      />
      <label>Theme: </label>
      <select value={theme} onChange={toggleTheme}>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
      <label>Data Type: </label>
      <select
        value={isHistorical ? 'historical' : 'intraday'}
        onChange={(e) => toggleData(e.target.value)}
      >
        <option value="intraday">Intraday</option>
        <option value="historical">Historical</option>
      </select>
    </div>
  );
}
