import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import CardFlee from './CardFlee';


ReactDOM.render(
  <React.StrictMode>
    <div className='spacer-h'></div>

    <div className='row'>
      <CardFlee id='1' width="200px" height="300px" image='/joker.jpg' />
      <div className='spacer'></div>
      <CardFlee id='2' width="200px" height="300px" image='/flash.jpg' />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

export * from './CardFlee'

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
