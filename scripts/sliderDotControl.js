/*
 * Author: Mateusz Turek
 * @Copyright: 2018
*/
export default class SliderDotControl {
    constructor(config) {
        this.classNameOfActiveDot = 'dot-active';
        this.classNameOfSliderDots = 'slider-dots';
        this.classNameOfSliderDotElement = 'slider-dot-elem';
        this.classNameOfSlider = 'slider';
        this.classNameOfItems = 'slider-items';

        this.initDotControl();

        this.sliderRef = config.slider;
    }

    initDotControl() {
        this.generateDots();

        let dots = document.querySelector('.' + this.classNameOfSliderDots).children;

        [].forEach.call(dots, (dot) => {
            dot.addEventListener('click', e => { this.sliderRef.dotOnClick(e); }, false);
        });
    }

    generateDots() {
        let sliderElem = document.querySelector('.' + this.classNameOfSlider);
        let length = document.querySelector('.' + this.classNameOfItems).children.length;
        let i = 0;
        let ulElem = document.createElement('ul');
        let liElem;

        ulElem.classList.add(this.classNameOfSliderDots);

        for (i = 0; i < length; i += 1) {
            liElem = document.createElement('li');
            liElem.classList.add(this.classNameOfSliderDotElement);
            liElem.setAttribute('role', 'button');
            liElem.dataset.item = i;

            ulElem.appendChild(liElem);
        }

        ulElem.children[0].classList.add(this.classNameOfActiveDot);

        sliderElem.appendChild(ulElem);
    }

    getActiveDot() {
        let dots = document.querySelector('.' + this.classNameOfSliderDots).children;
        var dotOut = null;
        [].forEach.call(dots, (dot) => {
            if (dot.classList.contains(this.classNameOfActiveDot)) {
                dotOut = dot;
                return;
            }
        });
        return dotOut;
    }
}