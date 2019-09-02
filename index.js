import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.reduce";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.split";
import "core-js/modules/web.dom-collections.iterator";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import storage from './storage';
import storageEvent from './event';
import merge from 'deepmerge';
export default function (_ref) {
  var _ref$key = _ref.key,
      key = _ref$key === void 0 ? 'h5_vuex' : _ref$key,
      _ref$filter = _ref.filter,
      filter = _ref$filter === void 0 ? function () {
    return true;
  } : _ref$filter,
      _ref$event = _ref.event,
      event = _ref$event === void 0 ? storageEvent : _ref$event,
      _ref$paths = _ref.paths,
      paths = _ref$paths === void 0 ? [] : _ref$paths;
  var event_key = 'h5_vuex_event';

  function subscriber(store) {
    return function (handler) {
      return store.subscribe(handler);
    };
  }

  function get(object, path, def) {
    return (object = (path.split ? path.split('.') : path).reduce(function (obj, p) {
      return obj && obj[p];
    }, object)) === undefined ? def : object;
  }

  function set(object, path, val, obj) {
    return (path = path.split ? path.split('.') : path).slice(0, -1).reduce(function (obj, p) {
      return obj[p] = obj[p] || {};
    }, obj = object)[path.pop()] = val, object;
  }

  function reducer(state, paths) {
    return paths.length === 0 ? state : paths.reduce(function (substate, path) {
      return set(substate, path, get(state, path));
    }, {});
  }

  return function (store) {
    storage.setStorageKey(key);
    var cachedState = storage.getStorage();

    if (_typeof(cachedState) === 'object' && cachedState !== null) {
      // 每次对cachedState进行merge，防止state新增字段初始化时丢失
      store.replaceState(merge(store.state, cachedState, {
        arrayMerge: function arrayMerge(store, saved) {
          return saved;
        },
        clone: false
      }));
    }

    subscriber(store)(function (mutation, state) {
      if (filter(mutation)) {
        var data = reducer(state, paths);
        storage.setStorage(data);
        event.emit({
          type: event_key,
          data: data
        });
      }
    });

    window._vuexhandle = function (data) {
      store.replaceState(data);
    };

    event.off({
      type: event_key,
      handler: window._vuexhandle
    });
    event.on({
      type: event_key,
      handler: window._vuexhandle
    });
  };
}