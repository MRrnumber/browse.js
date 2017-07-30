/** global: __methods_with_response__ */
/** global: __ajax_nonce__ */
/** global: __methods_with_data__ */
/** global: __content_json_regex__ */
/** global: __content_json__ */
/** global: __content_form_urlencoded_regex__ */
/** global: __content_form_urlencoded__ */

function _nonce(url, options) {
  if(false === options.cache && options.method.match(__methods_with_response__)) {
    if(!url.match(/_=/)) {
      url += !url.match(/\?/)
        ? '?_='
        : url.match(/\?$/)
          ? '_='
          : '&_='
      url += __ajax_nonce__++
    }
  }
  return url
}

function _headers(xhr, headers) {
  if(headers) {
    /* eslint-disable guard-for-in */
    for (var key in headers) {
      xhr.setRequestHeader(key, headers[key])
    }
    /* eslint-enable guard-for-in */
  }
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
}

function _contentType(xhr, options) {
  if(_dontNeedContentType(options)) {
    return
  }
  if(!options.contentType || options.contentType.match(__content_form_urlencoded_regex__)) {
    xhr.setRequestHeader('Content-type', __content_form_urlencoded__)
  }
  else if(options.contentType.match(__content_json_regex__)) {
    xhr.setRequestHeader('Content-type', __content_json__)
  }
  /*else if(options.contentType.match(__content_multipart_regex__)) {
    xhr.setRequestHeader('Content-type', __content_multipart__)
  }*/
  else {
    throw new Error('Unsupported content type ' + options.contentType)
  }
}

function _dontNeedContentType(options) {
  return(options.headers && options.headers['Content-type'] || !options.method.match(__methods_with_data__))
}
