import { slider_Banner,slider_combined } from "./Slider.js";
import '../css/index.css';
import '../css/base.css';
const el = document.querySelector('.banner');
const el1 = document.querySelector('.tab');
const el2 = document.querySelector('.pagination-arrow');


// const slide = new slider(el)
const slide2 = new slider_combined(el2);
const slide1 = new slider_Banner(el1);
const slide0 = new slider_Banner(el);