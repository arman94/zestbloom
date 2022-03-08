import React from 'react';
import SlickSlider from 'react-slick';
import SlideArrowNext from './SliderArrowNext';
import SlideArrowPrev from './SliderArrowPrev';

const Slider = ({ children, beforeChange, options }) => {
    return (
        <SlickSlider
            slidesToShow={4}
            swipeToSlide
            focusOnSelect
            infinite={false}
            responsive={[
                {
                    breakpoint: 1440,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    },
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    },
                },
                {
                    breakpoint: 425,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ]}
            {...options}
            nextArrow={<SlideArrowNext />}
            prevArrow={<SlideArrowPrev />}
            beforeChange={beforeChange}
        >
            {children}
        </SlickSlider>
    );
};

export default Slider;
