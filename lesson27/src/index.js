'use strict';

import "fetch-polyfill";
import "formdata-polyfill";
import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import valid from './modules/valid';
import team from './modules/team';
import calc from './modules/calc';
import carousel from './modules/carousel';
import sendForm from './modules/sendForm';


    // Timer
    countTimer('26 march 2020');
    // menu
    toggleMenu();
    // popup
    togglePopup();
    // табы
    tabs();
    // slider
    slider();
    // inputs validation
    valid();
    // team
    team();
    // calculator
    calc(100); // price
    // carousel
    carousel.init();
    // send-ajax-form     
    sendForm();

    