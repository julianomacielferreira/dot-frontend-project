/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./css/app.css":
/*!*********************!*\
  !*** ./css/app.css ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"bundle.css\";\n\n//# sourceURL=webpack:///./css/app.css?");

/***/ }),

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar TopSlider = function () {\n  var slider = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slider-top');\n  var intervalTimeout = 3000;\n  var animationTimeout = 1000;\n  var intervalID = null;\n\n  var stop = function stop() {\n    clearInterval(intervalID);\n    intervalID = null;\n  };\n\n  var start = function start() {\n    if (!intervalID) {\n      intervalID = setInterval(change_slide, intervalTimeout);\n    }\n  };\n\n  var wrap = function wrap() {\n    var sliderTopItemNotClone = slider.find('.slider-top-item:not(.clone)');\n\n    if (set_slider_at() >= sliderTopItemNotClone.length) {\n      set_slider_at(0, true, false);\n    }\n  };\n\n  var change_slide = function change_slide() {\n    set_slider_at(set_slider_at() + 1, // Se não tem position ele vai calcular automaticamente\n    true);\n  };\n\n  var update_bullets = function update_bullets() {\n    var sliderTopBullets = slider.find('.slider-top-bullet');\n    sliderTopBullets.removeClass('active');\n    sliderTopBullets.eq(set_slider_at()).addClass('active');\n  };\n\n  var calculate_new_position = function calculate_new_position(sliderTopItem) {\n    var sliderItemPositionLeft = sliderTopItem.position().left;\n    var newPosition = Math.round(Math.abs(sliderItemPositionLeft) / slider.width() - 1);\n    return newPosition;\n  };\n\n  var set_slider_at = function set_slider_at(position, isTopWrap, isToAnimate) {\n    var sliderTopItem = slider.find('.slider-top-item');\n\n    if (position == undefined) {\n      return calculate_new_position(sliderTopItem);\n    }\n\n    var animationProperties = {\n      left: -(1 + position) * slider.width() + 'px'\n    };\n\n    if (isToAnimate == undefined) {\n      isToAnimate = true;\n    }\n\n    sliderTopItem.animate(animationProperties, isToAnimate ? animationTimeout : 0).promise().then(function () {\n      update_bullets();\n\n      if (isTopWrap) {\n        wrap();\n      }\n    });\n  };\n\n  var setup = function setup() {\n    var sliderTopItems = slider.find('.slider-top-item');\n    sliderTopItems.each(function (currentIndex) {\n      var topSliderBullet = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<li class=\"slider-top-bullet\" />');\n\n      if (currentIndex == 0) {\n        topSliderBullet.addClass('active');\n      }\n\n      slider.find('.slider-top-bullet-set').append(topSliderBullet);\n      topSliderBullet.on('click', function () {\n        set_slider_at(currentIndex, true);\n      }).on('mouseenter', function () {\n        stop();\n      }).on('mouseleave', function () {\n        start();\n      });\n    });\n    var slideSet = slider.find('.slider-top-set');\n    var first = slideSet.children(':first-child').clone();\n    first.addClass('clone');\n    slideSet.append(first);\n    var last = slideSet.children(':last-child').clone();\n    last.addClass('clone');\n    slideSet.prepend(last);\n    sliderTopItems.css('left', '-=' + slider.width() + 'px');\n  };\n\n  var init = function init() {\n    setup();\n    start();\n  };\n\n  return {\n    init: init\n  };\n}();\n\nvar Accordion = function () {\n  var removeActiveClass = function removeActiveClass() {\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.accordion-item-content').removeClass('active').hide('slow');\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.fa-arrow-up').attr('style', 'display: none;');\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.fa-arrow-down').attr('style', 'display: block;');\n  };\n\n  var changeArrowsTo = function changeArrowsTo(accordionLink, arrow_down_display, arrow_up_display) {\n    accordionLink.children('.fa-arrow-down').attr('style', \"display: \".concat(arrow_down_display, \";\"));\n    accordionLink.children('.fa-arrow-up').attr('style', \"display: \".concat(arrow_up_display, \";\"));\n  };\n\n  var init = function init() {\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".accordion-item\").on('click', function () {\n      var accordionItem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);\n      var accordionItemContent = accordionItem.children('.accordion-item-content');\n      var accordionLink = accordionItem.children('.accordion-link');\n\n      if (accordionItemContent.hasClass('active')) {\n        removeActiveClass();\n        changeArrowsTo(accordionLink, 'block', 'none');\n      } else {\n        removeActiveClass();\n        changeArrowsTo(accordionLink, 'none', 'block');\n        accordionItemContent.addClass('active').show('slow');\n      }\n    });\n  };\n\n  return {\n    init: init\n  };\n}();\n\nvar FloatFormGroup = function () {\n  var init = function init() {\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".float-form-group\").each(function () {\n      var floatFormGroup = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);\n      var floatField = floatFormGroup.children('.floatField');\n      floatField.on('focus', function () {\n        floatFormGroup.addClass('active');\n      });\n      floatField.on('blur', function () {\n        if (!floatField.val()) {\n          floatField.addClass(\"invalid\");\n          floatFormGroup.removeClass('active');\n        } else {\n          floatField.removeClass(\"invalid\");\n        }\n      });\n    });\n  };\n\n  return {\n    init: init\n  };\n}();\n\nvar FlexSliderMiddle = function () {\n  var init = function init() {\n    var totalSliderItems = jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".flex-slider-item\").length - 1;\n    var firstSliderVisible = 0;\n    var lastSliderVisible = 2;\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".flex-next-arrow\").on('click', function () {\n      var isToWrap = lastSliderVisible == totalSliderItems;\n      var threshold = lastSliderVisible + 3;\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".flex-slider-item\").removeClass(\"active\").each(function (index, element) {\n        var sliderItem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element);\n        var conditionToAddClass = isToWrap && index <= 2 || index > lastSliderVisible && index <= threshold;\n\n        if (conditionToAddClass) {\n          sliderItem.addClass(\"active\");\n        }\n      });\n\n      if (isToWrap) {\n        firstSliderVisible = 0;\n        lastSliderVisible = 2;\n      } else {\n        firstSliderVisible = lastSliderVisible + 1;\n        lastSliderVisible = threshold;\n      }\n    });\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".flex-prev-arrow\").on('click', function () {\n      var isToWrap = firstSliderVisible == 0;\n      var startAt = isToWrap ? totalSliderItems - 3 : firstSliderVisible - 3;\n      var threshold = startAt + 3;\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".flex-slider-item\").removeClass(\"active\").each(function (index, element) {\n        var sliderItem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element);\n        var conditionToAddClass = isToWrap && index > startAt && index <= threshold;\n\n        if (conditionToAddClass) {\n          sliderItem.addClass(\"active\");\n        }\n\n        var conditionWhenNotToWrap = !isToWrap && index >= startAt && index < threshold;\n\n        if (conditionWhenNotToWrap) {\n          sliderItem.addClass(\"active\");\n        }\n      });\n\n      if (isToWrap) {\n        firstSliderVisible = startAt + 1;\n        lastSliderVisible = threshold;\n      } else {\n        firstSliderVisible = startAt;\n        lastSliderVisible = threshold - 1;\n      }\n    });\n  };\n\n  return {\n    init: init\n  };\n}();\n\njquery__WEBPACK_IMPORTED_MODULE_0___default()(function () {\n  // Anchor to the middle section\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.slide-down-to').on('click', function () {\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.flex')[0].scrollIntoView({\n      behavior: 'smooth'\n    });\n  }); // Slider top\n\n  TopSlider.init(); // FlexSliderMiddle\n\n  FlexSliderMiddle.init(); // Accordion\n\n  Accordion.init(); // Floating labels\n\n  FloatFormGroup.init();\n});\n\n//# sourceURL=webpack:///./js/app.js?");

/***/ }),

/***/ 0:
/*!***************************************!*\
  !*** multi ./css/app.css ./js/app.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./css/app.css */\"./css/app.css\");\nmodule.exports = __webpack_require__(/*! ./js/app.js */\"./js/app.js\");\n\n\n//# sourceURL=webpack:///multi_./css/app.css_./js/app.js?");

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = jQuery;\n\n//# sourceURL=webpack:///external_%22jQuery%22?");

/***/ })

/******/ });