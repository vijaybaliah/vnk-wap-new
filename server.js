!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=8)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("react-dom/server")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("superagent")},function(e,t){e.exports=Object.assign({host:process.env.HOST||"localhost",port:process.env.PORT,apiHost:"http://localhost"})},function(e,t){e.exports=require("serialize-javascript")},function(e,t){e.exports=require("path")},function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),i=n(0),c=n.n(i);function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t){return!t||"object"!==u(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function s(e){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var d=function(e){function t(){return a(this,t),l(this,s(t).apply(this,arguments))}var n,r,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(t,e),n=t,(r=[{key:"render",value:function(){return c.a.createElement("div",null,"Hello World ",JSON.stringify(this.props.data))}}])&&f(n.prototype,r),o&&f(n,o),t}(i.Component),y=n(2),b=n(3),h=n.n(b),v=(n(7),n(4)),m=n.n(v),g=n(5),O=n.n(g),j=function(e){if("h"===e[0])return console.log("Path: "+e),e;var t="/"!==e[0]?"/"+e:e,n=t=t.replace(/\/+/g,"/");return n=O.a.apiHost+t,console.log("formatted Path: "+n),n},_=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(n,r){var o=t.method,i=void 0===o?"get":o,c=t.data;console.log("method: ",i);var u=m.a[i](j(e));c&&u.send(c),u.withCredentials(),u.end((function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=t.body;return e?r(o||e):n(o)}))}))};var S=n(6),P=n.n(S),x="".concat(process.cwd(),"/public/manifest.json"),w=o()();console.log("manifestPath: ",x),w.use(o.a.static("public")),w.get("*",(function(e,t,n){var r=JSON.parse(h.a.readFileSync(x,"utf8"));_("/menu.json").then((function(e){var n=e,o=Object(y.renderToString)(c.a.createElement(d,{data:n}));t.send(function(e,t,n){return"<!DOCTYPE html>\n  <html>\n    <head>\n      <title>Vnk</title>\n      <script src=".concat(n["main.js"]," defer><\/script>\n      <script>window.__INITIAL_DATA__ = ").concat(P()(t),'<\/script>\n    </head>\n    <body>\n      <div id="app">\n        ').concat(e,"\n      </div>\n    </body>\n  </html>")}(o,n,r))})).catch((function(e){console.log("error: ",e)}))})),w.listen(3001,(function(){console.log("Server is listening on http://localhost:3001")}))}]);