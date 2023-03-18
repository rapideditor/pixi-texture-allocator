"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  DashLine: () => DashLine
});
module.exports = __toCommonJS(src_exports);
var import_core = require("@pixi/core");
var dashLineOptionsDefault = {
  dash: [10, 5],
  width: 1,
  color: 16777215,
  alpha: 1,
  scale: 1,
  useTexture: false,
  alignment: 0.5
};
var _DashLine = class {
  /**
   * Create a DashLine
   * @param graphics
   * @param [options]
   * @param [options.useTexture=false] - use the texture based render (useful for very large or very small dashed lines)
   * @param [options.dashes=[10,5] - an array holding the dash and gap (eg, [10, 5, 20, 5, ...])
   * @param [options.width=1] - width of the dashed line
   * @param [options.alpha=1] - alpha of the dashed line
   * @param [options.color=0xffffff] - color of the dashed line
   * @param [options.cap] - add a LINE_CAP style to dashed lines (only works for useTexture: false)
   * @param [options.join] - add a LINE_JOIN style to the dashed lines (only works for useTexture: false)
   * @param [options.alignment] - The alignment of any lines drawn (0.5 = middle, 1 = outer, 0 = inner)
   */
  constructor(graphics, options = {}) {
    /** cursor location */
    this.cursor = new import_core.Point();
    /** desired scale of line */
    this.scale = 1;
    this.graphics = graphics;
    options = { ...dashLineOptionsDefault, ...options };
    this.dash = options.dash;
    this.dashSize = this.dash.reduce((a, b) => a + b);
    this.useTexture = options.useTexture;
    this.options = options;
    this.setLineStyle();
  }
  /** resets line style to enable dashed line (useful if lineStyle was changed on graphics element) */
  setLineStyle() {
    const options = this.options;
    if (this.useTexture) {
      const texture = _DashLine.getTexture(options, this.dashSize);
      this.graphics.lineTextureStyle({
        width: options.width * options.scale,
        color: options.color,
        alpha: options.alpha,
        texture,
        alignment: options.alignment
      });
      this.activeTexture = texture;
    } else {
      this.graphics.lineStyle({
        width: options.width * options.scale,
        color: options.color,
        alpha: options.alpha,
        cap: options.cap,
        join: options.join,
        alignment: options.alignment
      });
    }
    this.scale = options.scale;
  }
  static distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
  moveTo(x, y) {
    this.lineLength = 0;
    this.cursor.set(x, y);
    this.start = new import_core.Point(x, y);
    this.graphics.moveTo(this.cursor.x, this.cursor.y);
    return this;
  }
  lineTo(x, y, closePath) {
    if (typeof this.lineLength === void 0) {
      this.moveTo(0, 0);
    }
    const length = _DashLine.distance(this.cursor.x, this.cursor.y, x, y);
    const angle = Math.atan2(y - this.cursor.y, x - this.cursor.x);
    const closed = closePath && x === this.start.x && y === this.start.y;
    if (this.useTexture) {
      this.graphics.moveTo(this.cursor.x, this.cursor.y);
      this.adjustLineStyle(angle);
      if (closed && this.dash.length % 2 === 0) {
        const gap = Math.min(this.dash[this.dash.length - 1], length);
        this.graphics.lineTo(x - Math.cos(angle) * gap, y - Math.sin(angle) * gap);
        this.graphics.closePath();
      } else {
        this.graphics.lineTo(x, y);
      }
    } else {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      let x0 = this.cursor.x;
      let y0 = this.cursor.y;
      const place = this.lineLength % (this.dashSize * this.scale);
      let dashIndex = 0, dashStart = 0;
      let dashX = 0;
      for (let i = 0; i < this.dash.length; i++) {
        const dashSize = this.dash[i] * this.scale;
        if (place < dashX + dashSize) {
          dashIndex = i;
          dashStart = place - dashX;
          break;
        } else {
          dashX += dashSize;
        }
      }
      let remaining = length;
      while (remaining > 0) {
        const dashSize = this.dash[dashIndex] * this.scale - dashStart;
        let dist = remaining > dashSize ? dashSize : remaining;
        if (closed) {
          const remainingDistance = _DashLine.distance(
            x0 + cos * dist,
            y0 + sin * dist,
            this.start.x,
            this.start.y
          );
          if (remainingDistance <= dist) {
            if (dashIndex % 2 === 0) {
              const lastDash = _DashLine.distance(x0, y0, this.start.x, this.start.y) - this.dash[this.dash.length - 1] * this.scale;
              x0 += cos * lastDash;
              y0 += sin * lastDash;
              this.graphics.lineTo(x0, y0);
            }
            break;
          }
        }
        x0 += cos * dist;
        y0 += sin * dist;
        if (dashIndex % 2) {
          this.graphics.moveTo(x0, y0);
        } else {
          this.graphics.lineTo(x0, y0);
        }
        remaining -= dist;
        dashIndex++;
        dashIndex = dashIndex === this.dash.length ? 0 : dashIndex;
        dashStart = 0;
      }
    }
    this.lineLength += length;
    this.cursor.set(x, y);
    return this;
  }
  closePath() {
    this.lineTo(this.start.x, this.start.y, true);
  }
  drawCircle(x, y, radius, points = 80, matrix) {
    const interval = Math.PI * 2 / points;
    let angle = 0, first;
    if (matrix) {
      first = new import_core.Point(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
      matrix.apply(first, first);
      this.moveTo(first[0], first[1]);
    } else {
      first = new import_core.Point(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
      this.moveTo(first.x, first.y);
    }
    angle += interval;
    for (let i = 1; i < points + 1; i++) {
      const next = i === points ? first : [x + Math.cos(angle) * radius, y + Math.sin(angle) * radius];
      this.lineTo(next[0], next[1]);
      angle += interval;
    }
    return this;
  }
  drawEllipse(x, y, radiusX, radiusY, points = 80, matrix) {
    const interval = Math.PI * 2 / points;
    let first;
    const point = new import_core.Point();
    let f = 0;
    for (let i = 0; i < Math.PI * 2; i += interval) {
      let x0 = x - radiusX * Math.sin(i);
      let y0 = y - radiusY * Math.cos(i);
      if (matrix) {
        point.set(x0, y0);
        matrix.apply(point, point);
        x0 = point.x;
        y0 = point.y;
      }
      if (i === 0) {
        this.moveTo(x0, y0);
        first = { x: x0, y: y0 };
      } else {
        this.lineTo(x0, y0);
      }
    }
    this.lineTo(first.x, first.y, true);
    return this;
  }
  drawPolygon(points, matrix) {
    const p = new import_core.Point();
    if (typeof points[0] === "number") {
      if (matrix) {
        p.set(points[0], points[1]);
        matrix.apply(p, p);
        this.moveTo(p.x, p.y);
        for (let i = 2; i < points.length; i += 2) {
          p.set(points[i], points[i + 1]);
          matrix.apply(p, p);
          this.lineTo(p.x, p.y, i === points.length - 2);
        }
      } else {
        this.moveTo(points[0], points[1]);
        for (let i = 2; i < points.length; i += 2) {
          this.lineTo(points[i], points[i + 1], i === points.length - 2);
        }
      }
    } else {
      if (matrix) {
        const point = points[0];
        p.copyFrom(point);
        matrix.apply(p, p);
        this.moveTo(p.x, p.y);
        for (let i = 1; i < points.length; i++) {
          const point2 = points[i];
          p.copyFrom(point2);
          matrix.apply(p, p);
          this.lineTo(p.x, p.y, i === points.length - 1);
        }
      } else {
        const point = points[0];
        this.moveTo(point.x, point.y);
        for (let i = 1; i < points.length; i++) {
          const point2 = points[i];
          this.lineTo(point2.x, point2.y, i === points.length - 1);
        }
      }
    }
    return this;
  }
  drawRect(x, y, width, height, matrix) {
    if (matrix) {
      const p = new import_core.Point();
      p.set(x, y);
      matrix.apply(p, p);
      this.moveTo(p.x, p.y);
      p.set(x + width, y);
      matrix.apply(p, p);
      this.lineTo(p.x, p.y);
      p.set(x + width, y + height);
      matrix.apply(p, p);
      this.lineTo(p.x, p.y);
      p.set(x, y + height);
      matrix.apply(p, p);
      this.lineTo(p.x, p.y);
      p.set(x, y);
      matrix.apply(p, p);
      this.lineTo(p.x, p.y, true);
    } else {
      this.moveTo(x, y).lineTo(x + width, y).lineTo(x + width, y + height).lineTo(x, y + height).lineTo(x, y, true);
    }
    return this;
  }
  // adjust the matrix for the dashed texture
  adjustLineStyle(angle) {
    const lineStyle = this.graphics.line;
    lineStyle.matrix = new import_core.Matrix();
    if (angle) {
      lineStyle.matrix.rotate(angle);
    }
    if (this.scale !== 1)
      lineStyle.matrix.scale(this.scale, this.scale);
    const textureStart = -this.lineLength;
    lineStyle.matrix.translate(
      this.cursor.x + textureStart * Math.cos(angle),
      this.cursor.y + textureStart * Math.sin(angle)
    );
    this.graphics.lineStyle(lineStyle);
  }
  // creates or uses cached texture
  static getTexture(options, dashSize) {
    const key = options.dash.toString();
    if (_DashLine.dashTextureCache[key]) {
      return _DashLine.dashTextureCache[key];
    }
    const canvas = document.createElement("canvas");
    canvas.width = dashSize;
    canvas.height = Math.ceil(options.width);
    const context = canvas.getContext("2d");
    if (!context) {
      console.warn("Did not get context from canvas");
      return null;
    }
    context.strokeStyle = "white";
    context.globalAlpha = options.alpha;
    context.lineWidth = options.width;
    let x = 0;
    const y = options.width / 2;
    context.moveTo(x, y);
    for (let i = 0; i < options.dash.length; i += 2) {
      x += options.dash[i];
      context.lineTo(x, y);
      if (options.dash.length !== i + 1) {
        x += options.dash[i + 1];
        context.moveTo(x, y);
      }
    }
    context.stroke();
    const texture = _DashLine.dashTextureCache[key] = import_core.Texture.from(canvas);
    texture.baseTexture.scaleMode = import_core.SCALE_MODES.NEAREST;
    return texture;
  }
};
var DashLine = _DashLine;
// cache of Textures for dashed lines
DashLine.dashTextureCache = {};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DashLine
});
//# sourceMappingURL=pixi-dashed-line.cjs.map
