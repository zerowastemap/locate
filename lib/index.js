"use strict";

require("@babel/polyfill");

require("now-env");

var _koa = _interopRequireDefault(require("koa"));

var _koaLogger = _interopRequireDefault(require("koa-logger"));

var _db = _interopRequireDefault(require("./db"));

var _model = _interopRequireDefault(require("./model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _db.default)(process.env.DB_URI);
var app = new _koa.default();
app.use((0, _koaLogger.default)());
app.use(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(ctx) {
    var _ctx$request$query, _ctx$request$query$li, limit, _ctx$request$query$la, latitude, _ctx$request$query$lo, longitude, _ctx$request$query$di, distanceKm, maxDistanceInMeters, locations;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ctx$request$query = ctx.request.query, _ctx$request$query$li = _ctx$request$query.limit, limit = _ctx$request$query$li === void 0 ? 100 : _ctx$request$query$li, _ctx$request$query$la = _ctx$request$query.latitude, latitude = _ctx$request$query$la === void 0 ? 50.850340 : _ctx$request$query$la, _ctx$request$query$lo = _ctx$request$query.longitude, longitude = _ctx$request$query$lo === void 0 ? 4.351710 : _ctx$request$query$lo, _ctx$request$query$di = _ctx$request$query.distanceKm, distanceKm = _ctx$request$query$di === void 0 ? 50 : _ctx$request$query$di;
            maxDistanceInMeters = distanceKm * 1000;
            _context.prev = 2;
            _context.next = 5;
            return _model.default.find({
              'geometry.location': {
                $near: {
                  $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                  },
                  $minDistance: 0,
                  $maxDistance: maxDistanceInMeters
                }
              }
            }).where({
              map: true,
              active: true
            }).select('slug cover title url tags address kind cover featured').limit(limit);

          case 5:
            locations = _context.sent;

            if (!locations.length) {
              ctx.throw(404, 'no locations found', {
                status: 404,
                message: 'No locations found',
                data: null
              });
            }

            ctx.body = {
              data: locations
            };
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            ctx.throw(500, 'error', {
              status: 500,
              err: _context.t0
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 10]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
var PORT = 3000;
app.listen(PORT, function () {
  console.log('Listening on port', PORT);
});