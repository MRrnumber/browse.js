/** global: __methods_with_data__ */
/** global: __content_form_urlencoded_regex__ */
/** global: __content_json_regex__ */

function _data(options) {
  if(!_needProcessData(options)) {
    return
  }
  if(!options.contentType || options.contentType.match(__content_form_urlencoded_regex__)) {
    var vars = [ ]
    /* eslint-disable guard-for-in */
    for (var key in options.data) {
      vars.push(key + '=' + encodeURIComponent(options.data[key]))
    }
    /* eslint-enable guard-for-in */
    options.data = vars.join('&')
  }
  else if(options.contentType.match(__content_json_regex__)) {
    options.data = JSON.stringify(options.data)
  }
  /*else if(options.contentType.match(__content_multipart_regex__)) {
    options.data = _multipart(options.data)
  }*/
  else {
    throw new Error('Unsupported content type ' + options.contentType)
  }
}

function _needProcessData(options) {
  return (options.method.match(__methods_with_data__) && options.data && 'object' === typeof(options.data))
}

/*function _multipart(data) {
  if(window.FormData) {
    return _formData(data)
  }
  else {
    return _strMultipart(data)
  }
}

function _formData(data) {
  if(_isDOMElement(data) && 'form' == data.tagName.toLowerCase()) {
    return new window.FormData(data)
  }
  else {
    var formData = new window.FormData()
    for(var key in data) {
      formData.append(key, data[key])
    }
    return formData
  }
}

function _strMultipart(data) {
}*/
