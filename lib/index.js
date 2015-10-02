/**
 * Imports
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

/**
 * Fetch middleware
 */

function fetchMiddleware(_ref) {
  var dispatch = _ref.dispatch;
  var getState = _ref.getState;

  return function (next) {
    return function (action) {
      return action.type === 'FETCH' ? (0, _isomorphicFetch2['default'])(action.payload.url, action.payload.params).then(checkStatus).then(deserialize, deserialize) : next(action);
    };
  };
}

/**
 * Deserialize the request body
 */

function deserialize(res) {
  var header = res.headers.get('Content-Type');
  return header && header.indexOf('application/json') > -1 ? res.json() : res.text();
}

/**
 * Check the status and reject the promise if it's not in the 200 range
 */

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    throw res;
  }
}

/**
 * Exports
 */

exports['default'] = fetchMiddleware;
module.exports = exports['default'];