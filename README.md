[![Build Status](https://travis-ci.org/browsejs/browse.js.svg?branch=master)](https://travis-ci.org/browsejs/browse.js) [![codecov](https://codecov.io/gh/browsejs/browse.js/branch/master/graph/badge.svg)](https://codecov.io/gh/browsejs/browse.js) [![Coverage Status](https://coveralls.io/repos/github/browsejs/browse.js/badge.svg?branch=master)](https://coveralls.io/github/browsejs/browse.js?branch=master) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/browsejs/browse.js/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/browsejs/browse.js/?branch=master) [![Code Climate](https://codeclimate.com/github/browsejs/browse.js.svg)](https://codeclimate.com/github/browsejs/browse.js)
# browse.js
Lightweight library of abstractions for cross-browser compatibility

- [Status](#status)
- [APIs](#apis)
- [Browser Compatibility Testing](#browser-compatibility-testing)
    - [Browsers Versions](#browsers-versions)
    - [Tools](#tools)
- [Testing](#testing)
    - [Code Coverage](#code-coverage)
- [Limitations](#limitations)
    - [Browser Limitations](#browser-limitations)
    - [Test Limitations](#test-limitations)
- [Acknowledgements](#acknowledgements)

## Status
> These are the [browsers versions](#browsers-versions) used for testing

API|Issues|Browser Issues|![Chrome](doc/img/browsers/chrome.png)|![Firefox](doc/img/browsers/firefox.png)|![Internet Explorer](doc/img/browsers/internet-explorer.png)|![Opera](doc/img/browsers/opera.png)|![Safari](doc/img/browsers/safari.png)|![Android/Android Browser](doc/img/browsers/android-browser.png)|![iOS/Mobile Safari](doc/img/browsers/mobile-safari.png)|![Edge](doc/img/browsers/edge.png)|![Opera Mobile Browser](doc/img/browsers/opera-browser.png)|![Yandex](doc/img/browsers/yandex.png)
-|-|-|-|-|-|-|-|-|-|-|-|-
[ready](#ready)|||✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[firstChild](#firstchild)|||✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[lastChild](#lastchild)|||✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[next](#next)|||✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[previous](#previous)|||✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[append](#append)||[1](https://github.com/browsejs/browse.js/issues/1)|✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[prepend](#prepend)||[1](https://github.com/browsejs/browse.js/issues/1)|✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[after](#after)||[1](https://github.com/browsejs/browse.js/issues/1)|✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[before](#before)||[1](https://github.com/browsejs/browse.js/issues/1)|✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[getClass](#getclass)|||✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[hasClass](#hasclass)|||✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[addClass](#addclass)|||✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[removeClass](#removeclass)|||✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[style](#style)|||✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[opacity](#opacity)|||✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[hide](#hide)|||✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[show](#show)|||✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[fadeOut](#fadeout)|[16](https://github.com/browsejs/browse.js/issues/16) [17](https://github.com/browsejs/browse.js/issues/17)||✓|✗ 4 5|✓|✓|✗ 5|✓|✓|✓|✓|✓
[fadeIn](#fadein)|[16](https://github.com/browsejs/browse.js/issues/16)||✓|✓|✓|✓|✗ 5|✓|✓|✓|✓|✓
[topLeft](#topleft)||[15](https://github.com/browsejs/browse.js/issues/15) [2](https://github.com/browsejs/browse.js/issues/2) [4](https://github.com/browsejs/browse.js/issues/4) [5](https://github.com/browsejs/browse.js/issues/5) [6](https://github.com/browsejs/browse.js/issues/6)|✓|✓|✓|✓|✓|✓|✗ 3|✓|✓|✓
[scrollY](#scrolly)|[16](https://github.com/browsejs/browse.js/issues/16) [17](https://github.com/browsejs/browse.js/issues/17)|[4](https://github.com/browsejs/browse.js/issues/4)|✓|✗ 4|✓|✓|✗ 5|✓|✓|✓|✗ 11.50|✓
[onclick](#onclick)|||✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[onkeyup](#onkeyup)|||✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[onchange](#onchange)|||✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[trigger](#trigger)|||✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[ajax](#ajax)|[14](https://github.com/browsejs/browse.js/issues/14)||✓|✗ 3.6 4|✓|✓|✓|✓|✓|✓|✗ 11.50|✓

## APIs
### $_
```javascript
var obj = $_(document.body)
// --> obj.element === document.body
// --> document.body.$_ === obj
```
Wraps an HTML element into a `browse.js` object. Returns `null` if the argument is not an HTML element.
### ready
```javascript
$_.ready(function() {
  // do something
})
```
Used to bind a function to call once document loading is complete.
### firstChild
```html
<div id=my-div>
  <div></div>
</div>
```
```javascript
var div = $_(document.getElementById('my-div'))
var ret = div.firstChild()
```
Returns first HTML element child of an HTML element, or `null` if there are no children.
### lastChild
```html
<div id=my-div>
  <div></div>
</div>
```
```javascript
var div = $_(document.getElementById('my-div'))
var ret = div.lastChild()
```
Returns last HTML element child of an HTML element, or `null` if there are no children. 
### next
```html
<div id=my-div></div>
<div></div>
```
```javascript
var div = $_(document.getElementById('my-div'))
var ret = div.next()
```
Returns next HTML element sibling of an HTML element, or `null` if there is no such sibling.
### previous
```html
<div></div>
<div id=my-div></div>
```
```javascript
var div = $_(document.getElementById('my-div'))
var ret = div.previous()
```
Returns previous HTML element sibling of an HTML element, or `null` if there is no such sibling.
### append
```html
<div id=my-div></div>
```
```javascript
var div = $_(document.getElementById('my-div'))
div.append('<div></div>')
```
```html
<div id=my-div>
  <div></div>
</div>
```
Appends given html into an HTML element.
### prepend
```html
<div id=my-div></div>
```
```javascript
var div = $_(document.getElementById('my-div'))
div.prepend('<div></div>')
```
```html
<div id=my-div>
  <div></div>
</div>
```
Prepends given html into an HTML element.
### after
```html
<div id=my-div></div>
```
```javascript
var div = $_(document.getElementById('my-div'))
div.after('<div id=another></div>')
```
```html
<div id=my-div></div>
<div id=another></div>
```
Appends given html after an HTML element.
### before
```html
<div id=my-div></div>
```
```javascript
var div = $_(document.getElementById('my-div'))
div.before('<div id=another></div>')
```
```html
<div id=another></div>
<div id=my-div></div>
```
Prepends given html before an HTML element.
### getClass
```html
<div class="my-class-1 my-class-2" id=my-div></div>
```
```javascript
var div = $_(document.getElementById('my-div'))
div.getClass() // --> "my-class-1 my-class-2"
```
Returns the list of classes of an HTML element.
### hasClass
```html
<div class="my-class-1 my-class-2" id=my-div></div>
```
```javascript
var div = $_(document.getElementById('my-div'))
div.hasClass('my-class-1') // --> true
div.hasClass('my-class-abc') // --> false
```
Returns if an HTML element has a given class.
### addClass
```html
<div id=my-div></div>
```
```javascript
var div = $_(document.getElementById('my-div'))
div.addClass('my-class-1')
```
```html
<div id=my-div class=my-class-1></div>
```
Adds a class to an HTML element.
### removeClass
```html
<div id=my-div class=my-class></div>
```
```javascript
var div = $_(document.getElementById('my-div'))
div.removeClass('my-class')
```
```html
<div id=my-div class=></div>
```
Removes given class from an HTML element.
### style
```html
<div id=my-div style=color:red></div>
```
```javascript
var div = $_(document.getElementById('my-div'))
var color = div.style('color') // --> 'red'
div.style('color', 'blue')
div.style('width', '20px')
```
```html
<div id=my-div style=color:blue;width:20px></div>
```
Sets and gets style properties of an HTML element. For opacity, use [opacity](#opacity). For display, use [hide](#hide) and [show](#show).
### opacity
```html
<div id=my-div></div>
```
```javascript
var div = $_(document.getElementById('my-div'))
var opacity = div.opacity() // --> 1.0
div.opacity(0.4)
```
```html
<div id=my-div style=opacity:0.4></div> // most browsers
<div id=my-div style="filter:alpha(opacity=40)"></div> // old IE
```
Sets and gets opacity of an HTML element.
### hide
```html
<div id=my-div></div>
```
```javascript
var div = $_(document.getElementById('my-div'))
div.hide()
```
```html
<div id=my-div style=display:none></div>
```
Hides an HTML element.
### show
```html
<div id=my-div style=display:none></div>
```
```javascript
var div = $_(document.getElementById('my-div'))
div.show()
```
```html
<div id=my-div></div>
```
Shows a hidden HTML element.
### fadeOut
```html
<div id=my-div></div>
```
```javascript
var div = $_(document.getElementById('my-div'))
div.fadeOut(/*duration*/ 300, /*callback*/ function() {
  // do something
})
```
```html
<div id=my-div style=display:none;opacity:0></div>
```
Fades out an HTML element in given duration (milliseconds) and invokes callback once done.
### fadeIn
```html
<div id=my-div style=display:none;opacity:0></div>
```
```javascript
var div = $_(document.getElementById('my-div'))
div.fadeIn(/*duration*/ 300, /*callback*/ function() {
  // do something
})
```
```html
<div id=my-div style=opacity:1></div>
```
Fades in an HTML element in given duration (milliseconds) and invokes callback once done.
### topLeft
```html
<div id=my-div</div>
```
```javascript
var div = $_(document.getElementById('my-div'))
var topLeft = div.topLeft() // --> { top: 106, left: 203 }
```
Returns the position of an HTML element (independent of window scroll position).
### scrollY
```javascript
$_.scrollY(/*to-Y*/ 100, /*duration*/ 2000, /*callback*/ function() { 
  // do something
})
```
Scrolls window to given `y` position in given duration and invokes callback once done.
### value
```html
<input type=text name=text id=text value=10>
```
```javascript
var text = $_(document.getElementById('text'))
text.value() // --> '10'
text.value('abc')
```
```html
<input type=text name=text id=text value=abc>
```
Gets and sets value of input control HTML elements. Works on all input types, textarea, and buttons.
### onclick
```html
<input type=submit name=submit id=submit>
```
```javascript
var submit = $_(document.getElementById('submit'))
submit.onclick(function(e){
  // do something
})
```
Binds a handler function to an input control element for `click` event. The contents of the `event` argument passed would vary across browsers.
### onkeyup
```html
<input type=text name=text id=text value=10>
```
```javascript
var text = $_(document.getElementById('text'))
text.onkeyup(function(e){
  // do something
})
```
Binds a handler function to an input control element for `keyup` event. The contents of the `event` argument passed would vary across browsers.
### onchange
```html
<input type=text name=text id=text value=10>
```
```javascript
var text = $_(document.getElementById('text'))
text.onchange(function(){
  // do something
})
```
Binds a handler function to an input control element for `change` event.
### trigger
```html
<input type=text name=text id=text value=10>
<input type=submit name=submit id=submit>
```
```javascript
var text = $_(document.getElementById('text'))
text.trigger('change')
text.trigger('keyup', {code: 2, keyCode: 2})
var submit = $_(document.getElementById('submit'))
submit.trigger('click', {button: 1, ctrlKey: true})
```
Triggers events on input control HTML elements.
### ajax
```javascript
$_.ajax(/*url*/ 'http://myhost.com/', /*options*/ {
  method: 'GET',
  cache: false,
  timeout: 5000,
  format: 'json',
  success: function(response, status, url, xhr) {
    // do something
  },
  error: function(error, status, url, xhr) {
    // do something
  }
})
$_.ajax(/*url*/ 'http://myhost.com/', /*options*/ {
  method: 'POST',
  data: {a: 1, b: 2},
  contentType: 'application/json',
  timeout: 5000,
  success: function(response, status, url, xhr) {
    // do something
  },
  error: function(error, status, url, xhr) {
    // do something
  }
})
```
Performs an AJAX request to specied URL using given options. Allowed options are:

Name|Type|Default|Description
-|-|-|-
method|Required|-|Uppercase name of HTTP verb/method used e.g. `GET`, `POST` etc.
success|Required|-|A function to call once there is a 20X status response
error|Required|-|A function to call once there is no or non-20X status response
timeout|Optional|-|If provided, a timeout of given milliseconds is applied to the request
headers|Optional|-|An object containing headers to add to the HTTP request
contentType|Optional|-|Desired value for `Content-type` header. For `POST`, `PATCH`, and `PUT`, the default is `application/x-www-form-urlencoded; charset=UTF-8`
data|Optional|-|A `string` or `object` specifying the data to send with request (e.g. for POST call). Ignored for few methods viz. `GET`, `HEAD`, and `OPTIONS`.
format|Optional|-|One of `json` and `xml`, if provided. The response body is parsed accordingly and processed data is passed to `success` callback.
cache|Optional|true|Either `true` or `false`. If it is `true`, a nonce is added to the URL to avoid response caching in server.

## Browser Compatibility Testing
### Browsers Versions
Browser|Type|Versions
-|-|-
![Chrome](doc/img/browsers/chrome.png)|Browser|15.0-59.0
![Firefox](doc/img/browsers/firefox.png)|Browser|3.6 4.0-54.0
![Internet Explorer](doc/img/browsers/internet-explorer.png)|Browser|6.0-11.0
![Opera](doc/img/browsers/opera.png)|Browser|15.0-45.0
![Safari](doc/img/browsers/safari.png)|Browser|4.0 5.0-5.1 6.0 6.2 7.1
![Android/Android Browser](doc/img/browsers/android-browser.png)|Emulator|2.2-2.3 4.0-4.2 (Android versions)
![iOS/Mobile Safari](doc/img/browsers/mobile-safari.png)|Simulator|3.0 3.2 4.0 4.3 5.0-5.1 6.0-7.0 (iOS versions)
![Edge](doc/img/browsers/edge.png)|Browser|14.0-15.0
![Opera Mobile Browser](doc/img/browsers/opera-browser.png)|Emulator|11.50 (Opera OS)
![Yandex](doc/img/browsers/yandex.png)|Browser|14.12

### Tools
- [Jasmine 1.3.1](https://jasmine.github.io/1.3/introduction?)
- [BrowserStack](https://browserstack.com)
- [cross-browser-tests-runner](https://github.com/cross-browser-tests-runner/cross-browser-tests-runner)'s native runner used to run tests on BrowserStack

## Testing
### Code Coverage
- [Istanbul](https://istanbul.js.org/)
- [cross-browser-tests-runner](https://github.com/cross-browser-tests-runner/cross-browser-tests-runner)'s native runner collects client-side code coverage data after tests and stores locally
- Code coverage uploaded to [codecov.io](https://codecov.io) and [coveralls](https://coveralls.io/)

## Limitations
### Browser Limitations
- [Issue 1](https://github.com/browsejs/browse.js/issues/1): Creating elements with table-related tags
- [Issue 2](https://github.com/browsejs/browse.js/issues/2): No support for `position: fixed`
- [Issue 4](https://github.com/browsejs/browse.js/issues/4): `scrollTo` does not work as expected
- [Issue 5](https://github.com/browsejs/browse.js/issues/5): No support for `getBoundingClientRect`
- [Issue 6](https://github.com/browsejs/browse.js/issues/6): No support for `position: absolute`
### Test Limitations
- [Issue 4](https://github.com/browsejs/browse.js/issues/4): Some hacks for `scrollTo` do not work with Jasmine 1.3 asynchronous tests

## Acknowledgements
[![BrowserStack](doc/img/ack/browserstack-logo.png)](https://www.browserstack.com)
