!function (t) {
    var e = {};
    function n(r) {
      if (e[r]) return e[r].exports;
      var i = e[r] = {i: r, l: false, exports: {}};
      return t[r].call(i.exports, i, i.exports, n), i.l = true, i.exports;
    }
    n.m = t, n.c = e, n.d = function (t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, {enumerable: true, get: r});
    }, n.r = function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: true});
    }, n.t = function (t, e) {
      if (1 & e && (t = n(t)), 8 & e) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (n.r(r), Object.defineProperty(r, "default", {enumerable: true, value: t}), 2 & e && "string" != typeof t) for (var i in t) n.d(r, i, function (e) {
        return t[e];
      }.bind(null, i));
      return r;
    }, n.n = function (t) {
      var e = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };
      return n.d(e, "a", e), e;
    }, n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }, n.p = "", n(n.s = 161);
  }([function (t, e, n) {
    (function (e) {
      t.exports = "object" == typeof globalThis && globalThis && ("object" == typeof globalThis && globalThis).Math == Math && ("object" == typeof globalThis && globalThis) || "object" == typeof window && window && ("object" == typeof window && window).Math == Math && ("object" == typeof window && window) || "object" == typeof self && self && ("object" == typeof self && self).Math == Math && ("object" == typeof self && self) || "object" == typeof e && e && ("object" == typeof e && e).Math == Math && ("object" == typeof e && e) || function () {
        return this;
      }() || Function("return this")();
    }.call(this, n(79)));
  }, function (t, e, n) {
    var r = n(0), i = n(53), o = n(4), a = n(36), s = n(54), u = n(56), c = i("wks"), f = r.Symbol, l = u ? f : f && f.withoutSetter || a;
    t.exports = function (t) {
      return o(c, t) && (s || "string" == typeof c[t]) || (s && o(f, t) ? c[t] = f[t] : c[t] = l("Symbol." + t)), c[t];
    };
  }, function (t, e) {
    t.exports = function (t) {
      try {
        return !!t();
      } catch (t) {
        return true;
      }
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(27), i = n(2), o = n(62), a = n(14), s = n(39), u = n(10), c = n(104), f = o.ArrayBuffer, l = o.DataView, h = f.prototype.slice;
    r({target: "ArrayBuffer", proto: true, unsafe: true, forced: i(function () {
      return !new f(2).slice(1, void 0).byteLength;
    })}, {slice: function (t, e) {
      if (void 0 !== h && void 0 === e) return h.call(a(this), t);
      for (var n = a(this).byteLength, r = s(t, n), i = s(void 0 === e ? n : e, n), o = new (c(this, f))(u(i - r)), d = new l(this), p = new l(o), v = 0; r < i;) p.setUint8(v++, d.getUint8(r++));
      return o;
    }});
  }, function (t, e, n) {
    var r = n(17), i = {}.hasOwnProperty;
    t.exports = Object.hasOwn || function (t, e) {
      return i.call(r(t), e);
    };
  }, function (t, e) {
    t.exports = function (t) {
      return "object" == typeof t ? null !== t : "function" == typeof t;
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(30), i = n(0), o = n(2), a = n(47), s = n(10), u = n(120), c = n(121), f = n(122), l = n(55), h = n(123), d = r.aTypedArray, p = r.exportTypedArrayMethod, v = i.Uint16Array, g = v && v.prototype.sort, _ = !!g && !o(function () {
      var t = new v(2);
      t.sort(null), t.sort({});
    }), m = !!g && !o(function () {
      if (l) return l < 74;
      if (c) return c < 67;
      if (f) return true;
      if (h) return h < 602;
      var t, e, n = new v(516), r = Array(516);
      for (t = 0; t < 516; t++) e = t % 4, n[t] = 515 - t, r[t] = t - 2 * e + 3;
      for (n.sort(function (t, e) {
        return (t / 4 | 0) - (e / 4 | 0);
      }), t = 0; t < 516; t++) if (n[t] !== r[t]) return true;
    });
    p("sort", function (t) {
      if (void 0 !== t && a(t), m) return g.call(this, t);
      d(this);
      var e, n = s(this.length), r = Array(n);
      for (e = 0; e < n; e++) r[e] = this[e];
      for (r = u(this, function (t) {
        return function (e, n) {
          return void 0 !== t ? +t(e, n) || 0 : n != n ? -1 : e != e ? 1 : 0 === e && 0 === n ? 1 / e > 0 && 1 / n < 0 ? 1 : -1 : e > n;
        };
      }(t)), e = 0; e < n; e++) this[e] = r[e];
      return this;
    }, !m || _);
  }, function (t, e, n) {
    n(15)("Float32", function (t) {
      return function (e, n, r) {
        return t(this, e, n, r);
      };
    });
  }, function (t, e, n) {
    var r = n(2);
    t.exports = !r(function () {
      return 7 != Object.defineProperty({}, 1, {get: function () {
        return 7;
      }})[1];
    });
  }, function (t, e, n) {
    var r = n(8), i = n(57), o = n(14), a = n(38), s = Object.defineProperty;
    e.f = r ? s : function (t, e, n) {
      if (o(t), e = a(e), o(n), i) try {
        return s(t, e, n);
      } catch (t) {}
      if ("get" in n || "set" in n) throw TypeError("Accessors not supported");
      return "value" in n && (t[e] = n.value), t;
    };
  }, function (t, e, n) {
    var r = n(19), i = Math.min;
    t.exports = function (t) {
      return t > 0 ? i(r(t), 0x1FFFFFFFFFFFFF) : 0;
    };
  }, function (t, e, n) {
    var r = n(8), i = n(9), o = n(26);
    t.exports = r ? function (t, e, n) {
      return i.f(t, e, o(1, n));
    } : function (t, e, n) {
      return t[e] = n, t;
    };
  }, function (t, e, n) {
    n(15)("Uint16", function (t) {
      return function (e, n, r) {
        return t(this, e, n, r);
      };
    });
  }, function (t, e, n) {
    "use strict";
    var r = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
    e.assign = function (t) {
      for (var e = Array.prototype.slice.call(arguments, 1); e.length;) {
        var n = e.shift();
        if (n) {
          if ("object" != typeof n) throw new TypeError(n + "must be non-object");
          for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
        }
      }
      return t;
    }, e.shrinkBuf = function (t, e) {
      return t.length === e ? t : t.subarray ? t.subarray(0, e) : (t.length = e, t);
    };
    var o = {arraySet: function (t, e, n, r, i) {
      if (e.subarray && t.subarray) t.set(e.subarray(n, n + r), i); else for (var o = 0; o < r; o++) t[i + o] = e[n + o];
    }, flattenChunks: function (t) {
      var e, n, r, i, o, a;
      for (r = 0, e = 0, n = t.length; e < n; e++) r += t[e].length;
      for (a = new Uint8Array(r), i = 0, e = 0, n = t.length; e < n; e++) o = t[e], a.set(o, i), i += o.length;
      return a;
    }}, a = {arraySet: function (t, e, n, r, i) {
      for (var o = 0; o < r; o++) t[i + o] = e[n + o];
    }, flattenChunks: function (t) {
      return [].concat.apply([], t);
    }};
    e.setTyped = function (t) {
      t ? (e.Buf8 = Uint8Array, e.Buf16 = Uint16Array, e.Buf32 = Int32Array, e.assign(e, o)) : (e.Buf8 = Array, e.Buf16 = Array, e.Buf32 = Array, e.assign(e, a));
    }, e.setTyped(r);
  }, function (t, e, n) {
    var r = n(5);
    t.exports = function (t) {
      if (!r(t)) throw TypeError(String(t) + " is not an object");
      return t;
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(27), i = n(0), o = n(8), a = n(105), s = n(30), u = n(62), c = n(64), f = n(26), l = n(11), h = n(108), d = n(10), p = n(65), v = n(109), g = n(38), _ = n(4), m = n(48), b = n(5), y = n(24), w = n(37), x = n(21), k = n(44).f, O = n(111), A = n(114).forEach, E = n(118), S = n(9), T = n(43), j = n(25), z = n(119), M = j.get, B = j.set, P = S.f, I = T.f, L = Math.round, R = i.RangeError, F = u.ArrayBuffer, N = u.DataView, C = s.NATIVE_ARRAY_BUFFER_VIEWS, U = s.TYPED_ARRAY_CONSTRUCTOR, G = s.TYPED_ARRAY_TAG, D = s.TypedArray, Z = s.TypedArrayPrototype, V = s.aTypedArrayConstructor, Y = s.isTypedArray, H = function (t, e) {
      for (var n = 0, r = e.length, i = new (V(t))(r); r > n;) i[n] = e[n++];
      return i;
    }, W = function (t, e) {
      P(t, e, {get: function () {
        return M(this)[e];
      }});
    }, K = function (t) {
      var e;
      return t instanceof F || "ArrayBuffer" == (e = m(t)) || "SharedArrayBuffer" == e;
    };
    o ? (C || (T.f = J, S.f = q, W(Z, "buffer"), W(Z, "byteOffset"), W(Z, "byteLength"), W(Z, "length")), r({target: "Object", stat: true, forced: !C}, {getOwnPropertyDescriptor: J, defineProperty: q}), t.exports = function (t, e, n) {
      var o = t.match(/\d+$/)[0] / 8, s = t + (n ? "Clamped" : "") + "Array", u = "get" + t, f = "set" + t, h = i[s], g = h, _ = g && g.prototype, m = {}, y = function (t, e) {
        P(t, e, {get: function () {
          return function (t, e) {
            var n = M(t);
            return n.view[u](e * o + n.byteOffset, true);
          }(this, e);
        }, set: function (t) {
          return function (t, e, r) {
            var i = M(t);
            n && (r = (r = L(r)) < 0 ? 0 : r > 255 ? 255 : 255 & r), i.view[f](e * o + i.byteOffset, r, true);
          }(this, e, t);
        }, enumerable: true});
      };
      C ? a && (g = e(function (t, e, n, r) {
        return c(t, g, s), z(b(e) ? K(e) ? void 0 !== r ? new h(e, v(n, o), r) : void 0 !== n ? new h(e, v(n, o)) : new h(e) : Y(e) ? H(g, e) : O.call(g, e) : new h(p(e)), t, g);
      }), x && x(g, D), A(k(h), function (t) {
        t in g || l(g, t, h[t]);
      }), g.prototype = _) : (g = e(function (t, e, n, r) {
        c(t, g, s);
        var i, a, u, f = 0, l = 0;
        if (b(e)) {
          if (!K(e)) return Y(e) ? H(g, e) : O.call(g, e);
          i = e, l = v(n, o);
          var h = e.byteLength;
          if (void 0 === r) {
            if (h % o) throw R("Wrong length");
            if ((a = h - l) < 0) throw R("Wrong length");
          } else if ((a = d(r) * o) + l > h) throw R("Wrong length");
          u = a / o;
        } else u = p(e), i = new F(a = u * o);
        for (B(t, {buffer: i, byteOffset: l, byteLength: a, length: u, view: new N(i)}); f < u;) y(t, f++);
      }), x && x(g, D), _ = g.prototype = w(Z)), _.constructor !== g && l(_, "constructor", g), l(_, U, g), G && l(_, G, s), m[s] = g, r({global: true, forced: g != h, sham: !C}, m), "BYTES_PER_ELEMENT" in g || l(g, "BYTES_PER_ELEMENT", o), "BYTES_PER_ELEMENT" in _ || l(_, "BYTES_PER_ELEMENT", o), E(s);
    }) : t.exports = function () {};
  }, function (t, e, n) {
    var r = n(0), i = n(80), o = n(81), a = n(11), s = n(1), u = s("iterator"), c = s("toStringTag"), f = o.values;
    for (var l in i) {
      var h = r[l], d = h && h.prototype;
      if (d) {
        if (d[u] !== f) try {
          a(d, u, f);
        } catch (t) {
          d[u] = f;
        }
        if (d[c] || a(d, c, l), i[l]) for (var p in o) if (d[p] !== o[p]) try {
          a(d, p, o[p]);
        } catch (t) {
          d[p] = o[p];
        }
      }
    }
  }, function (t, e, n) {
    var r = n(32);
    t.exports = function (t) {
      return Object(r(t));
    };
  }, function (t, e, n) {
    var r = n(0), i = function (t) {
      return "function" == typeof t ? t : void 0;
    };
    t.exports = function (t, e) {
      return arguments.length < 2 ? i(r[t]) : r[t] && r[t][e];
    };
  }, function (t, e) {
    var n = Math.ceil, r = Math.floor;
    t.exports = function (t) {
      return isNaN(t = +t) ? 0 : (t > 0 ? r : n)(t);
    };
  }, function (t, e) {
    t.exports = {};
  }, function (t, e, n) {
    var r = n(14), i = n(98);
    t.exports = Object.setPrototypeOf || ("__proto__" in {} ? function () {
      var t, e = false, n = {};
      try {
        (t = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(n, []), e = n instanceof Array;
      } catch (t) {}
      return function (n, o) {
        return r(n), i(o), e ? t.call(n, o) : n.__proto__ = o, n;
      };
    }() : void 0);
  }, function (t, e, n) {
    var r = n(52), i = n(32);
    t.exports = function (t) {
      return r(i(t));
    };
  }, function (t, e, n) {
    var r = n(18);
    t.exports = r("navigator", "userAgent") || "";
  }, function (t, e, n) {
    var r = n(18), i = n(56);
    t.exports = i ? function (t) {
      return "symbol" == typeof t;
    } : function (t) {
      var e = r("Symbol");
      return "function" == typeof e && Object(t) instanceof e;
    };
  }, function (t, e, n) {
    var r, i, o, a = n(89), s = n(0), u = n(5), c = n(11), f = n(4), l = n(34), h = n(42), d = n(40), p = s.WeakMap;
    if (a || l.state) {
      var v = l.state || (l.state = new p), g = v.get, _ = v.has, m = v.set;
      r = function (t, e) {
        if (_.call(v, t)) throw new TypeError("Object already initialized");
        return e.facade = t, m.call(v, t, e), e;
      }, i = function (t) {
        return g.call(v, t) || {};
      }, o = function (t) {
        return _.call(v, t);
      };
    } else {
      var b = h("state");
      d[b] = true, r = function (t, e) {
        if (f(t, b)) throw new TypeError("Object already initialized");
        return e.facade = t, c(t, b, e), e;
      }, i = function (t) {
        return f(t, b) ? t[b] : {};
      }, o = function (t) {
        return f(t, b);
      };
    }
    t.exports = {set: r, get: i, has: o, enforce: function (t) {
      return o(t) ? i(t) : r(t, {});
    }, getterFor: function (t) {
      return function (e) {
        var n;
        if (!u(e) || (n = i(e)).type !== t) throw TypeError("Incompatible receiver, " + t + " required");
        return n;
      };
    }};
  }, function (t, e) {
    t.exports = function (t, e) {
      return {enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: e};
    };
  }, function (t, e, n) {
    var r = n(0), i = n(43).f, o = n(11), a = n(28), s = n(35), u = n(92), c = n(95);
    t.exports = function (t, e) {
      var n, f, l, h, d, p = t.target, v = t.global, g = t.stat;
      if (n = v ? r : g ? r[p] || s(p, {}) : (r[p] || {}).prototype) for (f in e) {
        if (h = e[f], l = t.noTargetGet ? (d = i(n, f)) && d.value : n[f], !c(v ? f : p + (g ? "." : "#") + f, t.forced) && void 0 !== l) {
          if (typeof h == typeof l) continue;
          u(h, l);
        }
        (t.sham || l && l.sham) && o(h, "sham", true), a(n, f, h, t);
      }
    };
  }, function (t, e, n) {
    var r = n(0), i = n(11), o = n(4), a = n(35), s = n(60), u = n(25), c = u.get, f = u.enforce, l = String(String).split("String");
    (t.exports = function (t, e, n, s) {
      var u, c = !!s && !!s.unsafe, h = !!s && !!s.enumerable, d = !!s && !!s.noTargetGet;
      "function" == typeof n && ("string" != typeof e || o(n, "name") || i(n, "name", e), (u = f(n)).source || (u.source = l.join("string" == typeof e ? e : ""))), t !== r ? (c ? !d && t[e] && (h = true) : delete t[e], h ? t[e] = n : i(t, e, n)) : h ? t[e] = n : a(e, n);
    })(Function.prototype, "toString", function () {
      return "function" == typeof this && c(this).source || s(this);
    });
  }, function (t, e, n) {
    var r = n(4), i = n(17), o = n(42), a = n(97), s = o("IE_PROTO"), u = Object.prototype;
    t.exports = a ? Object.getPrototypeOf : function (t) {
      return t = i(t), r(t, s) ? t[s] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? u : null;
    };
  }, function (t, e, n) {
    "use strict";
    var r, i, o, a = n(63), s = n(8), u = n(0), c = n(5), f = n(4), l = n(48), h = n(11), d = n(28), p = n(9).f, v = n(29), g = n(21), _ = n(1), m = n(36), b = u.Int8Array, y = b && b.prototype, w = u.Uint8ClampedArray, x = w && w.prototype, k = b && v(b), O = y && v(y), A = Object.prototype, E = A.isPrototypeOf, S = _("toStringTag"), T = m("TYPED_ARRAY_TAG"), j = m("TYPED_ARRAY_CONSTRUCTOR"), z = a && !!g && "Opera" !== l(u.opera), M = false, B = {Int8Array: 1, Uint8Array: 1, Uint8ClampedArray: 1, Int16Array: 2, Uint16Array: 2, Int32Array: 4, Uint32Array: 4, Float32Array: 4, Float64Array: 8}, P = {BigInt64Array: 8, BigUint64Array: 8}, I = function (t) {
      if (!c(t)) return false;
      var e = l(t);
      return f(B, e) || f(P, e);
    };
    for (r in B) (o = (i = u[r]) && i.prototype) ? h(o, j, i) : z = false;
    for (r in P) (o = (i = u[r]) && i.prototype) && h(o, j, i);
    if ((!z || "function" != typeof k || k === Function.prototype) && (k = function () {
      throw TypeError("Incorrect invocation");
    }, z)) for (r in B) u[r] && g(u[r], k);
    if ((!z || !O || O === A) && (O = k.prototype, z)) for (r in B) u[r] && g(u[r].prototype, O);
    if (z && v(x) !== O && g(x, O), s && !f(O, S)) for (r in M = true, p(O, S, {get: function () {
      return c(this) ? this[T] : void 0;
    }}), B) u[r] && h(u[r], T, r);
    t.exports = {NATIVE_ARRAY_BUFFER_VIEWS: z, TYPED_ARRAY_CONSTRUCTOR: j, TYPED_ARRAY_TAG: M && T, aTypedArray: function (t) {
      if (I(t)) return t;
      throw TypeError("Target is not a typed array");
    }, aTypedArrayConstructor: function (t) {
      if (g && !E.call(k, t)) throw TypeError("Target is not a typed array constructor");
      return t;
    }, exportTypedArrayMethod: function (t, e, n) {
      if (s) {
        if (n) for (var r in B) {
          var i = u[r];
          if (i && f(i.prototype, t)) try {
            delete i.prototype[t];
          } catch (t) {}
        }
        O[t] && !n || d(O, t, n ? e : z && y[t] || e);
      }
    }, exportTypedArrayStaticMethod: function (t, e, n) {
      var r, i;
      if (s) {
        if (g) {
          if (n) for (r in B) if ((i = u[r]) && f(i, t)) try {
            delete i[t];
          } catch (t) {}
          if (k[t] && !n) return;
          try {
            return d(k, t, n ? e : z && k[t] || e);
          } catch (t) {}
        }
        for (r in B) !(i = u[r]) || i[t] && !n || d(i, t, e);
      }
    }, isView: function (t) {
      if (!c(t)) return false;
      var e = l(t);
      return "DataView" === e || f(B, e) || f(P, e);
    }, isTypedArray: I, TypedArray: k, TypedArrayPrototype: O};
  }, function (t, e) {
    var n = {}.toString;
    t.exports = function (t) {
      return n.call(t).slice(8, -1);
    };
  }, function (t, e) {
    t.exports = function (t) {
      if (null == t) throw TypeError("Can't call method on " + t);
      return t;
    };
  }, function (t, e) {
    t.exports = false;
  }, function (t, e, n) {
    var r = n(0), i = n(35), o = r["__core-js_shared__"] || i("__core-js_shared__", {});
    t.exports = o;
  }, function (t, e, n) {
    var r = n(0);
    t.exports = function (t, e) {
      try {
        Object.defineProperty(r, t, {value: e, configurable: true, writable: true});
      } catch (n) {
        r[t] = e;
      }
      return e;
    };
  }, function (t, e) {
    var n = 0, r = Math.random();
    t.exports = function (t) {
      return "Symbol(" + String(void 0 === t ? "" : t) + ")_" + (++n + r).toString(36);
    };
  }, function (t, e, n) {
    var r, i = n(14), o = n(83), a = n(41), s = n(40), u = n(88), c = n(58), f = n(42), l = f("IE_PROTO"), h = function () {}, p = function (t) {
      t.write("<script></script>"), t.close();
      var e = t.parentWindow.Object;
      return t = null, e;
    }, v = function () {
      try {
        r = new ActiveXObject("htmlfile");
      } catch (t) {}
      var t, e;
      v = "undefined" != typeof document ? document.domain && r ? p(r) : ((e = c("iframe")).style.display = "none", u.appendChild(e), e.src = String("javascript:"), (t = e.contentWindow.document).open(), t.write("<script>document.F=Object</script>"), t.close(), t.F) : p(r);
      for (var n = a.length; n--;) delete v.prototype[a[n]];
      return v();
    };
    s[l] = true, t.exports = Object.create || function (t, e) {
      var n;
      return null !== t ? (h.prototype = i(t), n = new h, h.prototype = null, n[l] = t) : n = v(), void 0 === e ? n : o(n, e);
    };
  }, function (t, e, n) {
    var r = n(84), i = n(24);
    t.exports = function (t) {
      var e = r(t, "string");
      return i(e) ? e : String(e);
    };
  }, function (t, e, n) {
    var r = n(19), i = Math.max, o = Math.min;
    t.exports = function (t, e) {
      var n = r(t);
      return n < 0 ? i(n + e, 0) : o(n, e);
    };
  }, function (t, e) {
    t.exports = {};
  }, function (t, e) {
    t.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
  }, function (t, e, n) {
    var r = n(53), i = n(36), o = r("keys");
    t.exports = function (t) {
      return o[t] || (o[t] = i(t));
    };
  }, function (t, e, n) {
    var r = n(8), i = n(91), o = n(26), a = n(22), s = n(38), u = n(4), c = n(57), f = Object.getOwnPropertyDescriptor;
    e.f = r ? f : function (t, e) {
      if (t = a(t), e = s(e), c) try {
        return f(t, e);
      } catch (t) {}
      if (u(t, e)) return o(!i.f.call(t, e), t[e]);
    };
  }, function (t, e, n) {
    var r = n(59), i = n(41).concat("length", "prototype");
    e.f = Object.getOwnPropertyNames || function (t) {
      return r(t, i);
    };
  }, function (t, e, n) {
    var r = n(9).f, i = n(4), o = n(1)("toStringTag");
    t.exports = function (t, e, n) {
      t && !i(t = n ? t : t.prototype, o) && r(t, o, {configurable: true, value: e});
    };
  }, function (t, e, n) {
    "use strict";
    n(3), n(12), n(6), n(7), Object.defineProperty(e, "__esModule", {value: true}), e.mergeBounds = e.mergePrimitives = void 0;
    const r = {positions: 3, normals: 3, weights: 4, boneIndices: 4, uvs: 2, tangents: 4};
    function i(t, e) {
      for (let n = 0; n < 3; n++) t[n] = Math.min(t[n], e[n]);
      for (let n = 2; n < 6; n++) t[n] = Math.max(t[n], e[n]);
      return t;
    }
    e.mergePrimitives = function (t) {
      let e = 0, n = 0;
      const o = [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity];
      if (t.forEach(t => {
        e += t.indices.length, n += t.attributes.positions.length / r.positions, i(o, t.bounds);
      }), n > 65535) throw new Error("[merge Primitives] cannot merge geometries, they exceed maximum index size of 65535");
      const a = new Uint16Array(e), s = {};
      for (const e in t[0].attributes) s[e] = new Float32Array(n * r[e]);
      let u = 0, c = 0, f = 0;
      return t.forEach(t => {
        for (const e in t.attributes) {
          const n = t.attributes[e], i = s[e], o = r[e];
          for (let t = 0; t < n.length; t++) i[t + f * o] = n[t];
        }
        f += t.attributes.positions.length / r.positions;
        for (let e = 0; e < t.indices.length; e++) a[u++] = t.indices[e] + c;
        c += t.attributes.positions.length / 3;
      }), {indices: a, attributes: s, bounds: o};
    }, e.mergeBounds = i;
  }, function (t, e) {
    t.exports = function (t) {
      if ("function" != typeof t) throw TypeError(String(t) + " is not a function");
      return t;
    };
  }, function (t, e, n) {
    var r = n(107), i = n(31), o = n(1)("toStringTag"), a = "Arguments" == i(function () {
      return arguments;
    }());
    t.exports = r ? i : function (t) {
      var e, n, r;
      return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (n = function (t, e) {
        try {
          return t[e];
        } catch (t) {}
      }(e = Object(t), o)) ? n : a ? i(e) : "Object" == (r = i(e)) && "function" == typeof e.callee ? "Arguments" : r;
    };
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: true}), e.getBounds = void 0, e.getBounds = function (t, e) {
      const n = [];
      for (let t = 0; t < e; t++) n[t] = {min: Infinity, max: -Infinity};
      for (let r = 0; r < t.length; r += e) for (let i = 0; i < e; i++) {
        const e = t[r + i];
        e < n[i].min && (n[i].min = e), e > n[i].max && (n[i].max = e);
      }
      const r = n.map(t => t.max - t.min);
      return r.forEach((t, e) => {
        t > 1e8 && (n[e].max = 1, n[e].min = 0, r[e] = 1);
      }), {ranges: n, sizes: r};
    };
  }, function (t, e, n) {
    "use strict";
    t.exports = {2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version"};
  }, function (t, e, n) {
    "use strict";
    n(3), n(138), n(6), n(12), n(139), n(140), n(7), Object.defineProperty(e, "__esModule", {value: true}), e.getBuffer = void 0;
    const r = {5122: Int16Array, 5123: Uint16Array, 5124: Int32Array, 5125: Uint32Array, 5126: Float32Array}, i = {SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT2: 4, MAT3: 9, MAT4: 16};
    e.getBuffer = function (t, e, n = false) {
      const o = t.accessors[e], a = t.bufferViews[o.bufferView], s = t.realBuffers[a.buffer], u = (a.byteOffset || 0) + (o.byteOffset || 0);
      if (o.byteStride) throw new Error("byteStride in buffer... not yet supported");
      const c = r[o.componentType];
      if (5125 === o.componentType) {
        const t = new Uint32Array(s, u, o.count * i[o.type]);
        for (let e = 0; e < t.length; e++) if (t[e] > 65535) throw new Error("[gb-model-tools] Uint32 Array required for this model, its too big!");
        return new Uint16Array(t);
      }
      return new c(s, u, o.count * i[o.type]);
    };
  }, function (t, e, n) {
    var r = n(2), i = n(31), o = "".split;
    t.exports = r(function () {
      return !Object("z").propertyIsEnumerable(0);
    }) ? function (t) {
      return "String" == i(t) ? o.call(t, "") : Object(t);
    } : Object;
  }, function (t, e, n) {
    var r = n(33), i = n(34);
    (t.exports = function (t, e) {
      return i[t] || (i[t] = void 0 !== e ? e : {});
    })("versions", []).push({version: "3.16.2", mode: r ? "pure" : "global", copyright: "© 2021 Denis Pushkarev (zloirock.ru)"});
  }, function (t, e, n) {
    var r = n(55), i = n(2);
    t.exports = !!Object.getOwnPropertySymbols && !i(function () {
      var t = Symbol();
      return !String(t) || !(Object(t) instanceof Symbol) || !Symbol.sham && r && r < 41;
    });
  }, function (t, e, n) {
    var r, i, o = n(0), a = n(23), s = o.process, u = o.Deno, c = s && s.versions || u && u.version, f = c && c.v8;
    f ? i = (r = f.split("."))[0] < 4 ? 1 : r[0] + r[1] : a && (!(r = a.match(/Edge\/(\d+)/)) || r[1] >= 74) && (r = a.match(/Chrome\/(\d+)/)) && (i = r[1]), t.exports = i && +i;
  }, function (t, e, n) {
    var r = n(54);
    t.exports = r && !Symbol.sham && "symbol" == typeof Symbol.iterator;
  }, function (t, e, n) {
    var r = n(8), i = n(2), o = n(58);
    t.exports = !r && !i(function () {
      return 7 != Object.defineProperty(o("div"), "a", {get: function () {
        return 7;
      }}).a;
    });
  }, function (t, e, n) {
    var r = n(0), i = n(5), o = r.document, a = i(o) && i(o.createElement);
    t.exports = function (t) {
      return a ? o.createElement(t) : {};
    };
  }, function (t, e, n) {
    var r = n(4), i = n(22), o = n(87).indexOf, a = n(40);
    t.exports = function (t, e) {
      var n, s = i(t), u = 0, c = [];
      for (n in s) !r(a, n) && r(s, n) && c.push(n);
      for (; e.length > u;) r(s, n = e[u++]) && (~o(c, n) || c.push(n));
      return c;
    };
  }, function (t, e, n) {
    var r = n(34), i = Function.toString;
    "function" != typeof r.inspectSource && (r.inspectSource = function (t) {
      return i.call(t);
    }), t.exports = r.inspectSource;
  }, function (t, e, n) {
    "use strict";
    var r, i, o, a = n(2), s = n(29), u = n(11), c = n(4), f = n(1), l = n(33), h = f("iterator"), d = false;
    [].keys && ("next" in (o = [].keys()) ? (i = s(s(o))) !== Object.prototype && (r = i) : d = true);
    var p = null == r || a(function () {
      var t = {};
      return r[h].call(t) !== t;
    });
    p && (r = {}), l && !p || c(r, h) || u(r, h, function () {
      return this;
    }), t.exports = {IteratorPrototype: r, BUGGY_SAFARI_ITERATORS: d};
  }, function (t, e, n) {
    "use strict";
    var r = n(0), i = n(8), o = n(63), a = n(11), s = n(101), u = n(2), c = n(64), f = n(19), l = n(10), h = n(65), d = n(102), p = n(29), v = n(21), g = n(44).f, _ = n(9).f, m = n(103), b = n(45), y = n(25), w = y.get, x = y.set, k = r.ArrayBuffer, O = k, A = r.DataView, E = A && A.prototype, S = Object.prototype, T = r.RangeError, j = d.pack, z = d.unpack, M = function (t) {
      return [255 & t];
    }, B = function (t) {
      return [255 & t, t >> 8 & 255];
    }, P = function (t) {
      return [255 & t, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255];
    }, F = function (t, e) {
      _(t.prototype, e, {get: function () {
        return w(this)[e];
      }});
    }, N = function (t, e, n, r) {
      var i = h(n), o = w(t);
      if (i + e > o.byteLength) throw T("Wrong index");
      var a = w(o.buffer).bytes, s = i + o.byteOffset, u = a.slice(s, s + e);
      return r ? u : u.reverse();
    }, C = function (t, e, n, r, i, o) {
      var a = h(n), s = w(t);
      if (a + e > s.byteLength) throw T("Wrong index");
      for (var u = w(s.buffer).bytes, c = a + s.byteOffset, f = r(+i), l = 0; l < e; l++) u[c + l] = f[o ? l : e - l - 1];
    };
    if (o) {
      if (!u(function () {
        k(1);
      }) || !u(function () {
        new k(-1);
      }) || u(function () {
        return new k, new k(1.5), new k(NaN), "ArrayBuffer" != k.name;
      })) {
        for (var U, G = (O = function (t) {
          return c(this, O), new k(h(t));
        }).prototype = k.prototype, D = g(k), Z = 0; D.length > Z;) (U = D[Z++]) in O || a(O, U, k[U]);
        G.constructor = O;
      }
      v && p(E) !== S && v(E, S);
      var V = new A(new O(2)), Y = E.setInt8;
      V.setInt8(0, 2147483648), V.setInt8(1, 2147483649), !V.getInt8(0) && V.getInt8(1) || s(E, {setInt8: function (t, e) {
        Y.call(this, t, e << 24 >> 24);
      }, setUint8: function (t, e) {
        Y.call(this, t, e << 24 >> 24);
      }}, {unsafe: true});
    } else O = function (t) {
      c(this, O, "ArrayBuffer");
      var e = h(t);
      x(this, {bytes: m.call(new Array(e), 0), byteLength: e}), i || (this.byteLength = e);
    }, A = function (t, e, n) {
      c(this, A, "DataView"), c(t, O, "DataView");
      var r = w(t).byteLength, o = f(e);
      if (o < 0 || o > r) throw T("Wrong offset");
      if (o + (n = void 0 === n ? r - o : l(n)) > r) throw T("Wrong length");
      x(this, {buffer: t, byteLength: n, byteOffset: o}), i || (this.buffer = t, this.byteLength = n, this.byteOffset = o);
    }, i && (F(O, "byteLength"), F(A, "buffer"), F(A, "byteLength"), F(A, "byteOffset")), s(A.prototype, {getInt8: function (t) {
      return N(this, 1, t)[0] << 24 >> 24;
    }, getUint8: function (t) {
      return N(this, 1, t)[0];
    }, getInt16: function (t) {
      var e = N(this, 2, t, arguments.length > 1 ? arguments[1] : void 0);
      return (e[1] << 8 | e[0]) << 16 >> 16;
    }, getUint16: function (t) {
      var e = N(this, 2, t, arguments.length > 1 ? arguments[1] : void 0);
      return e[1] << 8 | e[0];
    }, getInt32: function (t) {
      return N(this, 4, t, arguments.length > 1 ? arguments[1] : void 0)[3] << 24 | N(this, 4, t, arguments.length > 1 ? arguments[1] : void 0)[2] << 16 | N(this, 4, t, arguments.length > 1 ? arguments[1] : void 0)[1] << 8 | N(this, 4, t, arguments.length > 1 ? arguments[1] : void 0)[0];
    }, getUint32: function (t) {
      return (N(this, 4, t, arguments.length > 1 ? arguments[1] : void 0)[3] << 24 | N(this, 4, t, arguments.length > 1 ? arguments[1] : void 0)[2] << 16 | N(this, 4, t, arguments.length > 1 ? arguments[1] : void 0)[1] << 8 | N(this, 4, t, arguments.length > 1 ? arguments[1] : void 0)[0]) >>> 0;
    }, getFloat32: function (t) {
      return z(N(this, 4, t, arguments.length > 1 ? arguments[1] : void 0), 23);
    }, getFloat64: function (t) {
      return z(N(this, 8, t, arguments.length > 1 ? arguments[1] : void 0), 52);
    }, setInt8: function (t, e) {
      C(this, 1, t, M, e);
    }, setUint8: function (t, e) {
      C(this, 1, t, M, e);
    }, setInt16: function (t, e) {
      C(this, 2, t, B, e, arguments.length > 2 ? arguments[2] : void 0);
    }, setUint16: function (t, e) {
      C(this, 2, t, B, e, arguments.length > 2 ? arguments[2] : void 0);
    }, setInt32: function (t, e) {
      C(this, 4, t, P, e, arguments.length > 2 ? arguments[2] : void 0);
    }, setUint32: function (t, e) {
      C(this, 4, t, P, e, arguments.length > 2 ? arguments[2] : void 0);
    }, setFloat32: function (t, e) {
      C(this, 4, t, L, e, arguments.length > 2 ? arguments[2] : void 0);
    }, setFloat64: function (t, e) {
      C(this, 8, t, R, e, arguments.length > 2 ? arguments[2] : void 0);
    }});
    b(O, "ArrayBuffer"), b(A, "DataView"), t.exports = {ArrayBuffer: O, DataView: A};
  }, function (t, e) {
    t.exports = "undefined" != typeof ArrayBuffer && "undefined" != typeof DataView;
  }, function (t, e) {
    t.exports = function (t, e, n) {
      if (!(t instanceof e)) throw TypeError("Incorrect " + (n ? n + " " : "") + "invocation");
      return t;
    };
  }, function (t, e, n) {
    var r = n(19), i = n(10);
    t.exports = function (t) {
      if (void 0 === t) return 0;
      var e = r(t), n = i(e);
      if (e !== n) throw RangeError("Wrong length or index");
      return n;
    };
  }, function (t, e, n) {
    var r = n(47);
    t.exports = function (t, e, n) {
      if (r(t), void 0 === e) return t;
      switch (n) {
        case 0:
          return function () {
            return t.call(e);
          };
        case 1:
          return function (n) {
            return t.call(e, n);
          };
        case 2:
          return function (n, r) {
            return t.call(e, n, r);
          };
        case 3:
          return function (n, r, i) {
            return t.call(e, n, r, i);
          };
      }
      return function () {
        return t.apply(e, arguments);
      };
    };
  }, function (t, e, n) {
    n(15)("Uint8", function (t) {
      return function (e, n, r) {
        return t(this, e, n, r);
      };
    });
  }, function (t, e, n) {
    "use strict";
    n(3), n(7), n(6), n(12), Object.defineProperty(e, "__esModule", {value: true}), e.unpackArray = e.compressArray = void 0;
    const r = n(49);
    function i(t, e, n) {
      const r = e.ranges[n], i = e.sizes[n];
      return (t - r.min) / i * 65535;
    }
    e.compressArray = function (t, e = 3) {
      const n = r.getBounds(t, e), o = 2 * e + 1 + 1;
      let a = t.length / 2 + o;
      a += a % 1;
      const s = new Float32Array(a), u = new Uint16Array(s.buffer);
      let c = 0;
      for (let r = 0; r < t.length; r += e) for (let r = 0; r < e; r++) u[2 * o + c] = i(t[c], n, r), c++;
      c = 0, s[c++] = t.length, s[c++] = o - 1 - 1;
      for (let t = 0; t < e; t++) s[c++] = n.ranges[t].min, s[c++] = n.sizes[t];
      return u;
    }, e.unpackArray = function (t) {
      let e = new Float32Array(t.buffer, 0, 2), n = 0;
      const r = e[n++], i = e[n++], o = [];
      e = new Float32Array(t.buffer, 0, 2 + i);
      for (let t = 0; t < i / 2; t++) o[t] = {min: e[n++], size: e[n++]};
      const a = o.length;
      n *= 2;
      let s = 0;
      const u = new Float32Array(r);
      for (let e = 0; e < r; e += a) for (let e = 0; e < a; e++) u[s++] = t[n++] / 65535 * o[e].size + o[e].min;
      return u;
    };
  }, function (t, e, n) {
    "use strict";
    n(3), n(12), n(6), Object.defineProperty(e, "__esModule", {value: true}), e.unzipArray = e.zipArray = void 0;
    const r = n(125);
    e.zipArray = function (t) {
      return r.deflate(t.buffer);
    }, e.unzipArray = function (t) {
      return new Uint16Array(r.inflate(t).buffer);
    };
  }, function (t, e, n) {
    "use strict";
    t.exports = function (t, e, n, r) {
      for (var i = 65535 & t | 0, o = t >>> 16 & 65535 | 0, a = 0; 0 !== n;) {
        n -= a = n > 2e3 ? 2e3 : n;
        do {
          o = o + (i = i + e[r++] | 0) | 0;
        } while (--a);
        i %= 65521, o %= 65521;
      }
      return i | o << 16 | 0;
    };
  }, function (t, e, n) {
    "use strict";
    var r = function () {
      for (var t, e = [], n = 0; n < 256; n++) {
        t = n;
        for (var r = 0; r < 8; r++) t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
        e[n] = t;
      }
      return e;
    }();
    t.exports = function (t, e, n, i) {
      var o = r, a = i + n;
      t ^= -1;
      for (var s = i; s < a; s++) t = t >>> 8 ^ o[255 & (t ^ e[s])];
      return -1 ^ t;
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(13), i = true, o = true;
    try {
      String.fromCharCode.apply(null, [0]);
    } catch (t) {
      i = false;
    }
    try {
      String.fromCharCode.apply(null, new Uint8Array(1));
    } catch (t) {
      o = false;
    }
    for (var a = new r.Buf8(256), s = 0; s < 256; s++) a[s] = s >= 252 ? 6 : s >= 248 ? 5 : s >= 240 ? 4 : s >= 224 ? 3 : s >= 192 ? 2 : 1;
    function u(t, e) {
      if (e < 65534 && (t.subarray && o || !t.subarray && i)) return String.fromCharCode.apply(null, r.shrinkBuf(t, e));
      for (var n = "", a = 0; a < e; a++) n += String.fromCharCode(t[a]);
      return n;
    }
    a[254] = a[254] = 1, e.string2buf = function (t) {
      var e, n, i, o, a, s = t.length, u = 0;
      for (o = 0; o < s; o++) 55296 == (64512 & (n = t.charCodeAt(o))) && o + 1 < s && 56320 == (64512 & (i = t.charCodeAt(o + 1))) && (n = 65536 + (n - 55296 << 10) + (i - 56320), o++), u += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
      for (e = new r.Buf8(u), a = 0, o = 0; a < u; o++) 55296 == (64512 & (n = t.charCodeAt(o))) && o + 1 < s && 56320 == (64512 & (i = t.charCodeAt(o + 1))) && (n = 65536 + (n - 55296 << 10) + (i - 56320), o++), n < 128 ? e[a++] = n : n < 2048 ? (e[a++] = 192 | n >>> 6, e[a++] = 128 | 63 & n) : n < 65536 ? (e[a++] = 224 | n >>> 12, e[a++] = 128 | n >>> 6 & 63, e[a++] = 128 | 63 & n) : (e[a++] = 240 | n >>> 18, e[a++] = 128 | n >>> 12 & 63, e[a++] = 128 | n >>> 6 & 63, e[a++] = 128 | 63 & n);
      return e;
    }, e.buf2binstring = function (t) {
      return u(t, t.length);
    }, e.binstring2buf = function (t) {
      for (var e = new r.Buf8(t.length), n = 0, i = e.length; n < i; n++) e[n] = t.charCodeAt(n);
      return e;
    }, e.buf2string = function (t, e) {
      var n, r, i, o, s = e || t.length, c = new Array(2 * s);
      for (r = 0, n = 0; n < s;) if ((i = t[n++]) < 128) c[r++] = i; else if ((o = a[i]) > 4) c[r++] = 65533, n += o - 1; else {
        for (i &= 2 === o ? 31 : 3 === o ? 15 : 7; o > 1 && n < s;) i = i << 6 | 63 & t[n++], o--;
        o > 1 ? c[r++] = 65533 : i < 65536 ? c[r++] = i : (i -= 65536, c[r++] = 55296 | i >> 10 & 1023, c[r++] = 56320 | 1023 & i);
      }
      return u(c, r);
    }, e.utf8border = function (t, e) {
      var n;
      for ((e = e || t.length) > t.length && (e = t.length), n = e - 1; n >= 0 && 128 == (192 & t[n]);) n--;
      return n < 0 || 0 === n ? e : n + a[t[n]] > e ? n : e;
    };
  }, function (t, e, n) {
    "use strict";
    t.exports = function () {
      this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
    };
  }, function (t, e, n) {
    "use strict";
    t.exports = {Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8};
  }, function (t, e, n) {
    "use strict";
    n(3), n(7), n(6), Object.defineProperty(e, "__esModule", {value: true}), e.transformMat4 = e.multiplyMat4 = e.createMat4 = void 0, e.createMat4 = function () {
      return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }, e.multiplyMat4 = function (t, e, n) {
      const r = e[0], i = e[1], o = e[2], a = e[3], s = e[4], u = e[5], c = e[6], f = e[7], l = e[8], h = e[9], d = e[10], p = e[11], v = e[12], g = e[13], _ = e[14], m = e[15];
      let b = n[0], y = n[1], w = n[2], x = n[3];
      return t[0] = b * r + y * s + w * l + x * v, t[1] = b * i + y * u + w * h + x * g, t[2] = b * o + y * c + w * d + x * _, t[3] = b * a + y * f + w * p + x * m, b = n[4], y = n[5], w = n[6], x = n[7], t[4] = b * r + y * s + w * l + x * v, t[5] = b * i + y * u + w * h + x * g, t[6] = b * o + y * c + w * d + x * _, t[7] = b * a + y * f + w * p + x * m, b = n[8], y = n[9], w = n[10], x = n[11], t[8] = b * r + y * s + w * l + x * v, t[9] = b * i + y * u + w * h + x * g, t[10] = b * o + y * c + w * d + x * _, t[11] = b * a + y * f + w * p + x * m, b = n[12], y = n[13], w = n[14], x = n[15], t[12] = b * r + y * s + w * l + x * v, t[13] = b * i + y * u + w * h + x * g, t[14] = b * o + y * c + w * d + x * _, t[15] = b * a + y * f + w * p + x * m, t;
    }, e.transformMat4 = function (t, e, n) {
      const r = e[0], i = e[1], o = e[2];
      let a = n[3] * r + n[7] * i + n[11] * o + n[15];
      return a = a || 1, t[0] = (n[0] * r + n[4] * i + n[8] * o + n[12]) / a, t[1] = (n[1] * r + n[5] * i + n[9] * o + n[13]) / a, t[2] = (n[2] * r + n[6] * i + n[10] * o + n[14]) / a, t;
    };
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: true}), e.transformPositions = void 0, e.transformPositions = function (t, e) {
      const n = e[0], r = e[1], i = e[2], o = e[3], a = e[4], s = e[5], u = e[6], c = e[7], f = e[8], l = e[9], h = e[10], d = e[11], p = e[12], v = e[13], g = e[14], _ = e[15];
      for (let e = 0; e < t.length; e += 3) {
        const m = t[e], b = t[e + 1], y = t[e + 2];
        let w = o * m + c * b + d * y + _;
        w = w || 1, t[e] = (n * m + a * b + f * y + p) / w, t[e + 1] = (r * m + s * b + l * y + v) / w, t[e + 2] = (i * m + u * b + h * y + g) / w;
      }
    };
  }, function (t, e) {
    t.exports = "	\n\r                　\u2028\u2029﻿";
  }, function (t, e, n) {
    "use strict";
    var r = this && this.__createBinding || (Object.create ? function (t, e, n, r) {
      void 0 === r && (r = n), Object.defineProperty(t, r, {enumerable: true, get: function () {
        return e[n];
      }});
    } : function (t, e, n, r) {
      void 0 === r && (r = n), t[r] = e[n];
    }), i = this && this.__exportStar || function (t, e) {
      for (var n in t) "default" === n || e.hasOwnProperty(n) || r(e, t, n);
    };
    Object.defineProperty(e, "__esModule", {value: true}), e.dedupeGeometry = e.batchGeometry = e.flattenScene = e.transformUvs = e.transformPositions = e.mergeGBObjects = e.mergePrimitives = e.unpackGBObject = e.compressGBObject = e.objToGbParser = e.gltfToGbParser = void 0;
    const o = n(100);
    Object.defineProperty(e, "batchGeometry", {enumerable: true, get: function () {
      return o.batchGeometry;
    }});
    const a = n(124);
    Object.defineProperty(e, "compressGBObject", {enumerable: true, get: function () {
      return a.compressGBObject;
    }});
    const s = n(134);
    Object.defineProperty(e, "dedupeGeometry", {enumerable: true, get: function () {
      return s.dedupeGeometry;
    }});
    const u = n(135);
    Object.defineProperty(e, "flattenScene", {enumerable: true, get: function () {
      return u.flattenScene;
    }});
    const c = n(136);
    Object.defineProperty(e, "gltfToGbParser", {enumerable: true, get: function () {
      return c.gltfToGbParser;
    }});
    const f = n(149);
    Object.defineProperty(e, "objToGbParser", {enumerable: true, get: function () {
      return f.objToGbParser;
    }});
    const l = n(155);
    Object.defineProperty(e, "mergeGBObjects", {enumerable: true, get: function () {
      return l.mergeGBObjects;
    }});
    const h = n(46);
    Object.defineProperty(e, "mergePrimitives", {enumerable: true, get: function () {
      return h.mergePrimitives;
    }});
    const d = n(76);
    Object.defineProperty(e, "transformPositions", {enumerable: true, get: function () {
      return d.transformPositions;
    }});
    const p = n(156);
    Object.defineProperty(e, "transformUvs", {enumerable: true, get: function () {
      return p.transformUvs;
    }});
    const v = n(157);
    Object.defineProperty(e, "unpackGBObject", {enumerable: true, get: function () {
      return v.unpackGBObject;
    }}), i(n(160), e);
  }, function (t, e) {
    var n;
    n = function () {
      return this;
    }();
    try {
      n = n || new Function("return this")();
    } catch (t) {
      "object" == typeof window && (n = window);
    }
    t.exports = n;
  }, function (t, e) {
    t.exports = {CSSRuleList: 0, CSSStyleDeclaration: 0, CSSValueList: 0, ClientRectList: 0, DOMRectList: 0, DOMStringList: 0, DOMTokenList: 1, DataTransferItemList: 0, FileList: 0, HTMLAllCollection: 0, HTMLCollection: 0, HTMLFormElement: 0, HTMLSelectElement: 0, MediaList: 0, MimeTypeArray: 0, NamedNodeMap: 0, NodeList: 1, PaintRequestList: 0, Plugin: 0, PluginArray: 0, SVGLengthList: 0, SVGNumberList: 0, SVGPathSegList: 0, SVGPointList: 0, SVGStringList: 0, SVGTransformList: 0, SourceBufferList: 0, StyleSheetList: 0, TextTrackCueList: 0, TextTrackList: 0, TouchList: 0};
  }, function (t, e, n) {
    "use strict";
    var r = n(22), i = n(82), o = n(20), a = n(25), s = n(90), u = a.set, c = a.getterFor("Array Iterator");
    t.exports = s(Array, "Array", function (t, e) {
      u(this, {type: "Array Iterator", target: r(t), index: 0, kind: e});
    }, function () {
      var t = c(this), e = t.target, n = t.kind, r = t.index++;
      return !e || r >= e.length ? (t.target = void 0, {value: void 0, done: true}) : "keys" == n ? {value: r, done: false} : "values" == n ? {value: e[r], done: false} : {value: [r, e[r]], done: false};
    }, "values"), o.Arguments = o.Array, i("keys"), i("values"), i("entries");
  }, function (t, e, n) {
    var r = n(1), i = n(37), o = n(9), a = r("unscopables"), s = Array.prototype;
    null == s[a] && o.f(s, a, {configurable: true, value: i(null)}), t.exports = function (t) {
      s[a][t] = true;
    };
  }, function (t, e, n) {
    var r = n(8), i = n(9), o = n(14), a = n(86);
    t.exports = r ? Object.defineProperties : function (t, e) {
      o(t);
      for (var n, r = a(e), s = r.length, u = 0; s > u;) i.f(t, n = r[u++], e[n]);
      return t;
    };
  }, function (t, e, n) {
    var r = n(5), i = n(24), o = n(85), a = n(1)("toPrimitive");
    t.exports = function (t, e) {
      if (!r(t) || i(t)) return t;
      var n, s = t[a];
      if (void 0 !== s) {
        if (void 0 === e && (e = "default"), n = s.call(t, e), !r(n) || i(n)) return n;
        throw TypeError("Can't convert object to primitive value");
      }
      return void 0 === e && (e = "number"), o(t, e);
    };
  }, function (t, e, n) {
    var r = n(5);
    t.exports = function (t, e) {
      var n, i;
      if ("string" === e && "function" == typeof (n = t.toString) && !r(i = n.call(t))) return i;
      if ("function" == typeof (n = t.valueOf) && !r(i = n.call(t))) return i;
      if ("string" !== e && "function" == typeof (n = t.toString) && !r(i = n.call(t))) return i;
      throw TypeError("Can't convert object to primitive value");
    };
  }, function (t, e, n) {
    var r = n(59), i = n(41);
    t.exports = Object.keys || function (t) {
      return r(t, i);
    };
  }, function (t, e, n) {
    var r = n(22), i = n(10), o = n(39), a = function (t) {
      return function (e, n, a) {
        var s, u = r(e), c = i(u.length), f = o(a, c);
        if (t && n != n) {
          for (; c > f;) if ((s = u[f++]) != s) return true;
        } else for (; c > f; f++) if ((t || f in u) && u[f] === n) return t || f || 0;
        return !t && -1;
      };
    };
    t.exports = {includes: a(true), indexOf: a(false)};
  }, function (t, e, n) {
    var r = n(18);
    t.exports = r("document", "documentElement");
  }, function (t, e, n) {
    var r = n(0), i = n(60), o = r.WeakMap;
    t.exports = "function" == typeof o && /native code/.test(i(o));
  }, function (t, e, n) {
    "use strict";
    var r = n(27), i = n(96), o = n(29), a = n(21), s = n(45), u = n(11), c = n(28), f = n(1), l = n(33), h = n(20), d = n(61), p = d.IteratorPrototype, v = d.BUGGY_SAFARI_ITERATORS, g = f("iterator"), _ = function () {
      return this;
    };
    t.exports = function (t, e, n, f, d, m, b) {
      i(n, e, f);
      var y, w, x, k = function (t) {
        if (t === d && T) return T;
        if (!v && t in E) return E[t];
        switch (t) {
          case "keys":
          case "values":
          case "entries":
            return function () {
              return new n(this, t);
            };
        }
        return function () {
          return new n(this);
        };
      }, O = e + " Iterator", A = false, E = t.prototype, S = E[g] || E["@@iterator"] || d && E[d], T = !v && S || k(d), j = "Array" == e && E.entries || S;
      if (j && (y = o(j.call(new t)), p !== Object.prototype && y.next && (l || o(y) === p || (a ? a(y, p) : "function" != typeof y[g] && u(y, g, _)), s(y, O, true, true), l && (h[O] = _))), "values" == d && S && "values" !== S.name && (A = true, T = function () {
        return S.call(this);
      }), l && !b || E[g] === T || u(E, g, T), h[e] = T, d) if (w = {values: k("values"), keys: m ? T : k("keys"), entries: k("entries")}, b) for (x in w) (v || A || !(x in E)) && c(E, x, w[x]); else r({target: e, proto: true, forced: v || A}, w);
      return w;
    };
  }, function (t, e, n) {
    "use strict";
    var r = {}.propertyIsEnumerable, i = Object.getOwnPropertyDescriptor, o = i && !r.call({1: 2}, 1);
    e.f = o ? function (t) {
      var e = i(this, t);
      return !!e && e.enumerable;
    } : r;
  }, function (t, e, n) {
    var r = n(4), i = n(93), o = n(43), a = n(9);
    t.exports = function (t, e) {
      for (var n = i(e), s = a.f, u = o.f, c = 0; c < n.length; c++) {
        var f = n[c];
        r(t, f) || s(t, f, u(e, f));
      }
    };
  }, function (t, e, n) {
    var r = n(18), i = n(44), o = n(94), a = n(14);
    t.exports = r("Reflect", "ownKeys") || function (t) {
      var e = i.f(a(t)), n = o.f;
      return n ? e.concat(n(t)) : e;
    };
  }, function (t, e) {
    e.f = Object.getOwnPropertySymbols;
  }, function (t, e, n) {
    var r = n(2), i = /#|\.prototype\./, o = function (t, e) {
      var n = s[a(t)];
      return n == c || n != u && ("function" == typeof e ? r(e) : !!e);
    }, a = o.normalize = function (t) {
      return String(t).replace(i, ".").toLowerCase();
    }, s = o.data = {}, u = o.NATIVE = "N", c = o.POLYFILL = "P";
    t.exports = o;
  }, function (t, e, n) {
    "use strict";
    var r = n(61).IteratorPrototype, i = n(37), o = n(26), a = n(45), s = n(20), u = function () {
      return this;
    };
    t.exports = function (t, e, n) {
      var c = e + " Iterator";
      return t.prototype = i(r, {next: o(1, n)}), a(t, c, false, true), s[c] = u, t;
    };
  }, function (t, e, n) {
    var r = n(2);
    t.exports = !r(function () {
      function t() {}
      return t.prototype.constructor = null, Object.getPrototypeOf(new t) !== t.prototype;
    });
  }, function (t, e, n) {
    var r = n(5);
    t.exports = function (t) {
      if (!r(t) && null !== t) throw TypeError("Can't set " + String(t) + " as a prototype");
      return t;
    };
  }, function (t, e, n) {
    var r = function (t) {
      "use strict";
      var e = Object.prototype, n = e.hasOwnProperty, r = "function" == typeof Symbol ? Symbol : {}, i = r.iterator || "@@iterator", o = r.asyncIterator || "@@asyncIterator", a = r.toStringTag || "@@toStringTag";
      try {
        Object.defineProperty({}, "", {value: n, enumerable: true, configurable: true, writable: true}), {}[""];
      } catch (t) {
        s = function (t, e, n) {
          return t[e] = n;
        };
      }
      function u(t, e, n, r) {
        var i = e && e.prototype instanceof l ? e : l, o = Object.create(i.prototype), a = new k(r || []);
        return o._invoke = function (t, e, n) {
          var r = "suspendedStart";
          return function (i, o) {
            if ("executing" === r) throw new Error("Generator is already running");
            if ("completed" === r) {
              if ("throw" === i) throw o;
              return A();
            }
            for (n.method = i, n.arg = o;;) {
              var a = n.delegate;
              if (a) {
                var s = y(a, n);
                if (s) {
                  if (s === f) continue;
                  return s;
                }
              }
              if ("next" === n.method) n.sent = n._sent = n.arg; else if ("throw" === n.method) {
                if ("suspendedStart" === r) throw r = "completed", n.arg;
                n.dispatchException(n.arg);
              } else "return" === n.method && n.abrupt("return", n.arg);
              r = "executing";
              var u = c(t, e, n);
              if ("normal" === u.type) {
                if (r = n.done ? "completed" : "suspendedYield", u.arg === f) continue;
                return {value: u.arg, done: n.done};
              }
              "throw" === u.type && (r = "completed", n.method = "throw", n.arg = u.arg);
            }
          };
        }(t, n, a), o;
      }
      function c(t, e, n) {
        try {
          return {type: "normal", arg: t.call(e, n)};
        } catch (t) {
          return {type: "throw", arg: t};
        }
      }
      t.wrap = u;
      var f = {};
      function l() {}
      function h() {}
      function d() {}
      var p = {};
      Object.defineProperty(p, i, {value: function () {
        return this;
      }, enumerable: true, configurable: true, writable: true}), p[i];
      var v = Object.getPrototypeOf, g = v && v(v(O([])));
      g && g !== e && n.call(g, i) && (p = g);
      var _ = d.prototype = l.prototype = Object.create(p);
      function m(t) {
        ["next", "throw", "return"].forEach(function (e) {
          Object.defineProperty(t, e, {value: function (t) {
            return this._invoke(e, t);
          }, enumerable: true, configurable: true, writable: true}), t[e];
        });
      }
      function b(t, e) {
        var r;
        this._invoke = function (i, o) {
          function a() {
            return new e(function (r, a) {
              !function r(i, o, a, s) {
                var u = c(t[i], t, o);
                if ("throw" !== u.type) {
                  var f = u.arg, l = f.value;
                  return l && "object" == typeof l && n.call(l, "__await") ? e.resolve(l.__await).then(function (t) {
                    r("next", t, a, s);
                  }, function (t) {
                    r("throw", t, a, s);
                  }) : e.resolve(l).then(function (t) {
                    f.value = t, a(f);
                  }, function (t) {
                    return r("throw", t, a, s);
                  });
                }
                Object.defineProperty(u.arg, e, {value: n, enumerable: true, configurable: true, writable: true}), u.arg[e];
              }(i, o, r, a);
            });
          }
          return r = r ? r.then(a, a) : a();
        };
      }
      function y(t, e) {
        var n = t.iterator[e.method];
        if (void 0 === n) {
          if (e.delegate = null, "throw" === e.method) {
            if (t.iterator.return && (e.method = "return", e.arg = void 0, y(t, e), "throw" === e.method)) return f;
            e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method");
          }
          return f;
        }
        var r = c(n, t.iterator, e.arg);
        if ("throw" === r.type) return e.method = "throw", e.arg = r.arg, e.delegate = null, f;
        var i = r.arg;
        return i ? i.done ? (e[t.resultName] = i.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, f) : i : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f);
      }
      function w(t) {
        var e = {tryLoc: t[0]};
        1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
      }
      function x(t) {
        var e = t.completion || {};
        e.type = "normal", delete e.arg, t.completion = e;
      }
      function k(t) {
        this.tryEntries = [{tryLoc: "root"}], t.forEach(w, this), this.reset(true);
      }
      function O(t) {
        if (t) {
          var e = t[i];
          if (e) return e.call(t);
          if ("function" == typeof t.next) return t;
          if (!isNaN(t.length)) {
            var r = -1, o = function e() {
              for (; ++r < t.length;) if (n.call(t, r)) return e.value = t[r], e.done = false, e;
              return e.value = void 0, e.done = true, e;
            };
            return o.next = o;
          }
        }
        return {next: A};
      }
      function A() {
        return {value: void 0, done: true};
      }
      return h.prototype = d, (Object.defineProperty(_, "constructor", {value: d, enumerable: true, configurable: true, writable: true}), _.constructor), (Object.defineProperty(d, "constructor", {value: h, enumerable: true, configurable: true, writable: true}), d.constructor), h.displayName = (Object.defineProperty(d, a, {value: "GeneratorFunction", enumerable: true, configurable: true, writable: true}), d[a]), t.isGeneratorFunction = function (t) {
        var e = "function" == typeof t && t.constructor;
        return !!e && (e === h || "GeneratorFunction" === (e.displayName || e.name));
      }, t.mark = function (t) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(t, d) : (t.__proto__ = d, (Object.defineProperty(t, a, {value: "GeneratorFunction", enumerable: true, configurable: true, writable: true}), t[a])), t.prototype = Object.create(_), t;
      }, t.awrap = function (t) {
        return {__await: t};
      }, m(b.prototype), (Object.defineProperty(b.prototype, o, {value: function () {
        return this;
      }, enumerable: true, configurable: true, writable: true}), b.prototype[o]), t.AsyncIterator = b, t.async = function (e, n, r, i, o) {
        void 0 === o && (o = Promise);
        var a = new b(u(e, n, r, i), o);
        return t.isGeneratorFunction(n) ? a : a.next().then(function (t) {
          return t.done ? t.value : a.next();
        });
      }, m(_), (Object.defineProperty(_, a, {value: "Generator", enumerable: true, configurable: true, writable: true}), _[a]), (Object.defineProperty(_, i, {value: function () {
        return this;
      }, enumerable: true, configurable: true, writable: true}), _[i]), (Object.defineProperty(_, "toString", {value: function () {
        return "[object Generator]";
      }, enumerable: true, configurable: true, writable: true}), _.toString), t.keys = function (t) {
        var e = [];
        for (var n in t) e.push(n);
        return e.reverse(), function n() {
          for (; e.length;) {
            var r = e.pop();
            if (r in t) return n.value = r, n.done = false, n;
          }
          return n.done = true, n;
        };
      }, t.values = O, k.prototype = {constructor: k, reset: function (t) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = false, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(x), !t) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
      }, stop: function () {
        this.done = true;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      }, dispatchException: function (t) {
        if (this.done) throw t;
        var e = this;
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var o = this.tryEntries[i], a = o.completion;
          if ("root" === o.tryLoc) return a.type = "throw", a.arg = t, e.next = "end", r && (e.method = "next", e.arg = void 0), !!r;
          if (o.tryLoc <= this.prev) {
            var s = n.call(o, "catchLoc"), u = n.call(o, "finallyLoc");
            if (s && u) {
              if (this.prev < o.catchLoc) return a.type = "throw", a.arg = t, e.next = o.catchLoc, true && (e.method = "next", e.arg = void 0), !!true;
              if (this.prev < o.finallyLoc) return a.type = "throw", a.arg = t, e.next = o.finallyLoc, r && (e.method = "next", e.arg = void 0), !!r;
            } else if (s) {
              if (this.prev < o.catchLoc) return a.type = "throw", a.arg = t, e.next = o.catchLoc, true && (e.method = "next", e.arg = void 0), !!true;
            } else {
              if (!u) throw new Error("try statement without catch or finally");
              if (this.prev < o.finallyLoc) return a.type = "throw", a.arg = t, e.next = o.finallyLoc, r && (e.method = "next", e.arg = void 0), !!r;
            }
          }
        }
      }, abrupt: function (t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var i = this.tryEntries[r];
          if (i.tryLoc <= this.prev && n.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
            var o = i;
            break;
          }
        }
        o && ("break" === t || "continue" === t) && o.tryLoc <= e && e <= o.finallyLoc && (o = null);
        var a = o ? o.completion : {};
        return a.type = t, a.arg = e, o ? (this.method = "next", this.next = o.finallyLoc, f) : this.complete(a);
      }, complete: function (t, e) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), f;
      }, finish: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var n = this.tryEntries[e];
          if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), x(n), f;
        }
      }, catch: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var n = this.tryEntries[e];
          if (n.tryLoc === t) {
            var r = n.completion;
            if ("throw" === r.type) {
              var i = r.arg;
              x(n);
            }
            return i;
          }
        }
        throw new Error("illegal catch attempt");
      }, delegateYield: function (t, e, n) {
        return this.delegate = {iterator: O(t), resultName: e, nextLoc: n}, "next" === this.method && (this.arg = void 0), f;
      }}, t;
    }(t.exports);
    try {
      regeneratorRuntime = r;
    } catch (t) {
      "object" == typeof globalThis ? globalThis.regeneratorRuntime = r : Function("r", "regeneratorRuntime = r")(r);
    }
  }, function (t, e, n) {
    "use strict";
    n(16), Object.defineProperty(e, "__esModule", {value: true}), e.batchGeometry = void 0;
    const r = n(46), i = {positions: 3, normals: 3, weights: 4, boneIndices: 4, uvs: 2, tangents: 4};
    e.batchGeometry = function (t) {
      const e = t.geometry, n = new Map;
      e.forEach(t => {
        t.primitives.forEach(t => {
          const e = function (t) {
            const e = [];
            for (const n in i) t.attributes[n] && e.push(n);
            return e.join("|");
          }(t), r = n.get(e) || [];
          r.push(t), n.set(e, r);
        });
      });
      let o = [];
      n.forEach((t, e) => {
        const n = function (t, e) {
          const n = [];
          let r = {indexSize: 0, size: 0, primitives: [], sigMap: e};
          return n.push(r), t.forEach(t => {
            if (!t.indices) throw new Error("can only merge geometry with indices for now..");
            const i = t.attributes.positions.length / 3;
            r.indexSize + i > 65535 && (r = {indexSize: 0, size: 0, primitives: [], sigMap: e}, n.push(r)), r.indexSize += i, r.size += t.indices.length, r.primitives.push(t);
          }), n;
        }(t, e).filter(t => t.primitives.length > 1);
        o = o.concat(n);
      });
      const a = [];
      o.forEach(t => {
        const n = function (t) {
          let e = 0;
          const n = t.primitives.map(t => {
            const n = {bounds: t.bounds, start: e, size: t.indices.length, material: t.material, geometry: -1};
            return e += t.indices.length, n;
          });
          return {primitive: r.mergePrimitives(t.primitives), primitives: t.primitives, frags: n};
        }(t);
        a.push(n.primitive), e.forEach(t => {
          t.primitives.forEach((e, r) => {
            const i = n.primitives.indexOf(e);
            -1 !== i && (n.frags[i].geometry = a.length - 1, t.primitives[r] = n.frags[i]);
          });
        });
      }), t.geometryBatch = a;
    };
  }, function (t, e, n) {
    var r = n(28);
    t.exports = function (t, e, n) {
      for (var i in e) r(t, i, e[i], n);
      return t;
    };
  }, function (t, e) {
    var n = Math.abs, r = Math.pow, i = Math.floor, o = Math.log, a = Math.LN2;
    t.exports = {pack: function (t, e, s) {
      var u, c, f, l = new Array(s), h = 8 * s - e - 1, d = (1 << h) - 1, p = d >> 1, v = 23 === e ? r(2, -24) - r(2, -77) : 0, g = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0, _ = 0;
      for ((t = n(t)) != t || t === Infinity ? (c = t != t ? 1 : 0, u = d) : (u = i(o(t) / a), t * (f = r(2, -u)) < 1 && (u--, f *= 2), (t += u + p >= 1 ? v / f : v * r(2, 1 - p)) * f >= 2 && (u++, f /= 2), u + p >= d ? (c = 0, u = d) : u + p >= 1 ? (c = (t * f - 1) * r(2, e), u += p) : (c = t * r(2, p - 1) * r(2, e), u = 0)); e >= 8; l[_++] = 255 & c, c /= 256, e -= 8) ;
      for (u = u << e | c, h += e; h > 0; l[_++] = 255 & u, u /= 256, h -= 8) ;
      return l[--_] |= 128 * g, l;
    }, unpack: function (t, e) {
      var n, i = t.length, o = 8 * i - e - 1, a = (1 << o) - 1, s = a >> 1, u = o - 7, c = i - 1, f = t[c--], l = 127 & f;
      for (f >>= 7; u > 0; l = 256 * l + t[c], c--, u -= 8) ;
      for (n = l & (1 << -u) - 1, l >>= -u, u += e; u > 0; n = 256 * n + t[c], c--, u -= 8) ;
      if (0 === l) l = 1 - s; else {
        if (l === a) return n ? NaN : f ? -Infinity : Infinity;
        n += r(2, e), l -= s;
      }
      return (f ? -1 : 1) * n * r(2, l - e);
    }};
  }, function (t, e, n) {
    "use strict";
    var r = n(17), i = n(39), o = n(10);
    t.exports = function (t) {
      for (var e = r(this), n = o(e.length), a = arguments.length, s = i(a > 1 ? arguments[1] : void 0, n), u = a > 2 ? arguments[2] : void 0, c = void 0 === u ? n : i(u, n); c > s;) e[s++] = t;
      return e;
    };
  }, function (t, e, n) {
    var r = n(14), i = n(47), o = n(1)("species");
    t.exports = function (t, e) {
      var n, a = r(t).constructor;
      return void 0 === a || null == (n = r(a)[o]) ? e : i(n);
    };
  }, function (t, e, n) {
    var r = n(0), i = n(2), o = n(106), a = n(30).NATIVE_ARRAY_BUFFER_VIEWS, s = r.ArrayBuffer, u = r.Int8Array;
    t.exports = !a || !i(function () {
      u(1);
    }) || !i(function () {
      new u(-1);
    }) || !o(function (t) {
      new u, new u(null), new u(1.5), new u(t);
    }, true) || i(function () {
      return 1 !== new u(new s(2), 1, void 0).length;
    });
  }, function (t, e, n) {
    var r = n(1)("iterator"), i = false;
    try {
      var o = 0, a = {next: function () {
        return {done: !!o++};
      }, return: function () {
        i = true;
      }};
      a[r] = function () {
        return this;
      }, Array.from(a, function () {
        throw 2;
      });
    } catch (t) {}
    t.exports = function (t, e) {
      if (!e && !i) return false;
      var n = false;
      try {
        var o = {};
        o[r] = function () {
          return {next: function () {
            return {done: n = true};
          }};
        }, t(o);
      } catch (t) {}
      return n;
    };
  }, function (t, e, n) {
    var r = {};
    r[n(1)("toStringTag")] = "z", t.exports = "[object z]" === String(r);
  }, function (t, e, n) {
    var r = n(5), i = Math.floor;
    t.exports = function (t) {
      return !r(t) && isFinite(t) && i(t) === t;
    };
  }, function (t, e, n) {
    var r = n(110);
    t.exports = function (t, e) {
      var n = r(t);
      if (n % e) throw RangeError("Wrong offset");
      return n;
    };
  }, function (t, e, n) {
    var r = n(19);
    t.exports = function (t) {
      var e = r(t);
      if (e < 0) throw RangeError("The argument can't be less than 0");
      return e;
    };
  }, function (t, e, n) {
    var r = n(17), i = n(10), o = n(112), a = n(113), s = n(66), u = n(30).aTypedArrayConstructor;
    t.exports = function (t) {
      var e, n, c, f, l, h, d = r(t), p = arguments.length, v = p > 1 ? arguments[1] : void 0, g = void 0 !== v, _ = o(d);
      if (null != _ && !a(_)) for (h = (l = _.call(d)).next, d = []; !(f = h.call(l)).done;) d.push(f.value);
      for (g && p > 2 && (v = s(v, arguments[2], 2)), n = i(d.length), c = new (u(this))(n), e = 0; n > e; e++) c[e] = g ? v(d[e], e) : d[e];
      return c;
    };
  }, function (t, e, n) {
    var r = n(48), i = n(20), o = n(1)("iterator");
    t.exports = function (t) {
      if (null != t) return t[o] || t["@@iterator"] || i[r(t)];
    };
  }, function (t, e, n) {
    var r = n(1), i = n(20), o = r("iterator"), a = Array.prototype;
    t.exports = function (t) {
      return void 0 !== t && (i.Array === t || a[o] === t);
    };
  }, function (t, e, n) {
    var r = n(66), i = n(52), o = n(17), a = n(10), s = n(115), u = [].push, c = function (t) {
      var e = 1 == t, n = 2 == t, c = 3 == t, f = 4 == t, l = 6 == t, h = 7 == t, d = 5 == t || l;
      return function (p, v, g, _) {
        for (var m, b, y = o(p), w = i(y), x = r(v, g, 3), k = a(w.length), O = 0, A = _ || s, E = e ? A(p, k) : n || h ? A(p, 0) : void 0; k > O; O++) if ((d || O in w) && (b = x(m = w[O], O, y), t)) if (e) E[O] = b; else if (b) switch (t) {
          case 3:
            return true;
          case 5:
            return m;
          case 6:
            return O;
          case 2:
            u.call(E, m);
        } else switch (t) {
          case 4:
            return false;
          case 7:
            u.call(E, m);
        }
        return l ? -1 : c || f ? f : E;
      };
    };
    t.exports = {forEach: c(0), map: c(1), filter: c(2), some: c(3), every: c(4), find: c(5), findIndex: c(6), filterReject: c(7)};
  }, function (t, e, n) {
    var r = n(116);
    t.exports = function (t, e) {
      return new (r(t))(0 === e ? 0 : e);
    };
  }, function (t, e, n) {
    var r = n(5), i = n(117), o = n(1)("species");
    t.exports = function (t) {
      var e;
      return i(t) && ("function" != typeof (e = t.constructor) || e !== Array && !i(e.prototype) ? r(e) && null === (e = e[o]) && (e = void 0) : e = void 0), void 0 === e ? Array : e;
    };
  }, function (t, e, n) {
    var r = n(31);
    t.exports = Array.isArray || function (t) {
      return "Array" == r(t);
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(18), i = n(9), o = n(1), a = n(8), s = o("species");
    t.exports = function (t) {
      var e = r(t), n = i.f;
      a && e && !e[s] && n(e, s, {configurable: true, get: function () {
        return this;
      }});
    };
  }, function (t, e, n) {
    var r = n(5), i = n(21);
    t.exports = function (t, e, n) {
      var o, a;
      return i && "function" == typeof (o = e.constructor) && o !== n && r(a = o.prototype) && a !== n.prototype && i(t, a), t;
    };
  }, function (t, e) {
    var n = Math.floor, r = function (t, e) {
      var a = t.length, s = n(a / 2);
      return a < 8 ? i(t, e) : o(r(t.slice(0, s), e), r(t.slice(s), e), e);
    }, i = function (t, e) {
      for (var n, r, i = t.length, o = 1; o < i;) {
        for (r = o, n = t[o]; r && e(t[r - 1], n) > 0;) t[r] = t[--r];
        r !== o++ && (t[r] = n);
      }
      return t;
    }, o = function (t, e, n) {
      for (var r = t.length, i = e.length, o = 0, a = 0, s = []; o < r || a < i;) o < r && a < i ? s.push(n(t[o], e[a]) <= 0 ? t[o++] : e[a++]) : s.push(o < r ? t[o++] : e[a++]);
      return s;
    };
    t.exports = r;
  }, function (t, e, n) {
    var r = n(23).match(/firefox\/(\d+)/i);
    t.exports = !!r && +r[1];
  }, function (t, e, n) {
    var r = n(23);
    t.exports = /MSIE|Trident/.test(r);
  }, function (t, e, n) {
    var r = n(23).match(/AppleWebKit\/(\d+)\./);
    t.exports = !!r && +r[1];
  }, function (t, e, n) {
    "use strict";
    n(16), n(3), n(7), n(6), n(12), n(67), Object.defineProperty(e, "__esModule", {value: true}), e.compressGBObject = void 0;
    const r = n(68), i = n(69);
    e.compressGBObject = function (t) {
      var e, n, o, a, s;
      const u = [], c = {s: 3, t: 3, r: 4, w: 1};
      null === (e = t.animations) || void 0 === e || e.forEach(t => {
        t.data.forEach(t => {
          for (const e in c) t[e] && (u.push({compress: true, size: 1, buffer: t[e].times}), t[e].times = u.length - 1, u.push({compress: true, size: c[e], buffer: t[e].values}), t[e].values = u.length - 1);
        });
      });
      const f = {positions: 3, normals: 3, weights: 4, boneIndices: 4, uvs: 2, indices: 1, tangents: 4}, l = {positions: true, normals: true, weights: true, boneIndices: true, uvs: true, tangents: true};
      function h(t) {
        for (const e in f) t.attributes[e] && (u.push({compress: l[e], size: f[e], buffer: t.attributes[e]}), t.attributes[e] = u.length - 1);
        t.indices && (u.push({compress: true, size: 1, buffer: t.indices}), t.indices = u.length - 1), t.targets && t.targets.forEach(t => {
          for (const e in f) t[e] && (u.push({compress: l[e], size: f[e], buffer: t[e]}), t[e] = u.length - 1);
        });
      }
      return null === (n = t.geometryBatch) || void 0 === n || n.forEach(t => {
        h(t);
      }), null === (o = t.geometry) || void 0 === o || o.forEach(t => {
        t.primitives.forEach(t => {
          t.attributes && h(t);
        });
      }), null === (a = t.nodes) || void 0 === a || a.forEach(t => {
        t.inverseBindMatrix && (t.inverseBindMatrix ? (u.push({compress: false, size: 1, buffer: t.inverseBindMatrix}), t.inverseBindMatrix = u.length - 1) : t.inverseBindMatrix = -1), t.transform && (t.transform ? (u.push({compress: false, size: 1, buffer: t.transform}), t.transform = u.length - 1) : t.transform = -1);
      }), null === (s = t.skins) || void 0 === s || s.forEach(t => {
        t.bindMatrix ? (u.push({compress: false, size: 1, buffer: t.bindMatrix}), t.bindMatrix = u.length - 1) : t.bindMatrix = -1;
      }), function (t, e) {
        const n = {UINT16: 0, FLOAT32: 1, STRING: 2, FLOAT32_COMPRESSED: 3, UINT16_COMPRESSED: 4}, o = JSON.stringify(t);
        let a = 2 * o.length + 4 + 4;
        a % 4 && (a += a % 4);
        e.forEach(t => {
          const e = t.buffer.slice(0);
          t.compress && (e instanceof Float32Array ? t.compressed = r.compressArray(e, t.size || 1) : t.compressed = e, t.compressed = i.zipArray(t.compressed));
        });
        let s = e.reduce((t, e) => {
          if (t += 8, e.compressed) {
            const n = e.compressed.buffer.byteLength;
            t += n + (4 - n % 4);
          } else t += e.buffer.buffer.byteLength;
          return t;
        }, a);
        s += 4 - s % 4;
        const u = new ArrayBuffer(s), c = new Float32Array(u), f = new Uint16Array(u), l = new Uint8Array(u);
        let h = 0;
        c[h++] = o.length, c[h++] = n.STRING;
        const d = o.length;
        for (let t = 0; t < d; t++) f[2 * h] = o.charCodeAt(t), h += .5;
        h % 1 != 0 && (h += .5);
        return e.forEach(t => {
          const e = t.buffer;
          if (e instanceof Uint16Array) if (t.compressed) {
            c[h++] = t.compressed.length, c[h++] = n.UINT16_COMPRESSED;
            const e = t.compressed;
            for (let t = 0; t < e.length; t++) l[4 * h] = e[t], h += .25;
            h += 1 - h % 1;
          } else {
            c[h++] = e.length, c[h++] = n.UINT16;
            for (let t = 0; t < e.length; t++) f[2 * h] = e[t], h += .5;
            h += h % 1;
          } else if (e instanceof Float32Array) if (t.compressed) {
            c[h++] = t.compressed.length, c[h++] = n.FLOAT32_COMPRESSED;
            const e = t.compressed;
            for (let t = 0; t < e.length; t++) l[4 * h] = e[t], h += .25;
            h += 1 - h % 1;
          } else {
            c[h++] = e.length, c[h++] = n.FLOAT32;
            for (let t = 0; t < e.length; t++) c[h++] = e[t];
          }
        }), u;
      }(t, u);
    };
  }, function (t, e, n) {
    "use strict";
    var r = {};
    (0, n(13).assign)(r, n(126), n(129), n(74)), t.exports = r;
  }, function (t, e, n) {
    "use strict";
    var r = n(127), i = n(13), o = n(72), a = n(50), s = n(73), u = Object.prototype.toString;
    function c(t) {
      if (!(this instanceof c)) return new c(t);
      this.options = i.assign({level: -1, method: 8, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: 0, to: ""}, t || {});
      var e = this.options;
      e.raw && e.windowBits > 0 ? e.windowBits = -e.windowBits : e.gzip && e.windowBits > 0 && e.windowBits < 16 && (e.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new s, this.strm.avail_out = 0;
      var n = r.deflateInit2(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy);
      if (0 !== n) throw new Error(a[n]);
      if (e.header && r.deflateSetHeader(this.strm, e.header), e.dictionary) {
        var f;
        if (f = "string" == typeof e.dictionary ? o.string2buf(e.dictionary) : "[object ArrayBuffer]" === u.call(e.dictionary) ? new Uint8Array(e.dictionary) : e.dictionary, 0 !== (n = r.deflateSetDictionary(this.strm, f))) throw new Error(a[n]);
        this._dict_set = true;
      }
    }
    function f(t, e) {
      var n = new c(e);
      if (n.push(t, true), n.err) throw n.msg || a[n.err];
      return n.result;
    }
    c.prototype.push = function (t, e) {
      var n, a, s = this.strm, c = this.options.chunkSize;
      if (this.ended) return false;
      a = e === ~~e ? e : true === e ? 4 : 0, "string" == typeof t ? s.input = o.string2buf(t) : "[object ArrayBuffer]" === u.call(t) ? s.input = new Uint8Array(t) : s.input = t, s.next_in = 0, s.avail_in = s.input.length;
      do {
        if (0 === s.avail_out && (s.output = new i.Buf8(c), s.next_out = 0, s.avail_out = c), 1 !== (n = r.deflate(s, a)) && 0 !== n) return this.onEnd(n), this.ended = true, false;
        0 !== s.avail_out && (0 !== s.avail_in || 4 !== a && 2 !== a) || ("string" === this.options.to ? this.onData(o.buf2binstring(i.shrinkBuf(s.output, s.next_out))) : this.onData(i.shrinkBuf(s.output, s.next_out)));
      } while ((s.avail_in > 0 || 0 === s.avail_out) && 1 !== n);
      return 4 === a ? (n = r.deflateEnd(this.strm), this.onEnd(n), this.ended = true, 0 === n) : 2 !== a || (this.onEnd(0), s.avail_out = 0, true);
    }, c.prototype.onData = function (t) {
      this.chunks.push(t);
    }, c.prototype.onEnd = function (t) {
      0 === t && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = i.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
    }, e.Deflate = c, e.deflate = f, e.deflateRaw = function (t, e) {
      return (e = e || {}).raw = true, f(t, e);
    }, e.gzip = function (t, e) {
      return (e = e || {}).gzip = true, f(t, e);
    };
  }, function (t, e, n) {
    "use strict";
    var r, i = n(13), o = n(128), a = n(70), s = n(71), u = n(50);
    function l(t) {
      for (var e = t.length; --e >= 0;) t[e] = 0;
    }
    function h(t) {
      var e = t.state, n = e.pending;
      n > t.avail_out && (n = t.avail_out), 0 !== n && (i.arraySet(t.output, e.pending_buf, e.pending_out, n, t.next_out), t.next_out += n, e.pending_out += n, t.total_out += n, t.avail_out -= n, e.pending -= n, 0 === e.pending && (e.pending_out = 0));
    }
    function d(t, e) {
      o._tr_flush_block(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, e), t.block_start = t.strstart, h(t.strm);
    }
    function p(t, e) {
      t.pending_buf[t.pending++] = e;
    }
    function v(t, e) {
      t.pending_buf[t.pending++] = e >>> 8 & 255, t.pending_buf[t.pending++] = 255 & e;
    }
    function g(t, e) {
      var n, r, i = t.max_chain_length, o = t.strstart, a = t.prev_length, s = t.nice_match, u = t.strstart > t.w_size - 262 ? t.strstart - (t.w_size - 262) : 0, c = t.window, f = t.w_mask, l = t.prev, h = t.strstart + 258, d = c[o + a - 1], p = c[o + a];
      t.prev_length >= t.good_match && (i >>= 2), s > t.lookahead && (s = t.lookahead);
      do {
        if (c[(n = e) + a] === p && c[n + a - 1] === d && c[n] === c[o] && c[++n] === c[o + 1]) {
          o += 2, n++;
          do {} while (c[++o] === c[++n] && c[++o] === c[++n] && c[++o] === c[++n] && c[++o] === c[++n] && c[++o] === c[++n] && c[++o] === c[++n] && c[++o] === c[++n] && c[++o] === c[++n] && o < h);
          if (r = 258 - (h - o), o = h - 258, r > a) {
            if (t.match_start = e, a = r, r >= s) break;
            d = c[o + a - 1], p = c[o + a];
          }
        }
      } while ((e = l[e & f]) > u && 0 != --i);
      return a <= t.lookahead ? a : t.lookahead;
    }
    function _(t) {
      var e, n, r, o, u, c, f, l, h, d, p = t.w_size;
      do {
        if (o = t.window_size - t.lookahead - t.strstart, t.strstart >= p + (p - 262)) {
          i.arraySet(t.window, t.window, p, p, 0), t.match_start -= p, t.strstart -= p, t.block_start -= p, e = n = t.hash_size;
          do {
            r = t.head[--e], t.head[e] = r >= p ? r - p : 0;
          } while (--n);
          e = n = p;
          do {
            r = t.prev[--e], t.prev[e] = r >= p ? r - p : 0;
          } while (--n);
          o += p;
        }
        if (0 === t.strm.avail_in) break;
        if (c = t.strm, f = t.window, l = t.strstart + t.lookahead, h = o, d = void 0, (d = c.avail_in) > h && (d = h), n = 0 === d ? 0 : (c.avail_in -= d, i.arraySet(f, c.input, c.next_in, d, l), 1 === c.state.wrap ? c.adler = a(c.adler, f, d, l) : 2 === c.state.wrap && (c.adler = s(c.adler, f, d, l)), c.next_in += d, c.total_in += d, d), t.lookahead += n, t.lookahead + t.insert >= 3) for (u = t.strstart - t.insert, t.ins_h = t.window[u], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[u + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[u + 3 - 1]) & t.hash_mask, t.prev[u & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = u, u++, t.insert--, !(t.lookahead + t.insert < 3));) ;
      } while (t.lookahead < 262 && 0 !== t.strm.avail_in);
    }
    function m(t, e) {
      for (var n, r;;) {
        if (t.lookahead < 262) {
          if (_(t), t.lookahead < 262 && 0 === e) return 1;
          if (0 === t.lookahead) break;
        }
        if (n = 0, t.lookahead >= 3 && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 3 - 1]) & t.hash_mask, n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 0 !== n && t.strstart - n <= t.w_size - 262 && (t.match_length = g(t, n)), t.match_length >= 3) if (r = o._tr_tally(t, t.strstart - t.match_start, t.match_length - 3), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= 3) {
          t.match_length--;
          do {
            t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 3 - 1]) & t.hash_mask, n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart;
          } while (0 != --t.match_length);
          t.strstart++;
        } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask; else r = o._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
        if (r && (d(t, false), 0 === t.strm.avail_out)) return 1;
      }
      return t.insert = t.strstart < 2 ? t.strstart : 2, 4 === e ? (d(t, true), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (d(t, false), 0 === t.strm.avail_out) ? 1 : 2;
    }
    function b(t, e) {
      for (var n, r, i;;) {
        if (t.lookahead < 262) {
          if (_(t), t.lookahead < 262 && 0 === e) return 1;
          if (0 === t.lookahead) break;
        }
        if (n = 0, t.lookahead >= 3 && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 3 - 1]) & t.hash_mask, n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = 2, 0 !== n && t.prev_length < t.max_lazy_match && t.strstart - n <= t.w_size - 262 && (t.match_length = g(t, n), t.match_length <= 5 && (1 === t.strategy || 3 === t.match_length && t.strstart - t.match_start > 4096) && (t.match_length = 2)), t.prev_length >= 3 && t.match_length <= t.prev_length) {
          i = t.strstart + t.lookahead - 3, r = o._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - 3), t.lookahead -= t.prev_length - 1, t.prev_length -= 2;
          do {
            ++t.strstart <= i && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 3 - 1]) & t.hash_mask, n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart);
          } while (0 != --t.prev_length);
          if (t.match_available = 0, t.match_length = 2, t.strstart++, r && (d(t, false), 0 === t.strm.avail_out)) return 1;
        } else if (t.match_available) {
          if ((r = o._tr_tally(t, 0, t.window[t.strstart - 1])) && d(t, false), t.strstart++, t.lookahead--, 0 === t.strm.avail_out) return 1;
        } else t.match_available = 1, t.strstart++, t.lookahead--;
      }
      return t.match_available && (r = o._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < 2 ? t.strstart : 2, 4 === e ? (d(t, true), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (d(t, false), 0 === t.strm.avail_out) ? 1 : 2;
    }
    function y(t, e, n, r, i) {
      this.good_length = t, this.max_lazy = e, this.nice_length = n, this.max_chain = r, this.func = i;
    }
    function w() {
      this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = 8, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new i.Buf16(1146), this.dyn_dtree = new i.Buf16(122), this.bl_tree = new i.Buf16(78), l(this.dyn_ltree), l(this.dyn_dtree), l(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new i.Buf16(16), this.heap = new i.Buf16(573), l(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new i.Buf16(573), l(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
    }
    function x(t) {
      var e;
      return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = 2, (e = t.state).pending = 0, e.pending_out = 0, e.wrap < 0 && (e.wrap = -e.wrap), e.status = e.wrap ? 42 : 113, t.adler = 2 === e.wrap ? 0 : 1, e.last_flush = 0, o._tr_init(e), 0) : (t.msg = u[-2], -2);
    }
    function k(t) {
      var e, n = x(t);
      return 0 === n && ((e = t.state).window_size = 2 * e.w_size, l(e.head), e.max_lazy_match = r[e.level].max_lazy, e.good_match = r[e.level].good_length, e.nice_match = r[e.level].nice_length, e.max_chain_length = r[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = 2, e.match_available = 0, e.ins_h = 0), n;
    }
    function O(t, e, n, r, o, a) {
      if (!t) return -2;
      var s = 1;
      if (-1 === e && (e = 6), r < 0 ? (s = 0, r = -r) : r > 15 && (s = 2, r -= 16), o < 1 || o > 9 || 8 !== n || r < 8 || r > 15 || e < 0 || e > 9 || a < 0 || a > 4) return t.msg = u[-2], -2;
      8 === r && (r = 9);
      var u = new w;
      return t.state = u, u.strm = t, u.wrap = s, u.gzhead = null, u.w_bits = r, u.w_size = 1 << u.w_bits, u.w_mask = u.w_size - 1, u.hash_bits = o + 7, u.hash_size = 1 << u.hash_bits, u.hash_mask = u.hash_size - 1, u.hash_shift = ~~((u.hash_bits + 3 - 1) / 3), u.window = new i.Buf8(2 * u.w_size), u.head = new i.Buf16(u.hash_size), u.prev = new i.Buf16(u.w_size), u.lit_bufsize = 1 << o + 6, u.pending_buf_size = 4 * u.lit_bufsize, u.pending_buf = new i.Buf8(u.pending_buf_size), u.d_buf = 1 * u.lit_bufsize, u.l_buf = 3 * u.lit_bufsize, u.level = e, u.strategy = a, u.method = n, k(t);
    }
    r = [new y(0, 0, 0, 0, function (t, e) {
      var n = 65535;
      for (n > t.pending_buf_size - 5 && (n = t.pending_buf_size - 5);;) {
        if (t.lookahead <= 1) {
          if (_(t), 0 === t.lookahead && 0 === e) return 1;
          if (0 === t.lookahead) break;
        }
        t.strstart += t.lookahead, t.lookahead = 0;
        var r = t.block_start + n;
        if ((0 === t.strstart || t.strstart >= r) && (t.lookahead = t.strstart - r, t.strstart = r, d(t, false), 0 === t.strm.avail_out)) return 1;
        if (t.strstart - t.block_start >= t.w_size - 262 && (d(t, false), 0 === t.strm.avail_out)) return 1;
      }
      return t.insert = 0, 4 === e ? (d(t, true), 0 === t.strm.avail_out ? 3 : 4) : (t.strstart > t.block_start && (d(t, false), t.strm.avail_out), 1);
    }), new y(4, 4, 8, 4, m), new y(4, 5, 16, 8, m), new y(4, 6, 32, 32, m), new y(4, 4, 16, 16, b), new y(8, 16, 32, 32, b), new y(8, 16, 128, 128, b), new y(8, 32, 128, 256, b), new y(32, 128, 258, 1024, b), new y(32, 258, 258, 4096, b)], e.deflateInit = function (t, e) {
      return O(t, e, 8, 15, 8, 0);
    }, e.deflateInit2 = O, e.deflateReset = k, e.deflateResetKeep = x, e.deflateSetHeader = function (t, e) {
      return t && t.state ? 2 !== t.state.wrap ? -2 : (t.state.gzhead = e, 0) : -2;
    }, e.deflate = function (t, e) {
      var n, i, a, u;
      if (!t || !t.state || e > 5 || e < 0) return t ? (t.msg = u[-2], -2) : -2;
      if (i = t.state, !t.output || !t.input && 0 !== t.avail_in || 666 === i.status && 4 !== e) return t.msg = u[0 === t.avail_out ? -5 : -2], 0 === t.avail_out ? -5 : -2;
      if (i.strm = t, n = i.last_flush, i.last_flush = e, 42 === i.status) if (2 === i.wrap) t.adler = 0, p(i, 31), p(i, 139), p(i, 8), i.gzhead ? (p(i, (i.gzhead.text ? 1 : 0) + (i.gzhead.hcrc ? 2 : 0) + (i.gzhead.extra ? 4 : 0) + (i.gzhead.name ? 8 : 0) + (i.gzhead.comment ? 16 : 0)), p(i, 255 & i.gzhead.time), p(i, i.gzhead.time >> 8 & 255), p(i, i.gzhead.time >> 16 & 255), p(i, i.gzhead.time >> 24 & 255), p(i, 9 === i.level ? 2 : i.strategy >= 2 || i.level < 2 ? 4 : 0), p(i, 255 & i.gzhead.os), i.gzhead.extra && i.gzhead.extra.length && (p(i, 255 & i.gzhead.extra.length), p(i, i.gzhead.extra.length >> 8 & 255)), i.gzhead.hcrc && (t.adler = s(t.adler, i.pending_buf, i.pending, 0)), i.gzindex = 0, i.status = 69) : (p(i, 0), p(i, 0), p(i, 0), p(i, 0), p(i, 0), p(i, 9 === i.level ? 2 : i.strategy >= 2 || i.level < 2 ? 4 : 0), p(i, 3), i.status = 113); else {
        var g = 8 + (i.w_bits - 8 << 4) << 8;
        g |= (i.strategy >= 2 || i.level < 2 ? 0 : i.level < 6 ? 1 : 6 === i.level ? 2 : 3) << 6, 0 !== i.strstart && (g |= 32), g += 31 - g % 31, i.status = 113, v(i, g), 0 !== i.strstart && (v(i, t.adler >>> 16), v(i, 65535 & t.adler)), t.adler = 1;
      }
      if (69 === i.status) if (i.gzhead.extra) {
        for (a = i.pending; i.gzindex < (65535 & i.gzhead.extra.length) && (i.pending !== i.pending_buf_size || (i.gzhead.hcrc && i.pending > a && (t.adler = s(t.adler, i.pending_buf, i.pending - a, a)), h(t), a = i.pending, i.pending !== i.pending_buf_size));) p(i, 255 & i.gzhead.extra[i.gzindex]), i.gzindex++;
        i.gzhead.hcrc && i.pending > a && (t.adler = s(t.adler, i.pending_buf, i.pending - a, a)), i.gzindex === i.gzhead.extra.length && (i.gzindex = 0, i.status = 73);
      } else i.status = 73;
      if (73 === i.status) if (i.gzhead.name) {
        a = i.pending;
        do {
          if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > a && (t.adler = s(t.adler, i.pending_buf, i.pending - a, a)), h(t), a = i.pending, i.pending === i.pending_buf_size)) {
            u = 1;
            break;
          }
          u = i.gzindex < i.gzhead.name.length ? 255 & i.gzhead.name.charCodeAt(i.gzindex++) : 0, p(i, u);
        } while (0 !== u);
        i.gzhead.hcrc && i.pending > a && (t.adler = s(t.adler, i.pending_buf, i.pending - a, a)), 0 === u && (i.gzindex = 0, i.status = 91);
      } else i.status = 91;
      if (91 === i.status) if (i.gzhead.comment) {
        a = i.pending;
        do {
          if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > a && (t.adler = s(t.adler, i.pending_buf, i.pending - a, a)), h(t), a = i.pending, i.pending === i.pending_buf_size)) {
            u = 1;
            break;
          }
          u = i.gzindex < i.gzhead.comment.length ? 255 & i.gzhead.comment.charCodeAt(i.gzindex++) : 0, p(i, u);
        } while (0 !== u);
        i.gzhead.hcrc && i.pending > a && (t.adler = s(t.adler, i.pending_buf, i.pending - a, a)), 0 === u && (i.status = 103);
      } else i.status = 103;
      if (103 === i.status && (i.gzhead.hcrc ? (i.pending + 2 > i.pending_buf_size && h(t), i.pending + 2 <= i.pending_buf_size && (p(i, 255 & t.adler), p(i, t.adler >> 8 & 255), t.adler = 0, i.status = 113)) : i.status = 113), 0 !== i.pending) {
        if (h(t), 0 === t.avail_out) return i.last_flush = -1, 0;
      } else if (0 === t.avail_in && (e << 1) - (e > 4 ? 9 : 0) <= (n << 1) - (n > 4 ? 9 : 0) && 4 !== e) return t.msg = u[-5], -5;
      if (666 === i.status && 0 !== t.avail_in) return t.msg = u[-5], -5;
      if (0 !== t.avail_in || 0 !== i.lookahead || 0 !== e && 666 !== i.status) {
        var m = 2 === i.strategy ? function (t, e) {
          for (var n;;) {
            if (0 === t.lookahead && (_(t), 0 === t.lookahead)) {
              if (0 === e) return 1;
              break;
            }
            if (t.match_length = 0, n = o._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, n && (d(t, false), 0 === t.strm.avail_out)) return 1;
          }
          return t.insert = 0, 4 === e ? (d(t, true), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (d(t, false), 0 === t.strm.avail_out) ? 1 : 2;
        }(i, e) : 3 === i.strategy ? function (t, e) {
          for (var n, r, i, a, s = t.window;;) {
            if (t.lookahead <= 258) {
              if (_(t), t.lookahead <= 258 && 0 === e) return 1;
              if (0 === t.lookahead) break;
            }
            if (t.match_length = 0, t.lookahead >= 3 && t.strstart > 0 && (r = s[i = t.strstart - 1]) === s[++i] && r === s[++i] && r === s[++i]) {
              a = t.strstart + 258;
              do {} while (r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && r === s[++i] && i < a);
              t.match_length = 258 - (a - i), t.match_length > t.lookahead && (t.match_length = t.lookahead);
            }
            if (t.match_length >= 3 ? (n = o._tr_tally(t, 1, t.match_length - 3), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0) : (n = o._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), n && (d(t, false), 0 === t.strm.avail_out)) return 1;
          }
          return t.insert = 0, 4 === e ? (d(t, true), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (d(t, false), 0 === t.strm.avail_out) ? 1 : 2;
        }(i, e) : r[i.level].func(i, e);
        if (3 !== m && 4 !== m || (i.status = 666), 1 === m || 3 === m) return 0 === t.avail_out && (i.last_flush = -1), 0;
        if (2 === m && (1 === e ? o._tr_align(i) : 5 !== e && (o._tr_stored_block(i, 0, 0, false), 3 === e && (l(i.head), 0 === i.lookahead && (i.strstart = 0, i.block_start = 0, i.insert = 0))), h(t), 0 === t.avail_out)) return i.last_flush = -1, 0;
      }
      return 4 !== e ? 0 : i.wrap <= 0 ? 1 : (2 === i.wrap ? (p(i, 255 & t.adler), p(i, t.adler >> 8 & 255), p(i, t.adler >> 16 & 255), p(i, t.adler >> 24 & 255), p(i, 255 & t.total_in), p(i, t.total_in >> 8 & 255), p(i, t.total_in >> 16 & 255), p(i, t.total_in >> 24 & 255)) : (v(i, t.adler >>> 16), v(i, 65535 & t.adler)), h(t), i.wrap > 0 && (i.wrap = -i.wrap), 0 !== i.pending ? 0 : 1);
    }, e.deflateEnd = function (t) {
      var e;
      return t && t.state ? 42 !== (e = t.state.status) && 69 !== e && 73 !== e && 91 !== e && 103 !== e && 113 !== e && 666 !== e ? (t.msg = u[-2], -2) : (t.state = null, 113 === e ? (t.msg = u[-3], -3) : 0) : -2;
    }, e.deflateSetDictionary = function (t, e) {
      var n, r, o, s, u, c, f, h, d = e.length;
      if (!t || !t.state) return -2;
      if (2 === (s = (n = t.state).wrap) || 1 === s && 42 !== n.status || n.lookahead) return -2;
      for (1 === s && (t.adler = a(t.adler, e, d, 0)), n.wrap = 0, d >= n.w_size && (0 === s && (l(n.head), n.strstart = 0, n.block_start = 0, n.insert = 0), h = new i.Buf8(n.w_size), i.arraySet(h, e, d - n.w_size, n.w_size, 0), e = h, d = n.w_size), u = t.avail_in, c = t.next_in, f = t.input, t.avail_in = d, t.next_in = 0, t.input = e, _(n); n.lookahead >= 3;) {
        r = n.strstart, o = n.lookahead - 2;
        do {
          n.ins_h = (n.ins_h << n.hash_shift ^ n.window[r + 3 - 1]) & n.hash_mask, n.prev[r & n.w_mask] = n.head[n.ins_h], n.head[n.ins_h] = r, r++;
        } while (--o);
        n.strstart = r, n.lookahead = 2, _(n);
      }
      return n.strstart += n.lookahead, n.block_start = n.strstart, n.insert = n.lookahead, n.lookahead = 0, n.match_length = n.prev_length = 2, n.match_available = 0, t.next_in = c, t.input = f, t.avail_in = u, n.wrap = s, 0;
    }, e.deflateInfo = "pako deflate (from Nodeca project)";
  }, function (t, e, n) {
    "use strict";
    var r = n(13);
    function i(t) {
      for (var e = t.length; --e >= 0;) t[e] = 0;
    }
    var o = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], a = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], u = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], c = new Array(576);
    i(c);
    var f = new Array(60);
    i(f);
    var l = new Array(512);
    i(l);
    var h = new Array(256);
    i(h);
    var d = new Array(29);
    i(d);
    var p, v, g, _ = new Array(30);
    function m(t, e, n, r, i) {
      this.static_tree = t, this.extra_bits = e, this.extra_base = n, this.elems = r, this.max_length = i, this.has_stree = t && t.length;
    }
    function b(t, e) {
      this.dyn_tree = t, this.max_code = 0, this.stat_desc = e;
    }
    function y(t) {
      return t < 256 ? l[t] : l[256 + (t >>> 7)];
    }
    function w(t, e) {
      t.pending_buf[t.pending++] = 255 & e, t.pending_buf[t.pending++] = e >>> 8 & 255;
    }
    function x(t, e, n) {
      t.bi_valid > 16 - n ? (t.bi_buf |= e << t.bi_valid & 65535, w(t, t.bi_buf), t.bi_buf = e >> 16 - t.bi_valid, t.bi_valid += n - 16) : (t.bi_buf |= e << t.bi_valid & 65535, t.bi_valid += n);
    }
    function k(t, e, n) {
      x(t, n[2 * e], n[2 * e + 1]);
    }
    function O(t, e) {
      var n = 0;
      do {
        n |= 1 & t, t >>>= 1, n <<= 1;
      } while (--e > 0);
      return n >>> 1;
    }
    function A(t, e, n) {
      var r, i, o = new Array(16), a = 0;
      for (r = 1; r <= 15; r++) o[r] = a = a + n[r - 1] << 1;
      for (i = 0; i <= e; i++) {
        var s = t[2 * i + 1];
        0 !== s && (t[2 * i] = O(o[s]++, s));
      }
    }
    function E(t) {
      var e;
      for (e = 0; e < 286; e++) t.dyn_ltree[2 * e] = 0;
      for (e = 0; e < 30; e++) t.dyn_dtree[2 * e] = 0;
      for (e = 0; e < 19; e++) t.bl_tree[2 * e] = 0;
      t.dyn_ltree[512] = 1, t.opt_len = t.static_len = 0, t.last_lit = t.matches = 0;
    }
    function S(t) {
      t.bi_valid > 8 ? w(t, t.bi_buf) : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf), t.bi_buf = 0, t.bi_valid = 0;
    }
    function T(t, e, n, r) {
      var i = 2 * e, o = 2 * n;
      return t[i] < t[o] || t[i] === t[o] && r[e] <= r[n];
    }
    function j(t, e, n) {
      for (var r = t.heap[n], i = n << 1; i <= t.heap_len && (i < t.heap_len && T(e, t.heap[i + 1], t.heap[i], t.depth) && i++, !T(e, r, t.heap[i], t.depth));) t.heap[n] = t.heap[i], n = i, i <<= 1;
      t.heap[n] = r;
    }
    function z(t, e, n) {
      var r, i, s, u, c = 0;
      if (0 !== t.last_lit) do {
        r = t.pending_buf[t.d_buf + 2 * c] << 8 | t.pending_buf[t.d_buf + 2 * c + 1], i = t.pending_buf[t.l_buf + c], c++, 0 === r ? k(t, i, e) : (k(t, (s = h[i]) + 256 + 1, e), 0 !== (u = o[s]) && x(t, i -= d[s], u), k(t, s = y(--r), n), 0 !== (u = a[s]) && x(t, r -= _[s], u));
      } while (c < t.last_lit);
      k(t, 256, e);
    }
    function M(t, e) {
      var n, r, i, o = e.dyn_tree, a = e.stat_desc.static_tree, s = e.stat_desc.has_stree, u = e.stat_desc.elems, c = -1;
      for (t.heap_len = 0, t.heap_max = 573, n = 0; n < u; n++) 0 !== o[2 * n] ? (t.heap[++t.heap_len] = c = n, t.depth[n] = 0) : o[2 * n + 1] = 0;
      for (; t.heap_len < 2;) o[2 * (i = t.heap[++t.heap_len] = c < 2 ? ++c : 0)] = 1, t.depth[i] = 0, t.opt_len--, s && (t.static_len -= a[2 * i + 1]);
      for (e.max_code = c, n = t.heap_len >> 1; n >= 1; n--) j(t, o, n);
      i = u;
      do {
        n = t.heap[1], t.heap[1] = t.heap[t.heap_len--], j(t, o, 1), r = t.heap[1], t.heap[--t.heap_max] = n, t.heap[--t.heap_max] = r, o[2 * i] = o[2 * n] + o[2 * r], t.depth[i] = (t.depth[n] >= t.depth[r] ? t.depth[n] : t.depth[r]) + 1, o[2 * n + 1] = o[2 * r + 1] = i, t.heap[1] = i++, j(t, o, 1);
      } while (t.heap_len >= 2);
      t.heap[--t.heap_max] = t.heap[1], function (t, e) {
        var n, r, i, o, a, s, u = e.dyn_tree, c = e.max_code, f = e.stat_desc.static_tree, l = e.stat_desc.has_stree, h = e.stat_desc.extra_bits, d = e.stat_desc.extra_base, p = e.stat_desc.max_length, v = 0;
        for (o = 0; o <= 15; o++) t.bl_count[o] = 0;
        for (u[2 * t.heap[t.heap_max] + 1] = 0, n = t.heap_max + 1; n < 573; n++) (o = u[2 * u[2 * (r = t.heap[n]) + 1] + 1] + 1) > p && (o = p, v++), u[2 * r + 1] = o, r > c || (t.bl_count[o]++, a = 0, r >= d && (a = h[r - d]), s = u[2 * r], t.opt_len += s * (o + a), l && (t.static_len += s * (f[2 * r + 1] + a)));
        if (0 !== v) {
          do {
            for (o = p - 1; 0 === t.bl_count[o];) o--;
            t.bl_count[o]--, t.bl_count[o + 1] += 2, t.bl_count[p]--, v -= 2;
          } while (v > 0);
          for (o = p; 0 !== o; o--) for (r = t.bl_count[o]; 0 !== r;) (i = t.heap[--n]) > c || (u[2 * i + 1] !== o && (t.opt_len += (o - u[2 * i + 1]) * u[2 * i], u[2 * i + 1] = o), r--);
        }
      }(t, e), A(o, c, t.bl_count);
    }
    function B(t, e, n) {
      var r, i, o = -1, a = e[1], s = 0, u = 7, c = 4;
      for (0 === a && (u = 138, c = 3), e[2 * (n + 1) + 1] = 65535, r = 0; r <= n; r++) i = a, a = e[2 * (r + 1) + 1], ++s < u && i === a || (s < c ? t.bl_tree[2 * i] += s : 0 !== i ? (i !== o && t.bl_tree[2 * i]++, t.bl_tree[32]++) : s <= 10 ? t.bl_tree[34]++ : t.bl_tree[36]++, s = 0, o = i, 0 === a ? (u = 138, c = 3) : i === a ? (u = 6, c = 3) : (u = 7, c = 4));
    }
    function P(t, e, n) {
      var r, i, o = -1, a = e[1], s = 0, u = 7, c = 4;
      for (0 === a && (u = 138, c = 3), r = 0; r <= n; r++) if (i = a, a = e[2 * (r + 1) + 1], !(++s < u && i === a)) {
        if (s < c) do {
          k(t, i, t.bl_tree);
        } while (0 != --s); else 0 !== i ? (i !== o && (k(t, i, t.bl_tree), s--), k(t, 16, t.bl_tree), x(t, s - 3, 2)) : s <= 10 ? (k(t, 17, t.bl_tree), x(t, s - 3, 3)) : (k(t, 18, t.bl_tree), x(t, s - 11, 7));
        s = 0, o = i, 0 === a ? (u = 138, c = 3) : i === a ? (u = 6, c = 3) : (u = 7, c = 4);
      }
    }
    i(_);
    var I = false;
    function L(t, e, n, i) {
      x(t, 0 + (i ? 1 : 0), 3), function (t, e, n, i) {
        S(t), i && (w(t, n), w(t, ~n)), r.arraySet(t.pending_buf, t.window, e, n, t.pending), t.pending += n;
      }(t, e, n, true);
    }
    e._tr_init = function (t) {
      I || (!function () {
        var t, e, n, r, i, u = new Array(16);
        for (n = 0, r = 0; r < 28; r++) for (d[r] = n, t = 0; t < 1 << o[r]; t++) h[n++] = r;
        for (h[n - 1] = r, i = 0, r = 0; r < 16; r++) for (_[r] = i, t = 0; t < 1 << a[r]; t++) l[i++] = r;
        for (i >>= 7; r < 30; r++) for (_[r] = i << 7, t = 0; t < 1 << a[r] - 7; t++) l[256 + i++] = r;
        for (e = 0; e <= 15; e++) u[e] = 0;
        for (t = 0; t <= 143;) c[2 * t + 1] = 8, t++, u[8]++;
        for (; t <= 255;) c[2 * t + 1] = 9, t++, u[9]++;
        for (; t <= 279;) c[2 * t + 1] = 7, t++, u[7]++;
        for (; t <= 287;) c[2 * t + 1] = 8, t++, u[8]++;
        for (A(c, 287, u), t = 0; t < 30; t++) f[2 * t + 1] = 5, f[2 * t] = O(t, 5);
        p = new m(c, o, 257, 286, 15), v = new m(f, a, 0, 30, 15), g = new m(new Array(0), s, 0, 19, 7);
      }(), I = true), t.l_desc = new b(t.dyn_ltree, p), t.d_desc = new b(t.dyn_dtree, v), t.bl_desc = new b(t.bl_tree, g), t.bi_buf = 0, t.bi_valid = 0, E(t);
    }, e._tr_stored_block = L, e._tr_flush_block = function (t, e, n, r) {
      var i, o, a = 0;
      t.level > 0 ? (2 === t.strm.data_type && (t.strm.data_type = function (t) {
        var e, n = 4093624447;
        for (e = 0; e <= 31; e++, n >>>= 1) if (1 & n && 0 !== t.dyn_ltree[2 * e]) return 0;
        if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26]) return 1;
        for (e = 32; e < 256; e++) if (0 !== t.dyn_ltree[2 * e]) return 1;
        return 0;
      }(t)), M(t, t.l_desc), M(t, t.d_desc), a = function (t) {
        var e;
        for (B(t, t.dyn_ltree, t.l_desc.max_code), B(t, t.dyn_dtree, t.d_desc.max_code), M(t, t.bl_desc), e = 18; e >= 3 && 0 === t.bl_tree[2 * u[e] + 1]; e--) ;
        return t.opt_len += 3 * (e + 1) + 5 + 5 + 4, e;
      }(t), i = t.opt_len + 3 + 7 >>> 3, (o = t.static_len + 3 + 7 >>> 3) <= i && (i = o)) : i = o = n + 5, n + 4 <= i && -1 !== e ? L(t, e, n, r) : 4 === t.strategy || o === i ? (x(t, 2 + (r ? 1 : 0), 3), z(t, c, f)) : (x(t, 4 + (r ? 1 : 0), 3), function (t, e, n, r) {
        var i;
        for (x(t, e - 257, 5), x(t, n - 1, 5), x(t, r - 4, 4), i = 0; i < r; i++) x(t, t.bl_tree[2 * u[i] + 1], 3);
        P(t, t.dyn_ltree, e - 1), P(t, t.dyn_dtree, n - 1);
      }(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, a + 1), z(t, t.dyn_ltree, t.dyn_dtree)), E(t), r && S(t);
    }, e._tr_tally = function (t, e, n) {
      return t.pending_buf[t.d_buf + 2 * t.last_lit] = e >>> 8 & 255, t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e, t.pending_buf[t.l_buf + t.last_lit] = 255 & n, t.last_lit++, 0 === e ? t.dyn_ltree[2 * n]++ : (t.matches++, e--, t.dyn_ltree[2 * (h[n] + 256 + 1)]++, t.dyn_dtree[2 * y(e)]++), t.last_lit === t.lit_bufsize - 1;
    }, e._tr_align = function (t) {
      x(t, 2, 3), k(t, 256, c), function (t) {
        16 === t.bi_valid ? (w(t, t.bi_buf), t.bi_buf = 0, t.bi_valid = 0) : t.bi_valid >= 8 && (t.pending_buf[t.pending++] = 255 & t.bi_buf, t.bi_buf >>= 8, t.bi_valid -= 8);
      }(t);
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(130), i = n(13), o = n(72), a = n(74), s = n(50), u = n(73), c = n(133), f = Object.prototype.toString;
    function l(t) {
      if (!(this instanceof l)) return new l(t);
      this.options = i.assign({chunkSize: 16384, windowBits: 0, to: ""}, t || {});
      var e = this.options;
      e.raw && e.windowBits >= 0 && e.windowBits < 16 && (e.windowBits = -e.windowBits, 0 === e.windowBits && (e.windowBits = -15)), !(e.windowBits >= 0 && e.windowBits < 16) || t && t.windowBits || (e.windowBits += 32), e.windowBits > 15 && e.windowBits < 48 && 0 == (15 & e.windowBits) && (e.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new u, this.strm.avail_out = 0;
      var n = r.inflateInit2(this.strm, e.windowBits);
      if (n !== a.Z_OK) throw new Error(s[n]);
      if (this.header = new c, r.inflateGetHeader(this.strm, this.header), e.dictionary && ("string" == typeof e.dictionary ? e.dictionary = o.string2buf(e.dictionary) : "[object ArrayBuffer]" === f.call(e.dictionary) && (e.dictionary = new Uint8Array(e.dictionary)), e.raw && (n = r.inflateSetDictionary(this.strm, e.dictionary)) !== a.Z_OK)) throw new Error(s[n]);
    }
    function h(t, e) {
      var n = new l(e);
      if (n.push(t, true), n.err) throw n.msg || s[n.err];
      return n.result;
    }
    l.prototype.push = function (t, e) {
      var n, s, u, c, l, h = this.strm, d = this.options.chunkSize, p = this.options.dictionary, v = false;
      if (this.ended) return false;
      s = e === ~~e ? e : true === e ? a.Z_FINISH : a.Z_NO_FLUSH, "string" == typeof t ? h.input = o.binstring2buf(t) : "[object ArrayBuffer]" === f.call(t) ? h.input = new Uint8Array(t) : h.input = t, h.next_in = 0, h.avail_in = h.input.length;
      do {
        if (0 === h.avail_out && (h.output = new i.Buf8(d), h.next_out = 0, h.avail_out = d), (n = r.inflate(h, a.Z_NO_FLUSH)) === a.Z_NEED_DICT && p && (n = r.inflateSetDictionary(this.strm, p)), n === a.Z_BUF_ERROR && true === v && (n = a.Z_OK, v = false), n !== a.Z_STREAM_END && n !== a.Z_OK) return this.onEnd(n), this.ended = true, false;
        h.next_out && (0 !== h.avail_out && n !== a.Z_STREAM_END && (0 !== h.avail_in || s !== a.Z_FINISH && s !== a.Z_SYNC_FLUSH) || ("string" === this.options.to ? (u = o.utf8border(h.output, h.next_out), c = h.next_out - u, l = o.buf2string(h.output, u), h.next_out = c, h.avail_out = d - c, c && i.arraySet(h.output, h.output, u, c, 0), this.onData(l)) : this.onData(i.shrinkBuf(h.output, h.next_out)))), 0 === h.avail_in && 0 === h.avail_out && (v = true);
      } while ((h.avail_in > 0 || 0 === h.avail_out) && n !== a.Z_STREAM_END);
      return n === a.Z_STREAM_END && (s = a.Z_FINISH), s === a.Z_FINISH ? (n = r.inflateEnd(this.strm), this.onEnd(n), this.ended = true, n === a.Z_OK) : s !== a.Z_SYNC_FLUSH || (this.onEnd(a.Z_OK), h.avail_out = 0, true);
    }, l.prototype.onData = function (t) {
      this.chunks.push(t);
    }, l.prototype.onEnd = function (t) {
      t === a.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = i.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
    }, e.Inflate = l, e.inflate = h, e.inflateRaw = function (t, e) {
      return (e = e || {}).raw = true, h(t, e);
    }, e.ungzip = h;
  }, function (t, e, n) {
    "use strict";
    var r = n(13), i = n(70), o = n(71), a = n(131), s = n(132);
    function c() {
      this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new r.Buf16(320), this.work = new r.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
    }
    function f(t) {
      var e;
      return t && t.state ? (e = t.state, t.total_in = t.total_out = e.total = 0, t.msg = "", e.wrap && (t.adler = 1 & e.wrap), e.mode = 1, e.last = 0, e.havedict = 0, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new r.Buf32(852), e.distcode = e.distdyn = new r.Buf32(592), e.sane = 1, e.back = -1, 0) : -2;
    }
    function l(t) {
      var e;
      return t && t.state ? ((e = t.state).wsize = 0, e.whave = 0, e.wnext = 0, f(t)) : -2;
    }
    function h(t, e) {
      var n, r;
      return t && t.state ? (r = t.state, e < 0 ? (n = 0, e = -e) : (n = 1 + (e >> 4), e < 48 && (e &= 15)), e && (e < 8 || e > 15) ? -2 : (null !== r.window && r.wbits !== e && (r.window = null), r.wrap = n, r.wbits = e, l(t))) : -2;
    }
    function d(t, e) {
      var n, r;
      return t ? (r = new c, t.state = r, r.window = null, 0 !== (n = h(t, e)) && (t.state = null), n) : -2;
    }
    var p, v, g = true;
    function _(t) {
      if (g) {
        var e;
        for (p = new r.Buf32(512), v = new r.Buf32(32), e = 0; e < 144;) t.lens[e++] = 8;
        for (; e < 256;) t.lens[e++] = 9;
        for (; e < 280;) t.lens[e++] = 7;
        for (; e < 288;) t.lens[e++] = 8;
        for (s(1, t.lens, 0, 288, p, 0, t.work, {bits: 9}), e = 0; e < 32;) t.lens[e++] = 5;
        s(2, t.lens, 0, 32, v, 0, t.work, {bits: 5}), g = false;
      }
      t.lencode = p, t.lenbits = 9, t.distcode = v, t.distbits = 5;
    }
    function m(t, e, n, i) {
      var o, a = t.state;
      return null === a.window && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new r.Buf8(a.wsize)), i >= a.wsize ? (r.arraySet(a.window, e, n - a.wsize, a.wsize, 0), a.wnext = 0, a.whave = a.wsize) : ((o = a.wsize - a.wnext) > i && (o = i), r.arraySet(a.window, e, n - i, o, a.wnext), (i -= o) ? (r.arraySet(a.window, e, n - i, i, 0), a.wnext = i, a.whave = a.wsize) : (a.wnext += o, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += o))), 0;
    }
    e.inflateReset = l, e.inflateReset2 = h, e.inflateResetKeep = f, e.inflateInit = function (t) {
      return d(t, 15);
    }, e.inflateInit2 = d, e.inflate = function (t, e) {
      var n, c, f, l, h, d, p, v, g, b, y, w, x, k, O, A, E, S, T, j, z, M, B, P, I = 0, L = new r.Buf8(4), R = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
      if (!t || !t.state || !t.output || !t.input && 0 !== t.avail_in) return -2;
      12 === (n = t.state).mode && (n.mode = 13), h = t.next_out, f = t.output, p = t.avail_out, l = t.next_in, c = t.input, d = t.avail_in, v = n.hold, g = n.bits, b = d, y = p, M = 0;
      t: for (;;) switch (n.mode) {
        case 1:
          if (0 === n.wrap) {
            n.mode = 13;
            break;
          }
          for (; g < 16;) {
            if (0 === d) break t;
            d--, v += c[l++] << g, g += 8;
          }
          if (2 & n.wrap && 35615 === v) {
            n.check = 0, L[0] = 255 & v, L[1] = v >>> 8 & 255, n.check = o(n.check, L, 2, 0), v = 0, g = 0, n.mode = 2;
            break;
          }
          if (n.flags = 0, n.head && (n.head.done = false), !(1 & n.wrap) || (((255 & v) << 8) + (v >> 8)) % 31) {
            t.msg = "incorrect header check", n.mode = 30;
            break;
          }
          if (8 != (15 & v)) {
            t.msg = "unknown compression method", n.mode = 30;
            break;
          }
          if (g -= 4, z = 8 + (15 & (v >>>= 4)), 0 === n.wbits) n.wbits = z; else if (z > n.wbits) {
            t.msg = "invalid window size", n.mode = 30;
            break;
          }
          n.dmax = 1 << z, t.adler = n.check = 1, n.mode = 512 & v ? 10 : 12, v = 0, g = 0;
          break;
        case 2:
          for (; g < 16;) {
            if (0 === d) break t;
            d--, v += c[l++] << g, g += 8;
          }
          if (n.flags = v, 8 != (255 & n.flags)) {
            t.msg = "unknown compression method", n.mode = 30;
            break;
          }
          if (57344 & n.flags) {
            t.msg = "unknown header flags set", n.mode = 30;
            break;
          }
          n.head && (n.head.text = v >> 8 & 1), 512 & n.flags && (L[0] = 255 & v, L[1] = v >>> 8 & 255, n.check = o(n.check, L, 2, 0)), v = 0, g = 0, n.mode = 3;
        case 3:
          for (; g < 32;) {
            if (0 === d) break t;
            d--, v += c[l++] << g, g += 8;
          }
          n.head && (n.head.time = v), 512 & n.flags && (L[0] = 255 & v, L[1] = v >>> 8 & 255, L[2] = v >>> 16 & 255, L[3] = v >>> 24 & 255, n.check = o(n.check, L, 4, 0)), v = 0, g = 0, n.mode = 4;
        case 4:
          for (; g < 16;) {
            if (0 === d) break t;
            d--, v += c[l++] << g, g += 8;
          }
          n.head && (n.head.xflags = 255 & v, n.head.os = v >> 8), 512 & n.flags && (L[0] = 255 & v, L[1] = v >>> 8 & 255, n.check = o(n.check, L, 2, 0)), v = 0, g = 0, n.mode = 5;
        case 5:
          if (1024 & n.flags) {
            for (; g < 16;) {
              if (0 === d) break t;
              d--, v += c[l++] << g, g += 8;
            }
            n.length = v, n.head && (n.head.extra_len = v), 512 & n.flags && (L[0] = 255 & v, L[1] = v >>> 8 & 255, n.check = o(n.check, L, 2, 0)), v = 0, g = 0;
          } else n.head && (n.head.extra = null);
          n.mode = 6;
        case 6:
          if (1024 & n.flags && ((w = n.length) > d && (w = d), w && (n.head && (z = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Array(n.head.extra_len)), r.arraySet(n.head.extra, c, l, w, z)), 512 & n.flags && (n.check = o(n.check, c, w, l)), d -= w, l += w, n.length -= w), n.length)) break t;
          n.length = 0, n.mode = 7;
        case 7:
          if (2048 & n.flags) {
            if (0 === d) break t;
            w = 0;
            do {
              z = c[l + w++], n.head && z && n.length < 65536 && (n.head.name += String.fromCharCode(z));
            } while (z && w < d);
            if (512 & n.flags && (n.check = o(n.check, c, w, l)), d -= w, l += w, z) break t;
          } else n.head && (n.head.name = null);
          n.length = 0, n.mode = 8;
        case 8:
          if (4096 & n.flags) {
            if (0 === d) break t;
            w = 0;
            do {
              z = c[l + w++], n.head && z && n.length < 65536 && (n.head.comment += String.fromCharCode(z));
            } while (z && w < d);
            if (512 & n.flags && (n.check = o(n.check, c, w, l)), d -= w, l += w, z) break t;
          } else n.head && (n.head.comment = null);
          n.mode = 9;
        case 9:
          if (512 & n.flags) {
            for (; g < 16;) {
              if (0 === d) break t;
              d--, v += c[l++] << g, g += 8;
            }
            if (v !== (65535 & n.check)) {
              t.msg = "header crc mismatch", n.mode = 30;
              break;
            }
            v = 0, g = 0;
          }
          n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = true), t.adler = n.check = 0, n.mode = 12;
          break;
        case 10:
          for (; g < 32;) {
            if (0 === d) break t;
            d--, v += c[l++] << g, g += 8;
          }
          t.adler = n.check = (v >>> 24 & 255) + (v >>> 8 & 65280) + ((65280 & v) << 8) + ((255 & v) << 24), v = 0, g = 0, n.mode = 11;
        case 11:
          if (0 === n.havedict) return t.next_out = h, t.avail_out = p, t.next_in = l, t.avail_in = d, n.hold = v, n.bits = g, 2;
          t.adler = n.check = 1, n.mode = 12;
        case 12:
          if (5 === e || 6 === e) break t;
        case 13:
          if (n.last) {
            v >>>= 7 & g, g -= 7 & g, n.mode = 27;
            break;
          }
          for (; g < 3;) {
            if (0 === d) break t;
            d--, v += c[l++] << g, g += 8;
          }
          switch (n.last = 1 & v, g -= 1, 3 & (v >>>= 1)) {
            case 0:
              n.mode = 14;
              break;
            case 1:
              if (_(n), n.mode = 20, 6 === e) {
                v >>>= 2, g -= 2;
                break t;
              }
              break;
            case 2:
              n.mode = 17;
              break;
            case 3:
              t.msg = "invalid block type", n.mode = 30;
          }
          v >>>= 2, g -= 2;
          break;
        case 14:
          for (v >>>= 7 & g, g -= 7 & g; g < 32;) {
            if (0 === d) break t;
            d--, v += c[l++] << g, g += 8;
          }
          if ((65535 & v) != (v >>> 16 ^ 65535)) {
            t.msg = "invalid stored block lengths", n.mode = 30;
            break;
          }
          if (n.length = 65535 & v, v = 0, g = 0, n.mode = 15, 6 === e) break t;
        case 15:
          n.mode = 16;
        case 16:
          if (w = n.length) {
            if (w > d && (w = d), w > p && (w = p), 0 === w) break t;
            r.arraySet(f, c, l, w, h), d -= w, l += w, p -= w, h += w, n.length -= w;
            break;
          }
          n.mode = 12;
          break;
        case 17:
          for (; g < 14;) {
            if (0 === d) break t;
            d--, v += c[l++] << g, g += 8;
          }
          if (n.nlen = 257 + (31 & v), v >>>= 5, g -= 5, n.ndist = 1 + (31 & v), v >>>= 5, g -= 5, n.ncode = 4 + (15 & v), v >>>= 4, g -= 4, n.nlen > 286 || n.ndist > 30) {
            t.msg = "too many length or distance symbols", n.mode = 30;
            break;
          }
          n.have = 0, n.mode = 18;
        case 18:
          for (; n.have < n.ncode;) {
            for (; g < 3;) {
              if (0 === d) break t;
              d--, v += c[l++] << g, g += 8;
            }
            n.lens[R[n.have++]] = 7 & v, v >>>= 3, g -= 3;
          }
          for (; n.have < 19;) n.lens[R[n.have++]] = 0;
          if (n.lencode = n.lendyn, n.lenbits = 7, B = {bits: n.lenbits}, M = s(0, n.lens, 0, 19, n.lencode, 0, n.work, B), n.lenbits = B.bits, M) {
            t.msg = "invalid code lengths set", n.mode = 30;
            break;
          }
          n.have = 0, n.mode = 19;
        case 19:
          for (; n.have < n.nlen + n.ndist;) {
            for (; A = (I = n.lencode[v & (1 << n.lenbits) - 1]) >>> 16 & 255, E = 65535 & I, !((O = I >>> 24) <= g);) {
              if (0 === d) break t;
              d--, v += c[l++] << g, g += 8;
            }
            if (E < 16) v >>>= O, g -= O, n.lens[n.have++] = E; else {
              if (16 === E) {
                for (P = O + 2; g < P;) {
                  if (0 === d) break t;
                  d--, v += c[l++] << g, g += 8;
                }
                if (v >>>= O, g -= O, 0 === n.have) {
                  t.msg = "invalid bit length repeat", n.mode = 30;
                  break;
                }
                z = n.lens[n.have - 1], w = 3 + (3 & v), v >>>= 2, g -= 2;
              } else if (17 === E) {
                for (P = O + 3; g < P;) {
                  if (0 === d) break t;
                  d--, v += c[l++] << g, g += 8;
                }
                g -= O, z = 0, w = 3 + (7 & (v >>>= O)), v >>>= 3, g -= 3;
              } else {
                for (P = O + 7; g < P;) {
                  if (0 === d) break t;
                  d--, v += c[l++] << g, g += 8;
                }
                g -= O, z = 0, w = 11 + (127 & (v >>>= O)), v >>>= 7, g -= 7;
              }
              if (n.have + w > n.nlen + n.ndist) {
                t.msg = "invalid bit length repeat", n.mode = 30;
                break;
              }
              for (; w--;) n.lens[n.have++] = z;
            }
          }
          if (30 === n.mode) break;
          if (0 === n.lens[256]) {
            t.msg = "invalid code -- missing end-of-block", n.mode = 30;
            break;
          }
          if (n.lenbits = 9, B = {bits: n.lenbits}, M = s(1, n.lens, 0, n.nlen, n.lencode, 0, n.work, B), n.lenbits = B.bits, M) {
            t.msg = "invalid literal/lengths set", n.mode = 30;
            break;
          }
          if (n.distbits = 6, n.distcode = n.distdyn, B = {bits: n.distbits}, M = s(2, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, B), n.distbits = B.bits, M) {
            t.msg = "invalid distances set", n.mode = 30;
            break;
          }
          if (n.mode = 20, 6 === e) break t;
        case 20:
          n.mode = 21;
        case 21:
          if (d >= 6 && p >= 258) {
            t.next_out = h, t.avail_out = p, t.next_in = l, t.avail_in = d, n.hold = v, n.bits = g, a(t, y), h = t.next_out, f = t.output, p = t.avail_out, l = t.next_in, c = t.input, d = t.avail_in, v = n.hold, g = n.bits, 12 === n.mode && (n.back = -1);
            break;
          }
          for (n.back = 0; A = (I = n.lencode[v & (1 << n.lenbits) - 1]) >>> 16 & 255, E = 65535 & I, !((O = I >>> 24) <= g);) {
            if (0 === d) break t;
            d--, v += c[l++] << g, g += 8;
          }
          if (A && 0 == (240 & A)) {
            for (S = O, T = A, j = E; A = (I = n.lencode[j + ((v & (1 << S + T) - 1) >> S)]) >>> 16 & 255, E = 65535 & I, !(S + (O = I >>> 24) <= g);) {
              if (0 === d) break t;
              d--, v += c[l++] << g, g += 8;
            }
            v >>>= S, g -= S, n.back += S;
          }
          if (v >>>= O, g -= O, n.back += O, n.length = E, 0 === A) {
            n.mode = 26;
            break;
          }
          if (32 & A) {
            n.back = -1, n.mode = 12;
            break;
          }
          if (64 & A) {
            t.msg = "invalid literal/length code", n.mode = 30;
            break;
          }
          n.extra = 15 & A, n.mode = 22;
        case 22:
          if (n.extra) {
            for (P = n.extra; g < P;) {
              if (0 === d) break t;
              d--, v += c[l++] << g, g += 8;
            }
            n.length += v & (1 << n.extra) - 1, v >>>= n.extra, g -= n.extra, n.back += n.extra;
          }
          n.was = n.length, n.mode = 23;
        case 23:
          for (; A = (I = n.distcode[v & (1 << n.distbits) - 1]) >>> 16 & 255, E = 65535 & I, !((O = I >>> 24) <= g);) {
            if (0 === d) break t;
            d--, v += c[l++] << g, g += 8;
          }
          if (0 == (240 & A)) {
            for (S = O, T = A, j = E; A = (I = n.distcode[j + ((v & (1 << S + T) - 1) >> S)]) >>> 16 & 255, E = 65535 & I, !(S + (O = I >>> 24) <= g);) {
              if (0 === d) break t;
              d--, v += c[l++] << g, g += 8;
            }
            v >>>= S, g -= S, n.back += S;
          }
          if (v >>>= O, g -= O, n.back += O, 64 & A) {
            t.msg = "invalid distance code", n.mode = 30;
            break;
          }
          n.offset = E, n.extra = 15 & A, n.mode = 24;
        case 24:
          if (n.extra) {
            for (P = n.extra; g < P;) {
              if (0 === d) break t;
              d--, v += c[l++] << g, g += 8;
            }
            n.offset += v & (1 << n.extra) - 1, v >>>= n.extra, g -= n.extra, n.back += n.extra;
          }
          if (n.offset > n.dmax) {
            t.msg = "invalid distance too far back", n.mode = 30;
            break;
          }
          n.mode = 25;
        case 25:
          if (0 === p) break t;
          if (w = y - p, n.offset > w) {
            if ((w = n.offset - w) > n.whave && n.sane) {
              t.msg = "invalid distance too far back", n.mode = 30;
              break;
            }
            w > n.wnext ? (w -= n.wnext, x = n.wsize - w) : x = n.wnext - w, w > n.length && (w = n.length), k = n.window;
          } else k = f, x = h - n.offset, w = n.length;
          w > p && (w = p), p -= w, n.length -= w;
          do {
            f[h++] = k[x++];
          } while (--w);
          0 === n.length && (n.mode = 21);
          break;
        case 26:
          if (0 === p) break t;
          f[h++] = n.length, p--, n.mode = 21;
          break;
        case 27:
          if (n.wrap) {
            for (; g < 32;) {
              if (0 === d) break t;
              d--, v |= c[l++] << g, g += 8;
            }
            if (y -= p, t.total_out += y, n.total += y, y && (t.adler = n.check = n.flags ? o(n.check, f, y, h - y) : i(n.check, f, y, h - y)), y = p, (n.flags ? v : (v >>> 24 & 255) + (v >>> 8 & 65280) + ((65280 & v) << 8) + ((255 & v) << 24)) !== n.check) {
              t.msg = "incorrect data check", n.mode = 30;
              break;
            }
            v = 0, g = 0;
          }
          n.mode = 28;
        case 28:
          if (n.wrap && n.flags) {
            for (; g < 32;) {
              if (0 === d) break t;
              d--, v += c[l++] << g, g += 8;
            }
            if (v !== (4294967295 & n.total)) {
              t.msg = "incorrect length check", n.mode = 30;
              break;
            }
            v = 0, g = 0;
          }
          n.mode = 29;
        case 29:
          M = 1;
          break t;
        case 30:
          M = -3;
          break t;
        case 31:
          return -4;
        case 32:
        default:
          return -2;
      }
      return t.next_out = h, t.avail_out = p, t.next_in = l, t.avail_in = d, n.hold = v, n.bits = g, (n.wsize || y !== t.avail_out && n.mode < 30 && (n.mode < 27 || 4 !== e)) && m(t, t.output, t.next_out, y - t.avail_out) ? (n.mode = 31, -4) : (b -= t.avail_in, y -= t.avail_out, t.total_in += b, t.total_out += y, n.total += y, n.wrap && y && (t.adler = n.check = n.flags ? o(n.check, f, y, t.next_out - y) : i(n.check, f, y, t.next_out - y)), t.data_type = n.bits + (n.last ? 64 : 0) + (12 === n.mode ? 128 : 0) + (20 === n.mode || 15 === n.mode ? 256 : 0), (0 === b && 0 === y || 4 === e) && 0 === M && (M = -5), M);
    }, e.inflateEnd = function (t) {
      if (!t || !t.state) return -2;
      var e = t.state;
      return e.window && (e.window = null), t.state = null, 0;
    }, e.inflateGetHeader = function (t, e) {
      var n;
      return t && t.state ? 0 == (2 & (n = t.state).wrap) ? -2 : (n.head = e, e.done = false, 0) : -2;
    }, e.inflateSetDictionary = function (t, e) {
      var n, r = e.length;
      return t && t.state ? 0 !== (n = t.state).wrap && 11 !== n.mode ? -2 : 11 === n.mode && i(1, e, r, 0) !== n.check ? -3 : m(t, e, r, r) ? (n.mode = 31, -4) : (n.havedict = 1, 0) : -2;
    }, e.inflateInfo = "pako inflate (from Nodeca project)";
  }, function (t, e, n) {
    "use strict";
    t.exports = function (t, e) {
      var n, r, i, o, a, s, u, c, f, l, h, d, p, v, g, _, m, b, y, w, x, k, O, A, E;
      n = t.state, r = t.next_in, A = t.input, i = r + (t.avail_in - 5), o = t.next_out, E = t.output, a = o - (e - t.avail_out), s = o + (t.avail_out - 257), u = n.dmax, c = n.wsize, f = n.whave, l = n.wnext, h = n.window, d = n.hold, p = n.bits, v = n.lencode, g = n.distcode, _ = (1 << n.lenbits) - 1, m = (1 << n.distbits) - 1;
      t: do {
        p < 15 && (d += A[r++] << p, p += 8, d += A[r++] << p, p += 8), b = v[d & _];
        e: for (;;) {
          if (d >>>= y = b >>> 24, p -= y, 0 === (y = b >>> 16 & 255)) E[o++] = 65535 & b; else {
            if (!(16 & y)) {
              if (0 == (64 & y)) {
                b = v[(65535 & b) + (d & (1 << y) - 1)];
                continue e;
              }
              if (32 & y) {
                n.mode = 12;
                break t;
              }
              t.msg = "invalid literal/length code", n.mode = 30;
              break t;
            }
            w = 65535 & b, (y &= 15) && (p < y && (d += A[r++] << p, p += 8), w += d & (1 << y) - 1, d >>>= y, p -= y), p < 15 && (d += A[r++] << p, p += 8, d += A[r++] << p, p += 8), b = g[d & m];
            n: for (;;) {
              if (d >>>= y = b >>> 24, p -= y, !(16 & (y = b >>> 16 & 255))) {
                if (0 == (64 & y)) {
                  b = g[(65535 & b) + (d & (1 << y) - 1)];
                  continue n;
                }
                t.msg = "invalid distance code", n.mode = 30;
                break t;
              }
              if (x = 65535 & b, p < (y &= 15) && (d += A[r++] << p, (p += 8) < y && (d += A[r++] << p, p += 8)), (x += d & (1 << y) - 1) > u) {
                t.msg = "invalid distance too far back", n.mode = 30;
                break t;
              }
              if (d >>>= y, p -= y, x > (y = o - a)) {
                if ((y = x - y) > f && n.sane) {
                  t.msg = "invalid distance too far back", n.mode = 30;
                  break t;
                }
                if (k = 0, O = h, 0 === l) {
                  if (k += c - y, y < w) {
                    w -= y;
                    do {
                      E[o++] = h[k++];
                    } while (--y);
                    k = o - x, O = E;
                  }
                } else if (l < y) {
                  if (k += c + l - y, (y -= l) < w) {
                    w -= y;
                    do {
                      E[o++] = h[k++];
                    } while (--y);
                    if (k = 0, l < w) {
                      w -= y = l;
                      do {
                        E[o++] = h[k++];
                      } while (--y);
                      k = o - x, O = E;
                    }
                  }
                } else if (k += l - y, y < w) {
                  w -= y;
                  do {
                    E[o++] = h[k++];
                  } while (--y);
                  k = o - x, O = E;
                }
                for (; w > 2;) E[o++] = O[k++], E[o++] = O[k++], E[o++] = O[k++], w -= 3;
                w && (E[o++] = O[k++], w > 1 && (E[o++] = O[k++]));
              } else {
                k = o - x;
                do {
                  E[o++] = E[k++], E[o++] = E[k++], E[o++] = E[k++], w -= 3;
                } while (w > 2);
                w && (E[o++] = E[k++], w > 1 && (E[o++] = E[k++]));
              }
              break;
            }
          }
          break;
        }
      } while (r < i && o < s);
      r -= w = p >> 3, d &= (1 << (p -= w << 3)) - 1, t.next_in = r, t.next_out = o, t.avail_in = r < i ? i - r + 5 : 5 - (r - i), t.avail_out = o < s ? s - o + 257 : 257 - (o - s), n.hold = d, n.bits = p;
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(13), i = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], o = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], a = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], s = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
    t.exports = function (t, e, n, u, c, f, l, h) {
      var d, p, v, g, _, m, b, y, w, x = h.bits, k = 0, O = 0, A = 0, E = 0, S = 0, T = 0, j = 0, z = 0, M = 0, B = 0, P = null, I = 0, L = new r.Buf16(16), R = new r.Buf16(16), F = null, N = 0;
      for (k = 0; k <= 15; k++) L[k] = 0;
      for (O = 0; O < u; O++) L[e[n + O]]++;
      for (S = x, E = 15; E >= 1 && 0 === L[E]; E--) ;
      if (S > E && (S = E), 0 === E) return c[f++] = 20971520, c[f++] = 20971520, h.bits = 1, 0;
      for (A = 1; A < E && 0 === L[A]; A++) ;
      for (S < A && (S = A), z = 1, k = 1; k <= 15; k++) if (z <<= 1, (z -= L[k]) < 0) return -1;
      if (z > 0 && (0 === t || 1 !== E)) return -1;
      for (R[1] = 0, k = 1; k < 15; k++) R[k + 1] = R[k] + L[k];
      for (O = 0; O < u; O++) 0 !== e[n + O] && (l[R[e[n + O]]++] = O);
      if (0 === t ? (P = F = l, m = 19) : 1 === t ? (P = i, I -= 257, F = o, N -= 257, m = 256) : (P = a, F = s, m = -1), B = 0, O = 0, k = A, _ = f, T = S, j = 0, v = -1, g = (M = 1 << S) - 1, 1 === t && M > 852 || 2 === t && M > 592) return 1;
      for (;;) {
        b = k - j, l[O] < m ? (y = 0, w = l[O]) : l[O] > m ? (y = F[N + l[O]], w = P[I + l[O]]) : (y = 96, w = 0), d = 1 << k - j, A = p = 1 << T;
        do {
          c[_ + (B >> j) + (p -= d)] = b << 24 | y << 16 | w | 0;
        } while (0 !== p);
        for (d = 1 << k - 1; B & d;) d >>= 1;
        if (0 !== d ? (B &= d - 1, B += d) : B = 0, O++, 0 == --L[k]) {
          if (k === E) break;
          k = e[n + l[O]];
        }
        if (k > S && (B & g) !== v) {
          for (0 === j && (j = S), _ += A, z = 1 << (T = k - j); T + j < E && !((z -= L[T + j]) <= 0);) T++, z <<= 1;
          if (M += 1 << T, 1 === t && M > 852 || 2 === t && M > 592) return 1;
          c[v = B & g] = S << 24 | T << 16 | _ - f | 0;
        }
      }
      return 0 !== B && (c[_ + B] = k - j << 24 | 4194304 | 0), h.bits = S, 0;
    };
  }, function (t, e, n) {
    "use strict";
    t.exports = function () {
      this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
    };
  }, function (t, e, n) {
    "use strict";
    function r(t, e) {
      if (t === e) return true;
      if (!t || !e || t.length !== e.length) return false;
      for (let n = 0; n < t.length; ++n) if (t[n] !== e[n]) return false;
      return true;
    }
    function i(t, e) {
      if (t.primitives.length !== e.primitives.length) return false;
      let n = true;
      for (let i = 0; i < t.primitives.length; i++) {
        const i = t.primitives[0], o = e.primitives[0];
        for (const t in i) {
          if (!r(i[t], o[t])) {
            n = false;
            break;
          }
        }
        if (!n) break;
      }
      return n;
    }
    n(16), Object.defineProperty(e, "__esModule", {value: true}), e.dedupeGeometry = void 0, e.dedupeGeometry = function (t) {
      const e = new Map, {geometry: n, nodes: r} = t, o = [];
      for (let t = 0; t < n.length; t++) {
        const r = n[t];
        if (void 0 === e[t]) {
          e[t] = t;
          for (let a = t + 1; a < n.length; a++) {
            i(r, n[a]) && (e[a] = e[t], o.push(a));
          }
        }
      }
      let a = -1;
      const s = {}, u = n.map((t, e) => e).map(t => e[t]).map(t => (s[t] || (s[t] = true, a++), a));
      t.geometry = n.filter((t, e) => -1 === o.indexOf(e)), r.forEach(t => {
        t.geometry && (t.geometry = u[t.geometry]);
      }), o.length;
    };
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: true}), e.flattenScene = void 0;
    const r = n(75), i = n(46), o = n(76);
    e.flattenScene = function (t) {
      const e = r.createMat4(), n = [];
      !function t(e, n, i, o, a) {
        var s, u;
        const c = null !== (s = e.transform) && void 0 !== s ? s : r.createMat4(), f = r.multiplyMat4(r.createMat4(), c, n);
        void 0 !== e.geometry && i.geometry[e.geometry].primitives.forEach(t => {
          a.push({primitive: t, transform: f});
        });
        for (let n = 0; n < e.children.length; n++) t(i.nodes[e.children[n]], f, i, o + ":" + (null !== (u = e.name) && void 0 !== u ? u : "scene"), a);
      }(t.scenes[0], e, t, "scene", n);
      const a = n.map(t => {
        const e = t.primitive, n = Object.assign({}, e), r = e.attributes.positions.slice();
        return o.transformPositions(r, t.transform), n.attributes.positions = r, n;
      }), s = i.mergePrimitives(a);
      t.geometry = [{name: "merged", primitives: [s]}], t.nodes = [{name: "root", children: [], transform: r.createMat4(), type: "model", geometry: 0}];
    };
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: true}), e.gltfToGbParser = void 0;
    const r = n(137), i = n(141), o = n(142), a = n(144), s = n(145), u = n(146), c = n(147), f = n(148);
    e.gltfToGbParser = function (t, e) {
      const n = {};
      return t.realBuffers = e, s.processMeshes(t, n), u.processNodes(t, n), c.processScenes(t, n), r.processAnimations(t, n), f.processSkins(t, n), o.processLights(t, n), i.processCameras(t, n), a.processMaterials(t, n), n;
    };
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: true}), e.processAnimations = void 0;
    const r = n(51), i = {rotation: "r", translation: "t", scale: "s", weights: "w"};
    e.processAnimations = function (t, e) {
      t.animations ? e.animations = t.animations.map(e => {
        const n = {data: [], duration: 0}, o = {};
        return e.channels.forEach(a => {
          const s = e.samplers[a.sampler], u = r.getBuffer(t, s.input), c = r.getBuffer(t, s.output);
          let f = o[a.target.node];
          f || (f = o[a.target.node] = {id: a.target.node, duration: u[u.length - 1]}, n.data.push(f)), n.duration = Math.max(n.duration, f.duration), f[i[a.target.path]] = {times: u, values: c};
        }), n;
      }) : e.animations = [];
    };
  }, function (t, e, n) {
    n(15)("Int16", function (t) {
      return function (e, n, r) {
        return t(this, e, n, r);
      };
    });
  }, function (t, e, n) {
    n(15)("Int32", function (t) {
      return function (e, n, r) {
        return t(this, e, n, r);
      };
    });
  }, function (t, e, n) {
    n(15)("Uint32", function (t) {
      return function (e, n, r) {
        return t(this, e, n, r);
      };
    });
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: true}), e.processCameras = void 0, e.processCameras = function (t, e) {
      t.cameras ? e.cameras = t.cameras.map(t => {
        if ("perspective" === t.type) {
          const e = t.perspective;
          return {fov: e.yfov, near: e.znear, far: e.zfar, aspectRatio: e.aspectRatio, mode: 0};
        }
        throw new Error("only perspective camera supported right now!");
      }) : e.cameras = [];
    };
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: true}), e.processLights = void 0;
    const r = n(143), i = {directional: 0, point: 1, spot: 2};
    e.processLights = function (t, e) {
      t.extensions && t.extensions.KHR_lights_punctual && t.extensions.KHR_lights_punctual.lights && (e.lights = t.extensions.KHR_lights_punctual.lights.map(t => ({name: t.name, color: r.rgb2hex(t.color), intensity: t.intensity, type: i[t.type]})));
    };
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: true}), e.rgb2hex = void 0, e.rgb2hex = function (t) {
      return (255 * t[0] << 16) + (255 * t[1] << 8) + (255 * t[2] | 0);
    };
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: true}), e.processMaterials = e.processMaterial = e.rgb2hex = void 0;
    const r = {BLEND: 0};
    function i(t) {
      if (t) return (255 * t[0] << 16) + (255 * t[1] << 8) + (255 * t[2] | 0);
    }
    e.rgb2hex = i;
    const o = {baseColorFactor: [1, 1, 1, 1], metallicFactor: 1, roughnessFactor: 1};
    function a(t) {
      var e, n, a, s, u, c, f;
      const l = Object.assign(Object.assign({}, o), t.pbrMetallicRoughness);
      return {name: t.name, state: {culling: null === (e = !t.doubleSided) || void 0 === e || e, blendMode: null !== (n = r[t.alphaMode]) && void 0 !== n ? n : 20}, standard: {alpha: l.baseColorFactor[3], color: i(l.baseColorFactor), diffuseMap: null === (a = l.baseColorTexture) || void 0 === a ? void 0 : a.index, normalMap: null === (s = t.normalTexture) || void 0 === s ? void 0 : s.index, emissiveColor: i(t.emissiveFactor), emissiveMap: null === (u = t.emissiveTexture) || void 0 === u ? void 0 : u.index, occlusionMap: null === (c = t.occlusionTexture) || void 0 === c ? void 0 : c.index}, pbr: {metallic: l.metallicFactor, roughness: l.roughnessFactor, metallicRoughnessMap: null === (f = l.metallicRoughnessTexture) || void 0 === f ? void 0 : f.index}};
    }
    e.processMaterial = a, e.processMaterials = function (t, e) {
      var n, r;
      e.textures = null === (n = t.textures) || void 0 === n ? void 0 : n.map((e, n) => ({uri: t.images[e.source].uri})), e.materials = null === (r = t.materials) || void 0 === r ? void 0 : r.map(t => a(t));
    };
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: true}), e.processMeshes = void 0;
    const r = n(49), i = n(51), o = {POSITION: "positions", NORMAL: "normals", TEXCOORD_0: "uvs", TEXCOORD: "uvs", JOINTS_0: "boneIndices", JOINTS: "boneIndices", WEIGHTS_0: "weights", WEIGHTS: "weights", TANGENT: "tangents"};
    e.processMeshes = function (t, e) {
      e.geometry = t.meshes.map(e => {
        const n = {name: e.name, primitives: e.primitives.map(e => function (t, e) {
          const n = {bounds: [0, 0, 0, 0, 0, 0], attributes: {}};
          n.material = e.material || 0, void 0 !== e.indices && (n.indices = i.getBuffer(t, e.indices, true));
          for (const r in e.attributes) o[r] && (n.attributes[o[r]] = i.getBuffer(t, e.attributes[r]));
          if (n.attributes.positions) {
            const t = r.getBounds(n.attributes.positions, 3).ranges;
            n.bounds[0] = t[0].min, n.bounds[1] = t[1].min, n.bounds[2] = t[2].min, n.bounds[3] = t[0].max, n.bounds[4] = t[1].max, n.bounds[5] = t[2].max;
          }
          return e.targets && (n.targets = e.targets.map(e => {
            const n = {};
            for (const r in e) n[o[r]] = i.getBuffer(t, e[r]);
            return n;
          })), n;
        }(t, e))};
        return e.weights && (n.weights = e.weights), n;
      });
    };
  }, function (t, e, n) {
    "use strict";
    n(3), n(7), n(6), Object.defineProperty(e, "__esModule", {value: true}), e.processNodes = void 0, e.processNodes = function (t, e) {
      e.nodes = t.nodes.map(t => {
        const e = t.children || [], n = function (t) {
          if (t.matrix && 16 === t.matrix.length) return new Float32Array(t.matrix);
          const e = t.scale || [1, 1, 1], n = t.translation || [0, 0, 0], r = t.rotation || [0, 0, 0, 1], i = r[0], o = r[1], a = r[2], s = r[3], u = i + i, c = o + o, f = a + a, l = i * u, h = i * c, d = i * f, p = o * c, v = o * f, g = a * f, _ = s * u, m = s * c, b = s * f, y = new Float32Array(16), w = e[0], x = e[1], k = e[2];
          return y[0] = (1 - (p + g)) * w, y[1] = (h + b) * w, y[2] = (d - m) * w, y[4] = (h - b) * x, y[5] = (1 - (l + g)) * x, y[6] = (v + _) * x, y[8] = (d + m) * k, y[9] = (v - _) * k, y[10] = (1 - (l + p)) * k, y[12] = n[0], y[13] = n[1], y[14] = n[2], y;
        }(t), r = {name: t.name || "node", children: e, transform: n};
        return void 0 !== t.camera && (r.type = "camera", r.camera = t.camera), void 0 !== t.mesh && (r.type = "model", r.geometry = t.mesh), t.extensions && t.extensions.KHR_lights_punctual && (r.type = "light", r.light = t.extensions.KHR_lights_punctual.light), void 0 !== t.skin && (r.skin = t.skin), r;
      });
    };
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: true}), e.processScenes = void 0, e.processScenes = function (t, e) {
      e.scenes = t.scenes.map(t => ({children: t.nodes, name: t.name}));
    };
  }, function (t, e, n) {
    "use strict";
    n(3), n(7), n(6), Object.defineProperty(e, "__esModule", {value: true}), e.processSkins = void 0;
    const r = n(51);
    e.processSkins = function (t, e) {
      t.skins ? e.skins = t.skins.map(n => {
        const i = r.getBuffer(t, n.inverseBindMatrices);
        return {joints: n.joints.map((t, n) => {
          const r = e.nodes[t];
          r.type = "bone", r.inverseBindMatrix = new Float32Array(16);
          for (let t = 0; t < 16; t++) r.inverseBindMatrix[t] = i[16 * n + t];
          return t;
        }), bindMatrix: n.bindMatrix || new Float32Array(16)};
      }) : e.skins = [];
    };
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: true}), e.objToGbParser = void 0;
    const r = n(49), i = n(150);
    e.objToGbParser = function (t, e) {
      const n = {}, o = i.parseObj(t), a = r.getBounds(o.position, 3);
      return n.geometry = [{name: e, primitives: [{bounds: [a.ranges[0].min, a.ranges[1].min, a.ranges[2].min, a.ranges[0].max, a.ranges[1].max, a.ranges[2].max], indices: o.indices, attributes: {positions: o.position, normals: o.normals, uvs: o.uv}}]}], n;
    };
  }, function (t, e, n) {
    "use strict";
    function r(t, e = 3) {
      const n = [];
      for (let r = 0; r < t.length; r++) for (let i = 0; i < e; i++) n[r * e + i] = t[r][i];
      return new Float32Array(n);
    }
    n(3), n(7), n(6), n(12), n(151), Object.defineProperty(e, "__esModule", {value: true}), e.parseObj = void 0, e.parseObj = function (t) {
      const e = t.split("\n"), n = [], i = [], o = [], a = [], s = [], u = [], c = [];
      let f, l = 0;
      const h = /v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/, d = /vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/, p = /vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/, v = /f( +-?\d+)( +-?\d+)( +-?\d+)( +-?\d+)?/, g = /f( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))?/, _ = /f( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))?/, m = /f( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))?/;
      function b(t) {
        const e = parseInt(t);
        return 3 * (e >= 0 ? e - 1 : e + a.length / 3);
      }
      function y(t) {
        const e = parseInt(t);
        return 3 * (e >= 0 ? e - 1 : e + s.length / 3);
      }
      function w(t) {
        const e = parseInt(t);
        return 2 * (e >= 0 ? e - 1 : e + u.length / 2);
      }
      function x(t, e, r) {
        n.push([a[t], a[t + 1], a[t + 2]]), n.push([a[e], a[e + 1], a[e + 2]]), n.push([a[r], a[r + 1], a[r + 2]]), c.push(3 * l + 0), c.push(3 * l + 1), c.push(3 * l + 2), l++;
      }
      function k(t, e, n) {
        i.push([u[t], u[t + 1]]), i.push([u[e], u[e + 1]]), i.push([u[n], u[n + 1]]);
      }
      function O(t, e, n) {
        o.push([s[t], s[t + 1], s[t + 2]]), o.push([s[e], s[e + 1], s[e + 2]]), o.push([s[n], s[n + 1], s[n + 2]]);
      }
      function A(t, e, n, r, i, o, a, s, u, c, f, l) {
        let h, d = b(t), p = b(e), v = b(n);
        void 0 === r ? x(d, p, v) : (h = b(r), x(d, p, h), x(p, v, h)), void 0 !== i && (d = w(i), p = w(o), v = w(a), void 0 === r ? k(d, p, v) : (h = w(s), k(d, p, h), k(p, v, h))), void 0 !== u && (d = y(u), p = y(c), v = y(f), void 0 === r ? O(d, p, v) : (h = y(l), O(d, p, h), O(p, v, h)));
      }
      for (let t = 0; t < e.length; t++) {
        let n = e[t];
        n = n.trim(), 0 !== n.length && "#" !== n.charAt(0) && (null !== (f = h.exec(n)) ? a.push(parseFloat(f[1]), parseFloat(f[2]), parseFloat(f[3])) : null !== (f = d.exec(n)) ? s.push(parseFloat(f[1]), parseFloat(f[2]), parseFloat(f[3])) : null !== (f = p.exec(n)) ? u.push(parseFloat(f[1]), 1 - parseFloat(f[2])) : null !== (f = v.exec(n)) ? A(f[1], f[2], f[3], f[4]) : null !== (f = g.exec(n)) ? A(f[2], f[5], f[8], f[11], f[3], f[6], f[9], f[12]) : null !== (f = _.exec(n)) ? A(f[2], f[6], f[10], f[14], f[3], f[7], f[11], f[15], f[4], f[8], f[12], f[16]) : null !== (f = m.exec(n)) && A(f[2], f[5], f[8], f[11], void 0, void 0, void 0, void 0, f[3], f[6], f[9], f[12]));
      }
      return function (t) {
        const e = [];
        for (let n = 0; n < t.indices.length; n++) {
          const r = t.indices[n], i = t.positions[r], o = t.normals[r], a = t.coords[r];
          e.push(i.concat(o).concat(a).toString());
        }
        const n = [], r = [], i = [], o = [], a = {}, s = {};
        let u = 0;
        for (let c = 0; c < e.length; c++) {
          const f = e[c];
          a[f] ? o.push(s[f]) : (a[f] = f, n.push(t.positions[c]), r.push(t.normals[c]), i.push(t.coords[c]), o.push(u), s[f] = u, u++);
        }
        t.positions = n, t.normals = r, t.coords = i, t.indices = o;
      }(E = {positions: n, coords: i, normals: o, indices: c}), {uv: r(E.coords, 2), position: r(E.positions, 3), normals: r(E.normals, 3), indices: new Uint16Array(E.indices)};
      var E;
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(27), i = n(152).trim;
    r({target: "String", proto: true, forced: n(154)("trim")}, {trim: function () {
      return i(this);
    }});
  }, function (t, e, n) {
    var r = n(32), i = n(153), o = "[" + n(77) + "]", a = RegExp("^" + o + o + "*"), s = RegExp(o + o + "*$"), u = function (t) {
      return function (e) {
        var n = i(r(e));
        return 1 & t && (n = n.replace(a, "")), 2 & t && (n = n.replace(s, "")), n;
      };
    };
    t.exports = {start: u(1), end: u(2), trim: u(3)};
  }, function (t, e, n) {
    var r = n(24);
    t.exports = function (t) {
      if (r(t)) throw TypeError("Cannot convert a Symbol value to a string");
      return String(t);
    };
  }, function (t, e, n) {
    var r = n(2), i = n(77);
    t.exports = function (t) {
      return r(function () {
        return !!i[t]() || "​᠎" != "​᠎"[t]() || i[t].name !== t;
      });
    };
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: true}), e.mergeGBObjects = void 0, e.mergeGBObjects = function (t) {
      const e = {};
      let n = 0, r = 0;
      return t.forEach(t => {
        var i, o;
        t.geometry && (e.geometry ? t.geometry.forEach(t => {
          e.geometry.push(t);
        }) : e.geometry = t.geometry.slice()), t.nodes && (e.nodes || (e.nodes = []), t.nodes.forEach(t => {
          const i = Object.assign({name: t.name}, t);
          void 0 !== i.geometry && (i.geometry += n), i.children = t.children.map(t => t + r), e.nodes.push(i);
        })), t.scenes && (e.scenes || (e.scenes = []), t.scenes.forEach(t => {
          const n = Object.assign({}, t);
          n.children = t.children.map(t => t + r), e.scenes.push(n);
        })), n += (null === (i = t.geometry) || void 0 === i ? void 0 : i.length) || 0, r += (null === (o = t.nodes) || void 0 === o ? void 0 : o.length) || 0;
      }), e;
    };
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: true}), e.transformUvs = void 0, e.transformUvs = function (t, e) {
      const {x: n, y: r, w: i, h: o} = e;
      for (let e = 0; e < t.length; e += 2) t[e] = t[e] * i + n, t[e + 1] = t[e + 1] * o + r;
    };
  }, function (t, e, n) {
    "use strict";
    n(16), n(3), n(7), n(6), n(67), n(12), Object.defineProperty(e, "__esModule", {value: true}), e.unpackGBObject = void 0;
    const r = n(75), i = n(68), o = n(158), a = n(69);
    e.unpackGBObject = function (t) {
      var e, n, s, u, c;
      const {gbObject: f, buffers: l} = function (t) {
        const e = {UINT16: 0, FLOAT32: 1, STRING: 2, FLOAT32_COMPRESSED: 3, UINT16_COMPRESSED: 4};
        let n = 0;
        const r = new Float32Array(t), s = r[n++];
        n++, n += s / 2, n % 1 && (n += .5);
        const u = o.unpackGBMeta(t), c = [];
        for (; n < r.length - 1;) {
          const o = r[n++], s = r[n++];
          if (s === e.FLOAT32) c.push(new Float32Array(t, 4 * n, o)), n += o; else if (s === e.FLOAT32_COMPRESSED || s === e.UINT16_COMPRESSED) {
            const r = new Uint8Array(t, 4 * n, o), u = a.unzipArray(r.slice(0)), f = new Uint16Array(u.buffer);
            if (s === e.FLOAT32_COMPRESSED) {
              const t = i.unpackArray(f);
              c.push(t);
            } else c.push(f);
            n += o / 4, n += 1 - n % 1;
          } else {
            if (s !== e.UINT16) throw new Error("not supported buffer," + s);
            c.push(new Uint16Array(t, 4 * n, o)), n += o / 2, n % 1 && (n += .5);
          }
        }
        return {gbObject: u, buffers: c};
      }(t), h = {s: 3, t: 3, w: 1, r: 4}, d = {positions: 3, normals: 3, weights: 4, boneIndices: 4, uvs: 2, tangents: 4};
      return null === (e = f.geometryBatch) || void 0 === e || e.forEach(t => {
        void 0 !== t.indices && (t.indices = l[Number(t.indices)]);
        for (const e in d) void 0 !== t.attributes[e] && (t.attributes[e] = l[t.attributes[e]]);
      }), null === (n = f.geometry) || void 0 === n || n.forEach(t => {
        t.primitives.forEach(t => {
          if (t.attributes) {
            void 0 !== t.indices && (t.indices = l[Number(t.indices)]);
            for (const e in d) void 0 !== t.attributes[e] && (t.attributes[e] = l[t.attributes[e]]);
          }
          t.targets && t.targets.forEach(t => {
            for (const e in d) void 0 !== t[e] && (t[e] = l[t[e]]);
          });
        });
      }), null === (s = f.animations) || void 0 === s || s.forEach(t => {
        t.data.forEach(t => {
          for (const e in h) t[e] && (t[e].times = l[t[e].times], t[e].values = l[t[e].values]);
        });
      }), null === (u = f.nodes) || void 0 === u || u.forEach(t => {
        let e = Number(t.bindMatrix);
        t.bindMatrix = -1 === e ? r.createMat4() : l[e], e = Number(t.inverseBindMatrix), t.inverseBindMatrix = l[e], e = Number(t.transform), t.transform = -1 === e ? r.createMat4() : l[e];
      }), null === (c = f.skins) || void 0 === c || c.forEach(t => {
        const e = Number(t.bindMatrix);
        t.bindMatrix = -1 === e ? r.createMat4() : l[e];
      }), f;
    };
  }, function (t, e, n) {
    "use strict";
    n(3), n(7), n(6), n(12), n(159), Object.defineProperty(e, "__esModule", {value: true}), e.unpackGBMeta = void 0, e.unpackGBMeta = function (t) {
      let e = 0;
      const n = new Float32Array(t)[e++];
      e++;
      const r = new Uint16Array(t, 4 * e, n), i = new Int8Array(t, 4 * e, 2 * n);
      e += n / 2, e % 1 && (e += .5);
      let o = null;
      try {
        o = new TextDecoder("utf-16").decode(i, {});
      } catch (t) {
        try {
          o = String.fromCharCode.apply(null, r);
        } catch (t) {
          throw new Error("[Unpack GB model] meta data is too large, possible - we have large base64 textures or animation");
        }
      }
      return JSON.parse(o);
    };
  }, function (t, e, n) {
    n(15)("Int8", function (t) {
      return function (e, n, r) {
        return t(this, e, n, r);
      };
    });
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: true});
  }, function (t, e, n) {
    "use strict";
    n.r(e);
    n(16), n(99);
    var r = n(78), i = function (t, e, n, r) {
      return new (n || (n = Promise))(function (i, o) {
        function a(t) {
          try {
            u(r.next(t));
          } catch (t) {
            o(t);
          }
        }
        function s(t) {
          try {
            u(r.throw(t));
          } catch (t) {
            o(t);
          }
        }
        function u(t) {
          var e;
          t.done ? i(t.value) : (e = t.value, e instanceof n ? e : new n(function (t) {
            t(e);
          })).then(a, s);
        }
        u((r = r.apply(t, e || [])).next());
      });
    };
    var o = function (t, e, n, r) {
      return new (n || (n = Promise))(function (i, o) {
        function a(t) {
          try {
            u(r.next(t));
          } catch (t) {
            o(t);
          }
        }
        function s(t) {
          try {
            u(r.throw(t));
          } catch (t) {
            o(t);
          }
        }
        function u(t) {
          var e;
          t.done ? i(t.value) : (e = t.value, e instanceof n ? e : new n(function (t) {
            t(e);
          })).then(a, s);
        }
        u((r = r.apply(t, e || [])).next());
      });
    };
    var a = {loadGB: function (t) {
      return i(this, void 0, void 0, function* () {
        const e = yield fetch(t), n = yield e.arrayBuffer();
        return Object(r.unpackGBObject)(n);
      });
    }, loadImageBitmap: function (t) {
      return o(this, void 0, void 0, function* () {
        const e = yield fetch(t), n = yield e.blob();
        return yield createImageBitmap(n);
      });
    }};
    n(3);
    let s = {};
    try {
      s = ImageBitmap;
    } catch (t) {}
    function u(t) {
      const e = [];
      return function t(e, n, r) {
        const i = Object.keys(e);
        for (let o = 0; o < i.length; o++) {
          const a = e[i[o]];
          if (ArrayBuffer.isView(a) || (null == a ? void 0 : a.constructor) === s) {
            const t = a.constructor === s ? a : a.buffer;
            r.get(t) || (r.set(t, true), n.push(t));
          } else (null == a ? void 0 : a.constructor) !== Array && (null == a ? void 0 : a.constructor) !== Object || t(a, n, r);
        }
      }({object: t}, e, new Map), e;
    }
    var c = function (t, e, n, r) {
      return new (n || (n = Promise))(function (i, o) {
        function a(t) {
          try {
            u(r.next(t));
          } catch (t) {
            o(t);
          }
        }
        function s(t) {
          try {
            u(r.throw(t));
          } catch (t) {
            o(t);
          }
        }
        function u(t) {
          var e;
          t.done ? i(t.value) : (e = t.value, e instanceof n ? e : new n(function (t) {
            t(e);
          })).then(a, s);
        }
        u((r = r.apply(t, e || [])).next());
      });
    };
    self.addEventListener("message", t => c(void 0, void 0, void 0, function* () {
      const e = a[t.data.id];
      if (!e) throw new Error("command does not exist on worker..");
      {
        const n = t.data.data;
        try {
          const r = yield e(...n), i = u(r);
          self.postMessage({data: r, uuid: t.data.uuid, id: t.data.id}, i);
        } catch (e) {
          self.postMessage({data: null, uuid: t.data.uuid, id: t.data.id});
        }
      }
    }));
  }]);
  