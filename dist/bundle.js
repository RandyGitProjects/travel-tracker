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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

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
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
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
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html {\n  background-color: #7D7461;\n}\n\nbody{\n  margin: 0;\n}\n/* Style the form */\nform {\n  background-color: #202030;\n  padding: 20px;\n  border-radius: 5px;\n  font-family: Arial, sans-serif;\n  height: 37vh;\n  width: 15vw;\n}\n\n\nlabel {\n  display: inline-block;\n  width: 100px;\n  margin-bottom: 5px;\n  font-weight: bold;\n  font-size: 16px;\n  color: white\n}\n\n\ninput[type=\"date\"], input[type=\"number\"], input[type=\"text\"], select {\n  padding: 5px;\n  border-radius: 5px;\n  border: none;\n  margin-bottom: 5px;\n  width: 100px;\n  font-size: 12px;\n}\n/* End of Form */\ninput[type=\"submit\"] {\n  background-color: #4CAF50;\n  color: white;\n  padding: 5px 10px;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n  font-size: 12px;\n}\n\n/* Hovers */\ninput[type=\"submit\"]:hover {\n  background-color: #3e8e41;\n}\n\n/* Media Scroller */\n.media-scroller {\n  color: white;\n  --spacer: 1rem;\n  display: grid;\n  gap: var(--spacer);\n  grid-auto-flow: column;\n  grid-auto-columns: 17%;\n  padding: 0 var(--spacer) var(--spacer);\n  overflow-x: auto;\n  overscroll-behavior-inline: contain;\n}\n\n.media-element {\n  background-color: #3e8e41;\n  border: 1px solid #B0A990;\n  display: grid;\n  grid-template-rows: min-content;\n  gap: var(--spacer);\n  padding: var(--spacer);\n  background: var(--surface-2);\n  border-radius: var(--radius-2);\n}\n\n.media-element > img {\n  border: 1px solid black;\n  inline-size: 100%;\n  aspect-ratio: 16 / 9;\n  object-fit: cover;\n}\n\n.media-element {\n  background-color: #39304A;\n}\n\n/* text styling for media scroller */\n.section-title {\n  color: #202030;\n  font-size: xx-large;\n  font-weight: 300;\n  font-weight: bold;\n}\n\n.main-title {\n  background-image: url(https://www.shutterstock.com/image-photo/travel-concept-background-summer-header-260nw-1401394727.jpg);\n  background-position: left;\n  background-repeat: no-repeat;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  color: #202030;\n  background-color:#B0A990;\n  font-weight: bold;\n  font-size: 50px;\n  border: 2px solid #B0A990;\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-right: 100px;\n  height: 25vh;\n}\n\n.total-trips, .amount-trips {\n  display: flex;\n  justify-content: flex-end;\n  align-items: right;\n  padding-right: 100px;\n  font-size: 25px;\n  color: #202030;\n  font-weight: bold;\n  margin-top: 5px;\n  margin-left: auto;\n  width: 35vw;\n}\n\n#map {\n  height: 180px;\n  width: 300px;\n  border: 2px solid black\n\n}\n\n/** color palette #202030 #39304A #635C51 #7D7461 #B0A990 **/\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,yBAAyB;AAC3B;;AAEA;EACE,SAAS;AACX;AACA,mBAAmB;AACnB;EACE,yBAAyB;EACzB,aAAa;EACb,kBAAkB;EAClB,8BAA8B;EAC9B,YAAY;EACZ,WAAW;AACb;;;AAGA;EACE,qBAAqB;EACrB,YAAY;EACZ,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;EACf;AACF;;;AAGA;EACE,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,eAAe;AACjB;AACA,gBAAgB;AAChB;EACE,yBAAyB;EACzB,YAAY;EACZ,iBAAiB;EACjB,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,eAAe;AACjB;;AAEA,WAAW;AACX;EACE,yBAAyB;AAC3B;;AAEA,mBAAmB;AACnB;EACE,YAAY;EACZ,cAAc;EACd,aAAa;EACb,kBAAkB;EAClB,sBAAsB;EACtB,sBAAsB;EACtB,sCAAsC;EACtC,gBAAgB;EAChB,mCAAmC;AACrC;;AAEA;EACE,yBAAyB;EACzB,yBAAyB;EACzB,aAAa;EACb,+BAA+B;EAC/B,kBAAkB;EAClB,sBAAsB;EACtB,4BAA4B;EAC5B,8BAA8B;AAChC;;AAEA;EACE,uBAAuB;EACvB,iBAAiB;EACjB,oBAAoB;EACpB,iBAAiB;AACnB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA,oCAAoC;AACpC;EACE,cAAc;EACd,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;AACnB;;AAEA;EACE,4HAA4H;EAC5H,yBAAyB;EACzB,4BAA4B;EAC5B,aAAa;EACb,yBAAyB;EACzB,mBAAmB;EACnB,cAAc;EACd,wBAAwB;EACxB,iBAAiB;EACjB,eAAe;EACf,yBAAyB;EACzB,aAAa;EACb,gBAAgB;EAChB,oBAAoB;EACpB,YAAY;AACd;;AAEA;EACE,aAAa;EACb,yBAAyB;EACzB,kBAAkB;EAClB,oBAAoB;EACpB,eAAe;EACf,cAAc;EACd,iBAAiB;EACjB,eAAe;EACf,iBAAiB;EACjB,WAAW;AACb;;AAEA;EACE,aAAa;EACb,YAAY;EACZ;;AAEF;;AAEA,4DAA4D","sourcesContent":["html {\n  background-color: #7D7461;\n}\n\nbody{\n  margin: 0;\n}\n/* Style the form */\nform {\n  background-color: #202030;\n  padding: 20px;\n  border-radius: 5px;\n  font-family: Arial, sans-serif;\n  height: 37vh;\n  width: 15vw;\n}\n\n\nlabel {\n  display: inline-block;\n  width: 100px;\n  margin-bottom: 5px;\n  font-weight: bold;\n  font-size: 16px;\n  color: white\n}\n\n\ninput[type=\"date\"], input[type=\"number\"], input[type=\"text\"], select {\n  padding: 5px;\n  border-radius: 5px;\n  border: none;\n  margin-bottom: 5px;\n  width: 100px;\n  font-size: 12px;\n}\n/* End of Form */\ninput[type=\"submit\"] {\n  background-color: #4CAF50;\n  color: white;\n  padding: 5px 10px;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n  font-size: 12px;\n}\n\n/* Hovers */\ninput[type=\"submit\"]:hover {\n  background-color: #3e8e41;\n}\n\n/* Media Scroller */\n.media-scroller {\n  color: white;\n  --spacer: 1rem;\n  display: grid;\n  gap: var(--spacer);\n  grid-auto-flow: column;\n  grid-auto-columns: 17%;\n  padding: 0 var(--spacer) var(--spacer);\n  overflow-x: auto;\n  overscroll-behavior-inline: contain;\n}\n\n.media-element {\n  background-color: #3e8e41;\n  border: 1px solid #B0A990;\n  display: grid;\n  grid-template-rows: min-content;\n  gap: var(--spacer);\n  padding: var(--spacer);\n  background: var(--surface-2);\n  border-radius: var(--radius-2);\n}\n\n.media-element > img {\n  border: 1px solid black;\n  inline-size: 100%;\n  aspect-ratio: 16 / 9;\n  object-fit: cover;\n}\n\n.media-element {\n  background-color: #39304A;\n}\n\n/* text styling for media scroller */\n.section-title {\n  color: #202030;\n  font-size: xx-large;\n  font-weight: 300;\n  font-weight: bold;\n}\n\n.main-title {\n  background-image: url(https://www.shutterstock.com/image-photo/travel-concept-background-summer-header-260nw-1401394727.jpg);\n  background-position: left;\n  background-repeat: no-repeat;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  color: #202030;\n  background-color:#B0A990;\n  font-weight: bold;\n  font-size: 50px;\n  border: 2px solid #B0A990;\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-right: 100px;\n  height: 25vh;\n}\n\n.total-trips, .amount-trips {\n  display: flex;\n  justify-content: flex-end;\n  align-items: right;\n  padding-right: 100px;\n  font-size: 25px;\n  color: #202030;\n  font-weight: bold;\n  margin-top: 5px;\n  margin-left: auto;\n  width: 35vw;\n}\n\n#map {\n  height: 180px;\n  width: 300px;\n  border: 2px solid black\n\n}\n\n/** color palette #202030 #39304A #635C51 #7D7461 #B0A990 **/\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
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
/* 5 */
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
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/turing-logo.png");

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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_turing_logo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
Object(function webpackMissingModule() { var e = new Error("Cannot find module './'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file


// An example of how you tell webpack to use an image (also need to link to it in the index.html)




const mapDiv = document.createElement('div');
mapDiv.id = 'mapid';
document.body.appendChild(mapDiv);

const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href = 'style.css';
document.head.appendChild(styleLink);

const mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(mymap);


console.log('This is the JavaScript entry file - your code begins here.');

//Query Selectors
var form = document.querySelector(".travel-form")

//Event Listeners
form.addEventListener("submit", function(event) {
    event.preventDefault();
    displayCalculatedCost();
  });

//Functions
function displayCalculatedCost() {
    var date = new Date(document.querySelector("#date").value);
    var duration = document.querySelector("#duration").value;
    console.log(duration)
    var travelers = document.querySelector("#travelers").value;
    var destination = document.querySelector("#destination").value;
    var costPerDay = 100;
    var costPerPerson = costPerDay * duration;
    var totalCost = costPerPerson * travelers;

    document.querySelector("#cost").value = "$" + totalCost.toFixed(2);
    return false
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map