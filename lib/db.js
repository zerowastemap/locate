"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(dbUri) {
  'use strict';

  var options = {
    promiseLibrary: global.Promise,
    useNewUrlParser: true
  };

  _mongoose.default.set('debug', true);

  _mongoose.default.connect(dbUri, options,
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(err) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!err) {
                _context.next = 2;
                break;
              }

              throw err;

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());

  _mongoose.default.connection.on('connected', function () {
    console.info('Mongoose default connection open');
  }); // If the connection throws an error


  _mongoose.default.connection.on('error', function () {
    console.error('Mongoose default connection error');
  }); // When the connection is disconnected


  _mongoose.default.connection.on('disconnected', function () {
    console.info('Mongoose default connection disconnected');
  }); // If the Node process ends, close the Mongoose connection


  process.on('SIGINT', function () {
    _mongoose.default.connection.close(function () {
      console.info('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
};

exports.default = _default;