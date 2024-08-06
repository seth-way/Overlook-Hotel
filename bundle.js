/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 2 */
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),
/* 4 */
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 6 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),
/* 7 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),
/* 8 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_buttons_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_content_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_footer_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(15);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_menus_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(16);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_variables_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(17);
// Imports









var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_buttons_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_content_css__WEBPACK_IMPORTED_MODULE_3__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_footer_css__WEBPACK_IMPORTED_MODULE_4__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_5__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_menus_css__WEBPACK_IMPORTED_MODULE_7__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_variables_css__WEBPACK_IMPORTED_MODULE_8__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "*,\n*:before,\n*:after {\n  font-family: Neue Helvetica, helvetica, sans-serif;\n}\n\nbody {\n  margin:0;\n  padding: 0;\n}\n\nbody::-webkit-scrollbar {\n  max-width: 10px;\n}\n\nbody::-webkit-scrollbar-track {\n  background-color: black;\n}\n\nbody::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.4);\n  border-radius: 5px;\n}\n\nbody::-webkit-scrollbar-thumb:hover {\n  background: #555;\n}\n\nh1,\nh2 {\n  text-transform: uppercase;\n  text-align: center;\n}\n\n.hidden,\n.login-required {\n  display: none !important;\n}\n\n.minimized {\n  transform: scaleY(0);\n}\n\n.clear {\n  border-color: transparent !important;\n  color: transparent !important;\n  background: transparent !important;\n  opacity: 0;\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAQA;;;EAGE,kDAAkD;AACpD;;AAEA;EACE,QAAQ;EACR,UAAU;AACZ;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,oCAAoC;EACpC,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;;EAEE,yBAAyB;EACzB,kBAAkB;AACpB;;AAEA;;EAEE,wBAAwB;AAC1B;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,oCAAoC;EACpC,6BAA6B;EAC7B,kCAAkC;EAClC,UAAU;AACZ","sourcesContent":["@import 'buttons';\n@import 'content';\n@import 'footer';\n@import 'header';\n@import 'main';\n@import 'menus';\n@import 'variables';\n\n*,\n*:before,\n*:after {\n  font-family: Neue Helvetica, helvetica, sans-serif;\n}\n\nbody {\n  margin:0;\n  padding: 0;\n}\n\nbody::-webkit-scrollbar {\n  max-width: 10px;\n}\n\nbody::-webkit-scrollbar-track {\n  background-color: black;\n}\n\nbody::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.4);\n  border-radius: 5px;\n}\n\nbody::-webkit-scrollbar-thumb:hover {\n  background: #555;\n}\n\nh1,\nh2 {\n  text-transform: uppercase;\n  text-align: center;\n}\n\n.hidden,\n.login-required {\n  display: none !important;\n}\n\n.minimized {\n  transform: scaleY(0);\n}\n\n.clear {\n  border-color: transparent !important;\n  color: transparent !important;\n  background: transparent !important;\n  opacity: 0;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 9 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 10 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 11 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "button:hover {\n  cursor: pointer;\n  pointer-events: auto;\n}\n\nbutton:disabled {\n  cursor: default;\n  pointer-events: none;\n}\n\nbutton.close {\n  background: transparent;\n  font-weight: 700;\n  font-size: 0.8em;\n  text-transform: uppercase;\n  color: black;\n  border: none;\n  position: absolute;\n\n  @media (max-width: 900px) {\n    font-size: 0.6rem;\n    font-weight: 700;\n  }\n}\n\nbutton.close-menu-btn {\n  color: white;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1em;\n  justify-content: center;\n  top: calc(100% + 1.7rem);\n  right: 0;\n  left: 0;\n\n  @media (max-width: 900px) {\n    top: calc(100% + 0.7rem);\n  }\n\n  @media (max-width: 625px) {\n    top: calc(100% + 0.4rem);\n  }\n\n  p {\n    margin: 0;\n    color: black;\n    z-index: 3;\n  }\n}\n\nbutton.standard {\n  border: 2px solid black;\n  background: #fff;\n  color: #000;\n  padding: 12px 20px;\n  text-transform: uppercase;\n  text-wrap: nowrap;\n  font-size: 0.75rem;\n  font-style: normal;\n  font-weight: 700;\n  transition: filter 0.25s ease-in-out;\n\n  @media (max-width: 900px) {\n    padding: 10px 10px;\n    font-size: 0.6rem;\n  }\n\n  &:hover:enabled {\n    border: 2px solid black;\n    filter: invert(1);\n  }\n\n  &:disabled {\n    background: gray;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/css/buttons.css"],"names":[],"mappings":"AAAA;EACE,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,uBAAuB;EACvB,gBAAgB;EAChB,gBAAgB;EAChB,yBAAyB;EACzB,YAAY;EACZ,YAAY;EACZ,kBAAkB;;EAElB;IACE,iBAAiB;IACjB,gBAAgB;EAClB;AACF;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,QAAQ;EACR,uBAAuB;EACvB,wBAAwB;EACxB,QAAQ;EACR,OAAO;;EAEP;IACE,wBAAwB;EAC1B;;EAEA;IACE,wBAAwB;EAC1B;;EAEA;IACE,SAAS;IACT,YAAY;IACZ,UAAU;EACZ;AACF;;AAEA;EACE,uBAAuB;EACvB,gBAAgB;EAChB,WAAW;EACX,kBAAkB;EAClB,yBAAyB;EACzB,iBAAiB;EACjB,kBAAkB;EAClB,kBAAkB;EAClB,gBAAgB;EAChB,oCAAoC;;EAEpC;IACE,kBAAkB;IAClB,iBAAiB;EACnB;;EAEA;IACE,uBAAuB;IACvB,iBAAiB;EACnB;;EAEA;IACE,gBAAgB;EAClB;AACF","sourcesContent":["button:hover {\n  cursor: pointer;\n  pointer-events: auto;\n}\n\nbutton:disabled {\n  cursor: default;\n  pointer-events: none;\n}\n\nbutton.close {\n  background: transparent;\n  font-weight: 700;\n  font-size: 0.8em;\n  text-transform: uppercase;\n  color: black;\n  border: none;\n  position: absolute;\n\n  @media (max-width: 900px) {\n    font-size: 0.6rem;\n    font-weight: 700;\n  }\n}\n\nbutton.close-menu-btn {\n  color: white;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1em;\n  justify-content: center;\n  top: calc(100% + 1.7rem);\n  right: 0;\n  left: 0;\n\n  @media (max-width: 900px) {\n    top: calc(100% + 0.7rem);\n  }\n\n  @media (max-width: 625px) {\n    top: calc(100% + 0.4rem);\n  }\n\n  p {\n    margin: 0;\n    color: black;\n    z-index: 3;\n  }\n}\n\nbutton.standard {\n  border: 2px solid black;\n  background: #fff;\n  color: #000;\n  padding: 12px 20px;\n  text-transform: uppercase;\n  text-wrap: nowrap;\n  font-size: 0.75rem;\n  font-style: normal;\n  font-weight: 700;\n  transition: filter 0.25s ease-in-out;\n\n  @media (max-width: 900px) {\n    padding: 10px 10px;\n    font-size: 0.6rem;\n  }\n\n  &:hover:enabled {\n    border: 2px solid black;\n    filter: invert(1);\n  }\n\n  &:disabled {\n    background: gray;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 12 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#menu-content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 2rem;\n  width: calc(100% - 4rem);\n  overflow: hidden;\n  @media (max-width: 900px) {\n    padding: 1rem;\n    width: calc(100% - 2rem);\n  }\n\n  h3 {\n    margin: 0;\n    font-size: 1.2rem;\n    font-weight: 400;\n    letter-spacing: 0.3rem;\n    line-height: 1.4;\n    text-align: center;\n    text-transform: uppercase;\n\n    @media (max-width: 900px) {\n      font-size: 0.8rem;\n    }\n  }\n\n  .room-cards-container {\n    display: flex;\n    align-items: center;\n    justify-content: space-around;\n    flex-wrap: wrap;\n    overflow-y: auto;\n    gap: 2rem;\n    padding: 1rem;\n    @media (max-width: 900px) {\n      gap: 1rem;\n      padding: 0.5rem;\n    }\n\n    .card {\n      height: 11rem;\n      aspect-ratio: 6 / 4;\n      overflow: hidden;\n      border-radius: 3px;\n      box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);\n      display: flex;\n      position: relative;\n      @media (max-width: 900px) {\n        height: 8rem;\n      }\n\n      h4 {\n        background: black;\n        color: white;\n        text-align: center;\n        margin: 0;\n        padding-top: 10%;\n        min-width: 2rem;\n      }\n\n      .room-card-info {\n        display: flex;\n        gap: 0.5rem;\n        padding: 0.5rem;\n        @media (max-width: 900px) {\n          gap: 0.25rem;\n          padding: 0.25rem;\n          font-size: 0.7rem;\n        }\n\n        ul {\n          display: flex;\n          flex-direction: column;\n          justify-content: center;\n          margin: 0;\n          padding: 0;\n          text-align: right;\n        }\n\n        ul:first-child {\n          border-right: 2px solid black;\n          padding-right: 0.25rem;\n        }\n\n        ul:last-child {\n          text-align: left;\n        }\n\n        li {\n          text-wrap: nowrap;\n          text-transform: capitalize;\n          list-style-type: none;\n          margin: 0.25rem;\n          @media (max-width: 900px) {\n            margin: 0.15rem;\n          }\n\n          .red {\n            color: var(--red);\n            font-weight: 800;\n          }\n\n          .green {\n            color: #306844;\n            font-weight: 800;\n          }\n        }\n      }\n\n      .booking-btn {\n        height: 20%;\n        width: 50%;\n        display: flex;\n        align-items: flex-end;\n        justify-content: flex-end;\n        gap: 0.2rem;\n        border: 0;\n        position: absolute;\n        right: 5%;\n        bottom: 5%;\n        border: none;\n        background-color: rgba(0, 0, 0, 0);\n        padding: 0;\n        transition: all 0.25s ease-in-out;\n\n        span {\n          background-color: black;\n          color: white;\n          padding: 0.25rem;\n          border-radius: 0.1rem;\n          transition: transform 0.35s ease-in-out;\n          transform: scale(0, 0);\n          transform-origin: bottom right;\n\n          @media (max-width: 900px) {\n            font-size: 0.5rem;\n          }\n        }\n\n        .booking-cal-icon {\n          height: 100%;\n          width: auto;\n          padding: 0;\n\n          transition: all 0.25s ease-in-out;\n          transform-origin: right;\n        }\n\n        .dynamic {\n          fill: black;\n        }\n      }\n\n      .booking-btn:hover {\n        cursor: pointer;\n        transform: scale(1.05) translate(-3%, -1%);\n\n        span {\n          transform: scale(1);\n        }\n\n        .booking-cal-icon {\n          background-color: rgba(0, 0, 0, 0.04);\n        }\n\n        .dynamic {\n          fill: green;\n        }\n      }\n    }\n  }\n\n  #bookings-lists {\n    min-width: 80%;\n    overflow-y: auto;\n    @media (max-width: 900px) {\n      font-size: 0.8rem;\n    }\n\n    h4 {\n      text-transform: capitalize;\n    }\n\n    ul {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n    }\n\n    li > span {\n      display: flex;\n      gap: 1rem;\n\n      .booking-date {\n        width: 10rem;\n        @media (max-width: 900px) {\n          width: 7rem;\n        }\n      }\n\n      .booking-room {\n        width: 6rem;\n        @media (max-width: 900px) {\n          width: 4rem;\n        }\n      }\n\n      .booking-price {\n        width: 7rem;\n        @media (max-width: 900px) {\n          width: 6rem;\n        }\n      }\n    }\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/css/content.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,aAAa;EACb,wBAAwB;EACxB,gBAAgB;EAChB;IACE,aAAa;IACb,wBAAwB;EAC1B;;EAEA;IACE,SAAS;IACT,iBAAiB;IACjB,gBAAgB;IAChB,sBAAsB;IACtB,gBAAgB;IAChB,kBAAkB;IAClB,yBAAyB;;IAEzB;MACE,iBAAiB;IACnB;EACF;;EAEA;IACE,aAAa;IACb,mBAAmB;IACnB,6BAA6B;IAC7B,eAAe;IACf,gBAAgB;IAChB,SAAS;IACT,aAAa;IACb;MACE,SAAS;MACT,eAAe;IACjB;;IAEA;MACE,aAAa;MACb,mBAAmB;MACnB,gBAAgB;MAChB,kBAAkB;MAClB,2CAA2C;MAC3C,aAAa;MACb,kBAAkB;MAClB;QACE,YAAY;MACd;;MAEA;QACE,iBAAiB;QACjB,YAAY;QACZ,kBAAkB;QAClB,SAAS;QACT,gBAAgB;QAChB,eAAe;MACjB;;MAEA;QACE,aAAa;QACb,WAAW;QACX,eAAe;QACf;UACE,YAAY;UACZ,gBAAgB;UAChB,iBAAiB;QACnB;;QAEA;UACE,aAAa;UACb,sBAAsB;UACtB,uBAAuB;UACvB,SAAS;UACT,UAAU;UACV,iBAAiB;QACnB;;QAEA;UACE,6BAA6B;UAC7B,sBAAsB;QACxB;;QAEA;UACE,gBAAgB;QAClB;;QAEA;UACE,iBAAiB;UACjB,0BAA0B;UAC1B,qBAAqB;UACrB,eAAe;UACf;YACE,eAAe;UACjB;;UAEA;YACE,iBAAiB;YACjB,gBAAgB;UAClB;;UAEA;YACE,cAAc;YACd,gBAAgB;UAClB;QACF;MACF;;MAEA;QACE,WAAW;QACX,UAAU;QACV,aAAa;QACb,qBAAqB;QACrB,yBAAyB;QACzB,WAAW;QACX,SAAS;QACT,kBAAkB;QAClB,SAAS;QACT,UAAU;QACV,YAAY;QACZ,kCAAkC;QAClC,UAAU;QACV,iCAAiC;;QAEjC;UACE,uBAAuB;UACvB,YAAY;UACZ,gBAAgB;UAChB,qBAAqB;UACrB,uCAAuC;UACvC,sBAAsB;UACtB,8BAA8B;;UAE9B;YACE,iBAAiB;UACnB;QACF;;QAEA;UACE,YAAY;UACZ,WAAW;UACX,UAAU;;UAEV,iCAAiC;UACjC,uBAAuB;QACzB;;QAEA;UACE,WAAW;QACb;MACF;;MAEA;QACE,eAAe;QACf,0CAA0C;;QAE1C;UACE,mBAAmB;QACrB;;QAEA;UACE,qCAAqC;QACvC;;QAEA;UACE,WAAW;QACb;MACF;IACF;EACF;;EAEA;IACE,cAAc;IACd,gBAAgB;IAChB;MACE,iBAAiB;IACnB;;IAEA;MACE,0BAA0B;IAC5B;;IAEA;MACE,aAAa;MACb,sBAAsB;MACtB,mBAAmB;IACrB;;IAEA;MACE,aAAa;MACb,SAAS;;MAET;QACE,YAAY;QACZ;UACE,WAAW;QACb;MACF;;MAEA;QACE,WAAW;QACX;UACE,WAAW;QACb;MACF;;MAEA;QACE,WAAW;QACX;UACE,WAAW;QACb;MACF;IACF;EACF;AACF","sourcesContent":["#menu-content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 2rem;\n  width: calc(100% - 4rem);\n  overflow: hidden;\n  @media (max-width: 900px) {\n    padding: 1rem;\n    width: calc(100% - 2rem);\n  }\n\n  h3 {\n    margin: 0;\n    font-size: 1.2rem;\n    font-weight: 400;\n    letter-spacing: 0.3rem;\n    line-height: 1.4;\n    text-align: center;\n    text-transform: uppercase;\n\n    @media (max-width: 900px) {\n      font-size: 0.8rem;\n    }\n  }\n\n  .room-cards-container {\n    display: flex;\n    align-items: center;\n    justify-content: space-around;\n    flex-wrap: wrap;\n    overflow-y: auto;\n    gap: 2rem;\n    padding: 1rem;\n    @media (max-width: 900px) {\n      gap: 1rem;\n      padding: 0.5rem;\n    }\n\n    .card {\n      height: 11rem;\n      aspect-ratio: 6 / 4;\n      overflow: hidden;\n      border-radius: 3px;\n      box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);\n      display: flex;\n      position: relative;\n      @media (max-width: 900px) {\n        height: 8rem;\n      }\n\n      h4 {\n        background: black;\n        color: white;\n        text-align: center;\n        margin: 0;\n        padding-top: 10%;\n        min-width: 2rem;\n      }\n\n      .room-card-info {\n        display: flex;\n        gap: 0.5rem;\n        padding: 0.5rem;\n        @media (max-width: 900px) {\n          gap: 0.25rem;\n          padding: 0.25rem;\n          font-size: 0.7rem;\n        }\n\n        ul {\n          display: flex;\n          flex-direction: column;\n          justify-content: center;\n          margin: 0;\n          padding: 0;\n          text-align: right;\n        }\n\n        ul:first-child {\n          border-right: 2px solid black;\n          padding-right: 0.25rem;\n        }\n\n        ul:last-child {\n          text-align: left;\n        }\n\n        li {\n          text-wrap: nowrap;\n          text-transform: capitalize;\n          list-style-type: none;\n          margin: 0.25rem;\n          @media (max-width: 900px) {\n            margin: 0.15rem;\n          }\n\n          .red {\n            color: var(--red);\n            font-weight: 800;\n          }\n\n          .green {\n            color: #306844;\n            font-weight: 800;\n          }\n        }\n      }\n\n      .booking-btn {\n        height: 20%;\n        width: 50%;\n        display: flex;\n        align-items: flex-end;\n        justify-content: flex-end;\n        gap: 0.2rem;\n        border: 0;\n        position: absolute;\n        right: 5%;\n        bottom: 5%;\n        border: none;\n        background-color: rgba(0, 0, 0, 0);\n        padding: 0;\n        transition: all 0.25s ease-in-out;\n\n        span {\n          background-color: black;\n          color: white;\n          padding: 0.25rem;\n          border-radius: 0.1rem;\n          transition: transform 0.35s ease-in-out;\n          transform: scale(0, 0);\n          transform-origin: bottom right;\n\n          @media (max-width: 900px) {\n            font-size: 0.5rem;\n          }\n        }\n\n        .booking-cal-icon {\n          height: 100%;\n          width: auto;\n          padding: 0;\n\n          transition: all 0.25s ease-in-out;\n          transform-origin: right;\n        }\n\n        .dynamic {\n          fill: black;\n        }\n      }\n\n      .booking-btn:hover {\n        cursor: pointer;\n        transform: scale(1.05) translate(-3%, -1%);\n\n        span {\n          transform: scale(1);\n        }\n\n        .booking-cal-icon {\n          background-color: rgba(0, 0, 0, 0.04);\n        }\n\n        .dynamic {\n          fill: green;\n        }\n      }\n    }\n  }\n\n  #bookings-lists {\n    min-width: 80%;\n    overflow-y: auto;\n    @media (max-width: 900px) {\n      font-size: 0.8rem;\n    }\n\n    h4 {\n      text-transform: capitalize;\n    }\n\n    ul {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n    }\n\n    li > span {\n      display: flex;\n      gap: 1rem;\n\n      .booking-date {\n        width: 10rem;\n        @media (max-width: 900px) {\n          width: 7rem;\n        }\n      }\n\n      .booking-room {\n        width: 6rem;\n        @media (max-width: 900px) {\n          width: 4rem;\n        }\n      }\n\n      .booking-price {\n        width: 7rem;\n        @media (max-width: 900px) {\n          width: 6rem;\n        }\n      }\n    }\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 13 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "footer {\n  width: 100%;\n  min-height: 5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 2em;\n  background: black;\n  color: #8d96a0;\n  font-size: 0.8rem;\n  font-weight: 300;\n\n  a {\n    text-decoration: none;\n    color: white;\n  }\n\n  a:hover img {\n    filter: drop-shadow(0 0 6px rgba(107, 198, 68, 0.8));\n  }\n\n  a:last-child:hover img {\n    filter: drop-shadow(0 0 6px rgba(0, 114, 177, 0.8));\n  }\n\n  .social-links {\n    display: flex;\n    gap: 1rem;\n  }\n\n  img {\n    height: 2em;\n    transition: all 0.5s ease-in-out;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/css/footer.css"],"names":[],"mappings":"AAAA;EACE,WAAW;EACX,gBAAgB;EAChB,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,QAAQ;EACR,iBAAiB;EACjB,cAAc;EACd,iBAAiB;EACjB,gBAAgB;;EAEhB;IACE,qBAAqB;IACrB,YAAY;EACd;;EAEA;IACE,oDAAoD;EACtD;;EAEA;IACE,mDAAmD;EACrD;;EAEA;IACE,aAAa;IACb,SAAS;EACX;;EAEA;IACE,WAAW;IACX,gCAAgC;EAClC;AACF","sourcesContent":["footer {\n  width: 100%;\n  min-height: 5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 2em;\n  background: black;\n  color: #8d96a0;\n  font-size: 0.8rem;\n  font-weight: 300;\n\n  a {\n    text-decoration: none;\n    color: white;\n  }\n\n  a:hover img {\n    filter: drop-shadow(0 0 6px rgba(107, 198, 68, 0.8));\n  }\n\n  a:last-child:hover img {\n    filter: drop-shadow(0 0 6px rgba(0, 114, 177, 0.8));\n  }\n\n  .social-links {\n    display: flex;\n    gap: 1rem;\n  }\n\n  img {\n    height: 2em;\n    transition: all 0.5s ease-in-out;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 14 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body > header {\n  height: 100vh;\n  width: 100vw;\n  color: white;\n  background-image: linear-gradient(black, transparent, black);\n  background-size: cover;\n  background-position: center;\n  background-blend-mode: overlay;\n  overflow: hidden;\n\n  nav {\n    padding: 1em 3em;\n    color: white;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n\n    @media (max-width: 900px) {\n      padding: 1rem 1rem;\n\n      & > div:last-child {\n        display: flex;\n        flex-direction: row-reverse;\n        align-items: center;\n        gap: 0.25rem;\n\n        #user-login-grp {\n          margin: 0;\n        }\n\n        ul.menu-options {\n          padding: 0;\n          margin: 0;\n          li {\n            margin: 0;\n          }\n        }\n\n        @media (max-width: 600px) {\n          width: 100%;\n          justify-content: center;\n          gap: 10%;\n        }\n      }\n    }\n\n    @media (max-width: 625px) {\n      flex-direction: column;\n    }\n\n    h1 {\n      font-size: 1.5rem;\n      font-style: normal;\n      font-weight: 200;\n      white-space: nowrap;\n      letter-spacing: 0.7rem;\n\n      @media (max-width: 900px) {\n        font-size: 1rem;\n        letter-spacing: 0.3rem;\n      }\n    }\n\n    & > div:first-child {\n      height: 100%;\n      display: flex;\n      align-items: center;\n      justify-content: flex-start;\n      gap: 0.25em;\n\n      img {\n        height: 3rem;\n        aspect-ratio: 1 / 1;\n\n        @media (max-width: 900px) {\n          height: 1.5rem;\n        }\n      }\n    }\n\n    #user-login-grp {\n      display: flex;\n      align-items: center;\n      height: 1em;\n      justify-content: flex-end;\n      margin-bottom: 1em;\n      @media (max-width: 900px) {\n        height: 0.7rem;\n        p {\n          font-size: 0.7rem;\n        }\n      }\n    }\n\n    #upser-login-btn:hover {\n      opacity: 0.6;\n    }\n\n    #open-logout-btn {\n      position: relative;\n      overflow: visible;\n      z-index: 4;\n      opacity: 1;\n      &:hover {\n        cursor: auto;\n        opacity: 1;\n      }\n    }\n\n    #open-logout-btn .tool-tip {\n      min-width: 100px;\n      transform: scale(0);\n      visibility: none;\n      background-color: black;\n      color: white;\n      border: 2px solid white;\n      text-align: center;\n      padding: 0.25rem 1rem;\n      transition: transform 0.5s ease-in-out;\n      transform-origin: top right;\n      display: flex;\n      align-items: center;\n      gap: 1rem;\n      position: absolute;\n      top: 0;\n      right: 0;\n      z-index: 4;\n\n      @media (max-width: 600px) {\n        font-size: 0.7rem;\n        text-wrap: nowrap;\n      }\n\n      h2 {\n        color: white;\n        margin: 0;\n        font-size: 0.8rem;\n        text-wrap: nowrap;\n      }\n\n      hr {\n        height: 1rem;\n        border-style: solid;\n      }\n\n      ul {\n        padding: 0;\n        margin: 0;\n\n        li {\n          list-style-type: none;\n          text-wrap: nowrap;\n        }\n      }\n    }\n\n    #open-logout-btn:hover .tool-tip,\n    .tool-tip:hover {\n      visibility: visible;\n      transform: scale(1);\n      pointer-events: auto;\n\n      ul {\n        cursor: pointer;\n\n        &:hover {\n          filter: brightness(0.7);\n        }\n      }\n    }\n\n    #open-logout-btn.active .tool-tip {\n      visibility: visible;\n      transform: scale(1);\n      pointer-events: auto;\n    }\n\n    .login {\n      height: 100%;\n      display: flex;\n      align-items: center;\n      gap: 0.5em;\n      text-transform: none;\n      border: none;\n      background: transparent;\n      color: white;\n      img {\n        height: 100%;\n        width: auto;\n        aspect-ratio: 1 / 1;\n        color: white;\n      }\n    }\n\n    ul.menu-options {\n      margin: 0;\n      display: flex;\n      gap: 1em;\n\n      li {\n        list-style: none;\n        position: relative;\n        margin: 1.5em 0;\n      }\n\n      img {\n        height: 0.8em;\n      }\n    }\n  }\n}\n\n#header-img-container {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 100vh;\n  background-image: var(--bg-img);\n  background-size: cover;\n  background-position: center;\n  -webkit-transition: opacity 1s ease-in-out;\n  -moz-transition: opacity 1s ease-in-out;\n  -o-transition: opacity 1s ease-in-out;\n  transition: background-image 1s ease-in;\n  z-index: -2;\n}\n", "",{"version":3,"sources":["webpack://./src/css/header.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,YAAY;EACZ,YAAY;EACZ,4DAA4D;EAC5D,sBAAsB;EACtB,2BAA2B;EAC3B,8BAA8B;EAC9B,gBAAgB;;EAEhB;IACE,gBAAgB;IAChB,YAAY;IACZ,aAAa;IACb,8BAA8B;IAC9B,mBAAmB;;IAEnB;MACE,kBAAkB;;MAElB;QACE,aAAa;QACb,2BAA2B;QAC3B,mBAAmB;QACnB,YAAY;;QAEZ;UACE,SAAS;QACX;;QAEA;UACE,UAAU;UACV,SAAS;UACT;YACE,SAAS;UACX;QACF;;QAEA;UACE,WAAW;UACX,uBAAuB;UACvB,QAAQ;QACV;MACF;IACF;;IAEA;MACE,sBAAsB;IACxB;;IAEA;MACE,iBAAiB;MACjB,kBAAkB;MAClB,gBAAgB;MAChB,mBAAmB;MACnB,sBAAsB;;MAEtB;QACE,eAAe;QACf,sBAAsB;MACxB;IACF;;IAEA;MACE,YAAY;MACZ,aAAa;MACb,mBAAmB;MACnB,2BAA2B;MAC3B,WAAW;;MAEX;QACE,YAAY;QACZ,mBAAmB;;QAEnB;UACE,cAAc;QAChB;MACF;IACF;;IAEA;MACE,aAAa;MACb,mBAAmB;MACnB,WAAW;MACX,yBAAyB;MACzB,kBAAkB;MAClB;QACE,cAAc;QACd;UACE,iBAAiB;QACnB;MACF;IACF;;IAEA;MACE,YAAY;IACd;;IAEA;MACE,kBAAkB;MAClB,iBAAiB;MACjB,UAAU;MACV,UAAU;MACV;QACE,YAAY;QACZ,UAAU;MACZ;IACF;;IAEA;MACE,gBAAgB;MAChB,mBAAmB;MACnB,gBAAgB;MAChB,uBAAuB;MACvB,YAAY;MACZ,uBAAuB;MACvB,kBAAkB;MAClB,qBAAqB;MACrB,sCAAsC;MACtC,2BAA2B;MAC3B,aAAa;MACb,mBAAmB;MACnB,SAAS;MACT,kBAAkB;MAClB,MAAM;MACN,QAAQ;MACR,UAAU;;MAEV;QACE,iBAAiB;QACjB,iBAAiB;MACnB;;MAEA;QACE,YAAY;QACZ,SAAS;QACT,iBAAiB;QACjB,iBAAiB;MACnB;;MAEA;QACE,YAAY;QACZ,mBAAmB;MACrB;;MAEA;QACE,UAAU;QACV,SAAS;;QAET;UACE,qBAAqB;UACrB,iBAAiB;QACnB;MACF;IACF;;IAEA;;MAEE,mBAAmB;MACnB,mBAAmB;MACnB,oBAAoB;;MAEpB;QACE,eAAe;;QAEf;UACE,uBAAuB;QACzB;MACF;IACF;;IAEA;MACE,mBAAmB;MACnB,mBAAmB;MACnB,oBAAoB;IACtB;;IAEA;MACE,YAAY;MACZ,aAAa;MACb,mBAAmB;MACnB,UAAU;MACV,oBAAoB;MACpB,YAAY;MACZ,uBAAuB;MACvB,YAAY;MACZ;QACE,YAAY;QACZ,WAAW;QACX,mBAAmB;QACnB,YAAY;MACd;IACF;;IAEA;MACE,SAAS;MACT,aAAa;MACb,QAAQ;;MAER;QACE,gBAAgB;QAChB,kBAAkB;QAClB,eAAe;MACjB;;MAEA;QACE,aAAa;MACf;IACF;EACF;AACF;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,QAAQ;EACR,aAAa;EACb,+BAA+B;EAC/B,sBAAsB;EACtB,2BAA2B;EAC3B,0CAA0C;EAC1C,uCAAuC;EACvC,qCAAqC;EACrC,uCAAuC;EACvC,WAAW;AACb","sourcesContent":["body > header {\n  height: 100vh;\n  width: 100vw;\n  color: white;\n  background-image: linear-gradient(black, transparent, black);\n  background-size: cover;\n  background-position: center;\n  background-blend-mode: overlay;\n  overflow: hidden;\n\n  nav {\n    padding: 1em 3em;\n    color: white;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n\n    @media (max-width: 900px) {\n      padding: 1rem 1rem;\n\n      & > div:last-child {\n        display: flex;\n        flex-direction: row-reverse;\n        align-items: center;\n        gap: 0.25rem;\n\n        #user-login-grp {\n          margin: 0;\n        }\n\n        ul.menu-options {\n          padding: 0;\n          margin: 0;\n          li {\n            margin: 0;\n          }\n        }\n\n        @media (max-width: 600px) {\n          width: 100%;\n          justify-content: center;\n          gap: 10%;\n        }\n      }\n    }\n\n    @media (max-width: 625px) {\n      flex-direction: column;\n    }\n\n    h1 {\n      font-size: 1.5rem;\n      font-style: normal;\n      font-weight: 200;\n      white-space: nowrap;\n      letter-spacing: 0.7rem;\n\n      @media (max-width: 900px) {\n        font-size: 1rem;\n        letter-spacing: 0.3rem;\n      }\n    }\n\n    & > div:first-child {\n      height: 100%;\n      display: flex;\n      align-items: center;\n      justify-content: flex-start;\n      gap: 0.25em;\n\n      img {\n        height: 3rem;\n        aspect-ratio: 1 / 1;\n\n        @media (max-width: 900px) {\n          height: 1.5rem;\n        }\n      }\n    }\n\n    #user-login-grp {\n      display: flex;\n      align-items: center;\n      height: 1em;\n      justify-content: flex-end;\n      margin-bottom: 1em;\n      @media (max-width: 900px) {\n        height: 0.7rem;\n        p {\n          font-size: 0.7rem;\n        }\n      }\n    }\n\n    #upser-login-btn:hover {\n      opacity: 0.6;\n    }\n\n    #open-logout-btn {\n      position: relative;\n      overflow: visible;\n      z-index: 4;\n      opacity: 1;\n      &:hover {\n        cursor: auto;\n        opacity: 1;\n      }\n    }\n\n    #open-logout-btn .tool-tip {\n      min-width: 100px;\n      transform: scale(0);\n      visibility: none;\n      background-color: black;\n      color: white;\n      border: 2px solid white;\n      text-align: center;\n      padding: 0.25rem 1rem;\n      transition: transform 0.5s ease-in-out;\n      transform-origin: top right;\n      display: flex;\n      align-items: center;\n      gap: 1rem;\n      position: absolute;\n      top: 0;\n      right: 0;\n      z-index: 4;\n\n      @media (max-width: 600px) {\n        font-size: 0.7rem;\n        text-wrap: nowrap;\n      }\n\n      h2 {\n        color: white;\n        margin: 0;\n        font-size: 0.8rem;\n        text-wrap: nowrap;\n      }\n\n      hr {\n        height: 1rem;\n        border-style: solid;\n      }\n\n      ul {\n        padding: 0;\n        margin: 0;\n\n        li {\n          list-style-type: none;\n          text-wrap: nowrap;\n        }\n      }\n    }\n\n    #open-logout-btn:hover .tool-tip,\n    .tool-tip:hover {\n      visibility: visible;\n      transform: scale(1);\n      pointer-events: auto;\n\n      ul {\n        cursor: pointer;\n\n        &:hover {\n          filter: brightness(0.7);\n        }\n      }\n    }\n\n    #open-logout-btn.active .tool-tip {\n      visibility: visible;\n      transform: scale(1);\n      pointer-events: auto;\n    }\n\n    .login {\n      height: 100%;\n      display: flex;\n      align-items: center;\n      gap: 0.5em;\n      text-transform: none;\n      border: none;\n      background: transparent;\n      color: white;\n      img {\n        height: 100%;\n        width: auto;\n        aspect-ratio: 1 / 1;\n        color: white;\n      }\n    }\n\n    ul.menu-options {\n      margin: 0;\n      display: flex;\n      gap: 1em;\n\n      li {\n        list-style: none;\n        position: relative;\n        margin: 1.5em 0;\n      }\n\n      img {\n        height: 0.8em;\n      }\n    }\n  }\n}\n\n#header-img-container {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 100vh;\n  background-image: var(--bg-img);\n  background-size: cover;\n  background-position: center;\n  -webkit-transition: opacity 1s ease-in-out;\n  -moz-transition: opacity 1s ease-in-out;\n  -o-transition: opacity 1s ease-in-out;\n  transition: background-image 1s ease-in;\n  z-index: -2;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 15 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "main {\n  background: white;\n  color: black;\n  min-height: 80vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n\n  h2 {\n    width: 100%;\n    background: black;\n    color: white;\n    margin: 0;\n    padding: 3rem 0;\n    font-size: 1.5rem;\n    font-style: normal;\n    font-weight: 200;\n    letter-spacing: 0.16em;\n    line-height: 1.3em;\n    text-transform: uppercase;\n\n    @media (max-width: 800px) {\n      padding: 1rem 0rem;\n      font-size: 1rem;\n    }\n  }\n\n  > div {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-wrap: wrap;\n    padding: 7rem 1rem;\n    gap: 2rem;\n\n    @media (max-width: 800px) {\n      padding: 1.5rem 1rem;\n      gap: 1rem;\n    }\n  }\n\n  article {\n    width: 300px;\n    height: 550px;\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n\n    figure {\n      margin: 0;\n      width: 100%;\n      height: 75%;\n\n      img {\n        width: 100%;\n        max-height: 100%;\n        object-fit: cover;\n      }\n    }\n\n    h3 {\n      font-size: 0.9rem;\n      font-style: normal;\n      font-weight: 700;\n      letter-spacing: 0.25rem;\n      line-height: 1.3rem;\n      text-transform: uppercase;\n      margin: 1rem 0 0.25rem 0;\n    }\n\n    p {\n      font-size: 0.9rem;\n      font-style: normal;\n      font-weight: 200;\n      etter-spacing: 0.03rem;\n      line-height: 1.7rem;\n      margin: 0;\n\n      @media (max-width: 800px) {\n        font-size: 0.75rem;\n        line-height: 1.2rem;\n      }\n    }\n\n    button {\n      border: none;\n      background: transparent;\n      color: var(--red);\n      padding: 0;\n      font: inherit;\n    }\n  }\n\n  section {\n    display: flex;\n    flex-direction: column;\n    gap: 2rem;\n\n    @media (max-width: 800px) {\n      gap: 1rem;\n    }\n  }\n\n  section article {\n    height: 270px;\n  }\n\n  a {\n    text-decoration: none;\n    color: var(--red);\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/css/main.css"],"names":[],"mappings":"AAAA;EACE,iBAAiB;EACjB,YAAY;EACZ,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;;EAEnB;IACE,WAAW;IACX,iBAAiB;IACjB,YAAY;IACZ,SAAS;IACT,eAAe;IACf,iBAAiB;IACjB,kBAAkB;IAClB,gBAAgB;IAChB,sBAAsB;IACtB,kBAAkB;IAClB,yBAAyB;;IAEzB;MACE,kBAAkB;MAClB,eAAe;IACjB;EACF;;EAEA;IACE,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,eAAe;IACf,kBAAkB;IAClB,SAAS;;IAET;MACE,oBAAoB;MACpB,SAAS;IACX;EACF;;EAEA;IACE,YAAY;IACZ,aAAa;IACb,aAAa;IACb,sBAAsB;IACtB,uBAAuB;;IAEvB;MACE,SAAS;MACT,WAAW;MACX,WAAW;;MAEX;QACE,WAAW;QACX,gBAAgB;QAChB,iBAAiB;MACnB;IACF;;IAEA;MACE,iBAAiB;MACjB,kBAAkB;MAClB,gBAAgB;MAChB,uBAAuB;MACvB,mBAAmB;MACnB,yBAAyB;MACzB,wBAAwB;IAC1B;;IAEA;MACE,iBAAiB;MACjB,kBAAkB;MAClB,gBAAgB;MAChB,sBAAsB;MACtB,mBAAmB;MACnB,SAAS;;MAET;QACE,kBAAkB;QAClB,mBAAmB;MACrB;IACF;;IAEA;MACE,YAAY;MACZ,uBAAuB;MACvB,iBAAiB;MACjB,UAAU;MACV,aAAa;IACf;EACF;;EAEA;IACE,aAAa;IACb,sBAAsB;IACtB,SAAS;;IAET;MACE,SAAS;IACX;EACF;;EAEA;IACE,aAAa;EACf;;EAEA;IACE,qBAAqB;IACrB,iBAAiB;EACnB;AACF","sourcesContent":["main {\n  background: white;\n  color: black;\n  min-height: 80vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n\n  h2 {\n    width: 100%;\n    background: black;\n    color: white;\n    margin: 0;\n    padding: 3rem 0;\n    font-size: 1.5rem;\n    font-style: normal;\n    font-weight: 200;\n    letter-spacing: 0.16em;\n    line-height: 1.3em;\n    text-transform: uppercase;\n\n    @media (max-width: 800px) {\n      padding: 1rem 0rem;\n      font-size: 1rem;\n    }\n  }\n\n  > div {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-wrap: wrap;\n    padding: 7rem 1rem;\n    gap: 2rem;\n\n    @media (max-width: 800px) {\n      padding: 1.5rem 1rem;\n      gap: 1rem;\n    }\n  }\n\n  article {\n    width: 300px;\n    height: 550px;\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n\n    figure {\n      margin: 0;\n      width: 100%;\n      height: 75%;\n\n      img {\n        width: 100%;\n        max-height: 100%;\n        object-fit: cover;\n      }\n    }\n\n    h3 {\n      font-size: 0.9rem;\n      font-style: normal;\n      font-weight: 700;\n      letter-spacing: 0.25rem;\n      line-height: 1.3rem;\n      text-transform: uppercase;\n      margin: 1rem 0 0.25rem 0;\n    }\n\n    p {\n      font-size: 0.9rem;\n      font-style: normal;\n      font-weight: 200;\n      etter-spacing: 0.03rem;\n      line-height: 1.7rem;\n      margin: 0;\n\n      @media (max-width: 800px) {\n        font-size: 0.75rem;\n        line-height: 1.2rem;\n      }\n    }\n\n    button {\n      border: none;\n      background: transparent;\n      color: var(--red);\n      padding: 0;\n      font: inherit;\n    }\n  }\n\n  section {\n    display: flex;\n    flex-direction: column;\n    gap: 2rem;\n\n    @media (max-width: 800px) {\n      gap: 1rem;\n    }\n  }\n\n  section article {\n    height: 270px;\n  }\n\n  a {\n    text-decoration: none;\n    color: var(--red);\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 16 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#menu-drawer {\n  background: rgba(227, 232, 235, 0.8);\n  transform-origin: top center;\n  transition: transform 0.5s ease-in-out;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n  padding: 2.5rem;\n  overflow: hidden;\n\n  @media (max-width: 900px) {\n    padding: 1.5rem;\n  }\n}\n\n#menu {\n  min-width: max(300px, 50%);\n  max-width: 1100px;\n  max-height: 100%;\n  background: white;\n  color: black;\n  padding: 1rem;\n  border-radius: 2px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n  overflow: hidden;\n\n  header {\n    position: relative;\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n\n    h2 {\n      font-size: 1.5rem;\n      font-weight: 200;\n      letter-spacing: 0.6rem;\n      line-height: 1.4;\n      text-align: center;\n      margin: 1rem 0;\n      @media (max-width: 900px) {\n        font-size: 1rem;\n        letter-spacing: 0.4rem;\n        font-weight: 400;\n      }\n    }\n  }\n\n  form {\n    position: relative;\n    display: flex;\n    align-content: flex-end;\n    justify-content: center;\n    gap: 2rem;\n    width: 100%;\n\n    @media (max-width: 900px) {\n      flex-wrap: wrap;\n      row-gap: 0.25rem;\n      column-gap: 1rem;\n    }\n\n    [class$='group'] {\n      --default: black;\n      --invalid: red;\n      --isValid-color: black;\n      color: var(--isValid-color);\n      border-bottom: 2px solid var(--isValid-color);\n      width: 100%;\n      max-width: 30rem;\n      display: flex;\n      align-items: flex-end;\n      justify-content: space-between;\n      gap: 0.25rem;\n\n      @media (max-width: 900px) {\n        &.date-type {\n          max-width: 10rem;\n        }\n        &.room-type {\n          max-width: 15rem;\n        }\n        &.bed-type {\n          max-width: 10rem;\n        }\n        &.bed-count-type {\n          max-width: 6rem;\n        }\n\n        &.bidet-type {\n          max-width: 8rem;\n\n          .switch {\n            transform: scale(0.8);\n          }\n        }\n      }\n\n      & > * {\n        margin: 0.25rem;\n      }\n\n      span {\n        margin: 0.25rem 0;\n        @media (max-width: 900px) {\n          margin: 0.15rem 0;\n        }\n      }\n\n      label,\n      legend,\n      span {\n        text-wrap: nowrap;\n        @media (max-width: 900px) {\n          font-size: 0.8rem;\n        }\n        @media (max-width: 425px) {\n          font-size: 0.65rem;\n        }\n      }\n\n      legend {\n        font-weight: bold;\n      }\n\n      input {\n        height: 1.5rem;\n        width: 100%;\n        border: none;\n        color: var(--isValid-color);\n        accent-color: var(--red);\n\n        &:hover {\n          cursor: pointer;\n        }\n      }\n\n      select {\n        border: none;\n\n        &:hover {\n          cursor: pointer;\n        }\n      }\n    }\n\n    .cost-summary-group {\n      color: #616161;\n      b,\n      #spent-upcoming,\n      #spent-past,\n      #spent-total {\n        color: black;\n      }\n\n      hr {\n        border: none;\n        background-color: var(--red);\n        width: 2px;\n        height: 1.2rem;\n      }\n      @media (max-width: 900px) {\n        justify-content: center;\n        gap: 0.25rem;\n        width: auto;\n      }\n    }\n\n    .radio-input-group {\n      align-items: center;\n      gap: 0;\n\n      label {\n        margin-left: 1em;\n\n        @media (max-width: 900px) {\n          margin-left: 0.25rem;\n        }\n      }\n\n      input[type='radio'] {\n        accent-color: var(--red);\n        @media (max-width: 600px) {\n          height: 0.75rem;\n        }\n      }\n    }\n\n    .toggle-group {\n      .switch {\n        position: relative;\n        display: inline-block;\n        width: 35px;\n        height: 26px;\n      }\n\n      /* Hide default HTML checkbox */\n      .switch input {\n        opacity: 0;\n        width: 0;\n        height: 0;\n      }\n\n      /* The slider */\n      .slider {\n        position: absolute;\n        cursor: pointer;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        border-radius: 13px;\n        background-color: #ccc;\n        -webkit-transition: 0.4s;\n        transition: 0.4s;\n      }\n\n      .slider:before {\n        position: absolute;\n        content: '';\n        height: 90%;\n        aspect-ratio: 1 / 1;\n        left: 1px;\n        bottom: 1px;\n        background-color: white;\n        -webkit-transition: 0.4s;\n        transition: 0.4s;\n        border-radius: 50%;\n      }\n\n      input:checked + .slider {\n        background-color: black;\n      }\n\n      input:focus + .slider {\n        box-shadow: 0 0 1px black;\n      }\n\n      input:checked + .slider:before {\n        -webkit-transform: translateX(15px);\n        -ms-transform: translateX(15px);\n        transform: translateX(15px);\n      }\n    }\n\n    fieldset {\n      border: none;\n      padding: 0;\n    }\n\n    button {\n      text-transform: uppercase;\n      text-wrap: nowrap;\n    }\n\n    #login-submit-btn {\n      position: absolute;\n      bottom: 0;\n      right: 0;\n    }\n  }\n\n  #login-form {\n    flex-direction: column;\n    align-items: center;\n    padding: 4rem 0;\n  }\n\n  #check-dates-form {\n    min-width: min(95vw, 1100px);\n  }\n\n  button.close {\n    color: black;\n    font-weight: 700;\n    font-size: 0.8em;\n    position: absolute;\n    top: 0;\n    right: 0;\n    text-transform: uppercase;\n\n    &:hover {\n      cursor: pointer;\n    }\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/css/menus.css"],"names":[],"mappings":"AAAA;EACE,oCAAoC;EACpC,4BAA4B;EAC5B,sCAAsC;EACtC,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,2BAA2B;EAC3B,eAAe;EACf,gBAAgB;;EAEhB;IACE,eAAe;EACjB;AACF;;AAEA;EACE,0BAA0B;EAC1B,iBAAiB;EACjB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;EACZ,aAAa;EACb,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,kBAAkB;EAClB,gBAAgB;;EAEhB;IACE,kBAAkB;IAClB,WAAW;IACX,aAAa;IACb,sBAAsB;IACtB,mBAAmB;;IAEnB;MACE,iBAAiB;MACjB,gBAAgB;MAChB,sBAAsB;MACtB,gBAAgB;MAChB,kBAAkB;MAClB,cAAc;MACd;QACE,eAAe;QACf,sBAAsB;QACtB,gBAAgB;MAClB;IACF;EACF;;EAEA;IACE,kBAAkB;IAClB,aAAa;IACb,uBAAuB;IACvB,uBAAuB;IACvB,SAAS;IACT,WAAW;;IAEX;MACE,eAAe;MACf,gBAAgB;MAChB,gBAAgB;IAClB;;IAEA;MACE,gBAAgB;MAChB,cAAc;MACd,sBAAsB;MACtB,2BAA2B;MAC3B,6CAA6C;MAC7C,WAAW;MACX,gBAAgB;MAChB,aAAa;MACb,qBAAqB;MACrB,8BAA8B;MAC9B,YAAY;;MAEZ;QACE;UACE,gBAAgB;QAClB;QACA;UACE,gBAAgB;QAClB;QACA;UACE,gBAAgB;QAClB;QACA;UACE,eAAe;QACjB;;QAEA;UACE,eAAe;;UAEf;YACE,qBAAqB;UACvB;QACF;MACF;;MAEA;QACE,eAAe;MACjB;;MAEA;QACE,iBAAiB;QACjB;UACE,iBAAiB;QACnB;MACF;;MAEA;;;QAGE,iBAAiB;QACjB;UACE,iBAAiB;QACnB;QACA;UACE,kBAAkB;QACpB;MACF;;MAEA;QACE,iBAAiB;MACnB;;MAEA;QACE,cAAc;QACd,WAAW;QACX,YAAY;QACZ,2BAA2B;QAC3B,wBAAwB;;QAExB;UACE,eAAe;QACjB;MACF;;MAEA;QACE,YAAY;;QAEZ;UACE,eAAe;QACjB;MACF;IACF;;IAEA;MACE,cAAc;MACd;;;;QAIE,YAAY;MACd;;MAEA;QACE,YAAY;QACZ,4BAA4B;QAC5B,UAAU;QACV,cAAc;MAChB;MACA;QACE,uBAAuB;QACvB,YAAY;QACZ,WAAW;MACb;IACF;;IAEA;MACE,mBAAmB;MACnB,MAAM;;MAEN;QACE,gBAAgB;;QAEhB;UACE,oBAAoB;QACtB;MACF;;MAEA;QACE,wBAAwB;QACxB;UACE,eAAe;QACjB;MACF;IACF;;IAEA;MACE;QACE,kBAAkB;QAClB,qBAAqB;QACrB,WAAW;QACX,YAAY;MACd;;MAEA,+BAA+B;MAC/B;QACE,UAAU;QACV,QAAQ;QACR,SAAS;MACX;;MAEA,eAAe;MACf;QACE,kBAAkB;QAClB,eAAe;QACf,MAAM;QACN,OAAO;QACP,QAAQ;QACR,SAAS;QACT,mBAAmB;QACnB,sBAAsB;QACtB,wBAAwB;QACxB,gBAAgB;MAClB;;MAEA;QACE,kBAAkB;QAClB,WAAW;QACX,WAAW;QACX,mBAAmB;QACnB,SAAS;QACT,WAAW;QACX,uBAAuB;QACvB,wBAAwB;QACxB,gBAAgB;QAChB,kBAAkB;MACpB;;MAEA;QACE,uBAAuB;MACzB;;MAEA;QACE,yBAAyB;MAC3B;;MAEA;QACE,mCAAmC;QACnC,+BAA+B;QAC/B,2BAA2B;MAC7B;IACF;;IAEA;MACE,YAAY;MACZ,UAAU;IACZ;;IAEA;MACE,yBAAyB;MACzB,iBAAiB;IACnB;;IAEA;MACE,kBAAkB;MAClB,SAAS;MACT,QAAQ;IACV;EACF;;EAEA;IACE,sBAAsB;IACtB,mBAAmB;IACnB,eAAe;EACjB;;EAEA;IACE,4BAA4B;EAC9B;;EAEA;IACE,YAAY;IACZ,gBAAgB;IAChB,gBAAgB;IAChB,kBAAkB;IAClB,MAAM;IACN,QAAQ;IACR,yBAAyB;;IAEzB;MACE,eAAe;IACjB;EACF;AACF","sourcesContent":["#menu-drawer {\n  background: rgba(227, 232, 235, 0.8);\n  transform-origin: top center;\n  transition: transform 0.5s ease-in-out;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n  padding: 2.5rem;\n  overflow: hidden;\n\n  @media (max-width: 900px) {\n    padding: 1.5rem;\n  }\n}\n\n#menu {\n  min-width: max(300px, 50%);\n  max-width: 1100px;\n  max-height: 100%;\n  background: white;\n  color: black;\n  padding: 1rem;\n  border-radius: 2px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n  overflow: hidden;\n\n  header {\n    position: relative;\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n\n    h2 {\n      font-size: 1.5rem;\n      font-weight: 200;\n      letter-spacing: 0.6rem;\n      line-height: 1.4;\n      text-align: center;\n      margin: 1rem 0;\n      @media (max-width: 900px) {\n        font-size: 1rem;\n        letter-spacing: 0.4rem;\n        font-weight: 400;\n      }\n    }\n  }\n\n  form {\n    position: relative;\n    display: flex;\n    align-content: flex-end;\n    justify-content: center;\n    gap: 2rem;\n    width: 100%;\n\n    @media (max-width: 900px) {\n      flex-wrap: wrap;\n      row-gap: 0.25rem;\n      column-gap: 1rem;\n    }\n\n    [class$='group'] {\n      --default: black;\n      --invalid: red;\n      --isValid-color: black;\n      color: var(--isValid-color);\n      border-bottom: 2px solid var(--isValid-color);\n      width: 100%;\n      max-width: 30rem;\n      display: flex;\n      align-items: flex-end;\n      justify-content: space-between;\n      gap: 0.25rem;\n\n      @media (max-width: 900px) {\n        &.date-type {\n          max-width: 10rem;\n        }\n        &.room-type {\n          max-width: 15rem;\n        }\n        &.bed-type {\n          max-width: 10rem;\n        }\n        &.bed-count-type {\n          max-width: 6rem;\n        }\n\n        &.bidet-type {\n          max-width: 8rem;\n\n          .switch {\n            transform: scale(0.8);\n          }\n        }\n      }\n\n      & > * {\n        margin: 0.25rem;\n      }\n\n      span {\n        margin: 0.25rem 0;\n        @media (max-width: 900px) {\n          margin: 0.15rem 0;\n        }\n      }\n\n      label,\n      legend,\n      span {\n        text-wrap: nowrap;\n        @media (max-width: 900px) {\n          font-size: 0.8rem;\n        }\n        @media (max-width: 425px) {\n          font-size: 0.65rem;\n        }\n      }\n\n      legend {\n        font-weight: bold;\n      }\n\n      input {\n        height: 1.5rem;\n        width: 100%;\n        border: none;\n        color: var(--isValid-color);\n        accent-color: var(--red);\n\n        &:hover {\n          cursor: pointer;\n        }\n      }\n\n      select {\n        border: none;\n\n        &:hover {\n          cursor: pointer;\n        }\n      }\n    }\n\n    .cost-summary-group {\n      color: #616161;\n      b,\n      #spent-upcoming,\n      #spent-past,\n      #spent-total {\n        color: black;\n      }\n\n      hr {\n        border: none;\n        background-color: var(--red);\n        width: 2px;\n        height: 1.2rem;\n      }\n      @media (max-width: 900px) {\n        justify-content: center;\n        gap: 0.25rem;\n        width: auto;\n      }\n    }\n\n    .radio-input-group {\n      align-items: center;\n      gap: 0;\n\n      label {\n        margin-left: 1em;\n\n        @media (max-width: 900px) {\n          margin-left: 0.25rem;\n        }\n      }\n\n      input[type='radio'] {\n        accent-color: var(--red);\n        @media (max-width: 600px) {\n          height: 0.75rem;\n        }\n      }\n    }\n\n    .toggle-group {\n      .switch {\n        position: relative;\n        display: inline-block;\n        width: 35px;\n        height: 26px;\n      }\n\n      /* Hide default HTML checkbox */\n      .switch input {\n        opacity: 0;\n        width: 0;\n        height: 0;\n      }\n\n      /* The slider */\n      .slider {\n        position: absolute;\n        cursor: pointer;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        border-radius: 13px;\n        background-color: #ccc;\n        -webkit-transition: 0.4s;\n        transition: 0.4s;\n      }\n\n      .slider:before {\n        position: absolute;\n        content: '';\n        height: 90%;\n        aspect-ratio: 1 / 1;\n        left: 1px;\n        bottom: 1px;\n        background-color: white;\n        -webkit-transition: 0.4s;\n        transition: 0.4s;\n        border-radius: 50%;\n      }\n\n      input:checked + .slider {\n        background-color: black;\n      }\n\n      input:focus + .slider {\n        box-shadow: 0 0 1px black;\n      }\n\n      input:checked + .slider:before {\n        -webkit-transform: translateX(15px);\n        -ms-transform: translateX(15px);\n        transform: translateX(15px);\n      }\n    }\n\n    fieldset {\n      border: none;\n      padding: 0;\n    }\n\n    button {\n      text-transform: uppercase;\n      text-wrap: nowrap;\n    }\n\n    #login-submit-btn {\n      position: absolute;\n      bottom: 0;\n      right: 0;\n    }\n  }\n\n  #login-form {\n    flex-direction: column;\n    align-items: center;\n    padding: 4rem 0;\n  }\n\n  #check-dates-form {\n    min-width: min(95vw, 1100px);\n  }\n\n  button.close {\n    color: black;\n    font-weight: 700;\n    font-size: 0.8em;\n    position: absolute;\n    top: 0;\n    right: 0;\n    text-transform: uppercase;\n\n    &:hover {\n      cursor: pointer;\n    }\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 17 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --offwhite: #e3e8eb;\n  --red: #ba1818;\n}\n", "",{"version":3,"sources":["webpack://./src/css/variables.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,cAAc;AAChB","sourcesContent":[":root {\n  --offwhite: #e3e8eb;\n  --red: #ba1818;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/logo.svg");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/upTriangle.svg");

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/github.png");

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/linkedin.png");

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/tech.png");

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/stanley1.jpg");

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/stanley2.jpg");

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/stanley3.jpg");

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/bg1.jpg");

/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/bg2.jpg");

/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/bg3.jpg");

/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/bg4.jpg");

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/bg5.jpg");

/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/bg6.jpg");

/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/bg7.jpg");

/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/bg8.jpg");

/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/bg9.jpg");

/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   filterRooms: () => (/* binding */ filterRooms),
/* harmony export */   getAvailableRooms: () => (/* binding */ getAvailableRooms),
/* harmony export */   getRoomByNumber: () => (/* binding */ getRoomByNumber),
/* harmony export */   getRoomPrice: () => (/* binding */ getRoomPrice),
/* harmony export */   getRoomTypes: () => (/* binding */ getRoomTypes),
/* harmony export */   updateRoomFilterOptions: () => (/* binding */ updateRoomFilterOptions)
/* harmony export */ });
/* harmony import */ var _bookings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36);
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38);



function getRoomByNumber(roomNumber, rooms) {
  return rooms.find(room => room.number === roomNumber);
}

function getAvailableRooms(date, rooms, bookings) {
  const bookingsOnDate = (0,_bookings__WEBPACK_IMPORTED_MODULE_0__.getBookingsByDate)(date, bookings);
  const bookedRoomNumbers = bookingsOnDate.map(booking => booking.roomNumber);
  return rooms.filter(room => !bookedRoomNumbers.includes(room.number));
}

function getRoomTypes(rooms) {
  const roomCategories = { suites: [], standard: [] };
  return rooms.reduce((acc, room) => {
    const { roomType } = room;
    if (roomType.includes('suite')) {
      if (!acc.suites.includes(roomType)) acc.suites.push(roomType);
    } else {
      if (!acc.standard.includes(roomType)) acc.standard.push(roomType);
    }
    return acc;
  }, roomCategories);
}
//- room filtering functions -//
function filterRooms(filters, rooms, bookings) {
  const { date, roomType, bedSize, bedCount, hasBidet } = filters;
  const availableRooms = getAvailableRooms(new Date(date), rooms, bookings);
  return availableRooms.filter(room => {
    if (hasBidet && !room.bidet) return false;
    if (bedCount && room.numBeds !== Number(bedCount)) return false;
    return room.roomType.includes(roomType) && room.bedSize.includes(bedSize);
  });
}

function getFilterKeyFromInputID(id) {
  const filterKeys = {
    'vacancy-date': 'date',
    'vacancy-room-types': 'roomType',
    'vacancy-bed-sizes': 'bedSize',
    'vacancy-bed-count': 'bedCount',
    'vacancy-bidet': 'hasBidet',
  };

  return filterKeys[id];
}

function updateRoomFilterOptions(id, value, filterOptions) {
  const key = getFilterKeyFromInputID(id);
  filterOptions[key] = key === 'date' ? value.replaceAll('-', '/') : value;

  return filterOptions;
}

function getRoomPrice(roomNumber, rooms) {
  const room = getRoomByNumber(roomNumber, rooms);
  return (0,_utility__WEBPACK_IMPORTED_MODULE_1__.convertToCurrency)(room.costPerNight);
}


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBookingsByCustomer: () => (/* binding */ getBookingsByCustomer),
/* harmony export */   getBookingsByDate: () => (/* binding */ getBookingsByDate),
/* harmony export */   groupBookingsPastVsUpcoming: () => (/* binding */ groupBookingsPastVsUpcoming),
/* harmony export */   sortBookingsByDate: () => (/* binding */ sortBookingsByDate),
/* harmony export */   updateUserBookings: () => (/* binding */ updateUserBookings)
/* harmony export */ });
/* harmony import */ var _customers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37);
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38);
/* harmony import */ var _rooms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(35);




function getBookingsByCustomer(id, bookings) {
  return bookings.filter(booking => booking.userID === id);
}

function getBookingsByDate(date, bookings) {
  return bookings.filter(
    booking => date.valueOf() === new Date(booking.date).valueOf()
  );
}

function groupBookingsPastVsUpcoming(bookings) {
  const initial = { past: [], upcoming: [] };
  const groupedBookings = bookings.reduce((acc, booking) => {
    const bookingDate = new Date(booking.date);
    if (bookingDate.valueOf() < (0,_utility__WEBPACK_IMPORTED_MODULE_1__.getValueOfCurrentDate)()) {
      acc.past.push(booking);
    } else {
      acc.upcoming.push(booking);
    }

    return acc;
  }, initial);

  sortBookingsByDate(groupedBookings.upcoming);
  sortBookingsByDate(groupedBookings.past);

  return groupedBookings;
}

function updateUserBookings(user, userBookings, bookings, rooms) {
  const { id, isAdmin } = user;
  var allUserBookings = isAdmin
    ? bookings
    : getBookingsByCustomer(id, bookings);
  allUserBookings = allUserBookings.map(booking => {
    booking.price = (0,_rooms__WEBPACK_IMPORTED_MODULE_2__.getRoomPrice)(booking.roomNumber, rooms);
    return booking;
  });
  const updates = groupBookingsPastVsUpcoming(allUserBookings);
  updates.totals = {};

  const { totals } = updates;

  totals.past = (0,_customers__WEBPACK_IMPORTED_MODULE_0__.getTotalSpent)(updates.past, rooms);
  totals.upcoming = (0,_customers__WEBPACK_IMPORTED_MODULE_0__.getTotalSpent)(updates.upcoming, rooms);
  totals.total = totals.past + totals.upcoming;

  Object.keys(totals).forEach(key => {
    totals[key] = (0,_utility__WEBPACK_IMPORTED_MODULE_1__.convertToCurrency)(totals[key]);
  });

  userBookings = Object.assign(userBookings, updates);
}

function sortBookingsByDate(bookings) {
  return bookings.sort(
    (a, b) => convertDateToValue(b.date) - convertDateToValue(a.date)
  );
}

function convertDateToValue(date) {
  return new Date(date).valueOf();
}


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTotalSpent: () => (/* binding */ getTotalSpent)
/* harmony export */ });
/* harmony import */ var _rooms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35);


function getTotalSpent(customerBookings, rooms) {
  const bookingPrices = customerBookings.map(booking => {
    const room = (0,_rooms__WEBPACK_IMPORTED_MODULE_0__.getRoomByNumber)(booking.roomNumber, rooms);
    return room ? room.costPerNight : 0;
  });

  return bookingPrices.reduce((total, price) => total + price, 0);
}


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertToCurrency: () => (/* binding */ convertToCurrency),
/* harmony export */   getCurrentDate: () => (/* binding */ getCurrentDate),
/* harmony export */   getValueOfCurrentDate: () => (/* binding */ getValueOfCurrentDate)
/* harmony export */ });
function getCurrentDate() {
  const currentDate = new Date();
  currentDate.setMinutes(
    currentDate.getMinutes() - currentDate.getTimezoneOffset()
  );

  return currentDate.toJSON().slice(0, 10);
}

function getValueOfCurrentDate() {
  return new Date(getCurrentDate().replaceAll('-', '/')).valueOf();
}

function convertToCurrency(number) {
  return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeMenu: () => (/* binding */ closeMenu),
/* harmony export */   hideElement: () => (/* binding */ hideElement),
/* harmony export */   loadContent: () => (/* binding */ loadContent),
/* harmony export */   openMenu: () => (/* binding */ openMenu),
/* harmony export */   showMenuContent: () => (/* binding */ showMenuContent),
/* harmony export */   toggleLoginBtns: () => (/* binding */ toggleLoginBtns),
/* harmony export */   unhideElement: () => (/* binding */ unhideElement)
/* harmony export */ });
/* harmony import */ var _rooms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35);
/* harmony import */ var _uiComponents_roomCards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(40);
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(38);



/*--- DOM ELEMENTS ---*/
//- containers -//
const headerImg = document.getElementById('header-img-container');
const menuDrawer = document.getElementById('menu-drawer');
const menuForms = menuDrawer.querySelectorAll('form');
const menuContent = document.getElementById('menu-content');
//- buttons -//
const userLoginBtns = document.getElementById('user-login-grp');
const openMenuBtns = document.querySelectorAll('.open-menu-btn');
const altCloseBtn = document.getElementById('alt-close-btn');
//- inputs -//
const roomDateInput = document.getElementById('vacancy-date');
const roomTypeSelector = document.getElementById('vacancy-room-types');
//- bookings totals -//
const spentUpcoming = document.getElementById('spent-upcoming');
const spentPast = document.getElementById('spent-past');
const spentTotal = document.getElementById('spent-total');
//- other -//
const menuTitle = menuDrawer.querySelector('h2');
/*--- FUNCTIONS ---*/
function loadContent(rooms) {
  createPageContent(rooms);
  setDefaults();
  updateHeaderBackgroundImg();
}
//- create dynamic content functions -//
function createPageContent(rooms) {
  createSelectorOptions(rooms);
}

function createSelectorOptions(rooms) {
  const defaultOption = createOption('', '', true);
  roomTypeSelector.appendChild(defaultOption);

  const roomTypes = (0,_rooms__WEBPACK_IMPORTED_MODULE_0__.getRoomTypes)(rooms);

  Object.keys(roomTypes).forEach(category => {
    const group = createOptionGrp(category);
    roomTypeSelector.appendChild(group);
    roomTypes[category].forEach(type => {
      const option = createOption(type);
      group.appendChild(option);
    });
  });
}

function createOptionGrp(label) {
  const group = document.createElement('optgroup');
  group.label = label;
  return group;
}

function createOption(value, text, isSelected) {
  text = text || value;
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  if (isSelected) option.selected = true;
  return option;
}
//- create input defaults functions -//
function setDefaults() {
  roomDateInput.value = (0,_utility__WEBPACK_IMPORTED_MODULE_2__.getCurrentDate)();
}
//- animation functions -//
function updateHeaderBackgroundImg(idx = 0) {
  idx = idx % 9;
  const imgUrl = `url('./images/bg${idx + 1}.jpg')`;
  headerImg.style.backgroundImage = imgUrl;

  setTimeout(() => {
    updateHeaderBackgroundImg(idx + 1);
  }, 10000);
}

function toggleLoginBtns() {
  const { children } = userLoginBtns;
  const [loginBtn, logoutBtn] = children;
  if (loginBtn.classList.contains('hidden')) {
    hideElement(logoutBtn, 'hidden');
    unhideElement(loginBtn);
  } else {
    hideElement(loginBtn, 'hidden');
    unhideElement(logoutBtn);
  }
}
//- hide / unhide element -//
function hideElement(element, ...hiddenClasses) {
  element.classList.add(...hiddenClasses);
  element.ariaHidden = 'true';
  element.disabled = true;
}

function unhideElement(element) {
  element.classList.remove('clear', 'minimized', 'hidden');
  element.ariaHidden = 'false';
  element.removeAttribute('disabled');
}
//- menu functions -//
function openMenu(menuType, data, user) {
  showMenuContent(menuType, data, user);
  unhideElement(menuDrawer);
}

function closeMenu(closeBtn) {
  openMenuBtns.forEach(button => {
    unhideElement(button);
  });

  hideElement(menuDrawer, 'minimized');
  setTimeout(() => {
    openMenuBtns.forEach(button => unhideElement(button));
    if (closeBtn) {
      hideElement(closeBtn, 'hidden');
      closeBtn.querySelector('img').classList.add('clear');
    }
  }, 500);
}

const showMenuType = {
  login: showLoginMenu,
  dates: showDatesMenu,
  bookings: showBookingsMenu,
};

function showMenuContent(type, data, user) {
  if (!showMenuType[type]) alert('MENU TYPE: ' + type);
  else {
    hideElement(altCloseBtn, 'hidden');
    menuForms.forEach(form => hideElement(form, 'hidden'));
    const menuForm = [...menuForms].find(form => form.id.includes(type));
    unhideElement(menuForm);
    menuContent.innerHTML = '';
    showMenuType[type](data, user);
  }
}

function showLoginMenu() {
  unhideElement(altCloseBtn);
  menuTitle.innerText = 'sign in';
}

function showDatesMenu(rooms, user) {
  menuTitle.innerText = 'check rooms by date';
  const heading = document.createElement('h3');
  heading.innerText = 'Available Rooms';
  menuContent.appendChild(heading);
  menuContent.appendChild((0,_uiComponents_roomCards__WEBPACK_IMPORTED_MODULE_1__.createRoomCards)(rooms, user));
}

function showBookingsMenu(bookings, user) {
  const { isAdmin } = user;
  const { selection, totals } = bookings;
  menuTitle.innerText = isAdmin ? 'bookings' : 'my bookings';
  if (isAdmin) {
    console.log('is admin');
  } else {
    const { past, upcoming, total } = totals;
    spentUpcoming.innerText = upcoming;
    spentPast.innerText = past;
    spentTotal.innerText = total;
  }
  const bookingsContainer = document.createElement('section');
  bookingsContainer.id = 'bookings-lists';
  menuContent.appendChild(bookingsContainer);
  const upcomingBookings = createBookingsList(
    bookings.upcoming,
    selection,
    'upcoming'
  );
  if (upcomingBookings) bookingsContainer.appendChild(upcomingBookings);
  const pastBookings = createBookingsList(bookings.past, selection, 'past');
  if (pastBookings) bookingsContainer.appendChild(pastBookings);
}

function createBookingsList(bookings, selection, type) {
  var bookingsList = '';
  if (selection === 'all' || selection === type) {
    bookingsList = document.createElement('section');

    const heading = document.createElement('h4');
    heading.innerText = type + ':';
    bookingsList.appendChild(heading);

    const list = document.createElement('ul');
    bookingsList.appendChild(list);

    if (bookings.length) {
      bookings.forEach(booking => {
        const item = document.createElement('li');
        item.innerHTML = createBookingDetails(booking);
        list.appendChild(item);
      });
    } else {
      const message = document.createElement('li');
      message.innerText = `No ${type} bookings.`;
      list.appendChild(message);
    }
  }

  return bookingsList;
}

function createBookingDetails(booking) {
  const { id, userID, date, roomNumber, price } = booking;
  const elID = `"booking-${id}-${userID}"`;
  const elDate = `<span class="booking-date">Date: <b>${date}</b></span>`;
  const elRoom = `<span class="booking-room">Room: <b>${roomNumber}</b></span>`;
  const elPrice = `<span class="booking-price">Price: <b>${price}</b></span>`;
  const element = `<span id=${elID}>${elDate}${elRoom}${elPrice}</span>`;
  return element;
}


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRoomCards: () => (/* binding */ createRoomCards)
/* harmony export */ });
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);


function createRoomCards(rooms, user) {
  if (!rooms.length) return createNoRoomsFoundMessage();
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('room-cards-container');

  rooms.forEach(room => {
    const roomCard = createRoomCard(room, user);
    cardsContainer.appendChild(roomCard);
  });
  return cardsContainer;
}

function createRoomCard(room, user) {
  const { id, isAdmin } = user;
  const { number } = room;
  const roomCard = document.createElement('div');
  roomCard.classList.add('card');
  const cardHeading = document.createElement('h4');
  cardHeading.innerText = room.number;
  roomCard.appendChild(cardHeading);
  const roomGrid = createRoomInfo(room);
  roomCard.appendChild(roomGrid);
  const bookitBtn = createBookItBtn(id, number);
  if (id && !isAdmin) roomCard.appendChild(bookitBtn);
  return roomCard;
}

function createBookItBtn(userID, roomNumber) {
  const bookingBtn = document.createElement('button');
  bookingBtn.id = 'bookit-' + userID + '-' + roomNumber;
  bookingBtn.classList.add('booking-btn');

  bookingBtn.innerHTML = '<span>book it!</span>';

  const original = document.getElementById('dummy-booking-icon');
  const copy = original.cloneNode(true);
  copy.removeAttribute('id');
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_0__.unhideElement)(copy);
  bookingBtn.appendChild(copy);

  return bookingBtn;
}

function createRoomInfo(room) {
  const { roomType, bidet, bedSize, numBeds, costPerNight } = room;
  const labels = ['per night', 'type', 'bed size', '# beds', 'has bidet'];
  const values = [
    `$${costPerNight}`,
    roomType,
    bedSize,
    numBeds,
    bidet ? '<span class="green">✓</span>' : '<span class="red">✗</span>',
  ];
  const infoContainer = document.createElement('div');
  infoContainer.classList.add('room-card-info');
  infoContainer.appendChild(createInfoColumn(...labels));
  infoContainer.appendChild(createInfoColumn(...values));
  return infoContainer;
}

function createInfoColumn(...items) {
  const infoColumn = document.createElement('ul');
  items.forEach(item => {
    const element = document.createElement('li');
    element.classList.add('room-info-item');
    if (typeof item === 'string' && item.startsWith('<span')) {
      element.innerHTML = item;
    } else element.innerText = item;

    infoColumn.appendChild(element);
  });
  return infoColumn;
}

function createNoRoomsFoundMessage() {
  const message = document.createElement('p');
  message.innerText = 'No rooms meet your search criteria.';
  return message;
}


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCloseBtn: () => (/* binding */ createCloseBtn),
/* harmony export */   getComplimentaryBtn: () => (/* binding */ getComplimentaryBtn)
/* harmony export */ });
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);

/*--- FUNCTIONS ---*/
//- create button functions -//
function createCloseBtn(openBtn) {
  const { parentNode, id } = openBtn;
  const closeBtn = document.createElement('button');
  closeBtn.id = getComplimentaryBtnId(id);
  closeBtn.classList.add('close-menu-btn', 'close');
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_0__.hideElement)(closeBtn, 'hidden');
  createCloseBtnContent(closeBtn);
  parentNode.appendChild(closeBtn);
}

function createCloseBtnContent(closeBtn) {
  const img = document.createElement('img');
  img.src = './images/upTriangle.svg';
  img.alt = 'close';
  img.classList.add('clear');
  closeBtn.appendChild(img);

  const content = document.createElement('p');
  content.innerText = 'hide';
  closeBtn.appendChild(content);
}
//- button utility functions -//
function getComplimentaryBtn(clickedBtn) {
  const { id } = clickedBtn;
  const otherId = getComplimentaryBtnId(id);
  const otherBtn = document.getElementById(otherId);
  return otherBtn;
}

function getComplimentaryBtnId(menuBtnId) {
  let otherBtnType;
  const clickedIdParts = menuBtnId.split('-');
  const otherIdParts = [...clickedIdParts];
  if (otherIdParts[0] === 'user') {
    otherBtnType = otherIdParts[2] === 'in' ? 'out' : 'in';
    otherIdParts[2] = otherBtnType;
  } else {
    otherBtnType = otherIdParts[0] === 'open' ? 'close' : 'open';
    otherIdParts[0] = otherBtnType;
  }

  return otherIdParts.join('-');
}


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createMenu: () => (/* binding */ createMenu)
/* harmony export */ });
/* harmony import */ var _buttons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39);



const createMenu = () => {
  //- containers -//
  const navBar = document.querySelector('nav');
  const menuDrawer = document.getElementById('menu-drawer');
  //- buttons -//
  const openMenuBtns = document.querySelectorAll('.open-menu-btn');

  // create corresponding closing buttons for all open menu buttons
  openMenuBtns.forEach(button => {
    (0,_buttons__WEBPACK_IMPORTED_MODULE_0__.createCloseBtn)(button);
  });

  var closeMenuBtns = document.querySelectorAll('.close-menu-btn');
  //- functions -//
  function toggleMenuBtns(clickedBtn, otherBtn) {
    const { id } = clickedBtn;
    if (id.includes('open')) {
      openMenuBtns.forEach(btn => {
        if (btn.id !== id) (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.hideElement)(btn, 'clear');
      });
    }

    clickedBtn.disabled = 'true';
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.unhideElement)(otherBtn);
    otherBtn.disabled = true;

    setTimeout(() => {
      (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.hideElement)(clickedBtn, 'clear');
      otherBtn.disabled = false;
      otherBtn.querySelector('img') &&
        otherBtn.querySelector('img').classList.remove('clear');
    }, 500);
  }

  function hideCloseMenuBtns() {
    closeMenuBtns.forEach(button => {
      (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.hideElement)(button, 'hidden');
      button.querySelector('img').classList.add('clear');
    });
  }

  function adjustMenuMaxHeight() {
    const navBarHeight = Math.floor(navBar.offsetHeight);
    menuDrawer.style.maxHeight = `calc(100vh - ${navBarHeight}px - 5rem)`
  }

  return {
    toggleMenuBtns,
    hideCloseMenuBtns,
    adjustMenuMaxHeight
  };
};


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postResource: () => (/* binding */ postResource)
/* harmony export */ });
function getResource(endpoint, id) {
  var url = 'https://overlook-api-murex.vercel.app/api/v1/' + endpoint;
  if (id) url += '/' + id;
  const data = fetch(url)
    .then(response => {
      if (!response.ok) {
        var errorMessage = 'GET ERROR: Response not OK >>> STATUS';
        errorMessage += ` ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
      }
      return response.json();
    })
    .then(data => data)
    .catch(err => console.error(err));
  return data;
}

function postResource(endpoint, resource) {
  var url = 'https://overlook-api-murex.vercel.app/api/v1/' + endpoint;
  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resource),
  };

  return fetch(url, options)
    .then(response => {
      if (response.status !== 201) {
        throw new Error(createErrorMsg(response));
      }
      return response.json();
    })
    .then(data => data)
    .catch(err => console.error(err));
}

function createErrorMsg(response) {
  const { status, statusText } = response;
  var msg = 'POST ERROR: Resource not created \n>>> STATUS: ';
  msg += status;
  msg += '\n>>> ';
  msg += statusText;

  return msg;
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_logo_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _images_upTriangle_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _images_github_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _images_linkedin_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _images_tech_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(22);
/* harmony import */ var _images_stanley1_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23);
/* harmony import */ var _images_stanley2_jpg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var _images_stanley3_jpg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(25);
/* harmony import */ var _images_bg1_jpg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(26);
/* harmony import */ var _images_bg2_jpg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(27);
/* harmony import */ var _images_bg3_jpg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(28);
/* harmony import */ var _images_bg4_jpg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(29);
/* harmony import */ var _images_bg5_jpg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(30);
/* harmony import */ var _images_bg6_jpg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(31);
/* harmony import */ var _images_bg7_jpg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(32);
/* harmony import */ var _images_bg8_jpg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(33);
/* harmony import */ var _images_bg9_jpg__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(34);
/* harmony import */ var _rooms__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(35);
/* harmony import */ var _bookings__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(36);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(39);
/* harmony import */ var _uiComponents_buttons__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(41);
/* harmony import */ var _uiComponents_menu__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(42);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(43);
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(38);


























/*--- GLOBALS ---*/
var user = {};
var allRooms = [];
var filteredRooms = [];
var allBookings = [];
var userBookings = { selection: 'all', past: [], upcoming: [], totals: {} };

var filterDefaults = {
  date: (0,_utility__WEBPACK_IMPORTED_MODULE_24__.getCurrentDate)().replaceAll('-', '/'),
  roomType: '',
  bedSize: '',
  bedCount: '',
  hasBidet: false,
};

var roomFilters = {
  ...filterDefaults,
};
//- menu functions -//
var menu = (0,_uiComponents_menu__WEBPACK_IMPORTED_MODULE_22__.createMenu)();
const { toggleMenuBtns, adjustMenuMaxHeight, hideCloseMenuBtns } = menu;
/*--- DOM ELEMENTS ---*/
//- buttons -//
const loginBtn = document.getElementById('open-login-btn');
const logoutBtn = document.getElementById('logout-btn');
const openLogoutBtn = document.getElementById('open-logout-btn');
const menuBtnGroups = document.querySelectorAll('.menu-options > li');
const closeFormBtns = document.querySelectorAll('.menu > .close');
const altCloseBtn = document.getElementById('alt-close-btn');
const openBookingsBtn = document.getElementById('open-bookings-btn');
const autoLogin = document.getElementById('auto-login');
//- forms -//
const loginForm = document.getElementById('login-form');
const checkDatesForm = document.getElementById('check-dates-form');
const bookingsForm = document.getElementById('bookings-form');
//- form inputs -//
const dateInput = document.getElementById('vacancy-date');
//- containers -//
const menuDrawer = document.getElementById('menu-drawer');
const menuContent = document.getElementById('menu-content');
//- login dependent elements -//
const loggedRequiredEls = document.querySelectorAll('.login-required');
/*--- EVENT LISTENERS ---*/
window.onload = start;
window.onresize = adjustMenuMaxHeight;
//- button clicks -//
loginBtn.onclick = () => {
  menuContent.innerHTML = '';
  hideCloseMenuBtns();
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_20__.openMenu)('login');
};

logoutBtn.onclick = logoutUser;

menuBtnGroups.forEach(
  buttonGrp =>
    (buttonGrp.onclick = e => {
      const clickedBtn = e.target.closest('button');
      if (clickedBtn) {
        const otherBtn = (0,_uiComponents_buttons__WEBPACK_IMPORTED_MODULE_21__.getComplimentaryBtn)(clickedBtn);
        const { id } = clickedBtn;
        if (id.includes('open')) {
          const [menuType, data] = getMenuTypeAndData(id);
          (0,_domUpdates__WEBPACK_IMPORTED_MODULE_20__.openMenu)(menuType, data, user);
        } else (0,_domUpdates__WEBPACK_IMPORTED_MODULE_20__.closeMenu)(clickedBtn);
        toggleMenuBtns(clickedBtn, otherBtn);
      }
    })
);

closeFormBtns.forEach(
  button =>
    (button.onclick = e => {
      const menu = e.target.closest('.menu');
      (0,_domUpdates__WEBPACK_IMPORTED_MODULE_20__.hideElement)(menu);
      (0,_domUpdates__WEBPACK_IMPORTED_MODULE_20__.closeMenu)();
    })
);

altCloseBtn.onclick = () => {
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_20__.closeMenu)();
};
//- check dates form event listeners-//
checkDatesForm.oninput = e => {
  const { id, value, type } = e.target;
  roomFilters =
    type === 'checkbox'
      ? (0,_rooms__WEBPACK_IMPORTED_MODULE_18__.updateRoomFilterOptions)(id, e.target.checked, roomFilters)
      : (0,_rooms__WEBPACK_IMPORTED_MODULE_18__.updateRoomFilterOptions)(id, value, roomFilters);
  filteredRooms = (0,_rooms__WEBPACK_IMPORTED_MODULE_18__.filterRooms)(roomFilters, allRooms, allBookings);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_20__.showMenuContent)('dates', filteredRooms, user);
};

checkDatesForm.onreset = e => {
  e.preventDefault();
  //- reset data -//
  roomFilters = {
    ...filterDefaults,
  };
  filteredRooms = (0,_rooms__WEBPACK_IMPORTED_MODULE_18__.filterRooms)(roomFilters, allRooms, allBookings);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_20__.showMenuContent)('dates', filteredRooms, user);
  //- clear inputs -//
  const dateInput = checkDatesForm.querySelector('input');
  dateInput.value = roomFilters.date.replaceAll('/', '-');
  const selectors = checkDatesForm.querySelectorAll('select');
  selectors.forEach(selector => {
    selector.value = '';
  });
};
//- login form event listeners -//
loginForm.oninput = e => {
  const { value } = e.target;
  const isValid = !value || value.length > 7;
  const color = isValid ? 'var(--default)' : 'var(--invalid)';
  e.target.parentElement.style.setProperty('--isValid-color', color);
  const inputs = loginForm.querySelectorAll('input');
  const allInputsValidated = [...inputs].every(input => input.value.length > 7);
  if (allInputsValidated) {
    loginForm.querySelector('button').removeAttribute('disabled');
  } else loginForm.querySelector('button').setAttribute('disabled', 'true');
};

loginForm.onsubmit = e => {
  e.preventDefault();
  const inputs = loginForm.querySelectorAll('input');
  validateLoginInfo(inputs[0].value, inputs[1].value);
};

autoLogin.onclick = () => {
  const inputs = loginForm.querySelectorAll('input');
  document.body.style.pointerEvents = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => {
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_20__.openMenu)('login');
    setTimeout(() => {
      const randomId = Math.ceil(Math.random() * 50);
      inputs[0].value = 'customer' + randomId;
      inputs[1].value = 'overlook2021';
      loginForm.querySelector('button').removeAttribute('disabled');
      document.body.style.pointerEvents = 'auto';
    }, 500);
  }, 500);
};
//- bookings form event listeners -//
bookingsForm.oninput = e => {
  userBookings.selection = e.target.value;
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_20__.openMenu)('bookings', userBookings, user);
};
//- menu content event listeners -//
menuContent.onclick = e => {
  const button = e.target.closest('button');
  if (button) {
    if (button.id.startsWith('bookit')) {
      const [, userID, roomNumber] = button.id.split('-');
      const { value } = dateInput;
      if (value) {
        const date = value.replaceAll('-', '/');
        const data = {
          userID: Number(userID),
          roomNumber: Number(roomNumber),
          date,
        };
        (0,_apiCalls__WEBPACK_IMPORTED_MODULE_23__.postResource)('bookings', data)
          .then(message => console.log(message))
          .then(() => (0,_apiCalls__WEBPACK_IMPORTED_MODULE_23__.getResource)('bookings'))
          .then(({ bookings }) => (allBookings = [...bookings]))
          .then(() => {
            showUserBookings(user, userBookings, allBookings, allRooms);
            roomFilters = {
              ...filterDefaults,
            };
            filteredRooms = (0,_rooms__WEBPACK_IMPORTED_MODULE_18__.filterRooms)(roomFilters, allRooms, allBookings);
            const dateInput = checkDatesForm.querySelector('input');
            dateInput.value = roomFilters.date.replaceAll('/', '-');
            const selectors = checkDatesForm.querySelectorAll('select');
          })
          .catch(err => console.error(err));
      }
    }
  }
};
/*--- FUNCTIONS ---*/
function start() {
  adjustMenuMaxHeight();
  Promise.all([(0,_apiCalls__WEBPACK_IMPORTED_MODULE_23__.getResource)('rooms'), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_23__.getResource)('bookings')])
    .then(data => {
      updateGlobalVariables(...data);
    })
    .catch(err => console.error(err));
}

function updateGlobalVariables({ rooms }, { bookings }) {
  allRooms = [...rooms];
  allBookings = [...bookings];
  filteredRooms = (0,_rooms__WEBPACK_IMPORTED_MODULE_18__.filterRooms)(roomFilters, allRooms, allBookings);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_20__.loadContent)(allRooms);
}

function loginUser() {
  const { name } = user;
  loggedRequiredEls.forEach(element => {
    element.classList.remove('login-required');
  });
  resetLoginForm();
  openLogoutBtn.querySelector('p').innerText = name;
  openLogoutBtn.querySelector('h2').innerText = name;
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_20__.toggleLoginBtns)();

  showUserBookings(user, userBookings, allBookings, allRooms);
}

function logoutUser() {
  loggedRequiredEls.forEach(element => {
    element.classList.add('login-required');
  });

  user = {};
  userBookings = { selection: 'all' };

  openLogoutBtn.querySelector('p').innerText = '';
  openLogoutBtn.querySelector('h5').innerText = '';

  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_20__.toggleLoginBtns)();
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_20__.hideElement)(menuDrawer, 'minimized');
  hideCloseMenuBtns();
}

function showUserBookings(user, userBookings, allBookings, allRooms) {
  (0,_bookings__WEBPACK_IMPORTED_MODULE_19__.updateUserBookings)(user, userBookings, allBookings, allRooms);

  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_20__.hideElement)(menuDrawer, 'minimized');
  hideCloseMenuBtns();
  setTimeout(() => {
    const closeBookingsBtn = (0,_uiComponents_buttons__WEBPACK_IMPORTED_MODULE_21__.getComplimentaryBtn)(openBookingsBtn);
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_20__.openMenu)('bookings', userBookings, user);
    toggleMenuBtns(openBookingsBtn, closeBookingsBtn);
  }, 500);
}
//- validate input functions -//
function getMenuTypeAndData(buttonID) {
  const { isAdmin } = user;
  const menuType = buttonID.includes('dates') ? 'dates' : 'bookings';
  // if (menuType === 'dates') {filterdRooms = filterRooms(roomsFilters, )}
  const data =
    menuType === 'dates' ? filteredRooms : isAdmin ? allBookings : userBookings;
  return [menuType, data];
}

function validateLoginInfo(username, password) {
  if (username === 'manager' && password === 'overlook2021') {
    user.id = 999;
    user.name = 'Management';
    user.isAdmin = true;
    loginUser();
  } else if (username.startsWith('customer') && password === 'overlook2021') {
    const id = Number(username.slice(8));
    if (id) {
      (0,_apiCalls__WEBPACK_IMPORTED_MODULE_23__.getResource)('customers', id)
        .then(customer => {
          user = customer;
          loginUser();
        })
        .catch(err => console.error(err));
    } else {
      alert('ivalid username.');
    }
  } else {
    alert('incorrect username or password. try again.');
  }
}

function resetLoginForm() {
  loginForm.querySelectorAll('input').forEach(input => {
    input.value = '';
  });
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map