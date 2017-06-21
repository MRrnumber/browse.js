#!/usr/bin/node env

'use strict'

const
  path = require('path'),
  fs = require('fs'),
  beautify = require('js-beautify').js_beautify,
  targetFile = path.resolve(__dirname, '../lib/browse.js'),
  orderFile = path.resolve(__dirname, '../src/.order'),
  order = fs.readFileSync(orderFile, 'utf8').trim().split('\n')

console.log('adding header...')
fs.writeFileSync(targetFile, "(/* eslint-disable complexity */ /* eslint-disable max-statements */ /* eslint-disable no-shadow-restricted-names */\nfunction(ns, undefined) {\n/* eslint-enable complexity */ /* eslint-enable max-statements */ /* eslint-enable no-shadow-restricted-names */")
order.forEach(src => {
  console.log('adding src %s', src)
  fs.appendFileSync(targetFile, '\n' + fs.readFileSync(path.resolve(__dirname, '../src/' + src)))
})
console.log('adding footer...')
fs.appendFileSync(targetFile, '\n}(window.browse = window.browse || {}))')

console.log('beautifying...')
fs.writeFile(targetFile, beautify(fs.readFileSync(targetFile, 'utf8'), {
    "indent_size": 2,
    /*"indent_char": " ",
    "indent_with_tabs": false,
    "eol": "\n",
    "end_with_newline": false,
    "indent_level": 0,
    "preserve_newlines": true,
    "max_preserve_newlines": 10,
    "space_in_paren": false,
    "space_in_empty_paren": false,
    "jslint_happy": false,
    "space_after_anon_function": false,
    "brace_style": "collapse",
    "break_chained_methods": false,
    "keep_array_indentation": false,
    "unescape_strings": false,
    "wrap_line_length": 0,
    "e4x": false,
    "comma_first": false,
    "operator_position": "before-newline"*/
}))
