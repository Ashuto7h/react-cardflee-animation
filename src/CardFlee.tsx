import React, { Component } from 'react';
import { ReactElement } from 'react';
import './styles.css';

export interface CardFleeState {
  mouseX: number, mouseY: number,
  tX: number, tY: number,
  rX: number, rY: number,
  cardStyle: {},
  cardBgTransform: {}
}

export interface CardFleeProps {
  height?: number,
  id: number | string,
  image?: string,
  width?: number,
  sensitivity?: number,
  head?: ReactElement | string | Element,
  content?: ReactElement | string | Element,
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
  cardCss: {};
  constructor(props: CardFleeProps) {
    super(props);
    this.background = (props.image && {
      'backgroundImage': `url("${props.image}")`,
    }) || {};
    this.halfWidth = (props.width && (props.width / 2)) || 100;
    this.halfHeight = (props.height && (props.height / 2)) || 150;
    this.id = `card-${props.id}`;
    this.sensitivity = props.sensitivity || 12;
    this.senseY = -(this.sensitivity * 0.8);
    this.cardCss = {
      width: (this.props.width && (this.props.width + 'px')) || "300px",
      height: (this.props.height && (this.props.height + 'px')) || "500px",
    }

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
    console.log(this);
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
        <div id={this.id} className='card' style={{ ...this.cardCss, ...this.state.cardStyle }}>
          <div className='card-bg' style={{ ...this.background, ...this.state.cardBgTransform }}> </div>
          <div className='card-info' >
            <slot name="header">{this.props.head}</slot>
            <slot name="content">{this.props.content}</slot>
          </div>
        </div>
      </div >
    )
  };
}

