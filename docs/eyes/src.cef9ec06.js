parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"bkbf":[function(require,module,exports) {
var define;
var global = arguments[3];
var t,e=arguments[3];!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof t&&t.amd?t(n):e.canvasSketch=n()}(this,function(){var t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;var r=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},n=0;n<10;n++)e["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(e).map(function(t){return e[t]}).join(""))return!1;var i={};return"abcdefghijklmnopqrst".split("").forEach(function(t){i[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},i)).join("")}catch(r){return!1}}()?Object.assign:function(e,r){for(var o,s,a=function(t){if(null==t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}(e),p=1;p<arguments.length;p++){for(var c in o=Object(arguments[p]))n.call(o,c)&&(a[c]=o[c]);if(t){s=t(o);for(var u=0;u<s.length;u++)i.call(o,s[u])&&(a[s[u]]=o[s[u]])}}return a},o="undefined"!=typeof window?window:void 0!==e?e:"undefined"!=typeof self?self:{};function s(t,e){return t(e={exports:{}},e.exports),e.exports}var a=o.performance&&o.performance.now?function(){return performance.now()}:Date.now||function(){return+new Date},p=function(t){return!!t&&("object"==typeof t||"function"==typeof t)&&"function"==typeof t.then};var c=function(t){return!(!t||"object"!=typeof t)&&("object"==typeof window&&"object"==typeof window.Node?t instanceof window.Node:"number"==typeof t.nodeType&&"string"==typeof t.nodeName)};function u(){return"undefined"!=typeof window&&window["canvas-sketch-cli"]}function h(){for(var t=arguments,e=0;e<arguments.length;e++)if(null!=t[e])return t[e]}function d(){return"undefined"!=typeof document}var l,f=s(function(t,e){function n(t){var e=[];for(var n in t)e.push(n);return e}(t.exports="function"==typeof Object.keys?Object.keys:n).shim=n}),m=(f.shim,s(function(t,e){var n="[object Arguments]"==function(){return Object.prototype.toString.call(arguments)}();function i(t){return"[object Arguments]"==Object.prototype.toString.call(t)}function r(t){return t&&"object"==typeof t&&"number"==typeof t.length&&Object.prototype.hasOwnProperty.call(t,"callee")&&!Object.prototype.propertyIsEnumerable.call(t,"callee")||!1}(e=t.exports=n?i:r).supported=i,e.unsupported=r})),y=(m.supported,m.unsupported,s(function(t){var e=Array.prototype.slice,n=t.exports=function(t,o,s){return s||(s={}),t===o||(t instanceof Date&&o instanceof Date?t.getTime()===o.getTime():!t||!o||"object"!=typeof t&&"object"!=typeof o?s.strict?t===o:t==o:function(t,o,s){var a,p;if(i(t)||i(o))return!1;if(t.prototype!==o.prototype)return!1;if(m(t))return!!m(o)&&(t=e.call(t),o=e.call(o),n(t,o,s));if(r(t)){if(!r(o))return!1;if(t.length!==o.length)return!1;for(a=0;a<t.length;a++)if(t[a]!==o[a])return!1;return!0}try{var c=f(t),u=f(o)}catch(h){return!1}if(c.length!=u.length)return!1;for(c.sort(),u.sort(),a=c.length-1;a>=0;a--)if(c[a]!=u[a])return!1;for(a=c.length-1;a>=0;a--)if(p=c[a],!n(t[p],o[p],s))return!1;return typeof t==typeof o}(t,o,s))};function i(t){return null==t}function r(t){return!(!t||"object"!=typeof t||"number"!=typeof t.length)&&("function"==typeof t.copy&&"function"==typeof t.slice&&!(t.length>0&&"number"!=typeof t[0]))}})),g=s(function(t,e){!function(e){var n,i,r,o=(n=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g,i=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,r=/[^-+\dA-Z]/g,function(t,e,a,p){if(1!==arguments.length||"string"!==(null===(c=t)?"null":void 0===c?"undefined":"object"!=typeof c?typeof c:Array.isArray(c)?"array":{}.toString.call(c).slice(8,-1).toLowerCase())||/\d/.test(t)||(e=t,t=void 0),(t=t||new Date)instanceof Date||(t=new Date(t)),isNaN(t))throw TypeError("Invalid date");var c,u=(e=String(o.masks[e]||e||o.masks.default)).slice(0,4);"UTC:"!==u&&"GMT:"!==u||(e=e.slice(4),a=!0,"GMT:"===u&&(p=!0));var h=a?"getUTC":"get",d=t[h+"Date"](),l=t[h+"Day"](),f=t[h+"Month"](),m=t[h+"FullYear"](),y=t[h+"Hours"](),g=t[h+"Minutes"](),v=t[h+"Seconds"](),w=t[h+"Milliseconds"](),b=a?0:t.getTimezoneOffset(),x=function(t){var e=new Date(t.getFullYear(),t.getMonth(),t.getDate());e.setDate(e.getDate()-(e.getDay()+6)%7+3);var n=new Date(e.getFullYear(),0,4);n.setDate(n.getDate()-(n.getDay()+6)%7+3);var i=e.getTimezoneOffset()-n.getTimezoneOffset();e.setHours(e.getHours()-i);var r=(e-n)/6048e5;return 1+Math.floor(r)}(t),_=function(t){var e=t.getDay();return 0===e&&(e=7),e}(t),k={d:d,dd:s(d),ddd:o.i18n.dayNames[l],dddd:o.i18n.dayNames[l+7],m:f+1,mm:s(f+1),mmm:o.i18n.monthNames[f],mmmm:o.i18n.monthNames[f+12],yy:String(m).slice(2),yyyy:m,h:y%12||12,hh:s(y%12||12),H:y,HH:s(y),M:g,MM:s(g),s:v,ss:s(v),l:s(w,3),L:s(Math.round(w/10)),t:y<12?o.i18n.timeNames[0]:o.i18n.timeNames[1],tt:y<12?o.i18n.timeNames[2]:o.i18n.timeNames[3],T:y<12?o.i18n.timeNames[4]:o.i18n.timeNames[5],TT:y<12?o.i18n.timeNames[6]:o.i18n.timeNames[7],Z:p?"GMT":a?"UTC":(String(t).match(i)||[""]).pop().replace(r,""),o:(b>0?"-":"+")+s(100*Math.floor(Math.abs(b)/60)+Math.abs(b)%60,4),S:["th","st","nd","rd"][d%10>3?0:(d%100-d%10!=10)*d%10],W:x,N:_};return e.replace(n,function(t){return t in k?k[t]:t.slice(1,t.length-1)})});function s(t,e){for(t=String(t),e=e||2;t.length<e;)t="0"+t;return t}o.masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:sso",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",expiresHeaderFormat:"ddd, dd mmm yyyy HH:MM:ss Z"},o.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"],timeNames:["a","p","am","pm","A","P","AM","PM"]},t.exports=o}()}),v="",w=function(t,e){if("string"!=typeof t)throw new TypeError("expected a string");if(1===e)return t;if(2===e)return t+t;var n=t.length*e;if(l!==t||void 0===l)l=t,v="";else if(v.length>=n)return v.substr(0,n);for(;n>v.length&&e>1;)1&e&&(v+=t),e>>=1,t+=t;return v=(v+=t).substr(0,n)};var b,x=function(t,e,n){return t=t.toString(),void 0===e?t:(n=0===n?"0":n?n.toString():" ",w(n,e-t.length)+t)},_=function(){},k={extension:"",prefix:"",suffix:""},T=["image/png","image/jpeg","image/webp"];function R(t,e){return void 0===e&&(e={}),new Promise(function(n,i){e=r({},k,e);var o=P(Object.assign({},e,{extension:"",frame:void 0})),s=t?"streamStart":"streamEnd",a=u();return a&&a.output&&"function"==typeof a[s]?a[s](r({},e,{filename:o})).then(function(t){return n(t)}):n({filename:o,client:!1})})}function M(t,e){return void 0===e&&(e={}),function(t){return new Promise(function(e){var n=t.indexOf(",");if(-1!==n){for(var i=t.slice(n+1),r=window.atob(i),o=t.slice(0,n),s=/data:([^;]+)/.exec(o),a=(s?s[1]:"")||void 0,p=new ArrayBuffer(r.length),c=new Uint8Array(p),u=0;u<r.length;u++)c[u]=r.charCodeAt(u);e(new window.Blob([p],{type:a}))}else e(new window.Blob)})}(t).then(function(t){return E(t,e)})}function E(t,e){return void 0===e&&(e={}),new Promise(function(n){var i=(e=r({},k,e)).filename,o=u();if(o&&"function"==typeof o.saveBlob&&o.output)return o.saveBlob(t,r({},e,{filename:i})).then(function(t){return n(t)});b||((b=document.createElement("a")).style.visibility="hidden",b.target="_blank"),b.download=i,b.href=window.URL.createObjectURL(t),document.body.appendChild(b),b.onclick=function(){b.onclick=_,setTimeout(function(){window.URL.revokeObjectURL(t),b.parentElement&&b.parentElement.removeChild(b),b.removeAttribute("href"),n({filename:i,client:!1})})},b.click()})}function P(t){if(void 0===t&&(t={}),"function"==typeof(t=r({},t)).file)return t.file(t);if(t.file)return t.file;var e,n=null,i="";("string"==typeof t.extension&&(i=t.extension),"number"==typeof t.frame)&&(e="number"==typeof t.totalFrames?t.totalFrames:Math.max(1e4,t.frame),n=x(String(t.frame),String(e).length,"0"));var o=isFinite(t.totalLayers)&&isFinite(t.layer)&&t.totalLayers>1?""+t.layer:"";if(null!=n)return[o,n].filter(Boolean).join("-")+i;var s=t.timeStamp;return[t.prefix,t.name||s,o,t.hash,t.suffix].filter(Boolean).join("-")+i}var j={dimension:"dimensions",animated:"animate",animating:"animate",unit:"units",P5:"p5",pixellated:"pixelated",looping:"loop",pixelPerInch:"pixels"},F=["dimensions","units","pixelsPerInch","orientation","scaleToFit","scaleToView","bleed","pixelRatio","exportPixelRatio","maxPixelRatio","scaleContext","resizeCanvas","styleCanvas","canvas","context","attributes","parent","file","name","prefix","suffix","animate","playing","loop","duration","totalFrames","fps","playbackRate","timeScale","frame","time","flush","pixelated","hotkeys","p5","id","scaleToFitPadding","data","params","encoding","encodingQuality"],C=function(t){Object.keys(t).forEach(function(t){if(t in j){var e=j[t];console.warn('[canvas-sketch] Could not recognize the setting "'+t+'", did you mean "'+e+'"?')}else F.includes(t)||console.warn('[canvas-sketch] Could not recognize the setting "'+t+'"')})};var S=[["postcard",101.6,152.4],["poster-small",280,430],["poster",460,610],["poster-large",610,910],["business-card",50.8,88.9],["2r",64,89],["3r",89,127],["4r",102,152],["5r",127,178],["6r",152,203],["8r",203,254],["10r",254,305],["11r",279,356],["12r",305,381],["a0",841,1189],["a1",594,841],["a2",420,594],["a3",297,420],["a4",210,297],["a5",148,210],["a6",105,148],["a7",74,105],["a8",52,74],["a9",37,52],["a10",26,37],["2a0",1189,1682],["4a0",1682,2378],["b0",1e3,1414],["b1",707,1e3],["b1+",720,1020],["b2",500,707],["b2+",520,720],["b3",353,500],["b4",250,353],["b5",176,250],["b6",125,176],["b7",88,125],["b8",62,88],["b9",44,62],["b10",31,44],["b11",22,32],["b12",16,22],["c0",917,1297],["c1",648,917],["c2",458,648],["c3",324,458],["c4",229,324],["c5",162,229],["c6",114,162],["c7",81,114],["c8",57,81],["c9",40,57],["c10",28,40],["c11",22,32],["c12",16,22],["half-letter",5.5,8.5,"in"],["letter",8.5,11,"in"],["legal",8.5,14,"in"],["junior-legal",5,8,"in"],["ledger",11,17,"in"],["tabloid",11,17,"in"],["ansi-a",8.5,11,"in"],["ansi-b",11,17,"in"],["ansi-c",17,22,"in"],["ansi-d",22,34,"in"],["ansi-e",34,44,"in"],["arch-a",9,12,"in"],["arch-b",12,18,"in"],["arch-c",18,24,"in"],["arch-d",24,36,"in"],["arch-e",36,48,"in"],["arch-e1",30,42,"in"],["arch-e2",26,38,"in"],["arch-e3",27,39,"in"]].reduce(function(t,e){var n={units:e[3]||"mm",dimensions:[e[1],e[2]]};return t[e[0]]=n,t[e[0].replace(/-/g," ")]=n,t},{}),O=function(){for(var t=0;t<arguments.length;t++)if(void 0!==arguments[t])return arguments[t]},D=["mm","cm","m","pc","pt","in","ft","px"],N={m:{system:"metric",factor:1},cm:{system:"metric",factor:.01},mm:{system:"metric",factor:.001},pt:{system:"imperial",factor:1/72},pc:{system:"imperial",factor:1/6},in:{system:"imperial",factor:1},ft:{system:"imperial",factor:12}};const H={metric:{unit:"m",ratio:1/.0254},imperial:{unit:"in",ratio:.0254}};var A=function(t,e,n,i){if("number"!=typeof t||!isFinite(t))throw new Error("Value must be a finite number");if(!e||!n)throw new Error("Must specify from and to units");var r=O((i=i||{}).pixelsPerInch,96),o=i.precision,s=!1!==i.roundPixel;if(e=e.toLowerCase(),n=n.toLowerCase(),-1===D.indexOf(e))throw new Error('Invalid from unit "'+e+'", must be one of: '+D.join(", "));if(-1===D.indexOf(n))throw new Error('Invalid from unit "'+n+'", must be one of: '+D.join(", "));if(e===n)return t;var a=1,p=1,c=!1;"px"===e&&(p=1/r,e="in"),"px"===n&&(c=!0,a=r,n="in");var u=N[e],h=N[n],d=t*u.factor*p;u.system!==h.system&&(d*=H[u.system].ratio);var l=d/h.factor*a;return c&&s?l=Math.round(l):"number"==typeof o&&isFinite(o)&&(l=function(t,e){return Number(Math.round(t+"e"+e)+"e-"+e)}(l,o)),l},z=D;function L(t,e,n,i){return void 0===e&&(e="px"),void 0===n&&(n="px"),void 0===i&&(i=72),A(t,e,n,{pixelsPerInch:i,precision:4,roundPixel:!0})}function I(t,e){var n,i,r,o,s,a,p=d(),c=e.dimensions,u=function(t){return!(!t.dimensions||"string"!=typeof t.dimensions&&!(Array.isArray(t.dimensions)&&t.dimensions.length>=2))}(e),l=t.exporting,f=!!u&&!1!==e.scaleToFit,m=!(!l&&u)||e.scaleToView;p||(f=m=!1);var y,g,v=e.units,w="number"==typeof e.pixelsPerInch&&isFinite(e.pixelsPerInch)?e.pixelsPerInch:72,b=h(e.bleed,0),x=p?window.devicePixelRatio:1,_=m?x:1;"number"==typeof e.pixelRatio&&isFinite(e.pixelRatio)?(y=e.pixelRatio,g=h(e.exportPixelRatio,y)):u?(y=_,g=h(e.exportPixelRatio,1)):(y=x,g=h(e.exportPixelRatio,y)),"number"==typeof e.maxPixelRatio&&isFinite(e.maxPixelRatio)&&(y=Math.min(e.maxPixelRatio,y)),l&&(y=g);var k,T,R=function(t,e){if(!d())return[300,150];var n=e.parent||window;if(n===window||n===document||n===document.body)return[window.innerWidth,window.innerHeight];var i=n.getBoundingClientRect();return[i.width,i.height]}(0,e),M=R[0],E=R[1];if(u){var P=function(t,e,n){if(void 0===e&&(e="px"),void 0===n&&(n=72),"string"==typeof t){var i=t.toLowerCase();if(!(i in S))throw new Error('The dimension preset "'+t+'" is not supported or could not be found; try using a4, a3, postcard, letter, etc.');var r=S[i];return r.dimensions.map(function(t){return L(t,r.units,e,n)})}return t}(c,v,w),j=Math.max(P[0],P[1]),F=Math.min(P[0],P[1]);if(e.orientation){var C="landscape"===e.orientation;n=C?j:F,i=C?F:j}else n=P[0],i=P[1];k=n,T=i,n+=2*b,i+=2*b}else k=n=M,T=i=E;var O=n,D=i;if(u&&v&&(O=L(n,v,"px",w),D=L(i,v,"px",w)),r=Math.round(O),o=Math.round(D),f&&!l&&u){var N=n/i,H=M/E,A=h(e.scaleToFitPadding,40),z=Math.round(M-2*A),I=Math.round(E-2*A);(r>z||o>I)&&(H>N?(o=I,r=Math.round(o*N)):(r=z,o=Math.round(r/N)))}return{bleed:b,pixelRatio:y,width:n,height:i,dimensions:[n,i],units:v||"px",scaleX:(s=m?Math.round(y*r):Math.round(y*O))/n,scaleY:(a=m?Math.round(y*o):Math.round(y*D))/i,pixelsPerInch:w,viewportWidth:m?Math.round(r):Math.round(O),viewportHeight:m?Math.round(o):Math.round(D),canvasWidth:s,canvasHeight:a,trimWidth:k,trimHeight:T,styleWidth:r,styleHeight:o}}A.units=z;var U=function(t,e){if("string"!=typeof t)throw new TypeError("must specify type string");if(e=e||{},"undefined"==typeof document&&!e.canvas)return null;var n=e.canvas||document.createElement("canvas");"number"==typeof e.width&&(n.width=e.width);"number"==typeof e.height&&(n.height=e.height);var i,r=e;try{var o=[t];0===t.indexOf("webgl")&&o.push("experimental-"+t);for(var s=0;s<o.length;s++)if(i=n.getContext(o[s],r))return i}catch(a){i=null}return i||null};function W(t){var e,n;void 0===t&&(t={});var i=!1;if(!1!==t.canvas){if(!(e=t.context)||"string"==typeof e){var o=t.canvas;o||(o=function(){if(!d())throw new Error("It appears you are runing from Node.js or a non-browser environment. Try passing in an existing { canvas } interface instead.");return document.createElement("canvas")}(),i=!0);var s=e||"2d";if("function"!=typeof o.getContext)throw new Error("The specified { canvas } element does not have a getContext() function, maybe it is not a <canvas> tag?");if(!(e=U(s,r({},t.attributes,{canvas:o}))))throw new Error("Failed at canvas.getContext('"+s+"') - the browser may not support this context, or a different context may already be in use with this canvas.")}if(n=e.canvas,t.canvas&&n!==t.canvas)throw new Error("The { canvas } and { context } settings must point to the same underlying canvas element");t.pixelated&&(e.imageSmoothingEnabled=!1,e.mozImageSmoothingEnabled=!1,e.oImageSmoothingEnabled=!1,e.webkitImageSmoothingEnabled=!1,e.msImageSmoothingEnabled=!1,n.style["image-rendering"]="pixelated")}return{canvas:n,context:e,ownsCanvas:i}}var B=function(){var t=this;this._settings={},this._props={},this._sketch=void 0,this._raf=null,this._recordTimeout=null,this._lastRedrawResult=void 0,this._isP5Resizing=!1,this._keyboardShortcuts=function(t){void 0===t&&(t={});var e=function(e){if(t.enabled()){var n=u();83!==e.keyCode||e.altKey||!e.metaKey&&!e.ctrlKey?32===e.keyCode?t.togglePlay(e):n&&!e.altKey&&75===e.keyCode&&(e.metaKey||e.ctrlKey)&&(e.preventDefault(),t.commit(e)):(e.preventDefault(),t.save(e))}};return{attach:function(){window.addEventListener("keydown",e)},detach:function(){window.removeEventListener("keydown",e)}}}({enabled:function(){return!1!==t.settings.hotkeys},save:function(e){e.shiftKey?t.props.recording?(t.endRecord(),t.run()):t.record():t.props.recording||t.exportFrame()},togglePlay:function(){t.props.playing?t.pause():t.play()},commit:function(e){t.exportFrame({commit:!0})}}),this._animateHandler=function(){return t.animate()},this._resizeHandler=function(){t.resize()&&t.render()}},Y={sketch:{configurable:!0},settings:{configurable:!0},props:{configurable:!0}};Y.sketch.get=function(){return this._sketch},Y.settings.get=function(){return this._settings},Y.props.get=function(){return this._props},B.prototype._computePlayhead=function(t,e){return"number"==typeof e&&isFinite(e)?t/e:0},B.prototype._computeFrame=function(t,e,n,i){return isFinite(n)&&n>1?Math.floor(t*(n-1)):Math.floor(i*e)},B.prototype._computeCurrentFrame=function(){return this._computeFrame(this.props.playhead,this.props.time,this.props.totalFrames,this.props.fps)},B.prototype._getSizeProps=function(){var t=this.props;return{width:t.width,height:t.height,pixelRatio:t.pixelRatio,canvasWidth:t.canvasWidth,canvasHeight:t.canvasHeight,viewportWidth:t.viewportWidth,viewportHeight:t.viewportHeight}},B.prototype.run=function(){if(!this.sketch)throw new Error("should wait until sketch is loaded before trying to play()");return!1!==this.settings.playing&&this.play(),"function"==typeof this.sketch.dispose&&console.warn("In canvas-sketch@0.0.23 the dispose() event has been renamed to unload()"),this.props.started||(this._signalBegin(),this.props.started=!0),this.tick(),this.render(),this},B.prototype._cancelTimeouts=function(){null!=this._raf&&"undefined"!=typeof window&&"function"==typeof window.cancelAnimationFrame&&(window.cancelAnimationFrame(this._raf),this._raf=null),null!=this._recordTimeout&&(clearTimeout(this._recordTimeout),this._recordTimeout=null)},B.prototype.play=function(){var t=this.settings.animate;"animation"in this.settings&&(t=!0,console.warn("[canvas-sketch] { animation } has been renamed to { animate }")),t&&(d()?this.props.playing||(this.props.started||(this._signalBegin(),this.props.started=!0),this.props.playing=!0,this._cancelTimeouts(),this._lastTime=a(),this._raf=window.requestAnimationFrame(this._animateHandler)):console.error("[canvas-sketch] WARN: Using { animate } in Node.js is not yet supported"))},B.prototype.pause=function(){this.props.recording&&this.endRecord(),this.props.playing=!1,this._cancelTimeouts()},B.prototype.togglePlay=function(){this.props.playing?this.pause():this.play()},B.prototype.stop=function(){this.pause(),this.props.frame=0,this.props.playhead=0,this.props.time=0,this.props.deltaTime=0,this.props.started=!1,this.render()},B.prototype.record=function(){var t=this;if(!this.props.recording)if(d()){this.stop(),this.props.playing=!0,this.props.recording=!0;var e=this._createExportOptions({sequence:!0}),n=1/this.props.fps;this._cancelTimeouts();var i,r=function(){return t.props.recording?(t.props.deltaTime=n,t.tick(),t.exportFrame(e).then(function(){t.props.recording&&(t.props.deltaTime=0,t.props.frame++,t.props.frame<t.props.totalFrames?(t.props.time+=n,t.props.playhead=t._computePlayhead(t.props.time,t.props.duration),t._recordTimeout=setTimeout(r,0)):(console.log("Finished recording"),t._signalEnd(),t.endRecord(),t.stop(),t.run()))})):Promise.resolve()};this.props.started||(this._signalBegin(),this.props.started=!0),this.sketch&&"function"==typeof this.sketch.beginRecord&&this._wrapContextScale(function(e){return t.sketch.beginRecord(e)}),(i=e,void 0===i&&(i={}),R(!0,i)).catch(function(t){console.error(t)}).then(function(e){t._raf=window.requestAnimationFrame(r)})}else console.error("[canvas-sketch] WARN: Recording from Node.js is not yet supported")},B.prototype._signalBegin=function(){var t=this;this.sketch&&"function"==typeof this.sketch.begin&&this._wrapContextScale(function(e){return t.sketch.begin(e)})},B.prototype._signalEnd=function(){var t=this;this.sketch&&"function"==typeof this.sketch.end&&this._wrapContextScale(function(e){return t.sketch.end(e)})},B.prototype.endRecord=function(){var t,e=this,n=this.props.recording;return this._cancelTimeouts(),this.props.recording=!1,this.props.deltaTime=0,this.props.playing=!1,(void 0===t&&(t={}),R(!1,t)).catch(function(t){console.error(t)}).then(function(){n&&e.sketch&&"function"==typeof e.sketch.endRecord&&e._wrapContextScale(function(t){return e.sketch.endRecord(t)})})},B.prototype._createExportOptions=function(t){return void 0===t&&(t={}),{sequence:t.sequence,save:t.save,fps:this.props.fps,frame:t.sequence?this.props.frame:void 0,file:this.settings.file,name:this.settings.name,prefix:this.settings.prefix,suffix:this.settings.suffix,encoding:this.settings.encoding,encodingQuality:this.settings.encodingQuality,timeStamp:t.timeStamp||g(new Date,"yyyy.mm.dd-HH.MM.ss"),totalFrames:isFinite(this.props.totalFrames)?Math.max(0,this.props.totalFrames):1e3}},B.prototype.exportFrame=function(t){var e=this;if(void 0===t&&(t={}),!this.sketch)return Promise.all([]);"function"==typeof this.sketch.preExport&&this.sketch.preExport();var n=this._createExportOptions(t),i=u(),o=Promise.resolve();if(i&&t.commit&&"function"==typeof i.commit){var s=r({},n),a=i.commit(s);o=p(a)?a:Promise.resolve(a)}return o.then(function(t){return e._doExportFrame(r({},n,{hash:t||""}))}).then(function(t){return 1===t.length?t[0]:t})},B.prototype._doExportFrame=function(t){var e=this;void 0===t&&(t={}),this._props.exporting=!0,this.resize();var n=this.render(),i=this.props.canvas;return void 0===n&&(n=[i]),n=(n=[].concat(n).filter(Boolean)).map(function(e){var n,i="object"==typeof e&&e&&("data"in e||"dataURL"in e),o=i?e.data:e,s=i?r({},e,{data:o}):{data:o};if(c(n=o)&&/canvas/i.test(n.nodeName)&&"function"==typeof n.getContext){var a=function(t,e){void 0===e&&(e={});var n=e.encoding||"image/png";if(!T.includes(n))throw new Error("Invalid canvas encoding "+n);var i=(n.split("/")[1]||"").replace(/jpeg/i,"jpg");return i&&(i=("."+i).toLowerCase()),{extension:i,type:n,dataURL:t.toDataURL(n,e.encodingQuality)}}(o,{encoding:s.encoding||t.encoding,encodingQuality:h(s.encodingQuality,t.encodingQuality,.95)}),p=a.dataURL,u=a.extension,d=a.type;return Object.assign(s,{dataURL:p,extension:u,type:d})}return s}),this._props.exporting=!1,this.resize(),this.render(),Promise.all(n.map(function(e,n,i){var o=r({extension:"",prefix:"",suffix:""},t,e,{layer:n,totalLayers:i.length}),s=!1!==t.save&&e.save;for(var a in o.save=!1!==s,o.filename=P(o),delete o.encoding,delete o.encodingQuality,o)void 0===o[a]&&delete o[a];var p=Promise.resolve({});if(o.save){var c=o.data;if(o.dataURL)p=M(o.dataURL,o);else p=function(t,e){void 0===e&&(e={});var n=Array.isArray(t)?t:[t];return E(new window.Blob(n,{type:e.type||""}),e)}(c,o)}return p.then(function(t){return Object.assign({},o,t)})})).then(function(n){var i=n.filter(function(t){return t.save});if(i.length>0){var r,o=i.find(function(t){return t.outputName}),s=i.some(function(t){return t.client}),a=i.some(function(t){return t.stream});r=i.length>1?i.length:o?o.outputName+"/"+i[0].filename:""+i[0].filename;var p="";if(t.sequence)p=isFinite(e.props.totalFrames)?" (frame "+(t.frame+1)+" / "+e.props.totalFrames+")":" (frame "+t.frame+")";else i.length>1&&(p=" files");var c=s?"canvas-sketch-cli":"canvas-sketch",u=a?"Streaming into":"Exported";console.log("%c["+c+"]%c "+u+" %c"+r+"%c"+p,"color: #8e8e8e;","color: initial;","font-weight: bold;","font-weight: initial;")}return"function"==typeof e.sketch.postExport&&e.sketch.postExport(),n})},B.prototype._wrapContextScale=function(t){this._preRender(),t(this.props),this._postRender()},B.prototype._preRender=function(){var t=this.props;this.props.gl||!t.context||t.p5?t.p5&&t.p5.scale(t.scaleX/t.pixelRatio,t.scaleY/t.pixelRatio):(t.context.save(),!1!==this.settings.scaleContext&&t.context.scale(t.scaleX,t.scaleY))},B.prototype._postRender=function(){var t=this.props;this.props.gl||!t.context||t.p5||t.context.restore(),t.gl&&!1!==this.settings.flush&&!t.p5&&t.gl.flush()},B.prototype.tick=function(){this.sketch&&"function"==typeof this.sketch.tick&&(this._preRender(),this.sketch.tick(this.props),this._postRender())},B.prototype.render=function(){return this.props.p5?(this._lastRedrawResult=void 0,this.props.p5.redraw(),this._lastRedrawResult):this.submitDrawCall()},B.prototype.submitDrawCall=function(){if(this.sketch){var t,e=this.props;return this._preRender(),"function"==typeof this.sketch?t=this.sketch(e):"function"==typeof this.sketch.render&&(t=this.sketch.render(e)),this._postRender(),t}},B.prototype.update=function(t){var e=this;void 0===t&&(t={});var n=["animate"];Object.keys(t).forEach(function(t){if(n.indexOf(t)>=0)throw new Error("Sorry, the { "+t+" } option is not yet supported with update().")});var i=this._settings.canvas,r=this._settings.context;for(var o in t){var s=t[o];void 0!==s&&(e._settings[o]=s)}var a=Object.assign({},this._settings,t);if("time"in t&&"frame"in t)throw new Error("You should specify { time } or { frame } but not both");if("time"in t?delete a.frame:"frame"in t&&delete a.time,"duration"in t&&"totalFrames"in t)throw new Error("You should specify { duration } or { totalFrames } but not both");"duration"in t?delete a.totalFrames:"totalFrames"in t&&delete a.duration,"data"in t&&(this._props.data=t.data);var p=this.getTimeProps(a);if(Object.assign(this._props,p),i!==this._settings.canvas||r!==this._settings.context){var c=W(this._settings),u=c.canvas,h=c.context;this.props.canvas=u,this.props.context=h,this._setupGLKey(),this._appendCanvasIfNeeded()}return t.p5&&"function"!=typeof t.p5&&(this.props.p5=t.p5,this.props.p5.draw=function(){e._isP5Resizing||(e._lastRedrawResult=e.submitDrawCall())}),"playing"in t&&(t.playing?this.play():this.pause()),C(this._settings),this.resize(),this.render(),this.props},B.prototype.resize=function(){var t=this._getSizeProps(),e=this.settings,n=this.props,i=I(n,e);Object.assign(this._props,i);var r=this.props,o=r.pixelRatio,s=r.canvasWidth,a=r.canvasHeight,p=r.styleWidth,c=r.styleHeight,u=this.props.canvas;u&&!1!==e.resizeCanvas&&(n.p5?u.width===s&&u.height===a||(this._isP5Resizing=!0,n.p5.pixelDensity(o),n.p5.resizeCanvas(s/o,a/o,!1),this._isP5Resizing=!1):(u.width!==s&&(u.width=s),u.height!==a&&(u.height=a)),d()&&!1!==e.styleCanvas&&(u.style.width=p+"px",u.style.height=c+"px"));var h=this._getSizeProps(),l=!y(t,h);return l&&this._sizeChanged(),l},B.prototype._sizeChanged=function(){this.sketch&&"function"==typeof this.sketch.resize&&this.sketch.resize(this.props)},B.prototype.animate=function(){if(this.props.playing)if(d()){this._raf=window.requestAnimationFrame(this._animateHandler);var t=a(),e=1e3/this.props.fps,n=t-this._lastTime,i=this.props.duration,r="number"==typeof i&&isFinite(i),o=!0,s=this.settings.playbackRate;"fixed"===s?n=e:"throttle"===s?n>e?(t-=n%e,this._lastTime=t):o=!1:this._lastTime=t;var p=n/1e3,c=this.props.time+p*this.props.timeScale;c<0&&r&&(c=i+c);var u=!1,h=!1,l=!1!==this.settings.loop;if(r&&c>=i&&(l?(o=!0,c%=i,h=!0):(o=!1,c=i,u=!0),this._signalEnd()),o){this.props.deltaTime=p,this.props.time=c,this.props.playhead=this._computePlayhead(c,i);var f=this.props.frame;this.props.frame=this._computeCurrentFrame(),h&&this._signalBegin(),f!==this.props.frame&&this.tick(),this.render(),this.props.deltaTime=0}u&&this.pause()}else console.error("[canvas-sketch] WARN: Animation in Node.js is not yet supported")},B.prototype.dispatch=function(t){if("function"!=typeof t)throw new Error("must pass function into dispatch()");t(this.props),this.render()},B.prototype.mount=function(){this._appendCanvasIfNeeded()},B.prototype.unmount=function(){d()&&(window.removeEventListener("resize",this._resizeHandler),this._keyboardShortcuts.detach()),this.props.canvas.parentElement&&this.props.canvas.parentElement.removeChild(this.props.canvas)},B.prototype._appendCanvasIfNeeded=function(){d()&&(!1!==this.settings.parent&&this.props.canvas&&!this.props.canvas.parentElement&&(this.settings.parent||document.body).appendChild(this.props.canvas))},B.prototype._setupGLKey=function(){var t;this.props.context&&("function"==typeof(t=this.props.context).clear&&"function"==typeof t.clearColor&&"function"==typeof t.bufferData?this._props.gl=this.props.context:delete this._props.gl)},B.prototype.getTimeProps=function(t){void 0===t&&(t={});var e=t.duration,n=t.totalFrames,i=h(t.timeScale,1),r=h(t.fps,24),o="number"==typeof e&&isFinite(e),s="number"==typeof n&&isFinite(n),a=o?Math.floor(r*e):void 0,p=s?n/r:void 0;if(o&&s&&a!==n)throw new Error("You should specify either duration or totalFrames, but not both. Or, they must match exactly.");void 0===t.dimensions&&void 0!==t.units&&console.warn("You've specified a { units } setting but no { dimension }, so the units will be ignored."),n=h(n,a,1/0),e=h(e,p,1/0);var c=t.time,u=t.frame,d="number"==typeof c&&isFinite(c),l="number"==typeof u&&isFinite(u),f=0,m=0,y=0;if(d&&l)throw new Error("You should specify either start frame or time, but not both.");return d?(f=c,y=this._computePlayhead(f,e),m=this._computeFrame(y,f,n,r)):l&&(f=(m=u)/r,y=this._computePlayhead(f,e)),{playhead:y,time:f,frame:m,duration:e,totalFrames:n,fps:r,timeScale:i}},B.prototype.setup=function(t){var e=this;if(void 0===t&&(t={}),this.sketch)throw new Error("Multiple setup() calls not yet supported.");this._settings=Object.assign({},t,this._settings),C(this._settings);var n=W(this._settings),i=n.context,r=n.canvas,o=this.getTimeProps(this._settings);this._props=Object.assign({},o,{canvas:r,context:i,deltaTime:0,started:!1,exporting:!1,playing:!1,recording:!1,settings:this.settings,data:this.settings.data,render:function(){return e.render()},togglePlay:function(){return e.togglePlay()},dispatch:function(t){return e.dispatch(t)},tick:function(){return e.tick()},resize:function(){return e.resize()},update:function(t){return e.update(t)},exportFrame:function(t){return e.exportFrame(t)},record:function(){return e.record()},play:function(){return e.play()},pause:function(){return e.pause()},stop:function(){return e.stop()}}),this._setupGLKey(),this.resize()},B.prototype.loadAndRun=function(t,e){var n=this;return this.load(t,e).then(function(){return n.run(),n})},B.prototype.unload=function(){var t=this;this.pause(),this.sketch&&("function"==typeof this.sketch.unload&&this._wrapContextScale(function(e){return t.sketch.unload(e)}),this._sketch=null)},B.prototype.destroy=function(){this.unload(),this.unmount()},B.prototype.load=function(t,e){var n=this;if("function"!=typeof t)throw new Error("The function must take in a function as the first parameter. Example:\n  canvasSketcher(() => { ... }, settings)");this.sketch&&this.unload(),void 0!==e&&this.update(e),this._preRender();var i=Promise.resolve();if(this.settings.p5){if(!d())throw new Error("[canvas-sketch] ERROR: Using p5.js in Node.js is not supported");i=new Promise(function(t){var e,i=n.settings.p5;i.p5&&(e=i.preload,i=i.p5);var r=function(i){e&&(i.preload=function(){return e(i)}),i.setup=function(){var e=n.props,r="webgl"===n.settings.context,o=r?i.WEBGL:i.P2D;i.noLoop(),i.pixelDensity(e.pixelRatio),i.createCanvas(e.viewportWidth,e.viewportHeight,o),r&&n.settings.attributes&&i.setAttributes(n.settings.attributes),n.update({p5:i,canvas:i.canvas,context:i._renderer.drawingContext}),t()}};if("function"==typeof i)new i(r);else{if("function"!=typeof window.createCanvas)throw new Error("{ p5 } setting is passed but can't find p5.js in global (window) scope. Maybe you did not create it globally?\nnew p5(); // <-- attaches to global scope");r(window)}})}return i.then(function(){var e=t(n.props);return p(e)||(e=Promise.resolve(e)),e}).then(function(t){return t||(t={}),n._sketch=t,d()&&(n._keyboardShortcuts.attach(),window.addEventListener("resize",n._resizeHandler)),n._postRender(),n._sizeChanged(),n}).catch(function(t){throw console.warn("Could not start sketch, the async loading function rejected with an error:\n    Error: "+t.message),t})},Object.defineProperties(B.prototype,Y);var q="hot-id-cache",K=[];function G(t,e){if(void 0===e&&(e={}),e.p5){if(e.canvas||e.context&&"string"!=typeof e.context)throw new Error('In { p5 } mode, you can\'t pass your own canvas or context, unless the context is a "webgl" or "2d" string');var n="string"==typeof e.context&&e.context;e=Object.assign({},e,{canvas:!1,context:n})}var i,r,o=(i=u())&&i.hot;o&&(r=h(e.id,"$__DEFAULT_CANVAS_SKETCH_ID__$"));var s=o&&"string"==typeof r;s&&K.includes(r)&&(console.warn("Warning: You have multiple calls to canvasSketch() in --hot mode. You must pass unique { id } strings in settings to enable hot reload across multiple sketches. ",r),s=!1);var a=Promise.resolve();if(s){K.push(r);var p=function(t){var e=u();if(e)return e[q]=e[q]||{},e[q][t]}(r);if(p){var c=function(){var t,n=(t=p.manager,e.animate?{time:t.props.time}:void 0);return p.manager.destroy(),n};a=p.load.then(c).catch(c)}}return a.then(function(n){var i,o,a,p,c=new B;return t?(e=Object.assign({},e,n),c.setup(e),c.mount(),i=c.loadAndRun(t)):i=Promise.resolve(c),s&&(o=r,a={load:i,manager:c},(p=u())&&(p[q]=p[q]||{},p[q][o]=a)),i})}return G.canvasSketch=G,G.PaperSizes=S,G});
},{}],"NlR3":[function(require,module,exports) {
"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&l(t,e)}function r(t){var e=f();return function(){var n,r=p(t);if(e){var u=p(this).constructor;n=Reflect.construct(r,arguments,u)}else n=r.apply(this,arguments);return o(this,n)}}function o(e,n){return!n||"object"!==t(n)&&"function"!=typeof n?u(e):n}function u(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function c(t){var e="function"==typeof Map?new Map:void 0;return(c=function(t){if(null===t||!a(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,n)}function n(){return i(t,arguments,p(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),l(n,t)})(t)}function i(t,e,n){return(i=f()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var o=new(Function.bind.apply(t,r));return n&&l(o,n.prototype),o}).apply(null,arguments)}function f(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}function a(t){return-1!==Function.toString.call(t).indexOf("[native code]")}function l(t,e){return(l=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function p(t){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Line=exports.Circle=void 0;var s=function(t){n(u,c(Path2D));var o=r(u);function u(t,n,r){var c;return e(this,u),(c=o.call(this)).arc(t,n,r,0,2*Math.PI),c}return u}();exports.Circle=s;var y=function(t){n(u,c(Path2D));var o=r(u);function u(t,n,r,c){var i;return e(this,u),(i=o.call(this)).moveTo(t,n),i.lineTo(r,c),i}return u}();exports.Line=y;
},{}],"EyLH":[function(require,module,exports) {
"use strict";function e(e=0,r=1){return e+Math.random()*(r-e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.random=e;
},{}],"Focm":[function(require,module,exports) {
"use strict";var t=i(require("canvas-sketch")),s=require("../../../utils/geometries"),e=require("../../../utils/random");function i(t){return t&&t.__esModule?t:{default:t}}function l(t){return 0===t?0:2**(10*t-10)}class a{constructor(t={}){const{x:e,y:i,size:l}=t;this.x=e,this.pupilX=e,this.y=i,this.pupilY=i,this.scale=0,this.size=l,this.sclera=new s.Circle(0,0,l),this.pupil=new s.Circle(0,0,l/10),this.blink()}blink(){this.scale=0,this.start=null,setTimeout(()=>this.blink(),(0,e.random)(4e3,6e3))}render(t,s){null==this.start&&(this.start=s),this.scale=l(Math.min((s-this.start)/.1,1)),t.save(),t.translate(this.x,this.y),t.scale(1,this.scale),t.fillStyle="white",t.strokeStyle="black",t.fill(this.sclera),t.stroke(this.sclera),t.restore(),t.save(),t.translate(this.pupilX,this.pupilY),t.fillStyle="black",t.fill(this.pupil),t.restore()}lookAt(t){const s=t.x-this.x,e=t.y-this.y,i=this.size/2,l=Math.atan2(s,e);Math.abs(s)<=i&&Math.abs(e)<=i?(this.pupilX=t.x,this.pupilY=t.y):(this.pupilX=this.x+Math.sin(l)*i,this.pupilY=this.y+Math.cos(l)*i)}}(0,t.default)(t=>{const{context:s,width:i,height:l}=t,n=[new a({x:0,y:0,size:24})],h={x:0,y:0};return s.canvas.addEventListener("mousemove",({clientX:t,clientY:s})=>{h.x=t-i/2,h.y=s-l/2}),s.canvas.addEventListener("touchmove",({touches:t})=>{h.x=t[0].clientX-i/2,h.y=t[0].clientY-l/2}),setTimeout(()=>{s.canvas.addEventListener("click",({clientX:t,clientY:s})=>{const h=t-i/2,r=s-l/2,c=Math.floor((0,e.random)(25,75));n.push(new a({x:h,y:r,size:c}))})},1e3),({time:t})=>{s.translate(i/2,l/2),s.fillStyle="black",s.fillRect(-i/2,-l/2,i,l),n.forEach(e=>{e.render(s,t,h),e.lookAt(h)})}},{animate:!0});
},{"canvas-sketch":"bkbf","../../../utils/geometries":"NlR3","../../../utils/random":"EyLH"}]},{},["Focm"], null)
//# sourceMappingURL=src.cef9ec06.js.map