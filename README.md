[![Build Status](https://travis-ci.org/browsejs/browse.js.svg?branch=master)](https://travis-ci.org/browsejs/browse.js) [![codecov](https://codecov.io/gh/browsejs/browse.js/branch/master/graph/badge.svg)](https://codecov.io/gh/browsejs/browse.js) [![Coverage Status](https://coveralls.io/repos/github/browsejs/browse.js/badge.svg?branch=master)](https://coveralls.io/github/browsejs/browse.js?branch=master) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/browsejs/browse.js/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/browsejs/browse.js/?branch=master) [![Code Climate](https://codeclimate.com/github/browsejs/browse.js.svg)](https://codeclimate.com/github/browsejs/browse.js)
# browse.js
Lightweight library of abstractions for cross-browser compatibility
## Status
Browsers|![Chrome](doc/img/browsers/chrome.png)|![Firefox](doc/img/browsers/firefox.png)|![Internet Explorer](doc/img/browsers/internet-explorer.png)|![Opera](doc/img/browsers/opera.png)|![Safari](doc/img/browsers/safari.png)|![Android/Android Browser](doc/img/browsers/android-browser.png)|![iOS/Mobile Safari](doc/img/browsers/mobile-safari.png)|![Edge](doc/img/browsers/edge.png)|![Opera Mobile Browser](doc/img/browsers/opera-browser.png)|![Yandex](doc/img/browsers/yandex.png)
-|-|-|-|-|-|-|-|-|-|-
[ready](#ready)|✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[firstChild](#firstchild)|✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[lastChild](#lastchild)|✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[next](#next)|✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[previous](#previous)|✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[append](#append)|✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[prepend](#prepend)|✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[after](#after)|✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[before](#before)|✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[hasClass](#hasclass)|✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[addClass](#addclass)|✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[removeClass](#removeclass)|✓|✓|✓|✓|✓|✓|✓|✓|✓|✓
[topLeft](#topleft)|✓|✓|✓|✓|✓|2.2+|3.2+|✓|✓|✓
## APIs
### browse
```javascript
var obj = browse(document.body)
var obj = $_(document.body)
// --> obj.element === document.body
// --> document.body.$_ === obj
```
Item|Detail
-|-
**Description**|Wraps an HTMLElement object (or equivalent in older browsers) into a `browse.js` object
**Parameters**|`element`: `Any`
**Returns**|*`browse.js` object* - if `element` parameter is an HTMLElement (or equivalent) object<br>*`null`* - otherwise
### ready
```javascript
browse.ready(function() {
  // do something
})
$_.ready(function() {
  // do something
})
```
Item|Detail
-|-
**Description**|Allows binding a function to call once document loading is complete
**Parameters**|`callback`: `function`
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
Item|Detail
-|-
**Description**|Returns first HTMLElement child of an HTMLElement element
**Returns**|*`browse.js` object* - if there is a child<br>*`null`* - otherwise
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
Item|Detail
-|-
**Description**|Returns last HTMLElement child of an HTMLElement element
**Returns**|*`browse.js` object* - if there is a child<br>*`null`* - otherwise
### next
```html
<div id=my-div></div>
<div></div>
```
```javascript
var div = $_(document.getElementById('my-div'))
var ret = div.next()
```
Item|Detail
-|-
**Description**|Returns next HTMLElement sibling of an HTMLElement element
**Returns**|*`browse.js` object* - if there is a next sibling<br>*`null`* - otherwise
### previous
```html
<div></div>
<div id=my-div></div>
```
```javascript
var div = $_(document.getElementById('my-div'))
var ret = div.previous()
```
Item|Detail
-|-
**Description**|Returns previous HTMLElement sibling of an HTMLElement element
**Returns**|*`browse.js` object* - if there is a next sibling<br>*`null`* - otherwise
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
Item|Detail
-|-
**Description**|Appends given html into an HTMLElement (or equivalent) element
**Returns**|*`browse.js` object* - on which `append` method is called
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
Item|Detail
-|-
**Description**|Prepends given html into an HTMLElement (or equivalent) element
**Returns**|*`browse.js` object* - on which `prepend` method is called
## Browser Compatibility Testing
### Browsers Versions
Browser|Type|Versions
-|-|-
![Chrome](doc/img/browsers/chrome.png)|Browser|15.0-59.0
![Firefox](doc/img/browsers/firefox.png)|Browser|3.6, 4.0-54.0
![Internet Explorer](doc/img/browsers/internet-explorer.png)|Browser|6.0-11.0
![Opera](doc/img/browsers/opera.png)|Browser|10.6, 11.1, 11.5-11.6, 12.0, 12.10, 12.12, 12.14-12.16, 15.0-45.0
![Safari](doc/img/browsers/safari.png)|Browser|4.0, 5.0-5.1, 6.0, 6.2, 7.1
![Android/Android Browser](doc/img/browsers/android-browser.png)|Emulator|1.5-1.6, 2.2-2.3, 4.0-4.2 (Android versions)
![iOS/Mobile Safari](doc/img/browsers/mobile-safari.png)|Simulator|3.0, 3.2, 4.0, 4.3, 5.0-5.1, 6.0-7.0 (iOS versions)
![Edge](doc/img/browsers/edge.png)|Browser|14.0-15.0
![Opera Mobile Browser](doc/img/browsers/opera-browser.png)|Emulator|11.50 (Opera OS)
![Yandex](doc/img/browsers/yandex.png)|Browser|14.12

### Tools
- [Jasmine 1.3.1](https://jasmine.github.io/1.3/introduction?) unit test framework used as it supports oldest browser versions, as compared to Jasmine 2 or Mocha
- [BrowserStack](https://browserstack.com), cross-browser testing platform
- [cross-browser-tests-runner](https://github.com/cross-browser-tests-runner/cross-browser-tests-runner)'s native runner used to run tests on BrowserStack, as it supports oldests browser versions

## Testing
### Code Coverage
- [Istanbul](https://istanbul.js.org/) used for instrumenting source code
- [cross-browser-tests-runner](https://github.com/cross-browser-tests-runner/cross-browser-tests-runner)'s native runner collects client-side code coverage data after tests and stores locally
- Code coverage uploaded to [codecov.io](https://codecov.io) and [coveralls](https://coveralls.io/) for reporting

## Acknowledgements
[![BrowserStack](doc/img/ack/browserstack-logo.png)](https://www.browserstack.com)
