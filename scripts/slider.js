/*
 * Author: Mateusz Turek
 * @Copyright: 2018
*/
import SliderControl from './control';
import SliderDotControl from './sliderDotControl';

export default class Slider {
    constructor(config) {
        this._c = {
            isDotControl: true,
            isControl: true,
        };
        Object.assign(this._c, config);

        this.animated = false;
        this.classNameOfItems = 'slider-items';
        this.classNameOfActiveItem = 'slider-active';
        this.duration = 200;
        this.shift = document.querySelector('.' + this.classNameOfActiveItem).clientWidth;

        this.control = null;
        this.dotControl = null;

        this.initSlider();
    }
    initSlider() {
        if (this._c.isControl) {
            this.control = new SliderControl({
                slider: this
            });
        }
        if (this._c.isDotControl) {
            this.dotControl = new SliderDotControl({
                slider:this
            });
        }

        this.setupSliderImages();
    }

    setupSliderImages() {
        const imgParent = document.querySelector('.' + this.classNameOfItems);
        let items = imgParent.children;
        let i = 1,
            length = items.length,
            parentWidth = this.shift;

        items[0].style.left = '0px';
        for (i; i < length; i += 1) {
            items[i].style.left += parentWidth + 'px';
            parentWidth *= 2;
        }
    }

    getActiveDataItemValue(items) {
        let i = 0, length = items.length;

        for (i; i < length; i += 1) {
            if (items[i].classList.contains(this.classNameOfActiveItem)) {
                return items[i].dataset.item;
            }
        }
    }

    getItemByDataItemValue(dataItemVal) {
        let items = document.querySelector('.' + this.classNameOfItems).children;
        var itemOut = null;
        [].forEach.call(items, (item) => {
            if (item.dataset.item === dataItemVal) {
                itemOut = item;
                return;
            }
        });
        return itemOut;
    }

    switchClass(className, elemWithClass, elemWithoutClass) {

        elemWithClass.classList.remove(className);
        elemWithoutClass.classList.add(className);
    }

    slideToLeft(items, multiplicity) {
        let $item;

        if (multiplicity === undefined) multiplicity = 1;
        $(items).each((i, item) => {
            $item = $(item);
            $item.animate({
                left: this.calcLeftPosition($item, this.shift * Math.abs(multiplicity))
            }, this.duration, 'linear', () => {
                this.animated = false;
            });
        });
    }

    slideToRight(items, multiplicity) {
        let $item;

        if (multiplicity === undefined) multiplicity = 1;
        $(items).each((i, item) => {
            $item = $(item);
            $item.animate({
                left: this.calcRightPosition($item, this.shift * Math.abs(multiplicity))
            }, this.duration, 'linear', () => {
                this.animated = false;
            });
        });
    }

    calcLeftPosition(item, toSubtract) {
        return item.position().left - toSubtract;
    }

    calcRightPosition(item, toAddition) {
        return item.position().left + toAddition;
    }

    calcMultiplicity(toActiveDot, activeDot) {
        return toActiveDot.dataset.item - activeDot.dataset.item;
    }

    dotOnClick(e) {
        e.preventDefault();

        if (this.animated) return;

        this.animated = true;

        const toActiveDot = e.target;
        const activeDot = this.dotControl.getActiveDot();

        if (toActiveDot.dataset.item === activeDot.dataset.item) {
            this.animated = false;
            return;
        }

        this.switchClass(this.dotControl.classNameOfActiveDot, activeDot, toActiveDot);

        let multiplicity = this.calcMultiplicity(toActiveDot, activeDot);

        let parentOfItems = document.querySelector('.slider-items');
        let items = parentOfItems.children;

        const actItem = this.getActiveItem();
        const toActItem = this.getItemByDataItemValue(toActiveDot.dataset.item);

        this.switchClass(this.classNameOfActiveItem, actItem, toActItem);

        if (multiplicity > 0) {
            this.slideToLeft(items, multiplicity);
        }
        if (multiplicity < 0) {
            this.slideToRight(items, multiplicity);
        }
    }

    getActiveItem() {
        let items = document.querySelector('.' + this.classNameOfItems).children;
        let itemOut;

        [].forEach.call(items, (item) => {
            if (item.classList.contains(this.classNameOfActiveItem)) {
                itemOut = item;
                return;
            }
        });
        return itemOut;
    }

    nextOnClick(e) {
        if (this.animated) return;

        this.animated = true;

        let parent = document.querySelector('.' + this.classNameOfItems);
        
        let items = parent.children;
        let length = items.length;
        let dataItemVal = this.getActiveDataItemValue(items);
        
        if (dataItemVal < (length - 1)) {

            if (this._c.isDotControl) {
                let activeDot = this.dotControl.getActiveDot();
                this.switchClass(this.dotControl.classNameOfActiveDot, activeDot, activeDot.nextSibling);
            }
            
            let actItem = this.getActiveItem();
            
            this.switchClass(this.classNameOfActiveItem, actItem, actItem.nextElementSibling);
            this.slideToLeft(items);
        }
        else {
            this.animated = false;
        }
    }

    prevOnClick(e) {
        if (this.animated) return;

        this.animated = true;

        let parent = document.querySelector('.' + this.classNameOfItems);
        let items = parent.children;
        let dataItemVal = this.getActiveDataItemValue(items);

        if (dataItemVal > 0) {
            if (this._c.isDotControl) {
                let activeDot = this.dotControl.getActiveDot();
                this.switchClass(this.dotControl.classNameOfActiveDot, activeDot, activeDot.previousSibling);
            }

            let actItem = this.getActiveItem();

            this.switchClass(this.classNameOfActiveItem, actItem, actItem.previousElementSibling);
            this.slideToRight(items);
        }
        else {
            this.animated = false;
        }
    }
}