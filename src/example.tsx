import React from "react";
import CardFlee from './CardFlee';

import ReactDOM from "react-dom";
const content1 = <React.Fragment><p>watch the movie now
    <br />Grab your Tickets <br /></p></React.Fragment>;

const content2 = <React.Fragment>
    <p>
        New Season Out Now
    </p>
</React.Fragment>


ReactDOM.render(
    <React.StrictMode>
        <div className='spacer-h'></div>
        <div className='row'>
            <CardFlee id='1' image='/joker.jpg' head={<h1>Joker</h1>} content={content1} sensitivity={23} />
            <div className='spacer'></div>
            <CardFlee id='2' image='/flash.jpg' head={<h1>The Flash</h1>} content={content2} />
        </div>
    </React.StrictMode>,
    document.getElementById('root')
);

