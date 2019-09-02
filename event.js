import "core-js/modules/es.object.define-property";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import storage from './storage';
storage.setStorageKey('h5_vuex_event');

var Event =
/*#__PURE__*/
function () {
  function Event() {
    _classCallCheck(this, Event);
  }

  _createClass(Event, [{
    key: "emit",
    value: function emit(_ref) {
      var _ref$type = _ref.type,
          type = _ref$type === void 0 ? '' : _ref$type,
          _ref$data = _ref.data,
          data = _ref$data === void 0 ? {} : _ref$data,
          _ref$success = _ref.success,
          success = _ref$success === void 0 ? '' : _ref$success,
          _ref$fail = _ref.fail,
          fail = _ref$fail === void 0 ? '' : _ref$fail,
          _ref$complete = _ref.complete,
          complete = _ref$complete === void 0 ? '' : _ref$complete;
      storage.set(type, data);
    }
  }, {
    key: "on",
    value: function on(_ref2) {
      var _ref2$type = _ref2.type,
          type = _ref2$type === void 0 ? '' : _ref2$type,
          handler = _ref2.handler,
          _ref2$success = _ref2.success,
          success = _ref2$success === void 0 ? '' : _ref2$success,
          _ref2$fail = _ref2.fail,
          fail = _ref2$fail === void 0 ? '' : _ref2$fail,
          _ref2$complete = _ref2.complete,
          complete = _ref2$complete === void 0 ? '' : _ref2$complete;
      storage.on(type, handler);
    }
  }, {
    key: "off",
    value: function off(_ref3) {
      var _ref3$type = _ref3.type,
          type = _ref3$type === void 0 ? '' : _ref3$type,
          handler = _ref3.handler,
          _ref3$success = _ref3.success,
          success = _ref3$success === void 0 ? '' : _ref3$success,
          _ref3$fail = _ref3.fail,
          fail = _ref3$fail === void 0 ? '' : _ref3$fail,
          _ref3$complete = _ref3.complete,
          complete = _ref3$complete === void 0 ? '' : _ref3$complete;
      storage.removeHandle(type, handler);
    }
  }]);

  return Event;
}();

var event = new Event();
export default event;