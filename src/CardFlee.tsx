import React from 'react';
import { Component } from 'react';
import './CardFlee.css';

export interface CardFleeState {
  mouseX: number, mouseY: number,
  tX: number, tY: number,
  rX: number, rY: number,
  cardStyle: {},
  cardBgTransform: {}
}

interface CardFleeProps {
  height: number,
  id: string,
  image?: any,
  width: any,
  sensitivity?: number,
  head?: Component,
  content?: Component,
  bgcolor?: string
}

export default class CardFlee extends Component<CardFleeProps, CardFleeState> {
  mouseLeaveDelay: NodeJS.Timeout | any = null;
  background: {};
  id: string;
  halfWidth: number;
  halfHeight: number;
  sensitivity: number;
  senseY: number;

  constructor(props: CardFleeProps) {
    super(props);
    this.background = (props.image && {
      'backgroundImage': `url("${props.image}")`,
    }) || {};
    this.halfWidth = props.width / 2 || 100;
    this.halfHeight = props.height / 2 || 150;
    this.id = `card-${props.id}`;
    this.sensitivity = props.sensitivity || 12;
    this.senseY = -(this.sensitivity * 0.8);

    this.state = {
      mouseX: 0,
      mouseY: 0,
      tX: 0,
      tY: 0,
      rX: 0,
      rY: 0,
      cardStyle: {
        transform: `rotateY(0deg) rotateX(0deg)`
      },
      cardBgTransform: {
        transform: `translateX(0px) translateY(0px)`
      }
    }
  }



  cardStyle = {
    position: "relative",
    "margin-left": "40px",
    cursor: "pointer",
    width: this.props.width || "200px",
    height: this.props.height || "300px",
    "background-color": this.props.bgcolor || "black",
    overflow: "hidden",
    "border-radius": "10px",
    "box-shadow": "rgba(0, 0, 0, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px, inset rgba(255, 255, 255, 0.5) 0 0 0 6px",
    transition: "1s cubic-bezier(0.445, 0.05, 0.55, 0.95)"
  }


  mousePX = (): number => {
    return (this.state.mouseX - this.halfWidth) / this.halfWidth;
  };

  mousePY = (): number => {
    return (this.state.mouseY - this.halfHeight) / this.halfHeight;
  };

  handleMouseMove = (e: React.MouseEvent): void => {
    const card: HTMLElement | any = document.getElementById(this.id);
    var { x, y }: DOMRect | any = card.getBoundingClientRect()
    this.setState({
      mouseX: e.clientX - x,
      mouseY: e.clientY - y,
      tX: this.mousePX() * this.sensitivity,
      tY: this.mousePY() * this.senseY,
      rX: this.mousePX() * this.sensitivity,
      rY: this.mousePY() * this.senseY,
      cardStyle: {
        transform: `rotateY(${this.state.rX}deg) rotateX(${this.state.rY}deg)`
      },
      cardBgTransform: {
        transform: `translateX(${this.state.tX}px) translateY(${this.state.tY}px)`
      }
    });
    console.log(this.state.cardStyle);
  };

  handleMouseEnter = (): void => {
    clearTimeout(this.mouseLeaveDelay);
  };

  handleMouseLeave = (): void => {
    this.mouseLeaveDelay = setTimeout(() => {
      this.setState({
        cardStyle: {
          transform: `rotateY(0deg) rotateX(0deg)`
        },
        cardBgTransform: {
          transform: `translateX(0px) translateY(0px)`
        }
      });
    }, 1000);
  };

  render() {
    return (
      <div className='card-wrap'
        onMouseMove={this.handleMouseMove}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave} >
        <div id={this.id} className='card' style={this.state.cardStyle} >
          <div className='card-bg' style={{ ...this.background, ...this.state.cardBgTransform }}> </div>
          <div className='card-info' >
            <slot name="header">{this.props.head}</slot>
            <slot name="content">{this.props.content}</slot>
          </div>
        </div>
      </div>
    )
  };
}

