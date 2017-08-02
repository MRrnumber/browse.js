/** global: browse */

browse.ajax = function(url, options) {
  var xhr = _xhr()
  url = _nonce(url, options)
  _onload(xhr, url, options)
  _timeout(xhr, url, options)
  try {
    _data(options)
    xhr.open(options.method, url, true)
    _headers(xhr, options.headers)
    _contentType(xhr, options)
    xhr.send(options.method.match(__methods_with_data__) && options.data || null)
  }
  catch(e) {
    _ajaxError(e, xhr, url, options)
  }
}

function _xhr() {
  if(window.ActiveXObject && (document.documentMode <= 8 || !window.XMLHttpRequest)) {
    return new window.ActiveXObject('Microsoft.XmlHttp')
  }
  return new window.XMLHttpRequest()
}

function _ajaxError(err, xhr, url, options) {
  var status
  try {
    status = xhr.status
  }
  catch(e) {
    status = 0
  }
  options.error(err.message, status, url, xhr)
}

var
  __ajax_nonce__ = +(new Date()),
  __ready_state_done__ = 4,
  __content_form_urlencoded_regex__ = /application\/x\-www\-form\-urlencoded/,
  __content_form_urlencoded__ = "application/x-www-form-urlencoded; charset=UTF-8",
  __content_json_regex__ = /application\/json/,
  __content_json__ = "application/json; charset=UTF-8",
  //__content_multipart_regex__ = /multipart\/form\-data/,
  //__content_multipart__ = 'multipart/form-data; charset=UTF-8',
  __methods_with_data__ = /^(POST|PATCH|PUT)$/,
  __methods_with_response__ = /^(GET|HEAD|OPTIONS)$/
  //__methods_without_data__ = /^(GET|HEAD|OPTIONS|DELETE)$/,
