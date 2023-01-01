import './assets/css/App.css';
import './assets/css/forms.css';
import './assets/css/layout.css';
import './assets/css/login-and-signup.css';
import './assets/css/calendar.css';
import './assets/css/reservation.css';
import './assets/css/payment.css';
import './assets/css/main-page.css';
import './assets/css/settings.css';
import './assets/css/libraries/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'
import 'swiper/css';

import React from 'react';
import Dashboard from './layouts/Dashboard';

function App() {
    return (
        <div className="App">
            <Dashboard/>
        </div>
    );
}

export default App;
