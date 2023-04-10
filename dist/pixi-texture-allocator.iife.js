"use strict";
var PixiTextureAllocator = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/eventemitter3/index.js
  var require_eventemitter3 = __commonJS({
    "node_modules/eventemitter3/index.js"(exports, module) {
      "use strict";
      var has = Object.prototype.hasOwnProperty;
      var prefix = "~";
      function Events() {
      }
      if (Object.create) {
        Events.prototype = /* @__PURE__ */ Object.create(null);
        if (!new Events().__proto__)
          prefix = false;
      }
      function EE(fn, context2, once) {
        this.fn = fn;
        this.context = context2;
        this.once = once || false;
      }
      function addListener(emitter, event, fn, context2, once) {
        if (typeof fn !== "function") {
          throw new TypeError("The listener must be a function");
        }
        var listener = new EE(fn, context2 || emitter, once), evt = prefix ? prefix + event : event;
        if (!emitter._events[evt])
          emitter._events[evt] = listener, emitter._eventsCount++;
        else if (!emitter._events[evt].fn)
          emitter._events[evt].push(listener);
        else
          emitter._events[evt] = [emitter._events[evt], listener];
        return emitter;
      }
      function clearEvent(emitter, evt) {
        if (--emitter._eventsCount === 0)
          emitter._events = new Events();
        else
          delete emitter._events[evt];
      }
      function EventEmitter() {
        this._events = new Events();
        this._eventsCount = 0;
      }
      EventEmitter.prototype.eventNames = function eventNames() {
        var names = [], events, name;
        if (this._eventsCount === 0)
          return names;
        for (name in events = this._events) {
          if (has.call(events, name))
            names.push(prefix ? name.slice(1) : name);
        }
        if (Object.getOwnPropertySymbols) {
          return names.concat(Object.getOwnPropertySymbols(events));
        }
        return names;
      };
      EventEmitter.prototype.listeners = function listeners(event) {
        var evt = prefix ? prefix + event : event, handlers = this._events[evt];
        if (!handlers)
          return [];
        if (handlers.fn)
          return [handlers.fn];
        for (var i2 = 0, l2 = handlers.length, ee = new Array(l2); i2 < l2; i2++) {
          ee[i2] = handlers[i2].fn;
        }
        return ee;
      };
      EventEmitter.prototype.listenerCount = function listenerCount(event) {
        var evt = prefix ? prefix + event : event, listeners = this._events[evt];
        if (!listeners)
          return 0;
        if (listeners.fn)
          return 1;
        return listeners.length;
      };
      EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt])
          return false;
        var listeners = this._events[evt], len = arguments.length, args, i2;
        if (listeners.fn) {
          if (listeners.once)
            this.removeListener(event, listeners.fn, void 0, true);
          switch (len) {
            case 1:
              return listeners.fn.call(listeners.context), true;
            case 2:
              return listeners.fn.call(listeners.context, a1), true;
            case 3:
              return listeners.fn.call(listeners.context, a1, a2), true;
            case 4:
              return listeners.fn.call(listeners.context, a1, a2, a3), true;
            case 5:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
            case 6:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
          }
          for (i2 = 1, args = new Array(len - 1); i2 < len; i2++) {
            args[i2 - 1] = arguments[i2];
          }
          listeners.fn.apply(listeners.context, args);
        } else {
          var length = listeners.length, j2;
          for (i2 = 0; i2 < length; i2++) {
            if (listeners[i2].once)
              this.removeListener(event, listeners[i2].fn, void 0, true);
            switch (len) {
              case 1:
                listeners[i2].fn.call(listeners[i2].context);
                break;
              case 2:
                listeners[i2].fn.call(listeners[i2].context, a1);
                break;
              case 3:
                listeners[i2].fn.call(listeners[i2].context, a1, a2);
                break;
              case 4:
                listeners[i2].fn.call(listeners[i2].context, a1, a2, a3);
                break;
              default:
                if (!args)
                  for (j2 = 1, args = new Array(len - 1); j2 < len; j2++) {
                    args[j2 - 1] = arguments[j2];
                  }
                listeners[i2].fn.apply(listeners[i2].context, args);
            }
          }
        }
        return true;
      };
      EventEmitter.prototype.on = function on(event, fn, context2) {
        return addListener(this, event, fn, context2, false);
      };
      EventEmitter.prototype.once = function once(event, fn, context2) {
        return addListener(this, event, fn, context2, true);
      };
      EventEmitter.prototype.removeListener = function removeListener(event, fn, context2, once) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt])
          return this;
        if (!fn) {
          clearEvent(this, evt);
          return this;
        }
        var listeners = this._events[evt];
        if (listeners.fn) {
          if (listeners.fn === fn && (!once || listeners.once) && (!context2 || listeners.context === context2)) {
            clearEvent(this, evt);
          }
        } else {
          for (var i2 = 0, events = [], length = listeners.length; i2 < length; i2++) {
            if (listeners[i2].fn !== fn || once && !listeners[i2].once || context2 && listeners[i2].context !== context2) {
              events.push(listeners[i2]);
            }
          }
          if (events.length)
            this._events[evt] = events.length === 1 ? events[0] : events;
          else
            clearEvent(this, evt);
        }
        return this;
      };
      EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
        var evt;
        if (event) {
          evt = prefix ? prefix + event : event;
          if (this._events[evt])
            clearEvent(this, evt);
        } else {
          this._events = new Events();
          this._eventsCount = 0;
        }
        return this;
      };
      EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
      EventEmitter.prototype.addListener = EventEmitter.prototype.on;
      EventEmitter.prefixed = prefix;
      EventEmitter.EventEmitter = EventEmitter;
      if ("undefined" !== typeof module) {
        module.exports = EventEmitter;
      }
    }
  });

  // node_modules/earcut/src/earcut.js
  var require_earcut = __commonJS({
    "node_modules/earcut/src/earcut.js"(exports, module) {
      "use strict";
      module.exports = earcut;
      module.exports.default = earcut;
      function earcut(data, holeIndices, dim) {
        dim = dim || 2;
        var hasHoles = holeIndices && holeIndices.length, outerLen = hasHoles ? holeIndices[0] * dim : data.length, outerNode = linkedList(data, 0, outerLen, dim, true), triangles = [];
        if (!outerNode || outerNode.next === outerNode.prev)
          return triangles;
        var minX, minY, maxX, maxY, x2, y2, invSize;
        if (hasHoles)
          outerNode = eliminateHoles(data, holeIndices, outerNode, dim);
        if (data.length > 80 * dim) {
          minX = maxX = data[0];
          minY = maxY = data[1];
          for (var i2 = dim; i2 < outerLen; i2 += dim) {
            x2 = data[i2];
            y2 = data[i2 + 1];
            if (x2 < minX)
              minX = x2;
            if (y2 < minY)
              minY = y2;
            if (x2 > maxX)
              maxX = x2;
            if (y2 > maxY)
              maxY = y2;
          }
          invSize = Math.max(maxX - minX, maxY - minY);
          invSize = invSize !== 0 ? 32767 / invSize : 0;
        }
        earcutLinked(outerNode, triangles, dim, minX, minY, invSize, 0);
        return triangles;
      }
      function linkedList(data, start, end, dim, clockwise) {
        var i2, last;
        if (clockwise === signedArea(data, start, end, dim) > 0) {
          for (i2 = start; i2 < end; i2 += dim)
            last = insertNode(i2, data[i2], data[i2 + 1], last);
        } else {
          for (i2 = end - dim; i2 >= start; i2 -= dim)
            last = insertNode(i2, data[i2], data[i2 + 1], last);
        }
        if (last && equals(last, last.next)) {
          removeNode(last);
          last = last.next;
        }
        return last;
      }
      function filterPoints(start, end) {
        if (!start)
          return start;
        if (!end)
          end = start;
        var p2 = start, again;
        do {
          again = false;
          if (!p2.steiner && (equals(p2, p2.next) || area(p2.prev, p2, p2.next) === 0)) {
            removeNode(p2);
            p2 = end = p2.prev;
            if (p2 === p2.next)
              break;
            again = true;
          } else {
            p2 = p2.next;
          }
        } while (again || p2 !== end);
        return end;
      }
      function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
        if (!ear)
          return;
        if (!pass && invSize)
          indexCurve(ear, minX, minY, invSize);
        var stop = ear, prev, next;
        while (ear.prev !== ear.next) {
          prev = ear.prev;
          next = ear.next;
          if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
            triangles.push(prev.i / dim | 0);
            triangles.push(ear.i / dim | 0);
            triangles.push(next.i / dim | 0);
            removeNode(ear);
            ear = next.next;
            stop = next.next;
            continue;
          }
          ear = next;
          if (ear === stop) {
            if (!pass) {
              earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1);
            } else if (pass === 1) {
              ear = cureLocalIntersections(filterPoints(ear), triangles, dim);
              earcutLinked(ear, triangles, dim, minX, minY, invSize, 2);
            } else if (pass === 2) {
              splitEarcut(ear, triangles, dim, minX, minY, invSize);
            }
            break;
          }
        }
      }
      function isEar(ear) {
        var a2 = ear.prev, b2 = ear, c2 = ear.next;
        if (area(a2, b2, c2) >= 0)
          return false;
        var ax = a2.x, bx = b2.x, cx = c2.x, ay = a2.y, by = b2.y, cy = c2.y;
        var x0 = ax < bx ? ax < cx ? ax : cx : bx < cx ? bx : cx, y0 = ay < by ? ay < cy ? ay : cy : by < cy ? by : cy, x1 = ax > bx ? ax > cx ? ax : cx : bx > cx ? bx : cx, y1 = ay > by ? ay > cy ? ay : cy : by > cy ? by : cy;
        var p2 = c2.next;
        while (p2 !== a2) {
          if (p2.x >= x0 && p2.x <= x1 && p2.y >= y0 && p2.y <= y1 && pointInTriangle(ax, ay, bx, by, cx, cy, p2.x, p2.y) && area(p2.prev, p2, p2.next) >= 0)
            return false;
          p2 = p2.next;
        }
        return true;
      }
      function isEarHashed(ear, minX, minY, invSize) {
        var a2 = ear.prev, b2 = ear, c2 = ear.next;
        if (area(a2, b2, c2) >= 0)
          return false;
        var ax = a2.x, bx = b2.x, cx = c2.x, ay = a2.y, by = b2.y, cy = c2.y;
        var x0 = ax < bx ? ax < cx ? ax : cx : bx < cx ? bx : cx, y0 = ay < by ? ay < cy ? ay : cy : by < cy ? by : cy, x1 = ax > bx ? ax > cx ? ax : cx : bx > cx ? bx : cx, y1 = ay > by ? ay > cy ? ay : cy : by > cy ? by : cy;
        var minZ = zOrder(x0, y0, minX, minY, invSize), maxZ = zOrder(x1, y1, minX, minY, invSize);
        var p2 = ear.prevZ, n2 = ear.nextZ;
        while (p2 && p2.z >= minZ && n2 && n2.z <= maxZ) {
          if (p2.x >= x0 && p2.x <= x1 && p2.y >= y0 && p2.y <= y1 && p2 !== a2 && p2 !== c2 && pointInTriangle(ax, ay, bx, by, cx, cy, p2.x, p2.y) && area(p2.prev, p2, p2.next) >= 0)
            return false;
          p2 = p2.prevZ;
          if (n2.x >= x0 && n2.x <= x1 && n2.y >= y0 && n2.y <= y1 && n2 !== a2 && n2 !== c2 && pointInTriangle(ax, ay, bx, by, cx, cy, n2.x, n2.y) && area(n2.prev, n2, n2.next) >= 0)
            return false;
          n2 = n2.nextZ;
        }
        while (p2 && p2.z >= minZ) {
          if (p2.x >= x0 && p2.x <= x1 && p2.y >= y0 && p2.y <= y1 && p2 !== a2 && p2 !== c2 && pointInTriangle(ax, ay, bx, by, cx, cy, p2.x, p2.y) && area(p2.prev, p2, p2.next) >= 0)
            return false;
          p2 = p2.prevZ;
        }
        while (n2 && n2.z <= maxZ) {
          if (n2.x >= x0 && n2.x <= x1 && n2.y >= y0 && n2.y <= y1 && n2 !== a2 && n2 !== c2 && pointInTriangle(ax, ay, bx, by, cx, cy, n2.x, n2.y) && area(n2.prev, n2, n2.next) >= 0)
            return false;
          n2 = n2.nextZ;
        }
        return true;
      }
      function cureLocalIntersections(start, triangles, dim) {
        var p2 = start;
        do {
          var a2 = p2.prev, b2 = p2.next.next;
          if (!equals(a2, b2) && intersects(a2, p2, p2.next, b2) && locallyInside(a2, b2) && locallyInside(b2, a2)) {
            triangles.push(a2.i / dim | 0);
            triangles.push(p2.i / dim | 0);
            triangles.push(b2.i / dim | 0);
            removeNode(p2);
            removeNode(p2.next);
            p2 = start = b2;
          }
          p2 = p2.next;
        } while (p2 !== start);
        return filterPoints(p2);
      }
      function splitEarcut(start, triangles, dim, minX, minY, invSize) {
        var a2 = start;
        do {
          var b2 = a2.next.next;
          while (b2 !== a2.prev) {
            if (a2.i !== b2.i && isValidDiagonal(a2, b2)) {
              var c2 = splitPolygon(a2, b2);
              a2 = filterPoints(a2, a2.next);
              c2 = filterPoints(c2, c2.next);
              earcutLinked(a2, triangles, dim, minX, minY, invSize, 0);
              earcutLinked(c2, triangles, dim, minX, minY, invSize, 0);
              return;
            }
            b2 = b2.next;
          }
          a2 = a2.next;
        } while (a2 !== start);
      }
      function eliminateHoles(data, holeIndices, outerNode, dim) {
        var queue = [], i2, len, start, end, list;
        for (i2 = 0, len = holeIndices.length; i2 < len; i2++) {
          start = holeIndices[i2] * dim;
          end = i2 < len - 1 ? holeIndices[i2 + 1] * dim : data.length;
          list = linkedList(data, start, end, dim, false);
          if (list === list.next)
            list.steiner = true;
          queue.push(getLeftmost(list));
        }
        queue.sort(compareX);
        for (i2 = 0; i2 < queue.length; i2++) {
          outerNode = eliminateHole(queue[i2], outerNode);
        }
        return outerNode;
      }
      function compareX(a2, b2) {
        return a2.x - b2.x;
      }
      function eliminateHole(hole, outerNode) {
        var bridge = findHoleBridge(hole, outerNode);
        if (!bridge) {
          return outerNode;
        }
        var bridgeReverse = splitPolygon(bridge, hole);
        filterPoints(bridgeReverse, bridgeReverse.next);
        return filterPoints(bridge, bridge.next);
      }
      function findHoleBridge(hole, outerNode) {
        var p2 = outerNode, hx = hole.x, hy = hole.y, qx = -Infinity, m2;
        do {
          if (hy <= p2.y && hy >= p2.next.y && p2.next.y !== p2.y) {
            var x2 = p2.x + (hy - p2.y) * (p2.next.x - p2.x) / (p2.next.y - p2.y);
            if (x2 <= hx && x2 > qx) {
              qx = x2;
              m2 = p2.x < p2.next.x ? p2 : p2.next;
              if (x2 === hx)
                return m2;
            }
          }
          p2 = p2.next;
        } while (p2 !== outerNode);
        if (!m2)
          return null;
        var stop = m2, mx = m2.x, my = m2.y, tanMin = Infinity, tan;
        p2 = m2;
        do {
          if (hx >= p2.x && p2.x >= mx && hx !== p2.x && pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p2.x, p2.y)) {
            tan = Math.abs(hy - p2.y) / (hx - p2.x);
            if (locallyInside(p2, hole) && (tan < tanMin || tan === tanMin && (p2.x > m2.x || p2.x === m2.x && sectorContainsSector(m2, p2)))) {
              m2 = p2;
              tanMin = tan;
            }
          }
          p2 = p2.next;
        } while (p2 !== stop);
        return m2;
      }
      function sectorContainsSector(m2, p2) {
        return area(m2.prev, m2, p2.prev) < 0 && area(p2.next, m2, m2.next) < 0;
      }
      function indexCurve(start, minX, minY, invSize) {
        var p2 = start;
        do {
          if (p2.z === 0)
            p2.z = zOrder(p2.x, p2.y, minX, minY, invSize);
          p2.prevZ = p2.prev;
          p2.nextZ = p2.next;
          p2 = p2.next;
        } while (p2 !== start);
        p2.prevZ.nextZ = null;
        p2.prevZ = null;
        sortLinked(p2);
      }
      function sortLinked(list) {
        var i2, p2, q, e2, tail, numMerges, pSize, qSize, inSize = 1;
        do {
          p2 = list;
          list = null;
          tail = null;
          numMerges = 0;
          while (p2) {
            numMerges++;
            q = p2;
            pSize = 0;
            for (i2 = 0; i2 < inSize; i2++) {
              pSize++;
              q = q.nextZ;
              if (!q)
                break;
            }
            qSize = inSize;
            while (pSize > 0 || qSize > 0 && q) {
              if (pSize !== 0 && (qSize === 0 || !q || p2.z <= q.z)) {
                e2 = p2;
                p2 = p2.nextZ;
                pSize--;
              } else {
                e2 = q;
                q = q.nextZ;
                qSize--;
              }
              if (tail)
                tail.nextZ = e2;
              else
                list = e2;
              e2.prevZ = tail;
              tail = e2;
            }
            p2 = q;
          }
          tail.nextZ = null;
          inSize *= 2;
        } while (numMerges > 1);
        return list;
      }
      function zOrder(x2, y2, minX, minY, invSize) {
        x2 = (x2 - minX) * invSize | 0;
        y2 = (y2 - minY) * invSize | 0;
        x2 = (x2 | x2 << 8) & 16711935;
        x2 = (x2 | x2 << 4) & 252645135;
        x2 = (x2 | x2 << 2) & 858993459;
        x2 = (x2 | x2 << 1) & 1431655765;
        y2 = (y2 | y2 << 8) & 16711935;
        y2 = (y2 | y2 << 4) & 252645135;
        y2 = (y2 | y2 << 2) & 858993459;
        y2 = (y2 | y2 << 1) & 1431655765;
        return x2 | y2 << 1;
      }
      function getLeftmost(start) {
        var p2 = start, leftmost = start;
        do {
          if (p2.x < leftmost.x || p2.x === leftmost.x && p2.y < leftmost.y)
            leftmost = p2;
          p2 = p2.next;
        } while (p2 !== start);
        return leftmost;
      }
      function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
        return (cx - px) * (ay - py) >= (ax - px) * (cy - py) && (ax - px) * (by - py) >= (bx - px) * (ay - py) && (bx - px) * (cy - py) >= (cx - px) * (by - py);
      }
      function isValidDiagonal(a2, b2) {
        return a2.next.i !== b2.i && a2.prev.i !== b2.i && !intersectsPolygon(a2, b2) && // dones't intersect other edges
        (locallyInside(a2, b2) && locallyInside(b2, a2) && middleInside(a2, b2) && // locally visible
        (area(a2.prev, a2, b2.prev) || area(a2, b2.prev, b2)) || // does not create opposite-facing sectors
        equals(a2, b2) && area(a2.prev, a2, a2.next) > 0 && area(b2.prev, b2, b2.next) > 0);
      }
      function area(p2, q, r2) {
        return (q.y - p2.y) * (r2.x - q.x) - (q.x - p2.x) * (r2.y - q.y);
      }
      function equals(p1, p2) {
        return p1.x === p2.x && p1.y === p2.y;
      }
      function intersects(p1, q1, p2, q2) {
        var o1 = sign2(area(p1, q1, p2));
        var o2 = sign2(area(p1, q1, q2));
        var o3 = sign2(area(p2, q2, p1));
        var o4 = sign2(area(p2, q2, q1));
        if (o1 !== o2 && o3 !== o4)
          return true;
        if (o1 === 0 && onSegment(p1, p2, q1))
          return true;
        if (o2 === 0 && onSegment(p1, q2, q1))
          return true;
        if (o3 === 0 && onSegment(p2, p1, q2))
          return true;
        if (o4 === 0 && onSegment(p2, q1, q2))
          return true;
        return false;
      }
      function onSegment(p2, q, r2) {
        return q.x <= Math.max(p2.x, r2.x) && q.x >= Math.min(p2.x, r2.x) && q.y <= Math.max(p2.y, r2.y) && q.y >= Math.min(p2.y, r2.y);
      }
      function sign2(num) {
        return num > 0 ? 1 : num < 0 ? -1 : 0;
      }
      function intersectsPolygon(a2, b2) {
        var p2 = a2;
        do {
          if (p2.i !== a2.i && p2.next.i !== a2.i && p2.i !== b2.i && p2.next.i !== b2.i && intersects(p2, p2.next, a2, b2))
            return true;
          p2 = p2.next;
        } while (p2 !== a2);
        return false;
      }
      function locallyInside(a2, b2) {
        return area(a2.prev, a2, a2.next) < 0 ? area(a2, b2, a2.next) >= 0 && area(a2, a2.prev, b2) >= 0 : area(a2, b2, a2.prev) < 0 || area(a2, a2.next, b2) < 0;
      }
      function middleInside(a2, b2) {
        var p2 = a2, inside = false, px = (a2.x + b2.x) / 2, py = (a2.y + b2.y) / 2;
        do {
          if (p2.y > py !== p2.next.y > py && p2.next.y !== p2.y && px < (p2.next.x - p2.x) * (py - p2.y) / (p2.next.y - p2.y) + p2.x)
            inside = !inside;
          p2 = p2.next;
        } while (p2 !== a2);
        return inside;
      }
      function splitPolygon(a2, b2) {
        var a22 = new Node(a2.i, a2.x, a2.y), b22 = new Node(b2.i, b2.x, b2.y), an = a2.next, bp = b2.prev;
        a2.next = b2;
        b2.prev = a2;
        a22.next = an;
        an.prev = a22;
        b22.next = a22;
        a22.prev = b22;
        bp.next = b22;
        b22.prev = bp;
        return b22;
      }
      function insertNode(i2, x2, y2, last) {
        var p2 = new Node(i2, x2, y2);
        if (!last) {
          p2.prev = p2;
          p2.next = p2;
        } else {
          p2.next = last.next;
          p2.prev = last;
          last.next.prev = p2;
          last.next = p2;
        }
        return p2;
      }
      function removeNode(p2) {
        p2.next.prev = p2.prev;
        p2.prev.next = p2.next;
        if (p2.prevZ)
          p2.prevZ.nextZ = p2.nextZ;
        if (p2.nextZ)
          p2.nextZ.prevZ = p2.prevZ;
      }
      function Node(i2, x2, y2) {
        this.i = i2;
        this.x = x2;
        this.y = y2;
        this.prev = null;
        this.next = null;
        this.z = 0;
        this.prevZ = null;
        this.nextZ = null;
        this.steiner = false;
      }
      earcut.deviation = function(data, holeIndices, dim, triangles) {
        var hasHoles = holeIndices && holeIndices.length;
        var outerLen = hasHoles ? holeIndices[0] * dim : data.length;
        var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
        if (hasHoles) {
          for (var i2 = 0, len = holeIndices.length; i2 < len; i2++) {
            var start = holeIndices[i2] * dim;
            var end = i2 < len - 1 ? holeIndices[i2 + 1] * dim : data.length;
            polygonArea -= Math.abs(signedArea(data, start, end, dim));
          }
        }
        var trianglesArea = 0;
        for (i2 = 0; i2 < triangles.length; i2 += 3) {
          var a2 = triangles[i2] * dim;
          var b2 = triangles[i2 + 1] * dim;
          var c2 = triangles[i2 + 2] * dim;
          trianglesArea += Math.abs(
            (data[a2] - data[c2]) * (data[b2 + 1] - data[a2 + 1]) - (data[a2] - data[b2]) * (data[c2 + 1] - data[a2 + 1])
          );
        }
        return polygonArea === 0 && trianglesArea === 0 ? 0 : Math.abs((trianglesArea - polygonArea) / polygonArea);
      };
      function signedArea(data, start, end, dim) {
        var sum = 0;
        for (var i2 = start, j2 = end - dim; i2 < end; i2 += dim) {
          sum += (data[j2] - data[i2]) * (data[i2 + 1] + data[j2 + 1]);
          j2 = i2;
        }
        return sum;
      }
      earcut.flatten = function(data) {
        var dim = data[0][0].length, result = { vertices: [], holes: [], dimensions: dim }, holeIndex = 0;
        for (var i2 = 0; i2 < data.length; i2++) {
          for (var j2 = 0; j2 < data[i2].length; j2++) {
            for (var d2 = 0; d2 < dim; d2++)
              result.vertices.push(data[i2][j2][d2]);
          }
          if (i2 > 0) {
            holeIndex += data[i2 - 1].length;
            result.holes.push(holeIndex);
          }
        }
        return result;
      };
    }
  });

  // node_modules/punycode/punycode.js
  var require_punycode = __commonJS({
    "node_modules/punycode/punycode.js"(exports, module) {
      (function(root) {
        var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
        var freeModule = typeof module == "object" && module && !module.nodeType && module;
        var freeGlobal = typeof global == "object" && global;
        if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
          root = freeGlobal;
        }
        var punycode, maxInt = 2147483647, base = 36, tMin = 1, tMax = 26, skew = 38, damp = 700, initialBias = 72, initialN = 128, delimiter = "-", regexPunycode = /^xn--/, regexNonASCII = /[^\x20-\x7E]/, regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, errors = {
          "overflow": "Overflow: input needs wider integers to process",
          "not-basic": "Illegal input >= 0x80 (not a basic code point)",
          "invalid-input": "Invalid input"
        }, baseMinusTMin = base - tMin, floor = Math.floor, stringFromCharCode = String.fromCharCode, key;
        function error(type) {
          throw RangeError(errors[type]);
        }
        function map3(array, fn) {
          var length = array.length;
          var result = [];
          while (length--) {
            result[length] = fn(array[length]);
          }
          return result;
        }
        function mapDomain(string, fn) {
          var parts = string.split("@");
          var result = "";
          if (parts.length > 1) {
            result = parts[0] + "@";
            string = parts[1];
          }
          string = string.replace(regexSeparators, ".");
          var labels = string.split(".");
          var encoded = map3(labels, fn).join(".");
          return result + encoded;
        }
        function ucs2decode(string) {
          var output = [], counter = 0, length = string.length, value, extra;
          while (counter < length) {
            value = string.charCodeAt(counter++);
            if (value >= 55296 && value <= 56319 && counter < length) {
              extra = string.charCodeAt(counter++);
              if ((extra & 64512) == 56320) {
                output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
              } else {
                output.push(value);
                counter--;
              }
            } else {
              output.push(value);
            }
          }
          return output;
        }
        function ucs2encode(array) {
          return map3(array, function(value) {
            var output = "";
            if (value > 65535) {
              value -= 65536;
              output += stringFromCharCode(value >>> 10 & 1023 | 55296);
              value = 56320 | value & 1023;
            }
            output += stringFromCharCode(value);
            return output;
          }).join("");
        }
        function basicToDigit(codePoint) {
          if (codePoint - 48 < 10) {
            return codePoint - 22;
          }
          if (codePoint - 65 < 26) {
            return codePoint - 65;
          }
          if (codePoint - 97 < 26) {
            return codePoint - 97;
          }
          return base;
        }
        function digitToBasic(digit, flag) {
          return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
        }
        function adapt(delta, numPoints, firstTime) {
          var k2 = 0;
          delta = firstTime ? floor(delta / damp) : delta >> 1;
          delta += floor(delta / numPoints);
          for (; delta > baseMinusTMin * tMax >> 1; k2 += base) {
            delta = floor(delta / baseMinusTMin);
          }
          return floor(k2 + (baseMinusTMin + 1) * delta / (delta + skew));
        }
        function decode(input) {
          var output = [], inputLength = input.length, out, i2 = 0, n2 = initialN, bias = initialBias, basic, j2, index, oldi, w2, k2, digit, t2, baseMinusT;
          basic = input.lastIndexOf(delimiter);
          if (basic < 0) {
            basic = 0;
          }
          for (j2 = 0; j2 < basic; ++j2) {
            if (input.charCodeAt(j2) >= 128) {
              error("not-basic");
            }
            output.push(input.charCodeAt(j2));
          }
          for (index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
            for (oldi = i2, w2 = 1, k2 = base; ; k2 += base) {
              if (index >= inputLength) {
                error("invalid-input");
              }
              digit = basicToDigit(input.charCodeAt(index++));
              if (digit >= base || digit > floor((maxInt - i2) / w2)) {
                error("overflow");
              }
              i2 += digit * w2;
              t2 = k2 <= bias ? tMin : k2 >= bias + tMax ? tMax : k2 - bias;
              if (digit < t2) {
                break;
              }
              baseMinusT = base - t2;
              if (w2 > floor(maxInt / baseMinusT)) {
                error("overflow");
              }
              w2 *= baseMinusT;
            }
            out = output.length + 1;
            bias = adapt(i2 - oldi, out, oldi == 0);
            if (floor(i2 / out) > maxInt - n2) {
              error("overflow");
            }
            n2 += floor(i2 / out);
            i2 %= out;
            output.splice(i2++, 0, n2);
          }
          return ucs2encode(output);
        }
        function encode(input) {
          var n2, delta, handledCPCount, basicLength, bias, j2, m2, q, k2, t2, currentValue, output = [], inputLength, handledCPCountPlusOne, baseMinusT, qMinusT;
          input = ucs2decode(input);
          inputLength = input.length;
          n2 = initialN;
          delta = 0;
          bias = initialBias;
          for (j2 = 0; j2 < inputLength; ++j2) {
            currentValue = input[j2];
            if (currentValue < 128) {
              output.push(stringFromCharCode(currentValue));
            }
          }
          handledCPCount = basicLength = output.length;
          if (basicLength) {
            output.push(delimiter);
          }
          while (handledCPCount < inputLength) {
            for (m2 = maxInt, j2 = 0; j2 < inputLength; ++j2) {
              currentValue = input[j2];
              if (currentValue >= n2 && currentValue < m2) {
                m2 = currentValue;
              }
            }
            handledCPCountPlusOne = handledCPCount + 1;
            if (m2 - n2 > floor((maxInt - delta) / handledCPCountPlusOne)) {
              error("overflow");
            }
            delta += (m2 - n2) * handledCPCountPlusOne;
            n2 = m2;
            for (j2 = 0; j2 < inputLength; ++j2) {
              currentValue = input[j2];
              if (currentValue < n2 && ++delta > maxInt) {
                error("overflow");
              }
              if (currentValue == n2) {
                for (q = delta, k2 = base; ; k2 += base) {
                  t2 = k2 <= bias ? tMin : k2 >= bias + tMax ? tMax : k2 - bias;
                  if (q < t2) {
                    break;
                  }
                  qMinusT = q - t2;
                  baseMinusT = base - t2;
                  output.push(
                    stringFromCharCode(digitToBasic(t2 + qMinusT % baseMinusT, 0))
                  );
                  q = floor(qMinusT / baseMinusT);
                }
                output.push(stringFromCharCode(digitToBasic(q, 0)));
                bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                delta = 0;
                ++handledCPCount;
              }
            }
            ++delta;
            ++n2;
          }
          return output.join("");
        }
        function toUnicode(input) {
          return mapDomain(input, function(string) {
            return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
          });
        }
        function toASCII(input) {
          return mapDomain(input, function(string) {
            return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
          });
        }
        punycode = {
          /**
           * A string representing the current Punycode.js version number.
           * @memberOf punycode
           * @type String
           */
          "version": "1.3.2",
          /**
           * An object of methods to convert from JavaScript's internal character
           * representation (UCS-2) to Unicode code points, and back.
           * @see <https://mathiasbynens.be/notes/javascript-encoding>
           * @memberOf punycode
           * @type Object
           */
          "ucs2": {
            "decode": ucs2decode,
            "encode": ucs2encode
          },
          "decode": decode,
          "encode": encode,
          "toASCII": toASCII,
          "toUnicode": toUnicode
        };
        if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
          define("punycode", function() {
            return punycode;
          });
        } else if (freeExports && freeModule) {
          if (module.exports == freeExports) {
            freeModule.exports = punycode;
          } else {
            for (key in punycode) {
              punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
            }
          }
        } else {
          root.punycode = punycode;
        }
      })(exports);
    }
  });

  // node_modules/url/util.js
  var require_util = __commonJS({
    "node_modules/url/util.js"(exports, module) {
      "use strict";
      module.exports = {
        isString: function(arg) {
          return typeof arg === "string";
        },
        isObject: function(arg) {
          return typeof arg === "object" && arg !== null;
        },
        isNull: function(arg) {
          return arg === null;
        },
        isNullOrUndefined: function(arg) {
          return arg == null;
        }
      };
    }
  });

  // node_modules/querystring/decode.js
  var require_decode = __commonJS({
    "node_modules/querystring/decode.js"(exports, module) {
      "use strict";
      function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }
      module.exports = function(qs, sep, eq, options) {
        sep = sep || "&";
        eq = eq || "=";
        var obj = {};
        if (typeof qs !== "string" || qs.length === 0) {
          return obj;
        }
        var regexp = /\+/g;
        qs = qs.split(sep);
        var maxKeys = 1e3;
        if (options && typeof options.maxKeys === "number") {
          maxKeys = options.maxKeys;
        }
        var len = qs.length;
        if (maxKeys > 0 && len > maxKeys) {
          len = maxKeys;
        }
        for (var i2 = 0; i2 < len; ++i2) {
          var x2 = qs[i2].replace(regexp, "%20"), idx = x2.indexOf(eq), kstr, vstr, k2, v2;
          if (idx >= 0) {
            kstr = x2.substr(0, idx);
            vstr = x2.substr(idx + 1);
          } else {
            kstr = x2;
            vstr = "";
          }
          k2 = decodeURIComponent(kstr);
          v2 = decodeURIComponent(vstr);
          if (!hasOwnProperty(obj, k2)) {
            obj[k2] = v2;
          } else if (Array.isArray(obj[k2])) {
            obj[k2].push(v2);
          } else {
            obj[k2] = [obj[k2], v2];
          }
        }
        return obj;
      };
    }
  });

  // node_modules/querystring/encode.js
  var require_encode = __commonJS({
    "node_modules/querystring/encode.js"(exports, module) {
      "use strict";
      var stringifyPrimitive = function(v2) {
        switch (typeof v2) {
          case "string":
            return v2;
          case "boolean":
            return v2 ? "true" : "false";
          case "number":
            return isFinite(v2) ? v2 : "";
          default:
            return "";
        }
      };
      module.exports = function(obj, sep, eq, name) {
        sep = sep || "&";
        eq = eq || "=";
        if (obj === null) {
          obj = void 0;
        }
        if (typeof obj === "object") {
          return Object.keys(obj).map(function(k2) {
            var ks = encodeURIComponent(stringifyPrimitive(k2)) + eq;
            if (Array.isArray(obj[k2])) {
              return obj[k2].map(function(v2) {
                return ks + encodeURIComponent(stringifyPrimitive(v2));
              }).join(sep);
            } else {
              return ks + encodeURIComponent(stringifyPrimitive(obj[k2]));
            }
          }).join(sep);
        }
        if (!name)
          return "";
        return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
      };
    }
  });

  // node_modules/querystring/index.js
  var require_querystring = __commonJS({
    "node_modules/querystring/index.js"(exports) {
      "use strict";
      exports.decode = exports.parse = require_decode();
      exports.encode = exports.stringify = require_encode();
    }
  });

  // node_modules/url/url.js
  var require_url = __commonJS({
    "node_modules/url/url.js"(exports) {
      "use strict";
      var punycode = require_punycode();
      var util = require_util();
      exports.parse = urlParse;
      exports.resolve = urlResolve;
      exports.resolveObject = urlResolveObject;
      exports.format = urlFormat;
      exports.Url = Url;
      function Url() {
        this.protocol = null;
        this.slashes = null;
        this.auth = null;
        this.host = null;
        this.port = null;
        this.hostname = null;
        this.hash = null;
        this.search = null;
        this.query = null;
        this.pathname = null;
        this.path = null;
        this.href = null;
      }
      var protocolPattern = /^([a-z0-9.+-]+:)/i;
      var portPattern = /:[0-9]*$/;
      var simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
      var delims = ["<", ">", '"', "`", " ", "\r", "\n", "	"];
      var unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims);
      var autoEscape = ["'"].concat(unwise);
      var nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape);
      var hostEndingChars = ["/", "?", "#"];
      var hostnameMaxLen = 255;
      var hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
      var hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
      var unsafeProtocol = {
        "javascript": true,
        "javascript:": true
      };
      var hostlessProtocol = {
        "javascript": true,
        "javascript:": true
      };
      var slashedProtocol = {
        "http": true,
        "https": true,
        "ftp": true,
        "gopher": true,
        "file": true,
        "http:": true,
        "https:": true,
        "ftp:": true,
        "gopher:": true,
        "file:": true
      };
      var querystring = require_querystring();
      function urlParse(url2, parseQueryString, slashesDenoteHost) {
        if (url2 && util.isObject(url2) && url2 instanceof Url)
          return url2;
        var u2 = new Url();
        u2.parse(url2, parseQueryString, slashesDenoteHost);
        return u2;
      }
      Url.prototype.parse = function(url2, parseQueryString, slashesDenoteHost) {
        if (!util.isString(url2)) {
          throw new TypeError("Parameter 'url' must be a string, not " + typeof url2);
        }
        var queryIndex = url2.indexOf("?"), splitter = queryIndex !== -1 && queryIndex < url2.indexOf("#") ? "?" : "#", uSplit = url2.split(splitter), slashRegex = /\\/g;
        uSplit[0] = uSplit[0].replace(slashRegex, "/");
        url2 = uSplit.join(splitter);
        var rest = url2;
        rest = rest.trim();
        if (!slashesDenoteHost && url2.split("#").length === 1) {
          var simplePath = simplePathPattern.exec(rest);
          if (simplePath) {
            this.path = rest;
            this.href = rest;
            this.pathname = simplePath[1];
            if (simplePath[2]) {
              this.search = simplePath[2];
              if (parseQueryString) {
                this.query = querystring.parse(this.search.substr(1));
              } else {
                this.query = this.search.substr(1);
              }
            } else if (parseQueryString) {
              this.search = "";
              this.query = {};
            }
            return this;
          }
        }
        var proto = protocolPattern.exec(rest);
        if (proto) {
          proto = proto[0];
          var lowerProto = proto.toLowerCase();
          this.protocol = lowerProto;
          rest = rest.substr(proto.length);
        }
        if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
          var slashes = rest.substr(0, 2) === "//";
          if (slashes && !(proto && hostlessProtocol[proto])) {
            rest = rest.substr(2);
            this.slashes = true;
          }
        }
        if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
          var hostEnd = -1;
          for (var i2 = 0; i2 < hostEndingChars.length; i2++) {
            var hec = rest.indexOf(hostEndingChars[i2]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
              hostEnd = hec;
          }
          var auth, atSign;
          if (hostEnd === -1) {
            atSign = rest.lastIndexOf("@");
          } else {
            atSign = rest.lastIndexOf("@", hostEnd);
          }
          if (atSign !== -1) {
            auth = rest.slice(0, atSign);
            rest = rest.slice(atSign + 1);
            this.auth = decodeURIComponent(auth);
          }
          hostEnd = -1;
          for (var i2 = 0; i2 < nonHostChars.length; i2++) {
            var hec = rest.indexOf(nonHostChars[i2]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
              hostEnd = hec;
          }
          if (hostEnd === -1)
            hostEnd = rest.length;
          this.host = rest.slice(0, hostEnd);
          rest = rest.slice(hostEnd);
          this.parseHost();
          this.hostname = this.hostname || "";
          var ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
          if (!ipv6Hostname) {
            var hostparts = this.hostname.split(/\./);
            for (var i2 = 0, l2 = hostparts.length; i2 < l2; i2++) {
              var part = hostparts[i2];
              if (!part)
                continue;
              if (!part.match(hostnamePartPattern)) {
                var newpart = "";
                for (var j2 = 0, k2 = part.length; j2 < k2; j2++) {
                  if (part.charCodeAt(j2) > 127) {
                    newpart += "x";
                  } else {
                    newpart += part[j2];
                  }
                }
                if (!newpart.match(hostnamePartPattern)) {
                  var validParts = hostparts.slice(0, i2);
                  var notHost = hostparts.slice(i2 + 1);
                  var bit = part.match(hostnamePartStart);
                  if (bit) {
                    validParts.push(bit[1]);
                    notHost.unshift(bit[2]);
                  }
                  if (notHost.length) {
                    rest = "/" + notHost.join(".") + rest;
                  }
                  this.hostname = validParts.join(".");
                  break;
                }
              }
            }
          }
          if (this.hostname.length > hostnameMaxLen) {
            this.hostname = "";
          } else {
            this.hostname = this.hostname.toLowerCase();
          }
          if (!ipv6Hostname) {
            this.hostname = punycode.toASCII(this.hostname);
          }
          var p2 = this.port ? ":" + this.port : "";
          var h2 = this.hostname || "";
          this.host = h2 + p2;
          this.href += this.host;
          if (ipv6Hostname) {
            this.hostname = this.hostname.substr(1, this.hostname.length - 2);
            if (rest[0] !== "/") {
              rest = "/" + rest;
            }
          }
        }
        if (!unsafeProtocol[lowerProto]) {
          for (var i2 = 0, l2 = autoEscape.length; i2 < l2; i2++) {
            var ae = autoEscape[i2];
            if (rest.indexOf(ae) === -1)
              continue;
            var esc = encodeURIComponent(ae);
            if (esc === ae) {
              esc = escape(ae);
            }
            rest = rest.split(ae).join(esc);
          }
        }
        var hash = rest.indexOf("#");
        if (hash !== -1) {
          this.hash = rest.substr(hash);
          rest = rest.slice(0, hash);
        }
        var qm = rest.indexOf("?");
        if (qm !== -1) {
          this.search = rest.substr(qm);
          this.query = rest.substr(qm + 1);
          if (parseQueryString) {
            this.query = querystring.parse(this.query);
          }
          rest = rest.slice(0, qm);
        } else if (parseQueryString) {
          this.search = "";
          this.query = {};
        }
        if (rest)
          this.pathname = rest;
        if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
          this.pathname = "/";
        }
        if (this.pathname || this.search) {
          var p2 = this.pathname || "";
          var s2 = this.search || "";
          this.path = p2 + s2;
        }
        this.href = this.format();
        return this;
      };
      function urlFormat(obj) {
        if (util.isString(obj))
          obj = urlParse(obj);
        if (!(obj instanceof Url))
          return Url.prototype.format.call(obj);
        return obj.format();
      }
      Url.prototype.format = function() {
        var auth = this.auth || "";
        if (auth) {
          auth = encodeURIComponent(auth);
          auth = auth.replace(/%3A/i, ":");
          auth += "@";
        }
        var protocol = this.protocol || "", pathname = this.pathname || "", hash = this.hash || "", host = false, query = "";
        if (this.host) {
          host = auth + this.host;
        } else if (this.hostname) {
          host = auth + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]");
          if (this.port) {
            host += ":" + this.port;
          }
        }
        if (this.query && util.isObject(this.query) && Object.keys(this.query).length) {
          query = querystring.stringify(this.query);
        }
        var search = this.search || query && "?" + query || "";
        if (protocol && protocol.substr(-1) !== ":")
          protocol += ":";
        if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
          host = "//" + (host || "");
          if (pathname && pathname.charAt(0) !== "/")
            pathname = "/" + pathname;
        } else if (!host) {
          host = "";
        }
        if (hash && hash.charAt(0) !== "#")
          hash = "#" + hash;
        if (search && search.charAt(0) !== "?")
          search = "?" + search;
        pathname = pathname.replace(/[?#]/g, function(match) {
          return encodeURIComponent(match);
        });
        search = search.replace("#", "%23");
        return protocol + host + pathname + search + hash;
      };
      function urlResolve(source, relative) {
        return urlParse(source, false, true).resolve(relative);
      }
      Url.prototype.resolve = function(relative) {
        return this.resolveObject(urlParse(relative, false, true)).format();
      };
      function urlResolveObject(source, relative) {
        if (!source)
          return relative;
        return urlParse(source, false, true).resolveObject(relative);
      }
      Url.prototype.resolveObject = function(relative) {
        if (util.isString(relative)) {
          var rel = new Url();
          rel.parse(relative, false, true);
          relative = rel;
        }
        var result = new Url();
        var tkeys = Object.keys(this);
        for (var tk = 0; tk < tkeys.length; tk++) {
          var tkey = tkeys[tk];
          result[tkey] = this[tkey];
        }
        result.hash = relative.hash;
        if (relative.href === "") {
          result.href = result.format();
          return result;
        }
        if (relative.slashes && !relative.protocol) {
          var rkeys = Object.keys(relative);
          for (var rk = 0; rk < rkeys.length; rk++) {
            var rkey = rkeys[rk];
            if (rkey !== "protocol")
              result[rkey] = relative[rkey];
          }
          if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
            result.path = result.pathname = "/";
          }
          result.href = result.format();
          return result;
        }
        if (relative.protocol && relative.protocol !== result.protocol) {
          if (!slashedProtocol[relative.protocol]) {
            var keys = Object.keys(relative);
            for (var v2 = 0; v2 < keys.length; v2++) {
              var k2 = keys[v2];
              result[k2] = relative[k2];
            }
            result.href = result.format();
            return result;
          }
          result.protocol = relative.protocol;
          if (!relative.host && !hostlessProtocol[relative.protocol]) {
            var relPath = (relative.pathname || "").split("/");
            while (relPath.length && !(relative.host = relPath.shift()))
              ;
            if (!relative.host)
              relative.host = "";
            if (!relative.hostname)
              relative.hostname = "";
            if (relPath[0] !== "")
              relPath.unshift("");
            if (relPath.length < 2)
              relPath.unshift("");
            result.pathname = relPath.join("/");
          } else {
            result.pathname = relative.pathname;
          }
          result.search = relative.search;
          result.query = relative.query;
          result.host = relative.host || "";
          result.auth = relative.auth;
          result.hostname = relative.hostname || relative.host;
          result.port = relative.port;
          if (result.pathname || result.search) {
            var p2 = result.pathname || "";
            var s2 = result.search || "";
            result.path = p2 + s2;
          }
          result.slashes = result.slashes || relative.slashes;
          result.href = result.format();
          return result;
        }
        var isSourceAbs = result.pathname && result.pathname.charAt(0) === "/", isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === "/", mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split("/") || [], relPath = relative.pathname && relative.pathname.split("/") || [], psychotic = result.protocol && !slashedProtocol[result.protocol];
        if (psychotic) {
          result.hostname = "";
          result.port = null;
          if (result.host) {
            if (srcPath[0] === "")
              srcPath[0] = result.host;
            else
              srcPath.unshift(result.host);
          }
          result.host = "";
          if (relative.protocol) {
            relative.hostname = null;
            relative.port = null;
            if (relative.host) {
              if (relPath[0] === "")
                relPath[0] = relative.host;
              else
                relPath.unshift(relative.host);
            }
            relative.host = null;
          }
          mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");
        }
        if (isRelAbs) {
          result.host = relative.host || relative.host === "" ? relative.host : result.host;
          result.hostname = relative.hostname || relative.hostname === "" ? relative.hostname : result.hostname;
          result.search = relative.search;
          result.query = relative.query;
          srcPath = relPath;
        } else if (relPath.length) {
          if (!srcPath)
            srcPath = [];
          srcPath.pop();
          srcPath = srcPath.concat(relPath);
          result.search = relative.search;
          result.query = relative.query;
        } else if (!util.isNullOrUndefined(relative.search)) {
          if (psychotic) {
            result.hostname = result.host = srcPath.shift();
            var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
            if (authInHost) {
              result.auth = authInHost.shift();
              result.host = result.hostname = authInHost.shift();
            }
          }
          result.search = relative.search;
          result.query = relative.query;
          if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
            result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
          }
          result.href = result.format();
          return result;
        }
        if (!srcPath.length) {
          result.pathname = null;
          if (result.search) {
            result.path = "/" + result.search;
          } else {
            result.path = null;
          }
          result.href = result.format();
          return result;
        }
        var last = srcPath.slice(-1)[0];
        var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === "." || last === "..") || last === "";
        var up = 0;
        for (var i2 = srcPath.length; i2 >= 0; i2--) {
          last = srcPath[i2];
          if (last === ".") {
            srcPath.splice(i2, 1);
          } else if (last === "..") {
            srcPath.splice(i2, 1);
            up++;
          } else if (up) {
            srcPath.splice(i2, 1);
            up--;
          }
        }
        if (!mustEndAbs && !removeAllDots) {
          for (; up--; up) {
            srcPath.unshift("..");
          }
        }
        if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
          srcPath.unshift("");
        }
        if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") {
          srcPath.push("");
        }
        var isAbsolute = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";
        if (psychotic) {
          result.hostname = result.host = isAbsolute ? "" : srcPath.length ? srcPath.shift() : "";
          var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
          if (authInHost) {
            result.auth = authInHost.shift();
            result.host = result.hostname = authInHost.shift();
          }
        }
        mustEndAbs = mustEndAbs || result.host && srcPath.length;
        if (mustEndAbs && !isAbsolute) {
          srcPath.unshift("");
        }
        if (!srcPath.length) {
          result.pathname = null;
          result.path = null;
        } else {
          result.pathname = srcPath.join("/");
        }
        if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
          result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
        }
        result.auth = relative.auth || result.auth;
        result.slashes = result.slashes || relative.slashes;
        result.href = result.format();
        return result;
      };
      Url.prototype.parseHost = function() {
        var host = this.host;
        var port = portPattern.exec(host);
        if (port) {
          port = port[0];
          if (port !== ":") {
            this.port = port.substr(1);
          }
          host = host.substr(0, host.length - port.length);
        }
        if (host)
          this.hostname = host;
      };
    }
  });

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    Area: () => Area,
    AreaOrientation: () => AreaOrientation,
    AtlasAllocator: () => AtlasAllocator,
    AtlasResource: () => AtlasResource,
    CanvasTextureAllocator: () => CanvasTextureAllocator,
    GuilloteneAllocator: () => GuilloteneAllocator,
    RenderTextureAllocator: () => RenderTextureAllocator,
    SPLIT_ORIENTATION: () => SPLIT_ORIENTATION,
    TextureAllocator: () => TextureAllocator
  });

  // src/Area.ts
  var AreaOrientation = /* @__PURE__ */ ((AreaOrientation2) => {
    AreaOrientation2[AreaOrientation2["HORIZONTAL"] = 0] = "HORIZONTAL";
    AreaOrientation2[AreaOrientation2["VERTICAL"] = 1] = "VERTICAL";
    return AreaOrientation2;
  })(AreaOrientation || {});
  var Area = class {
    static makeArea(openOffset, closeOffset, orientation) {
      return openOffset | closeOffset << 15 | orientation << 30;
    }
    static getOpenOffset(area) {
      return area & (1 << 15) - 1;
    }
    static getCloseOffset(area) {
      return area >> 15 & (1 << 15) - 1;
    }
    static getOrientation(area) {
      return area >> 30 & 1;
    }
    static setOpenOffset(area, offset) {
      return Area.makeArea(
        offset,
        Area.getCloseOffset(area),
        Area.getOrientation(area)
      );
    }
    static setCloseOffset(area, offset) {
      return Area.makeArea(
        Area.getOpenOffset(offset),
        offset,
        Area.getOrientation(area)
      );
    }
  };

  // node_modules/@pixi/constants/lib/index.mjs
  var ENV = /* @__PURE__ */ ((ENV2) => {
    ENV2[ENV2["WEBGL_LEGACY"] = 0] = "WEBGL_LEGACY";
    ENV2[ENV2["WEBGL"] = 1] = "WEBGL";
    ENV2[ENV2["WEBGL2"] = 2] = "WEBGL2";
    return ENV2;
  })(ENV || {});
  var RENDERER_TYPE = /* @__PURE__ */ ((RENDERER_TYPE2) => {
    RENDERER_TYPE2[RENDERER_TYPE2["UNKNOWN"] = 0] = "UNKNOWN";
    RENDERER_TYPE2[RENDERER_TYPE2["WEBGL"] = 1] = "WEBGL";
    RENDERER_TYPE2[RENDERER_TYPE2["CANVAS"] = 2] = "CANVAS";
    return RENDERER_TYPE2;
  })(RENDERER_TYPE || {});
  var BUFFER_BITS = /* @__PURE__ */ ((BUFFER_BITS2) => {
    BUFFER_BITS2[BUFFER_BITS2["COLOR"] = 16384] = "COLOR";
    BUFFER_BITS2[BUFFER_BITS2["DEPTH"] = 256] = "DEPTH";
    BUFFER_BITS2[BUFFER_BITS2["STENCIL"] = 1024] = "STENCIL";
    return BUFFER_BITS2;
  })(BUFFER_BITS || {});
  var BLEND_MODES = /* @__PURE__ */ ((BLEND_MODES2) => {
    BLEND_MODES2[BLEND_MODES2["NORMAL"] = 0] = "NORMAL";
    BLEND_MODES2[BLEND_MODES2["ADD"] = 1] = "ADD";
    BLEND_MODES2[BLEND_MODES2["MULTIPLY"] = 2] = "MULTIPLY";
    BLEND_MODES2[BLEND_MODES2["SCREEN"] = 3] = "SCREEN";
    BLEND_MODES2[BLEND_MODES2["OVERLAY"] = 4] = "OVERLAY";
    BLEND_MODES2[BLEND_MODES2["DARKEN"] = 5] = "DARKEN";
    BLEND_MODES2[BLEND_MODES2["LIGHTEN"] = 6] = "LIGHTEN";
    BLEND_MODES2[BLEND_MODES2["COLOR_DODGE"] = 7] = "COLOR_DODGE";
    BLEND_MODES2[BLEND_MODES2["COLOR_BURN"] = 8] = "COLOR_BURN";
    BLEND_MODES2[BLEND_MODES2["HARD_LIGHT"] = 9] = "HARD_LIGHT";
    BLEND_MODES2[BLEND_MODES2["SOFT_LIGHT"] = 10] = "SOFT_LIGHT";
    BLEND_MODES2[BLEND_MODES2["DIFFERENCE"] = 11] = "DIFFERENCE";
    BLEND_MODES2[BLEND_MODES2["EXCLUSION"] = 12] = "EXCLUSION";
    BLEND_MODES2[BLEND_MODES2["HUE"] = 13] = "HUE";
    BLEND_MODES2[BLEND_MODES2["SATURATION"] = 14] = "SATURATION";
    BLEND_MODES2[BLEND_MODES2["COLOR"] = 15] = "COLOR";
    BLEND_MODES2[BLEND_MODES2["LUMINOSITY"] = 16] = "LUMINOSITY";
    BLEND_MODES2[BLEND_MODES2["NORMAL_NPM"] = 17] = "NORMAL_NPM";
    BLEND_MODES2[BLEND_MODES2["ADD_NPM"] = 18] = "ADD_NPM";
    BLEND_MODES2[BLEND_MODES2["SCREEN_NPM"] = 19] = "SCREEN_NPM";
    BLEND_MODES2[BLEND_MODES2["NONE"] = 20] = "NONE";
    BLEND_MODES2[BLEND_MODES2["SRC_OVER"] = 0] = "SRC_OVER";
    BLEND_MODES2[BLEND_MODES2["SRC_IN"] = 21] = "SRC_IN";
    BLEND_MODES2[BLEND_MODES2["SRC_OUT"] = 22] = "SRC_OUT";
    BLEND_MODES2[BLEND_MODES2["SRC_ATOP"] = 23] = "SRC_ATOP";
    BLEND_MODES2[BLEND_MODES2["DST_OVER"] = 24] = "DST_OVER";
    BLEND_MODES2[BLEND_MODES2["DST_IN"] = 25] = "DST_IN";
    BLEND_MODES2[BLEND_MODES2["DST_OUT"] = 26] = "DST_OUT";
    BLEND_MODES2[BLEND_MODES2["DST_ATOP"] = 27] = "DST_ATOP";
    BLEND_MODES2[BLEND_MODES2["ERASE"] = 26] = "ERASE";
    BLEND_MODES2[BLEND_MODES2["SUBTRACT"] = 28] = "SUBTRACT";
    BLEND_MODES2[BLEND_MODES2["XOR"] = 29] = "XOR";
    return BLEND_MODES2;
  })(BLEND_MODES || {});
  var DRAW_MODES = /* @__PURE__ */ ((DRAW_MODES2) => {
    DRAW_MODES2[DRAW_MODES2["POINTS"] = 0] = "POINTS";
    DRAW_MODES2[DRAW_MODES2["LINES"] = 1] = "LINES";
    DRAW_MODES2[DRAW_MODES2["LINE_LOOP"] = 2] = "LINE_LOOP";
    DRAW_MODES2[DRAW_MODES2["LINE_STRIP"] = 3] = "LINE_STRIP";
    DRAW_MODES2[DRAW_MODES2["TRIANGLES"] = 4] = "TRIANGLES";
    DRAW_MODES2[DRAW_MODES2["TRIANGLE_STRIP"] = 5] = "TRIANGLE_STRIP";
    DRAW_MODES2[DRAW_MODES2["TRIANGLE_FAN"] = 6] = "TRIANGLE_FAN";
    return DRAW_MODES2;
  })(DRAW_MODES || {});
  var FORMATS = /* @__PURE__ */ ((FORMATS2) => {
    FORMATS2[FORMATS2["RGBA"] = 6408] = "RGBA";
    FORMATS2[FORMATS2["RGB"] = 6407] = "RGB";
    FORMATS2[FORMATS2["RG"] = 33319] = "RG";
    FORMATS2[FORMATS2["RED"] = 6403] = "RED";
    FORMATS2[FORMATS2["RGBA_INTEGER"] = 36249] = "RGBA_INTEGER";
    FORMATS2[FORMATS2["RGB_INTEGER"] = 36248] = "RGB_INTEGER";
    FORMATS2[FORMATS2["RG_INTEGER"] = 33320] = "RG_INTEGER";
    FORMATS2[FORMATS2["RED_INTEGER"] = 36244] = "RED_INTEGER";
    FORMATS2[FORMATS2["ALPHA"] = 6406] = "ALPHA";
    FORMATS2[FORMATS2["LUMINANCE"] = 6409] = "LUMINANCE";
    FORMATS2[FORMATS2["LUMINANCE_ALPHA"] = 6410] = "LUMINANCE_ALPHA";
    FORMATS2[FORMATS2["DEPTH_COMPONENT"] = 6402] = "DEPTH_COMPONENT";
    FORMATS2[FORMATS2["DEPTH_STENCIL"] = 34041] = "DEPTH_STENCIL";
    return FORMATS2;
  })(FORMATS || {});
  var TARGETS = /* @__PURE__ */ ((TARGETS2) => {
    TARGETS2[TARGETS2["TEXTURE_2D"] = 3553] = "TEXTURE_2D";
    TARGETS2[TARGETS2["TEXTURE_CUBE_MAP"] = 34067] = "TEXTURE_CUBE_MAP";
    TARGETS2[TARGETS2["TEXTURE_2D_ARRAY"] = 35866] = "TEXTURE_2D_ARRAY";
    TARGETS2[TARGETS2["TEXTURE_CUBE_MAP_POSITIVE_X"] = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X";
    TARGETS2[TARGETS2["TEXTURE_CUBE_MAP_NEGATIVE_X"] = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X";
    TARGETS2[TARGETS2["TEXTURE_CUBE_MAP_POSITIVE_Y"] = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y";
    TARGETS2[TARGETS2["TEXTURE_CUBE_MAP_NEGATIVE_Y"] = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y";
    TARGETS2[TARGETS2["TEXTURE_CUBE_MAP_POSITIVE_Z"] = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z";
    TARGETS2[TARGETS2["TEXTURE_CUBE_MAP_NEGATIVE_Z"] = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
    return TARGETS2;
  })(TARGETS || {});
  var TYPES = /* @__PURE__ */ ((TYPES2) => {
    TYPES2[TYPES2["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
    TYPES2[TYPES2["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
    TYPES2[TYPES2["UNSIGNED_SHORT_5_6_5"] = 33635] = "UNSIGNED_SHORT_5_6_5";
    TYPES2[TYPES2["UNSIGNED_SHORT_4_4_4_4"] = 32819] = "UNSIGNED_SHORT_4_4_4_4";
    TYPES2[TYPES2["UNSIGNED_SHORT_5_5_5_1"] = 32820] = "UNSIGNED_SHORT_5_5_5_1";
    TYPES2[TYPES2["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
    TYPES2[TYPES2["UNSIGNED_INT_10F_11F_11F_REV"] = 35899] = "UNSIGNED_INT_10F_11F_11F_REV";
    TYPES2[TYPES2["UNSIGNED_INT_2_10_10_10_REV"] = 33640] = "UNSIGNED_INT_2_10_10_10_REV";
    TYPES2[TYPES2["UNSIGNED_INT_24_8"] = 34042] = "UNSIGNED_INT_24_8";
    TYPES2[TYPES2["UNSIGNED_INT_5_9_9_9_REV"] = 35902] = "UNSIGNED_INT_5_9_9_9_REV";
    TYPES2[TYPES2["BYTE"] = 5120] = "BYTE";
    TYPES2[TYPES2["SHORT"] = 5122] = "SHORT";
    TYPES2[TYPES2["INT"] = 5124] = "INT";
    TYPES2[TYPES2["FLOAT"] = 5126] = "FLOAT";
    TYPES2[TYPES2["FLOAT_32_UNSIGNED_INT_24_8_REV"] = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV";
    TYPES2[TYPES2["HALF_FLOAT"] = 36193] = "HALF_FLOAT";
    return TYPES2;
  })(TYPES || {});
  var SAMPLER_TYPES = /* @__PURE__ */ ((SAMPLER_TYPES2) => {
    SAMPLER_TYPES2[SAMPLER_TYPES2["FLOAT"] = 0] = "FLOAT";
    SAMPLER_TYPES2[SAMPLER_TYPES2["INT"] = 1] = "INT";
    SAMPLER_TYPES2[SAMPLER_TYPES2["UINT"] = 2] = "UINT";
    return SAMPLER_TYPES2;
  })(SAMPLER_TYPES || {});
  var SCALE_MODES = /* @__PURE__ */ ((SCALE_MODES2) => {
    SCALE_MODES2[SCALE_MODES2["NEAREST"] = 0] = "NEAREST";
    SCALE_MODES2[SCALE_MODES2["LINEAR"] = 1] = "LINEAR";
    return SCALE_MODES2;
  })(SCALE_MODES || {});
  var WRAP_MODES = /* @__PURE__ */ ((WRAP_MODES2) => {
    WRAP_MODES2[WRAP_MODES2["CLAMP"] = 33071] = "CLAMP";
    WRAP_MODES2[WRAP_MODES2["REPEAT"] = 10497] = "REPEAT";
    WRAP_MODES2[WRAP_MODES2["MIRRORED_REPEAT"] = 33648] = "MIRRORED_REPEAT";
    return WRAP_MODES2;
  })(WRAP_MODES || {});
  var MIPMAP_MODES = /* @__PURE__ */ ((MIPMAP_MODES2) => {
    MIPMAP_MODES2[MIPMAP_MODES2["OFF"] = 0] = "OFF";
    MIPMAP_MODES2[MIPMAP_MODES2["POW2"] = 1] = "POW2";
    MIPMAP_MODES2[MIPMAP_MODES2["ON"] = 2] = "ON";
    MIPMAP_MODES2[MIPMAP_MODES2["ON_MANUAL"] = 3] = "ON_MANUAL";
    return MIPMAP_MODES2;
  })(MIPMAP_MODES || {});
  var ALPHA_MODES = /* @__PURE__ */ ((ALPHA_MODES2) => {
    ALPHA_MODES2[ALPHA_MODES2["NPM"] = 0] = "NPM";
    ALPHA_MODES2[ALPHA_MODES2["UNPACK"] = 1] = "UNPACK";
    ALPHA_MODES2[ALPHA_MODES2["PMA"] = 2] = "PMA";
    ALPHA_MODES2[ALPHA_MODES2["NO_PREMULTIPLIED_ALPHA"] = 0] = "NO_PREMULTIPLIED_ALPHA";
    ALPHA_MODES2[ALPHA_MODES2["PREMULTIPLY_ON_UPLOAD"] = 1] = "PREMULTIPLY_ON_UPLOAD";
    ALPHA_MODES2[ALPHA_MODES2["PREMULTIPLIED_ALPHA"] = 2] = "PREMULTIPLIED_ALPHA";
    return ALPHA_MODES2;
  })(ALPHA_MODES || {});
  var CLEAR_MODES = /* @__PURE__ */ ((CLEAR_MODES2) => {
    CLEAR_MODES2[CLEAR_MODES2["NO"] = 0] = "NO";
    CLEAR_MODES2[CLEAR_MODES2["YES"] = 1] = "YES";
    CLEAR_MODES2[CLEAR_MODES2["AUTO"] = 2] = "AUTO";
    CLEAR_MODES2[CLEAR_MODES2["BLEND"] = 0] = "BLEND";
    CLEAR_MODES2[CLEAR_MODES2["CLEAR"] = 1] = "CLEAR";
    CLEAR_MODES2[CLEAR_MODES2["BLIT"] = 2] = "BLIT";
    return CLEAR_MODES2;
  })(CLEAR_MODES || {});
  var GC_MODES = /* @__PURE__ */ ((GC_MODES2) => {
    GC_MODES2[GC_MODES2["AUTO"] = 0] = "AUTO";
    GC_MODES2[GC_MODES2["MANUAL"] = 1] = "MANUAL";
    return GC_MODES2;
  })(GC_MODES || {});
  var PRECISION = /* @__PURE__ */ ((PRECISION2) => {
    PRECISION2["LOW"] = "lowp";
    PRECISION2["MEDIUM"] = "mediump";
    PRECISION2["HIGH"] = "highp";
    return PRECISION2;
  })(PRECISION || {});
  var MASK_TYPES = /* @__PURE__ */ ((MASK_TYPES2) => {
    MASK_TYPES2[MASK_TYPES2["NONE"] = 0] = "NONE";
    MASK_TYPES2[MASK_TYPES2["SCISSOR"] = 1] = "SCISSOR";
    MASK_TYPES2[MASK_TYPES2["STENCIL"] = 2] = "STENCIL";
    MASK_TYPES2[MASK_TYPES2["SPRITE"] = 3] = "SPRITE";
    MASK_TYPES2[MASK_TYPES2["COLOR"] = 4] = "COLOR";
    return MASK_TYPES2;
  })(MASK_TYPES || {});
  var MSAA_QUALITY = /* @__PURE__ */ ((MSAA_QUALITY2) => {
    MSAA_QUALITY2[MSAA_QUALITY2["NONE"] = 0] = "NONE";
    MSAA_QUALITY2[MSAA_QUALITY2["LOW"] = 2] = "LOW";
    MSAA_QUALITY2[MSAA_QUALITY2["MEDIUM"] = 4] = "MEDIUM";
    MSAA_QUALITY2[MSAA_QUALITY2["HIGH"] = 8] = "HIGH";
    return MSAA_QUALITY2;
  })(MSAA_QUALITY || {});
  var BUFFER_TYPE = /* @__PURE__ */ ((BUFFER_TYPE2) => {
    BUFFER_TYPE2[BUFFER_TYPE2["ELEMENT_ARRAY_BUFFER"] = 34963] = "ELEMENT_ARRAY_BUFFER";
    BUFFER_TYPE2[BUFFER_TYPE2["ARRAY_BUFFER"] = 34962] = "ARRAY_BUFFER";
    BUFFER_TYPE2[BUFFER_TYPE2["UNIFORM_BUFFER"] = 35345] = "UNIFORM_BUFFER";
    return BUFFER_TYPE2;
  })(BUFFER_TYPE || {});

  // node_modules/@pixi/settings/lib/adapter.mjs
  var BrowserAdapter = {
    createCanvas: (width, height) => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      return canvas;
    },
    getCanvasRenderingContext2D: () => CanvasRenderingContext2D,
    getWebGLRenderingContext: () => WebGLRenderingContext,
    getNavigator: () => navigator,
    getBaseUrl: () => document.baseURI ?? window.location.href,
    getFontFaceSet: () => document.fonts,
    fetch: (url2, options) => fetch(url2, options),
    parseXML: (xml) => {
      const parser = new DOMParser();
      return parser.parseFromString(xml, "text/xml");
    }
  };

  // node_modules/@pixi/settings/lib/settings.mjs
  var settings = {
    ADAPTER: BrowserAdapter,
    RESOLUTION: 1,
    CREATE_IMAGE_BITMAP: false,
    ROUND_PIXELS: false
  };

  // node_modules/ismobilejs/esm/isMobile.js
  var appleIphone = /iPhone/i;
  var appleIpod = /iPod/i;
  var appleTablet = /iPad/i;
  var appleUniversal = /\biOS-universal(?:.+)Mac\b/i;
  var androidPhone = /\bAndroid(?:.+)Mobile\b/i;
  var androidTablet = /Android/i;
  var amazonPhone = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i;
  var amazonTablet = /Silk/i;
  var windowsPhone = /Windows Phone/i;
  var windowsTablet = /\bWindows(?:.+)ARM\b/i;
  var otherBlackBerry = /BlackBerry/i;
  var otherBlackBerry10 = /BB10/i;
  var otherOpera = /Opera Mini/i;
  var otherChrome = /\b(CriOS|Chrome)(?:.+)Mobile/i;
  var otherFirefox = /Mobile(?:.+)Firefox\b/i;
  var isAppleTabletOnIos13 = function(navigator2) {
    return typeof navigator2 !== "undefined" && navigator2.platform === "MacIntel" && typeof navigator2.maxTouchPoints === "number" && navigator2.maxTouchPoints > 1 && typeof MSStream === "undefined";
  };
  function createMatch(userAgent) {
    return function(regex) {
      return regex.test(userAgent);
    };
  }
  function isMobile(param) {
    var nav = {
      userAgent: "",
      platform: "",
      maxTouchPoints: 0
    };
    if (!param && typeof navigator !== "undefined") {
      nav = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        maxTouchPoints: navigator.maxTouchPoints || 0
      };
    } else if (typeof param === "string") {
      nav.userAgent = param;
    } else if (param && param.userAgent) {
      nav = {
        userAgent: param.userAgent,
        platform: param.platform,
        maxTouchPoints: param.maxTouchPoints || 0
      };
    }
    var userAgent = nav.userAgent;
    var tmp = userAgent.split("[FBAN");
    if (typeof tmp[1] !== "undefined") {
      userAgent = tmp[0];
    }
    tmp = userAgent.split("Twitter");
    if (typeof tmp[1] !== "undefined") {
      userAgent = tmp[0];
    }
    var match = createMatch(userAgent);
    var result = {
      apple: {
        phone: match(appleIphone) && !match(windowsPhone),
        ipod: match(appleIpod),
        tablet: !match(appleIphone) && (match(appleTablet) || isAppleTabletOnIos13(nav)) && !match(windowsPhone),
        universal: match(appleUniversal),
        device: (match(appleIphone) || match(appleIpod) || match(appleTablet) || match(appleUniversal) || isAppleTabletOnIos13(nav)) && !match(windowsPhone)
      },
      amazon: {
        phone: match(amazonPhone),
        tablet: !match(amazonPhone) && match(amazonTablet),
        device: match(amazonPhone) || match(amazonTablet)
      },
      android: {
        phone: !match(windowsPhone) && match(amazonPhone) || !match(windowsPhone) && match(androidPhone),
        tablet: !match(windowsPhone) && !match(amazonPhone) && !match(androidPhone) && (match(amazonTablet) || match(androidTablet)),
        device: !match(windowsPhone) && (match(amazonPhone) || match(amazonTablet) || match(androidPhone) || match(androidTablet)) || match(/\bokhttp\b/i)
      },
      windows: {
        phone: match(windowsPhone),
        tablet: match(windowsTablet),
        device: match(windowsPhone) || match(windowsTablet)
      },
      other: {
        blackberry: match(otherBlackBerry),
        blackberry10: match(otherBlackBerry10),
        opera: match(otherOpera),
        firefox: match(otherFirefox),
        chrome: match(otherChrome),
        device: match(otherBlackBerry) || match(otherBlackBerry10) || match(otherOpera) || match(otherFirefox) || match(otherChrome)
      },
      any: false,
      phone: false,
      tablet: false
    };
    result.any = result.apple.device || result.android.device || result.windows.device || result.other.device;
    result.phone = result.apple.phone || result.android.phone || result.windows.phone;
    result.tablet = result.apple.tablet || result.android.tablet || result.windows.tablet;
    return result;
  }

  // node_modules/@pixi/settings/lib/utils/isMobile.mjs
  var isMobileCall = isMobile.default ?? isMobile;
  var isMobile2 = isMobileCall(globalThis.navigator);

  // node_modules/@pixi/utils/lib/settings.mjs
  settings.RETINA_PREFIX = /@([0-9\.]+)x/;
  settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = false;

  // node_modules/@pixi/utils/lib/index.mjs
  var import_eventemitter3 = __toESM(require_eventemitter3(), 1);
  var import_earcut = __toESM(require_earcut(), 1);

  // node_modules/@pixi/utils/lib/url.mjs
  var import_url = __toESM(require_url(), 1);
  var url = {
    parse: import_url.parse,
    format: import_url.format,
    resolve: import_url.resolve
  };

  // node_modules/@pixi/utils/lib/logging/deprecation.mjs
  var warnings = {};
  function deprecation(version, message, ignoreDepth = 3) {
    if (warnings[message]) {
      return;
    }
    let stack = new Error().stack;
    if (typeof stack === "undefined") {
      console.warn("PixiJS Deprecation Warning: ", `${message}
Deprecated since v${version}`);
    } else {
      stack = stack.split("\n").splice(ignoreDepth).join("\n");
      if (console.groupCollapsed) {
        console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", `${message}
Deprecated since v${version}`);
        console.warn(stack);
        console.groupEnd();
      } else {
        console.warn("PixiJS Deprecation Warning: ", `${message}
Deprecated since v${version}`);
        console.warn(stack);
      }
    }
    warnings[message] = true;
  }

  // node_modules/@pixi/utils/lib/browser/isWebGLSupported.mjs
  var supported;
  function isWebGLSupported() {
    if (typeof supported === "undefined") {
      supported = function supported2() {
        const contextOptions = {
          stencil: true,
          failIfMajorPerformanceCaveat: settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
        };
        try {
          if (!settings.ADAPTER.getWebGLRenderingContext()) {
            return false;
          }
          const canvas = settings.ADAPTER.createCanvas();
          let gl = canvas.getContext("webgl", contextOptions) || canvas.getContext("experimental-webgl", contextOptions);
          const success = !!gl?.getContextAttributes()?.stencil;
          if (gl) {
            const loseContext = gl.getExtension("WEBGL_lose_context");
            if (loseContext) {
              loseContext.loseContext();
            }
          }
          gl = null;
          return success;
        } catch (e2) {
          return false;
        }
      }();
    }
    return supported;
  }

  // node_modules/colord/index.mjs
  var r = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) };
  var t = function(r2) {
    return "string" == typeof r2 ? r2.length > 0 : "number" == typeof r2;
  };
  var n = function(r2, t2, n2) {
    return void 0 === t2 && (t2 = 0), void 0 === n2 && (n2 = Math.pow(10, t2)), Math.round(n2 * r2) / n2 + 0;
  };
  var e = function(r2, t2, n2) {
    return void 0 === t2 && (t2 = 0), void 0 === n2 && (n2 = 1), r2 > n2 ? n2 : r2 > t2 ? r2 : t2;
  };
  var u = function(r2) {
    return (r2 = isFinite(r2) ? r2 % 360 : 0) > 0 ? r2 : r2 + 360;
  };
  var a = function(r2) {
    return { r: e(r2.r, 0, 255), g: e(r2.g, 0, 255), b: e(r2.b, 0, 255), a: e(r2.a) };
  };
  var o = function(r2) {
    return { r: n(r2.r), g: n(r2.g), b: n(r2.b), a: n(r2.a, 3) };
  };
  var i = /^#([0-9a-f]{3,8})$/i;
  var s = function(r2) {
    var t2 = r2.toString(16);
    return t2.length < 2 ? "0" + t2 : t2;
  };
  var h = function(r2) {
    var t2 = r2.r, n2 = r2.g, e2 = r2.b, u2 = r2.a, a2 = Math.max(t2, n2, e2), o2 = a2 - Math.min(t2, n2, e2), i2 = o2 ? a2 === t2 ? (n2 - e2) / o2 : a2 === n2 ? 2 + (e2 - t2) / o2 : 4 + (t2 - n2) / o2 : 0;
    return { h: 60 * (i2 < 0 ? i2 + 6 : i2), s: a2 ? o2 / a2 * 100 : 0, v: a2 / 255 * 100, a: u2 };
  };
  var b = function(r2) {
    var t2 = r2.h, n2 = r2.s, e2 = r2.v, u2 = r2.a;
    t2 = t2 / 360 * 6, n2 /= 100, e2 /= 100;
    var a2 = Math.floor(t2), o2 = e2 * (1 - n2), i2 = e2 * (1 - (t2 - a2) * n2), s2 = e2 * (1 - (1 - t2 + a2) * n2), h2 = a2 % 6;
    return { r: 255 * [e2, i2, o2, o2, s2, e2][h2], g: 255 * [s2, e2, e2, i2, o2, o2][h2], b: 255 * [o2, o2, s2, e2, e2, i2][h2], a: u2 };
  };
  var g = function(r2) {
    return { h: u(r2.h), s: e(r2.s, 0, 100), l: e(r2.l, 0, 100), a: e(r2.a) };
  };
  var d = function(r2) {
    return { h: n(r2.h), s: n(r2.s), l: n(r2.l), a: n(r2.a, 3) };
  };
  var f = function(r2) {
    return b((n2 = (t2 = r2).s, { h: t2.h, s: (n2 *= ((e2 = t2.l) < 50 ? e2 : 100 - e2) / 100) > 0 ? 2 * n2 / (e2 + n2) * 100 : 0, v: e2 + n2, a: t2.a }));
    var t2, n2, e2;
  };
  var c = function(r2) {
    return { h: (t2 = h(r2)).h, s: (u2 = (200 - (n2 = t2.s)) * (e2 = t2.v) / 100) > 0 && u2 < 200 ? n2 * e2 / 100 / (u2 <= 100 ? u2 : 200 - u2) * 100 : 0, l: u2 / 2, a: t2.a };
    var t2, n2, e2, u2;
  };
  var l = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
  var p = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
  var v = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
  var m = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
  var y = { string: [[function(r2) {
    var t2 = i.exec(r2);
    return t2 ? (r2 = t2[1]).length <= 4 ? { r: parseInt(r2[0] + r2[0], 16), g: parseInt(r2[1] + r2[1], 16), b: parseInt(r2[2] + r2[2], 16), a: 4 === r2.length ? n(parseInt(r2[3] + r2[3], 16) / 255, 2) : 1 } : 6 === r2.length || 8 === r2.length ? { r: parseInt(r2.substr(0, 2), 16), g: parseInt(r2.substr(2, 2), 16), b: parseInt(r2.substr(4, 2), 16), a: 8 === r2.length ? n(parseInt(r2.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
  }, "hex"], [function(r2) {
    var t2 = v.exec(r2) || m.exec(r2);
    return t2 ? t2[2] !== t2[4] || t2[4] !== t2[6] ? null : a({ r: Number(t2[1]) / (t2[2] ? 100 / 255 : 1), g: Number(t2[3]) / (t2[4] ? 100 / 255 : 1), b: Number(t2[5]) / (t2[6] ? 100 / 255 : 1), a: void 0 === t2[7] ? 1 : Number(t2[7]) / (t2[8] ? 100 : 1) }) : null;
  }, "rgb"], [function(t2) {
    var n2 = l.exec(t2) || p.exec(t2);
    if (!n2)
      return null;
    var e2, u2, a2 = g({ h: (e2 = n2[1], u2 = n2[2], void 0 === u2 && (u2 = "deg"), Number(e2) * (r[u2] || 1)), s: Number(n2[3]), l: Number(n2[4]), a: void 0 === n2[5] ? 1 : Number(n2[5]) / (n2[6] ? 100 : 1) });
    return f(a2);
  }, "hsl"]], object: [[function(r2) {
    var n2 = r2.r, e2 = r2.g, u2 = r2.b, o2 = r2.a, i2 = void 0 === o2 ? 1 : o2;
    return t(n2) && t(e2) && t(u2) ? a({ r: Number(n2), g: Number(e2), b: Number(u2), a: Number(i2) }) : null;
  }, "rgb"], [function(r2) {
    var n2 = r2.h, e2 = r2.s, u2 = r2.l, a2 = r2.a, o2 = void 0 === a2 ? 1 : a2;
    if (!t(n2) || !t(e2) || !t(u2))
      return null;
    var i2 = g({ h: Number(n2), s: Number(e2), l: Number(u2), a: Number(o2) });
    return f(i2);
  }, "hsl"], [function(r2) {
    var n2 = r2.h, a2 = r2.s, o2 = r2.v, i2 = r2.a, s2 = void 0 === i2 ? 1 : i2;
    if (!t(n2) || !t(a2) || !t(o2))
      return null;
    var h2 = function(r3) {
      return { h: u(r3.h), s: e(r3.s, 0, 100), v: e(r3.v, 0, 100), a: e(r3.a) };
    }({ h: Number(n2), s: Number(a2), v: Number(o2), a: Number(s2) });
    return b(h2);
  }, "hsv"]] };
  var N = function(r2, t2) {
    for (var n2 = 0; n2 < t2.length; n2++) {
      var e2 = t2[n2][0](r2);
      if (e2)
        return [e2, t2[n2][1]];
    }
    return [null, void 0];
  };
  var x = function(r2) {
    return "string" == typeof r2 ? N(r2.trim(), y.string) : "object" == typeof r2 && null !== r2 ? N(r2, y.object) : [null, void 0];
  };
  var M = function(r2, t2) {
    var n2 = c(r2);
    return { h: n2.h, s: e(n2.s + 100 * t2, 0, 100), l: n2.l, a: n2.a };
  };
  var H = function(r2) {
    return (299 * r2.r + 587 * r2.g + 114 * r2.b) / 1e3 / 255;
  };
  var $ = function(r2, t2) {
    var n2 = c(r2);
    return { h: n2.h, s: n2.s, l: e(n2.l + 100 * t2, 0, 100), a: n2.a };
  };
  var j = function() {
    function r2(r3) {
      this.parsed = x(r3)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
    }
    return r2.prototype.isValid = function() {
      return null !== this.parsed;
    }, r2.prototype.brightness = function() {
      return n(H(this.rgba), 2);
    }, r2.prototype.isDark = function() {
      return H(this.rgba) < 0.5;
    }, r2.prototype.isLight = function() {
      return H(this.rgba) >= 0.5;
    }, r2.prototype.toHex = function() {
      return r3 = o(this.rgba), t2 = r3.r, e2 = r3.g, u2 = r3.b, i2 = (a2 = r3.a) < 1 ? s(n(255 * a2)) : "", "#" + s(t2) + s(e2) + s(u2) + i2;
      var r3, t2, e2, u2, a2, i2;
    }, r2.prototype.toRgb = function() {
      return o(this.rgba);
    }, r2.prototype.toRgbString = function() {
      return r3 = o(this.rgba), t2 = r3.r, n2 = r3.g, e2 = r3.b, (u2 = r3.a) < 1 ? "rgba(" + t2 + ", " + n2 + ", " + e2 + ", " + u2 + ")" : "rgb(" + t2 + ", " + n2 + ", " + e2 + ")";
      var r3, t2, n2, e2, u2;
    }, r2.prototype.toHsl = function() {
      return d(c(this.rgba));
    }, r2.prototype.toHslString = function() {
      return r3 = d(c(this.rgba)), t2 = r3.h, n2 = r3.s, e2 = r3.l, (u2 = r3.a) < 1 ? "hsla(" + t2 + ", " + n2 + "%, " + e2 + "%, " + u2 + ")" : "hsl(" + t2 + ", " + n2 + "%, " + e2 + "%)";
      var r3, t2, n2, e2, u2;
    }, r2.prototype.toHsv = function() {
      return r3 = h(this.rgba), { h: n(r3.h), s: n(r3.s), v: n(r3.v), a: n(r3.a, 3) };
      var r3;
    }, r2.prototype.invert = function() {
      return w({ r: 255 - (r3 = this.rgba).r, g: 255 - r3.g, b: 255 - r3.b, a: r3.a });
      var r3;
    }, r2.prototype.saturate = function(r3) {
      return void 0 === r3 && (r3 = 0.1), w(M(this.rgba, r3));
    }, r2.prototype.desaturate = function(r3) {
      return void 0 === r3 && (r3 = 0.1), w(M(this.rgba, -r3));
    }, r2.prototype.grayscale = function() {
      return w(M(this.rgba, -1));
    }, r2.prototype.lighten = function(r3) {
      return void 0 === r3 && (r3 = 0.1), w($(this.rgba, r3));
    }, r2.prototype.darken = function(r3) {
      return void 0 === r3 && (r3 = 0.1), w($(this.rgba, -r3));
    }, r2.prototype.rotate = function(r3) {
      return void 0 === r3 && (r3 = 15), this.hue(this.hue() + r3);
    }, r2.prototype.alpha = function(r3) {
      return "number" == typeof r3 ? w({ r: (t2 = this.rgba).r, g: t2.g, b: t2.b, a: r3 }) : n(this.rgba.a, 3);
      var t2;
    }, r2.prototype.hue = function(r3) {
      var t2 = c(this.rgba);
      return "number" == typeof r3 ? w({ h: r3, s: t2.s, l: t2.l, a: t2.a }) : n(t2.h);
    }, r2.prototype.isEqual = function(r3) {
      return this.toHex() === w(r3).toHex();
    }, r2;
  }();
  var w = function(r2) {
    return r2 instanceof j ? r2 : new j(r2);
  };
  var S = [];
  var k = function(r2) {
    r2.forEach(function(r3) {
      S.indexOf(r3) < 0 && (r3(j, y), S.push(r3));
    });
  };

  // node_modules/colord/plugins/names.mjs
  function names_default(e2, f2) {
    var a2 = { white: "#ffffff", bisque: "#ffe4c4", blue: "#0000ff", cadetblue: "#5f9ea0", chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", antiquewhite: "#faebd7", aqua: "#00ffff", azure: "#f0ffff", whitesmoke: "#f5f5f5", papayawhip: "#ffefd5", plum: "#dda0dd", blanchedalmond: "#ffebcd", black: "#000000", gold: "#ffd700", goldenrod: "#daa520", gainsboro: "#dcdcdc", cornsilk: "#fff8dc", cornflowerblue: "#6495ed", burlywood: "#deb887", aquamarine: "#7fffd4", beige: "#f5f5dc", crimson: "#dc143c", cyan: "#00ffff", darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkkhaki: "#bdb76b", darkgray: "#a9a9a9", darkgreen: "#006400", darkgrey: "#a9a9a9", peachpuff: "#ffdab9", darkmagenta: "#8b008b", darkred: "#8b0000", darkorchid: "#9932cc", darkorange: "#ff8c00", darkslateblue: "#483d8b", gray: "#808080", darkslategray: "#2f4f4f", darkslategrey: "#2f4f4f", deeppink: "#ff1493", deepskyblue: "#00bfff", wheat: "#f5deb3", firebrick: "#b22222", floralwhite: "#fffaf0", ghostwhite: "#f8f8ff", darkviolet: "#9400d3", magenta: "#ff00ff", green: "#008000", dodgerblue: "#1e90ff", grey: "#808080", honeydew: "#f0fff0", hotpink: "#ff69b4", blueviolet: "#8a2be2", forestgreen: "#228b22", lawngreen: "#7cfc00", indianred: "#cd5c5c", indigo: "#4b0082", fuchsia: "#ff00ff", brown: "#a52a2a", maroon: "#800000", mediumblue: "#0000cd", lightcoral: "#f08080", darkturquoise: "#00ced1", lightcyan: "#e0ffff", ivory: "#fffff0", lightyellow: "#ffffe0", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", linen: "#faf0e6", mediumaquamarine: "#66cdaa", lemonchiffon: "#fffacd", lime: "#00ff00", khaki: "#f0e68c", mediumseagreen: "#3cb371", limegreen: "#32cd32", mediumspringgreen: "#00fa9a", lightskyblue: "#87cefa", lightblue: "#add8e6", midnightblue: "#191970", lightpink: "#ffb6c1", mistyrose: "#ffe4e1", moccasin: "#ffe4b5", mintcream: "#f5fffa", lightslategray: "#778899", lightslategrey: "#778899", navajowhite: "#ffdead", navy: "#000080", mediumvioletred: "#c71585", powderblue: "#b0e0e6", palegoldenrod: "#eee8aa", oldlace: "#fdf5e6", paleturquoise: "#afeeee", mediumturquoise: "#48d1cc", mediumorchid: "#ba55d3", rebeccapurple: "#663399", lightsteelblue: "#b0c4de", mediumslateblue: "#7b68ee", thistle: "#d8bfd8", tan: "#d2b48c", orchid: "#da70d6", mediumpurple: "#9370db", purple: "#800080", pink: "#ffc0cb", skyblue: "#87ceeb", springgreen: "#00ff7f", palegreen: "#98fb98", red: "#ff0000", yellow: "#ffff00", slateblue: "#6a5acd", lavenderblush: "#fff0f5", peru: "#cd853f", palevioletred: "#db7093", violet: "#ee82ee", teal: "#008080", slategray: "#708090", slategrey: "#708090", aliceblue: "#f0f8ff", darkseagreen: "#8fbc8f", darkolivegreen: "#556b2f", greenyellow: "#adff2f", seagreen: "#2e8b57", seashell: "#fff5ee", tomato: "#ff6347", silver: "#c0c0c0", sienna: "#a0522d", lavender: "#e6e6fa", lightgreen: "#90ee90", orange: "#ffa500", orangered: "#ff4500", steelblue: "#4682b4", royalblue: "#4169e1", turquoise: "#40e0d0", yellowgreen: "#9acd32", salmon: "#fa8072", saddlebrown: "#8b4513", sandybrown: "#f4a460", rosybrown: "#bc8f8f", darksalmon: "#e9967a", lightgoldenrodyellow: "#fafad2", snow: "#fffafa", lightgrey: "#d3d3d3", lightgray: "#d3d3d3", dimgray: "#696969", dimgrey: "#696969", olivedrab: "#6b8e23", olive: "#808000" }, r2 = {};
    for (var d2 in a2)
      r2[a2[d2]] = d2;
    var l2 = {};
    e2.prototype.toName = function(f3) {
      if (!(this.rgba.a || this.rgba.r || this.rgba.g || this.rgba.b))
        return "transparent";
      var d3, i2, n2 = r2[this.toHex()];
      if (n2)
        return n2;
      if (null == f3 ? void 0 : f3.closest) {
        var o2 = this.toRgb(), t2 = 1 / 0, b2 = "black";
        if (!l2.length)
          for (var c2 in a2)
            l2[c2] = new e2(a2[c2]).toRgb();
        for (var g2 in a2) {
          var u2 = (d3 = o2, i2 = l2[g2], Math.pow(d3.r - i2.r, 2) + Math.pow(d3.g - i2.g, 2) + Math.pow(d3.b - i2.b, 2));
          u2 < t2 && (t2 = u2, b2 = g2);
        }
        return b2;
      }
    };
    f2.string.push([function(f3) {
      var r3 = f3.toLowerCase(), d3 = "transparent" === r3 ? "#0000" : a2[r3];
      return d3 ? new e2(d3).toRgb() : null;
    }, "name"]);
  }

  // node_modules/@pixi/color/lib/Color.mjs
  k([names_default]);
  var _Color = class {
    constructor(value = 16777215) {
      this._value = null;
      this._components = new Float32Array(4);
      this._components.fill(1);
      this._int = 16777215;
      this.value = value;
    }
    get red() {
      return this._components[0];
    }
    get green() {
      return this._components[1];
    }
    get blue() {
      return this._components[2];
    }
    get alpha() {
      return this._components[3];
    }
    setValue(value) {
      this.value = value;
      return this;
    }
    set value(value) {
      if (value instanceof _Color) {
        this._value = this.cloneSource(value._value);
        this._int = value._int;
        this._components.set(value._components);
      } else if (value === null) {
        throw new Error("Cannot set PIXI.Color#value to null");
      } else if (this._value === null || !this.isSourceEqual(this._value, value)) {
        this.normalize(value);
        this._value = this.cloneSource(value);
      }
    }
    get value() {
      return this._value;
    }
    cloneSource(value) {
      if (typeof value === "string" || typeof value === "number" || value instanceof Number || value === null) {
        return value;
      } else if (Array.isArray(value) || ArrayBuffer.isView(value)) {
        return value.slice(0);
      } else if (typeof value === "object" && value !== null) {
        return { ...value };
      }
      return value;
    }
    isSourceEqual(value1, value2) {
      const type1 = typeof value1;
      const type2 = typeof value2;
      if (type1 !== type2) {
        return false;
      } else if (type1 === "number" || type1 === "string" || value1 instanceof Number) {
        return value1 === value2;
      } else if (Array.isArray(value1) && Array.isArray(value2) || ArrayBuffer.isView(value1) && ArrayBuffer.isView(value2)) {
        if (value1.length !== value2.length) {
          return false;
        }
        return value1.every((v2, i2) => v2 === value2[i2]);
      } else if (value1 !== null && value2 !== null) {
        const keys1 = Object.keys(value1);
        const keys2 = Object.keys(value2);
        if (keys1.length !== keys2.length) {
          return false;
        }
        return keys1.every((key) => value1[key] === value2[key]);
      }
      return value1 === value2;
    }
    toRgba() {
      const [r2, g2, b2, a2] = this._components;
      return { r: r2, g: g2, b: b2, a: a2 };
    }
    toRgb() {
      const [r2, g2, b2] = this._components;
      return { r: r2, g: g2, b: b2 };
    }
    toRgbaString() {
      const [r2, g2, b2] = this.toUint8RgbArray();
      return `rgba(${r2},${g2},${b2},${this.alpha})`;
    }
    toUint8RgbArray(out) {
      const [r2, g2, b2] = this._components;
      out = out ?? [];
      out[0] = Math.round(r2 * 255);
      out[1] = Math.round(g2 * 255);
      out[2] = Math.round(b2 * 255);
      return out;
    }
    toRgbArray(out) {
      out = out ?? [];
      const [r2, g2, b2] = this._components;
      out[0] = r2;
      out[1] = g2;
      out[2] = b2;
      return out;
    }
    toNumber() {
      return this._int;
    }
    toLittleEndianNumber() {
      const value = this._int;
      return (value >> 16) + (value & 65280) + ((value & 255) << 16);
    }
    multiply(value) {
      const [r2, g2, b2, a2] = _Color.temp.setValue(value)._components;
      this._components[0] *= r2;
      this._components[1] *= g2;
      this._components[2] *= b2;
      this._components[3] *= a2;
      this.refreshInt();
      this._value = null;
      return this;
    }
    premultiply(alpha, applyToRGB = true) {
      if (applyToRGB) {
        this._components[0] *= alpha;
        this._components[1] *= alpha;
        this._components[2] *= alpha;
      }
      this._components[3] = alpha;
      this.refreshInt();
      this._value = null;
      return this;
    }
    toPremultiplied(alpha, applyToRGB = true) {
      if (alpha === 1) {
        return (255 << 24) + this._int;
      }
      if (alpha === 0) {
        return applyToRGB ? 0 : this._int;
      }
      let r2 = this._int >> 16 & 255;
      let g2 = this._int >> 8 & 255;
      let b2 = this._int & 255;
      if (applyToRGB) {
        r2 = r2 * alpha + 0.5 | 0;
        g2 = g2 * alpha + 0.5 | 0;
        b2 = b2 * alpha + 0.5 | 0;
      }
      return (alpha * 255 << 24) + (r2 << 16) + (g2 << 8) + b2;
    }
    toHex() {
      const hexString = this._int.toString(16);
      return `#${"000000".substring(0, 6 - hexString.length) + hexString}`;
    }
    toHexa() {
      const alphaValue = Math.round(this._components[3] * 255);
      const alphaString = alphaValue.toString(16);
      return this.toHex() + "00".substring(0, 2 - alphaString.length) + alphaString;
    }
    setAlpha(alpha) {
      this._components[3] = this._clamp(alpha);
      return this;
    }
    round(steps) {
      const [r2, g2, b2] = this._components;
      this._components[0] = Math.round(r2 * steps) / steps;
      this._components[1] = Math.round(g2 * steps) / steps;
      this._components[2] = Math.round(b2 * steps) / steps;
      this.refreshInt();
      this._value = null;
      return this;
    }
    toArray(out) {
      out = out ?? [];
      const [r2, g2, b2, a2] = this._components;
      out[0] = r2;
      out[1] = g2;
      out[2] = b2;
      out[3] = a2;
      return out;
    }
    normalize(value) {
      let r2;
      let g2;
      let b2;
      let a2;
      if ((typeof value === "number" || value instanceof Number) && value >= 0 && value <= 16777215) {
        const int = value;
        r2 = (int >> 16 & 255) / 255;
        g2 = (int >> 8 & 255) / 255;
        b2 = (int & 255) / 255;
        a2 = 1;
      } else if ((Array.isArray(value) || value instanceof Float32Array) && value.length >= 3 && value.length <= 4) {
        value = this._clamp(value);
        [r2, g2, b2, a2 = 1] = value;
      } else if ((value instanceof Uint8Array || value instanceof Uint8ClampedArray) && value.length >= 3 && value.length <= 4) {
        value = this._clamp(value, 0, 255);
        [r2, g2, b2, a2 = 255] = value;
        r2 /= 255;
        g2 /= 255;
        b2 /= 255;
        a2 /= 255;
      } else if (typeof value === "string" || typeof value === "object") {
        if (typeof value === "string") {
          const match = _Color.HEX_PATTERN.exec(value);
          if (match) {
            value = `#${match[2]}`;
          }
        }
        const color = w(value);
        if (color.isValid()) {
          ({ r: r2, g: g2, b: b2, a: a2 } = color.rgba);
          r2 /= 255;
          g2 /= 255;
          b2 /= 255;
        }
      }
      if (r2 !== void 0) {
        this._components[0] = r2;
        this._components[1] = g2;
        this._components[2] = b2;
        this._components[3] = a2;
        this.refreshInt();
      } else {
        throw new Error(`Unable to convert color ${value}`);
      }
    }
    refreshInt() {
      this._clamp(this._components);
      const [r2, g2, b2] = this._components;
      this._int = (r2 * 255 << 16) + (g2 * 255 << 8) + (b2 * 255 | 0);
    }
    _clamp(value, min = 0, max = 1) {
      if (typeof value === "number") {
        return Math.min(Math.max(value, min), max);
      }
      value.forEach((v2, i2) => {
        value[i2] = Math.min(Math.max(v2, min), max);
      });
      return value;
    }
  };
  var Color = _Color;
  Color.shared = new _Color();
  Color.temp = new _Color();
  Color.HEX_PATTERN = /^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;

  // node_modules/@pixi/utils/lib/color/premultiply.mjs
  function mapPremultipliedBlendModes() {
    const pm = [];
    const npm = [];
    for (let i2 = 0; i2 < 32; i2++) {
      pm[i2] = i2;
      npm[i2] = i2;
    }
    pm[BLEND_MODES.NORMAL_NPM] = BLEND_MODES.NORMAL;
    pm[BLEND_MODES.ADD_NPM] = BLEND_MODES.ADD;
    pm[BLEND_MODES.SCREEN_NPM] = BLEND_MODES.SCREEN;
    npm[BLEND_MODES.NORMAL] = BLEND_MODES.NORMAL_NPM;
    npm[BLEND_MODES.ADD] = BLEND_MODES.ADD_NPM;
    npm[BLEND_MODES.SCREEN] = BLEND_MODES.SCREEN_NPM;
    const array = [];
    array.push(npm);
    array.push(pm);
    return array;
  }
  var premultiplyBlendMode = mapPremultipliedBlendModes();

  // node_modules/@pixi/utils/lib/data/getBufferType.mjs
  function getBufferType(array) {
    if (array.BYTES_PER_ELEMENT === 4) {
      if (array instanceof Float32Array) {
        return "Float32Array";
      } else if (array instanceof Uint32Array) {
        return "Uint32Array";
      }
      return "Int32Array";
    } else if (array.BYTES_PER_ELEMENT === 2) {
      if (array instanceof Uint16Array) {
        return "Uint16Array";
      }
    } else if (array.BYTES_PER_ELEMENT === 1) {
      if (array instanceof Uint8Array) {
        return "Uint8Array";
      }
    }
    return null;
  }

  // node_modules/@pixi/utils/lib/data/pow2.mjs
  function nextPow2(v2) {
    v2 += v2 === 0 ? 1 : 0;
    --v2;
    v2 |= v2 >>> 1;
    v2 |= v2 >>> 2;
    v2 |= v2 >>> 4;
    v2 |= v2 >>> 8;
    v2 |= v2 >>> 16;
    return v2 + 1;
  }
  function isPow2(v2) {
    return !(v2 & v2 - 1) && !!v2;
  }
  function log2(v2) {
    let r2 = (v2 > 65535 ? 1 : 0) << 4;
    v2 >>>= r2;
    let shift = (v2 > 255 ? 1 : 0) << 3;
    v2 >>>= shift;
    r2 |= shift;
    shift = (v2 > 15 ? 1 : 0) << 2;
    v2 >>>= shift;
    r2 |= shift;
    shift = (v2 > 3 ? 1 : 0) << 1;
    v2 >>>= shift;
    r2 |= shift;
    return r2 | v2 >> 1;
  }

  // node_modules/@pixi/utils/lib/data/removeItems.mjs
  function removeItems(arr, startIdx, removeCount) {
    const length = arr.length;
    let i2;
    if (startIdx >= length || removeCount === 0) {
      return;
    }
    removeCount = startIdx + removeCount > length ? length - startIdx : removeCount;
    const len = length - removeCount;
    for (i2 = startIdx; i2 < len; ++i2) {
      arr[i2] = arr[i2 + removeCount];
    }
    arr.length = len;
  }

  // node_modules/@pixi/utils/lib/data/uid.mjs
  var nextUid = 0;
  function uid() {
    return ++nextUid;
  }

  // node_modules/@pixi/utils/lib/media/BoundingBox.mjs
  var _BoundingBox = class {
    constructor(left, top, right, bottom) {
      this.left = left;
      this.top = top;
      this.right = right;
      this.bottom = bottom;
    }
    get width() {
      return this.right - this.left;
    }
    get height() {
      return this.bottom - this.top;
    }
    isEmpty() {
      return this.left === this.right || this.top === this.bottom;
    }
  };
  var BoundingBox = _BoundingBox;
  BoundingBox.EMPTY = new _BoundingBox(0, 0, 0, 0);

  // node_modules/@pixi/utils/lib/media/caches.mjs
  var ProgramCache = {};
  var TextureCache = /* @__PURE__ */ Object.create(null);
  var BaseTextureCache = /* @__PURE__ */ Object.create(null);

  // node_modules/@pixi/utils/lib/network/determineCrossOrigin.mjs
  var tempAnchor;
  function determineCrossOrigin(url$1, loc = globalThis.location) {
    if (url$1.startsWith("data:")) {
      return "";
    }
    loc = loc || globalThis.location;
    if (!tempAnchor) {
      tempAnchor = document.createElement("a");
    }
    tempAnchor.href = url$1;
    const parsedUrl = url.parse(tempAnchor.href);
    const samePort = !parsedUrl.port && loc.port === "" || parsedUrl.port === loc.port;
    if (parsedUrl.hostname !== loc.hostname || !samePort || parsedUrl.protocol !== loc.protocol) {
      return "anonymous";
    }
    return "";
  }

  // node_modules/@pixi/utils/lib/network/getResolutionOfUrl.mjs
  function getResolutionOfUrl(url2, defaultValue2 = 1) {
    const resolution = settings.RETINA_PREFIX?.exec(url2);
    if (resolution) {
      return parseFloat(resolution[1]);
    }
    return defaultValue2;
  }

  // node_modules/@pixi/extensions/lib/index.mjs
  var ExtensionType = /* @__PURE__ */ ((ExtensionType2) => {
    ExtensionType2["Renderer"] = "renderer";
    ExtensionType2["Application"] = "application";
    ExtensionType2["RendererSystem"] = "renderer-webgl-system";
    ExtensionType2["RendererPlugin"] = "renderer-webgl-plugin";
    ExtensionType2["CanvasRendererSystem"] = "renderer-canvas-system";
    ExtensionType2["CanvasRendererPlugin"] = "renderer-canvas-plugin";
    ExtensionType2["Asset"] = "asset";
    ExtensionType2["LoadParser"] = "load-parser";
    ExtensionType2["ResolveParser"] = "resolve-parser";
    ExtensionType2["CacheParser"] = "cache-parser";
    ExtensionType2["DetectionParser"] = "detection-parser";
    return ExtensionType2;
  })(ExtensionType || {});
  var normalizeExtension = (ext) => {
    if (typeof ext === "function" || typeof ext === "object" && ext.extension) {
      if (!ext.extension) {
        throw new Error("Extension class must have an extension object");
      }
      const metadata = typeof ext.extension !== "object" ? { type: ext.extension } : ext.extension;
      ext = { ...metadata, ref: ext };
    }
    if (typeof ext === "object") {
      ext = { ...ext };
    } else {
      throw new Error("Invalid extension type");
    }
    if (typeof ext.type === "string") {
      ext.type = [ext.type];
    }
    return ext;
  };
  var normalizePriority = (ext, defaultPriority) => normalizeExtension(ext).priority ?? defaultPriority;
  var extensions = {
    _addHandlers: {},
    _removeHandlers: {},
    _queue: {},
    remove(...extensions2) {
      extensions2.map(normalizeExtension).forEach((ext) => {
        ext.type.forEach((type) => this._removeHandlers[type]?.(ext));
      });
      return this;
    },
    add(...extensions2) {
      extensions2.map(normalizeExtension).forEach((ext) => {
        ext.type.forEach((type) => {
          const handlers = this._addHandlers;
          const queue = this._queue;
          if (!handlers[type]) {
            queue[type] = queue[type] || [];
            queue[type].push(ext);
          } else {
            handlers[type](ext);
          }
        });
      });
      return this;
    },
    handle(type, onAdd, onRemove) {
      const addHandlers = this._addHandlers;
      const removeHandlers = this._removeHandlers;
      if (addHandlers[type] || removeHandlers[type]) {
        throw new Error(`Extension type ${type} already has a handler`);
      }
      addHandlers[type] = onAdd;
      removeHandlers[type] = onRemove;
      const queue = this._queue;
      if (queue[type]) {
        queue[type].forEach((ext) => onAdd(ext));
        delete queue[type];
      }
      return this;
    },
    handleByMap(type, map3) {
      return this.handle(type, (extension) => {
        map3[extension.name] = extension.ref;
      }, (extension) => {
        delete map3[extension.name];
      });
    },
    handleByList(type, list, defaultPriority = -1) {
      return this.handle(type, (extension) => {
        if (list.includes(extension.ref)) {
          return;
        }
        list.push(extension.ref);
        list.sort((a2, b2) => normalizePriority(b2, defaultPriority) - normalizePriority(a2, defaultPriority));
      }, (extension) => {
        const index = list.indexOf(extension.ref);
        if (index !== -1) {
          list.splice(index, 1);
        }
      });
    }
  };

  // node_modules/@pixi/core/lib/geometry/ViewableBuffer.mjs
  var ViewableBuffer = class {
    constructor(sizeOrBuffer) {
      if (typeof sizeOrBuffer === "number") {
        this.rawBinaryData = new ArrayBuffer(sizeOrBuffer);
      } else if (sizeOrBuffer instanceof Uint8Array) {
        this.rawBinaryData = sizeOrBuffer.buffer;
      } else {
        this.rawBinaryData = sizeOrBuffer;
      }
      this.uint32View = new Uint32Array(this.rawBinaryData);
      this.float32View = new Float32Array(this.rawBinaryData);
    }
    get int8View() {
      if (!this._int8View) {
        this._int8View = new Int8Array(this.rawBinaryData);
      }
      return this._int8View;
    }
    get uint8View() {
      if (!this._uint8View) {
        this._uint8View = new Uint8Array(this.rawBinaryData);
      }
      return this._uint8View;
    }
    get int16View() {
      if (!this._int16View) {
        this._int16View = new Int16Array(this.rawBinaryData);
      }
      return this._int16View;
    }
    get uint16View() {
      if (!this._uint16View) {
        this._uint16View = new Uint16Array(this.rawBinaryData);
      }
      return this._uint16View;
    }
    get int32View() {
      if (!this._int32View) {
        this._int32View = new Int32Array(this.rawBinaryData);
      }
      return this._int32View;
    }
    view(type) {
      return this[`${type}View`];
    }
    destroy() {
      this.rawBinaryData = null;
      this._int8View = null;
      this._uint8View = null;
      this._int16View = null;
      this._uint16View = null;
      this._int32View = null;
      this.uint32View = null;
      this.float32View = null;
    }
    static sizeOf(type) {
      switch (type) {
        case "int8":
        case "uint8":
          return 1;
        case "int16":
        case "uint16":
          return 2;
        case "int32":
        case "uint32":
        case "float32":
          return 4;
        default:
          throw new Error(`${type} isn't a valid view type`);
      }
    }
  };

  // node_modules/@pixi/core/lib/shader/utils/checkMaxIfStatementsInShader.mjs
  var fragTemplate = [
    "precision mediump float;",
    "void main(void){",
    "float test = 0.1;",
    "%forloop%",
    "gl_FragColor = vec4(0.0);",
    "}"
  ].join("\n");
  function generateIfTestSrc(maxIfs) {
    let src = "";
    for (let i2 = 0; i2 < maxIfs; ++i2) {
      if (i2 > 0) {
        src += "\nelse ";
      }
      if (i2 < maxIfs - 1) {
        src += `if(test == ${i2}.0){}`;
      }
    }
    return src;
  }
  function checkMaxIfStatementsInShader(maxIfs, gl) {
    if (maxIfs === 0) {
      throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
    }
    const shader = gl.createShader(gl.FRAGMENT_SHADER);
    while (true) {
      const fragmentSrc = fragTemplate.replace(/%forloop%/gi, generateIfTestSrc(maxIfs));
      gl.shaderSource(shader, fragmentSrc);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        maxIfs = maxIfs / 2 | 0;
      } else {
        break;
      }
    }
    return maxIfs;
  }

  // node_modules/@pixi/core/lib/state/State.mjs
  var BLEND = 0;
  var OFFSET = 1;
  var CULLING = 2;
  var DEPTH_TEST = 3;
  var WINDING = 4;
  var DEPTH_MASK = 5;
  var State = class {
    constructor() {
      this.data = 0;
      this.blendMode = BLEND_MODES.NORMAL;
      this.polygonOffset = 0;
      this.blend = true;
      this.depthMask = true;
    }
    get blend() {
      return !!(this.data & 1 << BLEND);
    }
    set blend(value) {
      if (!!(this.data & 1 << BLEND) !== value) {
        this.data ^= 1 << BLEND;
      }
    }
    get offsets() {
      return !!(this.data & 1 << OFFSET);
    }
    set offsets(value) {
      if (!!(this.data & 1 << OFFSET) !== value) {
        this.data ^= 1 << OFFSET;
      }
    }
    get culling() {
      return !!(this.data & 1 << CULLING);
    }
    set culling(value) {
      if (!!(this.data & 1 << CULLING) !== value) {
        this.data ^= 1 << CULLING;
      }
    }
    get depthTest() {
      return !!(this.data & 1 << DEPTH_TEST);
    }
    set depthTest(value) {
      if (!!(this.data & 1 << DEPTH_TEST) !== value) {
        this.data ^= 1 << DEPTH_TEST;
      }
    }
    get depthMask() {
      return !!(this.data & 1 << DEPTH_MASK);
    }
    set depthMask(value) {
      if (!!(this.data & 1 << DEPTH_MASK) !== value) {
        this.data ^= 1 << DEPTH_MASK;
      }
    }
    get clockwiseFrontFace() {
      return !!(this.data & 1 << WINDING);
    }
    set clockwiseFrontFace(value) {
      if (!!(this.data & 1 << WINDING) !== value) {
        this.data ^= 1 << WINDING;
      }
    }
    get blendMode() {
      return this._blendMode;
    }
    set blendMode(value) {
      this.blend = value !== BLEND_MODES.NONE;
      this._blendMode = value;
    }
    get polygonOffset() {
      return this._polygonOffset;
    }
    set polygonOffset(value) {
      this.offsets = !!value;
      this._polygonOffset = value;
    }
    toString() {
      return `[@pixi/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`;
    }
    static for2d() {
      const state = new State();
      state.depthTest = false;
      state.blend = true;
      return state;
    }
  };

  // node_modules/@pixi/core/lib/textures/resources/autoDetectResource.mjs
  var INSTALLED = [];
  function autoDetectResource(source, options) {
    if (!source) {
      return null;
    }
    let extension = "";
    if (typeof source === "string") {
      const result = /\.(\w{3,4})(?:$|\?|#)/i.exec(source);
      if (result) {
        extension = result[1].toLowerCase();
      }
    }
    for (let i2 = INSTALLED.length - 1; i2 >= 0; --i2) {
      const ResourcePlugin = INSTALLED[i2];
      if (ResourcePlugin.test && ResourcePlugin.test(source, extension)) {
        return new ResourcePlugin(source, options);
      }
    }
    throw new Error("Unrecognized source type to auto-detect Resource");
  }

  // node_modules/@pixi/runner/lib/Runner.mjs
  var Runner = class {
    constructor(name) {
      this.items = [];
      this._name = name;
      this._aliasCount = 0;
    }
    emit(a0, a1, a2, a3, a4, a5, a6, a7) {
      if (arguments.length > 8) {
        throw new Error("max arguments reached");
      }
      const { name, items } = this;
      this._aliasCount++;
      for (let i2 = 0, len = items.length; i2 < len; i2++) {
        items[i2][name](a0, a1, a2, a3, a4, a5, a6, a7);
      }
      if (items === this.items) {
        this._aliasCount--;
      }
      return this;
    }
    ensureNonAliasedItems() {
      if (this._aliasCount > 0 && this.items.length > 1) {
        this._aliasCount = 0;
        this.items = this.items.slice(0);
      }
    }
    add(item) {
      if (item[this._name]) {
        this.ensureNonAliasedItems();
        this.remove(item);
        this.items.push(item);
      }
      return this;
    }
    remove(item) {
      const index = this.items.indexOf(item);
      if (index !== -1) {
        this.ensureNonAliasedItems();
        this.items.splice(index, 1);
      }
      return this;
    }
    contains(item) {
      return this.items.includes(item);
    }
    removeAll() {
      this.ensureNonAliasedItems();
      this.items.length = 0;
      return this;
    }
    destroy() {
      this.removeAll();
      this.items = null;
      this._name = null;
    }
    get empty() {
      return this.items.length === 0;
    }
    get name() {
      return this._name;
    }
  };
  Object.defineProperties(Runner.prototype, {
    dispatch: { value: Runner.prototype.emit },
    run: { value: Runner.prototype.emit }
  });

  // node_modules/@pixi/core/lib/textures/resources/Resource.mjs
  var Resource = class {
    constructor(width = 0, height = 0) {
      this._width = width;
      this._height = height;
      this.destroyed = false;
      this.internal = false;
      this.onResize = new Runner("setRealSize");
      this.onUpdate = new Runner("update");
      this.onError = new Runner("onError");
    }
    bind(baseTexture) {
      this.onResize.add(baseTexture);
      this.onUpdate.add(baseTexture);
      this.onError.add(baseTexture);
      if (this._width || this._height) {
        this.onResize.emit(this._width, this._height);
      }
    }
    unbind(baseTexture) {
      this.onResize.remove(baseTexture);
      this.onUpdate.remove(baseTexture);
      this.onError.remove(baseTexture);
    }
    resize(width, height) {
      if (width !== this._width || height !== this._height) {
        this._width = width;
        this._height = height;
        this.onResize.emit(width, height);
      }
    }
    get valid() {
      return !!this._width && !!this._height;
    }
    update() {
      if (!this.destroyed) {
        this.onUpdate.emit();
      }
    }
    load() {
      return Promise.resolve(this);
    }
    get width() {
      return this._width;
    }
    get height() {
      return this._height;
    }
    style(_renderer, _baseTexture, _glTexture) {
      return false;
    }
    dispose() {
    }
    destroy() {
      if (!this.destroyed) {
        this.destroyed = true;
        this.dispose();
        this.onError.removeAll();
        this.onError = null;
        this.onResize.removeAll();
        this.onResize = null;
        this.onUpdate.removeAll();
        this.onUpdate = null;
      }
    }
    static test(_source, _extension) {
      return false;
    }
  };

  // node_modules/@pixi/core/lib/textures/resources/BufferResource.mjs
  var BufferResource = class extends Resource {
    constructor(source, options) {
      const { width, height } = options || {};
      if (!width || !height) {
        throw new Error("BufferResource width or height invalid");
      }
      super(width, height);
      this.data = source;
    }
    upload(renderer, baseTexture, glTexture) {
      const gl = renderer.gl;
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, baseTexture.alphaMode === ALPHA_MODES.UNPACK);
      const width = baseTexture.realWidth;
      const height = baseTexture.realHeight;
      if (glTexture.width === width && glTexture.height === height) {
        gl.texSubImage2D(baseTexture.target, 0, 0, 0, width, height, baseTexture.format, glTexture.type, this.data);
      } else {
        glTexture.width = width;
        glTexture.height = height;
        gl.texImage2D(baseTexture.target, 0, glTexture.internalFormat, width, height, 0, baseTexture.format, glTexture.type, this.data);
      }
      return true;
    }
    dispose() {
      this.data = null;
    }
    static test(source) {
      return source instanceof Float32Array || source instanceof Uint8Array || source instanceof Uint32Array;
    }
  };

  // node_modules/@pixi/core/lib/textures/BaseTexture.mjs
  var defaultBufferOptions = {
    scaleMode: SCALE_MODES.NEAREST,
    format: FORMATS.RGBA,
    alphaMode: ALPHA_MODES.NPM
  };
  var _BaseTexture = class extends import_eventemitter3.default {
    constructor(resource = null, options = null) {
      super();
      options = Object.assign({}, _BaseTexture.defaultOptions, options);
      const {
        alphaMode,
        mipmap,
        anisotropicLevel,
        scaleMode,
        width,
        height,
        wrapMode,
        format: format2,
        type,
        target,
        resolution,
        resourceOptions
      } = options;
      if (resource && !(resource instanceof Resource)) {
        resource = autoDetectResource(resource, resourceOptions);
        resource.internal = true;
      }
      this.resolution = resolution || settings.RESOLUTION;
      this.width = Math.round((width || 0) * this.resolution) / this.resolution;
      this.height = Math.round((height || 0) * this.resolution) / this.resolution;
      this._mipmap = mipmap;
      this.anisotropicLevel = anisotropicLevel;
      this._wrapMode = wrapMode;
      this._scaleMode = scaleMode;
      this.format = format2;
      this.type = type;
      this.target = target;
      this.alphaMode = alphaMode;
      this.uid = uid();
      this.touched = 0;
      this.isPowerOfTwo = false;
      this._refreshPOT();
      this._glTextures = {};
      this.dirtyId = 0;
      this.dirtyStyleId = 0;
      this.cacheId = null;
      this.valid = width > 0 && height > 0;
      this.textureCacheIds = [];
      this.destroyed = false;
      this.resource = null;
      this._batchEnabled = 0;
      this._batchLocation = 0;
      this.parentTextureArray = null;
      this.setResource(resource);
    }
    get realWidth() {
      return Math.round(this.width * this.resolution);
    }
    get realHeight() {
      return Math.round(this.height * this.resolution);
    }
    get mipmap() {
      return this._mipmap;
    }
    set mipmap(value) {
      if (this._mipmap !== value) {
        this._mipmap = value;
        this.dirtyStyleId++;
      }
    }
    get scaleMode() {
      return this._scaleMode;
    }
    set scaleMode(value) {
      if (this._scaleMode !== value) {
        this._scaleMode = value;
        this.dirtyStyleId++;
      }
    }
    get wrapMode() {
      return this._wrapMode;
    }
    set wrapMode(value) {
      if (this._wrapMode !== value) {
        this._wrapMode = value;
        this.dirtyStyleId++;
      }
    }
    setStyle(scaleMode, mipmap) {
      let dirty;
      if (scaleMode !== void 0 && scaleMode !== this.scaleMode) {
        this.scaleMode = scaleMode;
        dirty = true;
      }
      if (mipmap !== void 0 && mipmap !== this.mipmap) {
        this.mipmap = mipmap;
        dirty = true;
      }
      if (dirty) {
        this.dirtyStyleId++;
      }
      return this;
    }
    setSize(desiredWidth, desiredHeight, resolution) {
      resolution = resolution || this.resolution;
      return this.setRealSize(desiredWidth * resolution, desiredHeight * resolution, resolution);
    }
    setRealSize(realWidth, realHeight, resolution) {
      this.resolution = resolution || this.resolution;
      this.width = Math.round(realWidth) / this.resolution;
      this.height = Math.round(realHeight) / this.resolution;
      this._refreshPOT();
      this.update();
      return this;
    }
    _refreshPOT() {
      this.isPowerOfTwo = isPow2(this.realWidth) && isPow2(this.realHeight);
    }
    setResolution(resolution) {
      const oldResolution = this.resolution;
      if (oldResolution === resolution) {
        return this;
      }
      this.resolution = resolution;
      if (this.valid) {
        this.width = Math.round(this.width * oldResolution) / resolution;
        this.height = Math.round(this.height * oldResolution) / resolution;
        this.emit("update", this);
      }
      this._refreshPOT();
      return this;
    }
    setResource(resource) {
      if (this.resource === resource) {
        return this;
      }
      if (this.resource) {
        throw new Error("Resource can be set only once");
      }
      resource.bind(this);
      this.resource = resource;
      return this;
    }
    update() {
      if (!this.valid) {
        if (this.width > 0 && this.height > 0) {
          this.valid = true;
          this.emit("loaded", this);
          this.emit("update", this);
        }
      } else {
        this.dirtyId++;
        this.dirtyStyleId++;
        this.emit("update", this);
      }
    }
    onError(event) {
      this.emit("error", this, event);
    }
    destroy() {
      if (this.resource) {
        this.resource.unbind(this);
        if (this.resource.internal) {
          this.resource.destroy();
        }
        this.resource = null;
      }
      if (this.cacheId) {
        delete BaseTextureCache[this.cacheId];
        delete TextureCache[this.cacheId];
        this.cacheId = null;
      }
      this.dispose();
      _BaseTexture.removeFromCache(this);
      this.textureCacheIds = null;
      this.destroyed = true;
    }
    dispose() {
      this.emit("dispose", this);
    }
    castToBaseTexture() {
      return this;
    }
    static from(source, options, strict = settings.STRICT_TEXTURE_CACHE) {
      const isFrame = typeof source === "string";
      let cacheId = null;
      if (isFrame) {
        cacheId = source;
      } else {
        if (!source._pixiId) {
          const prefix = options?.pixiIdPrefix || "pixiid";
          source._pixiId = `${prefix}_${uid()}`;
        }
        cacheId = source._pixiId;
      }
      let baseTexture = BaseTextureCache[cacheId];
      if (isFrame && strict && !baseTexture) {
        throw new Error(`The cacheId "${cacheId}" does not exist in BaseTextureCache.`);
      }
      if (!baseTexture) {
        baseTexture = new _BaseTexture(source, options);
        baseTexture.cacheId = cacheId;
        _BaseTexture.addToCache(baseTexture, cacheId);
      }
      return baseTexture;
    }
    static fromBuffer(buffer, width, height, options) {
      buffer = buffer || new Float32Array(width * height * 4);
      const resource = new BufferResource(buffer, { width, height });
      const type = buffer instanceof Float32Array ? TYPES.FLOAT : TYPES.UNSIGNED_BYTE;
      return new _BaseTexture(resource, Object.assign({}, defaultBufferOptions, { type }, options));
    }
    static addToCache(baseTexture, id) {
      if (id) {
        if (!baseTexture.textureCacheIds.includes(id)) {
          baseTexture.textureCacheIds.push(id);
        }
        if (BaseTextureCache[id] && BaseTextureCache[id] !== baseTexture) {
          console.warn(`BaseTexture added to the cache with an id [${id}] that already had an entry`);
        }
        BaseTextureCache[id] = baseTexture;
      }
    }
    static removeFromCache(baseTexture) {
      if (typeof baseTexture === "string") {
        const baseTextureFromCache = BaseTextureCache[baseTexture];
        if (baseTextureFromCache) {
          const index = baseTextureFromCache.textureCacheIds.indexOf(baseTexture);
          if (index > -1) {
            baseTextureFromCache.textureCacheIds.splice(index, 1);
          }
          delete BaseTextureCache[baseTexture];
          return baseTextureFromCache;
        }
      } else if (baseTexture?.textureCacheIds) {
        for (let i2 = 0; i2 < baseTexture.textureCacheIds.length; ++i2) {
          delete BaseTextureCache[baseTexture.textureCacheIds[i2]];
        }
        baseTexture.textureCacheIds.length = 0;
        return baseTexture;
      }
      return null;
    }
  };
  var BaseTexture = _BaseTexture;
  BaseTexture.defaultOptions = {
    mipmap: MIPMAP_MODES.POW2,
    anisotropicLevel: 0,
    scaleMode: SCALE_MODES.LINEAR,
    wrapMode: WRAP_MODES.CLAMP,
    alphaMode: ALPHA_MODES.UNPACK,
    target: TARGETS.TEXTURE_2D,
    format: FORMATS.RGBA,
    type: TYPES.UNSIGNED_BYTE
  };
  BaseTexture._globalBatch = 0;

  // node_modules/@pixi/core/lib/batch/BatchDrawCall.mjs
  var BatchDrawCall = class {
    constructor() {
      this.texArray = null;
      this.blend = 0;
      this.type = DRAW_MODES.TRIANGLES;
      this.start = 0;
      this.size = 0;
      this.data = null;
    }
  };

  // node_modules/@pixi/core/lib/geometry/Buffer.mjs
  var UID = 0;
  var Buffer2 = class {
    constructor(data, _static = true, index = false) {
      this.data = data || new Float32Array(1);
      this._glBuffers = {};
      this._updateID = 0;
      this.index = index;
      this.static = _static;
      this.id = UID++;
      this.disposeRunner = new Runner("disposeBuffer");
    }
    update(data) {
      if (data instanceof Array) {
        data = new Float32Array(data);
      }
      this.data = data || this.data;
      this._updateID++;
    }
    dispose() {
      this.disposeRunner.emit(this, false);
    }
    destroy() {
      this.dispose();
      this.data = null;
    }
    set index(value) {
      this.type = value ? BUFFER_TYPE.ELEMENT_ARRAY_BUFFER : BUFFER_TYPE.ARRAY_BUFFER;
    }
    get index() {
      return this.type === BUFFER_TYPE.ELEMENT_ARRAY_BUFFER;
    }
    static from(data) {
      if (data instanceof Array) {
        data = new Float32Array(data);
      }
      return new Buffer2(data);
    }
  };

  // node_modules/@pixi/core/lib/geometry/Attribute.mjs
  var Attribute = class {
    constructor(buffer, size = 0, normalized = false, type = TYPES.FLOAT, stride, start, instance, divisor = 1) {
      this.buffer = buffer;
      this.size = size;
      this.normalized = normalized;
      this.type = type;
      this.stride = stride;
      this.start = start;
      this.instance = instance;
      this.divisor = divisor;
    }
    destroy() {
      this.buffer = null;
    }
    static from(buffer, size, normalized, type, stride) {
      return new Attribute(buffer, size, normalized, type, stride);
    }
  };

  // node_modules/@pixi/core/lib/geometry/utils/interleaveTypedArrays.mjs
  var map = {
    Float32Array,
    Uint32Array,
    Int32Array,
    Uint8Array
  };
  function interleaveTypedArrays2(arrays, sizes) {
    let outSize = 0;
    let stride = 0;
    const views = {};
    for (let i2 = 0; i2 < arrays.length; i2++) {
      stride += sizes[i2];
      outSize += arrays[i2].length;
    }
    const buffer = new ArrayBuffer(outSize * 4);
    let out = null;
    let littleOffset = 0;
    for (let i2 = 0; i2 < arrays.length; i2++) {
      const size = sizes[i2];
      const array = arrays[i2];
      const type = getBufferType(array);
      if (!views[type]) {
        views[type] = new map[type](buffer);
      }
      out = views[type];
      for (let j2 = 0; j2 < array.length; j2++) {
        const indexStart = (j2 / size | 0) * stride + littleOffset;
        const index = j2 % size;
        out[indexStart + index] = array[j2];
      }
      littleOffset += size;
    }
    return new Float32Array(buffer);
  }

  // node_modules/@pixi/core/lib/geometry/Geometry.mjs
  var byteSizeMap = { 5126: 4, 5123: 2, 5121: 1 };
  var UID2 = 0;
  var map2 = {
    Float32Array,
    Uint32Array,
    Int32Array,
    Uint8Array,
    Uint16Array
  };
  var Geometry = class {
    constructor(buffers = [], attributes = {}) {
      this.buffers = buffers;
      this.indexBuffer = null;
      this.attributes = attributes;
      this.glVertexArrayObjects = {};
      this.id = UID2++;
      this.instanced = false;
      this.instanceCount = 1;
      this.disposeRunner = new Runner("disposeGeometry");
      this.refCount = 0;
    }
    addAttribute(id, buffer, size = 0, normalized = false, type, stride, start, instance = false) {
      if (!buffer) {
        throw new Error("You must pass a buffer when creating an attribute");
      }
      if (!(buffer instanceof Buffer2)) {
        if (buffer instanceof Array) {
          buffer = new Float32Array(buffer);
        }
        buffer = new Buffer2(buffer);
      }
      const ids = id.split("|");
      if (ids.length > 1) {
        for (let i2 = 0; i2 < ids.length; i2++) {
          this.addAttribute(ids[i2], buffer, size, normalized, type);
        }
        return this;
      }
      let bufferIndex = this.buffers.indexOf(buffer);
      if (bufferIndex === -1) {
        this.buffers.push(buffer);
        bufferIndex = this.buffers.length - 1;
      }
      this.attributes[id] = new Attribute(bufferIndex, size, normalized, type, stride, start, instance);
      this.instanced = this.instanced || instance;
      return this;
    }
    getAttribute(id) {
      return this.attributes[id];
    }
    getBuffer(id) {
      return this.buffers[this.getAttribute(id).buffer];
    }
    addIndex(buffer) {
      if (!(buffer instanceof Buffer2)) {
        if (buffer instanceof Array) {
          buffer = new Uint16Array(buffer);
        }
        buffer = new Buffer2(buffer);
      }
      buffer.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER;
      this.indexBuffer = buffer;
      if (!this.buffers.includes(buffer)) {
        this.buffers.push(buffer);
      }
      return this;
    }
    getIndex() {
      return this.indexBuffer;
    }
    interleave() {
      if (this.buffers.length === 1 || this.buffers.length === 2 && this.indexBuffer)
        return this;
      const arrays = [];
      const sizes = [];
      const interleavedBuffer = new Buffer2();
      let i2;
      for (i2 in this.attributes) {
        const attribute = this.attributes[i2];
        const buffer = this.buffers[attribute.buffer];
        arrays.push(buffer.data);
        sizes.push(attribute.size * byteSizeMap[attribute.type] / 4);
        attribute.buffer = 0;
      }
      interleavedBuffer.data = interleaveTypedArrays2(arrays, sizes);
      for (i2 = 0; i2 < this.buffers.length; i2++) {
        if (this.buffers[i2] !== this.indexBuffer) {
          this.buffers[i2].destroy();
        }
      }
      this.buffers = [interleavedBuffer];
      if (this.indexBuffer) {
        this.buffers.push(this.indexBuffer);
      }
      return this;
    }
    getSize() {
      for (const i2 in this.attributes) {
        const attribute = this.attributes[i2];
        const buffer = this.buffers[attribute.buffer];
        return buffer.data.length / (attribute.stride / 4 || attribute.size);
      }
      return 0;
    }
    dispose() {
      this.disposeRunner.emit(this, false);
    }
    destroy() {
      this.dispose();
      this.buffers = null;
      this.indexBuffer = null;
      this.attributes = null;
    }
    clone() {
      const geometry = new Geometry();
      for (let i2 = 0; i2 < this.buffers.length; i2++) {
        geometry.buffers[i2] = new Buffer2(this.buffers[i2].data.slice(0));
      }
      for (const i2 in this.attributes) {
        const attrib = this.attributes[i2];
        geometry.attributes[i2] = new Attribute(attrib.buffer, attrib.size, attrib.normalized, attrib.type, attrib.stride, attrib.start, attrib.instance);
      }
      if (this.indexBuffer) {
        geometry.indexBuffer = geometry.buffers[this.buffers.indexOf(this.indexBuffer)];
        geometry.indexBuffer.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER;
      }
      return geometry;
    }
    static merge(geometries) {
      const geometryOut = new Geometry();
      const arrays = [];
      const sizes = [];
      const offsets = [];
      let geometry;
      for (let i2 = 0; i2 < geometries.length; i2++) {
        geometry = geometries[i2];
        for (let j2 = 0; j2 < geometry.buffers.length; j2++) {
          sizes[j2] = sizes[j2] || 0;
          sizes[j2] += geometry.buffers[j2].data.length;
          offsets[j2] = 0;
        }
      }
      for (let i2 = 0; i2 < geometry.buffers.length; i2++) {
        arrays[i2] = new map2[getBufferType(geometry.buffers[i2].data)](sizes[i2]);
        geometryOut.buffers[i2] = new Buffer2(arrays[i2]);
      }
      for (let i2 = 0; i2 < geometries.length; i2++) {
        geometry = geometries[i2];
        for (let j2 = 0; j2 < geometry.buffers.length; j2++) {
          arrays[j2].set(geometry.buffers[j2].data, offsets[j2]);
          offsets[j2] += geometry.buffers[j2].data.length;
        }
      }
      geometryOut.attributes = geometry.attributes;
      if (geometry.indexBuffer) {
        geometryOut.indexBuffer = geometryOut.buffers[geometry.buffers.indexOf(geometry.indexBuffer)];
        geometryOut.indexBuffer.type = BUFFER_TYPE.ELEMENT_ARRAY_BUFFER;
        let offset = 0;
        let stride = 0;
        let offset2 = 0;
        let bufferIndexToCount = 0;
        for (let i2 = 0; i2 < geometry.buffers.length; i2++) {
          if (geometry.buffers[i2] !== geometry.indexBuffer) {
            bufferIndexToCount = i2;
            break;
          }
        }
        for (const i2 in geometry.attributes) {
          const attribute = geometry.attributes[i2];
          if ((attribute.buffer | 0) === bufferIndexToCount) {
            stride += attribute.size * byteSizeMap[attribute.type] / 4;
          }
        }
        for (let i2 = 0; i2 < geometries.length; i2++) {
          const indexBufferData = geometries[i2].indexBuffer.data;
          for (let j2 = 0; j2 < indexBufferData.length; j2++) {
            geometryOut.indexBuffer.data[j2 + offset2] += offset;
          }
          offset += geometries[i2].buffers[bufferIndexToCount].data.length / stride;
          offset2 += indexBufferData.length;
        }
      }
      return geometryOut;
    }
  };

  // node_modules/@pixi/core/lib/batch/BatchGeometry.mjs
  var BatchGeometry = class extends Geometry {
    constructor(_static = false) {
      super();
      this._buffer = new Buffer2(null, _static, false);
      this._indexBuffer = new Buffer2(null, _static, true);
      this.addAttribute("aVertexPosition", this._buffer, 2, false, TYPES.FLOAT).addAttribute("aTextureCoord", this._buffer, 2, false, TYPES.FLOAT).addAttribute("aColor", this._buffer, 4, true, TYPES.UNSIGNED_BYTE).addAttribute("aTextureId", this._buffer, 1, true, TYPES.FLOAT).addIndex(this._indexBuffer);
    }
  };

  // node_modules/@pixi/math/lib/const.mjs
  var PI_2 = Math.PI * 2;
  var RAD_TO_DEG = 180 / Math.PI;
  var DEG_TO_RAD = Math.PI / 180;
  var SHAPES = /* @__PURE__ */ ((SHAPES2) => {
    SHAPES2[SHAPES2["POLY"] = 0] = "POLY";
    SHAPES2[SHAPES2["RECT"] = 1] = "RECT";
    SHAPES2[SHAPES2["CIRC"] = 2] = "CIRC";
    SHAPES2[SHAPES2["ELIP"] = 3] = "ELIP";
    SHAPES2[SHAPES2["RREC"] = 4] = "RREC";
    return SHAPES2;
  })(SHAPES || {});

  // node_modules/@pixi/math/lib/Point.mjs
  var Point = class {
    constructor(x2 = 0, y2 = 0) {
      this.x = 0;
      this.y = 0;
      this.x = x2;
      this.y = y2;
    }
    clone() {
      return new Point(this.x, this.y);
    }
    copyFrom(p2) {
      this.set(p2.x, p2.y);
      return this;
    }
    copyTo(p2) {
      p2.set(this.x, this.y);
      return p2;
    }
    equals(p2) {
      return p2.x === this.x && p2.y === this.y;
    }
    set(x2 = 0, y2 = x2) {
      this.x = x2;
      this.y = y2;
      return this;
    }
    toString() {
      return `[@pixi/math:Point x=${this.x} y=${this.y}]`;
    }
  };

  // node_modules/@pixi/math/lib/shapes/Rectangle.mjs
  var tempPoints = [new Point(), new Point(), new Point(), new Point()];
  var Rectangle = class {
    constructor(x2 = 0, y2 = 0, width = 0, height = 0) {
      this.x = Number(x2);
      this.y = Number(y2);
      this.width = Number(width);
      this.height = Number(height);
      this.type = SHAPES.RECT;
    }
    get left() {
      return this.x;
    }
    get right() {
      return this.x + this.width;
    }
    get top() {
      return this.y;
    }
    get bottom() {
      return this.y + this.height;
    }
    static get EMPTY() {
      return new Rectangle(0, 0, 0, 0);
    }
    clone() {
      return new Rectangle(this.x, this.y, this.width, this.height);
    }
    copyFrom(rectangle) {
      this.x = rectangle.x;
      this.y = rectangle.y;
      this.width = rectangle.width;
      this.height = rectangle.height;
      return this;
    }
    copyTo(rectangle) {
      rectangle.x = this.x;
      rectangle.y = this.y;
      rectangle.width = this.width;
      rectangle.height = this.height;
      return rectangle;
    }
    contains(x2, y2) {
      if (this.width <= 0 || this.height <= 0) {
        return false;
      }
      if (x2 >= this.x && x2 < this.x + this.width) {
        if (y2 >= this.y && y2 < this.y + this.height) {
          return true;
        }
      }
      return false;
    }
    intersects(other, transform) {
      if (!transform) {
        const x02 = this.x < other.x ? other.x : this.x;
        const x12 = this.right > other.right ? other.right : this.right;
        if (x12 <= x02) {
          return false;
        }
        const y02 = this.y < other.y ? other.y : this.y;
        const y12 = this.bottom > other.bottom ? other.bottom : this.bottom;
        return y12 > y02;
      }
      const x0 = this.left;
      const x1 = this.right;
      const y0 = this.top;
      const y1 = this.bottom;
      if (x1 <= x0 || y1 <= y0) {
        return false;
      }
      const lt = tempPoints[0].set(other.left, other.top);
      const lb = tempPoints[1].set(other.left, other.bottom);
      const rt = tempPoints[2].set(other.right, other.top);
      const rb = tempPoints[3].set(other.right, other.bottom);
      if (rt.x <= lt.x || lb.y <= lt.y) {
        return false;
      }
      const s2 = Math.sign(transform.a * transform.d - transform.b * transform.c);
      if (s2 === 0) {
        return false;
      }
      transform.apply(lt, lt);
      transform.apply(lb, lb);
      transform.apply(rt, rt);
      transform.apply(rb, rb);
      if (Math.max(lt.x, lb.x, rt.x, rb.x) <= x0 || Math.min(lt.x, lb.x, rt.x, rb.x) >= x1 || Math.max(lt.y, lb.y, rt.y, rb.y) <= y0 || Math.min(lt.y, lb.y, rt.y, rb.y) >= y1) {
        return false;
      }
      const nx = s2 * (lb.y - lt.y);
      const ny = s2 * (lt.x - lb.x);
      const n00 = nx * x0 + ny * y0;
      const n10 = nx * x1 + ny * y0;
      const n01 = nx * x0 + ny * y1;
      const n11 = nx * x1 + ny * y1;
      if (Math.max(n00, n10, n01, n11) <= nx * lt.x + ny * lt.y || Math.min(n00, n10, n01, n11) >= nx * rb.x + ny * rb.y) {
        return false;
      }
      const mx = s2 * (lt.y - rt.y);
      const my = s2 * (rt.x - lt.x);
      const m00 = mx * x0 + my * y0;
      const m10 = mx * x1 + my * y0;
      const m01 = mx * x0 + my * y1;
      const m11 = mx * x1 + my * y1;
      if (Math.max(m00, m10, m01, m11) <= mx * lt.x + my * lt.y || Math.min(m00, m10, m01, m11) >= mx * rb.x + my * rb.y) {
        return false;
      }
      return true;
    }
    pad(paddingX = 0, paddingY = paddingX) {
      this.x -= paddingX;
      this.y -= paddingY;
      this.width += paddingX * 2;
      this.height += paddingY * 2;
      return this;
    }
    fit(rectangle) {
      const x1 = Math.max(this.x, rectangle.x);
      const x2 = Math.min(this.x + this.width, rectangle.x + rectangle.width);
      const y1 = Math.max(this.y, rectangle.y);
      const y2 = Math.min(this.y + this.height, rectangle.y + rectangle.height);
      this.x = x1;
      this.width = Math.max(x2 - x1, 0);
      this.y = y1;
      this.height = Math.max(y2 - y1, 0);
      return this;
    }
    ceil(resolution = 1, eps = 1e-3) {
      const x2 = Math.ceil((this.x + this.width - eps) * resolution) / resolution;
      const y2 = Math.ceil((this.y + this.height - eps) * resolution) / resolution;
      this.x = Math.floor((this.x + eps) * resolution) / resolution;
      this.y = Math.floor((this.y + eps) * resolution) / resolution;
      this.width = x2 - this.x;
      this.height = y2 - this.y;
      return this;
    }
    enlarge(rectangle) {
      const x1 = Math.min(this.x, rectangle.x);
      const x2 = Math.max(this.x + this.width, rectangle.x + rectangle.width);
      const y1 = Math.min(this.y, rectangle.y);
      const y2 = Math.max(this.y + this.height, rectangle.y + rectangle.height);
      this.x = x1;
      this.width = x2 - x1;
      this.y = y1;
      this.height = y2 - y1;
      return this;
    }
    toString() {
      return `[@pixi/math:Rectangle x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`;
    }
  };

  // node_modules/@pixi/math/lib/Matrix.mjs
  var Matrix = class {
    constructor(a2 = 1, b2 = 0, c2 = 0, d2 = 1, tx = 0, ty = 0) {
      this.array = null;
      this.a = a2;
      this.b = b2;
      this.c = c2;
      this.d = d2;
      this.tx = tx;
      this.ty = ty;
    }
    fromArray(array) {
      this.a = array[0];
      this.b = array[1];
      this.c = array[3];
      this.d = array[4];
      this.tx = array[2];
      this.ty = array[5];
    }
    set(a2, b2, c2, d2, tx, ty) {
      this.a = a2;
      this.b = b2;
      this.c = c2;
      this.d = d2;
      this.tx = tx;
      this.ty = ty;
      return this;
    }
    toArray(transpose, out) {
      if (!this.array) {
        this.array = new Float32Array(9);
      }
      const array = out || this.array;
      if (transpose) {
        array[0] = this.a;
        array[1] = this.b;
        array[2] = 0;
        array[3] = this.c;
        array[4] = this.d;
        array[5] = 0;
        array[6] = this.tx;
        array[7] = this.ty;
        array[8] = 1;
      } else {
        array[0] = this.a;
        array[1] = this.c;
        array[2] = this.tx;
        array[3] = this.b;
        array[4] = this.d;
        array[5] = this.ty;
        array[6] = 0;
        array[7] = 0;
        array[8] = 1;
      }
      return array;
    }
    apply(pos, newPos) {
      newPos = newPos || new Point();
      const x2 = pos.x;
      const y2 = pos.y;
      newPos.x = this.a * x2 + this.c * y2 + this.tx;
      newPos.y = this.b * x2 + this.d * y2 + this.ty;
      return newPos;
    }
    applyInverse(pos, newPos) {
      newPos = newPos || new Point();
      const id = 1 / (this.a * this.d + this.c * -this.b);
      const x2 = pos.x;
      const y2 = pos.y;
      newPos.x = this.d * id * x2 + -this.c * id * y2 + (this.ty * this.c - this.tx * this.d) * id;
      newPos.y = this.a * id * y2 + -this.b * id * x2 + (-this.ty * this.a + this.tx * this.b) * id;
      return newPos;
    }
    translate(x2, y2) {
      this.tx += x2;
      this.ty += y2;
      return this;
    }
    scale(x2, y2) {
      this.a *= x2;
      this.d *= y2;
      this.c *= x2;
      this.b *= y2;
      this.tx *= x2;
      this.ty *= y2;
      return this;
    }
    rotate(angle) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const a1 = this.a;
      const c1 = this.c;
      const tx1 = this.tx;
      this.a = a1 * cos - this.b * sin;
      this.b = a1 * sin + this.b * cos;
      this.c = c1 * cos - this.d * sin;
      this.d = c1 * sin + this.d * cos;
      this.tx = tx1 * cos - this.ty * sin;
      this.ty = tx1 * sin + this.ty * cos;
      return this;
    }
    append(matrix) {
      const a1 = this.a;
      const b1 = this.b;
      const c1 = this.c;
      const d1 = this.d;
      this.a = matrix.a * a1 + matrix.b * c1;
      this.b = matrix.a * b1 + matrix.b * d1;
      this.c = matrix.c * a1 + matrix.d * c1;
      this.d = matrix.c * b1 + matrix.d * d1;
      this.tx = matrix.tx * a1 + matrix.ty * c1 + this.tx;
      this.ty = matrix.tx * b1 + matrix.ty * d1 + this.ty;
      return this;
    }
    setTransform(x2, y2, pivotX, pivotY, scaleX, scaleY, rotation, skewX, skewY) {
      this.a = Math.cos(rotation + skewY) * scaleX;
      this.b = Math.sin(rotation + skewY) * scaleX;
      this.c = -Math.sin(rotation - skewX) * scaleY;
      this.d = Math.cos(rotation - skewX) * scaleY;
      this.tx = x2 - (pivotX * this.a + pivotY * this.c);
      this.ty = y2 - (pivotX * this.b + pivotY * this.d);
      return this;
    }
    prepend(matrix) {
      const tx1 = this.tx;
      if (matrix.a !== 1 || matrix.b !== 0 || matrix.c !== 0 || matrix.d !== 1) {
        const a1 = this.a;
        const c1 = this.c;
        this.a = a1 * matrix.a + this.b * matrix.c;
        this.b = a1 * matrix.b + this.b * matrix.d;
        this.c = c1 * matrix.a + this.d * matrix.c;
        this.d = c1 * matrix.b + this.d * matrix.d;
      }
      this.tx = tx1 * matrix.a + this.ty * matrix.c + matrix.tx;
      this.ty = tx1 * matrix.b + this.ty * matrix.d + matrix.ty;
      return this;
    }
    decompose(transform) {
      const a2 = this.a;
      const b2 = this.b;
      const c2 = this.c;
      const d2 = this.d;
      const pivot = transform.pivot;
      const skewX = -Math.atan2(-c2, d2);
      const skewY = Math.atan2(b2, a2);
      const delta = Math.abs(skewX + skewY);
      if (delta < 1e-5 || Math.abs(PI_2 - delta) < 1e-5) {
        transform.rotation = skewY;
        transform.skew.x = transform.skew.y = 0;
      } else {
        transform.rotation = 0;
        transform.skew.x = skewX;
        transform.skew.y = skewY;
      }
      transform.scale.x = Math.sqrt(a2 * a2 + b2 * b2);
      transform.scale.y = Math.sqrt(c2 * c2 + d2 * d2);
      transform.position.x = this.tx + (pivot.x * a2 + pivot.y * c2);
      transform.position.y = this.ty + (pivot.x * b2 + pivot.y * d2);
      return transform;
    }
    invert() {
      const a1 = this.a;
      const b1 = this.b;
      const c1 = this.c;
      const d1 = this.d;
      const tx1 = this.tx;
      const n2 = a1 * d1 - b1 * c1;
      this.a = d1 / n2;
      this.b = -b1 / n2;
      this.c = -c1 / n2;
      this.d = a1 / n2;
      this.tx = (c1 * this.ty - d1 * tx1) / n2;
      this.ty = -(a1 * this.ty - b1 * tx1) / n2;
      return this;
    }
    identity() {
      this.a = 1;
      this.b = 0;
      this.c = 0;
      this.d = 1;
      this.tx = 0;
      this.ty = 0;
      return this;
    }
    clone() {
      const matrix = new Matrix();
      matrix.a = this.a;
      matrix.b = this.b;
      matrix.c = this.c;
      matrix.d = this.d;
      matrix.tx = this.tx;
      matrix.ty = this.ty;
      return matrix;
    }
    copyTo(matrix) {
      matrix.a = this.a;
      matrix.b = this.b;
      matrix.c = this.c;
      matrix.d = this.d;
      matrix.tx = this.tx;
      matrix.ty = this.ty;
      return matrix;
    }
    copyFrom(matrix) {
      this.a = matrix.a;
      this.b = matrix.b;
      this.c = matrix.c;
      this.d = matrix.d;
      this.tx = matrix.tx;
      this.ty = matrix.ty;
      return this;
    }
    toString() {
      return `[@pixi/math:Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty}]`;
    }
    static get IDENTITY() {
      return new Matrix();
    }
    static get TEMP_MATRIX() {
      return new Matrix();
    }
  };

  // node_modules/@pixi/math/lib/groupD8.mjs
  var ux = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1];
  var uy = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1];
  var vx = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1];
  var vy = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1];
  var rotationCayley = [];
  var rotationMatrices = [];
  var signum = Math.sign;
  function init() {
    for (let i2 = 0; i2 < 16; i2++) {
      const row = [];
      rotationCayley.push(row);
      for (let j2 = 0; j2 < 16; j2++) {
        const _ux = signum(ux[i2] * ux[j2] + vx[i2] * uy[j2]);
        const _uy = signum(uy[i2] * ux[j2] + vy[i2] * uy[j2]);
        const _vx = signum(ux[i2] * vx[j2] + vx[i2] * vy[j2]);
        const _vy = signum(uy[i2] * vx[j2] + vy[i2] * vy[j2]);
        for (let k2 = 0; k2 < 16; k2++) {
          if (ux[k2] === _ux && uy[k2] === _uy && vx[k2] === _vx && vy[k2] === _vy) {
            row.push(k2);
            break;
          }
        }
      }
    }
    for (let i2 = 0; i2 < 16; i2++) {
      const mat = new Matrix();
      mat.set(ux[i2], uy[i2], vx[i2], vy[i2], 0, 0);
      rotationMatrices.push(mat);
    }
  }
  init();
  var groupD8 = {
    E: 0,
    SE: 1,
    S: 2,
    SW: 3,
    W: 4,
    NW: 5,
    N: 6,
    NE: 7,
    MIRROR_VERTICAL: 8,
    MAIN_DIAGONAL: 10,
    MIRROR_HORIZONTAL: 12,
    REVERSE_DIAGONAL: 14,
    uX: (ind) => ux[ind],
    uY: (ind) => uy[ind],
    vX: (ind) => vx[ind],
    vY: (ind) => vy[ind],
    inv: (rotation) => {
      if (rotation & 8) {
        return rotation & 15;
      }
      return -rotation & 7;
    },
    add: (rotationSecond, rotationFirst) => rotationCayley[rotationSecond][rotationFirst],
    sub: (rotationSecond, rotationFirst) => rotationCayley[rotationSecond][groupD8.inv(rotationFirst)],
    rotate180: (rotation) => rotation ^ 4,
    isVertical: (rotation) => (rotation & 3) === 2,
    byDirection: (dx, dy) => {
      if (Math.abs(dx) * 2 <= Math.abs(dy)) {
        if (dy >= 0) {
          return groupD8.S;
        }
        return groupD8.N;
      } else if (Math.abs(dy) * 2 <= Math.abs(dx)) {
        if (dx > 0) {
          return groupD8.E;
        }
        return groupD8.W;
      } else if (dy > 0) {
        if (dx > 0) {
          return groupD8.SE;
        }
        return groupD8.SW;
      } else if (dx > 0) {
        return groupD8.NE;
      }
      return groupD8.NW;
    },
    matrixAppendRotationInv: (matrix, rotation, tx = 0, ty = 0) => {
      const mat = rotationMatrices[groupD8.inv(rotation)];
      mat.tx = tx;
      mat.ty = ty;
      matrix.append(mat);
    }
  };

  // node_modules/@pixi/math/lib/ObservablePoint.mjs
  var ObservablePoint = class {
    constructor(cb, scope, x2 = 0, y2 = 0) {
      this._x = x2;
      this._y = y2;
      this.cb = cb;
      this.scope = scope;
    }
    clone(cb = this.cb, scope = this.scope) {
      return new ObservablePoint(cb, scope, this._x, this._y);
    }
    set(x2 = 0, y2 = x2) {
      if (this._x !== x2 || this._y !== y2) {
        this._x = x2;
        this._y = y2;
        this.cb.call(this.scope);
      }
      return this;
    }
    copyFrom(p2) {
      if (this._x !== p2.x || this._y !== p2.y) {
        this._x = p2.x;
        this._y = p2.y;
        this.cb.call(this.scope);
      }
      return this;
    }
    copyTo(p2) {
      p2.set(this._x, this._y);
      return p2;
    }
    equals(p2) {
      return p2.x === this._x && p2.y === this._y;
    }
    toString() {
      return `[@pixi/math:ObservablePoint x=${0} y=${0} scope=${this.scope}]`;
    }
    get x() {
      return this._x;
    }
    set x(value) {
      if (this._x !== value) {
        this._x = value;
        this.cb.call(this.scope);
      }
    }
    get y() {
      return this._y;
    }
    set y(value) {
      if (this._y !== value) {
        this._y = value;
        this.cb.call(this.scope);
      }
    }
  };

  // node_modules/@pixi/math/lib/Transform.mjs
  var _Transform = class {
    constructor() {
      this.worldTransform = new Matrix();
      this.localTransform = new Matrix();
      this.position = new ObservablePoint(this.onChange, this, 0, 0);
      this.scale = new ObservablePoint(this.onChange, this, 1, 1);
      this.pivot = new ObservablePoint(this.onChange, this, 0, 0);
      this.skew = new ObservablePoint(this.updateSkew, this, 0, 0);
      this._rotation = 0;
      this._cx = 1;
      this._sx = 0;
      this._cy = 0;
      this._sy = 1;
      this._localID = 0;
      this._currentLocalID = 0;
      this._worldID = 0;
      this._parentID = 0;
    }
    onChange() {
      this._localID++;
    }
    updateSkew() {
      this._cx = Math.cos(this._rotation + this.skew.y);
      this._sx = Math.sin(this._rotation + this.skew.y);
      this._cy = -Math.sin(this._rotation - this.skew.x);
      this._sy = Math.cos(this._rotation - this.skew.x);
      this._localID++;
    }
    toString() {
      return `[@pixi/math:Transform position=(${this.position.x}, ${this.position.y}) rotation=${this.rotation} scale=(${this.scale.x}, ${this.scale.y}) skew=(${this.skew.x}, ${this.skew.y}) ]`;
    }
    updateLocalTransform() {
      const lt = this.localTransform;
      if (this._localID !== this._currentLocalID) {
        lt.a = this._cx * this.scale.x;
        lt.b = this._sx * this.scale.x;
        lt.c = this._cy * this.scale.y;
        lt.d = this._sy * this.scale.y;
        lt.tx = this.position.x - (this.pivot.x * lt.a + this.pivot.y * lt.c);
        lt.ty = this.position.y - (this.pivot.x * lt.b + this.pivot.y * lt.d);
        this._currentLocalID = this._localID;
        this._parentID = -1;
      }
    }
    updateTransform(parentTransform) {
      const lt = this.localTransform;
      if (this._localID !== this._currentLocalID) {
        lt.a = this._cx * this.scale.x;
        lt.b = this._sx * this.scale.x;
        lt.c = this._cy * this.scale.y;
        lt.d = this._sy * this.scale.y;
        lt.tx = this.position.x - (this.pivot.x * lt.a + this.pivot.y * lt.c);
        lt.ty = this.position.y - (this.pivot.x * lt.b + this.pivot.y * lt.d);
        this._currentLocalID = this._localID;
        this._parentID = -1;
      }
      if (this._parentID !== parentTransform._worldID) {
        const pt = parentTransform.worldTransform;
        const wt = this.worldTransform;
        wt.a = lt.a * pt.a + lt.b * pt.c;
        wt.b = lt.a * pt.b + lt.b * pt.d;
        wt.c = lt.c * pt.a + lt.d * pt.c;
        wt.d = lt.c * pt.b + lt.d * pt.d;
        wt.tx = lt.tx * pt.a + lt.ty * pt.c + pt.tx;
        wt.ty = lt.tx * pt.b + lt.ty * pt.d + pt.ty;
        this._parentID = parentTransform._worldID;
        this._worldID++;
      }
    }
    setFromMatrix(matrix) {
      matrix.decompose(this);
      this._localID++;
    }
    get rotation() {
      return this._rotation;
    }
    set rotation(value) {
      if (this._rotation !== value) {
        this._rotation = value;
        this.updateSkew();
      }
    }
  };
  var Transform = _Transform;
  Transform.IDENTITY = new _Transform();

  // node_modules/@pixi/core/lib/shader/defaultProgram.mjs
  var defaultFragment = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor *= texture2D(uSampler, vTextureCoord);\n}";

  // node_modules/@pixi/core/lib/shader/defaultProgram2.mjs
  var defaultVertex = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n}\n";

  // node_modules/@pixi/core/lib/shader/utils/compileShader.mjs
  function compileShader(gl, type, src) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    return shader;
  }

  // node_modules/@pixi/core/lib/shader/utils/defaultValue.mjs
  function booleanArray(size) {
    const array = new Array(size);
    for (let i2 = 0; i2 < array.length; i2++) {
      array[i2] = false;
    }
    return array;
  }
  function defaultValue(type, size) {
    switch (type) {
      case "float":
        return 0;
      case "vec2":
        return new Float32Array(2 * size);
      case "vec3":
        return new Float32Array(3 * size);
      case "vec4":
        return new Float32Array(4 * size);
      case "int":
      case "uint":
      case "sampler2D":
      case "sampler2DArray":
        return 0;
      case "ivec2":
        return new Int32Array(2 * size);
      case "ivec3":
        return new Int32Array(3 * size);
      case "ivec4":
        return new Int32Array(4 * size);
      case "uvec2":
        return new Uint32Array(2 * size);
      case "uvec3":
        return new Uint32Array(3 * size);
      case "uvec4":
        return new Uint32Array(4 * size);
      case "bool":
        return false;
      case "bvec2":
        return booleanArray(2 * size);
      case "bvec3":
        return booleanArray(3 * size);
      case "bvec4":
        return booleanArray(4 * size);
      case "mat2":
        return new Float32Array([
          1,
          0,
          0,
          1
        ]);
      case "mat3":
        return new Float32Array([
          1,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          1
        ]);
      case "mat4":
        return new Float32Array([
          1,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          1
        ]);
    }
    return null;
  }

  // node_modules/@pixi/core/lib/shader/utils/uniformParsers.mjs
  var uniformParsers = [
    {
      test: (data) => data.type === "float" && data.size === 1 && !data.isArray,
      code: (name) => `
            if(uv["${name}"] !== ud["${name}"].value)
            {
                ud["${name}"].value = uv["${name}"]
                gl.uniform1f(ud["${name}"].location, uv["${name}"])
            }
            `
    },
    {
      test: (data, uniform) => (data.type === "sampler2D" || data.type === "samplerCube" || data.type === "sampler2DArray") && data.size === 1 && !data.isArray && (uniform == null || uniform.castToBaseTexture !== void 0),
      code: (name) => `t = syncData.textureCount++;

            renderer.texture.bind(uv["${name}"], t);

            if(ud["${name}"].value !== t)
            {
                ud["${name}"].value = t;
                gl.uniform1i(ud["${name}"].location, t);
; // eslint-disable-line max-len
            }`
    },
    {
      test: (data, uniform) => data.type === "mat3" && data.size === 1 && !data.isArray && uniform.a !== void 0,
      code: (name) => `
            gl.uniformMatrix3fv(ud["${name}"].location, false, uv["${name}"].toArray(true));
            `,
      codeUbo: (name) => `
                var ${name}_matrix = uv.${name}.toArray(true);

                data[offset] = ${name}_matrix[0];
                data[offset+1] = ${name}_matrix[1];
                data[offset+2] = ${name}_matrix[2];
        
                data[offset + 4] = ${name}_matrix[3];
                data[offset + 5] = ${name}_matrix[4];
                data[offset + 6] = ${name}_matrix[5];
        
                data[offset + 8] = ${name}_matrix[6];
                data[offset + 9] = ${name}_matrix[7];
                data[offset + 10] = ${name}_matrix[8];
            `
    },
    {
      test: (data, uniform) => data.type === "vec2" && data.size === 1 && !data.isArray && uniform.x !== void 0,
      code: (name) => `
                cv = ud["${name}"].value;
                v = uv["${name}"];

                if(cv[0] !== v.x || cv[1] !== v.y)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    gl.uniform2f(ud["${name}"].location, v.x, v.y);
                }`,
      codeUbo: (name) => `
                v = uv.${name};

                data[offset] = v.x;
                data[offset+1] = v.y;
            `
    },
    {
      test: (data) => data.type === "vec2" && data.size === 1 && !data.isArray,
      code: (name) => `
                cv = ud["${name}"].value;
                v = uv["${name}"];

                if(cv[0] !== v[0] || cv[1] !== v[1])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    gl.uniform2f(ud["${name}"].location, v[0], v[1]);
                }
            `
    },
    {
      test: (data, uniform) => data.type === "vec4" && data.size === 1 && !data.isArray && uniform.width !== void 0,
      code: (name) => `
                cv = ud["${name}"].value;
                v = uv["${name}"];

                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    cv[2] = v.width;
                    cv[3] = v.height;
                    gl.uniform4f(ud["${name}"].location, v.x, v.y, v.width, v.height)
                }`,
      codeUbo: (name) => `
                    v = uv.${name};

                    data[offset] = v.x;
                    data[offset+1] = v.y;
                    data[offset+2] = v.width;
                    data[offset+3] = v.height;
                `
    },
    {
      test: (data, uniform) => data.type === "vec4" && data.size === 1 && !data.isArray && uniform.red !== void 0,
      code: (name) => `
                cv = ud["${name}"].value;
                v = uv["${name}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.alpha)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
                    cv[3] = v.alpha;
                    gl.uniform4f(ud["${name}"].location, v.red, v.green, v.blue, v.alpha)
                }`,
      codeUbo: (name) => `
                    v = uv.${name};

                    data[offset] = v.red;
                    data[offset+1] = v.green;
                    data[offset+2] = v.blue;
                    data[offset+3] = v.alpha;
                `
    },
    {
      test: (data, uniform) => data.type === "vec3" && data.size === 1 && !data.isArray && uniform.red !== void 0,
      code: (name) => `
                cv = ud["${name}"].value;
                v = uv["${name}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.a)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
    
                    gl.uniform3f(ud["${name}"].location, v.red, v.green, v.blue)
                }`,
      codeUbo: (name) => `
                    v = uv.${name};

                    data[offset] = v.red;
                    data[offset+1] = v.green;
                    data[offset+2] = v.blue;
                `
    },
    {
      test: (data) => data.type === "vec4" && data.size === 1 && !data.isArray,
      code: (name) => `
                cv = ud["${name}"].value;
                v = uv["${name}"];

                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    cv[2] = v[2];
                    cv[3] = v[3];

                    gl.uniform4f(ud["${name}"].location, v[0], v[1], v[2], v[3])
                }`
    }
  ];

  // node_modules/@pixi/core/lib/shader/utils/generateUniformsSync.mjs
  var GLSL_TO_SINGLE_SETTERS_CACHED = {
    float: `
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1f(location, v);
    }`,
    vec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2f(location, v[0], v[1])
    }`,
    vec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3f(location, v[0], v[1], v[2])
    }`,
    vec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4f(location, v[0], v[1], v[2], v[3]);
    }`,
    int: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
    ivec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,
    ivec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,
    ivec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,
    uint: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1ui(location, v);
    }`,
    uvec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2ui(location, v[0], v[1]);
    }`,
    uvec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3ui(location, v[0], v[1], v[2]);
    }`,
    uvec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4ui(location, v[0], v[1], v[2], v[3]);
    }`,
    bool: `
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1i(location, v);
    }`,
    bvec2: `
    if (cv[0] != v[0] || cv[1] != v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,
    bvec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,
    bvec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,
    mat2: "gl.uniformMatrix2fv(location, false, v)",
    mat3: "gl.uniformMatrix3fv(location, false, v)",
    mat4: "gl.uniformMatrix4fv(location, false, v)",
    sampler2D: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
    samplerCube: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
    sampler2DArray: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`
  };
  var GLSL_TO_ARRAY_SETTERS = {
    float: `gl.uniform1fv(location, v)`,
    vec2: `gl.uniform2fv(location, v)`,
    vec3: `gl.uniform3fv(location, v)`,
    vec4: "gl.uniform4fv(location, v)",
    mat4: "gl.uniformMatrix4fv(location, false, v)",
    mat3: "gl.uniformMatrix3fv(location, false, v)",
    mat2: "gl.uniformMatrix2fv(location, false, v)",
    int: "gl.uniform1iv(location, v)",
    ivec2: "gl.uniform2iv(location, v)",
    ivec3: "gl.uniform3iv(location, v)",
    ivec4: "gl.uniform4iv(location, v)",
    uint: "gl.uniform1uiv(location, v)",
    uvec2: "gl.uniform2uiv(location, v)",
    uvec3: "gl.uniform3uiv(location, v)",
    uvec4: "gl.uniform4uiv(location, v)",
    bool: "gl.uniform1iv(location, v)",
    bvec2: "gl.uniform2iv(location, v)",
    bvec3: "gl.uniform3iv(location, v)",
    bvec4: "gl.uniform4iv(location, v)",
    sampler2D: "gl.uniform1iv(location, v)",
    samplerCube: "gl.uniform1iv(location, v)",
    sampler2DArray: "gl.uniform1iv(location, v)"
  };
  function generateUniformsSync(group, uniformData) {
    const funcFragments = [`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
    `];
    for (const i2 in group.uniforms) {
      const data = uniformData[i2];
      if (!data) {
        if (group.uniforms[i2]?.group) {
          if (group.uniforms[i2].ubo) {
            funcFragments.push(`
                        renderer.shader.syncUniformBufferGroup(uv.${i2}, '${i2}');
                    `);
          } else {
            funcFragments.push(`
                        renderer.shader.syncUniformGroup(uv.${i2}, syncData);
                    `);
          }
        }
        continue;
      }
      const uniform = group.uniforms[i2];
      let parsed = false;
      for (let j2 = 0; j2 < uniformParsers.length; j2++) {
        if (uniformParsers[j2].test(data, uniform)) {
          funcFragments.push(uniformParsers[j2].code(i2, uniform));
          parsed = true;
          break;
        }
      }
      if (!parsed) {
        const templateType = data.size === 1 && !data.isArray ? GLSL_TO_SINGLE_SETTERS_CACHED : GLSL_TO_ARRAY_SETTERS;
        const template = templateType[data.type].replace("location", `ud["${i2}"].location`);
        funcFragments.push(`
            cu = ud["${i2}"];
            cv = cu.value;
            v = uv["${i2}"];
            ${template};`);
      }
    }
    return new Function("ud", "uv", "renderer", "syncData", funcFragments.join("\n"));
  }

  // node_modules/@pixi/core/lib/shader/utils/getTestContext.mjs
  var unknownContext = {};
  var context = unknownContext;
  function getTestContext() {
    if (context === unknownContext || context?.isContextLost()) {
      const canvas = settings.ADAPTER.createCanvas();
      let gl;
      if (settings.PREFER_ENV >= ENV.WEBGL2) {
        gl = canvas.getContext("webgl2", {});
      }
      if (!gl) {
        gl = canvas.getContext("webgl", {}) || canvas.getContext("experimental-webgl", {});
        if (!gl) {
          gl = null;
        } else {
          gl.getExtension("WEBGL_draw_buffers");
        }
      }
      context = gl;
    }
    return context;
  }

  // node_modules/@pixi/core/lib/shader/utils/getMaxFragmentPrecision.mjs
  var maxFragmentPrecision;
  function getMaxFragmentPrecision() {
    if (!maxFragmentPrecision) {
      maxFragmentPrecision = PRECISION.MEDIUM;
      const gl = getTestContext();
      if (gl) {
        if (gl.getShaderPrecisionFormat) {
          const shaderFragment = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
          maxFragmentPrecision = shaderFragment.precision ? PRECISION.HIGH : PRECISION.MEDIUM;
        }
      }
    }
    return maxFragmentPrecision;
  }

  // node_modules/@pixi/core/lib/shader/utils/logProgramError.mjs
  function logPrettyShaderError(gl, shader) {
    const shaderSrc = gl.getShaderSource(shader).split("\n").map((line, index) => `${index}: ${line}`);
    const shaderLog = gl.getShaderInfoLog(shader);
    const splitShader = shaderLog.split("\n");
    const dedupe = {};
    const lineNumbers = splitShader.map((line) => parseFloat(line.replace(/^ERROR\: 0\:([\d]+)\:.*$/, "$1"))).filter((n2) => {
      if (n2 && !dedupe[n2]) {
        dedupe[n2] = true;
        return true;
      }
      return false;
    });
    const logArgs = [""];
    lineNumbers.forEach((number) => {
      shaderSrc[number - 1] = `%c${shaderSrc[number - 1]}%c`;
      logArgs.push("background: #FF0000; color:#FFFFFF; font-size: 10px", "font-size: 10px");
    });
    const fragmentSourceToLog = shaderSrc.join("\n");
    logArgs[0] = fragmentSourceToLog;
    console.error(shaderLog);
    console.groupCollapsed("click to view full shader code");
    console.warn(...logArgs);
    console.groupEnd();
  }
  function logProgramError(gl, program, vertexShader, fragmentShader) {
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        logPrettyShaderError(gl, vertexShader);
      }
      if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        logPrettyShaderError(gl, fragmentShader);
      }
      console.error("PixiJS Error: Could not initialize shader.");
      if (gl.getProgramInfoLog(program) !== "") {
        console.warn("PixiJS Warning: gl.getProgramInfoLog()", gl.getProgramInfoLog(program));
      }
    }
  }

  // node_modules/@pixi/core/lib/shader/utils/mapSize.mjs
  var GLSL_TO_SIZE = {
    float: 1,
    vec2: 2,
    vec3: 3,
    vec4: 4,
    int: 1,
    ivec2: 2,
    ivec3: 3,
    ivec4: 4,
    uint: 1,
    uvec2: 2,
    uvec3: 3,
    uvec4: 4,
    bool: 1,
    bvec2: 2,
    bvec3: 3,
    bvec4: 4,
    mat2: 4,
    mat3: 9,
    mat4: 16,
    sampler2D: 1
  };
  function mapSize(type) {
    return GLSL_TO_SIZE[type];
  }

  // node_modules/@pixi/core/lib/shader/utils/mapType.mjs
  var GL_TABLE = null;
  var GL_TO_GLSL_TYPES = {
    FLOAT: "float",
    FLOAT_VEC2: "vec2",
    FLOAT_VEC3: "vec3",
    FLOAT_VEC4: "vec4",
    INT: "int",
    INT_VEC2: "ivec2",
    INT_VEC3: "ivec3",
    INT_VEC4: "ivec4",
    UNSIGNED_INT: "uint",
    UNSIGNED_INT_VEC2: "uvec2",
    UNSIGNED_INT_VEC3: "uvec3",
    UNSIGNED_INT_VEC4: "uvec4",
    BOOL: "bool",
    BOOL_VEC2: "bvec2",
    BOOL_VEC3: "bvec3",
    BOOL_VEC4: "bvec4",
    FLOAT_MAT2: "mat2",
    FLOAT_MAT3: "mat3",
    FLOAT_MAT4: "mat4",
    SAMPLER_2D: "sampler2D",
    INT_SAMPLER_2D: "sampler2D",
    UNSIGNED_INT_SAMPLER_2D: "sampler2D",
    SAMPLER_CUBE: "samplerCube",
    INT_SAMPLER_CUBE: "samplerCube",
    UNSIGNED_INT_SAMPLER_CUBE: "samplerCube",
    SAMPLER_2D_ARRAY: "sampler2DArray",
    INT_SAMPLER_2D_ARRAY: "sampler2DArray",
    UNSIGNED_INT_SAMPLER_2D_ARRAY: "sampler2DArray"
  };
  function mapType(gl, type) {
    if (!GL_TABLE) {
      const typeNames = Object.keys(GL_TO_GLSL_TYPES);
      GL_TABLE = {};
      for (let i2 = 0; i2 < typeNames.length; ++i2) {
        const tn = typeNames[i2];
        GL_TABLE[gl[tn]] = GL_TO_GLSL_TYPES[tn];
      }
    }
    return GL_TABLE[type];
  }

  // node_modules/@pixi/core/lib/shader/utils/setPrecision.mjs
  function setPrecision(src, requestedPrecision, maxSupportedPrecision) {
    if (src.substring(0, 9) !== "precision") {
      let precision = requestedPrecision;
      if (requestedPrecision === PRECISION.HIGH && maxSupportedPrecision !== PRECISION.HIGH) {
        precision = PRECISION.MEDIUM;
      }
      return `precision ${precision} float;
${src}`;
    } else if (maxSupportedPrecision !== PRECISION.HIGH && src.substring(0, 15) === "precision highp") {
      return src.replace("precision highp", "precision mediump");
    }
    return src;
  }

  // node_modules/@pixi/core/lib/shader/utils/unsafeEvalSupported.mjs
  var unsafeEval;
  function unsafeEvalSupported() {
    if (typeof unsafeEval === "boolean") {
      return unsafeEval;
    }
    try {
      const func = new Function("param1", "param2", "param3", "return param1[param2] === param3;");
      unsafeEval = func({ a: "b" }, "a", "b") === true;
    } catch (e2) {
      unsafeEval = false;
    }
    return unsafeEval;
  }

  // node_modules/@pixi/core/lib/shader/Program.mjs
  var UID3 = 0;
  var nameCache = {};
  var _Program = class {
    constructor(vertexSrc, fragmentSrc, name = "pixi-shader", extra = {}) {
      this.extra = {};
      this.id = UID3++;
      this.vertexSrc = vertexSrc || _Program.defaultVertexSrc;
      this.fragmentSrc = fragmentSrc || _Program.defaultFragmentSrc;
      this.vertexSrc = this.vertexSrc.trim();
      this.fragmentSrc = this.fragmentSrc.trim();
      this.extra = extra;
      if (this.vertexSrc.substring(0, 8) !== "#version") {
        name = name.replace(/\s+/g, "-");
        if (nameCache[name]) {
          nameCache[name]++;
          name += `-${nameCache[name]}`;
        } else {
          nameCache[name] = 1;
        }
        this.vertexSrc = `#define SHADER_NAME ${name}
${this.vertexSrc}`;
        this.fragmentSrc = `#define SHADER_NAME ${name}
${this.fragmentSrc}`;
        this.vertexSrc = setPrecision(this.vertexSrc, _Program.defaultVertexPrecision, PRECISION.HIGH);
        this.fragmentSrc = setPrecision(this.fragmentSrc, _Program.defaultFragmentPrecision, getMaxFragmentPrecision());
      }
      this.glPrograms = {};
      this.syncUniforms = null;
    }
    static get defaultVertexSrc() {
      return defaultVertex;
    }
    static get defaultFragmentSrc() {
      return defaultFragment;
    }
    static from(vertexSrc, fragmentSrc, name) {
      const key = vertexSrc + fragmentSrc;
      let program = ProgramCache[key];
      if (!program) {
        ProgramCache[key] = program = new _Program(vertexSrc, fragmentSrc, name);
      }
      return program;
    }
  };
  var Program = _Program;
  Program.defaultVertexPrecision = PRECISION.HIGH;
  Program.defaultFragmentPrecision = isMobile2.apple.device ? PRECISION.HIGH : PRECISION.MEDIUM;

  // node_modules/@pixi/core/lib/shader/UniformGroup.mjs
  var UID4 = 0;
  var UniformGroup = class {
    constructor(uniforms, isStatic, isUbo) {
      this.group = true;
      this.syncUniforms = {};
      this.dirtyId = 0;
      this.id = UID4++;
      this.static = !!isStatic;
      this.ubo = !!isUbo;
      if (uniforms instanceof Buffer2) {
        this.buffer = uniforms;
        this.buffer.type = BUFFER_TYPE.UNIFORM_BUFFER;
        this.autoManage = false;
        this.ubo = true;
      } else {
        this.uniforms = uniforms;
        if (this.ubo) {
          this.buffer = new Buffer2(new Float32Array(1));
          this.buffer.type = BUFFER_TYPE.UNIFORM_BUFFER;
          this.autoManage = true;
        }
      }
    }
    update() {
      this.dirtyId++;
      if (!this.autoManage && this.buffer) {
        this.buffer.update();
      }
    }
    add(name, uniforms, _static) {
      if (!this.ubo) {
        this.uniforms[name] = new UniformGroup(uniforms, _static);
      } else {
        throw new Error("[UniformGroup] uniform groups in ubo mode cannot be modified, or have uniform groups nested in them");
      }
    }
    static from(uniforms, _static, _ubo) {
      return new UniformGroup(uniforms, _static, _ubo);
    }
    static uboFrom(uniforms, _static) {
      return new UniformGroup(uniforms, _static ?? true, true);
    }
  };

  // node_modules/@pixi/core/lib/shader/Shader.mjs
  var Shader = class {
    constructor(program, uniforms) {
      this.uniformBindCount = 0;
      this.program = program;
      if (uniforms) {
        if (uniforms instanceof UniformGroup) {
          this.uniformGroup = uniforms;
        } else {
          this.uniformGroup = new UniformGroup(uniforms);
        }
      } else {
        this.uniformGroup = new UniformGroup({});
      }
      this.disposeRunner = new Runner("disposeShader");
    }
    checkUniformExists(name, group) {
      if (group.uniforms[name]) {
        return true;
      }
      for (const i2 in group.uniforms) {
        const uniform = group.uniforms[i2];
        if (uniform.group) {
          if (this.checkUniformExists(name, uniform)) {
            return true;
          }
        }
      }
      return false;
    }
    destroy() {
      this.uniformGroup = null;
      this.disposeRunner.emit(this);
      this.disposeRunner.destroy();
    }
    get uniforms() {
      return this.uniformGroup.uniforms;
    }
    static from(vertexSrc, fragmentSrc, uniforms) {
      const program = Program.from(vertexSrc, fragmentSrc);
      return new Shader(program, uniforms);
    }
  };

  // node_modules/@pixi/core/lib/batch/BatchShaderGenerator.mjs
  var BatchShaderGenerator = class {
    constructor(vertexSrc, fragTemplate2) {
      this.vertexSrc = vertexSrc;
      this.fragTemplate = fragTemplate2;
      this.programCache = {};
      this.defaultGroupCache = {};
      if (!fragTemplate2.includes("%count%")) {
        throw new Error('Fragment template must contain "%count%".');
      }
      if (!fragTemplate2.includes("%forloop%")) {
        throw new Error('Fragment template must contain "%forloop%".');
      }
    }
    generateShader(maxTextures) {
      if (!this.programCache[maxTextures]) {
        const sampleValues = new Int32Array(maxTextures);
        for (let i2 = 0; i2 < maxTextures; i2++) {
          sampleValues[i2] = i2;
        }
        this.defaultGroupCache[maxTextures] = UniformGroup.from({ uSamplers: sampleValues }, true);
        let fragmentSrc = this.fragTemplate;
        fragmentSrc = fragmentSrc.replace(/%count%/gi, `${maxTextures}`);
        fragmentSrc = fragmentSrc.replace(/%forloop%/gi, this.generateSampleSrc(maxTextures));
        this.programCache[maxTextures] = new Program(this.vertexSrc, fragmentSrc);
      }
      const uniforms = {
        tint: new Float32Array([1, 1, 1, 1]),
        translationMatrix: new Matrix(),
        default: this.defaultGroupCache[maxTextures]
      };
      return new Shader(this.programCache[maxTextures], uniforms);
    }
    generateSampleSrc(maxTextures) {
      let src = "";
      src += "\n";
      src += "\n";
      for (let i2 = 0; i2 < maxTextures; i2++) {
        if (i2 > 0) {
          src += "\nelse ";
        }
        if (i2 < maxTextures - 1) {
          src += `if(vTextureId < ${i2}.5)`;
        }
        src += "\n{";
        src += `
	color = texture2D(uSamplers[${i2}], vTextureCoord);`;
        src += "\n}";
      }
      src += "\n";
      src += "\n";
      return src;
    }
  };

  // node_modules/@pixi/core/lib/batch/BatchTextureArray.mjs
  var BatchTextureArray = class {
    constructor() {
      this.elements = [];
      this.ids = [];
      this.count = 0;
    }
    clear() {
      for (let i2 = 0; i2 < this.count; i2++) {
        this.elements[i2] = null;
      }
      this.count = 0;
    }
  };

  // node_modules/@pixi/core/lib/batch/canUploadSameBuffer.mjs
  function canUploadSameBuffer() {
    return !isMobile2.apple.device;
  }

  // node_modules/@pixi/core/lib/batch/maxRecommendedTextures.mjs
  function maxRecommendedTextures(max) {
    let allowMax = true;
    const navigator2 = settings.ADAPTER.getNavigator();
    if (isMobile2.tablet || isMobile2.phone) {
      if (isMobile2.apple.device) {
        const match = navigator2.userAgent.match(/OS (\d+)_(\d+)?/);
        if (match) {
          const majorVersion = parseInt(match[1], 10);
          if (majorVersion < 11) {
            allowMax = false;
          }
        }
      }
      if (isMobile2.android.device) {
        const match = navigator2.userAgent.match(/Android\s([0-9.]*)/);
        if (match) {
          const majorVersion = parseInt(match[1], 10);
          if (majorVersion < 7) {
            allowMax = false;
          }
        }
      }
    }
    return allowMax ? max : 4;
  }

  // node_modules/@pixi/core/lib/batch/ObjectRenderer.mjs
  var ObjectRenderer = class {
    constructor(renderer) {
      this.renderer = renderer;
    }
    flush() {
    }
    destroy() {
      this.renderer = null;
    }
    start() {
    }
    stop() {
      this.flush();
    }
    render(_object) {
    }
  };

  // node_modules/@pixi/core/lib/batch/texture.mjs
  var defaultFragment2 = "varying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\nuniform sampler2D uSamplers[%count%];\n\nvoid main(void){\n    vec4 color;\n    %forloop%\n    gl_FragColor = color * vColor;\n}\n";

  // node_modules/@pixi/core/lib/batch/texture2.mjs
  var defaultVertex2 = "precision highp float;\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform vec4 tint;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vTextureId = aTextureId;\n    vColor = aColor * tint;\n}\n";

  // node_modules/@pixi/core/lib/batch/BatchRenderer.mjs
  var _BatchRenderer = class extends ObjectRenderer {
    constructor(renderer) {
      super(renderer);
      this.setShaderGenerator();
      this.geometryClass = BatchGeometry;
      this.vertexSize = 6;
      this.state = State.for2d();
      this.size = _BatchRenderer.defaultBatchSize * 4;
      this._vertexCount = 0;
      this._indexCount = 0;
      this._bufferedElements = [];
      this._bufferedTextures = [];
      this._bufferSize = 0;
      this._shader = null;
      this._packedGeometries = [];
      this._packedGeometryPoolSize = 2;
      this._flushId = 0;
      this._aBuffers = {};
      this._iBuffers = {};
      this.maxTextures = 1;
      this.renderer.on("prerender", this.onPrerender, this);
      renderer.runners.contextChange.add(this);
      this._dcIndex = 0;
      this._aIndex = 0;
      this._iIndex = 0;
      this._attributeBuffer = null;
      this._indexBuffer = null;
      this._tempBoundTextures = [];
    }
    static get defaultMaxTextures() {
      this._defaultMaxTextures = this._defaultMaxTextures ?? maxRecommendedTextures(32);
      return this._defaultMaxTextures;
    }
    static set defaultMaxTextures(value) {
      this._defaultMaxTextures = value;
    }
    static get canUploadSameBuffer() {
      this._canUploadSameBuffer = this._canUploadSameBuffer ?? canUploadSameBuffer();
      return this._canUploadSameBuffer;
    }
    static set canUploadSameBuffer(value) {
      this._canUploadSameBuffer = value;
    }
    get MAX_TEXTURES() {
      deprecation("7.1.0", "BatchRenderer#MAX_TEXTURES renamed to BatchRenderer#maxTextures");
      return this.maxTextures;
    }
    static get defaultVertexSrc() {
      return defaultVertex2;
    }
    static get defaultFragmentTemplate() {
      return defaultFragment2;
    }
    setShaderGenerator({
      vertex: vertex2 = _BatchRenderer.defaultVertexSrc,
      fragment: fragment2 = _BatchRenderer.defaultFragmentTemplate
    } = {}) {
      this.shaderGenerator = new BatchShaderGenerator(vertex2, fragment2);
    }
    contextChange() {
      const gl = this.renderer.gl;
      if (settings.PREFER_ENV === ENV.WEBGL_LEGACY) {
        this.maxTextures = 1;
      } else {
        this.maxTextures = Math.min(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS), _BatchRenderer.defaultMaxTextures);
        this.maxTextures = checkMaxIfStatementsInShader(this.maxTextures, gl);
      }
      this._shader = this.shaderGenerator.generateShader(this.maxTextures);
      for (let i2 = 0; i2 < this._packedGeometryPoolSize; i2++) {
        this._packedGeometries[i2] = new this.geometryClass();
      }
      this.initFlushBuffers();
    }
    initFlushBuffers() {
      const {
        _drawCallPool,
        _textureArrayPool
      } = _BatchRenderer;
      const MAX_SPRITES = this.size / 4;
      const MAX_TA = Math.floor(MAX_SPRITES / this.maxTextures) + 1;
      while (_drawCallPool.length < MAX_SPRITES) {
        _drawCallPool.push(new BatchDrawCall());
      }
      while (_textureArrayPool.length < MAX_TA) {
        _textureArrayPool.push(new BatchTextureArray());
      }
      for (let i2 = 0; i2 < this.maxTextures; i2++) {
        this._tempBoundTextures[i2] = null;
      }
    }
    onPrerender() {
      this._flushId = 0;
    }
    render(element) {
      if (!element._texture.valid) {
        return;
      }
      if (this._vertexCount + element.vertexData.length / 2 > this.size) {
        this.flush();
      }
      this._vertexCount += element.vertexData.length / 2;
      this._indexCount += element.indices.length;
      this._bufferedTextures[this._bufferSize] = element._texture.baseTexture;
      this._bufferedElements[this._bufferSize++] = element;
    }
    buildTexturesAndDrawCalls() {
      const {
        _bufferedTextures: textures,
        maxTextures
      } = this;
      const textureArrays = _BatchRenderer._textureArrayPool;
      const batch = this.renderer.batch;
      const boundTextures = this._tempBoundTextures;
      const touch = this.renderer.textureGC.count;
      let TICK = ++BaseTexture._globalBatch;
      let countTexArrays = 0;
      let texArray = textureArrays[0];
      let start = 0;
      batch.copyBoundTextures(boundTextures, maxTextures);
      for (let i2 = 0; i2 < this._bufferSize; ++i2) {
        const tex = textures[i2];
        textures[i2] = null;
        if (tex._batchEnabled === TICK) {
          continue;
        }
        if (texArray.count >= maxTextures) {
          batch.boundArray(texArray, boundTextures, TICK, maxTextures);
          this.buildDrawCalls(texArray, start, i2);
          start = i2;
          texArray = textureArrays[++countTexArrays];
          ++TICK;
        }
        tex._batchEnabled = TICK;
        tex.touched = touch;
        texArray.elements[texArray.count++] = tex;
      }
      if (texArray.count > 0) {
        batch.boundArray(texArray, boundTextures, TICK, maxTextures);
        this.buildDrawCalls(texArray, start, this._bufferSize);
        ++countTexArrays;
        ++TICK;
      }
      for (let i2 = 0; i2 < boundTextures.length; i2++) {
        boundTextures[i2] = null;
      }
      BaseTexture._globalBatch = TICK;
    }
    buildDrawCalls(texArray, start, finish) {
      const {
        _bufferedElements: elements,
        _attributeBuffer,
        _indexBuffer,
        vertexSize
      } = this;
      const drawCalls = _BatchRenderer._drawCallPool;
      let dcIndex = this._dcIndex;
      let aIndex = this._aIndex;
      let iIndex = this._iIndex;
      let drawCall = drawCalls[dcIndex];
      drawCall.start = this._iIndex;
      drawCall.texArray = texArray;
      for (let i2 = start; i2 < finish; ++i2) {
        const sprite = elements[i2];
        const tex = sprite._texture.baseTexture;
        const spriteBlendMode = premultiplyBlendMode[tex.alphaMode ? 1 : 0][sprite.blendMode];
        elements[i2] = null;
        if (start < i2 && drawCall.blend !== spriteBlendMode) {
          drawCall.size = iIndex - drawCall.start;
          start = i2;
          drawCall = drawCalls[++dcIndex];
          drawCall.texArray = texArray;
          drawCall.start = iIndex;
        }
        this.packInterleavedGeometry(sprite, _attributeBuffer, _indexBuffer, aIndex, iIndex);
        aIndex += sprite.vertexData.length / 2 * vertexSize;
        iIndex += sprite.indices.length;
        drawCall.blend = spriteBlendMode;
      }
      if (start < finish) {
        drawCall.size = iIndex - drawCall.start;
        ++dcIndex;
      }
      this._dcIndex = dcIndex;
      this._aIndex = aIndex;
      this._iIndex = iIndex;
    }
    bindAndClearTexArray(texArray) {
      const textureSystem = this.renderer.texture;
      for (let j2 = 0; j2 < texArray.count; j2++) {
        textureSystem.bind(texArray.elements[j2], texArray.ids[j2]);
        texArray.elements[j2] = null;
      }
      texArray.count = 0;
    }
    updateGeometry() {
      const {
        _packedGeometries: packedGeometries,
        _attributeBuffer: attributeBuffer,
        _indexBuffer: indexBuffer
      } = this;
      if (!_BatchRenderer.canUploadSameBuffer) {
        if (this._packedGeometryPoolSize <= this._flushId) {
          this._packedGeometryPoolSize++;
          packedGeometries[this._flushId] = new this.geometryClass();
        }
        packedGeometries[this._flushId]._buffer.update(attributeBuffer.rawBinaryData);
        packedGeometries[this._flushId]._indexBuffer.update(indexBuffer);
        this.renderer.geometry.bind(packedGeometries[this._flushId]);
        this.renderer.geometry.updateBuffers();
        this._flushId++;
      } else {
        packedGeometries[this._flushId]._buffer.update(attributeBuffer.rawBinaryData);
        packedGeometries[this._flushId]._indexBuffer.update(indexBuffer);
        this.renderer.geometry.updateBuffers();
      }
    }
    drawBatches() {
      const dcCount = this._dcIndex;
      const { gl, state: stateSystem } = this.renderer;
      const drawCalls = _BatchRenderer._drawCallPool;
      let curTexArray = null;
      for (let i2 = 0; i2 < dcCount; i2++) {
        const { texArray, type, size, start, blend } = drawCalls[i2];
        if (curTexArray !== texArray) {
          curTexArray = texArray;
          this.bindAndClearTexArray(texArray);
        }
        this.state.blendMode = blend;
        stateSystem.set(this.state);
        gl.drawElements(type, size, gl.UNSIGNED_SHORT, start * 2);
      }
    }
    flush() {
      if (this._vertexCount === 0) {
        return;
      }
      this._attributeBuffer = this.getAttributeBuffer(this._vertexCount);
      this._indexBuffer = this.getIndexBuffer(this._indexCount);
      this._aIndex = 0;
      this._iIndex = 0;
      this._dcIndex = 0;
      this.buildTexturesAndDrawCalls();
      this.updateGeometry();
      this.drawBatches();
      this._bufferSize = 0;
      this._vertexCount = 0;
      this._indexCount = 0;
    }
    start() {
      this.renderer.state.set(this.state);
      this.renderer.texture.ensureSamplerType(this.maxTextures);
      this.renderer.shader.bind(this._shader);
      if (_BatchRenderer.canUploadSameBuffer) {
        this.renderer.geometry.bind(this._packedGeometries[this._flushId]);
      }
    }
    stop() {
      this.flush();
    }
    destroy() {
      for (let i2 = 0; i2 < this._packedGeometryPoolSize; i2++) {
        if (this._packedGeometries[i2]) {
          this._packedGeometries[i2].destroy();
        }
      }
      this.renderer.off("prerender", this.onPrerender, this);
      this._aBuffers = null;
      this._iBuffers = null;
      this._packedGeometries = null;
      this._attributeBuffer = null;
      this._indexBuffer = null;
      if (this._shader) {
        this._shader.destroy();
        this._shader = null;
      }
      super.destroy();
    }
    getAttributeBuffer(size) {
      const roundedP2 = nextPow2(Math.ceil(size / 8));
      const roundedSizeIndex = log2(roundedP2);
      const roundedSize = roundedP2 * 8;
      if (this._aBuffers.length <= roundedSizeIndex) {
        this._iBuffers.length = roundedSizeIndex + 1;
      }
      let buffer = this._aBuffers[roundedSize];
      if (!buffer) {
        this._aBuffers[roundedSize] = buffer = new ViewableBuffer(roundedSize * this.vertexSize * 4);
      }
      return buffer;
    }
    getIndexBuffer(size) {
      const roundedP2 = nextPow2(Math.ceil(size / 12));
      const roundedSizeIndex = log2(roundedP2);
      const roundedSize = roundedP2 * 12;
      if (this._iBuffers.length <= roundedSizeIndex) {
        this._iBuffers.length = roundedSizeIndex + 1;
      }
      let buffer = this._iBuffers[roundedSizeIndex];
      if (!buffer) {
        this._iBuffers[roundedSizeIndex] = buffer = new Uint16Array(roundedSize);
      }
      return buffer;
    }
    packInterleavedGeometry(element, attributeBuffer, indexBuffer, aIndex, iIndex) {
      const {
        uint32View,
        float32View
      } = attributeBuffer;
      const packedVertices = aIndex / this.vertexSize;
      const uvs = element.uvs;
      const indicies = element.indices;
      const vertexData = element.vertexData;
      const textureId = element._texture.baseTexture._batchLocation;
      const alpha = Math.min(element.worldAlpha, 1);
      const argb = Color.shared.setValue(element._tintRGB).toPremultiplied(alpha, element._texture.baseTexture.alphaMode > 0);
      for (let i2 = 0; i2 < vertexData.length; i2 += 2) {
        float32View[aIndex++] = vertexData[i2];
        float32View[aIndex++] = vertexData[i2 + 1];
        float32View[aIndex++] = uvs[i2];
        float32View[aIndex++] = uvs[i2 + 1];
        uint32View[aIndex++] = argb;
        float32View[aIndex++] = textureId;
      }
      for (let i2 = 0; i2 < indicies.length; i2++) {
        indexBuffer[iIndex++] = packedVertices + indicies[i2];
      }
    }
  };
  var BatchRenderer = _BatchRenderer;
  BatchRenderer.defaultBatchSize = 4096;
  BatchRenderer.extension = {
    name: "batch",
    type: ExtensionType.RendererPlugin
  };
  BatchRenderer._drawCallPool = [];
  BatchRenderer._textureArrayPool = [];
  extensions.add(BatchRenderer);

  // node_modules/@pixi/core/lib/filters/defaultFilter.mjs
  var defaultFragment3 = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n";

  // node_modules/@pixi/core/lib/filters/defaultFilter2.mjs
  var defaultVertex3 = "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n";

  // node_modules/@pixi/core/lib/filters/Filter.mjs
  var _Filter = class extends Shader {
    constructor(vertexSrc, fragmentSrc, uniforms) {
      const program = Program.from(vertexSrc || _Filter.defaultVertexSrc, fragmentSrc || _Filter.defaultFragmentSrc);
      super(program, uniforms);
      this.padding = 0;
      this.resolution = _Filter.defaultResolution;
      this.multisample = _Filter.defaultMultisample;
      this.enabled = true;
      this.autoFit = true;
      this.state = new State();
    }
    apply(filterManager, input, output, clearMode, _currentState) {
      filterManager.applyFilter(this, input, output, clearMode);
    }
    get blendMode() {
      return this.state.blendMode;
    }
    set blendMode(value) {
      this.state.blendMode = value;
    }
    get resolution() {
      return this._resolution;
    }
    set resolution(value) {
      this._resolution = value;
    }
    static get defaultVertexSrc() {
      return defaultVertex3;
    }
    static get defaultFragmentSrc() {
      return defaultFragment3;
    }
  };
  var Filter = _Filter;
  Filter.defaultResolution = 1;
  Filter.defaultMultisample = MSAA_QUALITY.NONE;

  // node_modules/@pixi/core/lib/background/BackgroundSystem.mjs
  var BackgroundSystem = class {
    constructor() {
      this.clearBeforeRender = true;
      this._backgroundColor = new Color(0);
      this.alpha = 1;
    }
    init(options) {
      this.clearBeforeRender = options.clearBeforeRender;
      const { backgroundColor, background, backgroundAlpha } = options;
      const color = background ?? backgroundColor;
      if (color !== void 0) {
        this.color = color;
      }
      this.alpha = backgroundAlpha;
    }
    get color() {
      return this._backgroundColor.value;
    }
    set color(value) {
      this._backgroundColor.setValue(value);
    }
    get alpha() {
      return this._backgroundColor.alpha;
    }
    set alpha(value) {
      this._backgroundColor.setAlpha(value);
    }
    get backgroundColor() {
      return this._backgroundColor;
    }
    destroy() {
    }
  };
  BackgroundSystem.defaultOptions = {
    backgroundAlpha: 1,
    backgroundColor: 0,
    clearBeforeRender: true
  };
  BackgroundSystem.extension = {
    type: [
      ExtensionType.RendererSystem,
      ExtensionType.CanvasRendererSystem
    ],
    name: "background"
  };
  extensions.add(BackgroundSystem);

  // node_modules/@pixi/core/lib/batch/BatchSystem.mjs
  var BatchSystem = class {
    constructor(renderer) {
      this.renderer = renderer;
      this.emptyRenderer = new ObjectRenderer(renderer);
      this.currentRenderer = this.emptyRenderer;
    }
    setObjectRenderer(objectRenderer) {
      if (this.currentRenderer === objectRenderer) {
        return;
      }
      this.currentRenderer.stop();
      this.currentRenderer = objectRenderer;
      this.currentRenderer.start();
    }
    flush() {
      this.setObjectRenderer(this.emptyRenderer);
    }
    reset() {
      this.setObjectRenderer(this.emptyRenderer);
    }
    copyBoundTextures(arr, maxTextures) {
      const { boundTextures } = this.renderer.texture;
      for (let i2 = maxTextures - 1; i2 >= 0; --i2) {
        arr[i2] = boundTextures[i2] || null;
        if (arr[i2]) {
          arr[i2]._batchLocation = i2;
        }
      }
    }
    boundArray(texArray, boundTextures, batchId, maxTextures) {
      const { elements, ids, count } = texArray;
      let j2 = 0;
      for (let i2 = 0; i2 < count; i2++) {
        const tex = elements[i2];
        const loc = tex._batchLocation;
        if (loc >= 0 && loc < maxTextures && boundTextures[loc] === tex) {
          ids[i2] = loc;
          continue;
        }
        while (j2 < maxTextures) {
          const bound = boundTextures[j2];
          if (bound && bound._batchEnabled === batchId && bound._batchLocation === j2) {
            j2++;
            continue;
          }
          ids[i2] = j2;
          tex._batchLocation = j2;
          boundTextures[j2] = tex;
          break;
        }
      }
    }
    destroy() {
      this.renderer = null;
    }
  };
  BatchSystem.extension = {
    type: ExtensionType.RendererSystem,
    name: "batch"
  };
  extensions.add(BatchSystem);

  // node_modules/@pixi/core/lib/context/ContextSystem.mjs
  var CONTEXT_UID_COUNTER = 0;
  var ContextSystem = class {
    constructor(renderer) {
      this.renderer = renderer;
      this.webGLVersion = 1;
      this.extensions = {};
      this.supports = {
        uint32Indices: false
      };
      this.handleContextLost = this.handleContextLost.bind(this);
      this.handleContextRestored = this.handleContextRestored.bind(this);
    }
    get isLost() {
      return !this.gl || this.gl.isContextLost();
    }
    contextChange(gl) {
      this.gl = gl;
      this.renderer.gl = gl;
      this.renderer.CONTEXT_UID = CONTEXT_UID_COUNTER++;
    }
    init(options) {
      if (options.context) {
        this.initFromContext(options.context);
      } else {
        const alpha = this.renderer.background.alpha < 1;
        const premultipliedAlpha = options.premultipliedAlpha;
        this.preserveDrawingBuffer = options.preserveDrawingBuffer;
        this.useContextAlpha = options.useContextAlpha;
        this.powerPreference = options.powerPreference;
        this.initFromOptions({
          alpha,
          premultipliedAlpha,
          antialias: options.antialias,
          stencil: true,
          preserveDrawingBuffer: options.preserveDrawingBuffer,
          powerPreference: options.powerPreference
        });
      }
    }
    initFromContext(gl) {
      this.gl = gl;
      this.validateContext(gl);
      this.renderer.gl = gl;
      this.renderer.CONTEXT_UID = CONTEXT_UID_COUNTER++;
      this.renderer.runners.contextChange.emit(gl);
      const view = this.renderer.view;
      if (view.addEventListener !== void 0) {
        view.addEventListener("webglcontextlost", this.handleContextLost, false);
        view.addEventListener("webglcontextrestored", this.handleContextRestored, false);
      }
    }
    initFromOptions(options) {
      const gl = this.createContext(this.renderer.view, options);
      this.initFromContext(gl);
    }
    createContext(canvas, options) {
      let gl;
      if (settings.PREFER_ENV >= ENV.WEBGL2) {
        gl = canvas.getContext("webgl2", options);
      }
      if (gl) {
        this.webGLVersion = 2;
      } else {
        this.webGLVersion = 1;
        gl = canvas.getContext("webgl", options) || canvas.getContext("experimental-webgl", options);
        if (!gl) {
          throw new Error("This browser does not support WebGL. Try using the canvas renderer");
        }
      }
      this.gl = gl;
      this.getExtensions();
      return this.gl;
    }
    getExtensions() {
      const { gl } = this;
      const common = {
        loseContext: gl.getExtension("WEBGL_lose_context"),
        anisotropicFiltering: gl.getExtension("EXT_texture_filter_anisotropic"),
        floatTextureLinear: gl.getExtension("OES_texture_float_linear"),
        s3tc: gl.getExtension("WEBGL_compressed_texture_s3tc"),
        s3tc_sRGB: gl.getExtension("WEBGL_compressed_texture_s3tc_srgb"),
        etc: gl.getExtension("WEBGL_compressed_texture_etc"),
        etc1: gl.getExtension("WEBGL_compressed_texture_etc1"),
        pvrtc: gl.getExtension("WEBGL_compressed_texture_pvrtc") || gl.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
        atc: gl.getExtension("WEBGL_compressed_texture_atc"),
        astc: gl.getExtension("WEBGL_compressed_texture_astc")
      };
      if (this.webGLVersion === 1) {
        Object.assign(this.extensions, common, {
          drawBuffers: gl.getExtension("WEBGL_draw_buffers"),
          depthTexture: gl.getExtension("WEBGL_depth_texture"),
          vertexArrayObject: gl.getExtension("OES_vertex_array_object") || gl.getExtension("MOZ_OES_vertex_array_object") || gl.getExtension("WEBKIT_OES_vertex_array_object"),
          uint32ElementIndex: gl.getExtension("OES_element_index_uint"),
          floatTexture: gl.getExtension("OES_texture_float"),
          floatTextureLinear: gl.getExtension("OES_texture_float_linear"),
          textureHalfFloat: gl.getExtension("OES_texture_half_float"),
          textureHalfFloatLinear: gl.getExtension("OES_texture_half_float_linear")
        });
      } else if (this.webGLVersion === 2) {
        Object.assign(this.extensions, common, {
          colorBufferFloat: gl.getExtension("EXT_color_buffer_float")
        });
      }
    }
    handleContextLost(event) {
      event.preventDefault();
      setTimeout(() => {
        if (this.gl.isContextLost() && this.extensions.loseContext) {
          this.extensions.loseContext.restoreContext();
        }
      }, 0);
    }
    handleContextRestored() {
      this.renderer.runners.contextChange.emit(this.gl);
    }
    destroy() {
      const view = this.renderer.view;
      this.renderer = null;
      if (view.removeEventListener !== void 0) {
        view.removeEventListener("webglcontextlost", this.handleContextLost);
        view.removeEventListener("webglcontextrestored", this.handleContextRestored);
      }
      this.gl.useProgram(null);
      if (this.extensions.loseContext) {
        this.extensions.loseContext.loseContext();
      }
    }
    postrender() {
      if (this.renderer.objectRenderer.renderingToScreen) {
        this.gl.flush();
      }
    }
    validateContext(gl) {
      const attributes = gl.getContextAttributes();
      const isWebGl2 = "WebGL2RenderingContext" in globalThis && gl instanceof globalThis.WebGL2RenderingContext;
      if (isWebGl2) {
        this.webGLVersion = 2;
      }
      if (attributes && !attributes.stencil) {
        console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");
      }
      const hasuint32 = isWebGl2 || !!gl.getExtension("OES_element_index_uint");
      this.supports.uint32Indices = hasuint32;
      if (!hasuint32) {
        console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly");
      }
    }
  };
  ContextSystem.defaultOptions = {
    context: null,
    antialias: false,
    premultipliedAlpha: true,
    preserveDrawingBuffer: false,
    powerPreference: "default"
  };
  ContextSystem.extension = {
    type: ExtensionType.RendererSystem,
    name: "context"
  };
  extensions.add(ContextSystem);

  // node_modules/@pixi/core/lib/textures/resources/DepthResource.mjs
  var DepthResource = class extends BufferResource {
    upload(renderer, baseTexture, glTexture) {
      const gl = renderer.gl;
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, baseTexture.alphaMode === ALPHA_MODES.UNPACK);
      const width = baseTexture.realWidth;
      const height = baseTexture.realHeight;
      if (glTexture.width === width && glTexture.height === height) {
        gl.texSubImage2D(baseTexture.target, 0, 0, 0, width, height, baseTexture.format, glTexture.type, this.data);
      } else {
        glTexture.width = width;
        glTexture.height = height;
        gl.texImage2D(baseTexture.target, 0, glTexture.internalFormat, width, height, 0, baseTexture.format, glTexture.type, this.data);
      }
      return true;
    }
  };

  // node_modules/@pixi/core/lib/framebuffer/Framebuffer.mjs
  var Framebuffer = class {
    constructor(width, height) {
      this.width = Math.round(width || 100);
      this.height = Math.round(height || 100);
      this.stencil = false;
      this.depth = false;
      this.dirtyId = 0;
      this.dirtyFormat = 0;
      this.dirtySize = 0;
      this.depthTexture = null;
      this.colorTextures = [];
      this.glFramebuffers = {};
      this.disposeRunner = new Runner("disposeFramebuffer");
      this.multisample = MSAA_QUALITY.NONE;
    }
    get colorTexture() {
      return this.colorTextures[0];
    }
    addColorTexture(index = 0, texture) {
      this.colorTextures[index] = texture || new BaseTexture(null, {
        scaleMode: SCALE_MODES.NEAREST,
        resolution: 1,
        mipmap: MIPMAP_MODES.OFF,
        width: this.width,
        height: this.height
      });
      this.dirtyId++;
      this.dirtyFormat++;
      return this;
    }
    addDepthTexture(texture) {
      this.depthTexture = texture || new BaseTexture(new DepthResource(null, { width: this.width, height: this.height }), {
        scaleMode: SCALE_MODES.NEAREST,
        resolution: 1,
        width: this.width,
        height: this.height,
        mipmap: MIPMAP_MODES.OFF,
        format: FORMATS.DEPTH_COMPONENT,
        type: TYPES.UNSIGNED_SHORT
      });
      this.dirtyId++;
      this.dirtyFormat++;
      return this;
    }
    enableDepth() {
      this.depth = true;
      this.dirtyId++;
      this.dirtyFormat++;
      return this;
    }
    enableStencil() {
      this.stencil = true;
      this.dirtyId++;
      this.dirtyFormat++;
      return this;
    }
    resize(width, height) {
      width = Math.round(width);
      height = Math.round(height);
      if (width === this.width && height === this.height)
        return;
      this.width = width;
      this.height = height;
      this.dirtyId++;
      this.dirtySize++;
      for (let i2 = 0; i2 < this.colorTextures.length; i2++) {
        const texture = this.colorTextures[i2];
        const resolution = texture.resolution;
        texture.setSize(width / resolution, height / resolution);
      }
      if (this.depthTexture) {
        const resolution = this.depthTexture.resolution;
        this.depthTexture.setSize(width / resolution, height / resolution);
      }
    }
    dispose() {
      this.disposeRunner.emit(this, false);
    }
    destroyDepthTexture() {
      if (this.depthTexture) {
        this.depthTexture.destroy();
        this.depthTexture = null;
        ++this.dirtyId;
        ++this.dirtyFormat;
      }
    }
  };

  // node_modules/@pixi/core/lib/renderTexture/BaseRenderTexture.mjs
  var BaseRenderTexture = class extends BaseTexture {
    constructor(options = {}) {
      if (typeof options === "number") {
        const width = arguments[0];
        const height = arguments[1];
        const scaleMode = arguments[2];
        const resolution = arguments[3];
        options = { width, height, scaleMode, resolution };
      }
      options.width = options.width || 100;
      options.height = options.height || 100;
      options.multisample ?? (options.multisample = MSAA_QUALITY.NONE);
      super(null, options);
      this.mipmap = MIPMAP_MODES.OFF;
      this.valid = true;
      this._clear = new Color([0, 0, 0, 0]);
      this.framebuffer = new Framebuffer(this.realWidth, this.realHeight).addColorTexture(0, this);
      this.framebuffer.multisample = options.multisample;
      this.maskStack = [];
      this.filterStack = [{}];
    }
    set clearColor(value) {
      this._clear.setValue(value);
    }
    get clearColor() {
      return this._clear.value;
    }
    get clear() {
      return this._clear;
    }
    resize(desiredWidth, desiredHeight) {
      this.framebuffer.resize(desiredWidth * this.resolution, desiredHeight * this.resolution);
      this.setRealSize(this.framebuffer.width, this.framebuffer.height);
    }
    dispose() {
      this.framebuffer.dispose();
      super.dispose();
    }
    destroy() {
      super.destroy();
      this.framebuffer.destroyDepthTexture();
      this.framebuffer = null;
    }
  };

  // node_modules/@pixi/core/lib/textures/resources/BaseImageResource.mjs
  var BaseImageResource = class extends Resource {
    constructor(source) {
      const sourceAny = source;
      const width = sourceAny.naturalWidth || sourceAny.videoWidth || sourceAny.width;
      const height = sourceAny.naturalHeight || sourceAny.videoHeight || sourceAny.height;
      super(width, height);
      this.source = source;
      this.noSubImage = false;
    }
    static crossOrigin(element, url2, crossorigin) {
      if (crossorigin === void 0 && !url2.startsWith("data:")) {
        element.crossOrigin = determineCrossOrigin(url2);
      } else if (crossorigin !== false) {
        element.crossOrigin = typeof crossorigin === "string" ? crossorigin : "anonymous";
      }
    }
    upload(renderer, baseTexture, glTexture, source) {
      const gl = renderer.gl;
      const width = baseTexture.realWidth;
      const height = baseTexture.realHeight;
      source = source || this.source;
      if (typeof HTMLImageElement !== "undefined" && source instanceof HTMLImageElement) {
        if (!source.complete || source.naturalWidth === 0) {
          return false;
        }
      } else if (typeof HTMLVideoElement !== "undefined" && source instanceof HTMLVideoElement) {
        if (source.readyState <= 1 && source.buffered.length === 0) {
          return false;
        }
      }
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, baseTexture.alphaMode === ALPHA_MODES.UNPACK);
      if (!this.noSubImage && baseTexture.target === gl.TEXTURE_2D && glTexture.width === width && glTexture.height === height) {
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, baseTexture.format, glTexture.type, source);
      } else {
        glTexture.width = width;
        glTexture.height = height;
        gl.texImage2D(baseTexture.target, 0, glTexture.internalFormat, baseTexture.format, glTexture.type, source);
      }
      return true;
    }
    update() {
      if (this.destroyed) {
        return;
      }
      const source = this.source;
      const width = source.naturalWidth || source.videoWidth || source.width;
      const height = source.naturalHeight || source.videoHeight || source.height;
      this.resize(width, height);
      super.update();
    }
    dispose() {
      this.source = null;
    }
  };

  // node_modules/@pixi/core/lib/textures/resources/ImageResource.mjs
  var ImageResource = class extends BaseImageResource {
    constructor(source, options) {
      options = options || {};
      if (typeof source === "string") {
        const imageElement = new Image();
        BaseImageResource.crossOrigin(imageElement, source, options.crossorigin);
        imageElement.src = source;
        source = imageElement;
      }
      super(source);
      if (!source.complete && !!this._width && !!this._height) {
        this._width = 0;
        this._height = 0;
      }
      this.url = source.src;
      this._process = null;
      this.preserveBitmap = false;
      this.createBitmap = (options.createBitmap ?? settings.CREATE_IMAGE_BITMAP) && !!globalThis.createImageBitmap;
      this.alphaMode = typeof options.alphaMode === "number" ? options.alphaMode : null;
      this.bitmap = null;
      this._load = null;
      if (options.autoLoad !== false) {
        this.load();
      }
    }
    load(createBitmap) {
      if (this._load) {
        return this._load;
      }
      if (createBitmap !== void 0) {
        this.createBitmap = createBitmap;
      }
      this._load = new Promise((resolve2, reject) => {
        const source = this.source;
        this.url = source.src;
        const completed = () => {
          if (this.destroyed) {
            return;
          }
          source.onload = null;
          source.onerror = null;
          this.resize(source.width, source.height);
          this._load = null;
          if (this.createBitmap) {
            resolve2(this.process());
          } else {
            resolve2(this);
          }
        };
        if (source.complete && source.src) {
          completed();
        } else {
          source.onload = completed;
          source.onerror = (event) => {
            reject(event);
            this.onError.emit(event);
          };
        }
      });
      return this._load;
    }
    process() {
      const source = this.source;
      if (this._process !== null) {
        return this._process;
      }
      if (this.bitmap !== null || !globalThis.createImageBitmap) {
        return Promise.resolve(this);
      }
      const createImageBitmap2 = globalThis.createImageBitmap;
      const cors = !source.crossOrigin || source.crossOrigin === "anonymous";
      this._process = fetch(source.src, {
        mode: cors ? "cors" : "no-cors"
      }).then((r2) => r2.blob()).then((blob) => createImageBitmap2(blob, 0, 0, source.width, source.height, {
        premultiplyAlpha: this.alphaMode === null || this.alphaMode === ALPHA_MODES.UNPACK ? "premultiply" : "none"
      })).then((bitmap) => {
        if (this.destroyed) {
          return Promise.reject();
        }
        this.bitmap = bitmap;
        this.update();
        this._process = null;
        return Promise.resolve(this);
      });
      return this._process;
    }
    upload(renderer, baseTexture, glTexture) {
      if (typeof this.alphaMode === "number") {
        baseTexture.alphaMode = this.alphaMode;
      }
      if (!this.createBitmap) {
        return super.upload(renderer, baseTexture, glTexture);
      }
      if (!this.bitmap) {
        this.process();
        if (!this.bitmap) {
          return false;
        }
      }
      super.upload(renderer, baseTexture, glTexture, this.bitmap);
      if (!this.preserveBitmap) {
        let flag = true;
        const glTextures = baseTexture._glTextures;
        for (const key in glTextures) {
          const otherTex = glTextures[key];
          if (otherTex !== glTexture && otherTex.dirtyId !== baseTexture.dirtyId) {
            flag = false;
            break;
          }
        }
        if (flag) {
          if (this.bitmap.close) {
            this.bitmap.close();
          }
          this.bitmap = null;
        }
      }
      return true;
    }
    dispose() {
      this.source.onload = null;
      this.source.onerror = null;
      super.dispose();
      if (this.bitmap) {
        this.bitmap.close();
        this.bitmap = null;
      }
      this._process = null;
      this._load = null;
    }
    static test(source) {
      return typeof HTMLImageElement !== "undefined" && (typeof source === "string" || source instanceof HTMLImageElement);
    }
  };

  // node_modules/@pixi/core/lib/textures/TextureUvs.mjs
  var TextureUvs = class {
    constructor() {
      this.x0 = 0;
      this.y0 = 0;
      this.x1 = 1;
      this.y1 = 0;
      this.x2 = 1;
      this.y2 = 1;
      this.x3 = 0;
      this.y3 = 1;
      this.uvsFloat32 = new Float32Array(8);
    }
    set(frame, baseFrame, rotate) {
      const tw = baseFrame.width;
      const th = baseFrame.height;
      if (rotate) {
        const w2 = frame.width / 2 / tw;
        const h2 = frame.height / 2 / th;
        const cX = frame.x / tw + w2;
        const cY = frame.y / th + h2;
        rotate = groupD8.add(rotate, groupD8.NW);
        this.x0 = cX + w2 * groupD8.uX(rotate);
        this.y0 = cY + h2 * groupD8.uY(rotate);
        rotate = groupD8.add(rotate, 2);
        this.x1 = cX + w2 * groupD8.uX(rotate);
        this.y1 = cY + h2 * groupD8.uY(rotate);
        rotate = groupD8.add(rotate, 2);
        this.x2 = cX + w2 * groupD8.uX(rotate);
        this.y2 = cY + h2 * groupD8.uY(rotate);
        rotate = groupD8.add(rotate, 2);
        this.x3 = cX + w2 * groupD8.uX(rotate);
        this.y3 = cY + h2 * groupD8.uY(rotate);
      } else {
        this.x0 = frame.x / tw;
        this.y0 = frame.y / th;
        this.x1 = (frame.x + frame.width) / tw;
        this.y1 = frame.y / th;
        this.x2 = (frame.x + frame.width) / tw;
        this.y2 = (frame.y + frame.height) / th;
        this.x3 = frame.x / tw;
        this.y3 = (frame.y + frame.height) / th;
      }
      this.uvsFloat32[0] = this.x0;
      this.uvsFloat32[1] = this.y0;
      this.uvsFloat32[2] = this.x1;
      this.uvsFloat32[3] = this.y1;
      this.uvsFloat32[4] = this.x2;
      this.uvsFloat32[5] = this.y2;
      this.uvsFloat32[6] = this.x3;
      this.uvsFloat32[7] = this.y3;
    }
    toString() {
      return `[@pixi/core:TextureUvs x0=${this.x0} y0=${this.y0} x1=${this.x1} y1=${this.y1} x2=${this.x2} y2=${this.y2} x3=${this.x3} y3=${this.y3}]`;
    }
  };

  // node_modules/@pixi/core/lib/textures/Texture.mjs
  var DEFAULT_UVS = new TextureUvs();
  function removeAllHandlers(tex) {
    tex.destroy = function _emptyDestroy() {
    };
    tex.on = function _emptyOn() {
    };
    tex.once = function _emptyOnce() {
    };
    tex.emit = function _emptyEmit() {
    };
  }
  var Texture = class extends import_eventemitter3.default {
    constructor(baseTexture, frame, orig, trim, rotate, anchor, borders) {
      super();
      this.noFrame = false;
      if (!frame) {
        this.noFrame = true;
        frame = new Rectangle(0, 0, 1, 1);
      }
      if (baseTexture instanceof Texture) {
        baseTexture = baseTexture.baseTexture;
      }
      this.baseTexture = baseTexture;
      this._frame = frame;
      this.trim = trim;
      this.valid = false;
      this._uvs = DEFAULT_UVS;
      this.uvMatrix = null;
      this.orig = orig || frame;
      this._rotate = Number(rotate || 0);
      if (rotate === true) {
        this._rotate = 2;
      } else if (this._rotate % 2 !== 0) {
        throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
      }
      this.defaultAnchor = anchor ? new Point(anchor.x, anchor.y) : new Point(0, 0);
      this.defaultBorders = borders;
      this._updateID = 0;
      this.textureCacheIds = [];
      if (!baseTexture.valid) {
        baseTexture.once("loaded", this.onBaseTextureUpdated, this);
      } else if (this.noFrame) {
        if (baseTexture.valid) {
          this.onBaseTextureUpdated(baseTexture);
        }
      } else {
        this.frame = frame;
      }
      if (this.noFrame) {
        baseTexture.on("update", this.onBaseTextureUpdated, this);
      }
    }
    update() {
      if (this.baseTexture.resource) {
        this.baseTexture.resource.update();
      }
    }
    onBaseTextureUpdated(baseTexture) {
      if (this.noFrame) {
        if (!this.baseTexture.valid) {
          return;
        }
        this._frame.width = baseTexture.width;
        this._frame.height = baseTexture.height;
        this.valid = true;
        this.updateUvs();
      } else {
        this.frame = this._frame;
      }
      this.emit("update", this);
    }
    destroy(destroyBase) {
      if (this.baseTexture) {
        if (destroyBase) {
          const { resource } = this.baseTexture;
          if (resource?.url && TextureCache[resource.url]) {
            Texture.removeFromCache(resource.url);
          }
          this.baseTexture.destroy();
        }
        this.baseTexture.off("loaded", this.onBaseTextureUpdated, this);
        this.baseTexture.off("update", this.onBaseTextureUpdated, this);
        this.baseTexture = null;
      }
      this._frame = null;
      this._uvs = null;
      this.trim = null;
      this.orig = null;
      this.valid = false;
      Texture.removeFromCache(this);
      this.textureCacheIds = null;
    }
    clone() {
      const clonedFrame = this._frame.clone();
      const clonedOrig = this._frame === this.orig ? clonedFrame : this.orig.clone();
      const clonedTexture = new Texture(this.baseTexture, !this.noFrame && clonedFrame, clonedOrig, this.trim?.clone(), this.rotate, this.defaultAnchor, this.defaultBorders);
      if (this.noFrame) {
        clonedTexture._frame = clonedFrame;
      }
      return clonedTexture;
    }
    updateUvs() {
      if (this._uvs === DEFAULT_UVS) {
        this._uvs = new TextureUvs();
      }
      this._uvs.set(this._frame, this.baseTexture, this.rotate);
      this._updateID++;
    }
    static from(source, options = {}, strict = settings.STRICT_TEXTURE_CACHE) {
      const isFrame = typeof source === "string";
      let cacheId = null;
      if (isFrame) {
        cacheId = source;
      } else if (source instanceof BaseTexture) {
        if (!source.cacheId) {
          const prefix = options?.pixiIdPrefix || "pixiid";
          source.cacheId = `${prefix}-${uid()}`;
          BaseTexture.addToCache(source, source.cacheId);
        }
        cacheId = source.cacheId;
      } else {
        if (!source._pixiId) {
          const prefix = options?.pixiIdPrefix || "pixiid";
          source._pixiId = `${prefix}_${uid()}`;
        }
        cacheId = source._pixiId;
      }
      let texture = TextureCache[cacheId];
      if (isFrame && strict && !texture) {
        throw new Error(`The cacheId "${cacheId}" does not exist in TextureCache.`);
      }
      if (!texture && !(source instanceof BaseTexture)) {
        if (!options.resolution) {
          options.resolution = getResolutionOfUrl(source);
        }
        texture = new Texture(new BaseTexture(source, options));
        texture.baseTexture.cacheId = cacheId;
        BaseTexture.addToCache(texture.baseTexture, cacheId);
        Texture.addToCache(texture, cacheId);
      } else if (!texture && source instanceof BaseTexture) {
        texture = new Texture(source);
        Texture.addToCache(texture, cacheId);
      }
      return texture;
    }
    static fromURL(url2, options) {
      const resourceOptions = Object.assign({ autoLoad: false }, options?.resourceOptions);
      const texture = Texture.from(url2, Object.assign({ resourceOptions }, options), false);
      const resource = texture.baseTexture.resource;
      if (texture.baseTexture.valid) {
        return Promise.resolve(texture);
      }
      return resource.load().then(() => Promise.resolve(texture));
    }
    static fromBuffer(buffer, width, height, options) {
      return new Texture(BaseTexture.fromBuffer(buffer, width, height, options));
    }
    static fromLoader(source, imageUrl, name, options) {
      const baseTexture = new BaseTexture(source, Object.assign({
        scaleMode: BaseTexture.defaultOptions.scaleMode,
        resolution: getResolutionOfUrl(imageUrl)
      }, options));
      const { resource } = baseTexture;
      if (resource instanceof ImageResource) {
        resource.url = imageUrl;
      }
      const texture = new Texture(baseTexture);
      if (!name) {
        name = imageUrl;
      }
      BaseTexture.addToCache(texture.baseTexture, name);
      Texture.addToCache(texture, name);
      if (name !== imageUrl) {
        BaseTexture.addToCache(texture.baseTexture, imageUrl);
        Texture.addToCache(texture, imageUrl);
      }
      if (texture.baseTexture.valid) {
        return Promise.resolve(texture);
      }
      return new Promise((resolve2) => {
        texture.baseTexture.once("loaded", () => resolve2(texture));
      });
    }
    static addToCache(texture, id) {
      if (id) {
        if (!texture.textureCacheIds.includes(id)) {
          texture.textureCacheIds.push(id);
        }
        if (TextureCache[id] && TextureCache[id] !== texture) {
          console.warn(`Texture added to the cache with an id [${id}] that already had an entry`);
        }
        TextureCache[id] = texture;
      }
    }
    static removeFromCache(texture) {
      if (typeof texture === "string") {
        const textureFromCache = TextureCache[texture];
        if (textureFromCache) {
          const index = textureFromCache.textureCacheIds.indexOf(texture);
          if (index > -1) {
            textureFromCache.textureCacheIds.splice(index, 1);
          }
          delete TextureCache[texture];
          return textureFromCache;
        }
      } else if (texture?.textureCacheIds) {
        for (let i2 = 0; i2 < texture.textureCacheIds.length; ++i2) {
          if (TextureCache[texture.textureCacheIds[i2]] === texture) {
            delete TextureCache[texture.textureCacheIds[i2]];
          }
        }
        texture.textureCacheIds.length = 0;
        return texture;
      }
      return null;
    }
    get resolution() {
      return this.baseTexture.resolution;
    }
    get frame() {
      return this._frame;
    }
    set frame(frame) {
      this._frame = frame;
      this.noFrame = false;
      const { x: x2, y: y2, width, height } = frame;
      const xNotFit = x2 + width > this.baseTexture.width;
      const yNotFit = y2 + height > this.baseTexture.height;
      if (xNotFit || yNotFit) {
        const relationship = xNotFit && yNotFit ? "and" : "or";
        const errorX = `X: ${x2} + ${width} = ${x2 + width} > ${this.baseTexture.width}`;
        const errorY = `Y: ${y2} + ${height} = ${y2 + height} > ${this.baseTexture.height}`;
        throw new Error(`Texture Error: frame does not fit inside the base Texture dimensions: ${errorX} ${relationship} ${errorY}`);
      }
      this.valid = width && height && this.baseTexture.valid;
      if (!this.trim && !this.rotate) {
        this.orig = frame;
      }
      if (this.valid) {
        this.updateUvs();
      }
    }
    get rotate() {
      return this._rotate;
    }
    set rotate(rotate) {
      this._rotate = rotate;
      if (this.valid) {
        this.updateUvs();
      }
    }
    get width() {
      return this.orig.width;
    }
    get height() {
      return this.orig.height;
    }
    castToBaseTexture() {
      return this.baseTexture;
    }
    static get EMPTY() {
      if (!Texture._EMPTY) {
        Texture._EMPTY = new Texture(new BaseTexture());
        removeAllHandlers(Texture._EMPTY);
        removeAllHandlers(Texture._EMPTY.baseTexture);
      }
      return Texture._EMPTY;
    }
    static get WHITE() {
      if (!Texture._WHITE) {
        const canvas = settings.ADAPTER.createCanvas(16, 16);
        const context2 = canvas.getContext("2d");
        canvas.width = 16;
        canvas.height = 16;
        context2.fillStyle = "white";
        context2.fillRect(0, 0, 16, 16);
        Texture._WHITE = new Texture(BaseTexture.from(canvas));
        removeAllHandlers(Texture._WHITE);
        removeAllHandlers(Texture._WHITE.baseTexture);
      }
      return Texture._WHITE;
    }
  };

  // node_modules/@pixi/core/lib/renderTexture/RenderTexture.mjs
  var RenderTexture = class extends Texture {
    constructor(baseRenderTexture, frame) {
      super(baseRenderTexture, frame);
      this.valid = true;
      this.filterFrame = null;
      this.filterPoolKey = null;
      this.updateUvs();
    }
    get framebuffer() {
      return this.baseTexture.framebuffer;
    }
    get multisample() {
      return this.framebuffer.multisample;
    }
    set multisample(value) {
      this.framebuffer.multisample = value;
    }
    resize(desiredWidth, desiredHeight, resizeBaseTexture = true) {
      const resolution = this.baseTexture.resolution;
      const width = Math.round(desiredWidth * resolution) / resolution;
      const height = Math.round(desiredHeight * resolution) / resolution;
      this.valid = width > 0 && height > 0;
      this._frame.width = this.orig.width = width;
      this._frame.height = this.orig.height = height;
      if (resizeBaseTexture) {
        this.baseTexture.resize(width, height);
      }
      this.updateUvs();
    }
    setResolution(resolution) {
      const { baseTexture } = this;
      if (baseTexture.resolution === resolution) {
        return;
      }
      baseTexture.setResolution(resolution);
      this.resize(baseTexture.width, baseTexture.height, false);
    }
    static create(options) {
      return new RenderTexture(new BaseRenderTexture(options));
    }
  };

  // node_modules/@pixi/core/lib/renderTexture/RenderTexturePool.mjs
  var RenderTexturePool = class {
    constructor(textureOptions) {
      this.texturePool = {};
      this.textureOptions = textureOptions || {};
      this.enableFullScreen = false;
      this._pixelsWidth = 0;
      this._pixelsHeight = 0;
    }
    createTexture(realWidth, realHeight, multisample = MSAA_QUALITY.NONE) {
      const baseRenderTexture = new BaseRenderTexture(Object.assign({
        width: realWidth,
        height: realHeight,
        resolution: 1,
        multisample
      }, this.textureOptions));
      return new RenderTexture(baseRenderTexture);
    }
    getOptimalTexture(minWidth, minHeight, resolution = 1, multisample = MSAA_QUALITY.NONE) {
      let key;
      minWidth = Math.ceil(minWidth * resolution - 1e-6);
      minHeight = Math.ceil(minHeight * resolution - 1e-6);
      if (!this.enableFullScreen || minWidth !== this._pixelsWidth || minHeight !== this._pixelsHeight) {
        minWidth = nextPow2(minWidth);
        minHeight = nextPow2(minHeight);
        key = ((minWidth & 65535) << 16 | minHeight & 65535) >>> 0;
        if (multisample > 1) {
          key += multisample * 4294967296;
        }
      } else {
        key = multisample > 1 ? -multisample : -1;
      }
      if (!this.texturePool[key]) {
        this.texturePool[key] = [];
      }
      let renderTexture = this.texturePool[key].pop();
      if (!renderTexture) {
        renderTexture = this.createTexture(minWidth, minHeight, multisample);
      }
      renderTexture.filterPoolKey = key;
      renderTexture.setResolution(resolution);
      return renderTexture;
    }
    getFilterTexture(input, resolution, multisample) {
      const filterTexture = this.getOptimalTexture(input.width, input.height, resolution || input.resolution, multisample || MSAA_QUALITY.NONE);
      filterTexture.filterFrame = input.filterFrame;
      return filterTexture;
    }
    returnTexture(renderTexture) {
      const key = renderTexture.filterPoolKey;
      renderTexture.filterFrame = null;
      this.texturePool[key].push(renderTexture);
    }
    returnFilterTexture(renderTexture) {
      this.returnTexture(renderTexture);
    }
    clear(destroyTextures) {
      destroyTextures = destroyTextures !== false;
      if (destroyTextures) {
        for (const i2 in this.texturePool) {
          const textures = this.texturePool[i2];
          if (textures) {
            for (let j2 = 0; j2 < textures.length; j2++) {
              textures[j2].destroy(true);
            }
          }
        }
      }
      this.texturePool = {};
    }
    setScreenSize(size) {
      if (size.width === this._pixelsWidth && size.height === this._pixelsHeight) {
        return;
      }
      this.enableFullScreen = size.width > 0 && size.height > 0;
      for (const i2 in this.texturePool) {
        if (!(Number(i2) < 0)) {
          continue;
        }
        const textures = this.texturePool[i2];
        if (textures) {
          for (let j2 = 0; j2 < textures.length; j2++) {
            textures[j2].destroy(true);
          }
        }
        this.texturePool[i2] = [];
      }
      this._pixelsWidth = size.width;
      this._pixelsHeight = size.height;
    }
  };
  RenderTexturePool.SCREEN_KEY = -1;

  // node_modules/@pixi/core/lib/utils/Quad.mjs
  var Quad = class extends Geometry {
    constructor() {
      super();
      this.addAttribute("aVertexPosition", new Float32Array([
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1
      ])).addIndex([0, 1, 3, 2]);
    }
  };

  // node_modules/@pixi/core/lib/utils/QuadUv.mjs
  var QuadUv = class extends Geometry {
    constructor() {
      super();
      this.vertices = new Float32Array([
        -1,
        -1,
        1,
        -1,
        1,
        1,
        -1,
        1
      ]);
      this.uvs = new Float32Array([
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1
      ]);
      this.vertexBuffer = new Buffer2(this.vertices);
      this.uvBuffer = new Buffer2(this.uvs);
      this.addAttribute("aVertexPosition", this.vertexBuffer).addAttribute("aTextureCoord", this.uvBuffer).addIndex([0, 1, 2, 0, 2, 3]);
    }
    map(targetTextureFrame, destinationFrame) {
      let x2 = 0;
      let y2 = 0;
      this.uvs[0] = x2;
      this.uvs[1] = y2;
      this.uvs[2] = x2 + destinationFrame.width / targetTextureFrame.width;
      this.uvs[3] = y2;
      this.uvs[4] = x2 + destinationFrame.width / targetTextureFrame.width;
      this.uvs[5] = y2 + destinationFrame.height / targetTextureFrame.height;
      this.uvs[6] = x2;
      this.uvs[7] = y2 + destinationFrame.height / targetTextureFrame.height;
      x2 = destinationFrame.x;
      y2 = destinationFrame.y;
      this.vertices[0] = x2;
      this.vertices[1] = y2;
      this.vertices[2] = x2 + destinationFrame.width;
      this.vertices[3] = y2;
      this.vertices[4] = x2 + destinationFrame.width;
      this.vertices[5] = y2 + destinationFrame.height;
      this.vertices[6] = x2;
      this.vertices[7] = y2 + destinationFrame.height;
      this.invalidate();
      return this;
    }
    invalidate() {
      this.vertexBuffer._updateID++;
      this.uvBuffer._updateID++;
      return this;
    }
  };

  // node_modules/@pixi/core/lib/filters/FilterState.mjs
  var FilterState = class {
    constructor() {
      this.renderTexture = null;
      this.target = null;
      this.legacy = false;
      this.resolution = 1;
      this.multisample = MSAA_QUALITY.NONE;
      this.sourceFrame = new Rectangle();
      this.destinationFrame = new Rectangle();
      this.bindingSourceFrame = new Rectangle();
      this.bindingDestinationFrame = new Rectangle();
      this.filters = [];
      this.transform = null;
    }
    clear() {
      this.target = null;
      this.filters = null;
      this.renderTexture = null;
    }
  };

  // node_modules/@pixi/core/lib/filters/FilterSystem.mjs
  var tempPoints2 = [new Point(), new Point(), new Point(), new Point()];
  var tempMatrix = new Matrix();
  var FilterSystem = class {
    constructor(renderer) {
      this.renderer = renderer;
      this.defaultFilterStack = [{}];
      this.texturePool = new RenderTexturePool();
      this.statePool = [];
      this.quad = new Quad();
      this.quadUv = new QuadUv();
      this.tempRect = new Rectangle();
      this.activeState = {};
      this.globalUniforms = new UniformGroup({
        outputFrame: new Rectangle(),
        inputSize: new Float32Array(4),
        inputPixel: new Float32Array(4),
        inputClamp: new Float32Array(4),
        resolution: 1,
        filterArea: new Float32Array(4),
        filterClamp: new Float32Array(4)
      }, true);
      this.forceClear = false;
      this.useMaxPadding = false;
    }
    init() {
      this.texturePool.setScreenSize(this.renderer.view);
    }
    push(target, filters) {
      const renderer = this.renderer;
      const filterStack = this.defaultFilterStack;
      const state = this.statePool.pop() || new FilterState();
      const renderTextureSystem = this.renderer.renderTexture;
      let resolution = filters[0].resolution;
      let multisample = filters[0].multisample;
      let padding = filters[0].padding;
      let autoFit = filters[0].autoFit;
      let legacy = filters[0].legacy ?? true;
      for (let i2 = 1; i2 < filters.length; i2++) {
        const filter = filters[i2];
        resolution = Math.min(resolution, filter.resolution);
        multisample = Math.min(multisample, filter.multisample);
        padding = this.useMaxPadding ? Math.max(padding, filter.padding) : padding + filter.padding;
        autoFit = autoFit && filter.autoFit;
        legacy = legacy || (filter.legacy ?? true);
      }
      if (filterStack.length === 1) {
        this.defaultFilterStack[0].renderTexture = renderTextureSystem.current;
      }
      filterStack.push(state);
      state.resolution = resolution;
      state.multisample = multisample;
      state.legacy = legacy;
      state.target = target;
      state.sourceFrame.copyFrom(target.filterArea || target.getBounds(true));
      state.sourceFrame.pad(padding);
      const sourceFrameProjected = this.tempRect.copyFrom(renderTextureSystem.sourceFrame);
      if (renderer.projection.transform) {
        this.transformAABB(tempMatrix.copyFrom(renderer.projection.transform).invert(), sourceFrameProjected);
      }
      if (autoFit) {
        state.sourceFrame.fit(sourceFrameProjected);
        if (state.sourceFrame.width <= 0 || state.sourceFrame.height <= 0) {
          state.sourceFrame.width = 0;
          state.sourceFrame.height = 0;
        }
      } else if (!state.sourceFrame.intersects(sourceFrameProjected)) {
        state.sourceFrame.width = 0;
        state.sourceFrame.height = 0;
      }
      this.roundFrame(state.sourceFrame, renderTextureSystem.current ? renderTextureSystem.current.resolution : renderer.resolution, renderTextureSystem.sourceFrame, renderTextureSystem.destinationFrame, renderer.projection.transform);
      state.renderTexture = this.getOptimalFilterTexture(state.sourceFrame.width, state.sourceFrame.height, resolution, multisample);
      state.filters = filters;
      state.destinationFrame.width = state.renderTexture.width;
      state.destinationFrame.height = state.renderTexture.height;
      const destinationFrame = this.tempRect;
      destinationFrame.x = 0;
      destinationFrame.y = 0;
      destinationFrame.width = state.sourceFrame.width;
      destinationFrame.height = state.sourceFrame.height;
      state.renderTexture.filterFrame = state.sourceFrame;
      state.bindingSourceFrame.copyFrom(renderTextureSystem.sourceFrame);
      state.bindingDestinationFrame.copyFrom(renderTextureSystem.destinationFrame);
      state.transform = renderer.projection.transform;
      renderer.projection.transform = null;
      renderTextureSystem.bind(state.renderTexture, state.sourceFrame, destinationFrame);
      renderer.framebuffer.clear(0, 0, 0, 0);
    }
    pop() {
      const filterStack = this.defaultFilterStack;
      const state = filterStack.pop();
      const filters = state.filters;
      this.activeState = state;
      const globalUniforms = this.globalUniforms.uniforms;
      globalUniforms.outputFrame = state.sourceFrame;
      globalUniforms.resolution = state.resolution;
      const inputSize = globalUniforms.inputSize;
      const inputPixel = globalUniforms.inputPixel;
      const inputClamp = globalUniforms.inputClamp;
      inputSize[0] = state.destinationFrame.width;
      inputSize[1] = state.destinationFrame.height;
      inputSize[2] = 1 / inputSize[0];
      inputSize[3] = 1 / inputSize[1];
      inputPixel[0] = Math.round(inputSize[0] * state.resolution);
      inputPixel[1] = Math.round(inputSize[1] * state.resolution);
      inputPixel[2] = 1 / inputPixel[0];
      inputPixel[3] = 1 / inputPixel[1];
      inputClamp[0] = 0.5 * inputPixel[2];
      inputClamp[1] = 0.5 * inputPixel[3];
      inputClamp[2] = state.sourceFrame.width * inputSize[2] - 0.5 * inputPixel[2];
      inputClamp[3] = state.sourceFrame.height * inputSize[3] - 0.5 * inputPixel[3];
      if (state.legacy) {
        const filterArea = globalUniforms.filterArea;
        filterArea[0] = state.destinationFrame.width;
        filterArea[1] = state.destinationFrame.height;
        filterArea[2] = state.sourceFrame.x;
        filterArea[3] = state.sourceFrame.y;
        globalUniforms.filterClamp = globalUniforms.inputClamp;
      }
      this.globalUniforms.update();
      const lastState = filterStack[filterStack.length - 1];
      this.renderer.framebuffer.blit();
      if (filters.length === 1) {
        filters[0].apply(this, state.renderTexture, lastState.renderTexture, CLEAR_MODES.BLEND, state);
        this.returnFilterTexture(state.renderTexture);
      } else {
        let flip = state.renderTexture;
        let flop = this.getOptimalFilterTexture(flip.width, flip.height, state.resolution);
        flop.filterFrame = flip.filterFrame;
        let i2 = 0;
        for (i2 = 0; i2 < filters.length - 1; ++i2) {
          if (i2 === 1 && state.multisample > 1) {
            flop = this.getOptimalFilterTexture(flip.width, flip.height, state.resolution);
            flop.filterFrame = flip.filterFrame;
          }
          filters[i2].apply(this, flip, flop, CLEAR_MODES.CLEAR, state);
          const t2 = flip;
          flip = flop;
          flop = t2;
        }
        filters[i2].apply(this, flip, lastState.renderTexture, CLEAR_MODES.BLEND, state);
        if (i2 > 1 && state.multisample > 1) {
          this.returnFilterTexture(state.renderTexture);
        }
        this.returnFilterTexture(flip);
        this.returnFilterTexture(flop);
      }
      state.clear();
      this.statePool.push(state);
    }
    bindAndClear(filterTexture, clearMode = CLEAR_MODES.CLEAR) {
      const {
        renderTexture: renderTextureSystem,
        state: stateSystem
      } = this.renderer;
      if (filterTexture === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture) {
        this.renderer.projection.transform = this.activeState.transform;
      } else {
        this.renderer.projection.transform = null;
      }
      if (filterTexture?.filterFrame) {
        const destinationFrame = this.tempRect;
        destinationFrame.x = 0;
        destinationFrame.y = 0;
        destinationFrame.width = filterTexture.filterFrame.width;
        destinationFrame.height = filterTexture.filterFrame.height;
        renderTextureSystem.bind(filterTexture, filterTexture.filterFrame, destinationFrame);
      } else if (filterTexture !== this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture) {
        renderTextureSystem.bind(filterTexture);
      } else {
        this.renderer.renderTexture.bind(filterTexture, this.activeState.bindingSourceFrame, this.activeState.bindingDestinationFrame);
      }
      const autoClear = stateSystem.stateId & 1 || this.forceClear;
      if (clearMode === CLEAR_MODES.CLEAR || clearMode === CLEAR_MODES.BLIT && autoClear) {
        this.renderer.framebuffer.clear(0, 0, 0, 0);
      }
    }
    applyFilter(filter, input, output, clearMode) {
      const renderer = this.renderer;
      renderer.state.set(filter.state);
      this.bindAndClear(output, clearMode);
      filter.uniforms.uSampler = input;
      filter.uniforms.filterGlobals = this.globalUniforms;
      renderer.shader.bind(filter);
      filter.legacy = !!filter.program.attributeData.aTextureCoord;
      if (filter.legacy) {
        this.quadUv.map(input._frame, input.filterFrame);
        renderer.geometry.bind(this.quadUv);
        renderer.geometry.draw(DRAW_MODES.TRIANGLES);
      } else {
        renderer.geometry.bind(this.quad);
        renderer.geometry.draw(DRAW_MODES.TRIANGLE_STRIP);
      }
    }
    calculateSpriteMatrix(outputMatrix, sprite) {
      const { sourceFrame, destinationFrame } = this.activeState;
      const { orig } = sprite._texture;
      const mappedMatrix = outputMatrix.set(destinationFrame.width, 0, 0, destinationFrame.height, sourceFrame.x, sourceFrame.y);
      const worldTransform = sprite.worldTransform.copyTo(Matrix.TEMP_MATRIX);
      worldTransform.invert();
      mappedMatrix.prepend(worldTransform);
      mappedMatrix.scale(1 / orig.width, 1 / orig.height);
      mappedMatrix.translate(sprite.anchor.x, sprite.anchor.y);
      return mappedMatrix;
    }
    destroy() {
      this.renderer = null;
      this.texturePool.clear(false);
    }
    getOptimalFilterTexture(minWidth, minHeight, resolution = 1, multisample = MSAA_QUALITY.NONE) {
      return this.texturePool.getOptimalTexture(minWidth, minHeight, resolution, multisample);
    }
    getFilterTexture(input, resolution, multisample) {
      if (typeof input === "number") {
        const swap = input;
        input = resolution;
        resolution = swap;
      }
      input = input || this.activeState.renderTexture;
      const filterTexture = this.texturePool.getOptimalTexture(input.width, input.height, resolution || input.resolution, multisample || MSAA_QUALITY.NONE);
      filterTexture.filterFrame = input.filterFrame;
      return filterTexture;
    }
    returnFilterTexture(renderTexture) {
      this.texturePool.returnTexture(renderTexture);
    }
    emptyPool() {
      this.texturePool.clear(true);
    }
    resize() {
      this.texturePool.setScreenSize(this.renderer.view);
    }
    transformAABB(matrix, rect) {
      const lt = tempPoints2[0];
      const lb = tempPoints2[1];
      const rt = tempPoints2[2];
      const rb = tempPoints2[3];
      lt.set(rect.left, rect.top);
      lb.set(rect.left, rect.bottom);
      rt.set(rect.right, rect.top);
      rb.set(rect.right, rect.bottom);
      matrix.apply(lt, lt);
      matrix.apply(lb, lb);
      matrix.apply(rt, rt);
      matrix.apply(rb, rb);
      const x0 = Math.min(lt.x, lb.x, rt.x, rb.x);
      const y0 = Math.min(lt.y, lb.y, rt.y, rb.y);
      const x1 = Math.max(lt.x, lb.x, rt.x, rb.x);
      const y1 = Math.max(lt.y, lb.y, rt.y, rb.y);
      rect.x = x0;
      rect.y = y0;
      rect.width = x1 - x0;
      rect.height = y1 - y0;
    }
    roundFrame(frame, resolution, bindingSourceFrame, bindingDestinationFrame, transform) {
      if (frame.width <= 0 || frame.height <= 0 || bindingSourceFrame.width <= 0 || bindingSourceFrame.height <= 0) {
        return;
      }
      if (transform) {
        const { a: a2, b: b2, c: c2, d: d2 } = transform;
        if ((Math.abs(b2) > 1e-4 || Math.abs(c2) > 1e-4) && (Math.abs(a2) > 1e-4 || Math.abs(d2) > 1e-4)) {
          return;
        }
      }
      transform = transform ? tempMatrix.copyFrom(transform) : tempMatrix.identity();
      transform.translate(-bindingSourceFrame.x, -bindingSourceFrame.y).scale(bindingDestinationFrame.width / bindingSourceFrame.width, bindingDestinationFrame.height / bindingSourceFrame.height).translate(bindingDestinationFrame.x, bindingDestinationFrame.y);
      this.transformAABB(transform, frame);
      frame.ceil(resolution);
      this.transformAABB(transform.invert(), frame);
    }
  };
  FilterSystem.extension = {
    type: ExtensionType.RendererSystem,
    name: "filter"
  };
  extensions.add(FilterSystem);

  // node_modules/@pixi/core/lib/framebuffer/GLFramebuffer.mjs
  var GLFramebuffer = class {
    constructor(framebuffer) {
      this.framebuffer = framebuffer;
      this.stencil = null;
      this.dirtyId = -1;
      this.dirtyFormat = -1;
      this.dirtySize = -1;
      this.multisample = MSAA_QUALITY.NONE;
      this.msaaBuffer = null;
      this.blitFramebuffer = null;
      this.mipLevel = 0;
    }
  };

  // node_modules/@pixi/core/lib/framebuffer/FramebufferSystem.mjs
  var tempRectangle = new Rectangle();
  var FramebufferSystem = class {
    constructor(renderer) {
      this.renderer = renderer;
      this.managedFramebuffers = [];
      this.unknownFramebuffer = new Framebuffer(10, 10);
      this.msaaSamples = null;
    }
    contextChange() {
      this.disposeAll(true);
      const gl = this.gl = this.renderer.gl;
      this.CONTEXT_UID = this.renderer.CONTEXT_UID;
      this.current = this.unknownFramebuffer;
      this.viewport = new Rectangle();
      this.hasMRT = true;
      this.writeDepthTexture = true;
      if (this.renderer.context.webGLVersion === 1) {
        let nativeDrawBuffersExtension = this.renderer.context.extensions.drawBuffers;
        let nativeDepthTextureExtension = this.renderer.context.extensions.depthTexture;
        if (settings.PREFER_ENV === ENV.WEBGL_LEGACY) {
          nativeDrawBuffersExtension = null;
          nativeDepthTextureExtension = null;
        }
        if (nativeDrawBuffersExtension) {
          gl.drawBuffers = (activeTextures) => nativeDrawBuffersExtension.drawBuffersWEBGL(activeTextures);
        } else {
          this.hasMRT = false;
          gl.drawBuffers = () => {
          };
        }
        if (!nativeDepthTextureExtension) {
          this.writeDepthTexture = false;
        }
      } else {
        this.msaaSamples = gl.getInternalformatParameter(gl.RENDERBUFFER, gl.RGBA8, gl.SAMPLES);
      }
    }
    bind(framebuffer, frame, mipLevel = 0) {
      const { gl } = this;
      if (framebuffer) {
        const fbo = framebuffer.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(framebuffer);
        if (this.current !== framebuffer) {
          this.current = framebuffer;
          gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.framebuffer);
        }
        if (fbo.mipLevel !== mipLevel) {
          framebuffer.dirtyId++;
          framebuffer.dirtyFormat++;
          fbo.mipLevel = mipLevel;
        }
        if (fbo.dirtyId !== framebuffer.dirtyId) {
          fbo.dirtyId = framebuffer.dirtyId;
          if (fbo.dirtyFormat !== framebuffer.dirtyFormat) {
            fbo.dirtyFormat = framebuffer.dirtyFormat;
            fbo.dirtySize = framebuffer.dirtySize;
            this.updateFramebuffer(framebuffer, mipLevel);
          } else if (fbo.dirtySize !== framebuffer.dirtySize) {
            fbo.dirtySize = framebuffer.dirtySize;
            this.resizeFramebuffer(framebuffer);
          }
        }
        for (let i2 = 0; i2 < framebuffer.colorTextures.length; i2++) {
          const tex = framebuffer.colorTextures[i2];
          this.renderer.texture.unbind(tex.parentTextureArray || tex);
        }
        if (framebuffer.depthTexture) {
          this.renderer.texture.unbind(framebuffer.depthTexture);
        }
        if (frame) {
          const mipWidth = frame.width >> mipLevel;
          const mipHeight = frame.height >> mipLevel;
          const scale = mipWidth / frame.width;
          this.setViewport(frame.x * scale, frame.y * scale, mipWidth, mipHeight);
        } else {
          const mipWidth = framebuffer.width >> mipLevel;
          const mipHeight = framebuffer.height >> mipLevel;
          this.setViewport(0, 0, mipWidth, mipHeight);
        }
      } else {
        if (this.current) {
          this.current = null;
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }
        if (frame) {
          this.setViewport(frame.x, frame.y, frame.width, frame.height);
        } else {
          this.setViewport(0, 0, this.renderer.width, this.renderer.height);
        }
      }
    }
    setViewport(x2, y2, width, height) {
      const v2 = this.viewport;
      x2 = Math.round(x2);
      y2 = Math.round(y2);
      width = Math.round(width);
      height = Math.round(height);
      if (v2.width !== width || v2.height !== height || v2.x !== x2 || v2.y !== y2) {
        v2.x = x2;
        v2.y = y2;
        v2.width = width;
        v2.height = height;
        this.gl.viewport(x2, y2, width, height);
      }
    }
    get size() {
      if (this.current) {
        return { x: 0, y: 0, width: this.current.width, height: this.current.height };
      }
      return { x: 0, y: 0, width: this.renderer.width, height: this.renderer.height };
    }
    clear(r2, g2, b2, a2, mask = BUFFER_BITS.COLOR | BUFFER_BITS.DEPTH) {
      const { gl } = this;
      gl.clearColor(r2, g2, b2, a2);
      gl.clear(mask);
    }
    initFramebuffer(framebuffer) {
      const { gl } = this;
      const fbo = new GLFramebuffer(gl.createFramebuffer());
      fbo.multisample = this.detectSamples(framebuffer.multisample);
      framebuffer.glFramebuffers[this.CONTEXT_UID] = fbo;
      this.managedFramebuffers.push(framebuffer);
      framebuffer.disposeRunner.add(this);
      return fbo;
    }
    resizeFramebuffer(framebuffer) {
      const { gl } = this;
      const fbo = framebuffer.glFramebuffers[this.CONTEXT_UID];
      if (fbo.stencil) {
        gl.bindRenderbuffer(gl.RENDERBUFFER, fbo.stencil);
        if (fbo.msaaBuffer) {
          gl.renderbufferStorageMultisample(gl.RENDERBUFFER, fbo.multisample, gl.DEPTH24_STENCIL8, framebuffer.width, framebuffer.height);
        } else {
          gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, framebuffer.width, framebuffer.height);
        }
      }
      const colorTextures = framebuffer.colorTextures;
      let count = colorTextures.length;
      if (!gl.drawBuffers) {
        count = Math.min(count, 1);
      }
      for (let i2 = 0; i2 < count; i2++) {
        const texture = colorTextures[i2];
        const parentTexture = texture.parentTextureArray || texture;
        this.renderer.texture.bind(parentTexture, 0);
        if (i2 === 0 && fbo.msaaBuffer) {
          gl.bindRenderbuffer(gl.RENDERBUFFER, fbo.msaaBuffer);
          gl.renderbufferStorageMultisample(gl.RENDERBUFFER, fbo.multisample, parentTexture._glTextures[this.CONTEXT_UID].internalFormat, framebuffer.width, framebuffer.height);
        }
      }
      if (framebuffer.depthTexture && this.writeDepthTexture) {
        this.renderer.texture.bind(framebuffer.depthTexture, 0);
      }
    }
    updateFramebuffer(framebuffer, mipLevel) {
      const { gl } = this;
      const fbo = framebuffer.glFramebuffers[this.CONTEXT_UID];
      const colorTextures = framebuffer.colorTextures;
      let count = colorTextures.length;
      if (!gl.drawBuffers) {
        count = Math.min(count, 1);
      }
      if (fbo.multisample > 1 && this.canMultisampleFramebuffer(framebuffer)) {
        fbo.msaaBuffer = fbo.msaaBuffer || gl.createRenderbuffer();
      } else if (fbo.msaaBuffer) {
        gl.deleteRenderbuffer(fbo.msaaBuffer);
        fbo.msaaBuffer = null;
        if (fbo.blitFramebuffer) {
          fbo.blitFramebuffer.dispose();
          fbo.blitFramebuffer = null;
        }
      }
      const activeTextures = [];
      for (let i2 = 0; i2 < count; i2++) {
        const texture = colorTextures[i2];
        const parentTexture = texture.parentTextureArray || texture;
        this.renderer.texture.bind(parentTexture, 0);
        if (i2 === 0 && fbo.msaaBuffer) {
          gl.bindRenderbuffer(gl.RENDERBUFFER, fbo.msaaBuffer);
          gl.renderbufferStorageMultisample(gl.RENDERBUFFER, fbo.multisample, parentTexture._glTextures[this.CONTEXT_UID].internalFormat, framebuffer.width, framebuffer.height);
          gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, fbo.msaaBuffer);
        } else {
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i2, texture.target, parentTexture._glTextures[this.CONTEXT_UID].texture, mipLevel);
          activeTextures.push(gl.COLOR_ATTACHMENT0 + i2);
        }
      }
      if (activeTextures.length > 1) {
        gl.drawBuffers(activeTextures);
      }
      if (framebuffer.depthTexture) {
        const writeDepthTexture = this.writeDepthTexture;
        if (writeDepthTexture) {
          const depthTexture = framebuffer.depthTexture;
          this.renderer.texture.bind(depthTexture, 0);
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthTexture._glTextures[this.CONTEXT_UID].texture, mipLevel);
        }
      }
      if ((framebuffer.stencil || framebuffer.depth) && !(framebuffer.depthTexture && this.writeDepthTexture)) {
        fbo.stencil = fbo.stencil || gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, fbo.stencil);
        if (fbo.msaaBuffer) {
          gl.renderbufferStorageMultisample(gl.RENDERBUFFER, fbo.multisample, gl.DEPTH24_STENCIL8, framebuffer.width, framebuffer.height);
        } else {
          gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, framebuffer.width, framebuffer.height);
        }
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, fbo.stencil);
      } else if (fbo.stencil) {
        gl.deleteRenderbuffer(fbo.stencil);
        fbo.stencil = null;
      }
    }
    canMultisampleFramebuffer(framebuffer) {
      return this.renderer.context.webGLVersion !== 1 && framebuffer.colorTextures.length <= 1 && !framebuffer.depthTexture;
    }
    detectSamples(samples) {
      const { msaaSamples } = this;
      let res = MSAA_QUALITY.NONE;
      if (samples <= 1 || msaaSamples === null) {
        return res;
      }
      for (let i2 = 0; i2 < msaaSamples.length; i2++) {
        if (msaaSamples[i2] <= samples) {
          res = msaaSamples[i2];
          break;
        }
      }
      if (res === 1) {
        res = MSAA_QUALITY.NONE;
      }
      return res;
    }
    blit(framebuffer, sourcePixels, destPixels) {
      const { current, renderer, gl, CONTEXT_UID } = this;
      if (renderer.context.webGLVersion !== 2) {
        return;
      }
      if (!current) {
        return;
      }
      const fbo = current.glFramebuffers[CONTEXT_UID];
      if (!fbo) {
        return;
      }
      if (!framebuffer) {
        if (!fbo.msaaBuffer) {
          return;
        }
        const colorTexture = current.colorTextures[0];
        if (!colorTexture) {
          return;
        }
        if (!fbo.blitFramebuffer) {
          fbo.blitFramebuffer = new Framebuffer(current.width, current.height);
          fbo.blitFramebuffer.addColorTexture(0, colorTexture);
        }
        framebuffer = fbo.blitFramebuffer;
        if (framebuffer.colorTextures[0] !== colorTexture) {
          framebuffer.colorTextures[0] = colorTexture;
          framebuffer.dirtyId++;
          framebuffer.dirtyFormat++;
        }
        if (framebuffer.width !== current.width || framebuffer.height !== current.height) {
          framebuffer.width = current.width;
          framebuffer.height = current.height;
          framebuffer.dirtyId++;
          framebuffer.dirtySize++;
        }
      }
      if (!sourcePixels) {
        sourcePixels = tempRectangle;
        sourcePixels.width = current.width;
        sourcePixels.height = current.height;
      }
      if (!destPixels) {
        destPixels = sourcePixels;
      }
      const sameSize = sourcePixels.width === destPixels.width && sourcePixels.height === destPixels.height;
      this.bind(framebuffer);
      gl.bindFramebuffer(gl.READ_FRAMEBUFFER, fbo.framebuffer);
      gl.blitFramebuffer(sourcePixels.left, sourcePixels.top, sourcePixels.right, sourcePixels.bottom, destPixels.left, destPixels.top, destPixels.right, destPixels.bottom, gl.COLOR_BUFFER_BIT, sameSize ? gl.NEAREST : gl.LINEAR);
      gl.bindFramebuffer(gl.READ_FRAMEBUFFER, framebuffer.glFramebuffers[this.CONTEXT_UID].framebuffer);
    }
    disposeFramebuffer(framebuffer, contextLost) {
      const fbo = framebuffer.glFramebuffers[this.CONTEXT_UID];
      const gl = this.gl;
      if (!fbo) {
        return;
      }
      delete framebuffer.glFramebuffers[this.CONTEXT_UID];
      const index = this.managedFramebuffers.indexOf(framebuffer);
      if (index >= 0) {
        this.managedFramebuffers.splice(index, 1);
      }
      framebuffer.disposeRunner.remove(this);
      if (!contextLost) {
        gl.deleteFramebuffer(fbo.framebuffer);
        if (fbo.msaaBuffer) {
          gl.deleteRenderbuffer(fbo.msaaBuffer);
        }
        if (fbo.stencil) {
          gl.deleteRenderbuffer(fbo.stencil);
        }
      }
      if (fbo.blitFramebuffer) {
        this.disposeFramebuffer(fbo.blitFramebuffer, contextLost);
      }
    }
    disposeAll(contextLost) {
      const list = this.managedFramebuffers;
      this.managedFramebuffers = [];
      for (let i2 = 0; i2 < list.length; i2++) {
        this.disposeFramebuffer(list[i2], contextLost);
      }
    }
    forceStencil() {
      const framebuffer = this.current;
      if (!framebuffer) {
        return;
      }
      const fbo = framebuffer.glFramebuffers[this.CONTEXT_UID];
      if (!fbo || fbo.stencil) {
        return;
      }
      framebuffer.stencil = true;
      const w2 = framebuffer.width;
      const h2 = framebuffer.height;
      const gl = this.gl;
      const stencil = gl.createRenderbuffer();
      gl.bindRenderbuffer(gl.RENDERBUFFER, stencil);
      if (fbo.msaaBuffer) {
        gl.renderbufferStorageMultisample(gl.RENDERBUFFER, fbo.multisample, gl.DEPTH24_STENCIL8, w2, h2);
      } else {
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, w2, h2);
      }
      fbo.stencil = stencil;
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, stencil);
    }
    reset() {
      this.current = this.unknownFramebuffer;
      this.viewport = new Rectangle();
    }
    destroy() {
      this.renderer = null;
    }
  };
  FramebufferSystem.extension = {
    type: ExtensionType.RendererSystem,
    name: "framebuffer"
  };
  extensions.add(FramebufferSystem);

  // node_modules/@pixi/core/lib/geometry/GeometrySystem.mjs
  var byteSizeMap2 = { 5126: 4, 5123: 2, 5121: 1 };
  var GeometrySystem = class {
    constructor(renderer) {
      this.renderer = renderer;
      this._activeGeometry = null;
      this._activeVao = null;
      this.hasVao = true;
      this.hasInstance = true;
      this.canUseUInt32ElementIndex = false;
      this.managedGeometries = {};
    }
    contextChange() {
      this.disposeAll(true);
      const gl = this.gl = this.renderer.gl;
      const context2 = this.renderer.context;
      this.CONTEXT_UID = this.renderer.CONTEXT_UID;
      if (context2.webGLVersion !== 2) {
        let nativeVaoExtension = this.renderer.context.extensions.vertexArrayObject;
        if (settings.PREFER_ENV === ENV.WEBGL_LEGACY) {
          nativeVaoExtension = null;
        }
        if (nativeVaoExtension) {
          gl.createVertexArray = () => nativeVaoExtension.createVertexArrayOES();
          gl.bindVertexArray = (vao) => nativeVaoExtension.bindVertexArrayOES(vao);
          gl.deleteVertexArray = (vao) => nativeVaoExtension.deleteVertexArrayOES(vao);
        } else {
          this.hasVao = false;
          gl.createVertexArray = () => null;
          gl.bindVertexArray = () => null;
          gl.deleteVertexArray = () => null;
        }
      }
      if (context2.webGLVersion !== 2) {
        const instanceExt = gl.getExtension("ANGLE_instanced_arrays");
        if (instanceExt) {
          gl.vertexAttribDivisor = (a2, b2) => instanceExt.vertexAttribDivisorANGLE(a2, b2);
          gl.drawElementsInstanced = (a2, b2, c2, d2, e2) => instanceExt.drawElementsInstancedANGLE(a2, b2, c2, d2, e2);
          gl.drawArraysInstanced = (a2, b2, c2, d2) => instanceExt.drawArraysInstancedANGLE(a2, b2, c2, d2);
        } else {
          this.hasInstance = false;
        }
      }
      this.canUseUInt32ElementIndex = context2.webGLVersion === 2 || !!context2.extensions.uint32ElementIndex;
    }
    bind(geometry, shader) {
      shader = shader || this.renderer.shader.shader;
      const { gl } = this;
      let vaos = geometry.glVertexArrayObjects[this.CONTEXT_UID];
      let incRefCount = false;
      if (!vaos) {
        this.managedGeometries[geometry.id] = geometry;
        geometry.disposeRunner.add(this);
        geometry.glVertexArrayObjects[this.CONTEXT_UID] = vaos = {};
        incRefCount = true;
      }
      const vao = vaos[shader.program.id] || this.initGeometryVao(geometry, shader, incRefCount);
      this._activeGeometry = geometry;
      if (this._activeVao !== vao) {
        this._activeVao = vao;
        if (this.hasVao) {
          gl.bindVertexArray(vao);
        } else {
          this.activateVao(geometry, shader.program);
        }
      }
      this.updateBuffers();
    }
    reset() {
      this.unbind();
    }
    updateBuffers() {
      const geometry = this._activeGeometry;
      const bufferSystem = this.renderer.buffer;
      for (let i2 = 0; i2 < geometry.buffers.length; i2++) {
        const buffer = geometry.buffers[i2];
        bufferSystem.update(buffer);
      }
    }
    checkCompatibility(geometry, program) {
      const geometryAttributes = geometry.attributes;
      const shaderAttributes = program.attributeData;
      for (const j2 in shaderAttributes) {
        if (!geometryAttributes[j2]) {
          throw new Error(`shader and geometry incompatible, geometry missing the "${j2}" attribute`);
        }
      }
    }
    getSignature(geometry, program) {
      const attribs = geometry.attributes;
      const shaderAttributes = program.attributeData;
      const strings = ["g", geometry.id];
      for (const i2 in attribs) {
        if (shaderAttributes[i2]) {
          strings.push(i2, shaderAttributes[i2].location);
        }
      }
      return strings.join("-");
    }
    initGeometryVao(geometry, shader, incRefCount = true) {
      const gl = this.gl;
      const CONTEXT_UID = this.CONTEXT_UID;
      const bufferSystem = this.renderer.buffer;
      const program = shader.program;
      if (!program.glPrograms[CONTEXT_UID]) {
        this.renderer.shader.generateProgram(shader);
      }
      this.checkCompatibility(geometry, program);
      const signature = this.getSignature(geometry, program);
      const vaoObjectHash = geometry.glVertexArrayObjects[this.CONTEXT_UID];
      let vao = vaoObjectHash[signature];
      if (vao) {
        vaoObjectHash[program.id] = vao;
        return vao;
      }
      const buffers = geometry.buffers;
      const attributes = geometry.attributes;
      const tempStride = {};
      const tempStart = {};
      for (const j2 in buffers) {
        tempStride[j2] = 0;
        tempStart[j2] = 0;
      }
      for (const j2 in attributes) {
        if (!attributes[j2].size && program.attributeData[j2]) {
          attributes[j2].size = program.attributeData[j2].size;
        } else if (!attributes[j2].size) {
          console.warn(`PIXI Geometry attribute '${j2}' size cannot be determined (likely the bound shader does not have the attribute)`);
        }
        tempStride[attributes[j2].buffer] += attributes[j2].size * byteSizeMap2[attributes[j2].type];
      }
      for (const j2 in attributes) {
        const attribute = attributes[j2];
        const attribSize = attribute.size;
        if (attribute.stride === void 0) {
          if (tempStride[attribute.buffer] === attribSize * byteSizeMap2[attribute.type]) {
            attribute.stride = 0;
          } else {
            attribute.stride = tempStride[attribute.buffer];
          }
        }
        if (attribute.start === void 0) {
          attribute.start = tempStart[attribute.buffer];
          tempStart[attribute.buffer] += attribSize * byteSizeMap2[attribute.type];
        }
      }
      vao = gl.createVertexArray();
      gl.bindVertexArray(vao);
      for (let i2 = 0; i2 < buffers.length; i2++) {
        const buffer = buffers[i2];
        bufferSystem.bind(buffer);
        if (incRefCount) {
          buffer._glBuffers[CONTEXT_UID].refCount++;
        }
      }
      this.activateVao(geometry, program);
      vaoObjectHash[program.id] = vao;
      vaoObjectHash[signature] = vao;
      gl.bindVertexArray(null);
      bufferSystem.unbind(BUFFER_TYPE.ARRAY_BUFFER);
      return vao;
    }
    disposeGeometry(geometry, contextLost) {
      if (!this.managedGeometries[geometry.id]) {
        return;
      }
      delete this.managedGeometries[geometry.id];
      const vaos = geometry.glVertexArrayObjects[this.CONTEXT_UID];
      const gl = this.gl;
      const buffers = geometry.buffers;
      const bufferSystem = this.renderer?.buffer;
      geometry.disposeRunner.remove(this);
      if (!vaos) {
        return;
      }
      if (bufferSystem) {
        for (let i2 = 0; i2 < buffers.length; i2++) {
          const buf = buffers[i2]._glBuffers[this.CONTEXT_UID];
          if (buf) {
            buf.refCount--;
            if (buf.refCount === 0 && !contextLost) {
              bufferSystem.dispose(buffers[i2], contextLost);
            }
          }
        }
      }
      if (!contextLost) {
        for (const vaoId in vaos) {
          if (vaoId[0] === "g") {
            const vao = vaos[vaoId];
            if (this._activeVao === vao) {
              this.unbind();
            }
            gl.deleteVertexArray(vao);
          }
        }
      }
      delete geometry.glVertexArrayObjects[this.CONTEXT_UID];
    }
    disposeAll(contextLost) {
      const all = Object.keys(this.managedGeometries);
      for (let i2 = 0; i2 < all.length; i2++) {
        this.disposeGeometry(this.managedGeometries[all[i2]], contextLost);
      }
    }
    activateVao(geometry, program) {
      const gl = this.gl;
      const CONTEXT_UID = this.CONTEXT_UID;
      const bufferSystem = this.renderer.buffer;
      const buffers = geometry.buffers;
      const attributes = geometry.attributes;
      if (geometry.indexBuffer) {
        bufferSystem.bind(geometry.indexBuffer);
      }
      let lastBuffer = null;
      for (const j2 in attributes) {
        const attribute = attributes[j2];
        const buffer = buffers[attribute.buffer];
        const glBuffer = buffer._glBuffers[CONTEXT_UID];
        if (program.attributeData[j2]) {
          if (lastBuffer !== glBuffer) {
            bufferSystem.bind(buffer);
            lastBuffer = glBuffer;
          }
          const location = program.attributeData[j2].location;
          gl.enableVertexAttribArray(location);
          gl.vertexAttribPointer(location, attribute.size, attribute.type || gl.FLOAT, attribute.normalized, attribute.stride, attribute.start);
          if (attribute.instance) {
            if (this.hasInstance) {
              gl.vertexAttribDivisor(location, attribute.divisor);
            } else {
              throw new Error("geometry error, GPU Instancing is not supported on this device");
            }
          }
        }
      }
    }
    draw(type, size, start, instanceCount) {
      const { gl } = this;
      const geometry = this._activeGeometry;
      if (geometry.indexBuffer) {
        const byteSize = geometry.indexBuffer.data.BYTES_PER_ELEMENT;
        const glType = byteSize === 2 ? gl.UNSIGNED_SHORT : gl.UNSIGNED_INT;
        if (byteSize === 2 || byteSize === 4 && this.canUseUInt32ElementIndex) {
          if (geometry.instanced) {
            gl.drawElementsInstanced(type, size || geometry.indexBuffer.data.length, glType, (start || 0) * byteSize, instanceCount || 1);
          } else {
            gl.drawElements(type, size || geometry.indexBuffer.data.length, glType, (start || 0) * byteSize);
          }
        } else {
          console.warn("unsupported index buffer type: uint32");
        }
      } else if (geometry.instanced) {
        gl.drawArraysInstanced(type, start, size || geometry.getSize(), instanceCount || 1);
      } else {
        gl.drawArrays(type, start, size || geometry.getSize());
      }
      return this;
    }
    unbind() {
      this.gl.bindVertexArray(null);
      this._activeVao = null;
      this._activeGeometry = null;
    }
    destroy() {
      this.renderer = null;
    }
  };
  GeometrySystem.extension = {
    type: ExtensionType.RendererSystem,
    name: "geometry"
  };
  extensions.add(GeometrySystem);

  // node_modules/@pixi/core/lib/textures/TextureMatrix.mjs
  var tempMat = new Matrix();
  var TextureMatrix = class {
    constructor(texture, clampMargin) {
      this._texture = texture;
      this.mapCoord = new Matrix();
      this.uClampFrame = new Float32Array(4);
      this.uClampOffset = new Float32Array(2);
      this._textureID = -1;
      this._updateID = 0;
      this.clampOffset = 0;
      this.clampMargin = typeof clampMargin === "undefined" ? 0.5 : clampMargin;
      this.isSimple = false;
    }
    get texture() {
      return this._texture;
    }
    set texture(value) {
      this._texture = value;
      this._textureID = -1;
    }
    multiplyUvs(uvs, out) {
      if (out === void 0) {
        out = uvs;
      }
      const mat = this.mapCoord;
      for (let i2 = 0; i2 < uvs.length; i2 += 2) {
        const x2 = uvs[i2];
        const y2 = uvs[i2 + 1];
        out[i2] = x2 * mat.a + y2 * mat.c + mat.tx;
        out[i2 + 1] = x2 * mat.b + y2 * mat.d + mat.ty;
      }
      return out;
    }
    update(forceUpdate) {
      const tex = this._texture;
      if (!tex || !tex.valid) {
        return false;
      }
      if (!forceUpdate && this._textureID === tex._updateID) {
        return false;
      }
      this._textureID = tex._updateID;
      this._updateID++;
      const uvs = tex._uvs;
      this.mapCoord.set(uvs.x1 - uvs.x0, uvs.y1 - uvs.y0, uvs.x3 - uvs.x0, uvs.y3 - uvs.y0, uvs.x0, uvs.y0);
      const orig = tex.orig;
      const trim = tex.trim;
      if (trim) {
        tempMat.set(orig.width / trim.width, 0, 0, orig.height / trim.height, -trim.x / trim.width, -trim.y / trim.height);
        this.mapCoord.append(tempMat);
      }
      const texBase = tex.baseTexture;
      const frame = this.uClampFrame;
      const margin = this.clampMargin / texBase.resolution;
      const offset = this.clampOffset;
      frame[0] = (tex._frame.x + margin + offset) / texBase.width;
      frame[1] = (tex._frame.y + margin + offset) / texBase.height;
      frame[2] = (tex._frame.x + tex._frame.width - margin + offset) / texBase.width;
      frame[3] = (tex._frame.y + tex._frame.height - margin + offset) / texBase.height;
      this.uClampOffset[0] = offset / texBase.realWidth;
      this.uClampOffset[1] = offset / texBase.realHeight;
      this.isSimple = tex._frame.width === texBase.width && tex._frame.height === texBase.height && tex.rotate === 0;
      return true;
    }
  };

  // node_modules/@pixi/core/lib/filters/spriteMask/spriteMaskFilter2.mjs
  var fragment = "varying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform sampler2D mask;\nuniform float alpha;\nuniform float npmAlpha;\nuniform vec4 maskClamp;\n\nvoid main(void)\n{\n    float clip = step(3.5,\n        step(maskClamp.x, vMaskCoord.x) +\n        step(maskClamp.y, vMaskCoord.y) +\n        step(vMaskCoord.x, maskClamp.z) +\n        step(vMaskCoord.y, maskClamp.w));\n\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);\n\n    original *= (alphaMul * masky.r * alpha * clip);\n\n    gl_FragColor = original;\n}\n";

  // node_modules/@pixi/core/lib/filters/spriteMask/spriteMaskFilter3.mjs
  var vertex = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n";

  // node_modules/@pixi/core/lib/filters/spriteMask/SpriteMaskFilter.mjs
  var SpriteMaskFilter = class extends Filter {
    constructor(vertexSrc, fragmentSrc, uniforms) {
      let sprite = null;
      if (typeof vertexSrc !== "string" && fragmentSrc === void 0 && uniforms === void 0) {
        sprite = vertexSrc;
        vertexSrc = void 0;
        fragmentSrc = void 0;
        uniforms = void 0;
      }
      super(vertexSrc || vertex, fragmentSrc || fragment, uniforms);
      this.maskSprite = sprite;
      this.maskMatrix = new Matrix();
    }
    get maskSprite() {
      return this._maskSprite;
    }
    set maskSprite(value) {
      this._maskSprite = value;
      if (this._maskSprite) {
        this._maskSprite.renderable = false;
      }
    }
    apply(filterManager, input, output, clearMode) {
      const maskSprite = this._maskSprite;
      const tex = maskSprite._texture;
      if (!tex.valid) {
        return;
      }
      if (!tex.uvMatrix) {
        tex.uvMatrix = new TextureMatrix(tex, 0);
      }
      tex.uvMatrix.update();
      this.uniforms.npmAlpha = tex.baseTexture.alphaMode ? 0 : 1;
      this.uniforms.mask = tex;
      this.uniforms.otherMatrix = filterManager.calculateSpriteMatrix(this.maskMatrix, maskSprite).prepend(tex.uvMatrix.mapCoord);
      this.uniforms.alpha = maskSprite.worldAlpha;
      this.uniforms.maskClamp = tex.uvMatrix.uClampFrame;
      filterManager.applyFilter(this, input, output, clearMode);
    }
  };

  // node_modules/@pixi/core/lib/mask/MaskData.mjs
  var MaskData = class {
    constructor(maskObject = null) {
      this.type = MASK_TYPES.NONE;
      this.autoDetect = true;
      this.maskObject = maskObject || null;
      this.pooled = false;
      this.isMaskData = true;
      this.resolution = null;
      this.multisample = Filter.defaultMultisample;
      this.enabled = true;
      this.colorMask = 15;
      this._filters = null;
      this._stencilCounter = 0;
      this._scissorCounter = 0;
      this._scissorRect = null;
      this._scissorRectLocal = null;
      this._colorMask = 15;
      this._target = null;
    }
    get filter() {
      return this._filters ? this._filters[0] : null;
    }
    set filter(value) {
      if (value) {
        if (this._filters) {
          this._filters[0] = value;
        } else {
          this._filters = [value];
        }
      } else {
        this._filters = null;
      }
    }
    reset() {
      if (this.pooled) {
        this.maskObject = null;
        this.type = MASK_TYPES.NONE;
        this.autoDetect = true;
      }
      this._target = null;
      this._scissorRectLocal = null;
    }
    copyCountersOrReset(maskAbove) {
      if (maskAbove) {
        this._stencilCounter = maskAbove._stencilCounter;
        this._scissorCounter = maskAbove._scissorCounter;
        this._scissorRect = maskAbove._scissorRect;
      } else {
        this._stencilCounter = 0;
        this._scissorCounter = 0;
        this._scissorRect = null;
      }
    }
  };

  // node_modules/@pixi/core/lib/mask/MaskSystem.mjs
  var MaskSystem = class {
    constructor(renderer) {
      this.renderer = renderer;
      this.enableScissor = true;
      this.alphaMaskPool = [];
      this.maskDataPool = [];
      this.maskStack = [];
      this.alphaMaskIndex = 0;
    }
    setMaskStack(maskStack) {
      this.maskStack = maskStack;
      this.renderer.scissor.setMaskStack(maskStack);
      this.renderer.stencil.setMaskStack(maskStack);
    }
    push(target, maskDataOrTarget) {
      let maskData = maskDataOrTarget;
      if (!maskData.isMaskData) {
        const d2 = this.maskDataPool.pop() || new MaskData();
        d2.pooled = true;
        d2.maskObject = maskDataOrTarget;
        maskData = d2;
      }
      const maskAbove = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null;
      maskData.copyCountersOrReset(maskAbove);
      maskData._colorMask = maskAbove ? maskAbove._colorMask : 15;
      if (maskData.autoDetect) {
        this.detect(maskData);
      }
      maskData._target = target;
      if (maskData.type !== MASK_TYPES.SPRITE) {
        this.maskStack.push(maskData);
      }
      if (maskData.enabled) {
        switch (maskData.type) {
          case MASK_TYPES.SCISSOR:
            this.renderer.scissor.push(maskData);
            break;
          case MASK_TYPES.STENCIL:
            this.renderer.stencil.push(maskData);
            break;
          case MASK_TYPES.SPRITE:
            maskData.copyCountersOrReset(null);
            this.pushSpriteMask(maskData);
            break;
          case MASK_TYPES.COLOR:
            this.pushColorMask(maskData);
            break;
          default:
            break;
        }
      }
      if (maskData.type === MASK_TYPES.SPRITE) {
        this.maskStack.push(maskData);
      }
    }
    pop(target) {
      const maskData = this.maskStack.pop();
      if (!maskData || maskData._target !== target) {
        return;
      }
      if (maskData.enabled) {
        switch (maskData.type) {
          case MASK_TYPES.SCISSOR:
            this.renderer.scissor.pop(maskData);
            break;
          case MASK_TYPES.STENCIL:
            this.renderer.stencil.pop(maskData.maskObject);
            break;
          case MASK_TYPES.SPRITE:
            this.popSpriteMask(maskData);
            break;
          case MASK_TYPES.COLOR:
            this.popColorMask(maskData);
            break;
          default:
            break;
        }
      }
      maskData.reset();
      if (maskData.pooled) {
        this.maskDataPool.push(maskData);
      }
      if (this.maskStack.length !== 0) {
        const maskCurrent = this.maskStack[this.maskStack.length - 1];
        if (maskCurrent.type === MASK_TYPES.SPRITE && maskCurrent._filters) {
          maskCurrent._filters[0].maskSprite = maskCurrent.maskObject;
        }
      }
    }
    detect(maskData) {
      const maskObject = maskData.maskObject;
      if (!maskObject) {
        maskData.type = MASK_TYPES.COLOR;
      } else if (maskObject.isSprite) {
        maskData.type = MASK_TYPES.SPRITE;
      } else if (this.enableScissor && this.renderer.scissor.testScissor(maskData)) {
        maskData.type = MASK_TYPES.SCISSOR;
      } else {
        maskData.type = MASK_TYPES.STENCIL;
      }
    }
    pushSpriteMask(maskData) {
      const { maskObject } = maskData;
      const target = maskData._target;
      let alphaMaskFilter = maskData._filters;
      if (!alphaMaskFilter) {
        alphaMaskFilter = this.alphaMaskPool[this.alphaMaskIndex];
        if (!alphaMaskFilter) {
          alphaMaskFilter = this.alphaMaskPool[this.alphaMaskIndex] = [new SpriteMaskFilter()];
        }
      }
      const renderer = this.renderer;
      const renderTextureSystem = renderer.renderTexture;
      let resolution;
      let multisample;
      if (renderTextureSystem.current) {
        const renderTexture = renderTextureSystem.current;
        resolution = maskData.resolution || renderTexture.resolution;
        multisample = maskData.multisample ?? renderTexture.multisample;
      } else {
        resolution = maskData.resolution || renderer.resolution;
        multisample = maskData.multisample ?? renderer.multisample;
      }
      alphaMaskFilter[0].resolution = resolution;
      alphaMaskFilter[0].multisample = multisample;
      alphaMaskFilter[0].maskSprite = maskObject;
      const stashFilterArea = target.filterArea;
      target.filterArea = maskObject.getBounds(true);
      renderer.filter.push(target, alphaMaskFilter);
      target.filterArea = stashFilterArea;
      if (!maskData._filters) {
        this.alphaMaskIndex++;
      }
    }
    popSpriteMask(maskData) {
      this.renderer.filter.pop();
      if (maskData._filters) {
        maskData._filters[0].maskSprite = null;
      } else {
        this.alphaMaskIndex--;
        this.alphaMaskPool[this.alphaMaskIndex][0].maskSprite = null;
      }
    }
    pushColorMask(maskData) {
      const currColorMask = maskData._colorMask;
      const nextColorMask = maskData._colorMask = currColorMask & maskData.colorMask;
      if (nextColorMask !== currColorMask) {
        this.renderer.gl.colorMask((nextColorMask & 1) !== 0, (nextColorMask & 2) !== 0, (nextColorMask & 4) !== 0, (nextColorMask & 8) !== 0);
      }
    }
    popColorMask(maskData) {
      const currColorMask = maskData._colorMask;
      const nextColorMask = this.maskStack.length > 0 ? this.maskStack[this.maskStack.length - 1]._colorMask : 15;
      if (nextColorMask !== currColorMask) {
        this.renderer.gl.colorMask((nextColorMask & 1) !== 0, (nextColorMask & 2) !== 0, (nextColorMask & 4) !== 0, (nextColorMask & 8) !== 0);
      }
    }
    destroy() {
      this.renderer = null;
    }
  };
  MaskSystem.extension = {
    type: ExtensionType.RendererSystem,
    name: "mask"
  };
  extensions.add(MaskSystem);

  // node_modules/@pixi/core/lib/mask/AbstractMaskSystem.mjs
  var AbstractMaskSystem = class {
    constructor(renderer) {
      this.renderer = renderer;
      this.maskStack = [];
      this.glConst = 0;
    }
    getStackLength() {
      return this.maskStack.length;
    }
    setMaskStack(maskStack) {
      const { gl } = this.renderer;
      const curStackLen = this.getStackLength();
      this.maskStack = maskStack;
      const newStackLen = this.getStackLength();
      if (newStackLen !== curStackLen) {
        if (newStackLen === 0) {
          gl.disable(this.glConst);
        } else {
          gl.enable(this.glConst);
          this._useCurrent();
        }
      }
    }
    _useCurrent() {
    }
    destroy() {
      this.renderer = null;
      this.maskStack = null;
    }
  };

  // node_modules/@pixi/core/lib/mask/ScissorSystem.mjs
  var tempMatrix2 = new Matrix();
  var rectPool = [];
  var _ScissorSystem = class extends AbstractMaskSystem {
    constructor(renderer) {
      super(renderer);
      this.glConst = settings.ADAPTER.getWebGLRenderingContext().SCISSOR_TEST;
    }
    getStackLength() {
      const maskData = this.maskStack[this.maskStack.length - 1];
      if (maskData) {
        return maskData._scissorCounter;
      }
      return 0;
    }
    calcScissorRect(maskData) {
      if (maskData._scissorRectLocal) {
        return;
      }
      const prevData = maskData._scissorRect;
      const { maskObject } = maskData;
      const { renderer } = this;
      const renderTextureSystem = renderer.renderTexture;
      const rect = maskObject.getBounds(true, rectPool.pop() ?? new Rectangle());
      this.roundFrameToPixels(rect, renderTextureSystem.current ? renderTextureSystem.current.resolution : renderer.resolution, renderTextureSystem.sourceFrame, renderTextureSystem.destinationFrame, renderer.projection.transform);
      if (prevData) {
        rect.fit(prevData);
      }
      maskData._scissorRectLocal = rect;
    }
    static isMatrixRotated(matrix) {
      if (!matrix) {
        return false;
      }
      const { a: a2, b: b2, c: c2, d: d2 } = matrix;
      return (Math.abs(b2) > 1e-4 || Math.abs(c2) > 1e-4) && (Math.abs(a2) > 1e-4 || Math.abs(d2) > 1e-4);
    }
    testScissor(maskData) {
      const { maskObject } = maskData;
      if (!maskObject.isFastRect || !maskObject.isFastRect()) {
        return false;
      }
      if (_ScissorSystem.isMatrixRotated(maskObject.worldTransform)) {
        return false;
      }
      if (_ScissorSystem.isMatrixRotated(this.renderer.projection.transform)) {
        return false;
      }
      this.calcScissorRect(maskData);
      const rect = maskData._scissorRectLocal;
      return rect.width > 0 && rect.height > 0;
    }
    roundFrameToPixels(frame, resolution, bindingSourceFrame, bindingDestinationFrame, transform) {
      if (_ScissorSystem.isMatrixRotated(transform)) {
        return;
      }
      transform = transform ? tempMatrix2.copyFrom(transform) : tempMatrix2.identity();
      transform.translate(-bindingSourceFrame.x, -bindingSourceFrame.y).scale(bindingDestinationFrame.width / bindingSourceFrame.width, bindingDestinationFrame.height / bindingSourceFrame.height).translate(bindingDestinationFrame.x, bindingDestinationFrame.y);
      this.renderer.filter.transformAABB(transform, frame);
      frame.fit(bindingDestinationFrame);
      frame.x = Math.round(frame.x * resolution);
      frame.y = Math.round(frame.y * resolution);
      frame.width = Math.round(frame.width * resolution);
      frame.height = Math.round(frame.height * resolution);
    }
    push(maskData) {
      if (!maskData._scissorRectLocal) {
        this.calcScissorRect(maskData);
      }
      const { gl } = this.renderer;
      if (!maskData._scissorRect) {
        gl.enable(gl.SCISSOR_TEST);
      }
      maskData._scissorCounter++;
      maskData._scissorRect = maskData._scissorRectLocal;
      this._useCurrent();
    }
    pop(maskData) {
      const { gl } = this.renderer;
      if (maskData) {
        rectPool.push(maskData._scissorRectLocal);
      }
      if (this.getStackLength() > 0) {
        this._useCurrent();
      } else {
        gl.disable(gl.SCISSOR_TEST);
      }
    }
    _useCurrent() {
      const rect = this.maskStack[this.maskStack.length - 1]._scissorRect;
      let y2;
      if (this.renderer.renderTexture.current) {
        y2 = rect.y;
      } else {
        y2 = this.renderer.height - rect.height - rect.y;
      }
      this.renderer.gl.scissor(rect.x, y2, rect.width, rect.height);
    }
  };
  var ScissorSystem = _ScissorSystem;
  ScissorSystem.extension = {
    type: ExtensionType.RendererSystem,
    name: "scissor"
  };
  extensions.add(ScissorSystem);

  // node_modules/@pixi/core/lib/mask/StencilSystem.mjs
  var StencilSystem = class extends AbstractMaskSystem {
    constructor(renderer) {
      super(renderer);
      this.glConst = settings.ADAPTER.getWebGLRenderingContext().STENCIL_TEST;
    }
    getStackLength() {
      const maskData = this.maskStack[this.maskStack.length - 1];
      if (maskData) {
        return maskData._stencilCounter;
      }
      return 0;
    }
    push(maskData) {
      const maskObject = maskData.maskObject;
      const { gl } = this.renderer;
      const prevMaskCount = maskData._stencilCounter;
      if (prevMaskCount === 0) {
        this.renderer.framebuffer.forceStencil();
        gl.clearStencil(0);
        gl.clear(gl.STENCIL_BUFFER_BIT);
        gl.enable(gl.STENCIL_TEST);
      }
      maskData._stencilCounter++;
      const colorMask = maskData._colorMask;
      if (colorMask !== 0) {
        maskData._colorMask = 0;
        gl.colorMask(false, false, false, false);
      }
      gl.stencilFunc(gl.EQUAL, prevMaskCount, 4294967295);
      gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR);
      maskObject.renderable = true;
      maskObject.render(this.renderer);
      this.renderer.batch.flush();
      maskObject.renderable = false;
      if (colorMask !== 0) {
        maskData._colorMask = colorMask;
        gl.colorMask((colorMask & 1) !== 0, (colorMask & 2) !== 0, (colorMask & 4) !== 0, (colorMask & 8) !== 0);
      }
      this._useCurrent();
    }
    pop(maskObject) {
      const gl = this.renderer.gl;
      if (this.getStackLength() === 0) {
        gl.disable(gl.STENCIL_TEST);
      } else {
        const maskData = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null;
        const colorMask = maskData ? maskData._colorMask : 15;
        if (colorMask !== 0) {
          maskData._colorMask = 0;
          gl.colorMask(false, false, false, false);
        }
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR);
        maskObject.renderable = true;
        maskObject.render(this.renderer);
        this.renderer.batch.flush();
        maskObject.renderable = false;
        if (colorMask !== 0) {
          maskData._colorMask = colorMask;
          gl.colorMask((colorMask & 1) !== 0, (colorMask & 2) !== 0, (colorMask & 4) !== 0, (colorMask & 8) !== 0);
        }
        this._useCurrent();
      }
    }
    _useCurrent() {
      const gl = this.renderer.gl;
      gl.stencilFunc(gl.EQUAL, this.getStackLength(), 4294967295);
      gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
    }
  };
  StencilSystem.extension = {
    type: ExtensionType.RendererSystem,
    name: "stencil"
  };
  extensions.add(StencilSystem);

  // node_modules/@pixi/core/lib/plugin/PluginSystem.mjs
  var PluginSystem = class {
    constructor(renderer) {
      this.renderer = renderer;
      this.plugins = {};
      Object.defineProperties(this.plugins, {
        extract: {
          enumerable: false,
          get() {
            deprecation("7.0.0", "renderer.plugins.extract has moved to renderer.extract");
            return renderer.extract;
          }
        },
        prepare: {
          enumerable: false,
          get() {
            deprecation("7.0.0", "renderer.plugins.prepare has moved to renderer.prepare");
            return renderer.prepare;
          }
        },
        interaction: {
          enumerable: false,
          get() {
            deprecation("7.0.0", "renderer.plugins.interaction has been deprecated, use renderer.events");
            return renderer.events;
          }
        }
      });
    }
    init() {
      const staticMap = this.rendererPlugins;
      for (const o2 in staticMap) {
        this.plugins[o2] = new staticMap[o2](this.renderer);
      }
    }
    destroy() {
      for (const o2 in this.plugins) {
        this.plugins[o2].destroy();
        this.plugins[o2] = null;
      }
    }
  };
  PluginSystem.extension = {
    type: [
      ExtensionType.RendererSystem,
      ExtensionType.CanvasRendererSystem
    ],
    name: "_plugin"
  };
  extensions.add(PluginSystem);

  // node_modules/@pixi/core/lib/projection/ProjectionSystem.mjs
  var ProjectionSystem = class {
    constructor(renderer) {
      this.renderer = renderer;
      this.destinationFrame = null;
      this.sourceFrame = null;
      this.defaultFrame = null;
      this.projectionMatrix = new Matrix();
      this.transform = null;
    }
    update(destinationFrame, sourceFrame, resolution, root) {
      this.destinationFrame = destinationFrame || this.destinationFrame || this.defaultFrame;
      this.sourceFrame = sourceFrame || this.sourceFrame || destinationFrame;
      this.calculateProjection(this.destinationFrame, this.sourceFrame, resolution, root);
      if (this.transform) {
        this.projectionMatrix.append(this.transform);
      }
      const renderer = this.renderer;
      renderer.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix;
      renderer.globalUniforms.update();
      if (renderer.shader.shader) {
        renderer.shader.syncUniformGroup(renderer.shader.shader.uniforms.globals);
      }
    }
    calculateProjection(_destinationFrame, sourceFrame, _resolution, root) {
      const pm = this.projectionMatrix;
      const sign2 = !root ? 1 : -1;
      pm.identity();
      pm.a = 1 / sourceFrame.width * 2;
      pm.d = sign2 * (1 / sourceFrame.height * 2);
      pm.tx = -1 - sourceFrame.x * pm.a;
      pm.ty = -sign2 - sourceFrame.y * pm.d;
    }
    setTransform(_matrix) {
    }
    destroy() {
      this.renderer = null;
    }
  };
  ProjectionSystem.extension = {
    type: ExtensionType.RendererSystem,
    name: "projection"
  };
  extensions.add(ProjectionSystem);

  // node_modules/@pixi/core/lib/renderTexture/GenerateTextureSystem.mjs
  var tempTransform = new Transform();
  var GenerateTextureSystem = class {
    constructor(renderer) {
      this.renderer = renderer;
      this._tempMatrix = new Matrix();
    }
    generateTexture(displayObject, options) {
      const { region: manualRegion, ...textureOptions } = options || {};
      const region = manualRegion || displayObject.getLocalBounds(null, true);
      if (region.width === 0)
        region.width = 1;
      if (region.height === 0)
        region.height = 1;
      const renderTexture = RenderTexture.create({
        width: region.width,
        height: region.height,
        ...textureOptions
      });
      this._tempMatrix.tx = -region.x;
      this._tempMatrix.ty = -region.y;
      const transform = displayObject.transform;
      displayObject.transform = tempTransform;
      this.renderer.render(displayObject, {
        renderTexture,
        transform: this._tempMatrix,
        skipUpdateTransform: !!displayObject.parent,
        blit: true
      });
      displayObject.transform = transform;
      return renderTexture;
    }
    destroy() {
    }
  };
  GenerateTextureSystem.extension = {
    type: [
      ExtensionType.RendererSystem,
      ExtensionType.CanvasRendererSystem
    ],
    name: "textureGenerator"
  };
  extensions.add(GenerateTextureSystem);

  // node_modules/@pixi/core/lib/renderTexture/RenderTextureSystem.mjs
  var tempRect = new Rectangle();
  var tempRect2 = new Rectangle();
  var RenderTextureSystem = class {
    constructor(renderer) {
      this.renderer = renderer;
      this.defaultMaskStack = [];
      this.current = null;
      this.sourceFrame = new Rectangle();
      this.destinationFrame = new Rectangle();
      this.viewportFrame = new Rectangle();
    }
    contextChange() {
      const attributes = this.renderer?.gl.getContextAttributes();
      this._rendererPremultipliedAlpha = !!(attributes && attributes.alpha && attributes.premultipliedAlpha);
    }
    bind(renderTexture = null, sourceFrame, destinationFrame) {
      const renderer = this.renderer;
      this.current = renderTexture;
      let baseTexture;
      let framebuffer;
      let resolution;
      if (renderTexture) {
        baseTexture = renderTexture.baseTexture;
        resolution = baseTexture.resolution;
        if (!sourceFrame) {
          tempRect.width = renderTexture.frame.width;
          tempRect.height = renderTexture.frame.height;
          sourceFrame = tempRect;
        }
        if (!destinationFrame) {
          tempRect2.x = renderTexture.frame.x;
          tempRect2.y = renderTexture.frame.y;
          tempRect2.width = sourceFrame.width;
          tempRect2.height = sourceFrame.height;
          destinationFrame = tempRect2;
        }
        framebuffer = baseTexture.framebuffer;
      } else {
        resolution = renderer.resolution;
        if (!sourceFrame) {
          tempRect.width = renderer._view.screen.width;
          tempRect.height = renderer._view.screen.height;
          sourceFrame = tempRect;
        }
        if (!destinationFrame) {
          destinationFrame = tempRect;
          destinationFrame.width = sourceFrame.width;
          destinationFrame.height = sourceFrame.height;
        }
      }
      const viewportFrame = this.viewportFrame;
      viewportFrame.x = destinationFrame.x * resolution;
      viewportFrame.y = destinationFrame.y * resolution;
      viewportFrame.width = destinationFrame.width * resolution;
      viewportFrame.height = destinationFrame.height * resolution;
      if (!renderTexture) {
        viewportFrame.y = renderer.view.height - (viewportFrame.y + viewportFrame.height);
      }
      viewportFrame.ceil();
      this.renderer.framebuffer.bind(framebuffer, viewportFrame);
      this.renderer.projection.update(destinationFrame, sourceFrame, resolution, !framebuffer);
      if (renderTexture) {
        this.renderer.mask.setMaskStack(baseTexture.maskStack);
      } else {
        this.renderer.mask.setMaskStack(this.defaultMaskStack);
      }
      this.sourceFrame.copyFrom(sourceFrame);
      this.destinationFrame.copyFrom(destinationFrame);
    }
    clear(clearColor, mask) {
      const fallbackColor = this.current ? this.current.baseTexture.clear : this.renderer.background.backgroundColor;
      const color = Color.shared.setValue(clearColor ? clearColor : fallbackColor);
      if (this.current && this.current.baseTexture.alphaMode > 0 || !this.current && this._rendererPremultipliedAlpha) {
        color.premultiply(color.alpha);
      }
      const destinationFrame = this.destinationFrame;
      const baseFrame = this.current ? this.current.baseTexture : this.renderer._view.screen;
      const clearMask = destinationFrame.width !== baseFrame.width || destinationFrame.height !== baseFrame.height;
      if (clearMask) {
        let { x: x2, y: y2, width, height } = this.viewportFrame;
        x2 = Math.round(x2);
        y2 = Math.round(y2);
        width = Math.round(width);
        height = Math.round(height);
        this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST);
        this.renderer.gl.scissor(x2, y2, width, height);
      }
      this.renderer.framebuffer.clear(color.red, color.green, color.blue, color.alpha, mask);
      if (clearMask) {
        this.renderer.scissor.pop();
      }
    }
    resize() {
      this.bind(null);
    }
    reset() {
      this.bind(null);
    }
    destroy() {
      this.renderer = null;
    }
  };
  RenderTextureSystem.extension = {
    type: ExtensionType.RendererSystem,
    name: "renderTexture"
  };
  extensions.add(RenderTextureSystem);

  // node_modules/@pixi/core/lib/shader/GLProgram.mjs
  var GLProgram = class {
    constructor(program, uniformData) {
      this.program = program;
      this.uniformData = uniformData;
      this.uniformGroups = {};
      this.uniformDirtyGroups = {};
      this.uniformBufferBindings = {};
    }
    destroy() {
      this.uniformData = null;
      this.uniformGroups = null;
      this.uniformDirtyGroups = null;
      this.uniformBufferBindings = null;
      this.program = null;
    }
  };

  // node_modules/@pixi/core/lib/shader/utils/getAttributeData.mjs
  function getAttributeData(program, gl) {
    const attributes = {};
    const totalAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (let i2 = 0; i2 < totalAttributes; i2++) {
      const attribData = gl.getActiveAttrib(program, i2);
      if (attribData.name.startsWith("gl_")) {
        continue;
      }
      const type = mapType(gl, attribData.type);
      const data = {
        type,
        name: attribData.name,
        size: mapSize(type),
        location: gl.getAttribLocation(program, attribData.name)
      };
      attributes[attribData.name] = data;
    }
    return attributes;
  }

  // node_modules/@pixi/core/lib/shader/utils/getUniformData.mjs
  function getUniformData(program, gl) {
    const uniforms = {};
    const totalUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i2 = 0; i2 < totalUniforms; i2++) {
      const uniformData = gl.getActiveUniform(program, i2);
      const name = uniformData.name.replace(/\[.*?\]$/, "");
      const isArray = !!uniformData.name.match(/\[.*?\]$/);
      const type = mapType(gl, uniformData.type);
      uniforms[name] = {
        name,
        index: i2,
        type,
        size: uniformData.size,
        isArray,
        value: defaultValue(type, uniformData.size)
      };
    }
    return uniforms;
  }

  // node_modules/@pixi/core/lib/shader/utils/generateProgram.mjs
  function generateProgram(gl, program) {
    const glVertShader = compileShader(gl, gl.VERTEX_SHADER, program.vertexSrc);
    const glFragShader = compileShader(gl, gl.FRAGMENT_SHADER, program.fragmentSrc);
    const webGLProgram = gl.createProgram();
    gl.attachShader(webGLProgram, glVertShader);
    gl.attachShader(webGLProgram, glFragShader);
    const transformFeedbackVaryings = program.extra?.transformFeedbackVaryings;
    if (transformFeedbackVaryings) {
      if (typeof gl.transformFeedbackVaryings !== "function") {
        console.warn(`TransformFeedback is not supported but TransformFeedbackVaryings are given.`);
      } else {
        gl.transformFeedbackVaryings(webGLProgram, transformFeedbackVaryings.names, transformFeedbackVaryings.bufferMode === "separate" ? gl.SEPARATE_ATTRIBS : gl.INTERLEAVED_ATTRIBS);
      }
    }
    gl.linkProgram(webGLProgram);
    if (!gl.getProgramParameter(webGLProgram, gl.LINK_STATUS)) {
      logProgramError(gl, webGLProgram, glVertShader, glFragShader);
    }
    program.attributeData = getAttributeData(webGLProgram, gl);
    program.uniformData = getUniformData(webGLProgram, gl);
    if (!/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(program.vertexSrc)) {
      const keys = Object.keys(program.attributeData);
      keys.sort((a2, b2) => a2 > b2 ? 1 : -1);
      for (let i2 = 0; i2 < keys.length; i2++) {
        program.attributeData[keys[i2]].location = i2;
        gl.bindAttribLocation(webGLProgram, i2, keys[i2]);
      }
      gl.linkProgram(webGLProgram);
    }
    gl.deleteShader(glVertShader);
    gl.deleteShader(glFragShader);
    const uniformData = {};
    for (const i2 in program.uniformData) {
      const data = program.uniformData[i2];
      uniformData[i2] = {
        location: gl.getUniformLocation(webGLProgram, i2),
        value: defaultValue(data.type, data.size)
      };
    }
    const glProgram = new GLProgram(webGLProgram, uniformData);
    return glProgram;
  }

  // node_modules/@pixi/core/lib/shader/utils/generateUniformBufferSync.mjs
  function uboUpdate(_ud, _uv, _renderer, _syncData, buffer) {
    _renderer.buffer.update(buffer);
  }
  var UBO_TO_SINGLE_SETTERS = {
    float: `
        data[offset] = v;
    `,
    vec2: `
        data[offset] = v[0];
        data[offset+1] = v[1];
    `,
    vec3: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

    `,
    vec4: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];
        data[offset+3] = v[3];
    `,
    mat2: `
        data[offset] = v[0];
        data[offset+1] = v[1];

        data[offset+4] = v[2];
        data[offset+5] = v[3];
    `,
    mat3: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];

        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];
    `,
    mat4: `
        for(var i = 0; i < 16; i++)
        {
            data[offset + i] = v[i];
        }
    `
  };
  var GLSL_TO_STD40_SIZE = {
    float: 4,
    vec2: 8,
    vec3: 12,
    vec4: 16,
    int: 4,
    ivec2: 8,
    ivec3: 12,
    ivec4: 16,
    uint: 4,
    uvec2: 8,
    uvec3: 12,
    uvec4: 16,
    bool: 4,
    bvec2: 8,
    bvec3: 12,
    bvec4: 16,
    mat2: 16 * 2,
    mat3: 16 * 3,
    mat4: 16 * 4
  };
  function createUBOElements(uniformData) {
    const uboElements = uniformData.map((data) => ({
      data,
      offset: 0,
      dataLen: 0,
      dirty: 0
    }));
    let size = 0;
    let chunkSize = 0;
    let offset = 0;
    for (let i2 = 0; i2 < uboElements.length; i2++) {
      const uboElement = uboElements[i2];
      size = GLSL_TO_STD40_SIZE[uboElement.data.type];
      if (uboElement.data.size > 1) {
        size = Math.max(size, 16) * uboElement.data.size;
      }
      uboElement.dataLen = size;
      if (chunkSize % size !== 0 && chunkSize < 16) {
        const lineUpValue = chunkSize % size % 16;
        chunkSize += lineUpValue;
        offset += lineUpValue;
      }
      if (chunkSize + size > 16) {
        offset = Math.ceil(offset / 16) * 16;
        uboElement.offset = offset;
        offset += size;
        chunkSize = size;
      } else {
        uboElement.offset = offset;
        chunkSize += size;
        offset += size;
      }
    }
    offset = Math.ceil(offset / 16) * 16;
    return { uboElements, size: offset };
  }
  function getUBOData(uniforms, uniformData) {
    const usedUniformDatas = [];
    for (const i2 in uniforms) {
      if (uniformData[i2]) {
        usedUniformDatas.push(uniformData[i2]);
      }
    }
    usedUniformDatas.sort((a2, b2) => a2.index - b2.index);
    return usedUniformDatas;
  }
  function generateUniformBufferSync(group, uniformData) {
    if (!group.autoManage) {
      return { size: 0, syncFunc: uboUpdate };
    }
    const usedUniformDatas = getUBOData(group.uniforms, uniformData);
    const { uboElements, size } = createUBOElements(usedUniformDatas);
    const funcFragments = [`
    var v = null;
    var v2 = null;
    var cv = null;
    var t = 0;
    var gl = renderer.gl
    var index = 0;
    var data = buffer.data;
    `];
    for (let i2 = 0; i2 < uboElements.length; i2++) {
      const uboElement = uboElements[i2];
      const uniform = group.uniforms[uboElement.data.name];
      const name = uboElement.data.name;
      let parsed = false;
      for (let j2 = 0; j2 < uniformParsers.length; j2++) {
        const uniformParser = uniformParsers[j2];
        if (uniformParser.codeUbo && uniformParser.test(uboElement.data, uniform)) {
          funcFragments.push(`offset = ${uboElement.offset / 4};`, uniformParsers[j2].codeUbo(uboElement.data.name, uniform));
          parsed = true;
          break;
        }
      }
      if (!parsed) {
        if (uboElement.data.size > 1) {
          const size2 = mapSize(uboElement.data.type);
          const rowSize = Math.max(GLSL_TO_STD40_SIZE[uboElement.data.type] / 16, 1);
          const elementSize = size2 / rowSize;
          const remainder = (4 - elementSize % 4) % 4;
          funcFragments.push(`
                cv = ud.${name}.value;
                v = uv.${name};
                offset = ${uboElement.offset / 4};

                t = 0;

                for(var i=0; i < ${uboElement.data.size * rowSize}; i++)
                {
                    for(var j = 0; j < ${elementSize}; j++)
                    {
                        data[offset++] = v[t++];
                    }
                    offset += ${remainder};
                }

                `);
        } else {
          const template = UBO_TO_SINGLE_SETTERS[uboElement.data.type];
          funcFragments.push(`
                cv = ud.${name}.value;
                v = uv.${name};
                offset = ${uboElement.offset / 4};
                ${template};
                `);
        }
      }
    }
    funcFragments.push(`
       renderer.buffer.update(buffer);
    `);
    return {
      size,
      syncFunc: new Function("ud", "uv", "renderer", "syncData", "buffer", funcFragments.join("\n"))
    };
  }

  // node_modules/@pixi/core/lib/shader/ShaderSystem.mjs
  var UID5 = 0;
  var defaultSyncData = { textureCount: 0, uboCount: 0 };
  var ShaderSystem = class {
    constructor(renderer) {
      this.destroyed = false;
      this.renderer = renderer;
      this.systemCheck();
      this.gl = null;
      this.shader = null;
      this.program = null;
      this.cache = {};
      this._uboCache = {};
      this.id = UID5++;
    }
    systemCheck() {
      if (!unsafeEvalSupported()) {
        throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.");
      }
    }
    contextChange(gl) {
      this.gl = gl;
      this.reset();
    }
    bind(shader, dontSync) {
      shader.disposeRunner.add(this);
      shader.uniforms.globals = this.renderer.globalUniforms;
      const program = shader.program;
      const glProgram = program.glPrograms[this.renderer.CONTEXT_UID] || this.generateProgram(shader);
      this.shader = shader;
      if (this.program !== program) {
        this.program = program;
        this.gl.useProgram(glProgram.program);
      }
      if (!dontSync) {
        defaultSyncData.textureCount = 0;
        defaultSyncData.uboCount = 0;
        this.syncUniformGroup(shader.uniformGroup, defaultSyncData);
      }
      return glProgram;
    }
    setUniforms(uniforms) {
      const shader = this.shader.program;
      const glProgram = shader.glPrograms[this.renderer.CONTEXT_UID];
      shader.syncUniforms(glProgram.uniformData, uniforms, this.renderer);
    }
    syncUniformGroup(group, syncData) {
      const glProgram = this.getGlProgram();
      if (!group.static || group.dirtyId !== glProgram.uniformDirtyGroups[group.id]) {
        glProgram.uniformDirtyGroups[group.id] = group.dirtyId;
        this.syncUniforms(group, glProgram, syncData);
      }
    }
    syncUniforms(group, glProgram, syncData) {
      const syncFunc = group.syncUniforms[this.shader.program.id] || this.createSyncGroups(group);
      syncFunc(glProgram.uniformData, group.uniforms, this.renderer, syncData);
    }
    createSyncGroups(group) {
      const id = this.getSignature(group, this.shader.program.uniformData, "u");
      if (!this.cache[id]) {
        this.cache[id] = generateUniformsSync(group, this.shader.program.uniformData);
      }
      group.syncUniforms[this.shader.program.id] = this.cache[id];
      return group.syncUniforms[this.shader.program.id];
    }
    syncUniformBufferGroup(group, name) {
      const glProgram = this.getGlProgram();
      if (!group.static || group.dirtyId !== 0 || !glProgram.uniformGroups[group.id]) {
        group.dirtyId = 0;
        const syncFunc = glProgram.uniformGroups[group.id] || this.createSyncBufferGroup(group, glProgram, name);
        group.buffer.update();
        syncFunc(glProgram.uniformData, group.uniforms, this.renderer, defaultSyncData, group.buffer);
      }
      this.renderer.buffer.bindBufferBase(group.buffer, glProgram.uniformBufferBindings[name]);
    }
    createSyncBufferGroup(group, glProgram, name) {
      const { gl } = this.renderer;
      this.renderer.buffer.bind(group.buffer);
      const uniformBlockIndex = this.gl.getUniformBlockIndex(glProgram.program, name);
      glProgram.uniformBufferBindings[name] = this.shader.uniformBindCount;
      gl.uniformBlockBinding(glProgram.program, uniformBlockIndex, this.shader.uniformBindCount);
      this.shader.uniformBindCount++;
      const id = this.getSignature(group, this.shader.program.uniformData, "ubo");
      let uboData = this._uboCache[id];
      if (!uboData) {
        uboData = this._uboCache[id] = generateUniformBufferSync(group, this.shader.program.uniformData);
      }
      if (group.autoManage) {
        const data = new Float32Array(uboData.size / 4);
        group.buffer.update(data);
      }
      glProgram.uniformGroups[group.id] = uboData.syncFunc;
      return glProgram.uniformGroups[group.id];
    }
    getSignature(group, uniformData, preFix) {
      const uniforms = group.uniforms;
      const strings = [`${preFix}-`];
      for (const i2 in uniforms) {
        strings.push(i2);
        if (uniformData[i2]) {
          strings.push(uniformData[i2].type);
        }
      }
      return strings.join("-");
    }
    getGlProgram() {
      if (this.shader) {
        return this.shader.program.glPrograms[this.renderer.CONTEXT_UID];
      }
      return null;
    }
    generateProgram(shader) {
      const gl = this.gl;
      const program = shader.program;
      const glProgram = generateProgram(gl, program);
      program.glPrograms[this.renderer.CONTEXT_UID] = glProgram;
      return glProgram;
    }
    reset() {
      this.program = null;
      this.shader = null;
    }
    disposeShader(shader) {
      if (this.shader === shader) {
        this.shader = null;
      }
    }
    destroy() {
      this.renderer = null;
      this.destroyed = true;
    }
  };
  ShaderSystem.extension = {
    type: ExtensionType.RendererSystem,
    name: "shader"
  };
  extensions.add(ShaderSystem);

  // node_modules/@pixi/core/lib/startup/StartupSystem.mjs
  var StartupSystem = class {
    constructor(renderer) {
      this.renderer = renderer;
    }
    run(options) {
      const { renderer } = this;
      renderer.runners.init.emit(renderer.options);
      if (options.hello) {
        console.log(`PixiJS ${"7.2.4"} - ${renderer.rendererLogId} - https://pixijs.com`);
      }
      renderer.resize(renderer.screen.width, renderer.screen.height);
    }
    destroy() {
    }
  };
  StartupSystem.defaultOptions = {
    hello: false
  };
  StartupSystem.extension = {
    type: [
      ExtensionType.RendererSystem,
      ExtensionType.CanvasRendererSystem
    ],
    name: "startup"
  };
  extensions.add(StartupSystem);

  // node_modules/@pixi/core/lib/state/utils/mapWebGLBlendModesToPixi.mjs
  function mapWebGLBlendModesToPixi(gl, array = []) {
    array[BLEND_MODES.NORMAL] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[BLEND_MODES.ADD] = [gl.ONE, gl.ONE];
    array[BLEND_MODES.MULTIPLY] = [gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[BLEND_MODES.SCREEN] = [gl.ONE, gl.ONE_MINUS_SRC_COLOR, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[BLEND_MODES.OVERLAY] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[BLEND_MODES.DARKEN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[BLEND_MODES.LIGHTEN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[BLEND_MODES.COLOR_DODGE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[BLEND_MODES.COLOR_BURN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[BLEND_MODES.HARD_LIGHT] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[BLEND_MODES.SOFT_LIGHT] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[BLEND_MODES.DIFFERENCE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[BLEND_MODES.EXCLUSION] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[BLEND_MODES.HUE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[BLEND_MODES.SATURATION] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[BLEND_MODES.COLOR] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[BLEND_MODES.LUMINOSITY] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[BLEND_MODES.NONE] = [0, 0];
    array[BLEND_MODES.NORMAL_NPM] = [gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[BLEND_MODES.ADD_NPM] = [gl.SRC_ALPHA, gl.ONE, gl.ONE, gl.ONE];
    array[BLEND_MODES.SCREEN_NPM] = [gl.SRC_ALPHA, gl.ONE_MINUS_SRC_COLOR, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[BLEND_MODES.SRC_IN] = [gl.DST_ALPHA, gl.ZERO];
    array[BLEND_MODES.SRC_OUT] = [gl.ONE_MINUS_DST_ALPHA, gl.ZERO];
    array[BLEND_MODES.SRC_ATOP] = [gl.DST_ALPHA, gl.ONE_MINUS_SRC_ALPHA];
    array[BLEND_MODES.DST_OVER] = [gl.ONE_MINUS_DST_ALPHA, gl.ONE];
    array[BLEND_MODES.DST_IN] = [gl.ZERO, gl.SRC_ALPHA];
    array[BLEND_MODES.DST_OUT] = [gl.ZERO, gl.ONE_MINUS_SRC_ALPHA];
    array[BLEND_MODES.DST_ATOP] = [gl.ONE_MINUS_DST_ALPHA, gl.SRC_ALPHA];
    array[BLEND_MODES.XOR] = [gl.ONE_MINUS_DST_ALPHA, gl.ONE_MINUS_SRC_ALPHA];
    array[BLEND_MODES.SUBTRACT] = [gl.ONE, gl.ONE, gl.ONE, gl.ONE, gl.FUNC_REVERSE_SUBTRACT, gl.FUNC_ADD];
    return array;
  }

  // node_modules/@pixi/core/lib/state/StateSystem.mjs
  var BLEND2 = 0;
  var OFFSET2 = 1;
  var CULLING2 = 2;
  var DEPTH_TEST2 = 3;
  var WINDING2 = 4;
  var DEPTH_MASK2 = 5;
  var _StateSystem = class {
    constructor() {
      this.gl = null;
      this.stateId = 0;
      this.polygonOffset = 0;
      this.blendMode = BLEND_MODES.NONE;
      this._blendEq = false;
      this.map = [];
      this.map[BLEND2] = this.setBlend;
      this.map[OFFSET2] = this.setOffset;
      this.map[CULLING2] = this.setCullFace;
      this.map[DEPTH_TEST2] = this.setDepthTest;
      this.map[WINDING2] = this.setFrontFace;
      this.map[DEPTH_MASK2] = this.setDepthMask;
      this.checks = [];
      this.defaultState = new State();
      this.defaultState.blend = true;
    }
    contextChange(gl) {
      this.gl = gl;
      this.blendModes = mapWebGLBlendModesToPixi(gl);
      this.set(this.defaultState);
      this.reset();
    }
    set(state) {
      state = state || this.defaultState;
      if (this.stateId !== state.data) {
        let diff = this.stateId ^ state.data;
        let i2 = 0;
        while (diff) {
          if (diff & 1) {
            this.map[i2].call(this, !!(state.data & 1 << i2));
          }
          diff = diff >> 1;
          i2++;
        }
        this.stateId = state.data;
      }
      for (let i2 = 0; i2 < this.checks.length; i2++) {
        this.checks[i2](this, state);
      }
    }
    forceState(state) {
      state = state || this.defaultState;
      for (let i2 = 0; i2 < this.map.length; i2++) {
        this.map[i2].call(this, !!(state.data & 1 << i2));
      }
      for (let i2 = 0; i2 < this.checks.length; i2++) {
        this.checks[i2](this, state);
      }
      this.stateId = state.data;
    }
    setBlend(value) {
      this.updateCheck(_StateSystem.checkBlendMode, value);
      this.gl[value ? "enable" : "disable"](this.gl.BLEND);
    }
    setOffset(value) {
      this.updateCheck(_StateSystem.checkPolygonOffset, value);
      this.gl[value ? "enable" : "disable"](this.gl.POLYGON_OFFSET_FILL);
    }
    setDepthTest(value) {
      this.gl[value ? "enable" : "disable"](this.gl.DEPTH_TEST);
    }
    setDepthMask(value) {
      this.gl.depthMask(value);
    }
    setCullFace(value) {
      this.gl[value ? "enable" : "disable"](this.gl.CULL_FACE);
    }
    setFrontFace(value) {
      this.gl.frontFace(this.gl[value ? "CW" : "CCW"]);
    }
    setBlendMode(value) {
      if (value === this.blendMode) {
        return;
      }
      this.blendMode = value;
      const mode = this.blendModes[value];
      const gl = this.gl;
      if (mode.length === 2) {
        gl.blendFunc(mode[0], mode[1]);
      } else {
        gl.blendFuncSeparate(mode[0], mode[1], mode[2], mode[3]);
      }
      if (mode.length === 6) {
        this._blendEq = true;
        gl.blendEquationSeparate(mode[4], mode[5]);
      } else if (this._blendEq) {
        this._blendEq = false;
        gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
      }
    }
    setPolygonOffset(value, scale) {
      this.gl.polygonOffset(value, scale);
    }
    reset() {
      this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, false);
      this.forceState(this.defaultState);
      this._blendEq = true;
      this.blendMode = -1;
      this.setBlendMode(0);
    }
    updateCheck(func, value) {
      const index = this.checks.indexOf(func);
      if (value && index === -1) {
        this.checks.push(func);
      } else if (!value && index !== -1) {
        this.checks.splice(index, 1);
      }
    }
    static checkBlendMode(system, state) {
      system.setBlendMode(state.blendMode);
    }
    static checkPolygonOffset(system, state) {
      system.setPolygonOffset(1, state.polygonOffset);
    }
    destroy() {
      this.gl = null;
    }
  };
  var StateSystem = _StateSystem;
  StateSystem.extension = {
    type: ExtensionType.RendererSystem,
    name: "state"
  };
  extensions.add(StateSystem);

  // node_modules/@pixi/core/lib/system/SystemManager.mjs
  var SystemManager = class extends import_eventemitter3.default {
    constructor() {
      super(...arguments);
      this.runners = {};
      this._systemsHash = {};
    }
    setup(config) {
      this.addRunners(...config.runners);
      const priority = (config.priority ?? []).filter((key) => config.systems[key]);
      const orderByPriority = [
        ...priority,
        ...Object.keys(config.systems).filter((key) => !priority.includes(key))
      ];
      for (const i2 of orderByPriority) {
        this.addSystem(config.systems[i2], i2);
      }
    }
    addRunners(...runnerIds) {
      runnerIds.forEach((runnerId) => {
        this.runners[runnerId] = new Runner(runnerId);
      });
    }
    addSystem(ClassRef, name) {
      const system = new ClassRef(this);
      if (this[name]) {
        throw new Error(`Whoops! The name "${name}" is already in use`);
      }
      this[name] = system;
      this._systemsHash[name] = system;
      for (const i2 in this.runners) {
        this.runners[i2].add(system);
      }
      return this;
    }
    emitWithCustomOptions(runner, options) {
      const systemHashKeys = Object.keys(this._systemsHash);
      runner.items.forEach((system) => {
        const systemName = systemHashKeys.find((systemId) => this._systemsHash[systemId] === system);
        system[runner.name](options[systemName]);
      });
    }
    destroy() {
      Object.values(this.runners).forEach((runner) => {
        runner.destroy();
      });
      this._systemsHash = {};
    }
  };

  // node_modules/@pixi/core/lib/textures/TextureGCSystem.mjs
  var _TextureGCSystem = class {
    constructor(renderer) {
      this.renderer = renderer;
      this.count = 0;
      this.checkCount = 0;
      this.maxIdle = _TextureGCSystem.defaultMaxIdle;
      this.checkCountMax = _TextureGCSystem.defaultCheckCountMax;
      this.mode = _TextureGCSystem.defaultMode;
    }
    postrender() {
      if (!this.renderer.objectRenderer.renderingToScreen) {
        return;
      }
      this.count++;
      if (this.mode === GC_MODES.MANUAL) {
        return;
      }
      this.checkCount++;
      if (this.checkCount > this.checkCountMax) {
        this.checkCount = 0;
        this.run();
      }
    }
    run() {
      const tm = this.renderer.texture;
      const managedTextures = tm.managedTextures;
      let wasRemoved = false;
      for (let i2 = 0; i2 < managedTextures.length; i2++) {
        const texture = managedTextures[i2];
        if (!texture.framebuffer && this.count - texture.touched > this.maxIdle) {
          tm.destroyTexture(texture, true);
          managedTextures[i2] = null;
          wasRemoved = true;
        }
      }
      if (wasRemoved) {
        let j2 = 0;
        for (let i2 = 0; i2 < managedTextures.length; i2++) {
          if (managedTextures[i2] !== null) {
            managedTextures[j2++] = managedTextures[i2];
          }
        }
        managedTextures.length = j2;
      }
    }
    unload(displayObject) {
      const tm = this.renderer.texture;
      const texture = displayObject._texture;
      if (texture && !texture.framebuffer) {
        tm.destroyTexture(texture);
      }
      for (let i2 = displayObject.children.length - 1; i2 >= 0; i2--) {
        this.unload(displayObject.children[i2]);
      }
    }
    destroy() {
      this.renderer = null;
    }
  };
  var TextureGCSystem = _TextureGCSystem;
  TextureGCSystem.defaultMode = GC_MODES.AUTO;
  TextureGCSystem.defaultMaxIdle = 60 * 60;
  TextureGCSystem.defaultCheckCountMax = 60 * 10;
  TextureGCSystem.extension = {
    type: ExtensionType.RendererSystem,
    name: "textureGC"
  };
  extensions.add(TextureGCSystem);

  // node_modules/@pixi/core/lib/textures/GLTexture.mjs
  var GLTexture = class {
    constructor(texture) {
      this.texture = texture;
      this.width = -1;
      this.height = -1;
      this.dirtyId = -1;
      this.dirtyStyleId = -1;
      this.mipmap = false;
      this.wrapMode = 33071;
      this.type = TYPES.UNSIGNED_BYTE;
      this.internalFormat = FORMATS.RGBA;
      this.samplerType = 0;
    }
  };

  // node_modules/@pixi/core/lib/textures/utils/mapTypeAndFormatToInternalFormat.mjs
  function mapTypeAndFormatToInternalFormat(gl) {
    let table;
    if ("WebGL2RenderingContext" in globalThis && gl instanceof globalThis.WebGL2RenderingContext) {
      table = {
        [TYPES.UNSIGNED_BYTE]: {
          [FORMATS.RGBA]: gl.RGBA8,
          [FORMATS.RGB]: gl.RGB8,
          [FORMATS.RG]: gl.RG8,
          [FORMATS.RED]: gl.R8,
          [FORMATS.RGBA_INTEGER]: gl.RGBA8UI,
          [FORMATS.RGB_INTEGER]: gl.RGB8UI,
          [FORMATS.RG_INTEGER]: gl.RG8UI,
          [FORMATS.RED_INTEGER]: gl.R8UI,
          [FORMATS.ALPHA]: gl.ALPHA,
          [FORMATS.LUMINANCE]: gl.LUMINANCE,
          [FORMATS.LUMINANCE_ALPHA]: gl.LUMINANCE_ALPHA
        },
        [TYPES.BYTE]: {
          [FORMATS.RGBA]: gl.RGBA8_SNORM,
          [FORMATS.RGB]: gl.RGB8_SNORM,
          [FORMATS.RG]: gl.RG8_SNORM,
          [FORMATS.RED]: gl.R8_SNORM,
          [FORMATS.RGBA_INTEGER]: gl.RGBA8I,
          [FORMATS.RGB_INTEGER]: gl.RGB8I,
          [FORMATS.RG_INTEGER]: gl.RG8I,
          [FORMATS.RED_INTEGER]: gl.R8I
        },
        [TYPES.UNSIGNED_SHORT]: {
          [FORMATS.RGBA_INTEGER]: gl.RGBA16UI,
          [FORMATS.RGB_INTEGER]: gl.RGB16UI,
          [FORMATS.RG_INTEGER]: gl.RG16UI,
          [FORMATS.RED_INTEGER]: gl.R16UI,
          [FORMATS.DEPTH_COMPONENT]: gl.DEPTH_COMPONENT16
        },
        [TYPES.SHORT]: {
          [FORMATS.RGBA_INTEGER]: gl.RGBA16I,
          [FORMATS.RGB_INTEGER]: gl.RGB16I,
          [FORMATS.RG_INTEGER]: gl.RG16I,
          [FORMATS.RED_INTEGER]: gl.R16I
        },
        [TYPES.UNSIGNED_INT]: {
          [FORMATS.RGBA_INTEGER]: gl.RGBA32UI,
          [FORMATS.RGB_INTEGER]: gl.RGB32UI,
          [FORMATS.RG_INTEGER]: gl.RG32UI,
          [FORMATS.RED_INTEGER]: gl.R32UI,
          [FORMATS.DEPTH_COMPONENT]: gl.DEPTH_COMPONENT24
        },
        [TYPES.INT]: {
          [FORMATS.RGBA_INTEGER]: gl.RGBA32I,
          [FORMATS.RGB_INTEGER]: gl.RGB32I,
          [FORMATS.RG_INTEGER]: gl.RG32I,
          [FORMATS.RED_INTEGER]: gl.R32I
        },
        [TYPES.FLOAT]: {
          [FORMATS.RGBA]: gl.RGBA32F,
          [FORMATS.RGB]: gl.RGB32F,
          [FORMATS.RG]: gl.RG32F,
          [FORMATS.RED]: gl.R32F,
          [FORMATS.DEPTH_COMPONENT]: gl.DEPTH_COMPONENT32F
        },
        [TYPES.HALF_FLOAT]: {
          [FORMATS.RGBA]: gl.RGBA16F,
          [FORMATS.RGB]: gl.RGB16F,
          [FORMATS.RG]: gl.RG16F,
          [FORMATS.RED]: gl.R16F
        },
        [TYPES.UNSIGNED_SHORT_5_6_5]: {
          [FORMATS.RGB]: gl.RGB565
        },
        [TYPES.UNSIGNED_SHORT_4_4_4_4]: {
          [FORMATS.RGBA]: gl.RGBA4
        },
        [TYPES.UNSIGNED_SHORT_5_5_5_1]: {
          [FORMATS.RGBA]: gl.RGB5_A1
        },
        [TYPES.UNSIGNED_INT_2_10_10_10_REV]: {
          [FORMATS.RGBA]: gl.RGB10_A2,
          [FORMATS.RGBA_INTEGER]: gl.RGB10_A2UI
        },
        [TYPES.UNSIGNED_INT_10F_11F_11F_REV]: {
          [FORMATS.RGB]: gl.R11F_G11F_B10F
        },
        [TYPES.UNSIGNED_INT_5_9_9_9_REV]: {
          [FORMATS.RGB]: gl.RGB9_E5
        },
        [TYPES.UNSIGNED_INT_24_8]: {
          [FORMATS.DEPTH_STENCIL]: gl.DEPTH24_STENCIL8
        },
        [TYPES.FLOAT_32_UNSIGNED_INT_24_8_REV]: {
          [FORMATS.DEPTH_STENCIL]: gl.DEPTH32F_STENCIL8
        }
      };
    } else {
      table = {
        [TYPES.UNSIGNED_BYTE]: {
          [FORMATS.RGBA]: gl.RGBA,
          [FORMATS.RGB]: gl.RGB,
          [FORMATS.ALPHA]: gl.ALPHA,
          [FORMATS.LUMINANCE]: gl.LUMINANCE,
          [FORMATS.LUMINANCE_ALPHA]: gl.LUMINANCE_ALPHA
        },
        [TYPES.UNSIGNED_SHORT_5_6_5]: {
          [FORMATS.RGB]: gl.RGB
        },
        [TYPES.UNSIGNED_SHORT_4_4_4_4]: {
          [FORMATS.RGBA]: gl.RGBA
        },
        [TYPES.UNSIGNED_SHORT_5_5_5_1]: {
          [FORMATS.RGBA]: gl.RGBA
        }
      };
    }
    return table;
  }

  // node_modules/@pixi/core/lib/textures/TextureSystem.mjs
  var TextureSystem = class {
    constructor(renderer) {
      this.renderer = renderer;
      this.boundTextures = [];
      this.currentLocation = -1;
      this.managedTextures = [];
      this._unknownBoundTextures = false;
      this.unknownTexture = new BaseTexture();
      this.hasIntegerTextures = false;
    }
    contextChange() {
      const gl = this.gl = this.renderer.gl;
      this.CONTEXT_UID = this.renderer.CONTEXT_UID;
      this.webGLVersion = this.renderer.context.webGLVersion;
      this.internalFormats = mapTypeAndFormatToInternalFormat(gl);
      const maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
      this.boundTextures.length = maxTextures;
      for (let i2 = 0; i2 < maxTextures; i2++) {
        this.boundTextures[i2] = null;
      }
      this.emptyTextures = {};
      const emptyTexture2D = new GLTexture(gl.createTexture());
      gl.bindTexture(gl.TEXTURE_2D, emptyTexture2D.texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));
      this.emptyTextures[gl.TEXTURE_2D] = emptyTexture2D;
      this.emptyTextures[gl.TEXTURE_CUBE_MAP] = new GLTexture(gl.createTexture());
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.emptyTextures[gl.TEXTURE_CUBE_MAP].texture);
      for (let i2 = 0; i2 < 6; i2++) {
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i2, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      }
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      for (let i2 = 0; i2 < this.boundTextures.length; i2++) {
        this.bind(null, i2);
      }
    }
    bind(texture, location = 0) {
      const { gl } = this;
      texture = texture?.castToBaseTexture();
      if (texture?.valid && !texture.parentTextureArray) {
        texture.touched = this.renderer.textureGC.count;
        const glTexture = texture._glTextures[this.CONTEXT_UID] || this.initTexture(texture);
        if (this.boundTextures[location] !== texture) {
          if (this.currentLocation !== location) {
            this.currentLocation = location;
            gl.activeTexture(gl.TEXTURE0 + location);
          }
          gl.bindTexture(texture.target, glTexture.texture);
        }
        if (glTexture.dirtyId !== texture.dirtyId) {
          if (this.currentLocation !== location) {
            this.currentLocation = location;
            gl.activeTexture(gl.TEXTURE0 + location);
          }
          this.updateTexture(texture);
        } else if (glTexture.dirtyStyleId !== texture.dirtyStyleId) {
          this.updateTextureStyle(texture);
        }
        this.boundTextures[location] = texture;
      } else {
        if (this.currentLocation !== location) {
          this.currentLocation = location;
          gl.activeTexture(gl.TEXTURE0 + location);
        }
        gl.bindTexture(gl.TEXTURE_2D, this.emptyTextures[gl.TEXTURE_2D].texture);
        this.boundTextures[location] = null;
      }
    }
    reset() {
      this._unknownBoundTextures = true;
      this.hasIntegerTextures = false;
      this.currentLocation = -1;
      for (let i2 = 0; i2 < this.boundTextures.length; i2++) {
        this.boundTextures[i2] = this.unknownTexture;
      }
    }
    unbind(texture) {
      const { gl, boundTextures } = this;
      if (this._unknownBoundTextures) {
        this._unknownBoundTextures = false;
        for (let i2 = 0; i2 < boundTextures.length; i2++) {
          if (boundTextures[i2] === this.unknownTexture) {
            this.bind(null, i2);
          }
        }
      }
      for (let i2 = 0; i2 < boundTextures.length; i2++) {
        if (boundTextures[i2] === texture) {
          if (this.currentLocation !== i2) {
            gl.activeTexture(gl.TEXTURE0 + i2);
            this.currentLocation = i2;
          }
          gl.bindTexture(texture.target, this.emptyTextures[texture.target].texture);
          boundTextures[i2] = null;
        }
      }
    }
    ensureSamplerType(maxTextures) {
      const { boundTextures, hasIntegerTextures, CONTEXT_UID } = this;
      if (!hasIntegerTextures) {
        return;
      }
      for (let i2 = maxTextures - 1; i2 >= 0; --i2) {
        const tex = boundTextures[i2];
        if (tex) {
          const glTexture = tex._glTextures[CONTEXT_UID];
          if (glTexture.samplerType !== SAMPLER_TYPES.FLOAT) {
            this.renderer.texture.unbind(tex);
          }
        }
      }
    }
    initTexture(texture) {
      const glTexture = new GLTexture(this.gl.createTexture());
      glTexture.dirtyId = -1;
      texture._glTextures[this.CONTEXT_UID] = glTexture;
      this.managedTextures.push(texture);
      texture.on("dispose", this.destroyTexture, this);
      return glTexture;
    }
    initTextureType(texture, glTexture) {
      glTexture.internalFormat = this.internalFormats[texture.type]?.[texture.format] ?? texture.format;
      if (this.webGLVersion === 2 && texture.type === TYPES.HALF_FLOAT) {
        glTexture.type = this.gl.HALF_FLOAT;
      } else {
        glTexture.type = texture.type;
      }
    }
    updateTexture(texture) {
      const glTexture = texture._glTextures[this.CONTEXT_UID];
      if (!glTexture) {
        return;
      }
      const renderer = this.renderer;
      this.initTextureType(texture, glTexture);
      if (texture.resource?.upload(renderer, texture, glTexture)) {
        if (glTexture.samplerType !== SAMPLER_TYPES.FLOAT) {
          this.hasIntegerTextures = true;
        }
      } else {
        const width = texture.realWidth;
        const height = texture.realHeight;
        const gl = renderer.gl;
        if (glTexture.width !== width || glTexture.height !== height || glTexture.dirtyId < 0) {
          glTexture.width = width;
          glTexture.height = height;
          gl.texImage2D(texture.target, 0, glTexture.internalFormat, width, height, 0, texture.format, glTexture.type, null);
        }
      }
      if (texture.dirtyStyleId !== glTexture.dirtyStyleId) {
        this.updateTextureStyle(texture);
      }
      glTexture.dirtyId = texture.dirtyId;
    }
    destroyTexture(texture, skipRemove) {
      const { gl } = this;
      texture = texture.castToBaseTexture();
      if (texture._glTextures[this.CONTEXT_UID]) {
        this.unbind(texture);
        gl.deleteTexture(texture._glTextures[this.CONTEXT_UID].texture);
        texture.off("dispose", this.destroyTexture, this);
        delete texture._glTextures[this.CONTEXT_UID];
        if (!skipRemove) {
          const i2 = this.managedTextures.indexOf(texture);
          if (i2 !== -1) {
            removeItems(this.managedTextures, i2, 1);
          }
        }
      }
    }
    updateTextureStyle(texture) {
      const glTexture = texture._glTextures[this.CONTEXT_UID];
      if (!glTexture) {
        return;
      }
      if ((texture.mipmap === MIPMAP_MODES.POW2 || this.webGLVersion !== 2) && !texture.isPowerOfTwo) {
        glTexture.mipmap = false;
      } else {
        glTexture.mipmap = texture.mipmap >= 1;
      }
      if (this.webGLVersion !== 2 && !texture.isPowerOfTwo) {
        glTexture.wrapMode = WRAP_MODES.CLAMP;
      } else {
        glTexture.wrapMode = texture.wrapMode;
      }
      if (texture.resource?.style(this.renderer, texture, glTexture)) {
      } else {
        this.setStyle(texture, glTexture);
      }
      glTexture.dirtyStyleId = texture.dirtyStyleId;
    }
    setStyle(texture, glTexture) {
      const gl = this.gl;
      if (glTexture.mipmap && texture.mipmap !== MIPMAP_MODES.ON_MANUAL) {
        gl.generateMipmap(texture.target);
      }
      gl.texParameteri(texture.target, gl.TEXTURE_WRAP_S, glTexture.wrapMode);
      gl.texParameteri(texture.target, gl.TEXTURE_WRAP_T, glTexture.wrapMode);
      if (glTexture.mipmap) {
        gl.texParameteri(texture.target, gl.TEXTURE_MIN_FILTER, texture.scaleMode === SCALE_MODES.LINEAR ? gl.LINEAR_MIPMAP_LINEAR : gl.NEAREST_MIPMAP_NEAREST);
        const anisotropicExt = this.renderer.context.extensions.anisotropicFiltering;
        if (anisotropicExt && texture.anisotropicLevel > 0 && texture.scaleMode === SCALE_MODES.LINEAR) {
          const level = Math.min(texture.anisotropicLevel, gl.getParameter(anisotropicExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
          gl.texParameterf(texture.target, anisotropicExt.TEXTURE_MAX_ANISOTROPY_EXT, level);
        }
      } else {
        gl.texParameteri(texture.target, gl.TEXTURE_MIN_FILTER, texture.scaleMode === SCALE_MODES.LINEAR ? gl.LINEAR : gl.NEAREST);
      }
      gl.texParameteri(texture.target, gl.TEXTURE_MAG_FILTER, texture.scaleMode === SCALE_MODES.LINEAR ? gl.LINEAR : gl.NEAREST);
    }
    destroy() {
      this.renderer = null;
    }
  };
  TextureSystem.extension = {
    type: ExtensionType.RendererSystem,
    name: "texture"
  };
  extensions.add(TextureSystem);

  // node_modules/@pixi/core/lib/transformFeedback/TransformFeedbackSystem.mjs
  var TransformFeedbackSystem = class {
    constructor(renderer) {
      this.renderer = renderer;
    }
    contextChange() {
      this.gl = this.renderer.gl;
      this.CONTEXT_UID = this.renderer.CONTEXT_UID;
    }
    bind(transformFeedback) {
      const { gl, CONTEXT_UID } = this;
      const glTransformFeedback = transformFeedback._glTransformFeedbacks[CONTEXT_UID] || this.createGLTransformFeedback(transformFeedback);
      gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, glTransformFeedback);
    }
    unbind() {
      const { gl } = this;
      gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
    }
    beginTransformFeedback(drawMode, shader) {
      const { gl, renderer } = this;
      if (shader) {
        renderer.shader.bind(shader);
      }
      gl.beginTransformFeedback(drawMode);
    }
    endTransformFeedback() {
      const { gl } = this;
      gl.endTransformFeedback();
    }
    createGLTransformFeedback(tf) {
      const { gl, renderer, CONTEXT_UID } = this;
      const glTransformFeedback = gl.createTransformFeedback();
      tf._glTransformFeedbacks[CONTEXT_UID] = glTransformFeedback;
      gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, glTransformFeedback);
      for (let i2 = 0; i2 < tf.buffers.length; i2++) {
        const buffer = tf.buffers[i2];
        if (!buffer)
          continue;
        renderer.buffer.update(buffer);
        buffer._glBuffers[CONTEXT_UID].refCount++;
        gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, i2, buffer._glBuffers[CONTEXT_UID].buffer || null);
      }
      gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
      tf.disposeRunner.add(this);
      return glTransformFeedback;
    }
    disposeTransformFeedback(tf, contextLost) {
      const glTF = tf._glTransformFeedbacks[this.CONTEXT_UID];
      const gl = this.gl;
      tf.disposeRunner.remove(this);
      const bufferSystem = this.renderer.buffer;
      if (bufferSystem) {
        for (let i2 = 0; i2 < tf.buffers.length; i2++) {
          const buffer = tf.buffers[i2];
          if (!buffer)
            continue;
          const buf = buffer._glBuffers[this.CONTEXT_UID];
          if (buf) {
            buf.refCount--;
            if (buf.refCount === 0 && !contextLost) {
              bufferSystem.dispose(buffer, contextLost);
            }
          }
        }
      }
      if (!glTF) {
        return;
      }
      if (!contextLost) {
        gl.deleteTransformFeedback(glTF);
      }
      delete tf._glTransformFeedbacks[this.CONTEXT_UID];
    }
    destroy() {
      this.renderer = null;
    }
  };
  TransformFeedbackSystem.extension = {
    type: ExtensionType.RendererSystem,
    name: "transformFeedback"
  };
  extensions.add(TransformFeedbackSystem);

  // node_modules/@pixi/core/lib/view/ViewSystem.mjs
  var ViewSystem = class {
    constructor(renderer) {
      this.renderer = renderer;
    }
    init(options) {
      this.screen = new Rectangle(0, 0, options.width, options.height);
      this.element = options.view || settings.ADAPTER.createCanvas();
      this.resolution = options.resolution || settings.RESOLUTION;
      this.autoDensity = !!options.autoDensity;
    }
    resizeView(desiredScreenWidth, desiredScreenHeight) {
      this.element.width = Math.round(desiredScreenWidth * this.resolution);
      this.element.height = Math.round(desiredScreenHeight * this.resolution);
      const screenWidth = this.element.width / this.resolution;
      const screenHeight = this.element.height / this.resolution;
      this.screen.width = screenWidth;
      this.screen.height = screenHeight;
      if (this.autoDensity) {
        this.element.style.width = `${screenWidth}px`;
        this.element.style.height = `${screenHeight}px`;
      }
      this.renderer.emit("resize", screenWidth, screenHeight);
      this.renderer.runners.resize.emit(this.screen.width, this.screen.height);
    }
    destroy(removeView) {
      if (removeView) {
        this.element.parentNode?.removeChild(this.element);
      }
      this.renderer = null;
      this.element = null;
      this.screen = null;
    }
  };
  ViewSystem.defaultOptions = {
    width: 800,
    height: 600,
    resolution: settings.RESOLUTION,
    autoDensity: false
  };
  ViewSystem.extension = {
    type: [
      ExtensionType.RendererSystem,
      ExtensionType.CanvasRendererSystem
    ],
    name: "_view"
  };
  extensions.add(ViewSystem);

  // node_modules/@pixi/core/lib/settings.mjs
  settings.PREFER_ENV = ENV.WEBGL2;
  settings.STRICT_TEXTURE_CACHE = false;
  settings.RENDER_OPTIONS = {
    ...ContextSystem.defaultOptions,
    ...BackgroundSystem.defaultOptions,
    ...ViewSystem.defaultOptions,
    ...StartupSystem.defaultOptions
  };
  Object.defineProperties(settings, {
    WRAP_MODE: {
      get() {
        return BaseTexture.defaultOptions.wrapMode;
      },
      set(value) {
        deprecation("7.1.0", "settings.WRAP_MODE is deprecated, use BaseTexture.defaultOptions.wrapMode");
        BaseTexture.defaultOptions.wrapMode = value;
      }
    },
    SCALE_MODE: {
      get() {
        return BaseTexture.defaultOptions.scaleMode;
      },
      set(value) {
        deprecation("7.1.0", "settings.SCALE_MODE is deprecated, use BaseTexture.defaultOptions.scaleMode");
        BaseTexture.defaultOptions.scaleMode = value;
      }
    },
    MIPMAP_TEXTURES: {
      get() {
        return BaseTexture.defaultOptions.mipmap;
      },
      set(value) {
        deprecation("7.1.0", "settings.MIPMAP_TEXTURES is deprecated, use BaseTexture.defaultOptions.mipmap");
        BaseTexture.defaultOptions.mipmap = value;
      }
    },
    ANISOTROPIC_LEVEL: {
      get() {
        return BaseTexture.defaultOptions.anisotropicLevel;
      },
      set(value) {
        deprecation("7.1.0", "settings.ANISOTROPIC_LEVEL is deprecated, use BaseTexture.defaultOptions.anisotropicLevel");
        BaseTexture.defaultOptions.anisotropicLevel = value;
      }
    },
    FILTER_RESOLUTION: {
      get() {
        deprecation("7.1.0", "settings.FILTER_RESOLUTION is deprecated, use Filter.defaultResolution");
        return Filter.defaultResolution;
      },
      set(value) {
        Filter.defaultResolution = value;
      }
    },
    FILTER_MULTISAMPLE: {
      get() {
        deprecation("7.1.0", "settings.FILTER_MULTISAMPLE is deprecated, use Filter.defaultMultisample");
        return Filter.defaultMultisample;
      },
      set(value) {
        Filter.defaultMultisample = value;
      }
    },
    SPRITE_MAX_TEXTURES: {
      get() {
        return BatchRenderer.defaultMaxTextures;
      },
      set(value) {
        deprecation("7.1.0", "settings.SPRITE_MAX_TEXTURES is deprecated, use BatchRenderer.defaultMaxTextures");
        BatchRenderer.defaultMaxTextures = value;
      }
    },
    SPRITE_BATCH_SIZE: {
      get() {
        return BatchRenderer.defaultBatchSize;
      },
      set(value) {
        deprecation("7.1.0", "settings.SPRITE_BATCH_SIZE is deprecated, use BatchRenderer.defaultBatchSize");
        BatchRenderer.defaultBatchSize = value;
      }
    },
    CAN_UPLOAD_SAME_BUFFER: {
      get() {
        return BatchRenderer.canUploadSameBuffer;
      },
      set(value) {
        deprecation("7.1.0", "settings.CAN_UPLOAD_SAME_BUFFER is deprecated, use BatchRenderer.canUploadSameBuffer");
        BatchRenderer.canUploadSameBuffer = value;
      }
    },
    GC_MODE: {
      get() {
        return TextureGCSystem.defaultMode;
      },
      set(value) {
        deprecation("7.1.0", "settings.GC_MODE is deprecated, use TextureGCSystem.defaultMode");
        TextureGCSystem.defaultMode = value;
      }
    },
    GC_MAX_IDLE: {
      get() {
        return TextureGCSystem.defaultMaxIdle;
      },
      set(value) {
        deprecation("7.1.0", "settings.GC_MAX_IDLE is deprecated, use TextureGCSystem.defaultMaxIdle");
        TextureGCSystem.defaultMaxIdle = value;
      }
    },
    GC_MAX_CHECK_COUNT: {
      get() {
        return TextureGCSystem.defaultCheckCountMax;
      },
      set(value) {
        deprecation("7.1.0", "settings.GC_MAX_CHECK_COUNT is deprecated, use TextureGCSystem.defaultCheckCountMax");
        TextureGCSystem.defaultCheckCountMax = value;
      }
    },
    PRECISION_VERTEX: {
      get() {
        return Program.defaultVertexPrecision;
      },
      set(value) {
        deprecation("7.1.0", "settings.PRECISION_VERTEX is deprecated, use Program.defaultVertexPrecision");
        Program.defaultVertexPrecision = value;
      }
    },
    PRECISION_FRAGMENT: {
      get() {
        return Program.defaultFragmentPrecision;
      },
      set(value) {
        deprecation("7.1.0", "settings.PRECISION_FRAGMENT is deprecated, use Program.defaultFragmentPrecision");
        Program.defaultFragmentPrecision = value;
      }
    }
  });

  // node_modules/@pixi/ticker/lib/const.mjs
  var UPDATE_PRIORITY = /* @__PURE__ */ ((UPDATE_PRIORITY2) => {
    UPDATE_PRIORITY2[UPDATE_PRIORITY2["INTERACTION"] = 50] = "INTERACTION";
    UPDATE_PRIORITY2[UPDATE_PRIORITY2["HIGH"] = 25] = "HIGH";
    UPDATE_PRIORITY2[UPDATE_PRIORITY2["NORMAL"] = 0] = "NORMAL";
    UPDATE_PRIORITY2[UPDATE_PRIORITY2["LOW"] = -25] = "LOW";
    UPDATE_PRIORITY2[UPDATE_PRIORITY2["UTILITY"] = -50] = "UTILITY";
    return UPDATE_PRIORITY2;
  })(UPDATE_PRIORITY || {});

  // node_modules/@pixi/ticker/lib/TickerListener.mjs
  var TickerListener = class {
    constructor(fn, context2 = null, priority = 0, once = false) {
      this.next = null;
      this.previous = null;
      this._destroyed = false;
      this.fn = fn;
      this.context = context2;
      this.priority = priority;
      this.once = once;
    }
    match(fn, context2 = null) {
      return this.fn === fn && this.context === context2;
    }
    emit(deltaTime) {
      if (this.fn) {
        if (this.context) {
          this.fn.call(this.context, deltaTime);
        } else {
          this.fn(deltaTime);
        }
      }
      const redirect = this.next;
      if (this.once) {
        this.destroy(true);
      }
      if (this._destroyed) {
        this.next = null;
      }
      return redirect;
    }
    connect(previous) {
      this.previous = previous;
      if (previous.next) {
        previous.next.previous = this;
      }
      this.next = previous.next;
      previous.next = this;
    }
    destroy(hard = false) {
      this._destroyed = true;
      this.fn = null;
      this.context = null;
      if (this.previous) {
        this.previous.next = this.next;
      }
      if (this.next) {
        this.next.previous = this.previous;
      }
      const redirect = this.next;
      this.next = hard ? null : redirect;
      this.previous = null;
      return redirect;
    }
  };

  // node_modules/@pixi/ticker/lib/Ticker.mjs
  var _Ticker = class {
    constructor() {
      this.autoStart = false;
      this.deltaTime = 1;
      this.lastTime = -1;
      this.speed = 1;
      this.started = false;
      this._requestId = null;
      this._maxElapsedMS = 100;
      this._minElapsedMS = 0;
      this._protected = false;
      this._lastFrame = -1;
      this._head = new TickerListener(null, null, Infinity);
      this.deltaMS = 1 / _Ticker.targetFPMS;
      this.elapsedMS = 1 / _Ticker.targetFPMS;
      this._tick = (time) => {
        this._requestId = null;
        if (this.started) {
          this.update(time);
          if (this.started && this._requestId === null && this._head.next) {
            this._requestId = requestAnimationFrame(this._tick);
          }
        }
      };
    }
    _requestIfNeeded() {
      if (this._requestId === null && this._head.next) {
        this.lastTime = performance.now();
        this._lastFrame = this.lastTime;
        this._requestId = requestAnimationFrame(this._tick);
      }
    }
    _cancelIfNeeded() {
      if (this._requestId !== null) {
        cancelAnimationFrame(this._requestId);
        this._requestId = null;
      }
    }
    _startIfPossible() {
      if (this.started) {
        this._requestIfNeeded();
      } else if (this.autoStart) {
        this.start();
      }
    }
    add(fn, context2, priority = UPDATE_PRIORITY.NORMAL) {
      return this._addListener(new TickerListener(fn, context2, priority));
    }
    addOnce(fn, context2, priority = UPDATE_PRIORITY.NORMAL) {
      return this._addListener(new TickerListener(fn, context2, priority, true));
    }
    _addListener(listener) {
      let current = this._head.next;
      let previous = this._head;
      if (!current) {
        listener.connect(previous);
      } else {
        while (current) {
          if (listener.priority > current.priority) {
            listener.connect(previous);
            break;
          }
          previous = current;
          current = current.next;
        }
        if (!listener.previous) {
          listener.connect(previous);
        }
      }
      this._startIfPossible();
      return this;
    }
    remove(fn, context2) {
      let listener = this._head.next;
      while (listener) {
        if (listener.match(fn, context2)) {
          listener = listener.destroy();
        } else {
          listener = listener.next;
        }
      }
      if (!this._head.next) {
        this._cancelIfNeeded();
      }
      return this;
    }
    get count() {
      if (!this._head) {
        return 0;
      }
      let count = 0;
      let current = this._head;
      while (current = current.next) {
        count++;
      }
      return count;
    }
    start() {
      if (!this.started) {
        this.started = true;
        this._requestIfNeeded();
      }
    }
    stop() {
      if (this.started) {
        this.started = false;
        this._cancelIfNeeded();
      }
    }
    destroy() {
      if (!this._protected) {
        this.stop();
        let listener = this._head.next;
        while (listener) {
          listener = listener.destroy(true);
        }
        this._head.destroy();
        this._head = null;
      }
    }
    update(currentTime = performance.now()) {
      let elapsedMS;
      if (currentTime > this.lastTime) {
        elapsedMS = this.elapsedMS = currentTime - this.lastTime;
        if (elapsedMS > this._maxElapsedMS) {
          elapsedMS = this._maxElapsedMS;
        }
        elapsedMS *= this.speed;
        if (this._minElapsedMS) {
          const delta = currentTime - this._lastFrame | 0;
          if (delta < this._minElapsedMS) {
            return;
          }
          this._lastFrame = currentTime - delta % this._minElapsedMS;
        }
        this.deltaMS = elapsedMS;
        this.deltaTime = this.deltaMS * _Ticker.targetFPMS;
        const head = this._head;
        let listener = head.next;
        while (listener) {
          listener = listener.emit(this.deltaTime);
        }
        if (!head.next) {
          this._cancelIfNeeded();
        }
      } else {
        this.deltaTime = this.deltaMS = this.elapsedMS = 0;
      }
      this.lastTime = currentTime;
    }
    get FPS() {
      return 1e3 / this.elapsedMS;
    }
    get minFPS() {
      return 1e3 / this._maxElapsedMS;
    }
    set minFPS(fps) {
      const minFPS = Math.min(this.maxFPS, fps);
      const minFPMS = Math.min(Math.max(0, minFPS) / 1e3, _Ticker.targetFPMS);
      this._maxElapsedMS = 1 / minFPMS;
    }
    get maxFPS() {
      if (this._minElapsedMS) {
        return Math.round(1e3 / this._minElapsedMS);
      }
      return 0;
    }
    set maxFPS(fps) {
      if (fps === 0) {
        this._minElapsedMS = 0;
      } else {
        const maxFPS = Math.max(this.minFPS, fps);
        this._minElapsedMS = 1 / (maxFPS / 1e3);
      }
    }
    static get shared() {
      if (!_Ticker._shared) {
        const shared = _Ticker._shared = new _Ticker();
        shared.autoStart = true;
        shared._protected = true;
      }
      return _Ticker._shared;
    }
    static get system() {
      if (!_Ticker._system) {
        const system = _Ticker._system = new _Ticker();
        system.autoStart = true;
        system._protected = true;
      }
      return _Ticker._system;
    }
  };
  var Ticker = _Ticker;
  Ticker.targetFPMS = 0.06;

  // node_modules/@pixi/ticker/lib/settings.mjs
  Object.defineProperties(settings, {
    TARGET_FPMS: {
      get() {
        return Ticker.targetFPMS;
      },
      set(value) {
        deprecation("7.1.0", "settings.TARGET_FPMS is deprecated, use Ticker.targetFPMS");
        Ticker.targetFPMS = value;
      }
    }
  });

  // node_modules/@pixi/ticker/lib/TickerPlugin.mjs
  var TickerPlugin = class {
    static init(options) {
      options = Object.assign({
        autoStart: true,
        sharedTicker: false
      }, options);
      Object.defineProperty(this, "ticker", {
        set(ticker) {
          if (this._ticker) {
            this._ticker.remove(this.render, this);
          }
          this._ticker = ticker;
          if (ticker) {
            ticker.add(this.render, this, UPDATE_PRIORITY.LOW);
          }
        },
        get() {
          return this._ticker;
        }
      });
      this.stop = () => {
        this._ticker.stop();
      };
      this.start = () => {
        this._ticker.start();
      };
      this._ticker = null;
      this.ticker = options.sharedTicker ? Ticker.shared : new Ticker();
      if (options.autoStart) {
        this.start();
      }
    }
    static destroy() {
      if (this._ticker) {
        const oldTicker = this._ticker;
        this.ticker = null;
        oldTicker.destroy();
      }
    }
  };
  TickerPlugin.extension = ExtensionType.Application;
  extensions.add(TickerPlugin);

  // node_modules/@pixi/core/lib/autoDetectRenderer.mjs
  var renderers = [];
  extensions.handleByList(ExtensionType.Renderer, renderers);

  // node_modules/@pixi/core/lib/framebuffer/MultisampleSystem.mjs
  var MultisampleSystem = class {
    constructor(renderer) {
      this.renderer = renderer;
    }
    contextChange(gl) {
      let samples;
      if (this.renderer.context.webGLVersion === 1) {
        const framebuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        samples = gl.getParameter(gl.SAMPLES);
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      } else {
        const framebuffer = gl.getParameter(gl.DRAW_FRAMEBUFFER_BINDING);
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
        samples = gl.getParameter(gl.SAMPLES);
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, framebuffer);
      }
      if (samples >= MSAA_QUALITY.HIGH) {
        this.multisample = MSAA_QUALITY.HIGH;
      } else if (samples >= MSAA_QUALITY.MEDIUM) {
        this.multisample = MSAA_QUALITY.MEDIUM;
      } else if (samples >= MSAA_QUALITY.LOW) {
        this.multisample = MSAA_QUALITY.LOW;
      } else {
        this.multisample = MSAA_QUALITY.NONE;
      }
    }
    destroy() {
    }
  };
  MultisampleSystem.extension = {
    type: ExtensionType.RendererSystem,
    name: "_multisample"
  };
  extensions.add(MultisampleSystem);

  // node_modules/@pixi/core/lib/geometry/GLBuffer.mjs
  var GLBuffer = class {
    constructor(buffer) {
      this.buffer = buffer || null;
      this.updateID = -1;
      this.byteLength = -1;
      this.refCount = 0;
    }
  };

  // node_modules/@pixi/core/lib/geometry/BufferSystem.mjs
  var BufferSystem = class {
    constructor(renderer) {
      this.renderer = renderer;
      this.managedBuffers = {};
      this.boundBufferBases = {};
    }
    destroy() {
      this.renderer = null;
    }
    contextChange() {
      this.disposeAll(true);
      this.gl = this.renderer.gl;
      this.CONTEXT_UID = this.renderer.CONTEXT_UID;
    }
    bind(buffer) {
      const { gl, CONTEXT_UID } = this;
      const glBuffer = buffer._glBuffers[CONTEXT_UID] || this.createGLBuffer(buffer);
      gl.bindBuffer(buffer.type, glBuffer.buffer);
    }
    unbind(type) {
      const { gl } = this;
      gl.bindBuffer(type, null);
    }
    bindBufferBase(buffer, index) {
      const { gl, CONTEXT_UID } = this;
      if (this.boundBufferBases[index] !== buffer) {
        const glBuffer = buffer._glBuffers[CONTEXT_UID] || this.createGLBuffer(buffer);
        this.boundBufferBases[index] = buffer;
        gl.bindBufferBase(gl.UNIFORM_BUFFER, index, glBuffer.buffer);
      }
    }
    bindBufferRange(buffer, index, offset) {
      const { gl, CONTEXT_UID } = this;
      offset = offset || 0;
      const glBuffer = buffer._glBuffers[CONTEXT_UID] || this.createGLBuffer(buffer);
      gl.bindBufferRange(gl.UNIFORM_BUFFER, index || 0, glBuffer.buffer, offset * 256, 256);
    }
    update(buffer) {
      const { gl, CONTEXT_UID } = this;
      const glBuffer = buffer._glBuffers[CONTEXT_UID] || this.createGLBuffer(buffer);
      if (buffer._updateID === glBuffer.updateID) {
        return;
      }
      glBuffer.updateID = buffer._updateID;
      gl.bindBuffer(buffer.type, glBuffer.buffer);
      if (glBuffer.byteLength >= buffer.data.byteLength) {
        gl.bufferSubData(buffer.type, 0, buffer.data);
      } else {
        const drawType = buffer.static ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW;
        glBuffer.byteLength = buffer.data.byteLength;
        gl.bufferData(buffer.type, buffer.data, drawType);
      }
    }
    dispose(buffer, contextLost) {
      if (!this.managedBuffers[buffer.id]) {
        return;
      }
      delete this.managedBuffers[buffer.id];
      const glBuffer = buffer._glBuffers[this.CONTEXT_UID];
      const gl = this.gl;
      buffer.disposeRunner.remove(this);
      if (!glBuffer) {
        return;
      }
      if (!contextLost) {
        gl.deleteBuffer(glBuffer.buffer);
      }
      delete buffer._glBuffers[this.CONTEXT_UID];
    }
    disposeAll(contextLost) {
      const all = Object.keys(this.managedBuffers);
      for (let i2 = 0; i2 < all.length; i2++) {
        this.dispose(this.managedBuffers[all[i2]], contextLost);
      }
    }
    createGLBuffer(buffer) {
      const { CONTEXT_UID, gl } = this;
      buffer._glBuffers[CONTEXT_UID] = new GLBuffer(gl.createBuffer());
      this.managedBuffers[buffer.id] = buffer;
      buffer.disposeRunner.add(this);
      return buffer._glBuffers[CONTEXT_UID];
    }
  };
  BufferSystem.extension = {
    type: ExtensionType.RendererSystem,
    name: "buffer"
  };
  extensions.add(BufferSystem);

  // node_modules/@pixi/core/lib/render/ObjectRendererSystem.mjs
  var ObjectRendererSystem = class {
    constructor(renderer) {
      this.renderer = renderer;
    }
    render(displayObject, options) {
      const renderer = this.renderer;
      let renderTexture;
      let clear;
      let transform;
      let skipUpdateTransform;
      if (options) {
        renderTexture = options.renderTexture;
        clear = options.clear;
        transform = options.transform;
        skipUpdateTransform = options.skipUpdateTransform;
      }
      this.renderingToScreen = !renderTexture;
      renderer.runners.prerender.emit();
      renderer.emit("prerender");
      renderer.projection.transform = transform;
      if (renderer.context.isLost) {
        return;
      }
      if (!renderTexture) {
        this.lastObjectRendered = displayObject;
      }
      if (!skipUpdateTransform) {
        const cacheParent = displayObject.enableTempParent();
        displayObject.updateTransform();
        displayObject.disableTempParent(cacheParent);
      }
      renderer.renderTexture.bind(renderTexture);
      renderer.batch.currentRenderer.start();
      if (clear ?? renderer.background.clearBeforeRender) {
        renderer.renderTexture.clear();
      }
      displayObject.render(renderer);
      renderer.batch.currentRenderer.flush();
      if (renderTexture) {
        if (options.blit) {
          renderer.framebuffer.blit();
        }
        renderTexture.baseTexture.update();
      }
      renderer.runners.postrender.emit();
      renderer.projection.transform = null;
      renderer.emit("postrender");
    }
    destroy() {
      this.renderer = null;
      this.lastObjectRendered = null;
    }
  };
  ObjectRendererSystem.extension = {
    type: ExtensionType.RendererSystem,
    name: "objectRenderer"
  };
  extensions.add(ObjectRendererSystem);

  // node_modules/@pixi/core/lib/Renderer.mjs
  var _Renderer = class extends SystemManager {
    constructor(options) {
      super();
      this.type = RENDERER_TYPE.WEBGL;
      options = Object.assign({}, settings.RENDER_OPTIONS, options);
      this.gl = null;
      this.CONTEXT_UID = 0;
      this.globalUniforms = new UniformGroup({
        projectionMatrix: new Matrix()
      }, true);
      const systemConfig = {
        runners: [
          "init",
          "destroy",
          "contextChange",
          "resolutionChange",
          "reset",
          "update",
          "postrender",
          "prerender",
          "resize"
        ],
        systems: _Renderer.__systems,
        priority: [
          "_view",
          "textureGenerator",
          "background",
          "_plugin",
          "startup",
          "context",
          "state",
          "texture",
          "buffer",
          "geometry",
          "framebuffer",
          "transformFeedback",
          "mask",
          "scissor",
          "stencil",
          "projection",
          "textureGC",
          "filter",
          "renderTexture",
          "batch",
          "objectRenderer",
          "_multisample"
        ]
      };
      this.setup(systemConfig);
      if ("useContextAlpha" in options) {
        deprecation("7.0.0", "options.useContextAlpha is deprecated, use options.premultipliedAlpha and options.backgroundAlpha instead");
        options.premultipliedAlpha = options.useContextAlpha && options.useContextAlpha !== "notMultiplied";
        options.backgroundAlpha = options.useContextAlpha === false ? 1 : options.backgroundAlpha;
      }
      this._plugin.rendererPlugins = _Renderer.__plugins;
      this.options = options;
      this.startup.run(this.options);
    }
    static test(options) {
      if (options?.forceCanvas) {
        return false;
      }
      return isWebGLSupported();
    }
    render(displayObject, options) {
      this.objectRenderer.render(displayObject, options);
    }
    resize(desiredScreenWidth, desiredScreenHeight) {
      this._view.resizeView(desiredScreenWidth, desiredScreenHeight);
    }
    reset() {
      this.runners.reset.emit();
      return this;
    }
    clear() {
      this.renderTexture.bind();
      this.renderTexture.clear();
    }
    destroy(removeView = false) {
      this.runners.destroy.items.reverse();
      this.emitWithCustomOptions(this.runners.destroy, {
        _view: removeView
      });
      super.destroy();
    }
    get plugins() {
      return this._plugin.plugins;
    }
    get multisample() {
      return this._multisample.multisample;
    }
    get width() {
      return this._view.element.width;
    }
    get height() {
      return this._view.element.height;
    }
    get resolution() {
      return this._view.resolution;
    }
    set resolution(value) {
      this._view.resolution = value;
      this.runners.resolutionChange.emit(value);
    }
    get autoDensity() {
      return this._view.autoDensity;
    }
    get view() {
      return this._view.element;
    }
    get screen() {
      return this._view.screen;
    }
    get lastObjectRendered() {
      return this.objectRenderer.lastObjectRendered;
    }
    get renderingToScreen() {
      return this.objectRenderer.renderingToScreen;
    }
    get rendererLogId() {
      return `WebGL ${this.context.webGLVersion}`;
    }
    get clearBeforeRender() {
      deprecation("7.0.0", "renderer.clearBeforeRender has been deprecated, please use renderer.background.clearBeforeRender instead.");
      return this.background.clearBeforeRender;
    }
    get useContextAlpha() {
      deprecation("7.0.0", "renderer.useContextAlpha has been deprecated, please use renderer.context.premultipliedAlpha instead.");
      return this.context.useContextAlpha;
    }
    get preserveDrawingBuffer() {
      deprecation("7.0.0", "renderer.preserveDrawingBuffer has been deprecated, we cannot truly know this unless pixi created the context");
      return this.context.preserveDrawingBuffer;
    }
    get backgroundColor() {
      deprecation("7.0.0", "renderer.backgroundColor has been deprecated, use renderer.background.color instead.");
      return this.background.color;
    }
    set backgroundColor(value) {
      deprecation("7.0.0", "renderer.backgroundColor has been deprecated, use renderer.background.color instead.");
      this.background.color = value;
    }
    get backgroundAlpha() {
      deprecation("7.0.0", "renderer.backgroundAlpha has been deprecated, use renderer.background.alpha instead.");
      return this.background.alpha;
    }
    set backgroundAlpha(value) {
      deprecation("7.0.0", "renderer.backgroundAlpha has been deprecated, use renderer.background.alpha instead.");
      this.background.alpha = value;
    }
    get powerPreference() {
      deprecation("7.0.0", "renderer.powerPreference has been deprecated, we can only know this if pixi creates the context");
      return this.context.powerPreference;
    }
    generateTexture(displayObject, options) {
      return this.textureGenerator.generateTexture(displayObject, options);
    }
  };
  var Renderer = _Renderer;
  Renderer.extension = {
    type: ExtensionType.Renderer,
    priority: 1
  };
  Renderer.__plugins = {};
  Renderer.__systems = {};
  extensions.handleByMap(ExtensionType.RendererPlugin, Renderer.__plugins);
  extensions.handleByMap(ExtensionType.RendererSystem, Renderer.__systems);
  extensions.add(Renderer);

  // node_modules/@pixi/core/lib/textures/resources/AbstractMultiResource.mjs
  var AbstractMultiResource = class extends Resource {
    constructor(length, options) {
      const { width, height } = options || {};
      super(width, height);
      this.items = [];
      this.itemDirtyIds = [];
      for (let i2 = 0; i2 < length; i2++) {
        const partTexture = new BaseTexture();
        this.items.push(partTexture);
        this.itemDirtyIds.push(-2);
      }
      this.length = length;
      this._load = null;
      this.baseTexture = null;
    }
    initFromArray(resources, options) {
      for (let i2 = 0; i2 < this.length; i2++) {
        if (!resources[i2]) {
          continue;
        }
        if (resources[i2].castToBaseTexture) {
          this.addBaseTextureAt(resources[i2].castToBaseTexture(), i2);
        } else if (resources[i2] instanceof Resource) {
          this.addResourceAt(resources[i2], i2);
        } else {
          this.addResourceAt(autoDetectResource(resources[i2], options), i2);
        }
      }
    }
    dispose() {
      for (let i2 = 0, len = this.length; i2 < len; i2++) {
        this.items[i2].destroy();
      }
      this.items = null;
      this.itemDirtyIds = null;
      this._load = null;
    }
    addResourceAt(resource, index) {
      if (!this.items[index]) {
        throw new Error(`Index ${index} is out of bounds`);
      }
      if (resource.valid && !this.valid) {
        this.resize(resource.width, resource.height);
      }
      this.items[index].setResource(resource);
      return this;
    }
    bind(baseTexture) {
      if (this.baseTexture !== null) {
        throw new Error("Only one base texture per TextureArray is allowed");
      }
      super.bind(baseTexture);
      for (let i2 = 0; i2 < this.length; i2++) {
        this.items[i2].parentTextureArray = baseTexture;
        this.items[i2].on("update", baseTexture.update, baseTexture);
      }
    }
    unbind(baseTexture) {
      super.unbind(baseTexture);
      for (let i2 = 0; i2 < this.length; i2++) {
        this.items[i2].parentTextureArray = null;
        this.items[i2].off("update", baseTexture.update, baseTexture);
      }
    }
    load() {
      if (this._load) {
        return this._load;
      }
      const resources = this.items.map((item) => item.resource).filter((item) => item);
      const promises = resources.map((item) => item.load());
      this._load = Promise.all(promises).then(() => {
        const { realWidth, realHeight } = this.items[0];
        this.resize(realWidth, realHeight);
        return Promise.resolve(this);
      });
      return this._load;
    }
  };

  // node_modules/@pixi/core/lib/textures/resources/ArrayResource.mjs
  var ArrayResource = class extends AbstractMultiResource {
    constructor(source, options) {
      const { width, height } = options || {};
      let urls;
      let length;
      if (Array.isArray(source)) {
        urls = source;
        length = source.length;
      } else {
        length = source;
      }
      super(length, { width, height });
      if (urls) {
        this.initFromArray(urls, options);
      }
    }
    addBaseTextureAt(baseTexture, index) {
      if (baseTexture.resource) {
        this.addResourceAt(baseTexture.resource, index);
      } else {
        throw new Error("ArrayResource does not support RenderTexture");
      }
      return this;
    }
    bind(baseTexture) {
      super.bind(baseTexture);
      baseTexture.target = TARGETS.TEXTURE_2D_ARRAY;
    }
    upload(renderer, texture, glTexture) {
      const { length, itemDirtyIds, items } = this;
      const { gl } = renderer;
      if (glTexture.dirtyId < 0) {
        gl.texImage3D(gl.TEXTURE_2D_ARRAY, 0, glTexture.internalFormat, this._width, this._height, length, 0, texture.format, glTexture.type, null);
      }
      for (let i2 = 0; i2 < length; i2++) {
        const item = items[i2];
        if (itemDirtyIds[i2] < item.dirtyId) {
          itemDirtyIds[i2] = item.dirtyId;
          if (item.valid) {
            gl.texSubImage3D(gl.TEXTURE_2D_ARRAY, 0, 0, 0, i2, item.resource.width, item.resource.height, 1, texture.format, glTexture.type, item.resource.source);
          }
        }
      }
      return true;
    }
  };

  // node_modules/@pixi/core/lib/textures/resources/CanvasResource.mjs
  var CanvasResource = class extends BaseImageResource {
    constructor(source) {
      super(source);
    }
    static test(source) {
      const { OffscreenCanvas } = globalThis;
      if (OffscreenCanvas && source instanceof OffscreenCanvas) {
        return true;
      }
      return globalThis.HTMLCanvasElement && source instanceof HTMLCanvasElement;
    }
  };

  // node_modules/@pixi/core/lib/textures/resources/CubeResource.mjs
  var _CubeResource = class extends AbstractMultiResource {
    constructor(source, options) {
      const { width, height, autoLoad, linkBaseTexture } = options || {};
      if (source && source.length !== _CubeResource.SIDES) {
        throw new Error(`Invalid length. Got ${source.length}, expected 6`);
      }
      super(6, { width, height });
      for (let i2 = 0; i2 < _CubeResource.SIDES; i2++) {
        this.items[i2].target = TARGETS.TEXTURE_CUBE_MAP_POSITIVE_X + i2;
      }
      this.linkBaseTexture = linkBaseTexture !== false;
      if (source) {
        this.initFromArray(source, options);
      }
      if (autoLoad !== false) {
        this.load();
      }
    }
    bind(baseTexture) {
      super.bind(baseTexture);
      baseTexture.target = TARGETS.TEXTURE_CUBE_MAP;
    }
    addBaseTextureAt(baseTexture, index, linkBaseTexture) {
      if (linkBaseTexture === void 0) {
        linkBaseTexture = this.linkBaseTexture;
      }
      if (!this.items[index]) {
        throw new Error(`Index ${index} is out of bounds`);
      }
      if (!this.linkBaseTexture || baseTexture.parentTextureArray || Object.keys(baseTexture._glTextures).length > 0) {
        if (baseTexture.resource) {
          this.addResourceAt(baseTexture.resource, index);
        } else {
          throw new Error(`CubeResource does not support copying of renderTexture.`);
        }
      } else {
        baseTexture.target = TARGETS.TEXTURE_CUBE_MAP_POSITIVE_X + index;
        baseTexture.parentTextureArray = this.baseTexture;
        this.items[index] = baseTexture;
      }
      if (baseTexture.valid && !this.valid) {
        this.resize(baseTexture.realWidth, baseTexture.realHeight);
      }
      this.items[index] = baseTexture;
      return this;
    }
    upload(renderer, _baseTexture, glTexture) {
      const dirty = this.itemDirtyIds;
      for (let i2 = 0; i2 < _CubeResource.SIDES; i2++) {
        const side = this.items[i2];
        if (dirty[i2] < side.dirtyId || glTexture.dirtyId < _baseTexture.dirtyId) {
          if (side.valid && side.resource) {
            side.resource.upload(renderer, side, glTexture);
            dirty[i2] = side.dirtyId;
          } else if (dirty[i2] < -1) {
            renderer.gl.texImage2D(side.target, 0, glTexture.internalFormat, _baseTexture.realWidth, _baseTexture.realHeight, 0, _baseTexture.format, glTexture.type, null);
            dirty[i2] = -1;
          }
        }
      }
      return true;
    }
    static test(source) {
      return Array.isArray(source) && source.length === _CubeResource.SIDES;
    }
  };
  var CubeResource = _CubeResource;
  CubeResource.SIDES = 6;

  // node_modules/@pixi/core/lib/textures/resources/ImageBitmapResource.mjs
  var ImageBitmapResource = class extends BaseImageResource {
    constructor(source, options) {
      options = options || {};
      let baseSource;
      let url2;
      if (typeof source === "string") {
        baseSource = ImageBitmapResource.EMPTY;
        url2 = source;
      } else {
        baseSource = source;
        url2 = null;
      }
      super(baseSource);
      this.url = url2;
      this.crossOrigin = options.crossOrigin ?? true;
      this.alphaMode = typeof options.alphaMode === "number" ? options.alphaMode : null;
      this._load = null;
      if (options.autoLoad !== false) {
        this.load();
      }
    }
    load() {
      if (this._load) {
        return this._load;
      }
      this._load = new Promise(async (resolve2, reject) => {
        if (this.url === null) {
          resolve2(this);
          return;
        }
        try {
          const response = await settings.ADAPTER.fetch(this.url, {
            mode: this.crossOrigin ? "cors" : "no-cors"
          });
          if (this.destroyed)
            return;
          const imageBlob = await response.blob();
          if (this.destroyed)
            return;
          const imageBitmap = await createImageBitmap(imageBlob, {
            premultiplyAlpha: this.alphaMode === null || this.alphaMode === ALPHA_MODES.UNPACK ? "premultiply" : "none"
          });
          if (this.destroyed)
            return;
          this.source = imageBitmap;
          this.update();
          resolve2(this);
        } catch (e2) {
          if (this.destroyed)
            return;
          reject(e2);
          this.onError.emit(e2);
        }
      });
      return this._load;
    }
    upload(renderer, baseTexture, glTexture) {
      if (!(this.source instanceof ImageBitmap)) {
        this.load();
        return false;
      }
      if (typeof this.alphaMode === "number") {
        baseTexture.alphaMode = this.alphaMode;
      }
      return super.upload(renderer, baseTexture, glTexture);
    }
    dispose() {
      if (this.source instanceof ImageBitmap) {
        this.source.close();
      }
      super.dispose();
      this._load = null;
    }
    static test(source) {
      return !!globalThis.createImageBitmap && typeof ImageBitmap !== "undefined" && (typeof source === "string" || source instanceof ImageBitmap);
    }
    static get EMPTY() {
      ImageBitmapResource._EMPTY = ImageBitmapResource._EMPTY ?? settings.ADAPTER.createCanvas(0, 0);
      return ImageBitmapResource._EMPTY;
    }
  };

  // node_modules/@pixi/core/lib/textures/resources/SVGResource.mjs
  var _SVGResource = class extends BaseImageResource {
    constructor(sourceBase64, options) {
      options = options || {};
      super(settings.ADAPTER.createCanvas());
      this._width = 0;
      this._height = 0;
      this.svg = sourceBase64;
      this.scale = options.scale || 1;
      this._overrideWidth = options.width;
      this._overrideHeight = options.height;
      this._resolve = null;
      this._crossorigin = options.crossorigin;
      this._load = null;
      if (options.autoLoad !== false) {
        this.load();
      }
    }
    load() {
      if (this._load) {
        return this._load;
      }
      this._load = new Promise((resolve2) => {
        this._resolve = () => {
          this.resize(this.source.width, this.source.height);
          resolve2(this);
        };
        if (_SVGResource.SVG_XML.test(this.svg.trim())) {
          if (!btoa) {
            throw new Error("Your browser doesn't support base64 conversions.");
          }
          this.svg = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(this.svg)))}`;
        }
        this._loadSvg();
      });
      return this._load;
    }
    _loadSvg() {
      const tempImage = new Image();
      BaseImageResource.crossOrigin(tempImage, this.svg, this._crossorigin);
      tempImage.src = this.svg;
      tempImage.onerror = (event) => {
        if (!this._resolve) {
          return;
        }
        tempImage.onerror = null;
        this.onError.emit(event);
      };
      tempImage.onload = () => {
        if (!this._resolve) {
          return;
        }
        const svgWidth = tempImage.width;
        const svgHeight = tempImage.height;
        if (!svgWidth || !svgHeight) {
          throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
        }
        let width = svgWidth * this.scale;
        let height = svgHeight * this.scale;
        if (this._overrideWidth || this._overrideHeight) {
          width = this._overrideWidth || this._overrideHeight / svgHeight * svgWidth;
          height = this._overrideHeight || this._overrideWidth / svgWidth * svgHeight;
        }
        width = Math.round(width);
        height = Math.round(height);
        const canvas = this.source;
        canvas.width = width;
        canvas.height = height;
        canvas._pixiId = `canvas_${uid()}`;
        canvas.getContext("2d").drawImage(tempImage, 0, 0, svgWidth, svgHeight, 0, 0, width, height);
        this._resolve();
        this._resolve = null;
      };
    }
    static getSize(svgString) {
      const sizeMatch = _SVGResource.SVG_SIZE.exec(svgString);
      const size = {};
      if (sizeMatch) {
        size[sizeMatch[1]] = Math.round(parseFloat(sizeMatch[3]));
        size[sizeMatch[5]] = Math.round(parseFloat(sizeMatch[7]));
      }
      return size;
    }
    dispose() {
      super.dispose();
      this._resolve = null;
      this._crossorigin = null;
    }
    static test(source, extension) {
      return extension === "svg" || typeof source === "string" && source.startsWith("data:image/svg+xml") || typeof source === "string" && _SVGResource.SVG_XML.test(source);
    }
  };
  var SVGResource = _SVGResource;
  SVGResource.SVG_XML = /^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m;
  SVGResource.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i;

  // node_modules/@pixi/core/lib/textures/resources/VideoResource.mjs
  var _VideoResource = class extends BaseImageResource {
    constructor(source, options) {
      options = options || {};
      if (!(source instanceof HTMLVideoElement)) {
        const videoElement = document.createElement("video");
        videoElement.setAttribute("preload", "auto");
        videoElement.setAttribute("webkit-playsinline", "");
        videoElement.setAttribute("playsinline", "");
        if (typeof source === "string") {
          source = [source];
        }
        const firstSrc = source[0].src || source[0];
        BaseImageResource.crossOrigin(videoElement, firstSrc, options.crossorigin);
        for (let i2 = 0; i2 < source.length; ++i2) {
          const sourceElement = document.createElement("source");
          let { src, mime } = source[i2];
          src = src || source[i2];
          const baseSrc = src.split("?").shift().toLowerCase();
          const ext = baseSrc.slice(baseSrc.lastIndexOf(".") + 1);
          mime = mime || _VideoResource.MIME_TYPES[ext] || `video/${ext}`;
          sourceElement.src = src;
          sourceElement.type = mime;
          videoElement.appendChild(sourceElement);
        }
        source = videoElement;
      }
      super(source);
      this.noSubImage = true;
      this._autoUpdate = true;
      this._isConnectedToTicker = false;
      this._updateFPS = options.updateFPS || 0;
      this._msToNextUpdate = 0;
      this.autoPlay = options.autoPlay !== false;
      this._load = null;
      this._resolve = null;
      this._onCanPlay = this._onCanPlay.bind(this);
      this._onError = this._onError.bind(this);
      if (options.autoLoad !== false) {
        this.load();
      }
    }
    update(_deltaTime = 0) {
      if (!this.destroyed) {
        const elapsedMS = Ticker.shared.elapsedMS * this.source.playbackRate;
        this._msToNextUpdate = Math.floor(this._msToNextUpdate - elapsedMS);
        if (!this._updateFPS || this._msToNextUpdate <= 0) {
          super.update();
          this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0;
        }
      }
    }
    load() {
      if (this._load) {
        return this._load;
      }
      const source = this.source;
      if ((source.readyState === source.HAVE_ENOUGH_DATA || source.readyState === source.HAVE_FUTURE_DATA) && source.width && source.height) {
        source.complete = true;
      }
      source.addEventListener("play", this._onPlayStart.bind(this));
      source.addEventListener("pause", this._onPlayStop.bind(this));
      if (!this._isSourceReady()) {
        source.addEventListener("canplay", this._onCanPlay);
        source.addEventListener("canplaythrough", this._onCanPlay);
        source.addEventListener("error", this._onError, true);
      } else {
        this._onCanPlay();
      }
      this._load = new Promise((resolve2) => {
        if (this.valid) {
          resolve2(this);
        } else {
          this._resolve = resolve2;
          source.load();
        }
      });
      return this._load;
    }
    _onError(event) {
      this.source.removeEventListener("error", this._onError, true);
      this.onError.emit(event);
    }
    _isSourcePlaying() {
      const source = this.source;
      return !source.paused && !source.ended && this._isSourceReady();
    }
    _isSourceReady() {
      const source = this.source;
      return source.readyState > 2;
    }
    _onPlayStart() {
      if (!this.valid) {
        this._onCanPlay();
      }
      if (this.autoUpdate && !this._isConnectedToTicker) {
        Ticker.shared.add(this.update, this);
        this._isConnectedToTicker = true;
      }
    }
    _onPlayStop() {
      if (this._isConnectedToTicker) {
        Ticker.shared.remove(this.update, this);
        this._isConnectedToTicker = false;
      }
    }
    _onCanPlay() {
      const source = this.source;
      source.removeEventListener("canplay", this._onCanPlay);
      source.removeEventListener("canplaythrough", this._onCanPlay);
      const valid = this.valid;
      this.resize(source.videoWidth, source.videoHeight);
      if (!valid && this._resolve) {
        this._resolve(this);
        this._resolve = null;
      }
      if (this._isSourcePlaying()) {
        this._onPlayStart();
      } else if (this.autoPlay) {
        source.play();
      }
    }
    dispose() {
      if (this._isConnectedToTicker) {
        Ticker.shared.remove(this.update, this);
        this._isConnectedToTicker = false;
      }
      const source = this.source;
      if (source) {
        source.removeEventListener("error", this._onError, true);
        source.pause();
        source.src = "";
        source.load();
      }
      super.dispose();
    }
    get autoUpdate() {
      return this._autoUpdate;
    }
    set autoUpdate(value) {
      if (value !== this._autoUpdate) {
        this._autoUpdate = value;
        if (!this._autoUpdate && this._isConnectedToTicker) {
          Ticker.shared.remove(this.update, this);
          this._isConnectedToTicker = false;
        } else if (this._autoUpdate && !this._isConnectedToTicker && this._isSourcePlaying()) {
          Ticker.shared.add(this.update, this);
          this._isConnectedToTicker = true;
        }
      }
    }
    get updateFPS() {
      return this._updateFPS;
    }
    set updateFPS(value) {
      if (value !== this._updateFPS) {
        this._updateFPS = value;
      }
    }
    static test(source, extension) {
      return globalThis.HTMLVideoElement && source instanceof HTMLVideoElement || _VideoResource.TYPES.includes(extension);
    }
  };
  var VideoResource = _VideoResource;
  VideoResource.TYPES = ["mp4", "m4v", "webm", "ogg", "ogv", "h264", "avi", "mov"];
  VideoResource.MIME_TYPES = {
    ogv: "video/ogg",
    mov: "video/quicktime",
    m4v: "video/mp4"
  };

  // node_modules/@pixi/core/lib/textures/resources/index.mjs
  INSTALLED.push(ImageBitmapResource, ImageResource, CanvasResource, VideoResource, SVGResource, BufferResource, CubeResource, ArrayResource);

  // src/AtlasResource.ts
  var AtlasResource = class extends Resource {
    /**
     * Creates an atlas resource.
     *
     * @param width
     * @param height
     */
    constructor(width, height) {
      super(width, height);
      this.managedItems = [];
    }
    /**
     * Uploads the atlas.
     *
     * @param renderer
     * @param baseTexture
     * @param glTexture
     */
    upload(renderer, baseTexture, glTexture) {
      const gl = renderer.gl;
      const width = baseTexture.realWidth;
      const height = baseTexture.realHeight;
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, baseTexture.alphaMode === ALPHA_MODES.UNPACK);
      if (glTexture.width !== width || glTexture.height !== height) {
        glTexture.width = width;
        glTexture.height = height;
        gl.texImage2D(
          baseTexture.target,
          0,
          baseTexture.format,
          width,
          height,
          0,
          baseTexture.format,
          baseTexture.type,
          void 0
        );
      }
      const items = this.managedItems;
      for (let i2 = 0, j2 = items.length; i2 < j2; i2++) {
        this.uploadItem(
          renderer,
          baseTexture.target,
          baseTexture.format,
          baseTexture.type,
          items[i2]
        );
      }
      return true;
    }
    /**
     * Uploads the atlas item to the GPU.
     *
     * @param renderer - The renderer holding the WebGL context.
     * @param target - The binding point of the base-texture.
     * @param format - The format of the base-texture.
     * @param type - The type of the base-texture data.
     * @param item - The item to upload.
     */
    uploadItem(renderer, target, format2, type, item) {
      if (item.updateId === item.dirtyId) {
        return;
      }
      const gl = renderer.gl;
      const isWebGL2 = gl instanceof WebGL2RenderingContext;
      const frame = item.frame;
      let source = item.source;
      if (!isWebGL2) {
        if (source instanceof ImageData) {
          source = source.data;
        } else if (source instanceof HTMLCanvasElement) {
          const ctx = source.getContext("2d");
          const [w2, h2] = [source.width, source.height];
          source = ctx.getImageData(0, 0, w2, h2).data;
        } else if (source instanceof HTMLImageElement) {
          const [w2, h2] = [source.naturalWidth, source.naturalHeight];
          const canvas = document.createElement("canvas");
          canvas.width = w2;
          canvas.height = h2;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(source, 0, 0);
          source = ctx.getImageData(0, 0, w2, h2).data;
        }
      }
      gl.texSubImage2D(
        target,
        0,
        frame.x,
        frame.y,
        frame.width,
        frame.height,
        format2,
        type,
        source
      );
      item.updateId = item.dirtyId;
    }
  };

  // src/GuilloteneAllocator.ts
  var SPLIT_ORIENTATION = /* @__PURE__ */ ((SPLIT_ORIENTATION2) => {
    SPLIT_ORIENTATION2[SPLIT_ORIENTATION2["HOR"] = 0] = "HOR";
    SPLIT_ORIENTATION2[SPLIT_ORIENTATION2["VERT"] = 1] = "VERT";
    SPLIT_ORIENTATION2[SPLIT_ORIENTATION2["NONE"] = 2] = "NONE";
    return SPLIT_ORIENTATION2;
  })(SPLIT_ORIENTATION || {});
  var tempRect3 = new Rectangle();
  var GuilloteneAllocator = class {
    constructor(width, height) {
      this._width = width;
      this._height = height;
      this._root = [
        null,
        Area.makeArea(0, this._height, 0 /* HORIZONTAL */),
        false
      ];
    }
    /**
     * Allocates an area of the given `width` and `height`.
     *
     * @param width - The width required for the allocated area.
     * @param height - The height required for the allocated area.
     * @param rect - An optional `Rectangle` instance to put the resulting area frame into.
     * @return The rectangle frame of the area allocated.
     */
    allocate(width, height, rect) {
      const area = this.findArea(width, height);
      if (!area) {
        return null;
      }
      if (!rect) {
        rect = new Rectangle();
      }
      this.getFrame(area, rect);
      const hole = new Rectangle(rect.x, rect.y, width, height);
      const node = this.split(area, rect, hole);
      rect.copyFrom(hole);
      rect.__mem_area = node;
      return rect;
    }
    /**
     * Frees the area represented by the given area pointer. The original rectangle returned by
     * {@link GuilloteneAllocator#allocate} included this pointer (the `__mem_area` property).
     *
     * @param areaPtr
     */
    free(areaPtr) {
      const area = areaPtr.__mem_area;
      area[2] = false;
      this.merge(area);
    }
    get width() {
      return this._width;
    }
    get height() {
      return this._height;
    }
    /**
     * Returns the [area]{@link Area} data for the node.
     *
     * @param node
     * @returns The area data for the node.
     */
    getAreaField(node) {
      return node[1];
    }
    /**
     * Returns the rectangle covered by the area node.
     *
     * @param node - The node whose covered rectangular area is needed.
     * @param rect - An optional `Rectangle` instance to put the data in.
     * @return The rectangle covered by `node`.
     */
    getFrame(node, rect) {
      if (!rect) {
        rect = new Rectangle();
      }
      const nodeArea = this.getAreaField(node);
      const nodeParent = this.getParent(node);
      const nodeOrientation = Area.getOrientation(nodeArea);
      const nodeOpen = Area.getOpenOffset(nodeArea);
      const nodeClose = Area.getCloseOffset(nodeArea);
      const parentOpen = nodeParent ? Area.getOpenOffset(nodeParent[1]) : 0;
      const parentClose = nodeParent ? Area.getCloseOffset(nodeParent[1]) : this._width;
      if (nodeOrientation) {
        rect.x = nodeOpen;
        rect.y = parentOpen;
        rect.width = nodeClose - rect.x;
        rect.height = parentClose - parentOpen;
      } else {
        rect.x = parentOpen;
        rect.y = nodeOpen;
        rect.width = parentClose - rect.x;
        rect.height = nodeClose - rect.y;
      }
      return rect;
    }
    /**
     * Returns the parent of the area node.
     *
     * @param node
     * @return The parent of `node`
     */
    getParent(node) {
      return node[0];
    }
    /**
     * Returns whether the given node has any children.
     *
     * @param node
     * @return Whether the given node has any children.
     */
    hasChildren(node) {
      return Array.isArray(node[2]) && node[2].length !== 0;
    }
    /**
     * Returns the children of the passed node, if any.
     *
     * @param node
     */
    getChildren(node) {
      if (!Array.isArray(node[2])) {
        throw new Error("Children don't exist");
      }
      return node[2];
    }
    addChild(parent, ...nodes) {
      parent[2] = Array.isArray(parent[2]) ? parent[2] : [];
      parent[2].push(...nodes);
    }
    /**
     * Finds an area node with minimum width `aw` and minimum height `ah`.
     *
     * @param aw
     * @param ah
     */
    findArea(aw, ah) {
      return this.findAreaRecursive(this._root, aw, ah);
    }
    /**
     * The recursive implementation for {@link AreaAllocator#findArea}.
     *
     * @param rootArea
     * @param aw
     * @param ah
     */
    findAreaRecursive(rootArea, aw, ah) {
      const frame = this.getFrame(rootArea, tempRect3);
      if (frame.width < aw || frame.height < ah) {
        return null;
      }
      if (!this.hasChildren(rootArea)) {
        const dx = frame.width - aw;
        const dy = frame.height - ah;
        if (dx < 0 || dy < 0 || rootArea[2]) {
          return null;
        }
        return rootArea;
      }
      const children = this.getChildren(rootArea);
      let bestCandidate = null;
      let bestCandidateScore = Infinity;
      for (let i2 = 0, j2 = children.length; i2 < j2; i2++) {
        const candidate = this.findAreaRecursive(children[i2], aw, ah);
        if (!candidate) {
          continue;
        }
        const candidateFrame = this.getFrame(candidate, tempRect3);
        const dx = candidateFrame.width - aw;
        const dy = candidateFrame.height - ah;
        if (dx < 0 || dy < 0) {
          continue;
        }
        if (!dx && !dy) {
          return candidate;
        }
        const score = Math.min(dx, dy);
        if (bestCandidateScore > score) {
          bestCandidate = candidate;
          bestCandidateScore = score;
        }
      }
      return bestCandidate;
    }
    /**
     * Returns the orientation of the primary split of host.
     */
    splitOrientation(host, hole) {
      if (hole.width === host.width && hole.height === host.height) {
        return 2 /* NONE */;
      }
      if (hole.width === host.width) {
        return 1 /* VERT */;
      }
      if (hole.height === host.height) {
        return 0 /* HOR */;
      }
      const horAreaDiff = Math.abs(
        // (Primary) Right
        (host.width - hole.width) * host.height - // (Secondary) Bottom
        hole.width * (host.height - hole.height)
      );
      const verAreaDiff = Math.abs(
        // (Primary) Bottom
        host.width * (host.height - hole.height) - (host.width - hole.width) * hole.height
      );
      if (horAreaDiff > verAreaDiff) {
        return 0 /* HOR */;
      } else {
        return 1 /* VERT */;
      }
    }
    split(area, areaFrame, holeFrame, orientation = this.getParent(area) ? this.splitOrientation(areaFrame, holeFrame) : 0 /* HOR */) {
      if (area[2] === true) {
        throw new Error("Cannot deallocate");
      }
      if (orientation === 2 /* NONE */) {
        area[2] = true;
        return area;
      }
      return this[orientation === 0 /* HOR */ ? "splitPrimaryHorizontal" : "splitPrimaryVertical"](area, areaFrame, holeFrame);
    }
    splitPrimaryHorizontal(area, areaFrame, holeFrame) {
      const field = this.getAreaField(area);
      const axis = Area.getOrientation(field);
      const parent = this.getParent(area);
      if (this.hasChildren(area)) {
        throw new Error("Can't split non-leaf node");
      }
      const firstChild = [
        area,
        Area.makeArea(
          areaFrame.left,
          areaFrame.x + holeFrame.width,
          1 /* VERTICAL */
        ),
        []
      ];
      const secondChild = [
        area,
        Area.makeArea(
          areaFrame.x + holeFrame.width,
          areaFrame.right,
          1 /* VERTICAL */
        ),
        false
      ];
      if (axis === 0 /* HORIZONTAL */) {
        this.addChild(area, firstChild, secondChild);
      } else {
        const i2 = this.getChildren(parent).indexOf(area);
        firstChild[0] = parent;
        secondChild[0] = parent;
        this.getChildren(parent).splice(i2, 1, firstChild, secondChild);
      }
      if (holeFrame.height !== areaFrame.height) {
        const secondaryFirstChild = [
          firstChild,
          Area.makeArea(
            areaFrame.top,
            areaFrame.y + holeFrame.height,
            0 /* HORIZONTAL */
          ),
          true
        ];
        const secondarySecondChild = [
          firstChild,
          Area.makeArea(
            areaFrame.y + holeFrame.height,
            areaFrame.bottom,
            0 /* HORIZONTAL */
          ),
          false
        ];
        this.addChild(firstChild, secondaryFirstChild, secondarySecondChild);
        return secondaryFirstChild;
      } else {
        firstChild[2] = true;
      }
      return firstChild;
    }
    splitPrimaryVertical(area, areaFrame, holeFrame) {
      const field = this.getAreaField(area);
      const axis = Area.getOrientation(field);
      const parent = this.getParent(area);
      if (this.hasChildren(area)) {
        throw new Error("Can't split non-leaf node");
      }
      const primaryFirstChild = [
        area,
        Area.makeArea(
          areaFrame.top,
          areaFrame.y + holeFrame.height,
          0 /* HORIZONTAL */
        ),
        []
      ];
      const primarySecondChild = [
        area,
        Area.makeArea(
          areaFrame.y + holeFrame.height,
          areaFrame.bottom,
          0 /* HORIZONTAL */
        ),
        false
      ];
      if (axis === 1 /* VERTICAL */) {
        this.addChild(area, primaryFirstChild, primarySecondChild);
      } else {
        const i2 = this.getChildren(parent).indexOf(area);
        primaryFirstChild[0] = parent;
        primarySecondChild[0] = parent;
        this.getChildren(parent).splice(i2, 1, primaryFirstChild, primarySecondChild);
      }
      if (holeFrame.width !== areaFrame.height) {
        const secondaryFirstChild = [
          primaryFirstChild,
          Area.makeArea(
            areaFrame.left,
            areaFrame.x + holeFrame.width,
            1 /* VERTICAL */
          ),
          true
        ];
        const secondarySecondChild = [
          primaryFirstChild,
          Area.makeArea(
            areaFrame.x + holeFrame.width,
            areaFrame.right,
            1 /* VERTICAL */
          ),
          false
        ];
        this.addChild(primaryFirstChild, secondaryFirstChild, secondarySecondChild);
        return secondaryFirstChild;
      } else {
        primaryFirstChild[2] = true;
      }
      return primaryFirstChild;
    }
    merge(area) {
      if (this.hasChildren(area)) {
        throw new Error("Cannot merge a non-leaf node");
      }
      const parent = this.getParent(area);
      if (!parent) {
        return;
      }
      const siblings = this.getChildren(parent);
      const i2 = siblings.indexOf(area);
      const leftSibling = siblings[i2 - 1];
      const rightSibling = siblings[i2 + 1];
      if (rightSibling && rightSibling[2] === false) {
        area[1] = Area.setCloseOffset(area[1], Area.getCloseOffset(rightSibling[1]));
        siblings.splice(i2 + 1, 1);
      }
      if (leftSibling && leftSibling[2] === false) {
        area[1] = Area.setOpenOffset(area[1], Area.getOpenOffset(leftSibling[1]));
        siblings.splice(i2 - 1, 1);
      }
      if (siblings.length === 1) {
        parent[2] = false;
        this.merge(parent);
      }
    }
    printState(area) {
      if (!this.hasChildren(area)) {
        console.log({ ...this.getFrame(area) }, area[2]);
      } else {
        this.getChildren(area).forEach((n2) => this.printState(n2));
      }
    }
  };

  // src/TextureAllocator.ts
  var tempRect4 = new Rectangle();
  var TextureAllocator = class {
    /**
     * @param slabWidth - The width of base-texture slabs. This should be at most 2048.
     * @param slabHeight - The height of base-texture slabs. This should be at most 2048.
     */
    constructor(slabWidth = 2048, slabHeight = 2048) {
      this.slabWidth = slabWidth;
      this.slabHeight = slabHeight;
      this.textureSlabs = [];
    }
    get maxWidth() {
      return this.slabWidth - 2 * this.calculatePadding(this.slabWidth, this.slabHeight);
    }
    get maxHeight() {
      return this.slabHeight - 2 * this.calculatePadding(this.slabWidth, this.slabHeight);
    }
    /**
     * Allocates a texture from this allocator.
     *
     * If its existing slab pool has enough space, the texture is issued from one. Otherwise,
     * a new slab is created and the texture is issued from it. However, if the requested
     * dimensions are larger than slabs themselves, then `null` is always returned.
     *
     * To upload a texture source, you will have to create an atlas-managing {@link Resource}
     * yourself on the base-texture. The {@link AtlasAllocator} does this for you, while the
     * {@link CanvasTextureAllocator} can be used to draw on a canvas-based atlas.
     *
     * @param width - The width of the requested texture.
     * @param height - The height of the requested texture.
     * @param padding - The padding requested around the texture, to prevent bleeding.
     * @return The allocated texture, if successful; otherwise, `null`.
     */
    allocate(width, height, padding = this.calculatePadding(width, height)) {
      if (width + 2 * padding > this.slabWidth || height + 2 * padding > this.slabHeight) {
        return null;
      }
      const slabs = this.textureSlabs;
      for (let i2 = 0, j2 = slabs.length; i2 < j2; i2++) {
        const slab2 = slabs[i2];
        const texture = this.issueTexture(slab2, width, height, padding);
        if (texture) {
          return texture;
        }
      }
      const slab = this.createSlab();
      this.textureSlabs.unshift(slab);
      return this.issueTexture(slab, width, height, padding);
    }
    /**
     * Frees the texture and reclaims its space. It is assumed you will not use it again, and have
     * destroyed any resource uploading its data.
     *
     * @param texture
     * @throws When the texture was not located in this allocator.
     */
    free(texture) {
      const baseTexture = texture.baseTexture;
      const slab = this.textureSlabs.find((sl) => sl.slab === baseTexture);
      if (!slab) {
        throw new Error("The texture cannot be freed because its base-texture is not pooled by this allocator. This is either a bug in TextureAllocator or you tried to free a texture that was never allocated by one.");
      }
      const textureEntry = slab.managedTextures.find((entry) => entry.texture === texture);
      if (!textureEntry) {
        throw new Error("The texture cannot be freed because it was not found in the managed list of issued textures on its slab. This may be because you duplicated this texture or a bug in TextureAllocator");
      }
      slab.managedArea.free(textureEntry.area);
      slab.managedTextures.splice(slab.managedTextures.indexOf(textureEntry), 1);
    }
    calculatePadding(width, height) {
      const dimen = Math.max(width, height);
      if (dimen < 64) {
        return 2;
      } else if (dimen < 128) {
        return 4;
      } else if (dimen < 1024) {
        return 8;
      } else {
        return 16;
      }
    }
    /**
     * Creates a texture slab. The slab's base-texture is not backed by any resource. You
     * will have to manage that yourself. See {@link AtlasAllocator} or {@link CanvasTextureAllocator}
     * for better resource semantics.
     */
    createSlab() {
      return {
        managedArea: new GuilloteneAllocator(this.slabWidth, this.slabHeight),
        managedTextures: [],
        slab: new BaseTexture(
          null,
          {
            width: this.slabWidth,
            height: this.slabHeight
          }
        )
      };
    }
    /**
     * Creates a texture on the given base-texture at {@code frame}.
     *
     * @param baseTexture - The base texture that will hold the texture's space.
     * @param frame - The frame in which the texture will be stored.
     */
    createTexture(baseTexture, frame) {
      return new Texture(baseTexture, frame);
    }
    /**
     * Issues a texture from the given texture slab, if possible.
     *
     * @param slab - The texture slab to allocate frame.
     * @param width - The width of the requested texture.
     * @param height - The height of the requested texture.
     * @param padding - Padding required around the texture.
     * @return The issued texture, if successful; otherwise, `null`.
     */
    issueTexture(slab, width, height, padding = 0) {
      const area = slab.managedArea.allocate(width + 2 * padding, height + 2 * padding);
      if (!area) {
        return null;
      }
      tempRect4.copyFrom(area);
      tempRect4.pad(-padding);
      const baseTexture = slab.slab;
      const issuedTexture = this.createTexture(baseTexture, tempRect4.clone());
      slab.managedTextures.push({
        area,
        texture: issuedTexture
      });
      return issuedTexture;
    }
  };

  // src/AtlasAllocator.ts
  var AtlasAllocator = class extends TextureAllocator {
    /**
     * Creates a texture slab backed by an {@link AtlasResource}.
     */
    createSlab() {
      return {
        managedArea: new GuilloteneAllocator(this.slabWidth, this.slabHeight),
        managedTextures: [],
        slab: new BaseTexture(
          new AtlasResource(this.slabWidth, this.slabHeight),
          {
            width: this.slabWidth,
            height: this.slabHeight
          }
        )
      };
    }
    allocate(width, height, paddingOrSource, source) {
      let padding;
      if (typeof paddingOrSource === "number") {
        padding = paddingOrSource;
      } else {
        padding = this.calculatePadding(width, height);
        source = paddingOrSource;
      }
      const texture = super.allocate(width, height, padding);
      if (source) {
        const atlas = texture.baseTexture.resource;
        const item = {
          frame: texture.frame,
          source,
          // dirtyId !== updateId only if image loaded
          dirtyId: source instanceof HTMLImageElement && !source.complete ? -1 : 0,
          updateId: -1,
          texture
        };
        atlas.managedItems.push(item);
        if (source instanceof HTMLImageElement && !source.complete) {
          source.addEventListener("load", () => {
            if (texture.baseTexture.valid && !texture.baseTexture.destroyed && atlas.managedItems.indexOf(item) >= 0) {
              item.dirtyId++;
              texture.baseTexture.update();
            }
          });
        }
        texture.baseTexture.update();
      }
      return texture;
    }
    free(texture) {
      super.free(texture);
      const atlas = texture.baseTexture.resource;
      const item = atlas.managedItems.find((item2) => item2.texture === texture);
      if (item) {
        atlas.managedItems.splice(atlas.managedItems.indexOf(item), 1);
      }
    }
  };

  // src/CanvasTextureAllocator.ts
  var CanvasTextureAllocator = class extends TextureAllocator {
    /**
     * Creates a texture slab backed by a canvas.
     */
    createSlab() {
      const canvas = document.createElement("canvas");
      canvas.width = this.slabWidth;
      canvas.height = this.slabHeight;
      return {
        managedArea: new GuilloteneAllocator(this.slabWidth, this.slabHeight),
        managedTextures: [],
        slab: new BaseTexture(canvas, {
          width: this.slabWidth,
          height: this.slabHeight
        })
      };
    }
  };

  // src/RenderTextureAllocator.ts
  var RenderTextureAllocator = class extends TextureAllocator {
    /**
     * Creates a texture slab backed by a base render-texture.
     */
    createSlab() {
      return {
        managedArea: new GuilloteneAllocator(this.slabWidth, this.slabHeight),
        managedTextures: [],
        slab: new BaseRenderTexture({
          width: this.slabWidth,
          height: this.slabHeight
        })
      };
    }
    /**
     * Creates a render-texture from the given base render-texture.
     *
     * @param baseTexture
     * @param frame
     */
    createTexture(baseTexture, frame) {
      return new RenderTexture(baseTexture, frame);
    }
  };
  return __toCommonJS(src_exports);
})();
/*! Bundled license information:

punycode/punycode.js:
  (*! https://mths.be/punycode v1.3.2 by @mathias *)
*/
//# sourceMappingURL=pixi-texture-allocator.iife.js.map
