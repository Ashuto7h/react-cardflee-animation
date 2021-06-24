# React CardFlee Animation

A smoothly animated 3d card component whose edges flee away from mouse pointer.

Written in typescript.

### Demo

<https://user-images.githubusercontent.com/53266261/122939164-0571e100-d391-11eb-9d2b-b07f32dfee19.mp4>

## Usage

```js
import CardFlee from 'react-cardflee-anim'

<CardFlee image='/images/myimg.jpg' />
```

## Props

| Prop | Description | Default | Example |
|:- |:- |:-:|:-|
| __height__ | Height of card | 300 | `height = "300"` |
| __width__ | Width of card | 200 | `width = "200"` |
| __id__ | Unique id for each card | undefined | `id = "1" or id={1}` |
| __image__ | Image src |  undefined | `image = "/image.jpg"` |
| __sensitivity__ | (int) a factor for sensitiveness of animation | 20 | `sensitivity = {23}` |
| __bgcolor__ | A Background color css value to provide instead/behind of image. | black | `bgcolor = "#43ffbb"` |
| __head__ | A JSX element | undefined | `head = <myHead />` |
| __content__ | A JSX element | undefined | `content = <myContent />` |

__NOTE__ : You must provide the id attribute if there are multiple cards on the same page.

## Detailed Example

```js
import React from "react";
import CardFlee from "./CardFlee";
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
            <CardFlee id='1' image='/joker.jpg' head={<h1>Joker</h1>} content={content1} sensitivity={23} />
            <CardFlee id='2' image='/flash.jpg' head={<h1>The Flash</h1>} content={content2} />
    </React.StrictMode>,
    document.getElementById('root')
);

}
```
