! function(t) {
    var n = {};

    function e(i) {
        if (n[i]) return n[i].exports;
        var r = n[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return t[i].call(r.exports, r, r.exports, e), r.l = !0, r.exports
    }
    e.m = t, e.c = n, e.d = function(t, n, i) {
        e.o(t, n) || Object.defineProperty(t, n, {
            enumerable: !0,
            get: i
        })
    }, e.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, e.t = function(t, n) {
        if (1 & n && (t = e(t)), 8 & n) return t;
        if (4 & n && "object" == typeof t && t && t.__esModule) return t;
        var i = Object.create(null);
        if (e.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: t
            }), 2 & n && "string" != typeof t)
            for (var r in t) e.d(i, r, function(n) {
                return t[n]
            }.bind(null, r));
        return i
    }, e.n = function(t) {
        var n = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return e.d(n, "a", n), n
    }, e.o = function(t, n) {
        return Object.prototype.hasOwnProperty.call(t, n)
    }, e.p = "", e(e.s = 109)
}([function(t, n, e) {
    (function(n) {
        var e = function(t) {
            return t && t.Math == Math && t
        };
        t.exports = e("object" == typeof globalThis && globalThis) || e("object" == typeof window && window) || e("object" == typeof self && self) || e("object" == typeof n && n) || Function("return this")()
    }).call(this, e(37))
}, function(t, n, e) {
    var i = e(0),
        r = e(43),
        o = e(3),
        a = e(44),
        s = e(51),
        d = e(79),
        c = r("wks"),
        u = i.Symbol,
        l = d ? u : u && u.withoutSetter || a;
    t.exports = function(t) {
        return o(c, t) || (s && o(u, t) ? c[t] = u[t] : c[t] = l("Symbol." + t)), c[t]
    }
}, function(t, n) {
    t.exports = function(t) {
        try {
            return !!t()
        } catch (t) {
            return !0
        }
    }
}, function(t, n) {
    var e = {}.hasOwnProperty;
    t.exports = function(t, n) {
        return e.call(t, n)
    }
}, function(t, n, e) {
    var i = e(8);
    t.exports = function(t) {
        if (!i(t)) throw TypeError(String(t) + " is not an object");
        return t
    }
}, function(t, n, e) {
    var i = e(0),
        r = e(23).f,
        o = e(7),
        a = e(12),
        s = e(26),
        d = e(71),
        c = e(48);
    t.exports = function(t, n) {
        var e, u, l, A, m, p = t.target,
            f = t.global,
            g = t.stat;
        if (e = f ? i : g ? i[p] || s(p, {}) : (i[p] || {}).prototype)
            for (u in n) {
                if (A = n[u], l = t.noTargetGet ? (m = r(e, u)) && m.value : e[u], !c(f ? u : p + (g ? "." : "#") + u, t.forced) && void 0 !== l) {
                    if (typeof A == typeof l) continue;
                    d(A, l)
                }(t.sham || l && l.sham) && o(A, "sham", !0), a(e, u, A, t)
            }
    }
}, function(t, n, e) {
    var i = e(2);
    t.exports = !i((function() {
        return 7 != Object.defineProperty({}, 1, {
            get: function() {
                return 7
            }
        })[1]
    }))
}, function(t, n, e) {
    var i = e(6),
        r = e(9),
        o = e(19);
    t.exports = i ? function(t, n, e) {
        return r.f(t, n, o(1, e))
    } : function(t, n, e) {
        return t[n] = e, t
    }
}, function(t, n) {
    t.exports = function(t) {
        return "object" == typeof t ? null !== t : "function" == typeof t
    }
}, function(t, n, e) {
    var i = e(6),
        r = e(41),
        o = e(4),
        a = e(40),
        s = Object.defineProperty;
    n.f = i ? s : function(t, n, e) {
        if (o(t), n = a(n, !0), o(e), r) try {
            return s(t, n, e)
        } catch (t) {}
        if ("get" in e || "set" in e) throw TypeError("Accessors not supported");
        return "value" in e && (t[n] = e.value), t
    }
}, function(t, n, e) {
    var i = e(30),
        r = e(0),
        o = function(t) {
            return "function" == typeof t ? t : void 0
        };
    t.exports = function(t, n) {
        return arguments.length < 2 ? o(i[t]) || o(r[t]) : i[t] && i[t][n] || r[t] && r[t][n]
    }
}, function(t, n, e) {
    (function(e) {
        var i, r, o;
        ! function(e, a) {
            if (e) {
                var s = {},
                    d = e.TraceKit,
                    c = [].slice,
                    u = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
                s.noConflict = function() {
                    return e.TraceKit = d, s
                }, s.wrap = function(t) {
                    return function() {
                        try {
                            return t.apply(this, arguments)
                        } catch (t) {
                            throw s.report(t), t
                        }
                    }
                }, s.report = function() {
                    var t, n, i = [],
                        r = null,
                        o = null;

                    function a(t, n, e) {
                        var r = null;
                        if (!n || s.collectWindowErrors) {
                            for (var o in i)
                                if (l(i, o)) try {
                                    i[o](t, n, e)
                                } catch (t) {
                                    r = t
                                }
                            if (r) throw r
                        }
                    }

                    function d(n, e, i, r, d) {
                        if (o) s.computeStackTrace.augmentStackTraceWithInitialElement(o, e, i, n), c();
                        else if (d) a(s.computeStackTrace(d), !0, d);
                        else {
                            var l, A = {
                                    url: e,
                                    line: i,
                                    column: r
                                },
                                m = n;
                            if ("[object String]" === {}.toString.call(n)) {
                                var p = n.match(u);
                                p && (l = p[1], m = p[2])
                            }
                            A.func = s.computeStackTrace.guessFunctionName(A.url, A.line), A.context = s.computeStackTrace.gatherContext(A.url, A.line), a({
                                name: l,
                                message: m,
                                mode: "onerror",
                                stack: [A]
                            }, !0, null)
                        }
                        return !!t && t.apply(this, arguments)
                    }

                    function c() {
                        var t = o,
                            n = r;
                        o = null, r = null, a(t, !1, n)
                    }

                    function A(t) {
                        if (o) {
                            if (r === t) return;
                            c()
                        }
                        var n = s.computeStackTrace(t);
                        throw o = n, r = t, setTimeout((function() {
                            r === t && c()
                        }), n.incomplete ? 2e3 : 0), t
                    }
                    return A.subscribe = function(r) {
                        ! function() {
                            if (!0 === n) return;
                            t = e.onerror, e.onerror = d, n = !0
                        }(), i.push(r)
                    }, A.unsubscribe = function(r) {
                        for (var o = i.length - 1; o >= 0; --o) i[o] === r && i.splice(o, 1);
                        0 === i.length && (e.onerror = t, n = !1)
                    }, A
                }(), s.computeStackTrace = function() {
                    var t = {};

                    function n(n) {
                        if ("string" != typeof n) return [];
                        if (!l(t, n)) {
                            var i = "",
                                r = "";
                            try {
                                r = e.document.domain
                            } catch (t) {}
                            var o = /(.*)\:\/\/([^:\/]+)([:\d]*)\/{0,1}([\s\S]*)/.exec(n);
                            o && o[2] === r && (i = function(t) {
                                if (!s.remoteFetching) return "";
                                try {
                                    var n = function() {
                                        try {
                                            return new e.XMLHttpRequest
                                        } catch (t) {
                                            return new e.ActiveXObject("Microsoft.XMLHTTP")
                                        }
                                    }();
                                    return n.open("GET", t, !1), n.send(""), n.responseText
                                } catch (t) {
                                    return ""
                                }
                            }(n)), t[n] = i ? i.split("\n") : []
                        }
                        return t[n]
                    }

                    function i(t, e) {
                        var i, r = /function ([^(]*)\(([^)]*)\)/,
                            o = /['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/,
                            a = "",
                            s = n(t);
                        if (!s.length) return "?";
                        for (var d = 0; d < 10; ++d)
                            if (!A(a = s[e - d] + a)) {
                                if (i = o.exec(a)) return i[1];
                                if (i = r.exec(a)) return i[1]
                            } return "?"
                    }

                    function r(t, e) {
                        var i = n(t);
                        if (!i.length) return null;
                        var r = [],
                            o = Math.floor(s.linesOfContext / 2),
                            a = o + s.linesOfContext % 2,
                            d = Math.max(0, e - o - 1),
                            c = Math.min(i.length, e + a - 1);
                        e -= 1;
                        for (var u = d; u < c; ++u) A(i[u]) || r.push(i[u]);
                        return r.length > 0 ? r : null
                    }

                    function o(t) {
                        return t.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g, "\\$&")
                    }

                    function a(t) {
                        return o(t).replace("<", "(?:<|&lt;)").replace(">", "(?:>|&gt;)").replace("&", "(?:&|&amp;)").replace('"', '(?:"|&quot;)').replace(/\s+/g, "\\s+")
                    }

                    function d(t, e) {
                        for (var i, r, o = 0, a = e.length; o < a; ++o)
                            if ((i = n(e[o])).length && (i = i.join("\n"), r = t.exec(i))) return {
                                url: e[o],
                                line: i.substring(0, r.index).split("\n").length,
                                column: r.index - i.lastIndexOf("\n", r.index) - 1
                            };
                        return null
                    }

                    function c(t, e, i) {
                        var r, a = n(e),
                            s = new RegExp("\\b" + o(t) + "\\b");
                        return i -= 1, a && a.length > i && (r = s.exec(a[i])) ? r.index : null
                    }

                    function u(t) {
                        if (!A(e && e.document)) {
                            for (var n, i, r, s, c = [e.location.href], u = e.document.getElementsByTagName("script"), l = "" + t, m = 0; m < u.length; ++m) {
                                var p = u[m];
                                p.src && c.push(p.src)
                            }
                            if (r = /^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/.exec(l)) {
                                var f = r[1] ? "\\s+" + r[1] : "",
                                    g = r[2].split(",").join("\\s*,\\s*");
                                n = o(r[3]).replace(/;$/, ";?"), i = new RegExp("function" + f + "\\s*\\(\\s*" + g + "\\s*\\)\\s*{\\s*" + n + "\\s*}")
                            } else i = new RegExp(o(l).replace(/\s+/g, "\\s+"));
                            if (s = d(i, c)) return s;
                            if (r = /^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/.exec(l)) {
                                var h = r[1];
                                if (n = a(r[2]), s = d(i = new RegExp("on" + h + "=[\\'\"]\\s*" + n + "\\s*[\\'\"]", "i"), c[0])) return s;
                                if (s = d(i = new RegExp(n), c)) return s
                            }
                            return null
                        }
                    }

                    function m(t) {
                        if (!t.stack) return null;
                        for (var n, e, o, a = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, s = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, d = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, u = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, l = /\((\S*)(?::(\d+))(?::(\d+))\)/, m = t.stack.split("\n"), p = [], f = /^(.*) is undefined$/.exec(t.message), g = 0, h = m.length; g < h; ++g) {
                            if (e = a.exec(m[g])) {
                                var w = e[2] && 0 === e[2].indexOf("native");
                                e[2] && 0 === e[2].indexOf("eval") && (n = l.exec(e[2])) && (e[2] = n[1], e[3] = n[2], e[4] = n[3]), o = {
                                    url: w ? null : e[2],
                                    func: e[1] || "?",
                                    args: w ? [e[2]] : [],
                                    line: e[3] ? +e[3] : null,
                                    column: e[4] ? +e[4] : null
                                }
                            } else if (e = d.exec(m[g])) o = {
                                url: e[2],
                                func: e[1] || "?",
                                args: [],
                                line: +e[3],
                                column: e[4] ? +e[4] : null
                            };
                            else {
                                if (!(e = s.exec(m[g]))) continue;
                                e[3] && e[3].indexOf(" > eval") > -1 && (n = u.exec(e[3])) ? (e[3] = n[1], e[4] = n[2], e[5] = null) : 0 !== g || e[5] || A(t.columnNumber) || (p[0].column = t.columnNumber + 1), o = {
                                    url: e[3],
                                    func: e[1] || "?",
                                    args: e[2] ? e[2].split(",") : [],
                                    line: e[4] ? +e[4] : null,
                                    column: e[5] ? +e[5] : null
                                }
                            }!o.func && o.line && (o.func = i(o.url, o.line)), o.context = o.line ? r(o.url, o.line) : null, p.push(o)
                        }
                        return p.length ? (p[0] && p[0].line && !p[0].column && f && (p[0].column = c(f[1], p[0].url, p[0].line)), {
                            mode: "stack",
                            name: t.name,
                            message: t.message,
                            stack: p
                        }) : null
                    }

                    function p(t, n, e, o) {
                        var a = {
                            url: n,
                            line: e
                        };
                        if (a.url && a.line) {
                            t.incomplete = !1, a.func || (a.func = i(a.url, a.line)), a.context || (a.context = r(a.url, a.line));
                            var s = / '([^']+)' /.exec(o);
                            if (s && (a.column = c(s[1], a.url, a.line)), t.stack.length > 0 && t.stack[0].url === a.url) {
                                if (t.stack[0].line === a.line) return !1;
                                if (!t.stack[0].line && t.stack[0].func === a.func) return t.stack[0].line = a.line, t.stack[0].context = a.context, !1
                            }
                            return t.stack.unshift(a), t.partial = !0, !0
                        }
                        return t.incomplete = !0, !1
                    }

                    function f(t, n) {
                        for (var e, r, o, a = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, d = [], l = {}, A = !1, m = f.caller; m && !A; m = m.caller)
                            if (m !== g && m !== s.report) {
                                if (r = {
                                        url: null,
                                        func: "?",
                                        args: [],
                                        line: null,
                                        column: null
                                    }, m.name ? r.func = m.name : (e = a.exec(m.toString())) && (r.func = e[1]), void 0 === r.func) try {
                                    r.func = e.input.substring(0, e.input.indexOf("{"))
                                } catch (t) {}
                                if (o = u(m)) {
                                    r.url = o.url, r.line = o.line, "?" === r.func && (r.func = i(r.url, r.line));
                                    var h = / '([^']+)' /.exec(t.message || t.description);
                                    h && (r.column = c(h[1], o.url, o.line))
                                }
                                l["" + m] ? A = !0 : l["" + m] = !0, d.push(r)
                            } n && d.splice(0, n);
                        var w = {
                            mode: "callers",
                            name: t.name,
                            message: t.message,
                            stack: d
                        };
                        return p(w, t.sourceURL || t.fileName, t.line || t.lineNumber, t.message || t.description), w
                    }

                    function g(t, o) {
                        var s = null;
                        o = null == o ? 0 : +o;
                        try {
                            if (s = function(t) {
                                    var n = t.stacktrace;
                                    if (n) {
                                        for (var e, o = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i, a = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i, s = n.split("\n"), d = [], c = 0; c < s.length; c += 2) {
                                            var u = null;
                                            if ((e = o.exec(s[c])) ? u = {
                                                    url: e[2],
                                                    line: +e[1],
                                                    column: null,
                                                    func: e[3],
                                                    args: []
                                                } : (e = a.exec(s[c])) && (u = {
                                                    url: e[6],
                                                    line: +e[1],
                                                    column: +e[2],
                                                    func: e[3] || e[4],
                                                    args: e[5] ? e[5].split(",") : []
                                                }), u) {
                                                if (!u.func && u.line && (u.func = i(u.url, u.line)), u.line) try {
                                                    u.context = r(u.url, u.line)
                                                } catch (t) {}
                                                u.context || (u.context = [s[c + 1]]), d.push(u)
                                            }
                                        }
                                        return d.length ? {
                                            mode: "stacktrace",
                                            name: t.name,
                                            message: t.message,
                                            stack: d
                                        } : null
                                    }
                                }(t)) return s
                        } catch (t) {
                            0
                        }
                        try {
                            if (s = m(t)) return s
                        } catch (t) {
                            0
                        }
                        try {
                            if (s = function(t) {
                                    var o = t.message.split("\n");
                                    if (o.length < 4) return null;
                                    var s, c = /^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i,
                                        u = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i,
                                        A = /^\s*Line (\d+) of function script\s*$/i,
                                        m = [],
                                        p = e && e.document && e.document.getElementsByTagName("script"),
                                        f = [];
                                    for (var g in p) l(p, g) && !p[g].src && f.push(p[g]);
                                    for (var h = 2; h < o.length; h += 2) {
                                        var w = null;
                                        if (s = c.exec(o[h])) w = {
                                            url: s[2],
                                            func: s[3],
                                            args: [],
                                            line: +s[1],
                                            column: null
                                        };
                                        else if (s = u.exec(o[h])) {
                                            w = {
                                                url: s[3],
                                                func: s[4],
                                                args: [],
                                                line: +s[1],
                                                column: null
                                            };
                                            var y = +s[1],
                                                k = f[s[2] - 1];
                                            if (k) {
                                                var v = n(w.url);
                                                if (v) {
                                                    var b = (v = v.join("\n")).indexOf(k.innerText);
                                                    b >= 0 && (w.line = y + v.substring(0, b).split("\n").length)
                                                }
                                            }
                                        } else if (s = A.exec(o[h])) {
                                            var S = e.location.href.replace(/#.*$/, ""),
                                                E = d(new RegExp(a(o[h + 1])), [S]);
                                            w = {
                                                url: S,
                                                func: "",
                                                args: [],
                                                line: E ? E.line : s[1],
                                                column: null
                                            }
                                        }
                                        if (w) {
                                            w.func || (w.func = i(w.url, w.line));
                                            var x = r(w.url, w.line),
                                                T = x ? x[Math.floor(x.length / 2)] : null;
                                            x && T.replace(/^\s*/, "") === o[h + 1].replace(/^\s*/, "") ? w.context = x : w.context = [o[h + 1]], m.push(w)
                                        }
                                    }
                                    return m.length ? {
                                        mode: "multiline",
                                        name: t.name,
                                        message: o[0],
                                        stack: m
                                    } : null
                                }(t)) return s
                        } catch (t) {
                            0
                        }
                        try {
                            if (s = f(t, o + 1)) return s
                        } catch (t) {
                            0
                        }
                        return {
                            name: t.name,
                            message: t.message,
                            mode: "failed"
                        }
                    }
                    return g.augmentStackTraceWithInitialElement = p, g.computeStackTraceFromStackProp = m, g.guessFunctionName = i, g.gatherContext = r, g.ofCaller = function(t) {
                        t = 1 + (null == t ? 0 : +t);
                        try {
                            throw new Error
                        } catch (n) {
                            return g(n, t + 1)
                        }
                    }, g.getSource = n, g
                }(), s.extendToAsynchronousCallbacks = function() {
                    var t = function(t) {
                        var n = e[t];
                        e[t] = function() {
                            var t = c.call(arguments),
                                e = t[0];
                            return "function" == typeof e && (t[0] = s.wrap(e)), n.apply ? n.apply(this, t) : n(t[0], t[1])
                        }
                    };
                    t("setTimeout"), t("setInterval")
                }, s.remoteFetching || (s.remoteFetching = !0), s.collectWindowErrors || (s.collectWindowErrors = !0), (!s.linesOfContext || s.linesOfContext < 1) && (s.linesOfContext = 11), r = [], void 0 === (o = "function" == typeof(i = s) ? i.apply(n, r) : i) || (t.exports = o)
            }

            function l(t, n) {
                return Object.prototype.hasOwnProperty.call(t, n)
            }

            function A(t) {
                return void 0 === t
            }
        }("undefined" != typeof window ? window : e)
    }).call(this, e(37))
}, function(t, n, e) {
    var i = e(0),
        r = e(7),
        o = e(3),
        a = e(26),
        s = e(27),
        d = e(15),
        c = d.get,
        u = d.enforce,
        l = String(String).split("String");
    (t.exports = function(t, n, e, s) {
        var d = !!s && !!s.unsafe,
            c = !!s && !!s.enumerable,
            A = !!s && !!s.noTargetGet;
        "function" == typeof e && ("string" != typeof n || o(e, "name") || r(e, "name", n), u(e).source = l.join("string" == typeof n ? n : "")), t !== i ? (d ? !A && t[n] && (c = !0) : delete t[n], c ? t[n] = e : r(t, n, e)) : c ? t[n] = e : a(n, e)
    })(Function.prototype, "toString", (function() {
        return "function" == typeof this && c(this).source || s(this)
    }))
}, function(t, n) {
    t.exports = function(t) {
        if ("function" != typeof t) throw TypeError(String(t) + " is not a function");
        return t
    }
}, function(t, n) {
    var e = {}.toString;
    t.exports = function(t) {
        return e.call(t).slice(8, -1)
    }
}, function(t, n, e) {
    var i, r, o, a = e(70),
        s = e(0),
        d = e(8),
        c = e(7),
        u = e(3),
        l = e(28),
        A = e(29),
        m = s.WeakMap;
    if (a) {
        var p = new m,
            f = p.get,
            g = p.has,
            h = p.set;
        i = function(t, n) {
            return h.call(p, t, n), n
        }, r = function(t) {
            return f.call(p, t) || {}
        }, o = function(t) {
            return g.call(p, t)
        }
    } else {
        var w = l("state");
        A[w] = !0, i = function(t, n) {
            return c(t, w, n), n
        }, r = function(t) {
            return u(t, w) ? t[w] : {}
        }, o = function(t) {
            return u(t, w)
        }
    }
    t.exports = {
        set: i,
        get: r,
        has: o,
        enforce: function(t) {
            return o(t) ? r(t) : i(t, {})
        },
        getterFor: function(t) {
            return function(n) {
                var e;
                if (!d(n) || (e = r(n)).type !== t) throw TypeError("Incompatible receiver, " + t + " required");
                return e
            }
        }
    }
}, function(t, n) {
    t.exports = !1
}, function(t, n) {
    t.exports = {}
}, function(t, n, e) {
    "use strict";
    var i = e(13),
        r = function(t) {
            var n, e;
            this.promise = new t((function(t, i) {
                if (void 0 !== n || void 0 !== e) throw TypeError("Bad Promise constructor");
                n = t, e = i
            })), this.resolve = i(n), this.reject = i(e)
        };
    t.exports.f = function(t) {
        return new r(t)
    }
}, function(t, n) {
    t.exports = function(t, n) {
        return {
            enumerable: !(1 & t),
            configurable: !(2 & t),
            writable: !(4 & t),
            value: n
        }
    }
}, function(t, n, e) {
    var i = e(39),
        r = e(24);
    t.exports = function(t) {
        return i(r(t))
    }
}, function(t, n, e) {
    var i = e(4),
        r = e(95),
        o = e(46),
        a = e(58),
        s = e(96),
        d = e(97),
        c = function(t, n) {
            this.stopped = t, this.result = n
        };
    (t.exports = function(t, n, e, u, l) {
        var A, m, p, f, g, h, w, y = a(n, e, u ? 2 : 1);
        if (l) A = t;
        else {
            if ("function" != typeof(m = s(t))) throw TypeError("Target is not iterable");
            if (r(m)) {
                for (p = 0, f = o(t.length); f > p; p++)
                    if ((g = u ? y(i(w = t[p])[0], w[1]) : y(t[p])) && g instanceof c) return g;
                return new c(!1)
            }
            A = m.call(t)
        }
        for (h = A.next; !(w = h.call(A)).done;)
            if ("object" == typeof(g = d(A, y, w.value, u)) && g && g instanceof c) return g;
        return new c(!1)
    }).stop = function(t) {
        return new c(!0, t)
    }
}, function(t, n) {
    t.exports = function(t) {
        try {
            return {
                error: !1,
                value: t()
            }
        } catch (t) {
            return {
                error: !0,
                value: t
            }
        }
    }
}, function(t, n, e) {
    var i = e(6),
        r = e(38),
        o = e(19),
        a = e(20),
        s = e(40),
        d = e(3),
        c = e(41),
        u = Object.getOwnPropertyDescriptor;
    n.f = i ? u : function(t, n) {
        if (t = a(t), n = s(n, !0), c) try {
            return u(t, n)
        } catch (t) {}
        if (d(t, n)) return o(!r.f.call(t, n), t[n])
    }
}, function(t, n) {
    t.exports = function(t) {
        if (null == t) throw TypeError("Can't call method on " + t);
        return t
    }
}, function(t, n, e) {
    var i = e(0),
        r = e(8),
        o = i.document,
        a = r(o) && r(o.createElement);
    t.exports = function(t) {
        return a ? o.createElement(t) : {}
    }
}, function(t, n, e) {
    var i = e(0),
        r = e(7);
    t.exports = function(t, n) {
        try {
            r(i, t, n)
        } catch (e) {
            i[t] = n
        }
        return n
    }
}, function(t, n, e) {
    var i = e(42),
        r = Function.toString;
    "function" != typeof i.inspectSource && (i.inspectSource = function(t) {
        return r.call(t)
    }), t.exports = i.inspectSource
}, function(t, n, e) {
    var i = e(43),
        r = e(44),
        o = i("keys");
    t.exports = function(t) {
        return o[t] || (o[t] = r(t))
    }
}, function(t, n) {
    t.exports = {}
}, function(t, n, e) {
    var i = e(0);
    t.exports = i
}, function(t, n) {
    var e = Math.ceil,
        i = Math.floor;
    t.exports = function(t) {
        return isNaN(t = +t) ? 0 : (t > 0 ? i : e)(t)
    }
}, function(t, n) {
    t.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]
}, function(t, n, e) {
    var i = {};
    i[e(1)("toStringTag")] = "z", t.exports = "[object z]" === String(i)
}, function(t, n, e) {
    var i = e(3),
        r = e(50),
        o = e(28),
        a = e(84),
        s = o("IE_PROTO"),
        d = Object.prototype;
    t.exports = a ? Object.getPrototypeOf : function(t) {
        return t = r(t), i(t, s) ? t[s] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? d : null
    }
}, function(t, n, e) {
    var i, r = e(4),
        o = e(85),
        a = e(32),
        s = e(29),
        d = e(55),
        c = e(25),
        u = e(28),
        l = u("IE_PROTO"),
        A = function() {},
        m = function(t) {
            return "<script>" + t + "<\/script>"
        },
        p = function() {
            try {
                i = document.domain && new ActiveXObject("htmlfile")
            } catch (t) {}
            var t, n;
            p = i ? function(t) {
                t.write(m("")), t.close();
                var n = t.parentWindow.Object;
                return t = null, n
            }(i) : ((n = c("iframe")).style.display = "none", d.appendChild(n), n.src = String("javascript:"), (t = n.contentWindow.document).open(), t.write(m("document.F=Object")), t.close(), t.F);
            for (var e = a.length; e--;) delete p.prototype[a[e]];
            return p()
        };
    s[l] = !0, t.exports = Object.create || function(t, n) {
        var e;
        return null !== t ? (A.prototype = r(t), e = new A, A.prototype = null, e[l] = t) : e = p(), void 0 === n ? e : o(e, n)
    }
}, function(t, n, e) {
    var i = e(9).f,
        r = e(3),
        o = e(1)("toStringTag");
    t.exports = function(t, n, e) {
        t && !r(t = e ? t : t.prototype, o) && i(t, o, {
            configurable: !0,
            value: n
        })
    }
}, function(t, n) {
    var e;
    e = function() {
        return this
    }();
    try {
        e = e || new Function("return this")()
    } catch (t) {
        "object" == typeof window && (e = window)
    }
    t.exports = e
}, function(t, n, e) {
    "use strict";
    var i = {}.propertyIsEnumerable,
        r = Object.getOwnPropertyDescriptor,
        o = r && !i.call({
            1: 2
        }, 1);
    n.f = o ? function(t) {
        var n = r(this, t);
        return !!n && n.enumerable
    } : i
}, function(t, n, e) {
    var i = e(2),
        r = e(14),
        o = "".split;
    t.exports = i((function() {
        return !Object("z").propertyIsEnumerable(0)
    })) ? function(t) {
        return "String" == r(t) ? o.call(t, "") : Object(t)
    } : Object
}, function(t, n, e) {
    var i = e(8);
    t.exports = function(t, n) {
        if (!i(t)) return t;
        var e, r;
        if (n && "function" == typeof(e = t.toString) && !i(r = e.call(t))) return r;
        if ("function" == typeof(e = t.valueOf) && !i(r = e.call(t))) return r;
        if (!n && "function" == typeof(e = t.toString) && !i(r = e.call(t))) return r;
        throw TypeError("Can't convert object to primitive value")
    }
}, function(t, n, e) {
    var i = e(6),
        r = e(2),
        o = e(25);
    t.exports = !i && !r((function() {
        return 7 != Object.defineProperty(o("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    }))
}, function(t, n, e) {
    var i = e(0),
        r = e(26),
        o = i["__core-js_shared__"] || r("__core-js_shared__", {});
    t.exports = o
}, function(t, n, e) {
    var i = e(16),
        r = e(42);
    (t.exports = function(t, n) {
        return r[t] || (r[t] = void 0 !== n ? n : {})
    })("versions", []).push({
        version: "3.6.4",
        mode: i ? "pure" : "global",
        copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
    })
}, function(t, n) {
    var e = 0,
        i = Math.random();
    t.exports = function(t) {
        return "Symbol(" + String(void 0 === t ? "" : t) + ")_" + (++e + i).toString(36)
    }
}, function(t, n, e) {
    var i = e(3),
        r = e(20),
        o = e(74).indexOf,
        a = e(29);
    t.exports = function(t, n) {
        var e, s = r(t),
            d = 0,
            c = [];
        for (e in s) !i(a, e) && i(s, e) && c.push(e);
        for (; n.length > d;) i(s, e = n[d++]) && (~o(c, e) || c.push(e));
        return c
    }
}, function(t, n, e) {
    var i = e(31),
        r = Math.min;
    t.exports = function(t) {
        return t > 0 ? r(i(t), 9007199254740991) : 0
    }
}, function(t, n) {
    n.f = Object.getOwnPropertySymbols
}, function(t, n, e) {
    var i = e(2),
        r = /#|\.prototype\./,
        o = function(t, n) {
            var e = s[a(t)];
            return e == c || e != d && ("function" == typeof n ? i(n) : !!n)
        },
        a = o.normalize = function(t) {
            return String(t).replace(r, ".").toLowerCase()
        },
        s = o.data = {},
        d = o.NATIVE = "N",
        c = o.POLYFILL = "P";
    t.exports = o
}, function(t, n, e) {
    var i = e(45),
        r = e(32);
    t.exports = Object.keys || function(t) {
        return i(t, r)
    }
}, function(t, n, e) {
    var i = e(24);
    t.exports = function(t) {
        return Object(i(t))
    }
}, function(t, n, e) {
    var i = e(2);
    t.exports = !!Object.getOwnPropertySymbols && !i((function() {
        return !String(Symbol())
    }))
}, function(t, n, e) {
    var i = e(33),
        r = e(14),
        o = e(1)("toStringTag"),
        a = "Arguments" == r(function() {
            return arguments
        }());
    t.exports = i ? r : function(t) {
        var n, e, i;
        return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof(e = function(t, n) {
            try {
                return t[n]
            } catch (t) {}
        }(n = Object(t), o)) ? e : a ? r(n) : "Object" == (i = r(n)) && "function" == typeof n.callee ? "Arguments" : i
    }
}, function(t, n, e) {
    "use strict";
    var i = e(5),
        r = e(83),
        o = e(34),
        a = e(56),
        s = e(36),
        d = e(7),
        c = e(12),
        u = e(1),
        l = e(16),
        A = e(17),
        m = e(54),
        p = m.IteratorPrototype,
        f = m.BUGGY_SAFARI_ITERATORS,
        g = u("iterator"),
        h = function() {
            return this
        };
    t.exports = function(t, n, e, u, m, w, y) {
        r(e, n, u);
        var k, v, b, S = function(t) {
                if (t === m && C) return C;
                if (!f && t in T) return T[t];
                switch (t) {
                    case "keys":
                    case "values":
                    case "entries":
                        return function() {
                            return new e(this, t)
                        }
                }
                return function() {
                    return new e(this)
                }
            },
            E = n + " Iterator",
            x = !1,
            T = t.prototype,
            z = T[g] || T["@@iterator"] || m && T[m],
            C = !f && z || S(m),
            B = "Array" == n && T.entries || z;
        if (B && (k = o(B.call(new t)), p !== Object.prototype && k.next && (l || o(k) === p || (a ? a(k, p) : "function" != typeof k[g] && d(k, g, h)), s(k, E, !0, !0), l && (A[E] = h))), "values" == m && z && "values" !== z.name && (x = !0, C = function() {
                return z.call(this)
            }), l && !y || T[g] === C || d(T, g, C), A[n] = C, m)
            if (v = {
                    values: S("values"),
                    keys: w ? C : S("keys"),
                    entries: S("entries")
                }, y)
                for (b in v) !f && !x && b in T || c(T, b, v[b]);
            else i({
                target: n,
                proto: !0,
                forced: f || x
            }, v);
        return v
    }
}, function(t, n, e) {
    "use strict";
    var i, r, o, a = e(34),
        s = e(7),
        d = e(3),
        c = e(1),
        u = e(16),
        l = c("iterator"),
        A = !1;
    [].keys && ("next" in (o = [].keys()) ? (r = a(a(o))) !== Object.prototype && (i = r) : A = !0), null == i && (i = {}), u || d(i, l) || s(i, l, (function() {
        return this
    })), t.exports = {
        IteratorPrototype: i,
        BUGGY_SAFARI_ITERATORS: A
    }
}, function(t, n, e) {
    var i = e(10);
    t.exports = i("document", "documentElement")
}, function(t, n, e) {
    var i = e(4),
        r = e(86);
    t.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
        var t, n = !1,
            e = {};
        try {
            (t = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(e, []), n = e instanceof Array
        } catch (t) {}
        return function(e, o) {
            return i(e), r(o), n ? t.call(e, o) : e.__proto__ = o, e
        }
    }() : void 0)
}, function(t, n, e) {
    var i = e(0);
    t.exports = i.Promise
}, function(t, n, e) {
    var i = e(13);
    t.exports = function(t, n, e) {
        if (i(t), void 0 === n) return t;
        switch (e) {
            case 0:
                return function() {
                    return t.call(n)
                };
            case 1:
                return function(e) {
                    return t.call(n, e)
                };
            case 2:
                return function(e, i) {
                    return t.call(n, e, i)
                };
            case 3:
                return function(e, i, r) {
                    return t.call(n, e, i, r)
                }
        }
        return function() {
            return t.apply(n, arguments)
        }
    }
}, function(t, n, e) {
    var i = e(4),
        r = e(13),
        o = e(1)("species");
    t.exports = function(t, n) {
        var e, a = i(t).constructor;
        return void 0 === a || null == (e = i(a)[o]) ? n : r(e)
    }
}, function(t, n, e) {
    var i, r, o, a = e(0),
        s = e(2),
        d = e(14),
        c = e(58),
        u = e(55),
        l = e(25),
        A = e(61),
        m = a.location,
        p = a.setImmediate,
        f = a.clearImmediate,
        g = a.process,
        h = a.MessageChannel,
        w = a.Dispatch,
        y = 0,
        k = {},
        v = function(t) {
            if (k.hasOwnProperty(t)) {
                var n = k[t];
                delete k[t], n()
            }
        },
        b = function(t) {
            return function() {
                v(t)
            }
        },
        S = function(t) {
            v(t.data)
        },
        E = function(t) {
            a.postMessage(t + "", m.protocol + "//" + m.host)
        };
    p && f || (p = function(t) {
        for (var n = [], e = 1; arguments.length > e;) n.push(arguments[e++]);
        return k[++y] = function() {
            ("function" == typeof t ? t : Function(t)).apply(void 0, n)
        }, i(y), y
    }, f = function(t) {
        delete k[t]
    }, "process" == d(g) ? i = function(t) {
        g.nextTick(b(t))
    } : w && w.now ? i = function(t) {
        w.now(b(t))
    } : h && !A ? (o = (r = new h).port2, r.port1.onmessage = S, i = c(o.postMessage, o, 1)) : !a.addEventListener || "function" != typeof postMessage || a.importScripts || s(E) ? i = "onreadystatechange" in l("script") ? function(t) {
        u.appendChild(l("script")).onreadystatechange = function() {
            u.removeChild(this), v(t)
        }
    } : function(t) {
        setTimeout(b(t), 0)
    } : (i = E, a.addEventListener("message", S, !1))), t.exports = {
        set: p,
        clear: f
    }
}, function(t, n, e) {
    var i = e(62);
    t.exports = /(iphone|ipod|ipad).*applewebkit/i.test(i)
}, function(t, n, e) {
    var i = e(10);
    t.exports = i("navigator", "userAgent") || ""
}, function(t, n, e) {
    var i = e(4),
        r = e(8),
        o = e(18);
    t.exports = function(t, n) {
        if (i(t), r(n) && n.constructor === t) return n;
        var e = o.f(t);
        return (0, e.resolve)(n), e.promise
    }
}, function(t, n, e) {
    "use strict";
    var i = e(5),
        r = e(13),
        o = e(18),
        a = e(22),
        s = e(21);
    i({
        target: "Promise",
        stat: !0
    }, {
        allSettled: function(t) {
            var n = this,
                e = o.f(n),
                i = e.resolve,
                d = e.reject,
                c = a((function() {
                    var e = r(n.resolve),
                        o = [],
                        a = 0,
                        d = 1;
                    s(t, (function(t) {
                        var r = a++,
                            s = !1;
                        o.push(void 0), d++, e.call(n, t).then((function(t) {
                            s || (s = !0, o[r] = {
                                status: "fulfilled",
                                value: t
                            }, --d || i(o))
                        }), (function(t) {
                            s || (s = !0, o[r] = {
                                status: "rejected",
                                reason: t
                            }, --d || i(o))
                        }))
                    })), --d || i(o)
                }));
            return c.error && d(c.value), e.promise
        }
    })
}, function(t, n, e) {
    var i = e(68);
    t.exports = i
}, function(t, n, e) {
    var i = e(77);
    e(103), e(104), e(105), e(106), t.exports = i
}, function(t) {
    t.exports = JSON.parse('{"a":"https://game-cdn.poki.comsa/scripts/prebid/2.44.4-0.js"}')
}, function(t, n, e) {
    e(69);
    var i = e(30);
    t.exports = i.Object.assign
}, function(t, n, e) {
    var i = e(5),
        r = e(76);
    i({
        target: "Object",
        stat: !0,
        forced: Object.assign !== r
    }, {
        assign: r
    })
}, function(t, n, e) {
    var i = e(0),
        r = e(27),
        o = i.WeakMap;
    t.exports = "function" == typeof o && /native code/.test(r(o))
}, function(t, n, e) {
    var i = e(3),
        r = e(72),
        o = e(23),
        a = e(9);
    t.exports = function(t, n) {
        for (var e = r(n), s = a.f, d = o.f, c = 0; c < e.length; c++) {
            var u = e[c];
            i(t, u) || s(t, u, d(n, u))
        }
    }
}, function(t, n, e) {
    var i = e(10),
        r = e(73),
        o = e(47),
        a = e(4);
    t.exports = i("Reflect", "ownKeys") || function(t) {
        var n = r.f(a(t)),
            e = o.f;
        return e ? n.concat(e(t)) : n
    }
}, function(t, n, e) {
    var i = e(45),
        r = e(32).concat("length", "prototype");
    n.f = Object.getOwnPropertyNames || function(t) {
        return i(t, r)
    }
}, function(t, n, e) {
    var i = e(20),
        r = e(46),
        o = e(75),
        a = function(t) {
            return function(n, e, a) {
                var s, d = i(n),
                    c = r(d.length),
                    u = o(a, c);
                if (t && e != e) {
                    for (; c > u;)
                        if ((s = d[u++]) != s) return !0
                } else
                    for (; c > u; u++)
                        if ((t || u in d) && d[u] === e) return t || u || 0;
                return !t && -1
            }
        };
    t.exports = {
        includes: a(!0),
        indexOf: a(!1)
    }
}, function(t, n, e) {
    var i = e(31),
        r = Math.max,
        o = Math.min;
    t.exports = function(t, n) {
        var e = i(t);
        return e < 0 ? r(e + n, 0) : o(e, n)
    }
}, function(t, n, e) {
    "use strict";
    var i = e(6),
        r = e(2),
        o = e(49),
        a = e(47),
        s = e(38),
        d = e(50),
        c = e(39),
        u = Object.assign,
        l = Object.defineProperty;
    t.exports = !u || r((function() {
        if (i && 1 !== u({
                b: 1
            }, u(l({}, "a", {
                enumerable: !0,
                get: function() {
                    l(this, "b", {
                        value: 3,
                        enumerable: !1
                    })
                }
            }), {
                b: 2
            })).b) return !0;
        var t = {},
            n = {},
            e = Symbol();
        return t[e] = 7, "abcdefghijklmnopqrst".split("").forEach((function(t) {
            n[t] = t
        })), 7 != u({}, t)[e] || "abcdefghijklmnopqrst" != o(u({}, n)).join("")
    })) ? function(t, n) {
        for (var e = d(t), r = arguments.length, u = 1, l = a.f, A = s.f; r > u;)
            for (var m, p = c(arguments[u++]), f = l ? o(p).concat(l(p)) : o(p), g = f.length, h = 0; g > h;) m = f[h++], i && !A.call(p, m) || (e[m] = p[m]);
        return e
    } : u
}, function(t, n, e) {
    e(78), e(81), e(87), e(91), e(64), e(102);
    var i = e(30);
    t.exports = i.Promise
}, function(t, n, e) {
    var i = e(33),
        r = e(12),
        o = e(80);
    i || r(Object.prototype, "toString", o, {
        unsafe: !0
    })
}, function(t, n, e) {
    var i = e(51);
    t.exports = i && !Symbol.sham && "symbol" == typeof Symbol.iterator
}, function(t, n, e) {
    "use strict";
    var i = e(33),
        r = e(52);
    t.exports = i ? {}.toString : function() {
        return "[object " + r(this) + "]"
    }
}, function(t, n, e) {
    "use strict";
    var i = e(82).charAt,
        r = e(15),
        o = e(53),
        a = r.set,
        s = r.getterFor("String Iterator");
    o(String, "String", (function(t) {
        a(this, {
            type: "String Iterator",
            string: String(t),
            index: 0
        })
    }), (function() {
        var t, n = s(this),
            e = n.string,
            r = n.index;
        return r >= e.length ? {
            value: void 0,
            done: !0
        } : (t = i(e, r), n.index += t.length, {
            value: t,
            done: !1
        })
    }))
}, function(t, n, e) {
    var i = e(31),
        r = e(24),
        o = function(t) {
            return function(n, e) {
                var o, a, s = String(r(n)),
                    d = i(e),
                    c = s.length;
                return d < 0 || d >= c ? t ? "" : void 0 : (o = s.charCodeAt(d)) < 55296 || o > 56319 || d + 1 === c || (a = s.charCodeAt(d + 1)) < 56320 || a > 57343 ? t ? s.charAt(d) : o : t ? s.slice(d, d + 2) : a - 56320 + (o - 55296 << 10) + 65536
            }
        };
    t.exports = {
        codeAt: o(!1),
        charAt: o(!0)
    }
}, function(t, n, e) {
    "use strict";
    var i = e(54).IteratorPrototype,
        r = e(35),
        o = e(19),
        a = e(36),
        s = e(17),
        d = function() {
            return this
        };
    t.exports = function(t, n, e) {
        var c = n + " Iterator";
        return t.prototype = r(i, {
            next: o(1, e)
        }), a(t, c, !1, !0), s[c] = d, t
    }
}, function(t, n, e) {
    var i = e(2);
    t.exports = !i((function() {
        function t() {}
        return t.prototype.constructor = null, Object.getPrototypeOf(new t) !== t.prototype
    }))
}, function(t, n, e) {
    var i = e(6),
        r = e(9),
        o = e(4),
        a = e(49);
    t.exports = i ? Object.defineProperties : function(t, n) {
        o(t);
        for (var e, i = a(n), s = i.length, d = 0; s > d;) r.f(t, e = i[d++], n[e]);
        return t
    }
}, function(t, n, e) {
    var i = e(8);
    t.exports = function(t) {
        if (!i(t) && null !== t) throw TypeError("Can't set " + String(t) + " as a prototype");
        return t
    }
}, function(t, n, e) {
    var i = e(0),
        r = e(88),
        o = e(89),
        a = e(7),
        s = e(1),
        d = s("iterator"),
        c = s("toStringTag"),
        u = o.values;
    for (var l in r) {
        var A = i[l],
            m = A && A.prototype;
        if (m) {
            if (m[d] !== u) try {
                a(m, d, u)
            } catch (t) {
                m[d] = u
            }
            if (m[c] || a(m, c, l), r[l])
                for (var p in o)
                    if (m[p] !== o[p]) try {
                        a(m, p, o[p])
                    } catch (t) {
                        m[p] = o[p]
                    }
        }
    }
}, function(t, n) {
    t.exports = {
        CSSRuleList: 0,
        CSSStyleDeclaration: 0,
        CSSValueList: 0,
        ClientRectList: 0,
        DOMRectList: 0,
        DOMStringList: 0,
        DOMTokenList: 1,
        DataTransferItemList: 0,
        FileList: 0,
        HTMLAllCollection: 0,
        HTMLCollection: 0,
        HTMLFormElement: 0,
        HTMLSelectElement: 0,
        MediaList: 0,
        MimeTypeArray: 0,
        NamedNodeMap: 0,
        NodeList: 1,
        PaintRequestList: 0,
        Plugin: 0,
        PluginArray: 0,
        SVGLengthList: 0,
        SVGNumberList: 0,
        SVGPathSegList: 0,
        SVGPointList: 0,
        SVGStringList: 0,
        SVGTransformList: 0,
        SourceBufferList: 0,
        StyleSheetList: 0,
        TextTrackCueList: 0,
        TextTrackList: 0,
        TouchList: 0
    }
}, function(t, n, e) {
    "use strict";
    var i = e(20),
        r = e(90),
        o = e(17),
        a = e(15),
        s = e(53),
        d = a.set,
        c = a.getterFor("Array Iterator");
    t.exports = s(Array, "Array", (function(t, n) {
        d(this, {
            type: "Array Iterator",
            target: i(t),
            index: 0,
            kind: n
        })
    }), (function() {
        var t = c(this),
            n = t.target,
            e = t.kind,
            i = t.index++;
        return !n || i >= n.length ? (t.target = void 0, {
            value: void 0,
            done: !0
        }) : "keys" == e ? {
            value: i,
            done: !1
        } : "values" == e ? {
            value: n[i],
            done: !1
        } : {
            value: [i, n[i]],
            done: !1
        }
    }), "values"), o.Arguments = o.Array, r("keys"), r("values"), r("entries")
}, function(t, n, e) {
    var i = e(1),
        r = e(35),
        o = e(9),
        a = i("unscopables"),
        s = Array.prototype;
    null == s[a] && o.f(s, a, {
        configurable: !0,
        value: r(null)
    }), t.exports = function(t) {
        s[a][t] = !0
    }
}, function(t, n, e) {
    "use strict";
    var i, r, o, a, s = e(5),
        d = e(16),
        c = e(0),
        u = e(10),
        l = e(57),
        A = e(12),
        m = e(92),
        p = e(36),
        f = e(93),
        g = e(8),
        h = e(13),
        w = e(94),
        y = e(14),
        k = e(27),
        v = e(21),
        b = e(98),
        S = e(59),
        E = e(60).set,
        x = e(99),
        T = e(63),
        z = e(100),
        C = e(18),
        B = e(22),
        I = e(15),
        _ = e(48),
        P = e(1),
        D = e(101),
        L = P("species"),
        O = "Promise",
        j = I.get,
        M = I.set,
        R = I.getterFor(O),
        Z = l,
        G = c.TypeError,
        F = c.document,
        H = c.process,
        N = u("fetch"),
        X = C.f,
        Q = X,
        U = "process" == y(H),
        W = !!(F && F.createEvent && c.dispatchEvent),
        V = _(O, (function() {
            if (!(k(Z) !== String(Z))) {
                if (66 === D) return !0;
                if (!U && "function" != typeof PromiseRejectionEvent) return !0
            }
            if (d && !Z.prototype.finally) return !0;
            if (D >= 51 && /native code/.test(Z)) return !1;
            var t = Z.resolve(1),
                n = function(t) {
                    t((function() {}), (function() {}))
                };
            return (t.constructor = {})[L] = n, !(t.then((function() {})) instanceof n)
        })),
        q = V || !b((function(t) {
            Z.all(t).catch((function() {}))
        })),
        K = function(t) {
            var n;
            return !(!g(t) || "function" != typeof(n = t.then)) && n
        },
        J = function(t, n, e) {
            if (!n.notified) {
                n.notified = !0;
                var i = n.reactions;
                x((function() {
                    for (var r = n.value, o = 1 == n.state, a = 0; i.length > a;) {
                        var s, d, c, u = i[a++],
                            l = o ? u.ok : u.fail,
                            A = u.resolve,
                            m = u.reject,
                            p = u.domain;
                        try {
                            l ? (o || (2 === n.rejection && nt(t, n), n.rejection = 1), !0 === l ? s = r : (p && p.enter(), s = l(r), p && (p.exit(), c = !0)), s === u.promise ? m(G("Promise-chain cycle")) : (d = K(s)) ? d.call(s, A, m) : A(s)) : m(r)
                        } catch (t) {
                            p && !c && p.exit(), m(t)
                        }
                    }
                    n.reactions = [], n.notified = !1, e && !n.rejection && $(t, n)
                }))
            }
        },
        Y = function(t, n, e) {
            var i, r;
            W ? ((i = F.createEvent("Event")).promise = n, i.reason = e, i.initEvent(t, !1, !0), c.dispatchEvent(i)) : i = {
                promise: n,
                reason: e
            }, (r = c["on" + t]) ? r(i) : "unhandledrejection" === t && z("Unhandled promise rejection", e)
        },
        $ = function(t, n) {
            E.call(c, (function() {
                var e, i = n.value;
                if (tt(n) && (e = B((function() {
                        U ? H.emit("unhandledRejection", i, t) : Y("unhandledrejection", t, i)
                    })), n.rejection = U || tt(n) ? 2 : 1, e.error)) throw e.value
            }))
        },
        tt = function(t) {
            return 1 !== t.rejection && !t.parent
        },
        nt = function(t, n) {
            E.call(c, (function() {
                U ? H.emit("rejectionHandled", t) : Y("rejectionhandled", t, n.value)
            }))
        },
        et = function(t, n, e, i) {
            return function(r) {
                t(n, e, r, i)
            }
        },
        it = function(t, n, e, i) {
            n.done || (n.done = !0, i && (n = i), n.value = e, n.state = 2, J(t, n, !0))
        },
        rt = function(t, n, e, i) {
            if (!n.done) {
                n.done = !0, i && (n = i);
                try {
                    if (t === e) throw G("Promise can't be resolved itself");
                    var r = K(e);
                    r ? x((function() {
                        var i = {
                            done: !1
                        };
                        try {
                            r.call(e, et(rt, t, i, n), et(it, t, i, n))
                        } catch (e) {
                            it(t, i, e, n)
                        }
                    })) : (n.value = e, n.state = 1, J(t, n, !1))
                } catch (e) {
                    it(t, {
                        done: !1
                    }, e, n)
                }
            }
        };
    V && (Z = function(t) {
        w(this, Z, O), h(t), i.call(this);
        var n = j(this);
        try {
            t(et(rt, this, n), et(it, this, n))
        } catch (t) {
            it(this, n, t)
        }
    }, (i = function(t) {
        M(this, {
            type: O,
            done: !1,
            notified: !1,
            parent: !1,
            reactions: [],
            rejection: !1,
            state: 0,
            value: void 0
        })
    }).prototype = m(Z.prototype, {
        then: function(t, n) {
            var e = R(this),
                i = X(S(this, Z));
            return i.ok = "function" != typeof t || t, i.fail = "function" == typeof n && n, i.domain = U ? H.domain : void 0, e.parent = !0, e.reactions.push(i), 0 != e.state && J(this, e, !1), i.promise
        },
        catch: function(t) {
            return this.then(void 0, t)
        }
    }), r = function() {
        var t = new i,
            n = j(t);
        this.promise = t, this.resolve = et(rt, t, n), this.reject = et(it, t, n)
    }, C.f = X = function(t) {
        return t === Z || t === o ? new r(t) : Q(t)
    }, d || "function" != typeof l || (a = l.prototype.then, A(l.prototype, "then", (function(t, n) {
        var e = this;
        return new Z((function(t, n) {
            a.call(e, t, n)
        })).then(t, n)
    }), {
        unsafe: !0
    }), "function" == typeof N && s({
        global: !0,
        enumerable: !0,
        forced: !0
    }, {
        fetch: function(t) {
            return T(Z, N.apply(c, arguments))
        }
    }))), s({
        global: !0,
        wrap: !0,
        forced: V
    }, {
        Promise: Z
    }), p(Z, O, !1, !0), f(O), o = u(O), s({
        target: O,
        stat: !0,
        forced: V
    }, {
        reject: function(t) {
            var n = X(this);
            return n.reject.call(void 0, t), n.promise
        }
    }), s({
        target: O,
        stat: !0,
        forced: d || V
    }, {
        resolve: function(t) {
            return T(d && this === o ? Z : this, t)
        }
    }), s({
        target: O,
        stat: !0,
        forced: q
    }, {
        all: function(t) {
            var n = this,
                e = X(n),
                i = e.resolve,
                r = e.reject,
                o = B((function() {
                    var e = h(n.resolve),
                        o = [],
                        a = 0,
                        s = 1;
                    v(t, (function(t) {
                        var d = a++,
                            c = !1;
                        o.push(void 0), s++, e.call(n, t).then((function(t) {
                            c || (c = !0, o[d] = t, --s || i(o))
                        }), r)
                    })), --s || i(o)
                }));
            return o.error && r(o.value), e.promise
        },
        race: function(t) {
            var n = this,
                e = X(n),
                i = e.reject,
                r = B((function() {
                    var r = h(n.resolve);
                    v(t, (function(t) {
                        r.call(n, t).then(e.resolve, i)
                    }))
                }));
            return r.error && i(r.value), e.promise
        }
    })
}, function(t, n, e) {
    var i = e(12);
    t.exports = function(t, n, e) {
        for (var r in n) i(t, r, n[r], e);
        return t
    }
}, function(t, n, e) {
    "use strict";
    var i = e(10),
        r = e(9),
        o = e(1),
        a = e(6),
        s = o("species");
    t.exports = function(t) {
        var n = i(t),
            e = r.f;
        a && n && !n[s] && e(n, s, {
            configurable: !0,
            get: function() {
                return this
            }
        })
    }
}, function(t, n) {
    t.exports = function(t, n, e) {
        if (!(t instanceof n)) throw TypeError("Incorrect " + (e ? e + " " : "") + "invocation");
        return t
    }
}, function(t, n, e) {
    var i = e(1),
        r = e(17),
        o = i("iterator"),
        a = Array.prototype;
    t.exports = function(t) {
        return void 0 !== t && (r.Array === t || a[o] === t)
    }
}, function(t, n, e) {
    var i = e(52),
        r = e(17),
        o = e(1)("iterator");
    t.exports = function(t) {
        if (null != t) return t[o] || t["@@iterator"] || r[i(t)]
    }
}, function(t, n, e) {
    var i = e(4);
    t.exports = function(t, n, e, r) {
        try {
            return r ? n(i(e)[0], e[1]) : n(e)
        } catch (n) {
            var o = t.return;
            throw void 0 !== o && i(o.call(t)), n
        }
    }
}, function(t, n, e) {
    var i = e(1)("iterator"),
        r = !1;
    try {
        var o = 0,
            a = {
                next: function() {
                    return {
                        done: !!o++
                    }
                },
                return: function() {
                    r = !0
                }
            };
        a[i] = function() {
            return this
        }, Array.from(a, (function() {
            throw 2
        }))
    } catch (t) {}
    t.exports = function(t, n) {
        if (!n && !r) return !1;
        var e = !1;
        try {
            var o = {};
            o[i] = function() {
                return {
                    next: function() {
                        return {
                            done: e = !0
                        }
                    }
                }
            }, t(o)
        } catch (t) {}
        return e
    }
}, function(t, n, e) {
    var i, r, o, a, s, d, c, u, l = e(0),
        A = e(23).f,
        m = e(14),
        p = e(60).set,
        f = e(61),
        g = l.MutationObserver || l.WebKitMutationObserver,
        h = l.process,
        w = l.Promise,
        y = "process" == m(h),
        k = A(l, "queueMicrotask"),
        v = k && k.value;
    v || (i = function() {
        var t, n;
        for (y && (t = h.domain) && t.exit(); r;) {
            n = r.fn, r = r.next;
            try {
                n()
            } catch (t) {
                throw r ? a() : o = void 0, t
            }
        }
        o = void 0, t && t.enter()
    }, y ? a = function() {
        h.nextTick(i)
    } : g && !f ? (s = !0, d = document.createTextNode(""), new g(i).observe(d, {
        characterData: !0
    }), a = function() {
        d.data = s = !s
    }) : w && w.resolve ? (c = w.resolve(void 0), u = c.then, a = function() {
        u.call(c, i)
    }) : a = function() {
        p.call(l, i)
    }), t.exports = v || function(t) {
        var n = {
            fn: t,
            next: void 0
        };
        o && (o.next = n), r || (r = n, a()), o = n
    }
}, function(t, n, e) {
    var i = e(0);
    t.exports = function(t, n) {
        var e = i.console;
        e && e.error && (1 === arguments.length ? e.error(t) : e.error(t, n))
    }
}, function(t, n, e) {
    var i, r, o = e(0),
        a = e(62),
        s = o.process,
        d = s && s.versions,
        c = d && d.v8;
    c ? r = (i = c.split("."))[0] + i[1] : a && (!(i = a.match(/Edge\/(\d+)/)) || i[1] >= 74) && (i = a.match(/Chrome\/(\d+)/)) && (r = i[1]), t.exports = r && +r
}, function(t, n, e) {
    "use strict";
    var i = e(5),
        r = e(16),
        o = e(57),
        a = e(2),
        s = e(10),
        d = e(59),
        c = e(63),
        u = e(12);
    i({
        target: "Promise",
        proto: !0,
        real: !0,
        forced: !!o && a((function() {
            o.prototype.finally.call({
                then: function() {}
            }, (function() {}))
        }))
    }, {
        finally: function(t) {
            var n = d(this, s("Promise")),
                e = "function" == typeof t;
            return this.then(e ? function(e) {
                return c(n, t()).then((function() {
                    return e
                }))
            } : t, e ? function(e) {
                return c(n, t()).then((function() {
                    throw e
                }))
            } : t)
        }
    }), r || "function" != typeof o || o.prototype.finally || u(o.prototype, "finally", s("Promise").prototype.finally)
}, function(t, n, e) {
    "use strict";
    var i = e(5),
        r = e(6),
        o = e(34),
        a = e(56),
        s = e(35),
        d = e(9),
        c = e(19),
        u = e(21),
        l = e(7),
        A = e(15),
        m = A.set,
        p = A.getterFor("AggregateError"),
        f = function(t, n) {
            var e = this;
            if (!(e instanceof f)) return new f(t, n);
            a && (e = a(new Error(n), o(e)));
            var i = [];
            return u(t, i.push, i), r ? m(e, {
                errors: i,
                type: "AggregateError"
            }) : e.errors = i, void 0 !== n && l(e, "message", String(n)), e
        };
    f.prototype = s(Error.prototype, {
        constructor: c(5, f),
        message: c(5, ""),
        name: c(5, "AggregateError")
    }), r && d.f(f.prototype, "errors", {
        get: function() {
            return p(this).errors
        },
        configurable: !0
    }), i({
        global: !0
    }, {
        AggregateError: f
    })
}, function(t, n, e) {
    e(64)
}, function(t, n, e) {
    "use strict";
    var i = e(5),
        r = e(18),
        o = e(22);
    i({
        target: "Promise",
        stat: !0
    }, {
        try: function(t) {
            var n = r.f(this),
                e = o(t);
            return (e.error ? n.reject : n.resolve)(e.value), n.promise
        }
    })
}, function(t, n, e) {
    "use strict";
    var i = e(5),
        r = e(13),
        o = e(10),
        a = e(18),
        s = e(22),
        d = e(21);
    i({
        target: "Promise",
        stat: !0
    }, {
        any: function(t) {
            var n = this,
                e = a.f(n),
                i = e.resolve,
                c = e.reject,
                u = s((function() {
                    var e = r(n.resolve),
                        a = [],
                        s = 0,
                        u = 1,
                        l = !1;
                    d(t, (function(t) {
                        var r = s++,
                            d = !1;
                        a.push(void 0), u++, e.call(n, t).then((function(t) {
                            d || l || (l = !0, i(t))
                        }), (function(t) {
                            d || l || (d = !0, a[r] = t, --u || c(new(o("AggregateError"))(a, "No one promise resolved")))
                        }))
                    })), --u || c(new(o("AggregateError"))(a, "No one promise resolved"))
                }));
            return u.error && c(u.value), e.promise
        }
    })
}, function(t, n) {
    ! function(t) {
        "use strict";
        if (!t.fetch) {
            var n = "URLSearchParams" in t,
                e = "Symbol" in t && "iterator" in Symbol,
                i = "FileReader" in t && "Blob" in t && function() {
                    try {
                        return new Blob, !0
                    } catch (t) {
                        return !1
                    }
                }(),
                r = "FormData" in t,
                o = "ArrayBuffer" in t;
            if (o) var a = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
                s = function(t) {
                    return t && DataView.prototype.isPrototypeOf(t)
                },
                d = ArrayBuffer.isView || function(t) {
                    return t && a.indexOf(Object.prototype.toString.call(t)) > -1
                };
            p.prototype.append = function(t, n) {
                t = l(t), n = A(n);
                var e = this.map[t];
                this.map[t] = e ? e + "," + n : n
            }, p.prototype.delete = function(t) {
                delete this.map[l(t)]
            }, p.prototype.get = function(t) {
                return t = l(t), this.has(t) ? this.map[t] : null
            }, p.prototype.has = function(t) {
                return this.map.hasOwnProperty(l(t))
            }, p.prototype.set = function(t, n) {
                this.map[l(t)] = A(n)
            }, p.prototype.forEach = function(t, n) {
                for (var e in this.map) this.map.hasOwnProperty(e) && t.call(n, this.map[e], e, this)
            }, p.prototype.keys = function() {
                var t = [];
                return this.forEach((function(n, e) {
                    t.push(e)
                })), m(t)
            }, p.prototype.values = function() {
                var t = [];
                return this.forEach((function(n) {
                    t.push(n)
                })), m(t)
            }, p.prototype.entries = function() {
                var t = [];
                return this.forEach((function(n, e) {
                    t.push([e, n])
                })), m(t)
            }, e && (p.prototype[Symbol.iterator] = p.prototype.entries);
            var c = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
            k.prototype.clone = function() {
                return new k(this, {
                    body: this._bodyInit
                })
            }, y.call(k.prototype), y.call(b.prototype), b.prototype.clone = function() {
                return new b(this._bodyInit, {
                    status: this.status,
                    statusText: this.statusText,
                    headers: new p(this.headers),
                    url: this.url
                })
            }, b.error = function() {
                var t = new b(null, {
                    status: 0,
                    statusText: ""
                });
                return t.type = "error", t
            };
            var u = [301, 302, 303, 307, 308];
            b.redirect = function(t, n) {
                if (-1 === u.indexOf(n)) throw new RangeError("Invalid status code");
                return new b(null, {
                    status: n,
                    headers: {
                        location: t
                    }
                })
            }, t.Headers = p, t.Request = k, t.Response = b, t.fetch = function(t, n) {
                return new Promise((function(e, r) {
                    var o = new k(t, n),
                        a = new XMLHttpRequest;
                    a.onload = function() {
                        var t, n, i = {
                            status: a.status,
                            statusText: a.statusText,
                            headers: (t = a.getAllResponseHeaders() || "", n = new p, t.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach((function(t) {
                                var e = t.split(":"),
                                    i = e.shift().trim();
                                if (i) {
                                    var r = e.join(":").trim();
                                    n.append(i, r)
                                }
                            })), n)
                        };
                        i.url = "responseURL" in a ? a.responseURL : i.headers.get("X-Request-URL");
                        var r = "response" in a ? a.response : a.responseText;
                        e(new b(r, i))
                    }, a.onerror = function() {
                        r(new TypeError("Network request failed"))
                    }, a.ontimeout = function() {
                        r(new TypeError("Network request failed"))
                    }, a.open(o.method, o.url, !0), "include" === o.credentials ? a.withCredentials = !0 : "omit" === o.credentials && (a.withCredentials = !1), "responseType" in a && i && (a.responseType = "blob"), o.headers.forEach((function(t, n) {
                        a.setRequestHeader(n, t)
                    })), a.send(void 0 === o._bodyInit ? null : o._bodyInit)
                }))
            }, t.fetch.polyfill = !0
        }

        function l(t) {
            if ("string" != typeof t && (t = String(t)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");
            return t.toLowerCase()
        }

        function A(t) {
            return "string" != typeof t && (t = String(t)), t
        }

        function m(t) {
            var n = {
                next: function() {
                    var n = t.shift();
                    return {
                        done: void 0 === n,
                        value: n
                    }
                }
            };
            return e && (n[Symbol.iterator] = function() {
                return n
            }), n
        }

        function p(t) {
            this.map = {}, t instanceof p ? t.forEach((function(t, n) {
                this.append(n, t)
            }), this) : Array.isArray(t) ? t.forEach((function(t) {
                this.append(t[0], t[1])
            }), this) : t && Object.getOwnPropertyNames(t).forEach((function(n) {
                this.append(n, t[n])
            }), this)
        }

        function f(t) {
            if (t.bodyUsed) return Promise.reject(new TypeError("Already read"));
            t.bodyUsed = !0
        }

        function g(t) {
            return new Promise((function(n, e) {
                t.onload = function() {
                    n(t.result)
                }, t.onerror = function() {
                    e(t.error)
                }
            }))
        }

        function h(t) {
            var n = new FileReader,
                e = g(n);
            return n.readAsArrayBuffer(t), e
        }

        function w(t) {
            if (t.slice) return t.slice(0);
            var n = new Uint8Array(t.byteLength);
            return n.set(new Uint8Array(t)), n.buffer
        }

        function y() {
            return this.bodyUsed = !1, this._initBody = function(t) {
                if (this._bodyInit = t, t)
                    if ("string" == typeof t) this._bodyText = t;
                    else if (i && Blob.prototype.isPrototypeOf(t)) this._bodyBlob = t;
                else if (r && FormData.prototype.isPrototypeOf(t)) this._bodyFormData = t;
                else if (n && URLSearchParams.prototype.isPrototypeOf(t)) this._bodyText = t.toString();
                else if (o && i && s(t)) this._bodyArrayBuffer = w(t.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer]);
                else {
                    if (!o || !ArrayBuffer.prototype.isPrototypeOf(t) && !d(t)) throw new Error("unsupported BodyInit type");
                    this._bodyArrayBuffer = w(t)
                } else this._bodyText = "";
                this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : n && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
            }, i && (this.blob = function() {
                var t = f(this);
                if (t) return t;
                if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                return Promise.resolve(new Blob([this._bodyText]))
            }, this.arrayBuffer = function() {
                return this._bodyArrayBuffer ? f(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(h)
            }), this.text = function() {
                var t, n, e, i = f(this);
                if (i) return i;
                if (this._bodyBlob) return t = this._bodyBlob, n = new FileReader, e = g(n), n.readAsText(t), e;
                if (this._bodyArrayBuffer) return Promise.resolve(function(t) {
                    for (var n = new Uint8Array(t), e = new Array(n.length), i = 0; i < n.length; i++) e[i] = String.fromCharCode(n[i]);
                    return e.join("")
                }(this._bodyArrayBuffer));
                if (this._bodyFormData) throw new Error("could not read FormData body as text");
                return Promise.resolve(this._bodyText)
            }, r && (this.formData = function() {
                return this.text().then(v)
            }), this.json = function() {
                return this.text().then(JSON.parse)
            }, this
        }

        function k(t, n) {
            var e, i, r = (n = n || {}).body;
            if (t instanceof k) {
                if (t.bodyUsed) throw new TypeError("Already read");
                this.url = t.url, this.credentials = t.credentials, n.headers || (this.headers = new p(t.headers)), this.method = t.method, this.mode = t.mode, r || null == t._bodyInit || (r = t._bodyInit, t.bodyUsed = !0)
            } else this.url = String(t);
            if (this.credentials = n.credentials || this.credentials || "omit", !n.headers && this.headers || (this.headers = new p(n.headers)), this.method = (e = n.method || this.method || "GET", i = e.toUpperCase(), c.indexOf(i) > -1 ? i : e), this.mode = n.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && r) throw new TypeError("Body not allowed for GET or HEAD requests");
            this._initBody(r)
        }

        function v(t) {
            var n = new FormData;
            return t.trim().split("&").forEach((function(t) {
                if (t) {
                    var e = t.split("="),
                        i = e.shift().replace(/\+/g, " "),
                        r = e.join("=").replace(/\+/g, " ");
                    n.append(decodeURIComponent(i), decodeURIComponent(r))
                }
            })), n
        }

        function b(t, n) {
            n || (n = {}), this.type = "default", this.status = void 0 === n.status ? 200 : n.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in n ? n.statusText : "OK", this.headers = new p(n.headers), this.url = n.url || "", this._initBody(t)
        }
    }("undefined" != typeof self ? self : this)
}, function(t, n) {
    /*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
    "document" in window.self && ("classList" in document.createElement("_") && (!document.createElementNS || "classList" in document.createElementNS("http://www.w3.org/2000/svg", "g")) || function(t) {
        "use strict";
        if ("Element" in t) {
            var n = t.Element.prototype,
                e = Object,
                i = String.prototype.trim || function() {
                    return this.replace(/^\s+|\s+$/g, "")
                },
                r = Array.prototype.indexOf || function(t) {
                    for (var n = 0, e = this.length; n < e; n++)
                        if (n in this && this[n] === t) return n;
                    return -1
                },
                o = function(t, n) {
                    this.name = t, this.code = DOMException[t], this.message = n
                },
                a = function(t, n) {
                    if ("" === n) throw new o("SYNTAX_ERR", "An invalid or illegal string was specified");
                    if (/\s/.test(n)) throw new o("INVALID_CHARACTER_ERR", "String contains an invalid character");
                    return r.call(t, n)
                },
                s = function(t) {
                    for (var n = i.call(t.getAttribute("class") || ""), e = n ? n.split(/\s+/) : [], r = 0, o = e.length; r < o; r++) this.push(e[r]);
                    this._updateClassName = function() {
                        t.setAttribute("class", this.toString())
                    }
                },
                d = s.prototype = [],
                c = function() {
                    return new s(this)
                };
            if (o.prototype = Error.prototype, d.item = function(t) {
                    return this[t] || null
                }, d.contains = function(t) {
                    return -1 !== a(this, t += "")
                }, d.add = function() {
                    var t, n = arguments,
                        e = 0,
                        i = n.length,
                        r = !1;
                    do {
                        t = n[e] + "", -1 === a(this, t) && (this.push(t), r = !0)
                    } while (++e < i);
                    r && this._updateClassName()
                }, d.remove = function() {
                    var t, n, e = arguments,
                        i = 0,
                        r = e.length,
                        o = !1;
                    do {
                        for (t = e[i] + "", n = a(this, t); - 1 !== n;) this.splice(n, 1), o = !0, n = a(this, t)
                    } while (++i < r);
                    o && this._updateClassName()
                }, d.toggle = function(t, n) {
                    t += "";
                    var e = this.contains(t),
                        i = e ? !0 !== n && "remove" : !1 !== n && "add";
                    return i && this[i](t), !0 === n || !1 === n ? n : !e
                }, d.toString = function() {
                    return this.join(" ")
                }, e.defineProperty) {
                var u = {
                    get: c,
                    enumerable: !0,
                    configurable: !0
                };
                try {
                    e.defineProperty(n, "classList", u)
                } catch (t) {
                    void 0 !== t.number && -2146823252 !== t.number || (u.enumerable = !1, e.defineProperty(n, "classList", u))
                }
            } else e.prototype.__defineGetter__ && n.__defineGetter__("classList", c)
        }
    }(window.self), function() {
        "use strict";
        var t = document.createElement("_");
        if (t.classList.add("c1", "c2"), !t.classList.contains("c2")) {
            var n = function(t) {
                var n = DOMTokenList.prototype[t];
                DOMTokenList.prototype[t] = function(t) {
                    var e, i = arguments.length;
                    for (e = 0; e < i; e++) t = arguments[e], n.call(this, t)
                }
            };
            n("add"), n("remove")
        }
        if (t.classList.toggle("c3", !1), t.classList.contains("c3")) {
            var e = DOMTokenList.prototype.toggle;
            DOMTokenList.prototype.toggle = function(t, n) {
                return 1 in arguments && !this.contains(t) == !n ? n : e.call(this, t)
            }
        }
        t = null
    }())
}, function(t, n, e) {
    "use strict";
    e.r(n);
    var i = e(65),
        r = e.n(i),
        o = e(66),
        a = e.n(o);
    e(107), e(108);
    void 0 === Object.assign && (Object.assign = r.a), "undefined" == typeof Promise && (window.Promise = a.a);
    var s = e(11),
        d = e.n(s),
        c = {
            ready: "pokiAppReady",
            adblocked: "pokiAppAdblocked",
            ads: {
                completed: "pokiAdsCompleted",
                error: "pokiAdsError",
                displayError: "pokiAdsDisplayError",
                impression: "pokiAdsImpression",
                durationChange: "pokiAdsDurationChange",
                limit: "pokiAdsLimit",
                ready: "pokiAdsReady",
                requested: "pokiAdsRequested",
                skipped: "pokiAdsSkipped",
                started: "pokiAdsStarted",
                stopped: "pokiAdsStopped",
                busy: "pokiAdsBusy",
                pushedToPlatform: "pokiPushedToPlatform",
                position: {
                    preroll: "PP",
                    midroll: "PM",
                    rewarded: "PR"
                },
                video: {
                    clicked: "pokiVideoAdsClicked",
                    firstQuartile: "pokiVideoAdsFirstQuartile",
                    midPoint: "pokiVideoAdsMidPoint",
                    thirdQuartile: "pokiVideoAdsThirdQuartile",
                    error: "pokiVideoAdsError",
                    paused: "pokiVideoAdsPauseTriggered",
                    resumed: "pokiVideoAdsResumedTriggered",
                    progress: "pokiVideoAdsProgress"
                }
            },
            info: {
                messages: {
                    timeLimit: "The ad-request was not processed, because of a time constraint",
                    prerollLimit: "The ad-request was cancelled, because we're not allowed to show a preroll"
                }
            },
            message: {
                event: "pokiMessageEvent",
                sdkDetails: "pokiMessageSdkDetails",
                toggleProgrammaticAds: "pokiMessageToggleProgrammaticAds",
                runAdOnPlatform: "pokiMessageRunAdOnPlatform",
                minimizeAd: "pokiMessageMinimizeAd"
            },
            tracking: {
                custom: "pokiTrackingCustom",
                setPlayerAge: "pokiTrackingSetPlayerAge",
                togglePlayerAdvertisingConsent: "pokiTrackingTogglePlayerAdvertisingConsent",
                debugTrueInProduction: "pokiMessageDebugTrueProduction",
                screen: {
                    gameplayStart: "pokiTrackingScreenGameplayStart",
                    gameplayStop: "pokiTrackingScreenGameplayStop",
                    gameLoadingStarted: "pokiTrackingScreenGameLoadingStarted",
                    gameLoadingProgress: "pokiTrackingScreenGameLoadingProgress",
                    gameLoadingFinished: "pokiTrackingScreenGameLoadingFinished",
                    commercialBreak: "pokiTrackingScreenCommercialBreak",
                    rewardedBreak: "pokiTrackingScreenRewardedBreak",
                    happyTime: "pokiTrackingScreenHappyTime",
                    firstRound: "pokiTrackingScreenFirstRound",
                    roundStart: "pokiTrackingScreenRoundStart",
                    roundEnd: "pokiTrackingScreenRoundEnd",
                    gameInteractive: "pokiTrackingScreenGameInteractive",
                    displayAd: "pokiTrackingScreenDisplayAdRequest",
                    destroyAd: "pokiTrackingScreenDisplayAdDestroy",
                    sendHighscore: "pokiTrackingScreenSendHighscore",
                    getLeaderboard: "pokiTrackingScreenGetLeaderboard"
                },
                sdk: {
                    status: {
                        initialized: "pokiTrackingSdkStatusInitialized",
                        failed: "pokiTrackingSdkStatusFailed"
                    }
                },
                ads: {
                    status: {
                        busy: "pokiTrackingAdsStatusBusy",
                        completed: "pokiTrackingAdsStatusCompleted",
                        error: "pokiTrackingAdsStatusError",
                        displayError: "pokiTrackingAdsStatusDisplayError",
                        impression: "pokiTrackingAdsStatusImpression",
                        limit: "pokiTrackingAdsStatusLimit",
                        ready: "pokiTrackingAdsStatusReady",
                        requested: "pokiTrackingAdsStatusRequested",
                        skipped: "pokiTrackingAdsStatusSkipped",
                        started: "pokiTrackingAdsStatusStarted",
                        manualSkipButtonPressed: "pokiTrackingAdsStatusManualSkipButtonPressed",
                        minimizeButtonPressed: "pokiTrackingAdsStatusMinimizeButtonPressed"
                    },
                    video: {
                        clicked: "pokiTrackingAdsVideoClicked"
                    }
                }
            }
        },
        u = function() {
            return (u = Object.assign || function(t) {
                for (var n, e = 1, i = arguments.length; e < i; e++)
                    for (var r in n = arguments[e]) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
                return t
            }).apply(this, arguments)
        },
        l = function() {
            function t() {}
            return t.clearEventListeners = function() {
                this.listeners = {}
            }, t.removeEventListener = function(t, n) {
                if (Object.prototype.hasOwnProperty.call(this.listeners, t)) {
                    var e = this.listeners[t].indexOf(n); - 1 !== e && this.listeners[t].splice(e, 1)
                }
            }, t.addEventListener = function(t, n, e) {
                var i = this;
                if (void 0 === e && (e = !1), e = !!e, Object.prototype.hasOwnProperty.call(this.listeners, t) || (this.listeners[t] = []), e) {
                    var r = function(e) {
                        i.removeEventListener.bind(i)(t, r), n(e)
                    };
                    this.listeners[t].push(r)
                } else this.listeners[t].push(n)
            }, t.dispatchEvent = function(t, n) {
                void 0 === n && (n = {}), !this.debug || window.process && window.process.env && "test" === window.process.env.NODE_ENV || console.info(t, n);
                for (var e = Object.keys(this.listeners), i = 0; i < e.length; i++) {
                    var r = e[i];
                    if (t === r)
                        for (var o = this.listeners[r], a = 0; a < o.length; a++) o[a](u(u({}, this.dataAnnotations), n))
                }
            }, t.setDebug = function(t) {
                this.debug = t
            }, t.setDataAnnotations = function(t) {
                this.dataAnnotations = u(u({}, this.dataAnnotations), t)
            }, t.getDataAnnotations = function() {
                return this.dataAnnotations
            }, t.clearAnnotations = function() {
                this.dataAnnotations = {}
            }, t.listeners = {}, t.debug = !1, t.dataAnnotations = {}, t
        }(),
        A = function(t, n) {
            var e = !1;
            return Object.keys(n).forEach((function(i) {
                n[i] === t && (e = !0)
            })), e
        },
        m = function() {
            function t() {}
            return t.sendMessage = function(t, n) {
                void 0 === n && (n = {});
                var e = window.parent;
                if (!A(t, c.message)) {
                    var i = Object.keys(c.message).map((function(t) {
                        return "poki.message." + t
                    }));
                    throw new TypeError("Argument 'type' must be one of " + i.join(", "))
                }
                e.postMessage({
                    type: t,
                    content: n
                }, "*")
            }, t
        }(),
        p = function(t) {
            var n = new Array;
            return Object.keys(t).forEach((function(e) {
                "object" == typeof t[e] ? n = n.concat(p(t[e])) : n.push(t[e])
            })), n
        },
        f = p(c.tracking),
        g = function() {
            function t() {}
            return t.setDebug = function(t) {
                this.debug = t
            }, t.track = function(t, n) {
                if (void 0 === n && (n = {}), -1 === f.indexOf(t)) throw new TypeError("Invalid 'event', must be one of " + f.join(", "));
                if ("object" != typeof n) throw new TypeError("Invalid data, must be an object");
                if (this.debug) {
                    if (window.process && window.process.env && "test" === window.process.env.NODE_ENV) return;
                    Object.keys(n).length ? console.info("%cPOKI_TRACKER: %cTracked event '" + t + "' with data:", "font-weight: bold", "", n) : console.info("%cPOKI_TRACKER: %cTracked event '" + t + "'", "font-weight: bold", "")
                }
                m.sendMessage(c.message.event, {
                    event: t,
                    data: n
                })
            }, t.setupDefaultEvents = function() {
                var n, e = ((n = {})[c.ready] = c.tracking.sdk.status.initialized, n[c.adblocked] = c.tracking.sdk.status.failed, n[c.ads.busy] = c.tracking.ads.status.busy, n[c.ads.completed] = c.tracking.ads.status.completed, n[c.ads.error] = c.tracking.ads.status.error, n[c.ads.displayError] = c.tracking.ads.status.displayError, n[c.ads.impression] = c.tracking.ads.status.impression, n[c.ads.limit] = c.tracking.ads.status.limit, n[c.ads.ready] = c.tracking.ads.status.ready, n[c.ads.requested] = c.tracking.ads.status.requested, n[c.ads.skipped] = c.tracking.ads.status.skipped, n[c.ads.started] = c.tracking.ads.status.started, n[c.ads.video.clicked] = c.tracking.ads.video.clicked, n[c.tracking.screen.gameplayStart] = c.tracking.screen.gameplayStart, n[c.tracking.screen.gameplayStop] = c.tracking.screen.gameplayStop, n[c.tracking.screen.loadingProgress] = c.tracking.screen.loadingProgress, n[c.tracking.screen.commercialBreak] = c.tracking.screen.commercialBreak, n[c.tracking.screen.rewardedBreak] = c.tracking.screen.rewardedBreak, n[c.tracking.screen.happyTime] = c.tracking.screen.happyTime, n[c.tracking.screen.sendHighscore] = c.tracking.screen.sendHighscore, n[c.tracking.screen.getLeaderboard] = c.tracking.screen.getLeaderboard, n);
                Object.keys(e).forEach((function(n) {
                    l.addEventListener(n, (function(i) {
                        t.track(e[n], i)
                    }))
                }))
            }, t.debug = !1, t
        }(),
        h = {
            adTagUrl: "//pubads.g.doubleclick.net/gampad/ads?sz=640x360|640x480&iu=/1053551/Pub-Poki-Generic&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url={url}&description_url={descriptionUrl}&correlator={timestamp}",
            adTiming: {
                preroll: !1,
                timeBetweenAds: 12e4,
                timePerTry: 7e3,
                startAdsAfter: 12e4
            },
            waterfallRetries: 2,
            country: "NL"
        },
        w = function(t) {
            return t instanceof Array ? t : [t]
        },
        y = function() {
            function t(t) {
                void 0 === t && (t = {}), this.setTimings(t), this.timingIdx = {
                    timePerTry: 0
                }, this.timers = {
                    timePerTry: void 0,
                    timeBetweenAds: void 0,
                    startAdsAfter: void 0
                }, l.addEventListener(c.ads.pushedToPlatform, this.startTimeBetweenAdsTimer.bind(this)), l.addEventListener(c.ads.requested, this.startTimeBetweenAdsTimer.bind(this)), l.addEventListener(c.ads.completed, this.startTimeBetweenAdsTimer.bind(this)), l.addEventListener(c.ads.stopped, this.startTimeBetweenAdsTimer.bind(this))
            }
            return t.prototype.setTimings = function(t) {
                var n = h.adTiming,
                    e = t.preroll,
                    i = void 0 === e ? n.preroll : e,
                    r = t.timePerTry,
                    o = void 0 === r ? n.timePerTry : r,
                    a = t.timeBetweenAds,
                    s = void 0 === a ? n.timeBetweenAds : a,
                    d = t.startAdsAfter,
                    c = void 0 === d ? n.startAdsAfter : d;
                this.timings = {
                    preroll: !1 !== i,
                    timePerTry: w(o),
                    timeBetweenAds: s,
                    startAdsAfter: c
                }
            }, t.prototype.startTimeBetweenAdsTimer = function() {
                this.startTimer("timeBetweenAds")
            }, t.prototype.startStartAdsAfterTimer = function() {
                this.startTimer("startAdsAfter")
            }, t.prototype.requestPossible = function() {
                return !this.timers.timeBetweenAds && !this.timers.startAdsAfter
            }, t.prototype.startWaterfallTimer = function(t) {
                this.startTimer("timePerTry", t)
            }, t.prototype.stopWaterfallTimer = function() {
                this.stopTimer("timePerTry")
            }, t.prototype.nextWaterfallTimer = function() {
                this.nextTiming("timePerTry")
            }, t.prototype.resetWaterfallTimerIdx = function() {
                this.resetTimingIdx("timePerTry")
            }, t.prototype.stopTimer = function(t) {
                this.timers[t] && (clearTimeout(this.timers[t]), this.timers[t] = void 0)
            }, t.prototype.startTimer = function(t, n) {
                var e = this;
                void 0 === n && (n = function() {}), this.getTiming(t) <= 0 ? n() : (this.timers[t] && clearTimeout(this.timers[t]), this.timers[t] = setTimeout((function() {
                    e.stopTimer(t), n()
                }), this.getTiming(t)))
            }, t.prototype.getTiming = function(t) {
                var n = this.timings[t];
                return n instanceof Array ? n[this.timingIdx[t]] : n
            }, t.prototype.nextTiming = function(t) {
                if (void 0 === this.timingIdx[t]) throw new Error("AdTimings Error: " + t + " does not have multiple timers");
                this.timingIdx[t] = (this.timingIdx[t] + 1) % this.timings[t].length
            }, t.prototype.resetTimingIdx = function(t) {
                if (void 0 === this.timingIdx[t]) throw new Error("AdTimings Error: " + t + " does not have multiple timers");
                this.timingIdx[t] = 0
            }, t.prototype.prerollPossible = function() {
                return this.timings.preroll
            }, t
        }(),
        k = function() {
            return window.location.href
        },
        v = function() {
            return "undefined" != typeof navigator && /(?:phone|windows\s+phone|ipod|blackberry|(?:android|bb\d+|meego|silk|googlebot) .+? mobile|palm|windows\s+ce|opera\smini|avantgo|mobilesafari|docomo)/i.test(navigator.userAgent)
        },
        b = function() {
            return "undefined" != typeof navigator && /(?:ipad|playbook|(?:android|bb\d+|meego|silk)(?! .+? mobile))/i.test(navigator.userAgent)
        },
        S = function(t, n) {
            if ("undefined" == typeof window) return "";
            t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var e = new RegExp("[\\?&]" + t + "=([^&#]*)").exec(n || window.location.search);
            return null === e ? "" : decodeURIComponent(e[1].replace(/\+/g, " "))
        },
        E = function() {
            return (E = Object.assign || function(t) {
                for (var n, e = 1, i = arguments.length; e < i; e++)
                    for (var r in n = arguments[e]) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
                return t
            }).apply(this, arguments)
        },
        x = function() {
            for (var t = 0, n = 0, e = arguments.length; n < e; n++) t += arguments[n].length;
            var i = Array(t),
                r = 0;
            for (n = 0; n < e; n++)
                for (var o = arguments[n], a = 0, s = o.length; a < s; a++, r++) i[r] = o[a];
            return i
        },
        T = parseInt(S("site_id"), 10) || 0,
        z = {
            allowSmallerSizes: !0,
            frameworks: [2],
            h: 480,
            maxduration: 15,
            mimes: "undefined" != typeof navigator && /MSIE \\d|Trident.*rv:/i.test(navigator.userAgent) || v() || b() ? ["video/mp4"] : ["video/mp4", "video/webm", "video/ogg"],
            startdelay: 0,
            w: 640,
            video: {
                playback_method: ["auto_play_sound_on", "auto_play_sound_off", "auto_play_sound_unknown"]
            }
        },
        C = x([{
            bidder: "appnexus",
            params: E(E({
                placementId: 13184250
            }, z), {
                video: E(E({}, z.video), {
                    skippable: !0
                })
            })
        }, {
            bidder: "appnexus",
            params: E(E({
                placementId: 13184309
            }, z), {
                video: E(E({}, z.video), {
                    skippable: !1,
                    maxduration: 15
                })
            })
        }, {
            bidder: "openx",
            params: {
                unit: "540105196",
                delDomain: "poki-d.openx.net",
                openrtb: {
                    imp: [{
                        video: {
                            mimes: [z.mimes.join(",")],
                            protocols: [2, 3, 5, 6, 7, 8],
                            maxduration: 15,
                            skip: 1,
                            skipafter: 5,
                            w: 640,
                            h: 480
                        }
                    }]
                }
            }
        }, {
            bidder: "openx",
            params: {
                unit: "540719065",
                delDomain: "poki-d.openx.net",
                openrtb: {
                    imp: [{
                        video: {
                            mimes: [z.mimes.join(",")],
                            protocols: [2, 3, 5, 6, 7, 8],
                            maxduration: 15,
                            skip: 0,
                            w: 640,
                            h: 480
                        }
                    }]
                }
            }
        }, {
            bidder: "districtm",
            params: E(E({
                placementId: 12906789
            }, z), {
                video: E(E({}, z.video), {
                    skippable: !1,
                    maxduration: 15
                })
            })
        }, {
            bidder: "spotx",
            params: {
                channel_id: "265590",
                ad_unit: "instream",
                secure: !0,
                mimes: z.mimes,
                hide_skin: !0
            }
        }, {
            bidder: "ix",
            params: {
                siteId: "436284",
                size: [640, 480],
                video: {
                    mimes: z.mimes,
                    protocols: [2, 3, 5, 6, 7, 8],
                    minduration: 0,
                    maxduration: 15
                }
            }
        }, {
            bidder: "emx_digital",
            params: {
                tagid: "100598"
            }
        }], [2, 3, 9, 25, 26, 27, 28, 32, 33, 34, 35, 36, 41, 42].includes(T) ? [{
            bidder: "richaudience",
            params: {
                pid: {
                    1: "g5ggMnI6xT",
                    2: "lHMvi7OD60",
                    3: "FpeabuqdcE",
                    4: "00Zb1PwVHr",
                    5: "VI0QDby6Ve",
                    6: "z3zWdnIzMW",
                    7: "YEEmoBceH5",
                    8: "ADIfc2WQDl",
                    9: "wBSi2eiNVR",
                    10: "1q2NODRZj3",
                    11: "1HwhhlVt89",
                    12: "5rqqrYdnqH",
                    14: "07lwKkcpin",
                    15: "1Ah9mhTnvt",
                    16: "1fd5cHLOqs",
                    17: "xhr60ja0TG",
                    19: "1wkvxV19pR",
                    20: "0Kx3QH3Bt3",
                    21: "1ByiARwe2D",
                    22: "1N7iwOY3go",
                    23: "1zLklqBXnX",
                    24: "1Vrgstvxwi",
                    25: "lroD42SjHF",
                    26: "0bTkTIVtwB",
                    27: "0hqCWELXt8",
                    28: "02AXESLU5Y",
                    29: "TiI8Y9VoI1",
                    30: "1C7UMEyNVK",
                    31: "12y22zvwyq",
                    32: "PSW2JxInvH",
                    33: "1PqwM9yzAK",
                    34: "uZSsNaRvZw",
                    36: "GXodoh977B",
                    37: "3HCppqsTeg",
                    38: "0pUfTM09m1",
                    41: "XqD7XrVwbr",
                    42: "1DtZBPnpWp",
                    47: "0D3fD9BwfK",
                    49: "0oSr0bZt8C",
                    50: "1RlFE13iG6"
                } [T],
                supplyType: "site"
            }
        }] : []),
        B = {
            video: {
                context: "instream",
                playerSize: [640, 480],
                mimes: z.mimes,
                protocols: [2, 3, 5, 6, 7, 8],
                maxduration: 15,
                skip: 1,
                linearity: 1,
                api: [2]
            }
        },
        I = [{
            code: "video",
            mediaTypes: B,
            bids: x(C, [{
                bidder: "rubicon",
                params: {
                    accountId: "18608",
                    siteId: "266914",
                    zoneId: "1322034",
                    video: {
                        size_id: 204
                    }
                }
            }])
        }, {
            code: "rewarded",
            mediaTypes: B,
            bids: x(C, [{
                bidder: "rubicon",
                params: {
                    accountId: "18608",
                    siteId: "266916",
                    zoneId: "1322048",
                    video: {
                        size_id: 202
                    }
                }
            }])
        }],
        _ = {
            EUR: {
                EUR: 1,
                GBP: .858595,
                USD: 1.13151
            },
            GBP: {
                EUR: 1.164693481792929,
                GBP: 1,
                USD: 1.3178623215835172
            },
            USD: {
                EUR: .8837747788353616,
                GBP: .7588046062341472,
                USD: 1
            }
        },
        P = {
            debug: !1,
            enableSendAllBids: !0,
            usePrebidCache: !0,
            bidderTimeout: 1500,
            priceGranularity: {
                buckets: [{
                    precision: 2,
                    min: .01,
                    max: 3,
                    increment: .01
                }, {
                    precision: 2,
                    min: 3,
                    max: 8,
                    increment: .05
                }, {
                    precision: 2,
                    min: 8,
                    max: 20,
                    increment: .5
                }, {
                    precision: 2,
                    min: 20,
                    max: 45,
                    increment: 1
                }]
            },
            currency: {
                adServerCurrency: "EUR",
                rates: _,
                defaultRates: _,
                bidderCurrencyDefault: {
                    openx: "EUR"
                }
            },
            cache: {
                url: "https://prebid.adnxs.com/pbc/v1/cache"
            },
            userSync: {
                pixelsEnabled: !0,
                iframeEnabled: !0,
                syncsPerBidder: 4,
                syncDelay: 100,
                userIds: [{
                    name: "pubCommonId",
                    storage: {
                        type: "cookie",
                        name: "poki_pubcid",
                        expires: 365
                    }
                }]
            }
        };

    function D(t) {
        try {
            var n = window.pbjs.getBidResponsesForAdUnitCode(t).bids;
            window.pokiAuctionsSeen || (window.pokiAuctionsSeen = {}), window.pokiAuctionsSeen[t] || (window.pokiAuctionsSeen[t] = {});
            var e = 0;
            if (n) {
                for (var i = 0; i < n.length; i++)
                    if (!window.pokiAuctionsSeen[t][n[i].auctionId]) {
                        var r = n[i].cpm;
                        r && r > e && (e = r)
                    } for (i = 0; i < n.length; i++) window.pokiAuctionsSeen[t][n[i].auctionId] = !0
            }
            return e
        } catch (t) {
            console.error(t)
        }
        return 0
    }
    var L = function() {
            function t(t, n) {
                void 0 === n && (n = {}), this.retries = 0, this.running = !1, this.ima = t, this.siteID = n.siteID || 3, 0 === n.siteID && (n.siteID = 3), this.totalRetries = n.totalRetries || h.waterfallRetries || 1, this.timing = n.timing || new y(h.adTiming), this.overwriteAdTagUrls = n.adTagUrl ? w(n.adTagUrl) : [], this.disableHB = n.disableHB || !1, this.opportunityId = "", l.addEventListener(c.ads.video.error, this.moveThroughWaterfall.bind(this)), l.addEventListener(c.ads.ready, this.timing.stopWaterfallTimer.bind(this.timing)), l.addEventListener(c.ads.started, this.stopWaterfall.bind(this))
            }
            return t.prototype.moveThroughWaterfall = function() {
                if (!1 !== this.running) {
                    if (this.timing.stopWaterfallTimer(), this.retries < this.totalRetries) return this.timing.nextWaterfallTimer(), void this.requestAd();
                    this.running = !1, this.timing.resetWaterfallTimerIdx(), l.dispatchEvent(c.ads.error, {
                        message: "No ads"
                    })
                }
            }, t.prototype.cutOffWaterfall = function() {
                this.ima.stopPlayback(), this.moveThroughWaterfall()
            }, t.prototype.buildAdTagUrls = function(t) {
                var n = "&ciu_szs&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url={url}&description_url={descriptionUrl}&correlator={timestamp}";
                if (this.debug) {
                    var e = "https://securepubads.g.doubleclick.net/gampad/ads?sz=640x360|640x480&iu=/21682198607/debug-video/";
                    return t === c.ads.position.rewarded ? [e + "debug-video-rewarded" + n] : t === c.ads.position.preroll ? [e + "debug-video-preroll" + n] : [e + "debug-video-midroll" + n]
                }
                if (this.overwriteAdTagUrls.length > 0 && pt.GetIsPokiPlatform()) return this.overwriteAdTagUrls;
                var i = "desktop",
                    r = "midroll";
                v() ? i = "mobile" : b() && (i = "tablet"), t === c.ads.position.rewarded && (r = "rewarded");
                var o = "https://securepubads.g.doubleclick.net/gampad/ads?sz=640x360|640x480&iu=/21682198607/";
                return pt.GetIsPokiIFrame() ? ["" + o + i + "_ingame_" + r + "_1/" + this.siteID + "_" + i + "_ingame_" + r + "_1" + n, "" + o + i + "_ingame_" + r + "_2/" + this.siteID + "_" + i + "_ingame_" + r + "_2" + n] : [o + "external_" + i + "_video_1/external_" + i + "_ingame_" + r + "_1" + n, o + "external_" + i + "_video_2/external_" + i + "_ingame_" + r + "_2" + n]
            }, t.prototype.start = function(t, n, e, i) {
                void 0 === t && (t = {}), this.running = !0, this.retries = 0, this.criteria = t, this.timing.resetWaterfallTimerIdx(), (e || []).length > 0 && (this.overwriteAdTagUrls = e || []), this.opportunityId = Math.random().toString(36).substring(2), this.rewarded = n === c.ads.position.rewarded, this.runAdOnPlatform = i || !1, this.adTagUrls = this.buildAdTagUrls(n), this.requestAd()
            }, t.prototype.requestAd = function() {
                this.timing.startWaterfallTimer(this.cutOffWaterfall.bind(this)), this.retries++, pt.GetIsPokiPlatform() || (this.criteria.waterfall = this.retries);
                var t = (this.retries - 1) % this.adTagUrls.length,
                    n = this.adTagUrls[t],
                    e = this.criteria ? this.criteria.position : void 0;
                if (pt.consentString && pt.consentString.length > 0 && (this.criteria.consent_string = pt.consentString), this.runAdOnPlatform) return m.sendMessage(c.message.runAdOnPlatform, {
                    position: e,
                    adTagUrls: this.adTagUrls,
                    criteria: this.criteria
                }), this.stopWaterfall(), void l.dispatchEvent(c.ads.pushedToPlatform);
                var i, r, o = function(t) {
                    var n = k().split("?"),
                        e = encodeURIComponent(n[0]);
                    return t = (t = t.split("{descriptionUrl}").join(e)).split("{timestamp}").join((new Date).getTime().toString())
                }(n) + (i = this.criteria, r = "", Object.keys(i).forEach((function(t) {
                    if (Object.prototype.hasOwnProperty.call(i, t)) {
                        var n = i[t];
                        Array.isArray(n) && (n = n.join()), r += t + "=" + n + "&"
                    }
                })), "&cust_params=" + (r = encodeURIComponent(r)) + "&");
                pt.childDirected && (o += "&tfcd=1"), pt.nonPersonalized && (o += "&npa=1"), l.setDataAnnotations({
                    adTagUrl: o,
                    opportunityId: this.opportunityId,
                    position: e,
                    waterfall: this.retries
                }), l.dispatchEvent(c.ads.requested), 1 !== this.retries || v() || b() || this.disableHB ? (console.debug("adRequest started in plain mode"), this.ima.requestAd(o)) : (console.debug("adRequest started with Prebid Video enabled"), function(t, n, e, i) {
                    if (window.pbjs && window.pbjs.que && window.pbjs.getConfig) {
                        var r = k().split("?"),
                            o = encodeURIComponent(r[0]),
                            a = i ? "rewarded" : "video";
                        window.pbjs.que.push((function() {
                            window.pbjs.requestBids({
                                adUnitCodes: [a],
                                bidsBackHandler: function() {
                                    try {
                                        var i = window.pbjs.adUnits.filter((function(t) {
                                            return t.code === a
                                        }))[0];
                                        if ("undefined" === i) return console.error("Video-ad-unit not found, did you give it the adunit.code='video' value?"), void t.requestAd(n);
                                        var r = window.pbjs.adServers.dfp.buildVideoUrl({
                                            adUnit: i,
                                            params: {
                                                iu: S("iu", n),
                                                sz: "640x360|640x480",
                                                output: "vast",
                                                cust_params: e,
                                                description_url: o
                                            }
                                        });
                                        window.pbjs.markWinningBidAsUsed({
                                            adUnitCode: a
                                        }), t.requestAd(r)
                                    } catch (e) {
                                        t.requestAd(n)
                                    }
                                }
                            })
                        }))
                    } else t.requestAd(n)
                }(this.ima, o, this.criteria, this.rewarded))
            }, t.prototype.isRunning = function() {
                return this.running
            }, t.prototype.stopWaterfall = function() {
                this.running = !1, this.timing.stopWaterfallTimer(), this.timing.resetWaterfallTimerIdx()
            }, t.prototype.setDebug = function(t) {
                this.debug = t
            }, t
        }(),
        O = "pokiSdkSkipCountdownContainer",
        j = "pokiSdkPauseButton",
        M = "pokiSdkProgressBar",
        R = "pokiSdkSkipContainer",
        Z = "pokiSdkSpinnerContainer",
        G = "pokiSdkVisible",
        F = function() {
            function t(t) {
                var n = this;
                if (this.hideElement = function(t) {
                        t.classList.add("pokiSdkHidden"), t.classList.remove(G)
                    }, this.showElement = function(t) {
                        t.classList.add(G), t.classList.remove("pokiSdkHidden")
                    }, this.wrapper = t.wrapper, this.skipFeature = t.skipFeature, this.minimizeFeature = t.minimizeFeature, l.addEventListener(c.ads.video.progress, (function(t) {
                        var e = t.currentTime / t.duration * 100;
                        e < 100 && (n.progressBar.style.width = e + "%")
                    })), l.addEventListener(c.ads.started, (function(e) {
                        var i = e.adSystem.toLowerCase();
                        if (e.position === c.ads.position.midroll && (n.skipFeature || n.minimizeFeature) && "adsense" !== i && "bdm" !== i && e.remainingTime > 5e3) {
                            n.adSkippable = !1, n.countdownValue = t.countdownStart || 6, n.skipContainer.classList.remove("complete");
                            var r = pt.GetIsMinimizeTestCountry() || n.minimizeFeature;
                            n.countdownDiv.innerHTML = r ? "Skip in " + n.countdownValue : (t.renderSkipButton ? "Skip in " : "Play in ") + n.countdownValue, n.skipCountdown = window.setInterval((function() {
                                if (n.countdownValue > 1) return n.countdownValue--, void(n.countdownDiv.innerHTML = r ? "Skip in " + n.countdownValue : (t.renderSkipButton ? "Skip in " : "Play in ") + n.countdownValue);
                                t.renderSkipButton && (n.adSkippable = !0, n.countdownDiv.innerHTML = r ? "Skip" : "Skip Ad"), n.skipContainer.classList.add("complete"), window.clearInterval(n.skipCountdown)
                            }), 1e3), n.showSkipButton()
                        }
                    })), this.wrapper instanceof HTMLElement || (console.error("POKI-SDK: wrapper is not a HTMLElement, falling back to document.body"), this.wrapper = document.body), this.createElements(), "undefined" != typeof window && document) {
                    var e = document.createElement("style");
                    e.innerHTML = "\n@font-face {\n\tfont-display: swap;\n\tfont-family: 'Proxima Nova';\n\tfont-weight: 700;\n\tsrc: url(https://a.poki.com/fonts/proxima-nova-bold-latin.woff2) format('woff2'), url(https://a.poki.com/fonts/proxima-nova-bold-latin.woff) format('woff');\n\tunicode-range: U+0020-007F, U+00A0-00FF\n}\n\n@font-face {\n\tfont-display: swap;\n\tfont-family: 'Proxima Nova';\n\tfont-weight: 700;\n\tsrc: url(https://a.poki.com/fonts/proxima-nova-bold-latin-ext-a.woff2) format('woff2'), url(https://a.poki.com/fonts/proxima-nova-bold-latin-ext-a.woff) format('woff');\n\tunicode-range: U+0100-017F\n}\n\n@font-face {\n\tfont-display: swap;\n\tfont-family: 'Proxima Nova';\n\tfont-weight: 700;\n\tsrc: url(https://a.poki.com/fonts/proxima-nova-bold-latin-ext-b.woff2) format('woff2'), url(https://a.poki.com/fonts/proxima-nova-bold-latin-ext-b.woff) format('woff');\n\tunicode-range: U+0180-024F\n}\n\n.pokiSdkContainer {\n\toverflow: hidden;\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\twidth: 100%;\n\theight: 100%;\n\tz-index: 1000;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n.pokiSdkContainer.pokiSdkFixed {\n\tposition: fixed;\n}\n\n.pokiSdkContainer.pokiSdkVisible {\n\tdisplay: block;\n}\n\n.pokiSdkContainer.pokiSdkHidden, .pokiSdkSpinnerContainer.pokiSdkHidden {\n\tdisplay: none;\n}\n\n.pokiSdkContainer.pokiSdkHidden, .pokiSdkSpinnerContainer, .pokiSdkSpinnerContainer div, .pokiSdkSpinnerContainer img {\n\tpointer-events: none;\n}\n\n.pokiSdkInsideContainer {\n\tbackground: #000;\n\tposition: relative;\n\tz-index: 1;\n\twidth: 100%;\n\theight: 100%;\n\tdisplay: flex;\n\tflex-direction: column;\n\n\topacity: 0;\n\t-webkit-transition: opacity 0.5s ease-in-out;\n\t-moz-transition: opacity 0.5s ease-in-out;\n\t-ms-transition: opacity 0.5s ease-in-out;\n\t-o-transition: opacity 0.5s ease-in-out;\n\ttransition: opacity 0.5s ease-in-out;\n}\n\n.pokiSdkContainer.pokiSdkVisible .pokiSdkInsideContainer {\n\topacity: 1;\n}\n\n.pokiSDKAdContainer, .pokiSdkVideoContainer {\n\tposition: absolute;\n\twidth: 100%;\n\theight: 100%;\n}\n\n.pokiSdkStartAdButton, .pokiSdkPauseButton {\n\tposition: absolute;\n\tz-index: 9999;\n\ttop: 0;\n\n\tpadding-top: 10%;\n\twidth: 100%;\n\theight: 100%;\n\ttext-align: center;\n\tcolor: #FFF;\n\n\tfont: 700 16pt 'Proxima Nova', sans-serif;\n\tfont-weight: bold;\n\tletter-spacing: 1px;\n\ttransition: 0.1s ease-in-out;\n\tline-height: 1em;\n}\n\n.pokiSdkProgressContainer {\n\tbackground: #002B50;\n\twidth: 100%;\n\theight: 5px;\n\tposition: absolute;\n\tbottom: 0;\n\tz-index: 9999;\n}\n\n.pokiSdkProgressBar {\n\tposition:relative;\n\tbottom:0px;\n\tbackground: #009CFF;\n\theight: 100%;\n\twidth: 0%;\n\ttransition: width 0.5s;\n\ttransition-timing-function: linear;\n}\n\n.pokiSdkSkipContainer {\n\tbackground: #009cff;\n\tborder-bottom-left-radius: 16px;\n\tborder-top-left-radius: 16px;\n\tbottom: 10%;\n\tbox-shadow: 0 6px 12px 0 rgba(0,0,0,.24);\n\tcolor: #FFF;\n\tcursor: pointer;\n\tfont: 700 16pt 'Proxima Nova', sans-serif;\n\theight: 42px;\n\tline-height: 42px;\n\topacity: 0.6;\n\tpadding-left: 15px;\n\tposition: absolute;\n\tright: 0;\n\ttransition: opacity 0.2s;\n\twidth: 115px;\n\tz-index: 9999;\n}\n\n.pokiSdkSkipContainer.complete {\n\topacity: 1;\n}\n\n.pokiSdkSkipContainer .pokiSdkSkipCountdownContainer {\n\t-webkit-touch-callout: none;\n\t-webkit-user-select: none;\n\t-khtml-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n\tcursor: pointer;\n}\n\n.pokiSdkSkipContainer.pokiSdkVisible:hover {\n\topacity: 1;\n}\n\n.pokiSdkProgressBar.pokiSdkVisible, .pokiSdkPauseButton.pokiSdkVisible, .pokiSdkSkipContainer.pokiSdkVisible, .pokiSdkStartAdButton.pokiSdkVisible {\n\tdisplay: block;\n\tpointer-events: auto;\n}\n\n.pokiSdkProgressBar.pokiSdkHidden, .pokiSdkPauseButton.pokiSdkHidden, .pokiSdkSkipContainer.pokiSdkHidden, .pokiSdkStartAdButton.pokiSdkHidden {\n\tdisplay: none;\n\tpointer-events: none;\n}\n\n\n@keyframes gwd-gen-no02gwdanimation_gwd-keyframes{0%{opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:step-end;-webkit-animation-timing-function:step-end;-moz-animation-timing-function:step-end}25%{transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:step-end;-webkit-animation-timing-function:step-end;-moz-animation-timing-function:step-end}35%{opacity:1;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:step-end;-webkit-animation-timing-function:step-end;-moz-animation-timing-function:step-end}40%{opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:linear;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear}100%{opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:linear;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear}}@-webkit-keyframes gwd-gen-no02gwdanimation_gwd-keyframes{0%{opacity:0;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:step-end}25%{-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:step-end}35%{opacity:1;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:step-end}40%{opacity:0;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:linear}100%{opacity:0;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:linear}}@-moz-keyframes gwd-gen-no02gwdanimation_gwd-keyframes{0%{opacity:0;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:step-end}25%{-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:step-end}35%{opacity:1;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:step-end}40%{opacity:0;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:linear}100%{opacity:0;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:linear}}[data-gwd-group=SpinnerGroup] .gwd-gen-no02gwdanimation{animation:gwd-gen-no02gwdanimation_gwd-keyframes 2s linear 0s infinite normal forwards;-webkit-animation:gwd-gen-no02gwdanimation_gwd-keyframes 2s linear 0s infinite normal forwards;-moz-animation:gwd-gen-no02gwdanimation_gwd-keyframes 2s linear 0s infinite normal forwards}@keyframes gwd-gen-4pvrgwdanimation_gwd-keyframes{0%{opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:step-end;-webkit-animation-timing-function:step-end;-moz-animation-timing-function:step-end}25%{transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:step-end;-webkit-animation-timing-function:step-end;-moz-animation-timing-function:step-end}40%{opacity:1;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:step-end;-webkit-animation-timing-function:step-end;-moz-animation-timing-function:step-end}45%{opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:linear;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear}100%{opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:linear;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear}}@-webkit-keyframes gwd-gen-4pvrgwdanimation_gwd-keyframes{0%{opacity:0;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:step-end}25%{-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:step-end}40%{opacity:1;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:step-end}45%{opacity:0;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:linear}100%{opacity:0;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:linear}}@-moz-keyframes gwd-gen-4pvrgwdanimation_gwd-keyframes{0%{opacity:0;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:step-end}25%{-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:step-end}40%{opacity:1;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:step-end}45%{opacity:0;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:linear}100%{opacity:0;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:linear}}[data-gwd-group=SpinnerGroup] .gwd-gen-4pvrgwdanimation{animation:gwd-gen-4pvrgwdanimation_gwd-keyframes 2s linear 0s infinite normal forwards;-webkit-animation:gwd-gen-4pvrgwdanimation_gwd-keyframes 2s linear 0s infinite normal forwards;-moz-animation:gwd-gen-4pvrgwdanimation_gwd-keyframes 2s linear 0s infinite normal forwards}@keyframes gwd-gen-kw40gwdanimation_gwd-keyframes{0%{opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:step-end;-webkit-animation-timing-function:step-end;-moz-animation-timing-function:step-end}25%{transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:step-end;-webkit-animation-timing-function:step-end;-moz-animation-timing-function:step-end}45%{opacity:1;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:step-end;-webkit-animation-timing-function:step-end;-moz-animation-timing-function:step-end}50%{opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:linear;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear}100%{opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:linear;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear}}@-webkit-keyframes gwd-gen-kw40gwdanimation_gwd-keyframes{0%{opacity:0;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:step-end}25%{-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:step-end}45%{opacity:1;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:step-end}50%{opacity:0;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:linear}100%{opacity:0;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:linear}}@-moz-keyframes gwd-gen-kw40gwdanimation_gwd-keyframes{0%{opacity:0;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:step-end}25%{-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:step-end}45%{opacity:1;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:step-end}50%{opacity:0;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:linear}100%{opacity:0;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:linear}}[data-gwd-group=SpinnerGroup] .gwd-gen-kw40gwdanimation{animation:gwd-gen-kw40gwdanimation_gwd-keyframes 2s linear 0s infinite normal forwards;-webkit-animation:gwd-gen-kw40gwdanimation_gwd-keyframes 2s linear 0s infinite normal forwards;-moz-animation:gwd-gen-kw40gwdanimation_gwd-keyframes 2s linear 0s infinite normal forwards}@keyframes gwd-gen-2uv8gwdanimation_gwd-keyframes{0%{opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:step-end;-webkit-animation-timing-function:step-end;-moz-animation-timing-function:step-end}25%{transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:step-end;-webkit-animation-timing-function:step-end;-moz-animation-timing-function:step-end}50%{opacity:1;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:step-end;-webkit-animation-timing-function:step-end;-moz-animation-timing-function:step-end}55%{opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:linear;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear}100%{opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:linear;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear}}@-webkit-keyframes gwd-gen-2uv8gwdanimation_gwd-keyframes{0%{opacity:0;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:step-end}25%{-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:step-end}50%{opacity:1;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:step-end}55%{opacity:0;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:linear}100%{opacity:0;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:linear}}@-moz-keyframes gwd-gen-2uv8gwdanimation_gwd-keyframes{0%{opacity:0;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:step-end}25%{-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:step-end}50%{opacity:1;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:step-end}55%{opacity:0;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:linear}100%{opacity:0;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:linear}}[data-gwd-group=SpinnerGroup] .gwd-gen-2uv8gwdanimation{animation:gwd-gen-2uv8gwdanimation_gwd-keyframes 2s linear 0s infinite normal forwards;-webkit-animation:gwd-gen-2uv8gwdanimation_gwd-keyframes 2s linear 0s infinite normal forwards;-moz-animation:gwd-gen-2uv8gwdanimation_gwd-keyframes 2s linear 0s infinite normal forwards}@keyframes gwd-gen-1x97gwdanimation_gwd-keyframes{0%{opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:step-end;-webkit-animation-timing-function:step-end;-moz-animation-timing-function:step-end}25%{transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:step-end;-webkit-animation-timing-function:step-end;-moz-animation-timing-function:step-end}55%{opacity:1;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:step-end;-webkit-animation-timing-function:step-end;-moz-animation-timing-function:step-end}60%{opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:linear;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear}100%{opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:linear;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear}}@-webkit-keyframes gwd-gen-1x97gwdanimation_gwd-keyframes{0%{opacity:0;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:step-end}25%{-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:step-end}55%{opacity:1;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:step-end}60%{opacity:0;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:linear}100%{opacity:0;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:linear}}@-moz-keyframes gwd-gen-1x97gwdanimation_gwd-keyframes{0%{opacity:0;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:step-end}25%{-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:step-end}55%{opacity:1;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:step-end}60%{opacity:0;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:linear}100%{opacity:0;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:linear}}[data-gwd-group=SpinnerGroup] .gwd-gen-1x97gwdanimation{animation:gwd-gen-1x97gwdanimation_gwd-keyframes 2s linear 0s infinite normal forwards;-webkit-animation:gwd-gen-1x97gwdanimation_gwd-keyframes 2s linear 0s infinite normal forwards;-moz-animation:gwd-gen-1x97gwdanimation_gwd-keyframes 2s linear 0s infinite normal forwards}@keyframes gwd-gen-1i1egwdanimation_gwd-keyframes{0%{opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:step-end;-webkit-animation-timing-function:step-end;-moz-animation-timing-function:step-end}25%{transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:step-end;-webkit-animation-timing-function:step-end;-moz-animation-timing-function:step-end}60%{opacity:1;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:step-end;-webkit-animation-timing-function:step-end;-moz-animation-timing-function:step-end}65%{opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:linear;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear}100%{opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:linear;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear}}@-webkit-keyframes gwd-gen-1i1egwdanimation_gwd-keyframes{0%{opacity:0;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:step-end}25%{-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:step-end}60%{opacity:1;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:step-end}65%{opacity:0;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:linear}100%{opacity:0;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:linear}}@-moz-keyframes gwd-gen-1i1egwdanimation_gwd-keyframes{0%{opacity:0;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:step-end}25%{-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:step-end}60%{opacity:1;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:step-end}65%{opacity:0;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:linear}100%{opacity:0;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:linear}}[data-gwd-group=SpinnerGroup] .gwd-gen-1i1egwdanimation{animation:gwd-gen-1i1egwdanimation_gwd-keyframes 2s linear 0s infinite normal forwards;-webkit-animation:gwd-gen-1i1egwdanimation_gwd-keyframes 2s linear 0s infinite normal forwards;-moz-animation:gwd-gen-1i1egwdanimation_gwd-keyframes 2s linear 0s infinite normal forwards}@keyframes gwd-gen-1sapgwdanimation_gwd-keyframes{0%{opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:step-end;-webkit-animation-timing-function:step-end;-moz-animation-timing-function:step-end}25%{transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:step-end;-webkit-animation-timing-function:step-end;-moz-animation-timing-function:step-end}65%{opacity:1;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:step-end;-webkit-animation-timing-function:step-end;-moz-animation-timing-function:step-end}70%{opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:linear;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear}100%{opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);animation-timing-function:linear;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear}}@-webkit-keyframes gwd-gen-1sapgwdanimation_gwd-keyframes{0%{opacity:0;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:step-end}25%{-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:step-end}65%{opacity:1;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:step-end}70%{opacity:0;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:linear}100%{opacity:0;-webkit-transform:translate3d(0,0,0);-webkit-animation-timing-function:linear}}@-moz-keyframes gwd-gen-1sapgwdanimation_gwd-keyframes{0%{opacity:0;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:step-end}25%{-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:step-end}65%{opacity:1;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:step-end}70%{opacity:0;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:linear}100%{opacity:0;-moz-transform:translate3d(0,0,0);-moz-animation-timing-function:linear}}[data-gwd-group=SpinnerGroup] .gwd-gen-1sapgwdanimation{animation:gwd-gen-1sapgwdanimation_gwd-keyframes 2s linear 0s infinite normal forwards;-webkit-animation:gwd-gen-1sapgwdanimation_gwd-keyframes 2s linear 0s infinite normal forwards;-moz-animation:gwd-gen-1sapgwdanimation_gwd-keyframes 2s linear 0s infinite normal forwards}@keyframes gwd-gen-5qotgwdanimation_gwd-keyframes{0%{transform:translate3d(0,0,0) rotateZ(0) scale3d(1,1,1);-webkit-transform:translate3d(0,0,0) rotateZ(0) scale3d(1,1,1);-moz-transform:translate3d(0,0,0) rotateZ(0) scale3d(1,1,1);animation-timing-function:cubic-bezier(1,0,.58,1);-webkit-animation-timing-function:cubic-bezier(1,0,.58,1);-moz-animation-timing-function:cubic-bezier(1,0,.58,1)}12.5%{transform:translate3d(0,200px,0) rotateZ(0) scale3d(1.2,.8,1);-webkit-transform:translate3d(0,200px,0) rotateZ(0) scale3d(1.2,.8,1);-moz-transform:translate3d(0,200px,0) rotateZ(0) scale3d(1.2,.8,1);animation-timing-function:cubic-bezier(.42,0,0,1);-webkit-animation-timing-function:cubic-bezier(.42,0,0,1);-moz-animation-timing-function:cubic-bezier(.42,0,0,1)}25%{transform:translate3d(0,0,0) rotateZ(0) scale3d(1,1,1);-webkit-transform:translate3d(0,0,0) rotateZ(0) scale3d(1,1,1);-moz-transform:translate3d(0,0,0) rotateZ(0) scale3d(1,1,1);animation-timing-function:cubic-bezier(1,0,.58,1);-webkit-animation-timing-function:cubic-bezier(1,0,.58,1);-moz-animation-timing-function:cubic-bezier(1,0,.58,1)}37.5%{transform:translate3d(0,200px,0) rotateZ(0) scale3d(1.2,.8,1);-webkit-transform:translate3d(0,200px,0) rotateZ(0) scale3d(1.2,.8,1);-moz-transform:translate3d(0,200px,0) rotateZ(0) scale3d(1.2,.8,1);animation-timing-function:cubic-bezier(.42,0,0,1);-webkit-animation-timing-function:cubic-bezier(.42,0,0,1);-moz-animation-timing-function:cubic-bezier(.42,0,0,1)}50%{transform:translate3d(0,0,0) rotateZ(0) scale3d(1,1,1);-webkit-transform:translate3d(0,0,0) rotateZ(0) scale3d(1,1,1);-moz-transform:translate3d(0,0,0) rotateZ(0) scale3d(1,1,1);animation-timing-function:cubic-bezier(1,0,.58,1);-webkit-animation-timing-function:cubic-bezier(1,0,.58,1);-moz-animation-timing-function:cubic-bezier(1,0,.58,1)}62.5%{transform:translate3d(0,200px,0) rotateZ(0) scale3d(1.2,.8,1);-webkit-transform:translate3d(0,200px,0) rotateZ(0) scale3d(1.2,.8,1);-moz-transform:translate3d(0,200px,0) rotateZ(0) scale3d(1.2,.8,1);animation-timing-function:cubic-bezier(.42,0,0,1);-webkit-animation-timing-function:cubic-bezier(.42,0,0,1);-moz-animation-timing-function:cubic-bezier(.42,0,0,1)}75%{transform:translate3d(0,0,0) rotateZ(0) scale3d(1,1,1);-webkit-transform:translate3d(0,0,0) rotateZ(0) scale3d(1,1,1);-moz-transform:translate3d(0,0,0) rotateZ(0) scale3d(1,1,1);animation-timing-function:cubic-bezier(1,0,.58,1);-webkit-animation-timing-function:cubic-bezier(1,0,.58,1);-moz-animation-timing-function:cubic-bezier(1,0,.58,1)}87.5%{transform:translate3d(0,200px,0) rotateZ(0) scale3d(1.2,.8,1);-webkit-transform:translate3d(0,200px,0) rotateZ(0) scale3d(1.2,.8,1);-moz-transform:translate3d(0,200px,0) rotateZ(0) scale3d(1.2,.8,1);animation-timing-function:cubic-bezier(.42,0,0,1);-webkit-animation-timing-function:cubic-bezier(.42,0,0,1);-moz-animation-timing-function:cubic-bezier(.42,0,0,1)}100%{transform:translate3d(0,0,0) rotateZ(360deg) scale3d(1,1,1);-webkit-transform:translate3d(0,0,0) rotateZ(360deg) scale3d(1,1,1);-moz-transform:translate3d(0,0,0) rotateZ(360deg) scale3d(1,1,1);animation-timing-function:linear;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear}}@-webkit-keyframes gwd-gen-5qotgwdanimation_gwd-keyframes{0%{-webkit-transform:translate3d(0,0,0) rotateZ(0) scale3d(1,1,1);-webkit-animation-timing-function:cubic-bezier(1,0,.58,1)}12.5%{-webkit-transform:translate3d(0,200px,0) rotateZ(0) scale3d(1.2,.8,1);-webkit-animation-timing-function:cubic-bezier(.42,0,0,1)}25%{-webkit-transform:translate3d(0,0,0) rotateZ(0) scale3d(1,1,1);-webkit-animation-timing-function:cubic-bezier(1,0,.58,1)}37.5%{-webkit-transform:translate3d(0,200px,0) rotateZ(0) scale3d(1.2,.8,1);-webkit-animation-timing-function:cubic-bezier(.42,0,0,1)}50%{-webkit-transform:translate3d(0,0,0) rotateZ(0) scale3d(1,1,1);-webkit-animation-timing-function:cubic-bezier(1,0,.58,1)}62.5%{-webkit-transform:translate3d(0,200px,0) rotateZ(0) scale3d(1.2,.8,1);-webkit-animation-timing-function:cubic-bezier(.42,0,0,1)}75%{-webkit-transform:translate3d(0,0,0) rotateZ(0) scale3d(1,1,1);-webkit-animation-timing-function:cubic-bezier(1,0,.58,1)}87.5%{-webkit-transform:translate3d(0,200px,0) rotateZ(0) scale3d(1.2,.8,1);-webkit-animation-timing-function:cubic-bezier(.42,0,0,1)}100%{-webkit-transform:translate3d(0,0,0) rotateZ(360deg) scale3d(1,1,1);-webkit-animation-timing-function:linear}}@-moz-keyframes gwd-gen-5qotgwdanimation_gwd-keyframes{0%{-moz-transform:translate3d(0,0,0) rotateZ(0) scale3d(1,1,1);-moz-animation-timing-function:cubic-bezier(1,0,.58,1)}12.5%{-moz-transform:translate3d(0,200px,0) rotateZ(0) scale3d(1.2,.8,1);-moz-animation-timing-function:cubic-bezier(.42,0,0,1)}25%{-moz-transform:translate3d(0,0,0) rotateZ(0) scale3d(1,1,1);-moz-animation-timing-function:cubic-bezier(1,0,.58,1)}37.5%{-moz-transform:translate3d(0,200px,0) rotateZ(0) scale3d(1.2,.8,1);-moz-animation-timing-function:cubic-bezier(.42,0,0,1)}50%{-moz-transform:translate3d(0,0,0) rotateZ(0) scale3d(1,1,1);-moz-animation-timing-function:cubic-bezier(1,0,.58,1)}62.5%{-moz-transform:translate3d(0,200px,0) rotateZ(0) scale3d(1.2,.8,1);-moz-animation-timing-function:cubic-bezier(.42,0,0,1)}75%{-moz-transform:translate3d(0,0,0) rotateZ(0) scale3d(1,1,1);-moz-animation-timing-function:cubic-bezier(1,0,.58,1)}87.5%{-moz-transform:translate3d(0,200px,0) rotateZ(0) scale3d(1.2,.8,1);-moz-animation-timing-function:cubic-bezier(.42,0,0,1)}100%{-moz-transform:translate3d(0,0,0) rotateZ(360deg) scale3d(1,1,1);-moz-animation-timing-function:linear}}[data-gwd-group=SpinnerGroup] .gwd-gen-5qotgwdanimation{animation:gwd-gen-5qotgwdanimation_gwd-keyframes 4s linear 0s infinite normal forwards;-webkit-animation:gwd-gen-5qotgwdanimation_gwd-keyframes 4s linear 0s infinite normal forwards;-moz-animation:gwd-gen-5qotgwdanimation_gwd-keyframes 4s linear 0s infinite normal forwards}@keyframes gwd-gen-faadgwdanimation_gwd-keyframes{0%{opacity:.2;transform:scale3d(.5,.8,1);-webkit-transform:scale3d(.5,.8,1);-moz-transform:scale3d(.5,.8,1);animation-timing-function:cubic-bezier(1,0,.58,1);-webkit-animation-timing-function:cubic-bezier(1,0,.58,1);-moz-animation-timing-function:cubic-bezier(1,0,.58,1)}50%{opacity:.5;transform:scale3d(1,.8,1);-webkit-transform:scale3d(1,.8,1);-moz-transform:scale3d(1,.8,1);animation-timing-function:cubic-bezier(.42,0,0,1);-webkit-animation-timing-function:cubic-bezier(.42,0,0,1);-moz-animation-timing-function:cubic-bezier(.42,0,0,1)}100%{opacity:.2;transform:scale3d(.5,.8,1);-webkit-transform:scale3d(.5,.8,1);-moz-transform:scale3d(.5,.8,1);animation-timing-function:linear;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear}}@-webkit-keyframes gwd-gen-faadgwdanimation_gwd-keyframes{0%{opacity:.2;-webkit-transform:scale3d(.5,.8,1);-webkit-animation-timing-function:cubic-bezier(1,0,.58,1)}50%{opacity:.5;-webkit-transform:scale3d(1,.8,1);-webkit-animation-timing-function:cubic-bezier(.42,0,0,1)}100%{opacity:.2;-webkit-transform:scale3d(.5,.8,1);-webkit-animation-timing-function:linear}}@-moz-keyframes gwd-gen-faadgwdanimation_gwd-keyframes{0%{opacity:.2;-moz-transform:scale3d(.5,.8,1);-moz-animation-timing-function:cubic-bezier(1,0,.58,1)}50%{opacity:.5;-moz-transform:scale3d(1,.8,1);-moz-animation-timing-function:cubic-bezier(.42,0,0,1)}100%{opacity:.2;-moz-transform:scale3d(.5,.8,1);-moz-animation-timing-function:linear}}[data-gwd-group=SpinnerGroup] .gwd-gen-faadgwdanimation{animation:gwd-gen-faadgwdanimation_gwd-keyframes 1s linear 0s infinite normal forwards;-webkit-animation:gwd-gen-faadgwdanimation_gwd-keyframes 1s linear 0s infinite normal forwards;-moz-animation:gwd-gen-faadgwdanimation_gwd-keyframes 1s linear 0s infinite normal forwards}[data-gwd-group=SpinnerGroup] .gwd-grp-13td.gwd-img-1653{position:absolute;top:0;width:612px;height:568px;opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);left:0}[data-gwd-group=SpinnerGroup] .gwd-grp-13td.gwd-img-alsm{position:absolute;top:0;width:612px;height:568px;opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);left:0}[data-gwd-group=SpinnerGroup] .gwd-grp-13td.gwd-img-f0mu{position:absolute;top:0;width:612px;height:568px;opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);left:0}[data-gwd-group=SpinnerGroup] .gwd-grp-13td.gwd-img-1sr3{position:absolute;top:0;width:612px;height:568px;opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);left:0}[data-gwd-group=SpinnerGroup] .gwd-grp-13td.gwd-img-1ffn{position:absolute;top:0;width:612px;height:568px;opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);left:0}[data-gwd-group=SpinnerGroup] .gwd-grp-13td.gwd-img-16f3{position:absolute;top:0;width:612px;height:568px;opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);left:0}[data-gwd-group=SpinnerGroup] .gwd-grp-13td.gwd-img-1rrs{position:absolute;top:0;width:612px;height:568px;opacity:0;transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);left:0}[data-gwd-group=SpinnerGroup] .gwd-grp-13td.gwd-img-1dhi{position:absolute;transform-origin:283.711px 283.516px 0;-webkit-transform-origin:283.711px 283.516px 0;-moz-transform-origin:283.711px 283.516px 0;height:568px;width:568px;top:0;transform:translate3d(0,0,0) rotateZ(0) scale3d(1,1,1);-webkit-transform:translate3d(0,0,0) rotateZ(0) scale3d(1,1,1);-moz-transform:translate3d(0,0,0) rotateZ(0) scale3d(1,1,1);transform-style:preserve-3d;-webkit-transform-style:preserve-3d;-moz-transform-style:preserve-3d;left:0}[data-gwd-group=SpinnerGroup] .gwd-grp-13td.gwd-img-1izg{position:absolute;width:568px;height:604.02px;opacity:.2;transform-style:preserve-3d;-webkit-transform-style:preserve-3d;-moz-transform-style:preserve-3d;transform:scale3d(.5,.8,1);-webkit-transform:scale3d(.5,.8,1);-moz-transform:scale3d(.5,.8,1);top:55px;left:0}[data-gwd-group=SpinnerGroup]{width:611.979px;height:598.605px}.gwd-div-1v1s{transform:scale(.5,.5)}\n", document.head.appendChild(e)
                }
            }
            return t.prototype.setPosition = function(t) {
                this.position = t
            }, t.prototype.skipAdCheck = function(t) {
                this.adSkippable && (pt.GetIsMinimizeTestCountry() || this.minimizeFeature ? (this.hideElement(this.skipContainer), g.track(c.tracking.ads.status.minimizeButtonPressed, {
                    position: this.position
                }), m.sendMessage(c.message.minimizeAd)) : (g.track(c.tracking.ads.status.manualSkipButtonPressed, {
                    position: this.position
                }), this.internalSDK.skipAd(), t.currentTarget && t.currentTarget.blur(), t.preventDefault()))
            }, t.prototype.setupEvents = function(t) {
                this.internalSDK = t, this.skipContainer.addEventListener("click", this.skipAdCheck.bind(this))
            }, t.prototype.hide = function() {
                window.clearTimeout(this.skipTimeout), window.clearInterval(this.skipCountdown), this.hideElement(this.containerDiv), this.hideElement(this.progressContainer), this.hideSkipButton(), this.hidePauseButton(), this.hideElement(this.startAdButton), this.containerDiv.classList.remove("pokiSdkOverlay"), this.progressBar.style.width = "0%"
            }, t.prototype.hideSpinner = function() {
                this.hideElement(this.spinnerContainer)
            }, t.prototype.showWithOpacity = function() {
                this.showElement(this.spinnerContainer), this.showElement(this.containerDiv), this.showElement(this.progressContainer)
            }, t.prototype.show = function() {
                this.containerDiv.classList.add("pokiSdkOverlay"), this.showElement(this.containerDiv), this.showElement(this.progressContainer)
            }, t.prototype.getVideoBounds = function() {
                return this.adContainer.getBoundingClientRect()
            }, t.prototype.getAdContainer = function() {
                return this.adContainer
            }, t.prototype.getVideoContainer = function() {
                return this.videoContainer
            }, t.prototype.showPauseButton = function() {
                this.showElement(this.pauseButton), this.internalSDK && this.pauseButton.addEventListener("click", this.internalSDK.resumeAd.bind(this.internalSDK))
            }, t.prototype.hidePauseButton = function() {
                this.hideElement(this.pauseButton), this.internalSDK && this.pauseButton.removeEventListener("click", this.internalSDK.resumeAd.bind(this.internalSDK))
            }, t.prototype.showStartAdButton = function() {
                this.showElement(this.startAdButton), this.internalSDK && this.startAdButton.addEventListener("click", this.internalSDK.startAdClicked.bind(this.internalSDK))
            }, t.prototype.hideStartAdButton = function() {
                this.hideElement(this.startAdButton), this.internalSDK && this.startAdButton.removeEventListener("click", this.internalSDK.startAdClicked.bind(this.internalSDK))
            }, t.prototype.showSkipButton = function() {
                this.showElement(this.skipContainer)
            }, t.prototype.hideSkipButton = function() {
                this.hideElement(this.skipContainer)
            }, t.prototype.createElements = function() {
                if (this.containerDiv = document.createElement("div"), this.countdownDiv = document.createElement("div"), this.insideContainer = document.createElement("div"), this.pauseButton = document.createElement("div"), this.startAdButton = document.createElement("div"), this.progressBar = document.createElement("div"), this.progressContainer = document.createElement("div"), this.skipContainer = document.createElement("div"), this.spinnerContainer = document.createElement("div"), this.adContainer = document.createElement("div"), this.videoContainer = document.createElement("video"), this.adContainer.id = "pokiSDKAdContainer", this.videoContainer.id = "pokiSDKVideoContainer", this.containerDiv.className = "pokiSdkContainer", this.countdownDiv.className = O, this.insideContainer.className = "pokiSdkInsideContainer", this.pauseButton.className = j, this.pauseButton.innerHTML = "Tap anywhere to ▶️", this.startAdButton.className = "pokiSdkStartAdButton", this.startAdButton.innerHTML = "Tap anywhere to play ad", this.progressBar.className = M, this.progressContainer.className = "pokiSdkProgressContainer", this.skipContainer.className = R, this.spinnerContainer.className = Z, this.adContainer.className = "pokiSDKAdContainer", this.videoContainer.className = "pokiSdkVideoContainer", this.spinnerContainer.innerHTML = '\n\t\t\t<div id="new-progress-spinner" style="z-index:10;position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale3d(0.5, 0.5, 0.5);">\n\t\t\t\t<div class="gwd-div-1v1s" data-gwd-group="SpinnerGroup">\n\t\t\t\t\t<img src="https://game-cdn.poki.com/loaders/v2/static/spinner/Sparkle_1.svg" class="gwd-img-1653 gwd-gen-no02gwdanimation gwd-grp-13td" data-gwd-grp-id="Sparkle_1">\n\t\t\t\t\t<img src="https://game-cdn.poki.com/loaders/v2/static/spinner/Sparkle_2.svg" class="gwd-img-alsm gwd-gen-4pvrgwdanimation gwd-grp-13td" data-gwd-grp-id="Sparkle_2">\n\t\t\t\t\t<img src="https://game-cdn.poki.com/loaders/v2/static/spinner/Sparkle_3.svg" class="gwd-img-f0mu gwd-gen-kw40gwdanimation gwd-grp-13td" data-gwd-grp-id="Sparkle_3">\n\t\t\t\t\t<img src="https://game-cdn.poki.com/loaders/v2/static/spinner/Sparkle_4.svg" class="gwd-img-1sr3 gwd-gen-2uv8gwdanimation gwd-grp-13td" data-gwd-grp-id="Sparkle_4">\n\t\t\t\t\t<img src="https://game-cdn.poki.com/loaders/v2/static/spinner/Sparkle_5.svg" class="gwd-img-1ffn gwd-gen-1x97gwdanimation gwd-grp-13td" data-gwd-grp-id="Sparkle_5">\n\t\t\t\t\t<img src="https://game-cdn.poki.com/loaders/v2/static/spinner/Sparkle_6.svg" class="gwd-img-16f3 gwd-gen-1i1egwdanimation gwd-grp-13td" data-gwd-grp-id="Sparkle_6">\n\t\t\t\t\t<img src="https://game-cdn.poki.com/loaders/v2/static/spinner/Sparkle_7.svg" class="gwd-img-1rrs gwd-gen-1sapgwdanimation gwd-grp-13td" data-gwd-grp-id="Sparkle_7">\n\t\t\t\t\t<img src="https://game-cdn.poki.com/loaders/v2.0/static/hand_fingers_isolated.svg" class="gwd-img-1dhi gwd-gen-5qotgwdanimation gwd-grp-13td" data-gwd-grp-id="heart">\n\t\t\t\t\t<img src="https://game-cdn.poki.com/loaders/v2/static/spinner/shadow_new_3.svg" class="gwd-img-1izg gwd-gen-faadgwdanimation gwd-grp-13td" data-gwd-grp-id="shadow_new_3">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t', this.hide(), this.videoContainer.setAttribute("playsinline", "playsinline"), this.videoContainer.setAttribute("muted", "muted"), this.containerDiv.appendChild(this.insideContainer), this.containerDiv.appendChild(this.skipContainer), this.containerDiv.appendChild(this.spinnerContainer), this.insideContainer.appendChild(this.progressContainer), this.insideContainer.appendChild(this.videoContainer), this.insideContainer.appendChild(this.adContainer), this.containerDiv.appendChild(this.pauseButton), this.containerDiv.appendChild(this.startAdButton), this.progressContainer.appendChild(this.progressBar), this.wrapper.appendChild(this.containerDiv), this.skipContainer.appendChild(this.countdownDiv), this.wrapper === document.body) this.containerDiv.classList.add("pokiSdkFixed");
                else {
                    var t = window.getComputedStyle(this.wrapper).position;
                    t && -1 !== ["absolute", "fixed", "relative"].indexOf(t) || (this.wrapper.style.position = "relative")
                }
            }, t
        }(),
        H = !0,
        N = {};
    var X = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "GB", "IS", "LI", "NO"],
        Q = ["US"],
        U = ["ZZ"];

    function W(t) {
        return U.includes(t)
    }
    var V = function(t, n, e, i) {
            return new(e || (e = Promise))((function(r, o) {
                function a(t) {
                    try {
                        d(i.next(t))
                    } catch (t) {
                        o(t)
                    }
                }

                function s(t) {
                    try {
                        d(i.throw(t))
                    } catch (t) {
                        o(t)
                    }
                }

                function d(t) {
                    var n;
                    t.done ? r(t.value) : (n = t.value, n instanceof e ? n : new e((function(t) {
                        t(n)
                    }))).then(a, s)
                }
                d((i = i.apply(t, n || [])).next())
            }))
        },
        q = function(t, n) {
            var e, i, r, o, a = {
                label: 0,
                sent: function() {
                    if (1 & r[0]) throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }), o;

            function s(o) {
                return function(s) {
                    return function(o) {
                        if (e) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (e = 1, i && (r = 2 & o[0] ? i.return : o[0] ? i.throw || ((r = i.return) && r.call(i), 0) : i.next) && !(r = r.call(i, o[1])).done) return r;
                            switch (i = 0, r && (o = [2 & o[0], r.value]), o[0]) {
                                case 0:
                                case 1:
                                    r = o;
                                    break;
                                case 4:
                                    return a.label++, {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++, i = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(r = (r = a.trys).length > 0 && r[r.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < r[1]) {
                                        a.label = r[1], r = o;
                                        break
                                    }
                                    if (r && a.label < r[2]) {
                                        a.label = r[2], a.ops.push(o);
                                        break
                                    }
                                    r[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = n.call(t, a)
                        } catch (t) {
                            o = [6, t], i = 0
                        } finally {
                            e = r = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, s])
                }
            }
        },
        K = function() {
            function t() {
                var t = this;
                this.bannerTimeout = null, this.allowedToPlayAd = !1, this.runningAd = !1, this.currentWidth = 640, this.currentHeight = 480, this.currentRequestIsMuted = !1, this.canWeAutoPlayWithSound = function() {
                    return V(t, void 0, void 0, (function() {
                        return q(this, (function(t) {
                            switch (t.label) {
                                case 0:
                                    if (!this.blankVideo) return [2, !1];
                                    t.label = 1;
                                case 1:
                                    return t.trys.push([1, 3, , 4]), [4, this.blankVideo.play()];
                                case 2:
                                    return t.sent(), [2, !0];
                                case 3:
                                    return t.sent(), [2, !1];
                                case 4:
                                    return [2]
                            }
                        }))
                    }))
                }, this.videoElement = document.getElementById("pokiSDKVideoContainer"), this.adsManager = null, this.initAdDisplayContainer(), this.initBlankVideo(), this.initAdsLoader()
            }
            return t.prototype.initAdDisplayContainer = function() {
                this.adDisplayContainer || (this.adDisplayContainer = new google.ima.AdDisplayContainer(document.getElementById("pokiSDKAdContainer"), this.videoElement))
            }, t.prototype.initBlankVideo = function() {
                this.blankVideo = document.createElement("video"), this.blankVideo.setAttribute("playsinline", "playsinline");
                var t = document.createElement("source");
                t.src = "data:video/mp4;base64, AAAAHGZ0eXBNNFYgAAACAGlzb21pc28yYXZjMQAAAAhmcmVlAAAGF21kYXTeBAAAbGliZmFhYyAxLjI4AABCAJMgBDIARwAAArEGBf//rdxF6b3m2Ui3lizYINkj7u94MjY0IC0gY29yZSAxNDIgcjIgOTU2YzhkOCAtIEguMjY0L01QRUctNCBBVkMgY29kZWMgLSBDb3B5bGVmdCAyMDAzLTIwMTQgLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJhYz0wIHJlZj0zIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDE6MHgxMTEgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MSBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTAgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz02IGxvb2thaGVhZF90aHJlYWRzPTEgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MCB3ZWlnaHRwPTAga2V5aW50PTI1MCBrZXlpbnRfbWluPTI1IHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCB2YnZfbWF4cmF0ZT03NjggdmJ2X2J1ZnNpemU9MzAwMCBjcmZfbWF4PTAuMCBuYWxfaHJkPW5vbmUgZmlsbGVyPTAgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAAFZliIQL8mKAAKvMnJycnJycnJycnXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXiEASZACGQAjgCEASZACGQAjgAAAAAdBmjgX4GSAIQBJkAIZACOAAAAAB0GaVAX4GSAhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZpgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGagC/AySEASZACGQAjgAAAAAZBmqAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZrAL8DJIQBJkAIZACOAAAAABkGa4C/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmwAvwMkhAEmQAhkAI4AAAAAGQZsgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGbQC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBm2AvwMkhAEmQAhkAI4AAAAAGQZuAL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGboC/AySEASZACGQAjgAAAAAZBm8AvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZvgL8DJIQBJkAIZACOAAAAABkGaAC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmiAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZpAL8DJIQBJkAIZACOAAAAABkGaYC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmoAvwMkhAEmQAhkAI4AAAAAGQZqgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGawC/AySEASZACGQAjgAAAAAZBmuAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZsAL8DJIQBJkAIZACOAAAAABkGbIC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBm0AvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZtgL8DJIQBJkAIZACOAAAAABkGbgCvAySEASZACGQAjgCEASZACGQAjgAAAAAZBm6AnwMkhAEmQAhkAI4AhAEmQAhkAI4AhAEmQAhkAI4AhAEmQAhkAI4AAAAhubW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAABDcAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAzB0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAA+kAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAALAAAACQAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAPpAAAAAAABAAAAAAKobWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAB1MAAAdU5VxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAACU21pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAhNzdGJsAAAAr3N0c2QAAAAAAAAAAQAAAJ9hdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAALAAkABIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAALWF2Y0MBQsAN/+EAFWdCwA3ZAsTsBEAAAPpAADqYA8UKkgEABWjLg8sgAAAAHHV1aWRraEDyXyRPxbo5pRvPAyPzAAAAAAAAABhzdHRzAAAAAAAAAAEAAAAeAAAD6QAAABRzdHNzAAAAAAAAAAEAAAABAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAAIxzdHN6AAAAAAAAAAAAAAAeAAADDwAAAAsAAAALAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAAiHN0Y28AAAAAAAAAHgAAAEYAAANnAAADewAAA5gAAAO0AAADxwAAA+MAAAP2AAAEEgAABCUAAARBAAAEXQAABHAAAASMAAAEnwAABLsAAATOAAAE6gAABQYAAAUZAAAFNQAABUgAAAVkAAAFdwAABZMAAAWmAAAFwgAABd4AAAXxAAAGDQAABGh0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAACAAAAAAAABDcAAAAAAAAAAAAAAAEBAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAQkAAADcAABAAAAAAPgbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAC7gAAAykBVxAAAAAAALWhkbHIAAAAAAAAAAHNvdW4AAAAAAAAAAAAAAABTb3VuZEhhbmRsZXIAAAADi21pbmYAAAAQc21oZAAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAADT3N0YmwAAABnc3RzZAAAAAAAAAABAAAAV21wNGEAAAAAAAAAAQAAAAAAAAAAAAIAEAAAAAC7gAAAAAAAM2VzZHMAAAAAA4CAgCIAAgAEgICAFEAVBbjYAAu4AAAADcoFgICAAhGQBoCAgAECAAAAIHN0dHMAAAAAAAAAAgAAADIAAAQAAAAAAQAAAkAAAAFUc3RzYwAAAAAAAAAbAAAAAQAAAAEAAAABAAAAAgAAAAIAAAABAAAAAwAAAAEAAAABAAAABAAAAAIAAAABAAAABgAAAAEAAAABAAAABwAAAAIAAAABAAAACAAAAAEAAAABAAAACQAAAAIAAAABAAAACgAAAAEAAAABAAAACwAAAAIAAAABAAAADQAAAAEAAAABAAAADgAAAAIAAAABAAAADwAAAAEAAAABAAAAEAAAAAIAAAABAAAAEQAAAAEAAAABAAAAEgAAAAIAAAABAAAAFAAAAAEAAAABAAAAFQAAAAIAAAABAAAAFgAAAAEAAAABAAAAFwAAAAIAAAABAAAAGAAAAAEAAAABAAAAGQAAAAIAAAABAAAAGgAAAAEAAAABAAAAGwAAAAIAAAABAAAAHQAAAAEAAAABAAAAHgAAAAIAAAABAAAAHwAAAAQAAAABAAAA4HN0c3oAAAAAAAAAAAAAADMAAAAaAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAACMc3RjbwAAAAAAAAAfAAAALAAAA1UAAANyAAADhgAAA6IAAAO+AAAD0QAAA+0AAAQAAAAEHAAABC8AAARLAAAEZwAABHoAAASWAAAEqQAABMUAAATYAAAE9AAABRAAAAUjAAAFPwAABVIAAAVuAAAFgQAABZ0AAAWwAAAFzAAABegAAAX7AAAGFwAAAGJ1ZHRhAAAAWm1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAALWlsc3QAAAAlqXRvbwAAAB1kYXRhAAAAAQAAAABMYXZmNTUuMzMuMTAw", this.blankVideo.appendChild(t)
            }, t.prototype.initAdsLoader = function() {
                var t = this;
                this.adsLoader || (this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer), this.adsLoader.getSettings().setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.INSECURE), this.adsLoader.getSettings().setDisableCustomPlaybackForIOS10Plus(!0), this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.onAdsManagerLoaded, !1, this), this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError, !1, this), this.videoElement.addEventListener("onended", (function() {
                    return t.adsLoader.contentComplete()
                })))
            }, t.prototype.requestAd = function(t) {
                return V(this, void 0, void 0, (function() {
                    var n;
                    return q(this, (function(e) {
                        switch (e.label) {
                            case 0:
                                return this.runningAd ? [2] : (this.runningAd = !0, this.adDisplayContainer.initialize(), this.videoElement.src = "", (n = new google.ima.AdsRequest).adTagUrl = t, n.linearAdSlotWidth = this.currentWidth, n.linearAdSlotHeight = this.currentHeight, n.nonLinearAdSlotWidth = this.currentWidth, n.nonLinearAdSlotHeight = this.currentHeight, n.forceNonLinearFullSlot = !0, [4, this.canWeAutoPlayWithSound()]);
                            case 1:
                                return e.sent() ? (n.setAdWillPlayMuted(!1), this.currentRequestIsMuted = !1) : (n.setAdWillPlayMuted(!0), this.currentRequestIsMuted = !0), this.allowedToPlayAd = !0, this.adsLoader.requestAds(n), [2]
                        }
                    }))
                }))
            }, t.prototype.resize = function(t, n, e) {
                void 0 === e && (e = google.ima.ViewMode.NORMAL), this.currentWidth = t, this.currentHeight = n, this.adsManager && this.adsManager.resize(t, n, e)
            }, t.prototype.onAdsManagerLoaded = function(t) {
                var n = new google.ima.AdsRenderingSettings;
                n.enablePreloading = !0, n.restoreCustomPlaybackStateOnAdBreakComplete = !0, this.adsManager = t.getAdsManager(this.videoElement, n), this.currentRequestIsMuted && this.adsManager.setVolume(0), this.allowedToPlayAd ? (this.attachAdEvents(), l.dispatchEvent(c.ads.ready)) : this.tearDown()
            }, t.prototype.startPlayback = function() {
                try {
                    this.adsManager.init(this.currentWidth, this.currentHeight, google.ima.ViewMode.NORMAL), this.adsManager.start()
                } catch (t) {
                    this.videoElement.play()
                }
            }, t.prototype.startIOSPlayback = function() {
                this.adsManager.start()
            }, t.prototype.stopPlayback = function() {
                l.dispatchEvent(c.ads.stopped), this.tearDown()
            }, t.prototype.resumeAd = function() {
                l.dispatchEvent(c.ads.video.resumed), this.adsManager && this.adsManager.resume()
            }, t.prototype.tearDown = function() {
                this.adsManager && (this.adsManager.stop(), this.adsManager.destroy(), this.adsManager = null), null !== this.bannerTimeout && (clearTimeout(this.bannerTimeout), this.bannerTimeout = null), this.adsLoader && (this.adsLoader.contentComplete(), this.adsLoader.destroy(), this.adsLoader = null, this.initAdsLoader()), this.runningAd = !1
            }, t.prototype.attachAdEvents = function() {
                var t = this,
                    n = google.ima.AdEvent.Type;
                this.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError, !1, this), [n.AD_PROGRESS, n.ALL_ADS_COMPLETED, n.CLICK, n.COMPLETE, n.IMPRESSION, n.PAUSED, n.SKIPPED, n.STARTED, n.USER_CLOSE].forEach((function(n) {
                    t.adsManager.addEventListener(n, t.onAdEvent, !1, t)
                }))
            }, t.prototype.onAdEvent = function(t) {
                var n = this,
                    e = t.getAd();
                switch (t.type) {
                    case google.ima.AdEvent.Type.AD_PROGRESS:
                        l.dispatchEvent(c.ads.video.progress, t.getAdData());
                        break;
                    case google.ima.AdEvent.Type.STARTED:
                        t.remainingTime = this.adsManager.getRemainingTime(), t.remainingTime <= 0 && (t.remainingTime = 15), e.isLinear() || (this.bannerTimeout = window.setTimeout((function() {
                            l.dispatchEvent(c.ads.completed, {
                                rewardAllowed: !!t.rewardAllowed
                            }), n.tearDown()
                        }), 1e3 * (t.remainingTime + 1))), l.dispatchEvent(c.ads.started, {
                            remainingTime: 1e3 * (t.remainingTime || 0),
                            adId: e.getAdId(),
                            adSystem: e.getAdSystem(),
                            advertiserName: e.getAdvertiserName(),
                            apiFramework: e.getApiFramework(),
                            creativeAdId: e.getCreativeAdId(),
                            creativeId: e.getCreativeId(),
                            description: e.getDescription(),
                            mediaUrl: e.getMediaUrl(),
                            title: e.getTitle()
                        });
                        break;
                    case google.ima.AdEvent.Type.COMPLETE:
                        l.dispatchEvent(c.ads.completed, {
                            rewardAllowed: !0
                        }), this.tearDown();
                        break;
                    case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                    case google.ima.AdEvent.Type.USER_CLOSE:
                        this.tearDown();
                        break;
                    case google.ima.AdEvent.Type.PAUSED:
                        this.adsManager.pause(), l.dispatchEvent(c.ads.video.paused);
                        break;
                    case google.ima.AdEvent.Type.CLICK:
                        l.dispatchEvent(c.ads.video.clicked);
                        break;
                    case google.ima.AdEvent.Type.SKIPPED:
                        l.dispatchEvent(c.ads.skipped), l.dispatchEvent(c.ads.completed), document.activeElement && document.activeElement.blur();
                        break;
                    case google.ima.AdEvent.Type.IMPRESSION:
                        l.dispatchEvent(c.ads.impression, {
                            userValueIndicator: D(l.getDataAnnotations().position === c.ads.position.rewarded ? "rewarded" : "video")
                        })
                }
            }, t.prototype.onAdError = function(t) {
                this.tearDown();
                var n = t.getError && t.getError().toString() || "Unknown";
                l.dispatchEvent(c.ads.video.error, {
                    message: n
                })
            }, t.prototype.muteAd = function() {
                void 0 !== this.adsManager && null != this.adsManager && this.adsManager.setVolume(0)
            }, t.prototype.isAdRunning = function() {
                return this.runningAd
            }, t
        }(),
        J = function(t) {
            return new Promise((function(n, e) {
                var i = document.createElement("script");
                i.type = "text/javascript", i.async = !0, i.src = t;
                var r = function() {
                    i.readyState && "loaded" !== i.readyState && "complete" !== i.readyState || (n(), i.onload = null, i.onreadystatechange = null)
                };
                i.onload = r, i.onreadystatechange = r, i.onerror = e, document.head.appendChild(i)
            }))
        },
        Y = function(t, n, e, i) {
            return new(e || (e = Promise))((function(r, o) {
                function a(t) {
                    try {
                        d(i.next(t))
                    } catch (t) {
                        o(t)
                    }
                }

                function s(t) {
                    try {
                        d(i.throw(t))
                    } catch (t) {
                        o(t)
                    }
                }

                function d(t) {
                    var n;
                    t.done ? r(t.value) : (n = t.value, n instanceof e ? n : new e((function(t) {
                        t(n)
                    }))).then(a, s)
                }
                d((i = i.apply(t, n || [])).next())
            }))
        },
        $ = function(t, n) {
            var e, i, r, o, a = {
                label: 0,
                sent: function() {
                    if (1 & r[0]) throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }), o;

            function s(o) {
                return function(s) {
                    return function(o) {
                        if (e) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (e = 1, i && (r = 2 & o[0] ? i.return : o[0] ? i.throw || ((r = i.return) && r.call(i), 0) : i.next) && !(r = r.call(i, o[1])).done) return r;
                            switch (i = 0, r && (o = [2 & o[0], r.value]), o[0]) {
                                case 0:
                                case 1:
                                    r = o;
                                    break;
                                case 4:
                                    return a.label++, {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++, i = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(r = (r = a.trys).length > 0 && r[r.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < r[1]) {
                                        a.label = r[1], r = o;
                                        break
                                    }
                                    if (r && a.label < r[2]) {
                                        a.label = r[2], a.ops.push(o);
                                        break
                                    }
                                    r[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = n.call(t, a)
                        } catch (t) {
                            o = [6, t], i = 0
                        } finally {
                            e = r = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, s])
                }
            }
        };
    var tt = function() {
            var t = window.location.pathname;
            "/" !== t[0] && (t = "/" + t);
            var n = encodeURIComponent(window.location.protocol + "//" + window.location.host + t + window.location.search),
                e = encodeURIComponent(document.referrer);
            return fetch("https://devs-api.poki.comsa/gameinfo/@sdk?href=" + n + "&referrer=" + e, {
                method: "GET",
                headers: {
                    "Content-Type": "text/plain"
                }
            }).then((function(t) {
                return Y(void 0, void 0, void 0, (function() {
                    var n;
                    return $(this, (function(e) {
                        switch (e.label) {
                            case 0:
                                return t.status >= 200 && t.status < 400 ? [4, t.json()] : [3, 2];
                            case 1:
                                return (n = e.sent()).game_id ? [2, {
                                    gameId: n.game_id,
                                    adTiming: {
                                        preroll: n.ad_settings.preroll,
                                        timePerTry: n.ad_settings.time_per_try,
                                        timeBetweenAds: n.ad_settings.time_between_ads,
                                        startAdsAfter: n.ad_settings.start_ads_after
                                    }
                                }] : [2, void 0];
                            case 2:
                                throw t
                        }
                    }))
                }))
            })).catch((function(t) {
                return function(t) {
                    return Y(this, void 0, void 0, (function() {
                        var n, e, i, r, o, a, s, d, c, u, l, A;
                        return $(this, (function(m) {
                            switch (m.label) {
                                case 0:
                                    return m.trys.push([0, 3, , 4]), "/" !== (n = window.location.pathname)[0] && (n = "/" + n), r = (i = JSON).stringify, o = {
                                        c: "sdk-p4d-error",
                                        ve: 7
                                    }, a = {
                                        k: "error"
                                    }, d = (s = JSON).stringify, c = {
                                        status: t.status
                                    }, (u = t.json) ? [4, t.json()] : [3, 2];
                                case 1:
                                    u = m.sent(), m.label = 2;
                                case 2:
                                    if (e = r.apply(i, [(o.d = [(a.v = d.apply(s, [(c.json = u, c.body = JSON.stringify({
                                            href: window.location.protocol + "//" + window.location.host + n + window.location.search
                                        }), c.name = t.name, c.message = t.message, c)]), a)], o)]), l = "https://t.poki.iossss/l", navigator.sendBeacon) navigator.sendBeacon(l, e);
                                    else try {
                                        (A = new XMLHttpRequest).open("POST", l, !0), A.send(e)
                                    } catch (t) {}
                                    return [3, 4];
                                case 3:
                                    return m.sent(), [3, 4];
                                case 4:
                                    return [2]
                            }
                        }))
                    }))
                }(t)
            }))
        },
        nt = function(t, n, e, i) {
            return new(e || (e = Promise))((function(r, o) {
                function a(t) {
                    try {
                        d(i.next(t))
                    } catch (t) {
                        o(t)
                    }
                }

                function s(t) {
                    try {
                        d(i.throw(t))
                    } catch (t) {
                        o(t)
                    }
                }

                function d(t) {
                    var n;
                    t.done ? r(t.value) : (n = t.value, n instanceof e ? n : new e((function(t) {
                        t(n)
                    }))).then(a, s)
                }
                d((i = i.apply(t, n || [])).next())
            }))
        },
        et = function(t, n) {
            var e, i, r, o, a = {
                label: 0,
                sent: function() {
                    if (1 & r[0]) throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }), o;

            function s(o) {
                return function(s) {
                    return function(o) {
                        if (e) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (e = 1, i && (r = 2 & o[0] ? i.return : o[0] ? i.throw || ((r = i.return) && r.call(i), 0) : i.next) && !(r = r.call(i, o[1])).done) return r;
                            switch (i = 0, r && (o = [2 & o[0], r.value]), o[0]) {
                                case 0:
                                case 1:
                                    r = o;
                                    break;
                                case 4:
                                    return a.label++, {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++, i = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(r = (r = a.trys).length > 0 && r[r.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < r[1]) {
                                        a.label = r[1], r = o;
                                        break
                                    }
                                    if (r && a.label < r[2]) {
                                        a.label = r[2], a.ops.push(o);
                                        break
                                    }
                                    r[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = n.call(t, a)
                        } catch (t) {
                            o = [6, t], i = 0
                        } finally {
                            e = r = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, s])
                }
            }
        };

    function it() {
        return nt(this, void 0, Promise, (function() {
            var t;
            return et(this, (function(n) {
                switch (n.label) {
                    case 0:
                        return n.trys.push([0, 3, , 4]), [4, fetch("lng.txt", {
                            method: "GET",
                            headers: {
                                "Content-Type": "text/plain"
                            }
                        })];
                    case 1:
                        return [4, n.sent().json()];
                    case 2:
                        return [2, n.sent().ISO];
                    case 3:
                        return t = n.sent(), console.error(t), [2, "ZZ"];
                    case 4:
                        return [2]
                }
            }))
        }))
    }
    var rt = e(67),
        ot = function(t, n, e, i) {
            return new(e || (e = Promise))((function(r, o) {
                function a(t) {
                    try {
                        d(i.next(t))
                    } catch (t) {
                        o(t)
                    }
                }

                function s(t) {
                    try {
                        d(i.throw(t))
                    } catch (t) {
                        o(t)
                    }
                }

                function d(t) {
                    var n;
                    t.done ? r(t.value) : (n = t.value, n instanceof e ? n : new e((function(t) {
                        t(n)
                    }))).then(a, s)
                }
                d((i = i.apply(t, n || [])).next())
            }))
        },
        at = function(t, n) {
            var e, i, r, o, a = {
                label: 0,
                sent: function() {
                    if (1 & r[0]) throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }), o;

            function s(o) {
                return function(s) {
                    return function(o) {
                        if (e) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (e = 1, i && (r = 2 & o[0] ? i.return : o[0] ? i.throw || ((r = i.return) && r.call(i), 0) : i.next) && !(r = r.call(i, o[1])).done) return r;
                            switch (i = 0, r && (o = [2 & o[0], r.value]), o[0]) {
                                case 0:
                                case 1:
                                    r = o;
                                    break;
                                case 4:
                                    return a.label++, {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++, i = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(r = (r = a.trys).length > 0 && r[r.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < r[1]) {
                                        a.label = r[1], r = o;
                                        break
                                    }
                                    if (r && a.label < r[2]) {
                                        a.label = r[2], a.ops.push(o);
                                        break
                                    }
                                    r[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = n.call(t, a)
                        } catch (t) {
                            o = [6, t], i = 0
                        } finally {
                            e = r = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, s])
                }
            }
        },
        st = !1,
        dt = function() {
            return ot(void 0, void 0, void 0, (function() {
                var t, n, e;
                return at(this, (function(i) {
                    switch (i.label) {
                        case 0:
                            if (st) return [2];
                            i.label = 1;
                        case 1:
                            return i.trys.push([1, 4, , 5]), [4, fetch("./touchControllerConfig.json")];
                        case 2:
                            return [4, i.sent().json()];
                        case 3:
                            return (t = i.sent()) && ((n = document.createElement("script")).src = "//game-cdn.poki.com/scripts/touchOverlayController.js", n.onload = function() {
                                new window.OverlayController(document.body, t)
                            }, document.head.appendChild(n), st = !0), [3, 5];
                        case 4:
                            return e = i.sent(), console.log(e), [3, 5];
                        case 5:
                            return [2]
                    }
                }))
            }))
        },
        ct = function() {
            return (ct = Object.assign || function(t) {
                for (var n, e = 1, i = arguments.length; e < i; e++)
                    for (var r in n = arguments[e]) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
                return t
            }).apply(this, arguments)
        },
        ut = {},
        lt = {
            gameId: S("game_id"),
            versionId: S("game_version_id")
        },
        At = function(t) {
            return "poki-display-" + t[0] + "x" + t[1] + "-" + document.body.querySelectorAll('[data-poki-ad-size="' + t.join("x") + '"] .poki-ad-slot').length
        },
        mt = function() {
            function t() {
                var n = this;
                this.autoStartOnReady = !1, this.criteria = {}, this.debug = !1, this.debugIsOverwritten = !1, this.handlers = {}, this.isInitialized = !1, this.programmaticAdsEnabled = !0, this.sdkBooted = !1, this.sdkImaError = !1, this.startAdEnabled = !1, this.startStartAdsAfterTimerOnInit = !1, this.initOptions = {}, this.adReady = !1, this.debugTouchOverlayController = !1, this.setPlayerAge = function(t) {
                    t && function(t, n) {
                        if (H) try {
                            localStorage.setItem(t, n)
                        } catch (e) {
                            H = !1, N[t] = n
                        } else N[t] = n
                    }("playerAge", t)
                }, this.toggleNonPersonalized = function(n) {
                    t.nonPersonalized = n
                }, this.setConsentString = function(n) {
                    t.consentString = n
                }, this.sdkNotBootedButCalled = function() {
                    console.error("The Poki SDK has not yet been initialized")
                }, this.defineSlot = function(t) {
                    var e = At(t.size),
                        i = n.googletag.defineSlot("/21682198607/" + t.id, t.size, e);
                    return i.addService(n.googletag.pubads()), ut[e] = i, n.googletag.enableServices(), i
                }
            }
            return t.prototype.init = function(t) {
                if (void 0 === t && (t = {}), "undefined" != typeof window) {
                    if (this.isInitialized) return console.error("Poki SDK has already been initialized");
                    var n = t.onReady,
                        e = void 0 === n ? null : n,
                        i = t.onAdblocked,
                        r = void 0 === i ? null : i;
                    return this.initOptions = t, e && this.registerHandler("onReady", e), r && this.registerHandler("onAdblocked", r), this.setupDefaultEvents(), g.setupDefaultEvents(), "true" === encodeURIComponent(S("lazy") || "") ? (console.debug("Init in Lazy mode"), new Promise((function(t) {
                        return t()
                    }))) : (console.debug("Init in Normal mode"), this.lazyLoadInit())
                }
            }, t.prototype.lazyLoadInit = function() {
                var n = this,
                    e = this.initOptions,
                    i = e.adTagUrl,
                    r = e.adTiming,
                    o = void 0 === r ? {} : r,
                    a = e.customCriteria,
                    s = void 0 === a ? {} : a,
                    d = e.debug,
                    u = void 0 !== d && d,
                    A = e.prebid,
                    m = void 0 === A ? {} : A,
                    p = e.waterfallRetries,
                    f = e.wrapper,
                    g = void 0 === f ? document.body : f,
                    w = e.skipFeature,
                    y = void 0 !== w && w,
                    k = e.minimizeFeature,
                    x = void 0 !== k && k,
                    T = e.countdownStart,
                    z = void 0 === T ? 6 : T,
                    C = e.renderSkipButton,
                    B = void 0 !== C && C,
                    _ = e.forceDisableHB,
                    D = void 0 !== _ && _,
                    O = e.prebid3,
                    j = void 0 !== O && O,
                    M = parseInt(S("site_id"), 10) || 0,
                    R = rt.a;
                (5 === M || j) && (R = "https://a.poki.com/prebid/prebid3.19.0.js");
                var Z = J(R).then((function() {
                        var t;
                        t = m, window.pbjs = window.pbjs || {}, window.pbjs.que = window.pbjs.que || [], window.pbjs.que.push((function() {
                            window.pbjs.addAdUnits(t.adUnits || I), window.pbjs.setConfig(E(E({}, P), t.config))
                        }))
                    })),
                    G = ct({}, h);
                i ? (t.isPokiPlatform = !0, G = ct(ct({}, G), {
                    adTagUrl: i,
                    customCriteria: s,
                    adTiming: o
                })) : t.isPokiPlatform = !1;
                var H = tt;
                (t.isPokiPlatform || this.debug) && (H = function() {
                    return Promise.resolve()
                }), window.addEventListener("resize", this.resize.bind(this), !1), window.addEventListener("message", this.onMessage.bind(this), !1);
                var N = S("pokiDebug");
                return N ? (this.setDebug("true" === N), this.debugIsOverwritten = !0) : this.setDebug(this.debug || u), this.debugTouchOverlayController && (v() || b()) && dt(), Promise.all([H(), it(), J("https://imasdk.googleapis.comsa/js/sdkloader/ima3.js"), J("https://securepubads.g.doubleclick.netsa/tag/js/gpt.js"), Z]).catch((function() {
                    l.dispatchEvent(c.adblocked)
                })).then((function(e) {
                    if (void 0 !== e) {
                        var i = e[0],
                            r = e[1],
                            o = ct(ct({}, G), {
                                country: r
                            });
                        if (i) {
                            lt.gameId || (lt.gameId = i.gameId);
                            ["7fb1fd45-24ce-4ade-b5c4-9ee55ec99526"].includes(lt.gameId) && (v() || b()) && dt(), o.adTiming = i.adTiming, o.customCriteria = ct(ct({}, o.customCriteria), {
                                p4d_game_id: lt.gameId
                            })
                        }
                        n.debug && (o.adTiming.startAdsAfter = 0), n.enableSettings(o), (y || x) && t.isPokiPlatform ? n.playerSkin = new F({
                            wrapper: g,
                            minimizeFeature: x,
                            skipFeature: y,
                            countdownStart: z,
                            renderSkipButton: B
                        }) : t.GetIsSkipTestCountry() ? n.playerSkin = new F({
                            wrapper: g,
                            minimizeFeature: !1,
                            skipFeature: !0,
                            countdownStart: 6,
                            renderSkipButton: !0
                        }) : n.playerSkin = new F({
                            wrapper: g,
                            minimizeFeature: !1,
                            skipFeature: !1
                        }), n.ima = new K, n.playerSkin.setupEvents(n), n.startStartAdsAfterTimerOnInit && n.adTimings.startStartAdsAfterTimer(), n.waterfall = new L(n.ima, {
                            timing: n.adTimings,
                            totalRetries: p,
                            adTagUrl: o.adTagUrl,
                            siteID: M,
                            disableHB: D
                        }), n.googletag = window.googletag || {
                            cmd: []
                        }, n.isInitialized = !0, l.dispatchEvent(c.ready)
                    }
                }))
            }, t.prototype.requestAd = function(n) {
                var e = this;
                void 0 === n && (n = {});
                var i = function() {
                    var i = n.autoStart,
                        r = void 0 === i || i,
                        o = n.customCriteria,
                        a = void 0 === o ? {} : o,
                        s = n.onFinish,
                        d = void 0 === s ? null : s,
                        u = n.onStart,
                        m = void 0 === u ? null : u,
                        p = n.position,
                        f = void 0 === p ? null : p,
                        g = n.runOnPlatform,
                        h = void 0 !== g && g,
                        w = n.overwriteAdTag,
                        y = void 0 === w ? void 0 : w;
                    if (l.clearAnnotations(), e.autoStartOnReady = !1 !== r, d && e.registerHandler("onFinish", d), m && e.registerHandler("onStart", m), !e.sdkBooted) return l.dispatchEvent(c.ads.error, {
                        message: "Requesting ad on unbooted SDK"
                    }), void e.sdkNotBootedButCalled();
                    if (e.sdkImaError) l.dispatchEvent(c.ads.error, {
                        message: "Adblocker has been detected"
                    });
                    else {
                        if ((v() || b()) && f !== c.ads.position.rewarded) return l.dispatchEvent(c.ads.error, {
                            reason: "Interstitials are disabled on mobile"
                        });
                        if (null === f || !A(f, c.ads.position)) return console.error("POKI-SDK: Invalid position");
                        if (e.ima.isAdRunning() || e.waterfall.isRunning()) return l.dispatchEvent(c.ads.busy);
                        if (e.adReady) return l.dispatchEvent(c.ads.ready);
                        if (f === c.ads.position.preroll && !e.adTimings.prerollPossible()) return l.dispatchEvent(c.ads.limit, {
                            reason: c.info.messages.prerollLimit
                        });
                        if (f !== c.ads.position.rewarded && !e.adTimings.requestPossible()) return l.dispatchEvent(c.ads.limit, {
                            reason: c.info.messages.timeLimit
                        });
                        var k = ct(ct(ct({}, e.genericCriteria()), e.criteria), {
                            position: f
                        });
                        (t.isPokiPlatform || f === c.ads.position.rewarded) && (k = ct(ct({}, k), a)), e.playerSkin.showWithOpacity(), e.resize(), e.playerSkin.setPosition(f), e.waterfall.start(k, f, y ? [y] : [], h)
                    }
                };
                this.isInitialized ? i() : this.lazyLoadInit().then(i)
            }, t.prototype.runWaterfallChain = function(t) {
                var n = this;
                void 0 === t && (t = {});
                var e = function() {
                    var e = t.customCriteria,
                        i = void 0 === e ? {} : e,
                        r = t.onFinish,
                        o = void 0 === r ? null : r,
                        a = t.onStart,
                        s = void 0 === a ? null : a,
                        d = t.overwriteAdTags,
                        u = void 0 === d ? [] : d,
                        m = t.position,
                        p = void 0 === m ? null : m;
                    if (l.clearAnnotations(), o && n.registerHandler("onFinish", o), s && n.registerHandler("onStart", s), !n.sdkBooted) return l.dispatchEvent(c.ads.error, {
                        message: "Requesting ad on unbooted SDK"
                    }), void n.sdkNotBootedButCalled();
                    if (n.sdkImaError) l.dispatchEvent(c.ads.error, {
                        message: "Adblocker has been detected"
                    });
                    else {
                        if (null === p || !A(p, c.ads.position)) return console.error("POKI-SDK: Invalid position");
                        if (n.ima.isAdRunning() || n.waterfall.isRunning()) return l.dispatchEvent(c.ads.busy);
                        if (n.adReady) return l.dispatchEvent(c.ads.ready);
                        n.autoStartOnReady = !0, n.playerSkin.showWithOpacity(), n.resize(), n.playerSkin.setPosition(p), n.waterfall.start(i, p, u, !1)
                    }
                };
                this.isInitialized ? e() : this.lazyLoadInit().then(e)
            }, t.prototype.displayAd = function(t, n) {
                var e = this,
                    i = function() {
                        if (n) {
                            if (!e.sdkBooted) return l.dispatchEvent(c.ads.displayError, {
                                message: "Requesting ad on unbooted SDK"
                            }), void e.sdkNotBootedButCalled();
                            if (t)
                                if (e.sdkImaError) l.dispatchEvent(c.ads.displayError, {
                                    message: "Adblocker has been detected"
                                });
                                else {
                                    var i = function(t, n) {
                                        void 0 === n && (n = !1);
                                        if ((v() || b() || ["970x250", "300x250", "728x90", "160x600"].includes(t)) && (!v() && !b() || ["320x50"].includes(t))) {
                                            var e = t.split("x").map((function(t) {
                                                return parseInt(t, 10)
                                            }));
                                            if (n) return {
                                                id: "debug-display/debug-display-" + t,
                                                size: e
                                            };
                                            var i = "desktop";
                                            v() && (i = "mobile"), b() && (i = "tablet");
                                            var r = parseInt(S("site_id"), 10) || 0;
                                            return {
                                                id: mt.GetIsPokiIFrame() ? i + "_ingame_" + t + "/" + r + "_" + i + "_ingame_" + t : "external_" + i + "_display_ingame/external_" + i + "_ingame_" + t,
                                                size: e
                                            }
                                        }
                                    }(n, e.debug);
                                    if (!i) return l.dispatchEvent(c.ads.displayError, {
                                        reason: "Display size " + n + " is not supported on this device"
                                    });
                                    var r = ct(ct({}, e.genericCriteria()), e.criteria);
                                    t.getAttribute("data-poki-ad-size") && (console.warn("Poki-SDK: Container already has a display ad in it. Destroying."), e.destroyAd(t)), e.googletag.cmd.push((function() {
                                        var t = e.defineSlot(i);
                                        t.clearTargeting(), Object.keys(r).forEach((function(n) {
                                            t.setTargeting(n, r[n])
                                        }))
                                    })), e.googletag.cmd.push((function() {
                                        var n = document.createElement("div");
                                        n.id = At(i.size), n.className = "poki-ad-slot", n.style.width = i.size[0] + "px", n.style.height = i.size[1] + "px", t.appendChild(n), t.setAttribute("data-poki-ad-size", i.size.join("x")), e.googletag.display(n.id)
                                    }))
                                }
                            else l.dispatchEvent(c.ads.displayError, {
                                message: "Provided container does not exist"
                            })
                        } else l.dispatchEvent(c.ads.displayError, {
                            message: "No ad size given, usage: displayAd(<container>, <size>)"
                        })
                    };
                this.isInitialized ? i() : this.lazyLoadInit().then(i)
            }, t.prototype.destroyAd = function(t) {
                var n = this,
                    e = function() {
                        if (!n.sdkBooted) return l.dispatchEvent(c.ads.displayError, {
                            message: "Attempting destroyAd on unbooted SDK"
                        }), void n.sdkNotBootedButCalled();
                        n.sdkImaError ? l.dispatchEvent(c.ads.displayError, {
                            message: "Adblocker has been detected"
                        }) : (t || (t = document.body), Array.from(t.getElementsByClassName("poki-ad-slot")).filter((function(t) {
                            return ut[t.id]
                        })).forEach((function(t) {
                            var e = ut[t.id];
                            n.googletag.cmd.push((function() {
                                t.parentElement && t.parentElement.removeChild(t), n.googletag.destroySlots([e])
                            }))
                        })))
                    };
                this.isInitialized ? e() : this.lazyLoadInit().then(e)
            }, t.prototype.startStartAdsAfterTimer = function() {
                this.sdkBooted && !this.sdkImaError ? this.adTimings.startStartAdsAfterTimer() : this.startStartAdsAfterTimerOnInit = !0
            }, t.prototype.enableSettings = function(t) {
                this.criteria = ct({}, t.customCriteria), this.adTimings = new y(t.adTiming), this.country = t.country
            }, t.prototype.togglePlayerAdvertisingConsent = function(t) {
                if (t) {
                    var n, e = parseInt(function(t) {
                            if (!H) return N[t];
                            try {
                                return localStorage.getItem(t)
                            } catch (n) {
                                return N[t]
                            }
                        }("playerAge"), 10) || 0,
                        i = this.country,
                        r = (n = i, X.includes(n)),
                        o = function(t) {
                            return Q.includes(t)
                        }(i),
                        a = W(i);
                    (r || o || W) && (r && e <= 12 || o && e <= 16 || a && e <= 16) ? this.disableProgrammatic(): this.enableProgrammatic()
                } else this.disableProgrammatic()
            }, t.prototype.disableProgrammatic = function() {
                t.childDirected = !0, this.programmaticAdsEnabled = !1
            }, t.prototype.enableProgrammatic = function() {
                t.childDirected = !1, this.programmaticAdsEnabled = !0
            }, t.prototype.getProgrammaticAdsEnabled = function() {
                return this.programmaticAdsEnabled
            }, t.prototype.setDebug = function(t) {
                var n = this;
                this.debugIsOverwritten ? t && g.track(c.tracking.debugTrueInProduction) : (g.setDebug(t), l.setDebug(t), this.waterfall ? this.waterfall.setDebug(t) : l.addEventListener(c.ready, (function() {
                    n.waterfall && n.waterfall.setDebug(t)
                })), this.debug = t)
            }, t.prototype.resize = function() {
                var t = this;
                if (!this.sdkBooted) return this.sdkNotBootedButCalled();
                if (!this.sdkImaError) {
                    var n = this.playerSkin.getVideoBounds();
                    0 !== n.width && 0 !== n.height ? this.ima.resize(n.width, n.height) : setTimeout((function() {
                        t.resize()
                    }), 100)
                }
            }, t.prototype.onMessage = function(t) {
                if ("string" == typeof t.data.type) switch (t.data.type) {
                    case "toggleNonPersonalized":
                        this.toggleNonPersonalized(!(!t.data.content || !t.data.content.nonPersonalized));
                        break;
                    case "setPersonalizedADConsent":
                        this.toggleNonPersonalized(!(t.data.content && t.data.content.consent)), this.setConsentString(t.data.content ? t.data.content.consentString : "")
                }
            }, t.prototype.startAd = function() {
                if (!this.sdkBooted) return this.sdkNotBootedButCalled();
                this.sdkImaError || (this.adReady ? (this.playerSkin.show(), this.resize(), this.ima.startPlayback()) : l.dispatchEvent(c.ads.error, {
                    message: "No ads ready to start"
                }))
            }, t.prototype.startAdClicked = function() {
                "undefined" != typeof navigator && /(iPad|iPhone|iPod)/gi.test(navigator.userAgent) && this.startAdEnabled && (this.startAdEnabled = !1, this.playerSkin.hideStartAdButton(), this.ima.startIOSPlayback())
            }, t.prototype.stopAd = function() {
                if (!this.sdkBooted) return this.sdkNotBootedButCalled();
                this.sdkImaError || (this.waterfall.stopWaterfall(), this.ima.stopPlayback(), this.playerSkin.hide())
            }, t.prototype.resumeAd = function() {
                if (!this.sdkBooted) return this.sdkNotBootedButCalled();
                this.sdkImaError || (this.playerSkin.hidePauseButton(), this.ima.resumeAd())
            }, t.prototype.skipAd = function() {
                this.stopAd(), this.callHandler("onFinish", {
                    type: c.ads.completed,
                    rewardAllowed: !0
                })
            }, t.prototype.muteAd = function() {
                if (!this.sdkBooted) return this.sdkNotBootedButCalled();
                this.sdkImaError || this.ima.muteAd()
            }, t.prototype.registerHandler = function(t, n) {
                this.handlers[t] = n
            }, t.prototype.callHandler = function(t) {
                for (var n = [], e = 1; e < arguments.length; e++) n[e - 1] = arguments[e];
                "function" == typeof this.handlers[t] && this.handlers[t](n)
            }, t.prototype.setupDefaultEvents = function() {
                var t = this;
                l.addEventListener(c.ready, (function() {
                    t.sdkBooted = !0, t.callHandler("onReady")
                })), l.addEventListener(c.adblocked, (function() {
                    t.sdkBooted = !0, t.sdkImaError = !0, t.callHandler("onAdblocked")
                })), l.addEventListener(c.ads.ready, (function() {
                    t.adReady = !0, t.autoStartOnReady && t.startAd()
                })), l.addEventListener(c.ads.started, (function() {
                    t.playerSkin.hideSpinner(), t.callHandler("onStart", {
                        type: c.ads.limit
                    })
                })), l.addEventListener(c.ads.video.paused, (function() {
                    t.playerSkin.showPauseButton()
                })), l.addEventListener(c.ads.limit, (function() {
                    t.callHandler("onFinish", {
                        type: c.ads.limit,
                        rewardAllowed: !1
                    })
                })), l.addEventListener(c.ads.stopped, (function() {
                    t.callHandler("onFinish", {
                        type: c.ads.stopped,
                        rewardAllowed: !1
                    })
                })), l.addEventListener(c.ads.error, (function() {
                    t.callHandler("onFinish", {
                        type: c.ads.error,
                        rewardAllowed: !1
                    })
                })), l.addEventListener(c.ads.busy, (function() {
                    t.callHandler("onFinish", {
                        type: c.ads.busy,
                        rewardAllowed: !1
                    })
                })), l.addEventListener(c.ads.completed, (function(n) {
                    t.callHandler("onFinish", {
                        type: c.ads.completed,
                        rewardAllowed: !!n.rewardAllowed
                    })
                })), [c.ads.limit, c.ads.stopped, c.ads.error, c.ads.busy, c.ads.completed, c.ads.pushedToPlatform].forEach((function(n) {
                    l.addEventListener(n, (function() {
                        t.playerSkin && t.playerSkin.hide(), t.adReady = !1
                    }))
                }))
            }, t.prototype.genericCriteria = function() {
                var t = {},
                    n = encodeURIComponent(S("tag") || ""),
                    e = encodeURIComponent(S("site_id") || ""),
                    i = encodeURIComponent(S("categories") || "");
                return t.tag = n, t.tag_site = n + "|" + e, t.site_id = e, t.categories = i, n.includes("-exp-minimize-ads-c.") ? t.exp_min_video = 1 : n.includes("-exp-minimize-ads-1.") ? t.exp_min_video = 2 : n.includes("-exp-minimize-ads-2.") ? t.exp_min_video = 3 : n.includes("-exp-minimize-ads-3.") && (t.exp_min_video = 4), this.programmaticAdsEnabled || (t.disable_programmatic = 1), t
            }, t.GetIsPokiPlatform = function() {
                return t.isPokiPlatform
            }, t.GetIsPokiIFrame = function() {
                return (parseInt(S("site_id"), 10) || 0) > 0
            }, t.GetIsMinimizeTestCountry = function() {
                var t = parseInt(S("site_id"), 10) || 0,
                    n = encodeURIComponent(S("tag") || ""),
                    e = v() || b();
                return 9 === t && (n.includes("-exp-minimize-ads-1.") || n.includes("-exp-minimize-ads-2.")) && !e
            }, t.GetIsSkipTestCountry = function() {
                var t = parseInt(S("site_id"), 10) || 0,
                    n = encodeURIComponent(S("tag") || ""),
                    e = v() || b();
                return 9 === t && n.includes("-exp-minimize-ads-3.") && !e
            }, t.childDirected = !1, t.isPokiPlatform = !1, t.nonPersonalized = !1, t.consentString = "", t
        }(),
        pt = mt;

    function ft(t) {
        switch (Object.prototype.toString.call(t)) {
            case "[object Error]":
            case "[object Exception]":
            case "[object DOMException]":
                return !0;
            default:
                return t instanceof Error
        }
    }
    var gt = document.location.hostname;
    gt.endsWith("poki-gdn.com") && (gt = "poki-gdn.com");
    var ht, wt = Date.now(),
        yt = (ht = new RegExp("poki_erruid" + "=([^;]+)(?:;|$)").exec(document.cookie)) ? ht[1] : "";

    function kt(t) {
        if (lt.gameId && lt.versionId) {
            if (!(Date.now() < wt)) {
                yt || function(t, n, e) {
                    document.cookie = t + "=" + n + "; path=/; max-age=" + (e || 63072e3) + "; domain=" + gt
                }("poki_erruid", yt = Math.random().toString(36).substr(2, 9));
                try {
                    var n = JSON.stringify({
                            gid: lt.gameId,
                            vid: lt.versionId,
                            ve: 7,
                            n: t.name,
                            m: t.message,
                            s: JSON.stringify(t.stack),
                            ui: yt
                        }),
                        e = "https://t.poki.io/ge";
                    if (navigator.sendBeacon) navigator.sendBeacon(e, n);
                    else {
                        var i = new XMLHttpRequest;
                        i.open("POST", e, !0), i.send(n)
                    }
                    wt = Date.now() + 100
                } catch (t) {
                    console.error(t)
                }
            }
        } else console.log(t)
    }

    function vt(t) {
        return "function" == typeof t
    }

    function bt(t, n) {
        return Object.prototype.hasOwnProperty.call(t, n)
    }

    function St(t, n, e) {
        if (null != t) {
            var i = t[n];
            i && i.__poki__ || (t[n] = e(i), t[n].__poki__ = !0, t[n].__orig__ = i)
        }
    }

    function Et(t) {
        if (!vt(t)) return t;
        try {
            if (t.__poki__) return t;
            if (t.__poki_wrapper__) return t.__poki_wrapper__
        } catch (n) {
            return t
        }

        function n() {
            for (var n = [], e = arguments.length; e--;) n[e] = Et(arguments[e]);
            try {
                var i = t.apply(this, n);
                return window.pokiLastCatch = null, i
            } catch (t) {
                throw window.pokiLastCatch = t, t
            }
        }
        for (var e in t) bt(t, e) && (n[e] = t[e]);
        return n.prototype = t.prototype, t.__poki_wrapper__ = n, n.__poki__ = !0, n.__orig__ = t, n
    }

    function xt(t) {
        return function(n, e) {
            for (var i = new Array(arguments.length), r = 0; r < i.length; ++r) i[r] = arguments[r];
            var o = i[0];
            return vt(o) && (i[0] = Et(o)), t.apply ? t.apply(this, i) : t(i[0], i[1])
        }
    }
    if ("undefined" != typeof window) {
        d.a.remoteFetching = !1, d.a.report.subscribe((function(t) {
            if ("Script error." === t.message && window.pokiLastCatch) {
                var n = window.pokiLastCatch;
                window.pokiLastCatch = null, d.a.report(n)
            } else kt(t)
        })), window.onunhandledrejection = function(t) {
            ft(t.reason) ? d.a.report(t.reason) : kt({
                name: "unhandledrejection",
                message: JSON.stringify(t.reason)
            })
        };
        "bd6bdd9e-33a9-11ea-a08a-acde48001122" === lt.gameId && (["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"].forEach((function(t) {
            return n = t, void((e = window[n] && window[n].prototype) && e.hasOwnProperty && e.hasOwnProperty("addEventListener") && (St(e, "addEventListener", (function(t) {
                return function(n, e, i, r) {
                    try {
                        e && e.handleEvent && (e.handleEvent = Et(e.handleEvent))
                    } catch (t) {}
                    return t.call(this, n, Et(e), i, r)
                }
            })), St(e, "removeEventListener", (function(t) {
                return function(n, e, i, r) {
                    try {
                        e = e && (e.__poki_wrapper__ ? e.__poki_wrapper__ : e)
                    } catch (t) {}
                    return t.call(this, n, e, i, r)
                }
            }))));
            var n, e
        })), St(window, "setTimeout", xt), St(window, "setInterval", xt), void 0 !== window.requestAnimationFrame && St(window, "requestAnimationFrame", (function(t) {
            return function(n) {
                return t(Et(n))
            }
        })))
    }
    var Tt = function() {
            return (Tt = Object.assign || function(t) {
                for (var n, e = 1, i = arguments.length; e < i; e++)
                    for (var r in n = arguments[e]) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
                return t
            }).apply(this, arguments)
        },
        zt = function() {
            function t() {
                var t = this;
                this.gameStarted = !1, this.SDK = new pt, this.init = function(n) {
                    return void 0 === n && (n = {}), new Promise((function(e, i) {
                        n && n.adTagUrl && window && (window.__InternalSDK = t.SDK, window.__Definitions = c), t.SDK.init(Tt({
                            onReady: e,
                            onAdblocked: i
                        }, n)), m.sendMessage(c.message.sdkDetails, {
                            version: "2.102.0"
                        })
                    }))
                }, this.initWithVideoHB = function() {
                    return t.init()
                }, this.gameLoadingProgress = function() {}, this.gameLoadingStart = function() {
                    g.track(c.tracking.screen.gameLoadingStarted)
                }, this.gameLoadingFinished = function() {
                    g.track(c.tracking.screen.gameLoadingFinished)
                }, this.gameplayStart = function() {
                    t.gameStarted || (t.gameStarted = !0, g.track(c.tracking.screen.firstRound), t.SDK.startStartAdsAfterTimer()), g.track(c.tracking.screen.gameplayStart)
                }, this.gameInteractive = function() {
                    g.track(c.tracking.screen.gameInteractive)
                }, this.gameplayStop = function() {
                    g.track(c.tracking.screen.gameplayStop)
                }, this.roundStart = function(t) {
                    void 0 === t && (t = ""), t = String(t), g.track(c.tracking.screen.roundStart, {
                        identifier: t
                    })
                }, this.roundEnd = function(t) {
                    void 0 === t && (t = ""), t = String(t), g.track(c.tracking.screen.roundEnd, {
                        identifier: t
                    })
                }, this.customEvent = function(n, e, i) {
                    if (void 0 === i && (i = {}), !n || !e) return t.error("customEvent", "customEvent needs at least a noun and a verb");
                    n = String(n), e = String(e), i = Tt({}, i), g.track(c.tracking.custom, {
                        eventNoun: n,
                        eventVerb: e,
                        eventData: i
                    })
                }, this.commercialBreak = function() {
                    return new Promise((function(n) {
                        g.track(c.tracking.screen.commercialBreak);
                        var e = t.gameStarted ? c.ads.position.midroll : c.ads.position.preroll;
                        pt.GetIsMinimizeTestCountry() ? t.runPlatformVideo(e).then((function() {
                            return n()
                        })) : t.SDK.requestAd({
                            position: e,
                            onFinish: n
                        })
                    }))
                }, this.rewardedBreak = function() {
                    return new Promise((function(n) {
                        g.track(c.tracking.screen.rewardedBreak), pt.GetIsMinimizeTestCountry() ? t.runPlatformVideo(c.ads.position.rewarded).then(n) : t.SDK.requestAd({
                            position: c.ads.position.rewarded,
                            onFinish: function(t) {
                                t.length > 0 ? n(t[0].rewardAllowed) : n(!1)
                            }
                        })
                    }))
                }, this.runPlatformVideo = function(n) {
                    return new Promise((function(e) {
                        if ("undefined" != typeof window) {
                            var i = function(n) {
                                if ("string" == typeof n.data.type) switch (n.data.type) {
                                    case "videoAdResult":
                                        window.removeEventListener("message", i, !1), e(n.data.content && n.data.content.rewardAllowed);
                                        break;
                                    case "videoAdBlockedByPlatform":
                                        t.SDK.runWaterfallChain({
                                            onFinish: function(t) {
                                                var n = !1;
                                                t.length > 0 && (n = t.pop().rewardAllowed), e(n)
                                            },
                                            position: n.data.content.position,
                                            overwriteAdTags: n.data.content.adTagUrls,
                                            customCriteria: n.data.content.criteria
                                        })
                                }
                            };
                            window.addEventListener("message", i, !1), t.SDK.requestAd({
                                position: n,
                                runOnPlatform: !0,
                                onFinish: function() {
                                    return e(!1)
                                }
                            })
                        } else e()
                    }))
                }, this.happyTime = function(n) {
                    void 0 === n && (n = 1), ((n = Number(n)) < 0 || n > 1) && (n = Math.max(0, Math.min(1, n)), t.warning("happyTime", "Intensity should be a value between 0 and 1, adjusted to " + n)), g.track(c.tracking.screen.happyTime, {
                        intensity: n
                    })
                }, this.muteAd = function() {
                    t.SDK.muteAd()
                }, this.setPlayerAge = function(n) {
                    g.track(c.tracking.setPlayerAge, {
                        age: n
                    }), n && t.SDK.setPlayerAge(n)
                }, this.togglePlayerAdvertisingConsent = function(n) {
                    g.track(c.tracking.togglePlayerAdvertisingConsent, {
                        didConsent: n
                    }), t.SDK.togglePlayerAdvertisingConsent(n), m.sendMessage(c.message.toggleProgrammaticAds, {
                        enabled: t.SDK.getProgrammaticAdsEnabled()
                    })
                }, this.logError = function(t) {
                    ft(t) ? s.report(t) : kt({
                        name: "logError",
                        message: JSON.stringify(t)
                    })
                }, this.sendHighscore = function(t) {
                    g.track(c.tracking.screen.sendHighscore, {
                        score: t
                    })
                }, this.setDebugTouchOverlayController = function(n) {
                    t.SDK.debugTouchOverlayController = n
                }, this.getLeaderboard = function() {
                    return g.track(c.tracking.screen.getLeaderboard, {}), new Promise((function(t) {
                        var n = function(e) {
                            "string" == typeof e.data.type && "PokiLeaderboardMessage_receive" === e.data.type && (window.removeEventListener("message", n), t(e.data.content))
                        };
                        window.addEventListener("message", n, !1)
                    }))
                }, this.warning = function(t, n) {
                    console.warn("PokiSDK." + t + ": " + n)
                }, this.error = function(t, n) {
                    console.error("PokiSDK." + t + ": " + n)
                }
            }
            return t.prototype.setDebug = function(t) {
                void 0 === t && (t = !0), this.SDK.setDebug(t)
            }, t.prototype.disableProgrammatic = function() {
                this.SDK.disableProgrammatic()
            }, t.prototype.toggleNonPersonalized = function(t) {
                void 0 === t && (t = !1), this.SDK.toggleNonPersonalized(t)
            }, t.prototype.setConsentString = function(t) {
                this.SDK.setConsentString(t)
            }, t.prototype.displayAd = function(t, n) {
                g.track(c.tracking.screen.displayAd, {
                    size: n
                }), this.SDK.displayAd(t, n)
            }, t.prototype.destroyAd = function(t) {
                g.track(c.tracking.screen.destroyAd), this.SDK.destroyAd(t)
            }, t
        }();
    window.PokiSDK = new zt
}]);