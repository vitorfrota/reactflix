import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '@/App';
import '@/services/firebase';
import globalStyles from '@/styles/globalStyles';

ReactDOM.render(
   <React.StrictMode>
      <Router>
         <App />
      </Router>
      {globalStyles()}
   </React.StrictMode>,
   document.getElementById('app-root')
);
