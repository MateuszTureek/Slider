/*
 * Author: Mateusz Turek
 * @Copyright: 2018
*/
export default class SliderControl {
    constructor(config) {
        this.classNameOfSlider = 'slider';
        this.classNameOfSliderNav = 'slider-nav';
        this.classNameOfPrevButton = 'slider-item-prev';
        this.classNameOfNextButton = 'slider-item-next';
        this.arrowStyle = 'fas';
        this.classNameOfRightArrow = 'fa-angle-double-right';
        this.classNameOfLeftArrow = 'fa-angle-double-left';

        this.sliderRef = config.slider;

        this.initControl();
    }

    initControl() {
        this.generateControl();

        let btnPrev = document.querySelector('.' + this.classNameOfPrevButton);
        let btnNext = document.querySelector('.' + this.classNameOfNextButton);

        btnPrev.addEventListener('click', e => this.sliderRef.prevOnClick(e), false);
        btnNext.addEventListener('click', e => this.sliderRef.nextOnClick(e), false);
    }

    generateControl() {
        let sliderElem = document.querySelector('.' + this.classNameOfSlider);

        let buttonContainerElem = document.createElement('div');
        buttonContainerElem.classList.add(this.classNameOfSliderNav);

        let buttonPrevElem = document.createElement('button');
        buttonPrevElem.classList.add(this.classNameOfPrevButton);

        let buttonNextElem = document.createElement('button');
        buttonNextElem.classList.add(this.classNameOfNextButton);

        let prevArrowElem = document.createElement('i');
        prevArrowElem.classList.add(this.arrowStyle);
        prevArrowElem.classList.add(this.classNameOfLeftArrow);

        let nextArrowElem = document.createElement('i');
        nextArrowElem.classList.add(this.arrowStyle);
        nextArrowElem.classList.add(this.classNameOfRightArrow);

        buttonPrevElem.appendChild(prevArrowElem);
        buttonNextElem.appendChild(nextArrowElem);

        buttonContainerElem.appendChild(buttonPrevElem);
        buttonContainerElem.appendChild(buttonNextElem);

        sliderElem.appendChild(buttonContainerElem);
    }
}