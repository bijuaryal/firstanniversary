var rough = (function () {
  "use strict";
  function a() {
    return {
      LEFT: 0,
      RIGHT: 1,
      INTERSECTS: 2,
      AHEAD: 3,
      BEHIND: 4,
      SEPARATE: 5,
      UNDEFINED: 6,
    };
  }
  var b = Math.tan,
    c = Math.pow,
    d = Math.cos,
    e = Math.sin,
    f = Math.PI,
    g = Math.sqrt,
    h = Math.max,
    j = Math.min,
    i = Math.abs,
    k = Number.MAX_VALUE;
  class l {
    constructor(b, c, d, e) {
      (this.RoughSegmentRelationConst = a()),
        (this.px1 = b),
        (this.py1 = c),
        (this.px2 = d),
        (this.py2 = e),
        (this.xi = k),
        (this.yi = k),
        (this.a = e - c),
        (this.b = b - d),
        (this.c = d * c - b * e),
        (this._undefined = 0 == this.a && 0 == this.b && 0 == this.c);
    }
    isUndefined() {
      return this._undefined;
    }
    compare(d) {
      if (this.isUndefined() || d.isUndefined())
        return this.RoughSegmentRelationConst.UNDEFINED;
      var e = k,
        f = k,
        g = 0,
        l = 0,
        m = this.a,
        n = this.b,
        b = this.c;
      return (1e-5 < i(n) && ((e = -m / n), (g = -b / n)),
      1e-5 < i(d.b) && ((f = -d.a / d.b), (l = -d.c / d.b)),
      e == k)
        ? f == k
          ? -b / m == -d.c / d.a
            ? this.py1 >= j(d.py1, d.py2) && this.py1 <= h(d.py1, d.py2)
              ? ((this.xi = this.px1),
                (this.yi = this.py1),
                this.RoughSegmentRelationConst.INTERSECTS)
              : this.py2 >= j(d.py1, d.py2) && this.py2 <= h(d.py1, d.py2)
              ? ((this.xi = this.px2),
                (this.yi = this.py2),
                this.RoughSegmentRelationConst.INTERSECTS)
              : this.RoughSegmentRelationConst.SEPARATE
            : this.RoughSegmentRelationConst.SEPARATE
          : ((this.xi = this.px1),
            (this.yi = f * this.xi + l),
            -1e-5 > (this.py1 - this.yi) * (this.yi - this.py2) ||
            -1e-5 > (d.py1 - this.yi) * (this.yi - d.py2)
              ? this.RoughSegmentRelationConst.SEPARATE
              : 1e-5 > i(d.a)
              ? -1e-5 > (d.px1 - this.xi) * (this.xi - d.px2)
                ? this.RoughSegmentRelationConst.SEPARATE
                : this.RoughSegmentRelationConst.INTERSECTS
              : this.RoughSegmentRelationConst.INTERSECTS)
        : f == k
        ? ((this.xi = d.px1),
          (this.yi = e * this.xi + g),
          -1e-5 > (d.py1 - this.yi) * (this.yi - d.py2) ||
          -1e-5 > (this.py1 - this.yi) * (this.yi - this.py2)
            ? this.RoughSegmentRelationConst.SEPARATE
            : 1e-5 > i(m)
            ? -1e-5 > (this.px1 - this.xi) * (this.xi - this.px2)
              ? this.RoughSegmentRelationConst.SEPARATE
              : this.RoughSegmentRelationConst.INTERSECTS
            : this.RoughSegmentRelationConst.INTERSECTS)
        : e == f
        ? g == l
          ? this.px1 >= j(d.px1, d.px2) && this.px1 <= h(d.py1, d.py2)
            ? ((this.xi = this.px1),
              (this.yi = this.py1),
              this.RoughSegmentRelationConst.INTERSECTS)
            : this.px2 >= j(d.px1, d.px2) && this.px2 <= h(d.px1, d.px2)
            ? ((this.xi = this.px2),
              (this.yi = this.py2),
              this.RoughSegmentRelationConst.INTERSECTS)
            : this.RoughSegmentRelationConst.SEPARATE
          : this.RoughSegmentRelationConst.SEPARATE
        : ((this.xi = (l - g) / (e - f)),
          (this.yi = e * this.xi + g),
          -1e-5 > (this.px1 - this.xi) * (this.xi - this.px2) ||
          -1e-5 > (d.px1 - this.xi) * (this.xi - d.px2)
            ? this.RoughSegmentRelationConst.SEPARATE
            : this.RoughSegmentRelationConst.INTERSECTS);
    }
    getLength() {
      return this._getLength(this.px1, this.py1, this.px2, this.py2);
    }
    _getLength(a, b, c, d) {
      var e = c - a,
        f = d - b;
      return g(e * e + f * f);
    }
  }
  class m {
    constructor(a, b, c, d, e, f, g, h) {
      (this.top = a),
        (this.bottom = b),
        (this.left = c),
        (this.right = d),
        (this.gap = e),
        (this.sinAngle = f),
        (this.tanAngle = h),
        1e-4 > i(f)
          ? (this.pos = c + e)
          : 0.9999 < i(f)
          ? (this.pos = a + e)
          : ((this.deltaX = (b - a) * i(h)),
            (this.pos = c - i(this.deltaX)),
            (this.hGap = i(e / g)),
            (this.sLeft = new l(c, b, c, a)),
            (this.sRight = new l(d, b, d, a)));
    }
    getNextLine() {
      if (1e-4 > i(this.sinAngle)) {
        if (this.pos < this.right) {
          let a = [this.pos, this.top, this.pos, this.bottom];
          return (this.pos += this.gap), a;
        }
      } else if (!(0.9999 < i(this.sinAngle))) {
        let b = this.pos - this.deltaX / 2,
          c = this.pos + this.deltaX / 2,
          d = this.bottom,
          e = this.top;
        if (this.pos < this.right + this.deltaX) {
          for (
            ;
            (b < this.left && c < this.left) ||
            (b > this.right && c > this.right);

          )
            if (
              ((this.pos += this.hGap),
              (b = this.pos - this.deltaX / 2),
              (c = this.pos + this.deltaX / 2),
              this.pos > this.right + this.deltaX)
            )
              return null;
          let f = new l(b, d, c, e);
          f.compare(this.sLeft) == a().INTERSECTS && ((b = f.xi), (d = f.yi)),
            f.compare(this.sRight) == a().INTERSECTS &&
              ((c = f.xi), (e = f.yi)),
            0 < this.tanAngle &&
              ((b = this.right - (b - this.left)),
              (c = this.right - (c - this.left)));
          let g = [b, d, c, e];
          return (this.pos += this.hGap), g;
        }
      } else if (this.pos < this.bottom) {
        let a = [this.left, this.pos, this.right, this.pos];
        return (this.pos += this.gap), a;
      }
      return null;
    }
  }
  class n {
    constructor(a, b) {
      (this.type = a), (this.text = b);
    }
    isType(a) {
      return this.type === a;
    }
  }
  class o {
    constructor(a) {
      (this.PARAMS = {
        A: [
          "rx",
          "ry",
          "x-axis-rotation",
          "large-arc-flag",
          "sweep-flag",
          "x",
          "y",
        ],
        a: [
          "rx",
          "ry",
          "x-axis-rotation",
          "large-arc-flag",
          "sweep-flag",
          "x",
          "y",
        ],
        C: ["x1", "y1", "x2", "y2", "x", "y"],
        c: ["x1", "y1", "x2", "y2", "x", "y"],
        H: ["x"],
        h: ["x"],
        L: ["x", "y"],
        l: ["x", "y"],
        M: ["x", "y"],
        m: ["x", "y"],
        Q: ["x1", "y1", "x", "y"],
        q: ["x1", "y1", "x", "y"],
        S: ["x2", "y2", "x", "y"],
        s: ["x2", "y2", "x", "y"],
        T: ["x", "y"],
        t: ["x", "y"],
        V: ["y"],
        v: ["y"],
        Z: [],
        z: [],
      }),
        (this.COMMAND = 0),
        (this.NUMBER = 1),
        (this.EOD = 2),
        (this.segments = []),
        (this.d = a || ""),
        this.parseData(a),
        this.processPoints();
    }
    loadFromSegments(a) {
      (this.segments = a), this.processPoints();
    }
    processPoints() {
      let a = null,
        b = [0, 0];
      for (let c, d = 0; d < this.segments.length; d++) {
        switch (((c = this.segments[d]), c.key)) {
          case "M":
          case "L":
          case "T":
            c.point = [c.data[0], c.data[1]];
            break;
          case "m":
          case "l":
          case "t":
            c.point = [c.data[0] + b[0], c.data[1] + b[1]];
            break;
          case "H":
            c.point = [c.data[0], b[1]];
            break;
          case "h":
            c.point = [c.data[0] + b[0], b[1]];
            break;
          case "V":
            c.point = [b[0], c.data[0]];
            break;
          case "v":
            c.point = [b[0], c.data[0] + b[1]];
            break;
          case "z":
          case "Z":
            a && (c.point = [a[0], a[1]]);
            break;
          case "C":
            c.point = [c.data[4], c.data[5]];
            break;
          case "c":
            c.point = [c.data[4] + b[0], c.data[5] + b[1]];
            break;
          case "S":
            c.point = [c.data[2], c.data[3]];
            break;
          case "s":
            c.point = [c.data[2] + b[0], c.data[3] + b[1]];
            break;
          case "Q":
            c.point = [c.data[2], c.data[3]];
            break;
          case "q":
            c.point = [c.data[2] + b[0], c.data[3] + b[1]];
            break;
          case "A":
            c.point = [c.data[5], c.data[6]];
            break;
          case "a":
            c.point = [c.data[5] + b[0], c.data[6] + b[1]];
        }
        ("m" === c.key || "M" === c.key) && (a = null),
          c.point && ((b = c.point), !a && (a = c.point)),
          ("z" === c.key || "Z" === c.key) && (a = null);
      }
    }
    get closed() {
      if ("undefined" == typeof this._closed) {
        this._closed = !1;
        for (let a of this.segments)
          "z" === a.key.toLowerCase() && (this._closed = !0);
      }
      return this._closed;
    }
    parseData(a) {
      var b = this.tokenize(a),
        c = 0,
        d = b[c],
        e = "BOD";
      for (this.segments = []; !d.isType(this.EOD); ) {
        var f,
          g = [];
        if (!("BOD" == e))
          d.isType(this.NUMBER)
            ? (f = this.PARAMS[e].length)
            : (c++, (f = this.PARAMS[d.text].length), (e = d.text));
        else if ("M" == d.text || "m" == d.text)
          c++, (f = this.PARAMS[d.text].length), (e = d.text);
        else return this.parseData("M0,0" + a);
        if (c + f < b.length) {
          for (var h, j = c; j < c + f; j++)
            if (((h = b[j]), h.isType(this.NUMBER))) g[g.length] = h.text;
            else
              return void console.error(
                "Parameter type is not a number: " + e + "," + h.text
              );
          var i;
          if (this.PARAMS[e]) i = { key: e, data: g };
          else return void console.error("Unsupported segment type: " + e);
          this.segments.push(i),
            (c += f),
            (d = b[c]),
            "M" == e && (e = "L"),
            "m" == e && (e = "l");
        } else
          console.error("Path data ended before all parameters were found");
      }
    }
    tokenize(a) {
      for (var b = []; "" != a; )
        if (a.match(/^([ \t\r\n,]+)/)) a = a.substr(RegExp.$1.length);
        else if (a.match(/^([aAcChHlLmMqQsStTvVzZ])/))
          (b[b.length] = new n(this.COMMAND, RegExp.$1)),
            (a = a.substr(RegExp.$1.length));
        else if (
          a.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)
        )
          (b[b.length] = new n(this.NUMBER, parseFloat(RegExp.$1))),
            (a = a.substr(RegExp.$1.length));
        else return console.error("Unrecognized segment command: " + a), null;
      return (b[b.length] = new n(this.EOD, null)), b;
    }
  }
  class q {
    constructor(a) {
      (this.d = a),
        (this.parsed = new o(a)),
        (this._position = [0, 0]),
        (this.bezierReflectionPoint = null),
        (this.quadReflectionPoint = null),
        (this._first = null);
    }
    get segments() {
      return this.parsed.segments;
    }
    get closed() {
      return this.parsed.closed;
    }
    get linearPoints() {
      if (!this._linearPoints) {
        const a = [];
        let b = [];
        for (let c of this.parsed.segments) {
          let d = c.key.toLowerCase();
          (("m" === d || "z" === d) &&
            (b.length && (a.push(b), (b = [])), "z" === d)) ||
            (c.point && b.push(c.point));
        }
        b.length && (a.push(b), (b = [])), (this._linearPoints = a);
      }
      return this._linearPoints;
    }
    get first() {
      return this._first;
    }
    set first(a) {
      this._first = a;
    }
    setPosition(a, b) {
      (this._position = [a, b]), this._first || (this._first = [a, b]);
    }
    get position() {
      return this._position;
    }
    get x() {
      return this._position[0];
    }
    get y() {
      return this._position[1];
    }
  }
  class p {
    constructor(a, b, c, h, j, k) {
      const l = f / 180;
      if (
        ((this._segIndex = 0),
        (this._numSegs = 0),
        a[0] == b[0] && a[1] == b[1])
      )
        return;
      (this._rx = i(c[0])),
        (this._ry = i(c[1])),
        (this._sinPhi = e(h * l)),
        (this._cosPhi = d(h * l));
      var m,
        n =
          (this._cosPhi * (a[0] - b[0])) / 2 +
          (this._sinPhi * (a[1] - b[1])) / 2,
        o =
          (-this._sinPhi * (a[0] - b[0])) / 2 +
          (this._cosPhi * (a[1] - b[1])) / 2,
        p =
          this._rx * this._rx * this._ry * this._ry -
          this._rx * this._rx * o * o -
          this._ry * this._ry * n * n;
      if (0 > p) {
        let a = g(1 - p / (this._rx * this._rx * this._ry * this._ry));
        (this._rx = a), (this._ry = a), (m = 0);
      } else
        m =
          (j == k ? -1 : 1) *
          g(p / (this._rx * this._rx * o * o + this._ry * this._ry * n * n));
      let q = (m * this._rx * o) / this._ry,
        r = (-m * this._ry * n) / this._rx;
      (this._C = [0, 0]),
        (this._C[0] = this._cosPhi * q - this._sinPhi * r + (a[0] + b[0]) / 2),
        (this._C[1] = this._sinPhi * q + this._cosPhi * r + (a[1] + b[1]) / 2),
        (this._theta = this.calculateVectorAngle(
          1,
          0,
          (n - q) / this._rx,
          (o - r) / this._ry
        ));
      let s = this.calculateVectorAngle(
        (n - q) / this._rx,
        (o - r) / this._ry,
        (-n - q) / this._rx,
        (-o - r) / this._ry
      );
      !k && 0 < s ? (s -= 2 * f) : k && 0 > s && (s += 2 * f),
        (this._numSegs = Math.ceil(i(s / (f / 2)))),
        (this._delta = s / this._numSegs),
        (this._T =
          ((8 / 3) * e(this._delta / 4) * e(this._delta / 4)) /
          e(this._delta / 2)),
        (this._from = a);
    }
    getNextSegment() {
      var a, b, c;
      if (this._segIndex == this._numSegs) return null;
      let f = d(this._theta),
        g = e(this._theta),
        h = this._theta + this._delta,
        i = d(h),
        j = e(h);
      return (
        (c = [
          this._cosPhi * this._rx * i -
            this._sinPhi * this._ry * j +
            this._C[0],
          this._sinPhi * this._rx * i +
            this._cosPhi * this._ry * j +
            this._C[1],
        ]),
        (a = [
          this._from[0] +
            this._T *
              (-this._cosPhi * this._rx * g - this._sinPhi * this._ry * f),
          this._from[1] +
            this._T *
              (-this._sinPhi * this._rx * g + this._cosPhi * this._ry * f),
        ]),
        (b = [
          c[0] +
            this._T *
              (this._cosPhi * this._rx * j + this._sinPhi * this._ry * i),
          c[1] +
            this._T *
              (this._sinPhi * this._rx * j - this._cosPhi * this._ry * i),
        ]),
        (this._theta = h),
        (this._from = [c[0], c[1]]),
        this._segIndex++,
        { cp1: a, cp2: b, to: c }
      );
    }
    calculateVectorAngle(a, b, c, d) {
      var e = Math.atan2;
      let g = e(b, a),
        h = e(d, c);
      return h >= g ? h - g : 2 * f - (g - h);
    }
  }
  class r {
    constructor(a, b) {
      (this.sets = a), (this.closed = b);
    }
    fit(a) {
      let b = [];
      for (const c of this.sets) {
        let d = c.length,
          e = Math.floor(a * d);
        if (5 > e) {
          if (5 >= d) continue;
          e = 5;
        }
        b.push(this.reduce(c, e));
      }
      let c = "";
      for (const d of b) {
        for (let a, b = 0; b < d.length; b++)
          (a = d[b]),
            (c += 0 === b ? "M" + a[0] + "," + a[1] : "L" + a[0] + "," + a[1]);
        this.closed && (c += "z ");
      }
      return c;
    }
    distance(a, b) {
      return g(c(a[0] - b[0], 2) + c(a[1] - b[1], 2));
    }
    reduce(a, b) {
      if (a.length <= b) return a;
      let d = a.slice(0);
      for (; d.length > b; ) {
        let e = -1,
          f = -1;
        for (let h = 1; h < d.length - 1; h++) {
          let i = this.distance(d[h - 1], d[h]),
            a = this.distance(d[h], d[h + 1]),
            b = this.distance(d[h - 1], d[h + 1]),
            c = (i + a + b) / 2,
            j = g(c * (c - i) * (c - a) * (c - b));
          (0 > e || j < e) && ((e = j), (f = h));
        }
        if (0 < f) d.splice(f, 1);
        else break;
      }
      return d;
    }
  }
  class s {
    line(a, b, c, d, e) {
      let f = this._doubleLine(a, b, c, d, e);
      return { type: "path", ops: f };
    }
    linearPath(a, b, c) {
      const d = (a || []).length;
      if (2 < d) {
        let e = [];
        for (let b = 0; b < d - 1; b++)
          e = e.concat(
            this._doubleLine(a[b][0], a[b][1], a[b + 1][0], a[b + 1][1], c)
          );
        return (
          b &&
            (e = e.concat(
              this._doubleLine(a[d - 1][0], a[d - 1][1], a[0][0], a[0][1], c)
            )),
          { type: "path", ops: e }
        );
      }
      return 2 === d
        ? this.line(a[0][0], a[0][1], a[1][0], a[1][1], c)
        : void 0;
    }
    polygon(a, b) {
      return this.linearPath(a, !0, b);
    }
    rectangle(a, b, c, d, e) {
      return this.polygon(
        [
          [a, b],
          [a + c, b],
          [a + c, b + d],
          [a, b + d],
        ],
        e
      );
    }
    curve(a, b) {
      let c = this._curveWithOffset(a, 1 * (1 + 0.2 * b.roughness), b),
        d = this._curveWithOffset(a, 1.5 * (1 + 0.22 * b.roughness), b);
      return { type: "path", ops: c.concat(d) };
    }
    ellipse(a, b, c, d, e) {
      const g = (2 * f) / e.curveStepCount;
      let h = i(c / 2),
        j = i(d / 2);
      (h += this._getOffset(0.05 * -h, 0.05 * h, e)),
        (j += this._getOffset(0.05 * -j, 0.05 * j, e));
      let k = this._ellipse(
          g,
          a,
          b,
          h,
          j,
          1,
          g * this._getOffset(0.1, this._getOffset(0.4, 1, e), e),
          e
        ),
        l = this._ellipse(g, a, b, h, j, 1.5, 0, e);
      return { type: "path", ops: k.concat(l) };
    }
    arc(a, b, c, g, h, k, l, m, n) {
      let o = a,
        p = b,
        q = i(c / 2),
        r = i(g / 2);
      (q += this._getOffset(0.01 * -q, 0.01 * q, n)),
        (r += this._getOffset(0.01 * -r, 0.01 * r, n));
      let s = h,
        t = k;
      for (; 0 > s; ) (s += 2 * f), (t += 2 * f);
      t - s > 2 * f && ((s = 0), (t = 2 * f));
      let u = (2 * f) / n.curveStepCount,
        v = j(u / 2, (t - s) / 2),
        w = this._arc(v, o, p, q, r, s, t, 1, n),
        x = this._arc(v, o, p, q, r, s, t, 1.5, n),
        y = w.concat(x);
      return (
        l &&
          (m
            ? ((y = y.concat(
                this._doubleLine(o, p, o + q * d(s), p + r * e(s), n)
              )),
              (y = y.concat(
                this._doubleLine(o, p, o + q * d(t), p + r * e(t), n)
              )))
            : (y.push({ op: "lineTo", data: [o, p] }),
              y.push({ op: "lineTo", data: [o + q * d(s), p + r * e(s)] }))),
        { type: "path", ops: y }
      );
    }
    hachureFillArc(a, b, c, g, h, j, k) {
      let l = a,
        m = b,
        n = i(c / 2),
        o = i(g / 2);
      (n += this._getOffset(0.01 * -n, 0.01 * n, k)),
        (o += this._getOffset(0.01 * -o, 0.01 * o, k));
      let p = h,
        q = j;
      for (; 0 > p; ) (p += 2 * f), (q += 2 * f);
      q - p > 2 * f && ((p = 0), (q = 2 * f));
      let r = (q - p) / k.curveStepCount,
        s = [],
        t = [];
      for (let f = p; f <= q; f += r)
        s.push(l + n * d(f)), t.push(m + o * e(f));
      return (
        s.push(l + n * d(q)),
        t.push(m + o * e(q)),
        s.push(l),
        t.push(m),
        this.hachureFillShape(s, t, k)
      );
    }
    solidFillShape(a, b, c) {
      let d = [];
      if (a && b && a.length && b.length && a.length === b.length) {
        let f = c.maxRandomnessOffset || 0;
        const g = a.length;
        if (2 < g) {
          d.push({
            op: "move",
            data: [
              a[0] + this._getOffset(-f, f, c),
              b[0] + this._getOffset(-f, f, c),
            ],
          });
          for (var e = 1; e < g; e++)
            d.push({
              op: "lineTo",
              data: [
                a[e] + this._getOffset(-f, f, c),
                b[e] + this._getOffset(-f, f, c),
              ],
            });
        }
      }
      return { type: "fillPath", ops: d };
    }
    hachureFillShape(a, c, g) {
      let k = [];
      if (a && c && a.length && c.length) {
        let l = a[0],
          n = a[0],
          o = c[0],
          p = c[0];
        for (let b = 1; b < a.length; b++)
          (l = j(l, a[b])),
            (n = h(n, a[b])),
            (o = j(o, c[b])),
            (p = h(p, c[b]));
        const i = g.hachureAngle;
        let q = g.hachureGap;
        0 > q && (q = 4 * g.strokeWidth), (q = h(q, 0.1));
        const r = (i % 180) * (f / 180),
          s = d(r),
          t = e(r),
          u = b(r),
          v = new m(o - 1, p + 1, l - 1, n + 1, q, t, s, u);
        for (let b; null != (b = v.getNextLine()); ) {
          let d = this._getIntersectingLines(b, a, c);
          for (let a = 0; a < d.length; a++)
            if (a < d.length - 1) {
              let b = d[a],
                c = d[a + 1];
              k = k.concat(this._doubleLine(b[0], b[1], c[0], c[1], g));
            }
        }
      }
      return { type: "fillSketch", ops: k };
    }
    hachureFillEllipse(a, c, d, e, h) {
      let j = [],
        k = i(d / 2),
        l = i(e / 2);
      (k += this._getOffset(0.05 * -k, 0.05 * k, h)),
        (l += this._getOffset(0.05 * -l, 0.05 * l, h));
      let m = h.hachureAngle,
        n = h.hachureGap;
      0 >= n && (n = 4 * h.strokeWidth);
      let o = h.fillWeight;
      0 > o && (o = h.strokeWidth / 2);
      let p = b((m % 180) * (f / 180)),
        q = l / k,
        r = g(q * p * q * p + 1),
        s = (q * p) / r,
        t = 1 / r,
        u = n / ((k * l) / g(l * t * (l * t) + k * s * (k * s)) / k),
        v = g(k * k - (a - k + u) * (a - k + u));
      for (var w = a - k + u; w < a + k; w += u) {
        v = g(k * k - (a - w) * (a - w));
        let b = this._affine(w, c - v, a, c, s, t, q),
          d = this._affine(w, c + v, a, c, s, t, q);
        j = j.concat(this._doubleLine(b[0], b[1], d[0], d[1], h));
      }
      return { type: "fillSketch", ops: j };
    }
    svgPath(a, b) {
      a = (a || "")
        .replace(/\n/g, " ")
        .replace(/(-)/g, " -")
        .replace(/(-\s)/g, "-")
        .replace("/(ss)/g", " ");
      let c = new q(a);
      if (b.simplification) {
        let a = new r(c.linearPoints, c.closed),
          e = a.fit(b.simplification);
        c = new q(e);
      }
      let d = [],
        e = c.segments || [];
      for (let f = 0; f < e.length; f++) {
        let a = e[f],
          g = 0 < f ? e[f - 1] : null,
          h = this._processSegment(c, a, g, b);
        h && h.length && (d = d.concat(h));
      }
      return { type: "path", ops: d };
    }
    _bezierTo(a, b, c, d, e, g, h, j) {
      let k = [],
        l = [j.maxRandomnessOffset || 1, (j.maxRandomnessOffset || 1) + 0.5],
        m = null;
      for (let f = 0; 2 > f; f++)
        0 === f
          ? k.push({ op: "move", data: [h.x, h.y] })
          : k.push({
              op: "move",
              data: [
                h.x + this._getOffset(-l[0], l[0], j),
                h.y + this._getOffset(-l[0], l[0], j),
              ],
            }),
          (m = [
            e + this._getOffset(-l[f], l[f], j),
            g + this._getOffset(-l[f], l[f], j),
          ]),
          k.push({
            op: "bcurveTo",
            data: [
              a + this._getOffset(-l[f], l[f], j),
              b + this._getOffset(-l[f], l[f], j),
              c + this._getOffset(-l[f], l[f], j),
              d + this._getOffset(-l[f], l[f], j),
              m[0],
              m[1],
            ],
          });
      return h.setPosition(m[0], m[1]), k;
    }
    _processSegment(a, b, c, d) {
      let e = [];
      switch (b.key) {
        case "M":
        case "m": {
          let c = "m" === b.key;
          if (2 <= b.data.length) {
            let f = +b.data[0],
              g = +b.data[1];
            c && ((f += a.x), (g += a.y));
            let h = 1 * (d.maxRandomnessOffset || 0);
            (f += this._getOffset(-h, h, d)),
              (g += this._getOffset(-h, h, d)),
              a.setPosition(f, g),
              e.push({ op: "move", data: [f, g] });
          }
          break;
        }
        case "L":
        case "l": {
          let c = "l" === b.key;
          if (2 <= b.data.length) {
            let f = +b.data[0],
              g = +b.data[1];
            c && ((f += a.x), (g += a.y)),
              (e = e.concat(this._doubleLine(a.x, a.y, f, g, d))),
              a.setPosition(f, g);
          }
          break;
        }
        case "H":
        case "h": {
          const c = "h" === b.key;
          if (b.data.length) {
            let f = +b.data[0];
            c && (f += a.x),
              (e = e.concat(this._doubleLine(a.x, a.y, f, a.y, d))),
              a.setPosition(f, a.y);
          }
          break;
        }
        case "V":
        case "v": {
          const c = "v" === b.key;
          if (b.data.length) {
            let f = +b.data[0];
            c && (f += a.y),
              (e = e.concat(this._doubleLine(a.x, a.y, a.x, f, d))),
              a.setPosition(a.x, f);
          }
          break;
        }
        case "Z":
        case "z": {
          a.first &&
            ((e = e.concat(
              this._doubleLine(a.x, a.y, a.first[0], a.first[1], d)
            )),
            a.setPosition(a.first[0], a.first[1]),
            (a.first = null));
          break;
        }
        case "C":
        case "c": {
          const c = "c" === b.key;
          if (6 <= b.data.length) {
            let f = +b.data[0],
              g = +b.data[1],
              h = +b.data[2],
              i = +b.data[3],
              j = +b.data[4],
              k = +b.data[5];
            c &&
              ((f += a.x),
              (h += a.x),
              (j += a.x),
              (g += a.y),
              (i += a.y),
              (k += a.y));
            let l = this._bezierTo(f, g, h, i, j, k, a, d);
            (e = e.concat(l)),
              (a.bezierReflectionPoint = [j + (j - h), k + (k - i)]);
          }
          break;
        }
        case "S":
        case "s": {
          const f = "s" === b.key;
          if (4 <= b.data.length) {
            let h = +b.data[0],
              i = +b.data[1],
              j = +b.data[2],
              k = +b.data[3];
            f && ((h += a.x), (j += a.x), (i += a.y), (k += a.y));
            let l = h,
              m = i,
              n = c ? c.key : "";
            var g = null;
            ("c" == n || "C" == n || "s" == n || "S" == n) &&
              (g = a.bezierReflectionPoint),
              g && ((l = g[0]), (m = g[1]));
            let o = this._bezierTo(l, m, h, i, j, k, a, d);
            (e = e.concat(o)),
              (a.bezierReflectionPoint = [j + (j - h), k + (k - i)]);
          }
          break;
        }
        case "Q":
        case "q": {
          const c = "q" === b.key;
          if (4 <= b.data.length) {
            let g = +b.data[0],
              h = +b.data[1],
              i = +b.data[2],
              j = +b.data[3];
            c && ((g += a.x), (i += a.x), (h += a.y), (j += a.y));
            let k = 1 * (1 + 0.2 * d.roughness),
              l = 1.5 * (1 + 0.22 * d.roughness);
            e.push({
              op: "move",
              data: [
                a.x + this._getOffset(-k, k, d),
                a.y + this._getOffset(-k, k, d),
              ],
            });
            let m = [
              i + this._getOffset(-k, k, d),
              j + this._getOffset(-k, k, d),
            ];
            e.push({
              op: "qcurveTo",
              data: [
                g + this._getOffset(-k, k, d),
                h + this._getOffset(-k, k, d),
                m[0],
                m[1],
              ],
            }),
              e.push({
                op: "move",
                data: [
                  a.x + this._getOffset(-l, l, d),
                  a.y + this._getOffset(-l, l, d),
                ],
              }),
              (m = [
                i + this._getOffset(-l, l, d),
                j + this._getOffset(-l, l, d),
              ]),
              e.push({
                op: "qcurveTo",
                data: [
                  g + this._getOffset(-l, l, d),
                  h + this._getOffset(-l, l, d),
                  m[0],
                  m[1],
                ],
              }),
              a.setPosition(m[0], m[1]),
              (a.quadReflectionPoint = [i + (i - g), j + (j - h)]);
          }
          break;
        }
        case "T":
        case "t": {
          const h = "t" === b.key;
          if (2 <= b.data.length) {
            let i = +b.data[0],
              j = +b.data[1];
            h && ((i += a.x), (j += a.y));
            let k = i,
              l = j,
              m = c ? c.key : "";
            var g = null;
            ("q" == m || "Q" == m || "t" == m || "T" == m) &&
              (g = a.quadReflectionPoint),
              g && ((k = g[0]), (l = g[1]));
            let n = 1 * (1 + 0.2 * d.roughness),
              o = 1.5 * (1 + 0.22 * d.roughness);
            e.push({
              op: "move",
              data: [
                a.x + this._getOffset(-n, n, d),
                a.y + this._getOffset(-n, n, d),
              ],
            });
            let p = [
              i + this._getOffset(-n, n, d),
              j + this._getOffset(-n, n, d),
            ];
            e.push({
              op: "qcurveTo",
              data: [
                k + this._getOffset(-n, n, d),
                l + this._getOffset(-n, n, d),
                p[0],
                p[1],
              ],
            }),
              e.push({
                op: "move",
                data: [
                  a.x + this._getOffset(-o, o, d),
                  a.y + this._getOffset(-o, o, d),
                ],
              }),
              (p = [
                i + this._getOffset(-o, o, d),
                j + this._getOffset(-o, o, d),
              ]),
              e.push({
                op: "qcurveTo",
                data: [
                  k + this._getOffset(-o, o, d),
                  l + this._getOffset(-o, o, d),
                  p[0],
                  p[1],
                ],
              }),
              a.setPosition(p[0], p[1]),
              (a.quadReflectionPoint = [i + (i - k), j + (j - l)]);
          }
          break;
        }
        case "A":
        case "a": {
          const c = "a" === b.key;
          if (7 <= b.data.length) {
            let f = +b.data[0],
              g = +b.data[1],
              h = +b.data[2],
              i = +b.data[3],
              j = +b.data[4],
              k = +b.data[5],
              l = +b.data[6];
            if ((c && ((k += a.x), (l += a.y)), k == a.x && l == a.y)) break;
            if (0 == f || 0 == g)
              (e = e.concat(this._doubleLine(a.x, a.y, k, l, d))),
                a.setPosition(k, l);
            else {
              d.maxRandomnessOffset || 0;
              for (let b = 0; 1 > b; b++) {
                let b = new p([a.x, a.y], [k, l], [f, g], h, !!i, !!j),
                  c = b.getNextSegment();
                for (; c; ) {
                  let f = this._bezierTo(
                    c.cp1[0],
                    c.cp1[1],
                    c.cp2[0],
                    c.cp2[1],
                    c.to[0],
                    c.to[1],
                    a,
                    d
                  );
                  (e = e.concat(f)), (c = b.getNextSegment());
                }
              }
            }
          }
          break;
        }
        default:
      }
      return e;
    }
    _getOffset(a, b, c) {
      return c.roughness * (Math.random() * (b - a) + a);
    }
    _affine(a, b, c, d, e, f, g) {
      return [
        -c * f - d * e + c + f * a + e * b,
        g * (c * e - d * f) + d + -g * e * a + g * f * b,
      ];
    }
    _doubleLine(a, b, c, d, e) {
      const f = this._line(a, b, c, d, e, !0, !1),
        g = this._line(a, b, c, d, e, !0, !0);
      return f.concat(g);
    }
    _line(a, b, d, e, f, h, i) {
      const j = c(a - d, 2) + c(b - e, 2);
      let k = f.maxRandomnessOffset || 0;
      100 * (k * k) > j && (k = g(j) / 10);
      const l = k / 2,
        m = 0.2 + 0.2 * Math.random();
      let n = (f.bowing * f.maxRandomnessOffset * (e - b)) / 200,
        o = (f.bowing * f.maxRandomnessOffset * (a - d)) / 200;
      (n = this._getOffset(-n, n, f)), (o = this._getOffset(-o, o, f));
      let p = [];
      return (
        h &&
          (i
            ? p.push({
                op: "move",
                data: [
                  a + this._getOffset(-l, l, f),
                  b + this._getOffset(-l, l, f),
                ],
              })
            : p.push({
                op: "move",
                data: [
                  a + this._getOffset(-k, k, f),
                  b + this._getOffset(-k, k, f),
                ],
              })),
        i
          ? p.push({
              op: "bcurveTo",
              data: [
                n + a + (d - a) * m + this._getOffset(-l, l, f),
                o + b + (e - b) * m + this._getOffset(-l, l, f),
                n + a + 2 * (d - a) * m + this._getOffset(-l, l, f),
                o + b + 2 * (e - b) * m + this._getOffset(-l, l, f),
                d + this._getOffset(-l, l, f),
                e + this._getOffset(-l, l, f),
              ],
            })
          : p.push({
              op: "bcurveTo",
              data: [
                n + a + (d - a) * m + this._getOffset(-k, k, f),
                o + b + (e - b) * m + this._getOffset(-k, k, f),
                n + a + 2 * (d - a) * m + this._getOffset(-k, k, f),
                o + b + 2 * (e - b) * m + this._getOffset(-k, k, f),
                d + this._getOffset(-k, k, f),
                e + this._getOffset(-k, k, f),
              ],
            }),
        p
      );
    }
    _curve(a, c, d) {
      const e = a.length;
      let f = [];
      if (3 < e) {
        const g = [],
          b = 1 - d.curveTightness;
        f.push({ op: "move", data: [a[1][0], a[1][1]] });
        for (let c = 1; c + 2 < e; c++) {
          const d = a[c];
          (g[0] = [d[0], d[1]]),
            (g[1] = [
              d[0] + (b * a[c + 1][0] - b * a[c - 1][0]) / 6,
              d[1] + (b * a[c + 1][1] - b * a[c - 1][1]) / 6,
            ]),
            (g[2] = [
              a[c + 1][0] + (b * a[c][0] - b * a[c + 2][0]) / 6,
              a[c + 1][1] + (b * a[c][1] - b * a[c + 2][1]) / 6,
            ]),
            (g[3] = [a[c + 1][0], a[c + 1][1]]),
            f.push({
              op: "bcurveTo",
              data: [g[1][0], g[1][1], g[2][0], g[2][1], g[3][0], g[3][1]],
            });
        }
        if (c && 2 === c.length) {
          let a = d.maxRandomnessOffset;
          f.push({
            ops: "lineTo",
            data: [
              c[0] + this._getOffset(-a, a, d),
              c[1] + +this._getOffset(-a, a, d),
            ],
          });
        }
      } else
        3 === e
          ? (f.push({ op: "move", data: [a[1][0], a[1][1]] }),
            f.push({
              op: "bcurveTo",
              data: [a[1][0], a[1][1], a[2][0], a[2][1], a[2][0], a[2][1]],
            }))
          : 2 === e &&
            (f = f.concat(
              this._doubleLine(a[0][0], a[0][1], a[1][0], a[1][1], d)
            ));
      return f;
    }
    _ellipse(a, b, c, g, h, i, j, k) {
      const l = this._getOffset(-0.5, 0.5, k) - f / 2,
        m = [];
      m.push([
        this._getOffset(-i, i, k) + b + 0.9 * g * d(l - a),
        this._getOffset(-i, i, k) + c + 0.9 * h * e(l - a),
      ]);
      for (let n = l; n < 2 * f + l - 0.01; n += a)
        m.push([
          this._getOffset(-i, i, k) + b + g * d(n),
          this._getOffset(-i, i, k) + c + h * e(n),
        ]);
      return (
        m.push([
          this._getOffset(-i, i, k) + b + g * d(l + 2 * f + 0.5 * j),
          this._getOffset(-i, i, k) + c + h * e(l + 2 * f + 0.5 * j),
        ]),
        m.push([
          this._getOffset(-i, i, k) + b + 0.98 * g * d(l + j),
          this._getOffset(-i, i, k) + c + 0.98 * h * e(l + j),
        ]),
        m.push([
          this._getOffset(-i, i, k) + b + 0.9 * g * d(l + 0.5 * j),
          this._getOffset(-i, i, k) + c + 0.9 * h * e(l + 0.5 * j),
        ]),
        this._curve(m, null, k)
      );
    }
    _curveWithOffset(a, b, c) {
      const d = [
        [
          a[0][0] + this._getOffset(-b, b, c),
          a[0][1] + this._getOffset(-b, b, c),
        ],
        [
          a[0][0] + this._getOffset(-b, b, c),
          a[0][1] + this._getOffset(-b, b, c),
        ],
      ];
      for (let e = 1; e < a.length; e++)
        d.push([
          a[e][0] + this._getOffset(-b, b, c),
          a[e][1] + this._getOffset(-b, b, c),
        ]),
          e === a.length - 1 &&
            d.push([
              a[e][0] + this._getOffset(-b, b, c),
              a[e][1] + this._getOffset(-b, b, c),
            ]);
      return this._curve(d, null, c);
    }
    _arc(a, b, c, f, g, h, i, j, k) {
      const l = h + this._getOffset(-0.1, 0.1, k),
        m = [];
      m.push([
        this._getOffset(-j, j, k) + b + 0.9 * f * d(l - a),
        this._getOffset(-j, j, k) + c + 0.9 * g * e(l - a),
      ]);
      for (let n = l; n <= i; n += a)
        m.push([
          this._getOffset(-j, j, k) + b + f * d(n),
          this._getOffset(-j, j, k) + c + g * e(n),
        ]);
      return (
        m.push([b + f * d(i), c + g * e(i)]),
        m.push([b + f * d(i), c + g * e(i)]),
        this._curve(m, null, k)
      );
    }
    _getIntersectingLines(b, c, d) {
      let e = [];
      for (var f = new l(b[0], b[1], b[2], b[3]), g = 0; g < c.length; g++) {
        let b = new l(c[g], d[g], c[(g + 1) % c.length], d[(g + 1) % c.length]);
        f.compare(b) == a().INTERSECTS && e.push([f.xi, f.yi]);
      }
      return e;
    }
  }
  self._roughScript =
    self.document &&
    self.document.currentScript &&
    self.document.currentScript.src;
  class t {
    constructor(a, b) {
      (this.config = a || {}),
        (this.canvas = b),
        (this.defaultOptions = {
          maxRandomnessOffset: 2,
          roughness: 1,
          bowing: 1,
          stroke: "#000",
          strokeWidth: 1,
          curveTightness: 0,
          curveStepCount: 9,
          fill: null,
          fillStyle: "hachure",
          fillWeight: -1,
          hachureAngle: -41,
          hachureGap: -1,
        }),
        this.config.options &&
          (this.defaultOptions = this._options(this.config.options));
    }
    _options(a) {
      return a
        ? Object.assign({}, this.defaultOptions, a)
        : this.defaultOptions;
    }
    _drawable(a, b, c) {
      return { shape: a, sets: b || [], options: c || this.defaultOptions };
    }
    get lib() {
      if (!this._renderer)
        if (self && self.workly && this.config.async && !this.config.noWorker) {
          const a = Function.prototype.toString,
            b =
              this.config.worklyURL ||
              "https://cdn.jsdelivr.net/gh/pshihn/workly/dist/workly.min.js",
            c = this.config.roughURL || self._roughScript;
          if (c && b) {
            let a = `importScripts('${b}', '${c}');\nworkly.expose(self.rough.createRenderer());`,
              d = URL.createObjectURL(new Blob([a]));
            this._renderer = workly.proxy(d);
          } else this._renderer = new s();
        } else this._renderer = new s();
      return this._renderer;
    }
    line(a, b, c, d, e) {
      const f = this._options(e);
      return this._drawable("line", [this.lib.line(a, b, c, d, f)], f);
    }
    rectangle(a, b, c, d, e) {
      const f = this._options(e),
        g = [];
      if (f.fill) {
        const e = [a, a + c, a + c, a],
          h = [b, b, b + d, b + d];
        "solid" === f.fillStyle
          ? g.push(this.lib.solidFillShape(e, h, f))
          : g.push(this.lib.hachureFillShape(e, h, f));
      }
      return (
        g.push(this.lib.rectangle(a, b, c, d, f)),
        this._drawable("rectangle", g, f)
      );
    }
    ellipse(a, b, c, d, e) {
      const f = this._options(e),
        g = [];
      if (f.fill)
        if ("solid" === f.fillStyle) {
          const e = this.lib.ellipse(a, b, c, d, f);
          (e.type = "fillPath"), g.push(e);
        } else g.push(this.lib.hachureFillEllipse(a, b, c, d, f));
      return (
        g.push(this.lib.ellipse(a, b, c, d, f)), this._drawable("ellipse", g, f)
      );
    }
    circle(a, b, c, d) {
      let e = this.ellipse(a, b, c, c, d);
      return (e.shape = "circle"), e;
    }
    linearPath(a, b) {
      const c = this._options(b);
      return this._drawable("linearPath", [this.lib.linearPath(a, !1, c)], c);
    }
    polygon(a, b) {
      const c = this._options(b),
        d = [];
      if (c.fill) {
        let b = [],
          e = [];
        for (let c of a) b.push(c[0]), e.push(c[1]);
        "solid" === c.fillStyle
          ? d.push(this.lib.solidFillShape(b, e, c))
          : d.push(this.lib.hachureFillShape(b, e, c));
      }
      return (
        d.push(this.lib.linearPath(a, !0, c)), this._drawable("polygon", d, c)
      );
    }
    arc(a, b, c, d, e, f, g, h) {
      const i = this._options(h),
        j = [];
      if (g && i.fill)
        if ("solid" === i.fillStyle) {
          let g = this.lib.arc(a, b, c, d, e, f, !0, !1, i);
          (g.type = "fillPath"), j.push(g);
        } else j.push(this.lib.hachureFillArc(a, b, c, d, e, f, i));
      return (
        j.push(this.lib.arc(a, b, c, d, e, f, g, !0, i)),
        this._drawable("arc", j, i)
      );
    }
    curve(a, b) {
      const c = this._options(b);
      return this._drawable("curve", [this.lib.curve(a, c)], c);
    }
    path(a, b) {
      const c = this._options(b),
        e = [];
      if (!a) return this._drawable("path", e, c);
      if (c.fill)
        if ("solid" === c.fillStyle) {
          e.push({ type: "path2Dfill", path: a });
        } else {
          const b = this._computePathSize(a);
          let d = [0, b[0], b[0], 0],
            f = [0, 0, b[1], b[1]],
            g = this.lib.hachureFillShape(d, f, c);
          (g.type = "path2Dpattern"), (g.size = b), (g.path = a), e.push(g);
        }
      return e.push(this.lib.svgPath(a, c)), this._drawable("path", e, c);
    }
    _computePathSize(a) {
      let b = [0, 0];
      if (self.document)
        try {
          const c = "http://www.w3.org/2000/svg";
          let d = self.document.createElementNS(c, "svg");
          d.setAttribute("width", "0"), d.setAttribute("height", "0");
          let e = self.document.createElementNS(c, "path");
          e.setAttribute("d", a),
            d.appendChild(e),
            self.document.body.appendChild(d);
          let f = e.getBBox();
          f && ((b[0] = f.width || 0), (b[1] = f.height || 0)),
            self.document.body.removeChild(d);
        } catch (a) {}
      return (
        b[0] * b[1] ||
          (b = [this.canvas.width || 100, this.canvas.height || 100]),
        (b[0] = j(4 * b[0], this.canvas.width)),
        (b[1] = j(4 * b[1], this.canvas.height)),
        b
      );
    }
  }
  class u extends t {
    async line(a, b, c, d, e) {
      const f = this._options(e);
      return this._drawable("line", [await this.lib.line(a, b, c, d, f)], f);
    }
    async rectangle(a, b, c, d, e) {
      const f = this._options(e),
        g = [];
      if (f.fill) {
        const e = [a, a + c, a + c, a],
          h = [b, b, b + d, b + d];
        "solid" === f.fillStyle
          ? g.push(await this.lib.solidFillShape(e, h, f))
          : g.push(await this.lib.hachureFillShape(e, h, f));
      }
      return (
        g.push(await this.lib.rectangle(a, b, c, d, f)),
        this._drawable("rectangle", g, f)
      );
    }
    async ellipse(a, b, c, d, e) {
      const f = this._options(e),
        g = [];
      if (f.fill)
        if ("solid" === f.fillStyle) {
          const e = await this.lib.ellipse(a, b, c, d, f);
          (e.type = "fillPath"), g.push(e);
        } else g.push(await this.lib.hachureFillEllipse(a, b, c, d, f));
      return (
        g.push(await this.lib.ellipse(a, b, c, d, f)),
        this._drawable("ellipse", g, f)
      );
    }
    async circle(a, b, c, d) {
      let e = await this.ellipse(a, b, c, c, d);
      return (e.shape = "circle"), e;
    }
    async linearPath(a, b) {
      const c = this._options(b);
      return this._drawable(
        "linearPath",
        [await this.lib.linearPath(a, !1, c)],
        c
      );
    }
    async polygon(a, b) {
      const c = this._options(b),
        d = [];
      if (c.fill) {
        let b = [],
          e = [];
        for (let c of a) b.push(c[0]), e.push(c[1]);
        "solid" === c.fillStyle
          ? d.push(await this.lib.solidFillShape(b, e, c))
          : d.push(await this.lib.hachureFillShape(b, e, c));
      }
      return (
        d.push(await this.lib.linearPath(a, !0, c)),
        this._drawable("polygon", d, c)
      );
    }
    async arc(a, b, c, d, e, f, g, h) {
      const i = this._options(h),
        j = [];
      if (g && i.fill)
        if ("solid" === i.fillStyle) {
          let g = await this.lib.arc(a, b, c, d, e, f, !0, !1, i);
          (g.type = "fillPath"), j.push(g);
        } else j.push(await this.lib.hachureFillArc(a, b, c, d, e, f, i));
      return (
        j.push(await this.lib.arc(a, b, c, d, e, f, g, !0, i)),
        this._drawable("arc", j, i)
      );
    }
    async curve(a, b) {
      const c = this._options(b);
      return this._drawable("curve", [await this.lib.curve(a, c)], c);
    }
    async path(a, b) {
      const c = this._options(b),
        e = [];
      if (!a) return this._drawable("path", e, c);
      if (c.fill)
        if ("solid" === c.fillStyle) {
          e.push({ type: "path2Dfill", path: a });
        } else {
          const b = this._computePathSize(a);
          let d = [0, b[0], b[0], 0],
            f = [0, 0, b[1], b[1]],
            g = await this.lib.hachureFillShape(d, f, c);
          (g.type = "path2Dpattern"), (g.size = b), (g.path = a), e.push(g);
        }
      return e.push(await this.lib.svgPath(a, c)), this._drawable("path", e, c);
    }
  }
  class v {
    constructor(a, b) {
      (this.canvas = a),
        (this.ctx = this.canvas.getContext("2d")),
        this._init(b);
    }
    _init(a) {
      this.gen = new t(a, this.canvas);
    }
    get generator() {
      return this.gen;
    }
    static createRenderer() {
      return new s();
    }
    line(a, b, c, e, f) {
      let g = this.gen.line(a, b, c, e, f);
      return this.draw(g), g;
    }
    rectangle(a, b, c, e, f) {
      let g = this.gen.rectangle(a, b, c, e, f);
      return this.draw(g), g;
    }
    ellipse(a, b, c, e, f) {
      let g = this.gen.ellipse(a, b, c, e, f);
      return this.draw(g), g;
    }
    circle(a, b, c, e) {
      let f = this.gen.circle(a, b, c, e);
      return this.draw(f), f;
    }
    linearPath(a, b) {
      let c = this.gen.linearPath(a, b);
      return this.draw(c), c;
    }
    polygon(a, b) {
      let c = this.gen.polygon(a, b);
      return this.draw(c), c;
    }
    arc(a, b, c, e, f, g, h, i) {
      let j = this.gen.arc(a, b, c, e, f, g, h, i);
      return this.draw(j), j;
    }
    curve(a, b) {
      let c = this.gen.curve(a, b);
      return this.draw(c), c;
    }
    path(a, b) {
      let c = this.gen.path(a, b);
      return this.draw(c), c;
    }
    draw(a) {
      let b = a.sets || [],
        c = a.options || this.gen.defaultOptions,
        d = this.ctx;
      for (let e of b)
        switch (e.type) {
          case "path":
            d.save(),
              (d.strokeStyle = c.stroke),
              (d.lineWidth = c.strokeWidth),
              this._drawToContext(d, e),
              d.restore();
            break;
          case "fillPath":
            d.save(),
              (d.fillStyle = c.fill),
              this._drawToContext(d, e, c),
              d.restore();
            break;
          case "fillSketch":
            this._fillSketch(d, e, c);
            break;
          case "path2Dfill": {
            this.ctx.save(), (this.ctx.fillStyle = c.fill);
            let a = new Path2D(e.path);
            this.ctx.fill(a), this.ctx.restore();
            break;
          }
          case "path2Dpattern": {
            let a = e.size,
              b = document.createElement("canvas");
            (b.width = a[0]),
              (b.height = a[1]),
              this._fillSketch(b.getContext("2d"), e, c),
              this.ctx.save(),
              (this.ctx.fillStyle = this.ctx.createPattern(b, "repeat"));
            let d = new Path2D(e.path);
            this.ctx.fill(d), this.ctx.restore();
            break;
          }
        }
    }
    _fillSketch(a, b, c) {
      let d = c.fillWeight;
      0 > d && (d = c.strokeWidth / 2),
        a.save(),
        (a.strokeStyle = c.fill),
        (a.lineWidth = d),
        this._drawToContext(a, b),
        a.restore();
    }
    _drawToContext(a, b) {
      a.beginPath();
      for (let c of b.ops) {
        const b = c.data;
        switch (c.op) {
          case "move":
            a.moveTo(b[0], b[1]);
            break;
          case "bcurveTo":
            a.bezierCurveTo(b[0], b[1], b[2], b[3], b[4], b[5]);
            break;
          case "qcurveTo":
            a.quadraticCurveTo(b[0], b[1], b[2], b[3]);
            break;
          case "lineTo":
            a.lineTo(b[0], b[1]);
        }
      }
      "fillPath" === b.type ? a.fill() : a.stroke();
    }
  }
  class w extends v {
    _init(a) {
      this.gen = new u(a, this.canvas);
    }
    async line(a, b, c, e, f) {
      let g = await this.gen.line(a, b, c, e, f);
      return this.draw(g), g;
    }
    async rectangle(a, b, c, e, f) {
      let g = await this.gen.rectangle(a, b, c, e, f);
      return this.draw(g), g;
    }
    async ellipse(a, b, c, e, f) {
      let g = await this.gen.ellipse(a, b, c, e, f);
      return this.draw(g), g;
    }
    async circle(a, b, c, e) {
      let f = await this.gen.circle(a, b, c, e);
      return this.draw(f), f;
    }
    async linearPath(a, b) {
      let c = await this.gen.linearPath(a, b);
      return this.draw(c), c;
    }
    async polygon(a, b) {
      let c = await this.gen.polygon(a, b);
      return this.draw(c), c;
    }
    async arc(a, b, c, e, f, g, h, i) {
      let j = await this.gen.arc(a, b, c, e, f, g, h, i);
      return this.draw(j), j;
    }
    async curve(a, b) {
      let c = await this.gen.curve(a, b);
      return this.draw(c), c;
    }
    async path(a, b) {
      let c = await this.gen.path(a, b);
      return this.draw(c), c;
    }
  }
  var x = {
    canvas(a, b) {
      return b && b.async ? new w(a, b) : new v(a, b);
    },
    createRenderer() {
      return v.createRenderer();
    },
    generator(a, b) {
      return a && a.async ? new u(a, b) : new t(a, b);
    },
  };
  return x;
})();
