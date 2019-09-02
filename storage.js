import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.define-property";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 本地存储api
 * @author https://github.com/DOBEEE
 * @date 2019.6.3
 */
var localStorage = window.localStorage;

var Storage =
/*#__PURE__*/
function () {
  function Storage() {
    _classCallCheck(this, Storage);

    this.uniqueStorageKey = 'h5_vuex';
  }

  _createClass(Storage, [{
    key: "setStorageKey",
    value: function setStorageKey(key) {
      this.uniqueStorageKey = key;
    }
  }, {
    key: "getStorage",
    value: function getStorage() {
      var value = localStorage.getItem(this.uniqueStorageKey);

      if (value) {
        return JSON.parse(value);
      }

      return {};
    }
  }, {
    key: "setStorage",
    value: function setStorage(data) {
      var jsonData = data;

      if (_typeof(data) === 'object') {
        jsonData = JSON.stringify(data);
      } else if (typeof data === 'function') {
        throw new Error('cannot set storeage function');
      }

      var oldValue = localStorage.getItem(this.uniqueStorageKey);
      var setItemEvent = new Event('storageCurrent');
      setItemEvent.newValue = jsonData;
      setItemEvent.oldValue = oldValue;
      window.dispatchEvent(setItemEvent);
      localStorage.setItem(this.uniqueStorageKey, jsonData);
    }
  }, {
    key: "get",
    value: function get(key) {
      var data = this.getStorage();
      return data[key];
    }
  }, {
    key: "set",
    value: function set(key, value) {
      if (typeof value === 'function') {
        throw new Error('cannot set storeage function');
      }

      var data = this.getStorage();
      data[key] = value;
      this.setStorage(data);
    }
  }, {
    key: "remove",
    value: function remove(key) {
      var data = this.getStorage();
      delete data[key];
    }
  }, {
    key: "removeHandle",
    value: function removeHandle(key, handle) {
      window.removeEventListener('storage', window[handle.name + key]);
      window.removeEventListener('storageCurrent', window[handle.name + key]);
    }
  }, {
    key: "clear",
    value: function clear() {
      localStorage.removeItem(this.uniqueStorageKey);
    }
  }, {
    key: "on",
    value: function on(key, cb) {
      var _this = this;

      window[cb.name + key] = function (e) {
        if (e.key !== _this.uniqueStorageKey) {
          // 判断是否是当前storge的修改，不是则退出
          return;
        }

        var newData = JSON.parse(e.newValue)[key];
        var oldData = JSON.parse(e.oldValue)[key];

        if (JSON.stringify(newData) !== JSON.stringify(oldData)) {
          cb(newData, oldData);
        }
      };

      window.addEventListener('storageCurrent', window[cb.name + key]);
      window.addEventListener('storage', window[cb.name + key]);
    }
  }]);

  return Storage;
}();

var storage = new Storage(); // storage.setStorageKey();

export default storage;