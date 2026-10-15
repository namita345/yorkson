import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './styles.css';
import './who.css';
import './gallery.css';
import './contact-page.css';
import './privacy.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
