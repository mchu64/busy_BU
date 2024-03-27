import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './App.css'; // Import CSS file

function App() {
  const isRootPage = useLocation().pathname === '/'; // Determine if it's the root page

  return (
    <div className={`app flex-container ${isRootPage ? 'isRootPage' : ''}`}>
      {/* Header Section */}
      {isRootPage && (
        <div className="header">
          <h1>Busy-BU(BETA)</h1>
          <h2>This is where you can find how busy the FitRec is!</h2>
        </div>
      )}

      {/* Box Container Section */}
      <div className="box-container">
        {/* Router Links */}
        {isRootPage && (
          <>
            <Link to="/second-page" className="gym-info-box">
              <div>
                <h1>Upper Weight Room</h1>
                <p>Welcome to the Weight room! Check out the facilities and enjoy your workout.</p>
              </div>
            </Link>

            <Link to="/fifth-page" className="gym-info-box">
              <div>
                <h1>Lower Weight Room</h1>
                <p>Welcome to the Weight room! Check out the facilities and enjoy your workout.</p>
              </div>
            </Link>

            <Link to="/third-page" className="evaluate">
              <div>
                <h1>Rate our Facility</h1>
                <p>Please give us a rating on the population of the gym!</p>
              </div>
            </Link>
          </>
        )}
      </div>

      {/* Router Views */}
      {isRootPage && <div className="router-view"></div>}
      <div className="router-view"></div>
    </div>
  );
}

export default App;
