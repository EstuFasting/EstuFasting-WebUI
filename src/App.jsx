import './assets/css/App.css';
import './assets/css/forms.css';
import './assets/css/layout.css';
import './assets/css/login-and-signup.css';
import './assets/css/libraries/bootstrap.min.css';

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
