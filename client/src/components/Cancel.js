import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Cancel = () => {
  const [session, setSession] = useState({});
  const location = useLocation();
  const queryLocation = location.search;
  useEffect(() => {
    async function fetchSession() {
      const products = await fetch(
        process.env.REACT_APP_URL1 + '/api/paypal/cancel' + queryLocation
      ).then((res) => res.json());
      setSession(products);
    }
    fetchSession();
  }, [queryLocation]);

  return (
    <div className="sr-root">
      <div className="sr-main">
        <header className="sr-header">
          <div className="sr-header__logo"></div>
        </header>
        <div className="sr-section completed-view">
          <div className="sr-callout">
            {session.status === 'fail' ? (
              <div className="sr-payment-summary completed-view">
                <h1>Your payment was canceled</h1>
                <h4>{session.msg}</h4>
              </div>
            ) : (
              <div></div>
            )}
            <Link to="/payement">Return to DashBoard</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
