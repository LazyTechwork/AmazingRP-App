import React, {Component} from 'react';
import {Button, Panel} from '@vkontakte/vkui';

import Slider from 'react-slick';

import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';

import '../../css/introduction.css';

class Introduction extends Component {
    constructor() {
        super();

        this.state = {
            slideIndex: 0
        };

        this.slider = null;
        this.next = this.next.bind(this);
    }

    next() {
        this.slider.slickNext();
    }

    render() {
        const {pages} = this.props;
        const settings = {
            centerMode: false,
            autoplay: false,
            dots: false,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            beforeChange: (current, next) => this.setState({slideIndex: next})
        };

        const PageDot = ({selected, id}) => (
            <div
                className="dot"
                style={{
                    width: (selected ? '8px' : '6px'),
                    height: (selected ? '8px' : '6px')
                }}
                onClick={() => {
                    this.slider.slickGoTo(id);
                }}
            />
        );

        const PageDots = ({pages, currentPage}) => (
            <div className="dots">
                {Array.from(new Array(pages), (x, i) => i).map((page) => (
                    <PageDot key={page} selected={page === currentPage} id={page}/>
                ))}
            </div>
        );

        return (
            <Panel id="introduction">
                <Slider {...settings} ref={(c) => (this.slider = c)}>
                    {pages.map((page, key) => {
                        const {image, title, subtitle} = page;
                        const {slideIndex} = this.state;
                        return (
                            <div
                                key={key}
                                className="introduction"
                            >
                                <img src={image} className="image" alt=""/>

                                <span className="title">{title}</span>
                                <span className="subtitle">{subtitle}</span>

                                <div className="button_next">
                                    <Button
                                        onClick={() => {
                                            slideIndex === pages.length - 1 ? this.props.variable.changePage('first') : this.next();
                                        }}
                                        size="l"
                                        stretched
                                        className="button_Panel"
                                        style={{margin: 0}}
                                    >
                                        Двигаемся дальше
                                        <Icon24BrowserForward style={{display: 'inline-block', verticalAlign: 'middle'}}
                                                              width={14} height={14}/>
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
                <PageDots pages={pages.length} currentPage={this.state.slideIndex}/>
            </Panel>
        );
    }
}

export default Introduction;