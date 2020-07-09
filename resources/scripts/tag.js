!function i(a, s, m) {
    function c(t, e) {
        if (!s[t]) {
            if (!a[t]) {
                var n = "function" == typeof require && require;
                if (!e && n)
                    return n(t, !0);
                if (u)
                    return u(t, !0);
                var o = new Error("Cannot find module '" + t + "'");
                throw o.code = "MODULE_NOT_FOUND",
                o
            }
            var r = s[t] = {
                exports: {}
            };
            a[t][0].call(r.exports, function(e) {
                return c(a[t][1][e] || e)
            }, r, r.exports, i, a, s, m)
        }
        return s[t].exports
    }
    for (var u = "function" == typeof require && require, e = 0; e < m.length; e++)
        c(m[e]);
    return c
}({
    1: [function(e, t, n) {
        !function() {
            var r = window.analytics = window.analytics || [];
            if (!r.initialize)
                if (r.invoked)
                    window.console && console.error && console.error("Segment snippet included twice.");
                else {
                    r.invoked = !0,
                    r.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "reset", "group", "track", "ready", "alias", "debug", "page", "once", "off", "on"],
                    r.factory = function(t) {
                        return function() {
                            var e = Array.prototype.slice.call(arguments);
                            return e.unshift(t),
                            r.push(e),
                            r
                        }
                    }
                    ;
                    for (var e = 0; e < r.methods.length; e++) {
                        var t = r.methods[e];
                        r[t] = r.factory(t)
                    }
                    
                    r.SNIPPET_VERSION = "4.1.0"
                }
        }(),
        function() {
            if ("function" == typeof window.CustomEvent)
                return;
            window.CustomEvent = function(e, t) {
                t = t || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: null
                };
                var n = document.createEvent("CustomEvent");
                return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail),
                n
            }
        }();
        ["production", "staging", "development"].indexOf(_mtm.config.env);
        var r = "enabled" === localStorage.getItem("mtm_debug")
          , i = {};
        try {
            var o = localStorage.getItem("mtm_debug_config");
            o && (i = JSON.parse(o))
        } catch (e) {
            i = {}
        }
        function a(e) {
            if (!r)
                return !1;
            var t = i.filter;
            if (!t)
                return !0;
            if (t instanceof RegExp)
                return t.test(e);
            for (var n = t.split(","), o = 0; o < n.length; o++)
                if (0 <= e.indexOf(n[o]))
                    return !0;
            return !1
        }
        var s, m, c, u, l;
        window._mtm = {
            config: window._mtm.config,
            debugger: {
                enable: function(e, t, n) {
                    !1 !== e ? (localStorage.setItem("mtm_debug", "enabled"),
                    localStorage.setItem("mtm_debug_config", JSON.stringify({
                        config: n,
                        filter: t
                    })),
                    a("segment") ? analytics.debug() : analytics.debug(!1),
                    console.log("Debug mode enabled - please refresh the page")) : (analytics.debug(!1),
                    localStorage.setItem("mtm_debug", null))
                },
                log: function(e, t) {
                    a(e) && console.log("%c" + e + "%c - " + t, "color: #89D6F3;", "")
                },
                tagsExecuted: []
            },
            events: [],
            helpers: {},
            tags: [],
            triggers: {}
        },
        s = window.history,
        m = s.pushState,
        s.pushState = function(e) {
            "function" == typeof s.onpushstate && s.onpushstate({
                state: e
            });
            var t = new CustomEvent("pushstate",{
                detail: e
            });
            return document.dispatchEvent(t),
            m.apply(s, arguments)
        }
        ,
        
        
        
        
        c = "_gaexp",
        u = localStorage.getItem(c),
        (l = document.cookie.match(new RegExp(c + "=(.+?)(;|$)"))) ? u && u === l[1] || localStorage.setItem(c, l[1]) : u && (document.cookie = c + "=" + u),
        window._satellite = {
            getVar: function() {
                console.warn("_satellite.getVar is deprecated.")
            },
            pageBottom: function() {
                console.warn("_satellite.pageBottom is deprecated")
            },
            track: function() {
                console.warn("_satellite.track is deprecated.")
            }
        };
        
        _mtm.helpers.isProduction = function() {
            return 0 === window._mtm.config.env.indexOf("prod")
        }
        ;
        _mtm.helpers.isDevelopment = function() {
            return 0 === window._mtm.config.env.indexOf("dev")
        }
        ,
       
        _mtm.helpers.flashMessage = function(e, t, n, o) {
            var r = document.querySelector(e);
            if (!r)
                return _mtm.debugger.log("mtm:helpers:flashMessage", "No element for flash message found"),
                !1;
            if (!t)
                return _mtm.debugger.log("mtm:helpers:flashMessage", "No message for flash message found"),
                !1;
            if ({
                primary: !0,
                success: !0,
                danger: !0,
                warning: !0
            }[n]) {
                var i = "alert alert-" + n;
                o && (i += " " + o),
                r.className = i
            }
            return r.innerHTML = function(e) {
                var t = document.createElement("div");
                t.innerHTML = e;
                for (var n = t.getElementsByTagName("script"), o = 0; o < n.length; o++)
                    n[o].parentNode.removeChild(n[o]);
                return t.innerHTML
            }(t),
            !0
        }
        ;
        _mtm.helpers.get = function(e, t) {
            return e ? t.reduce(function(e, t) {
                return e && e[t] ? e[t] : null
            }, e) : null
        }
        ;
        _mtm.helpers.isPage = function(e) {
            return e instanceof RegExp ? e.test(window.location.pathname) : 0 === window.location.pathname.indexOf(e)
        }
        ;
        
        _mtm.helpers.loadScript = function(e) {
            var t = document.createElement("script");
            return t.src = e,
            document.body.appendChild(t),
            t
        }
        ;
        window._mtm.helpers.onDomChange = function(t, e, n) {
            var o = new MutationObserver(function(e) {
                e.forEach(function(e) {
                    "attributes" === e.type ? n(e.target) : e.addedNodes.forEach(function(e) {
                        e.matches && e.matches(t) && n(e)
                    })
                })
            }
            );
            return o.observe(document.documentElement, {
                attributeFilter: e,
                childList: !0,
                subtree: !0
            }),
            o
        }
        ;
        _mtm.helpers.request = function(e, t, n) {
            t = t || {};
            var o = new XMLHttpRequest
              , r = !1
              , i = 1e3;
            t.timeout && (i = t.timeout);
            var a = setTimeout(function() {
                r || n(new Error("Request Timeout"))
            }, i);
            o.open(t.method || "GET", e, !0),
            o.setRequestHeader("Content-type", "application/json"),
            o.withCredentials = t.withCredentials || !1,
            o.onreadystatechange = function() {
                if (o.readyState === XMLHttpRequest.DONE && n && "[object Function]" === {}.toString.call(n)) {
                    var e = {}
                      , t = null;
                    try {
                        e = JSON.parse(o.responseText)
                    } catch (e) {
                        t = new Error("Invalid JSON response")
                    }
                    200 !== o.status && (t = e,
                    e = null),
                    r = !0,
                    clearTimeout(a),
                    n(t, e)
                }
            }
            ,
            o.send(JSON.stringify(t.body))
        }
        ;
        _mtm.helpers.getUser = function() {
            return _mtm.helpers.get(window, ["_mgn", "user"])
        }
        ;
        _mtm.helpers.isLoggedIn = function() {
            return !!_mtm.helpers.getUser()
        }
        ;
        _mtm.helpers.isPro = function() {
            var e = _mtm.helpers.getUser();
            return "active" === _mtm.helpers.get(e, ["account", "products", "search", "status"])
        }
        ;
        _mtm.helpers.isLocal = function() {
            var e = _mtm.helpers.getUser();
            return !!_mtm.helpers.get(e, ["local_push"])
        }
        ;
        _mtm.helpers.isLocalManaged = function() {
            var e = _mtm.helpers.getUser();
            return 1 === _mtm.helpers.get(e, ["account_services", "local", "limits", "managed"])
        }
        ;
        _mtm.helpers.isLocalMigrated = function() {
            var e = _mtm.helpers.getUser();
            return !!_mtm.helpers.get(e, ["account_services", "local", "limits", "migration_complete_at"])
        }
        ;
        _mtm.helpers.isLMA = function() {
            var e = _mtm.helpers.getUser();
            return !!_mtm.helpers.get(e, ["account_services", "search", "limits", "local_search"])
        }
        ;
        _mtm.helpers.isAdmin = function() {
            var e = _mtm.helpers.getUser();
            return e && (e.admin || e.admin_id)
        }
        ;
        _mtm.helpers.isAccountAdmin = function() {
            var e = _mtm.helpers.getUser();
            if (!e)
                return !1;
            for (var t = 0; t < e.accounts.length; t++) {
                var n = e.accounts[t];
                if (n.owner_id === window._mgn.user.id && -1 !== n.products.indexOf("search"))
                    return !0;
                if (-1 !== n.products.indexOf("account"))
                    return !0
            }
            return !1
        }
        ;
        _mtm.helpers.isAccountOwner = function() {
            var e = _mtm.helpers.getUser();
            if (!e)
                return !1;
            for (var t in e.accounts)
                if (e.accounts[t].owner_id === window._mgn.user.id)
                    return !0
        }
        ,
        _mtm.helpers.isSubscriber = function() {
            var e = _mtm.helpers.getUser();
            if (!e)
                return !1;
            for (var t in e.accounts)
                if (-1 !== e.accounts[t].products.indexOf("search") || -1 !== e.accounts[t].products.indexOf("api") || -1 !== e.accounts[t].products.indexOf("local"))
                    return !0
        }
        ;
        _mtm.helpers.isFreetrialer = function() {
            var e = _mtm.helpers.getUser();
            if (!_mtm.helpers.isPro())
                return !1;
            var t = _mtm.helpers.get(e, ["account", "products", "search", "trial_expires_at"]);
            return new Date(1e3 * t) > new Date
        }
        ;
        _mtm.helpers.uuid = function e(t) {
            return t ? (t ^ 16 * Math.random() >> t / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, e)
        }
        ,
        
        
        
        function d(e) {
            var t = localStorage.getItem("lo_sample");
            return null === t && (t = Math.random(),
            localStorage.setItem("lo_sample", t)),
            t <= e
        }
        function g(e) {
            e.classList.add("lo_sensitive")
        }
        var p = 134826
          , _ = 142476;
        document.querySelectorAll("[data-sensitive]").forEach(g),
        _mtm.tags.push({
            name: "Lucky Orange",
            description: "Loads Lucky Orange (https://www.luckyorange.com/) onto the page",
            condition: function(e) {
                
            },
            execute: function() {
                _mtm.helpers.onDomChange("[data-sensitive]", ["data-sensitive"], g);
                var e = function() {
                    var e = _mtm.helpers.getUser();
                    return !e || _mtm.helpers.isAdmin() ? {} : {
                        name: e.full_name,
                        email: e.email,
                        user_id: e.id,
                        mozpoints: e.mozpoints,
                        pro_plan: _mtm.helpers.isPro() ? e.account.products.search.name : null,
                        local_locations: _mtm.helpers.isLocal() ? e.local_push : null,
                        is_owner: _mtm.helpers.isAccountAdmin(),
                        is_lma: _mtm.helpers.isLMA()
                    }
                }();
                window._loq = window._loq || [],
                window._loq.push(["custom", e]),
                _mtm.helpers.isFreetrialer() ? window._loq.push(["tag", "Pro Freetrialer"]) : _mtm.helpers.isAccountAdmin() && window._loq.push(["tag", "Pro Vested"]),
                _mtm.helpers.isLocal() && window._loq.push(["tag", "Local Customer"]),
                _mtm.helpers.isLMA() && window._loq.push(["tag", "LMA Customer"]),
                _mtm.triggers.supportedEvent(function(e, t) {
                    "Experiment Viewed" === e && (e = ["Experiment", t.experiment_name, t.variation_name].join(": ")),
                    window._loq = window._loq || [],
                    window._loq.push(["tag", e])
                }),
                window.__lo_site_id = _mtm.helpers.isProduction() ? p : _,
                _mtm.helpers.loadScript("https://d10lpsik1i8c69.cloudfront.net/w.js")
            }
        });
        
        _mtm.tags.push({
            name: "Wistia",
            description: "Tracks video plays: https://segment.com/docs/spec/video",
            condition: function(e) {
                window._wq = window._wq || [],
                _wq.push({
                    id: "_all",
                    onReady: e
                })
            },
            execute: function(a) {
                a.bind("play", function() {
                    trackMozEvent("Video Playback Started", {
                        session_id: a._containerId,
                        content_asset_id: a.hashedId(),
                        position: a.secondsWatched(),
                        total_length: a.duration(),
                        video_player: "wistia",
                        sound: a.volume(),
                        title: a.name()
                    }),
                    a.unbind
                }),
                a.bind("percentwatchedchanged", function(e, t) {
                    var n = [.25, .5, .75]
                      , o = [];
                    if ("playing" === a.state())
                        for (var r = 0; r < n.length; r++) {
                            var i = n[r];
                            if (i <= e && t < i) {
                                if (-1 !== o.indexOf(a.hashedId() + i))
                                    continue;
                                o[a.hashedId() + r] = !0,
                                trackMozEvent("Video Content Playing", {
                                    session_id: a._containerId,
                                    asset_id: a.hashedId(),
                                    title: a.name(),
                                    position: a.secondsWatched(),
                                    position_percent: i,
                                    total_length: a.duration()
                                })
                            }
                        }
                }),
                a.bind("end", function() {
                    trackMozEvent("Video Playback Completed", {
                        session_id: a._containerId,
                        content_asset_id: a.hashedId(),
                        position: a.secondsWatched(),
                        total_length: a.duration(),
                        video_player: "wistia",
                        sound: a.volume(),
                        title: a.name()
                    }),
                    a.unbind
                })
            }
        });
        window._mtm.triggers.click = function(t, n) {
            _mtm.triggers.initial(function() {
                var e = document.querySelector(t);
                e ? e.addEventListener("click", function() {
                    _mtm.debugger.log("mtm:trigger:executed", "Element was clicked " + t),
                    n(arguments)
                }) : _mtm.debugger.log(t, "element not found")
            })
        }
        ;
        var w = [];
        document.addEventListener("DOMContentLoaded", function() {
            for (var e in w)
                w[e]();
            _mtm.debugger.log("mtm:trigger:executed", "Initial page loaded"),
            w = []
        }),
        window._mtm.triggers.initial = function(e) {
            "loading" !== document.readyState ? e() : w.push(e)
        }
        ;
        var b = [];
        window._mtm.triggers.page = function(e) {
            b.push(e),
            "loading" !== document.readyState && e()
        }
        ;
        window._mtm.triggers.triggerPage = function(e) {
            var t = _mtm.helpers.get(e, ["detail", "urlPath"])
              , n = "Page view detected";
            for (var o in t && (n += " - " + window.location.protocol + window.location.host + t),
            _mtm.debugger.log("mtm:trigger:executed", n),
            b)
                b[o]()
        }
        ;
        window._mtm.triggers.clearPageQueue = function() {
            b = []
        }
        ,
        document.addEventListener("DOMContentLoaded", window._mtm.triggers.triggerPage),
        document.addEventListener("pushstate", window._mtm.triggers.triggerPage);
        var y = []
          , E = !1;
        window._mtm.triggers.segmentLoaded = function(e) {
            E ? e() : y.push(e)
        }
        ;
        window._mtm.triggers.triggerSegmentLoaded = function() {
            for (var e in _mtm.debugger.log("mtm:trigger:executed", "analytics.js was loaded"),
            E = !0,
            y)
                y[e]();
            y = []
        }
        ;
        var k = [];
        window._mtm.triggers.supportedEvent = function(e) {
            k.push(e)
        }
        ;
        window._mtm.triggers.triggerSupportedEvent = function(e, t, n) {
            for (var o in _mtm.debugger.log("mtm:trigger:executed", "Supported Event fired: " + e),
            k)
                k[o](e, t, n)
        }
        ;
        var S = []
          , x = !1;
        window._mtm.triggers.user = function(e) {
            if (x)
                return e(window._mgn ? window._mgn.user : null);
            S.push(e)
        }
        ;
        document.addEventListener("mozuser", function() {
            for (var e in x = !0,
            S)
                S[e](window._mgn ? window._mgn.user : null);
            var t = _mtm.helpers.get(window, ["_mgn", "user", "id"])
              , n = t ? "User found: " + t : "No user found";
            _mtm.debugger.log("mtm:trigger:executed", n),
            S = []
        });
        function L() {
            var e = new CustomEvent("mozuser");
            document.dispatchEvent(e),
            M.disconnect()
        }
        var M = null;
        M = new MutationObserver(function() {
            window._mgn && L()
        }
        ),
        document.addEventListener("DOMContentLoaded", L),
        M.observe(document.documentElement, {
            childList: !0
        });
        var z = []
          , I = new MutationObserver(function() {
            for (var e in z) {
                var t = z[e]
                  , n = document.querySelector(t.selector);
                if (!n)
                    return;
                t.callback(n),
                _mtm.debugger.log("mtm:trigger:executed", "Element is visible " + t.selector),
                z.splice(e, 1),
                0 === z.length && I.disconnect()
            }
        }
        );
        window._mtm.triggers.visible = function(e, t) {
            var n = document.querySelector(e);
            n && (_mtm.debugger.log("mtm:trigger:executed", "Element is visible " + e),
            t(n)),
            0 === z.length && I.observe(document.documentElement, {
                childList: !0,
                subtree: !0
            }),
            z.push({
                callback: t,
                selector: e
            })
        }
        ,
        _mtm.tags.forEach(function(e) {
            e.condition(function() {
                _mtm.debugger.log("mtm:debugger:tag:execute", e.name),
                _mtm.debugger.tagsExecuted.push(e),
                e.execute.apply(this, arguments)
            })
        })
    }
    , {}]
}, {}, [1]);
