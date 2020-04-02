// ==UserScript==
// @name         Reddit Impostor Equation Checker
// @namespace    tgwth
// @version      0.1
// @description  Solves equations for you on https://www.reddit.com/r/Imposter/
// @author       u/TheGuywithTehHat
// @match        *://gremlins-api.reddit.com/*
// @grant        none
// ==/UserScript==

let wordsToNumbers;!function (e) { var t = {}; function n(r) { if (t[r]) return t[r].exports; var s = t[r] = { i: r, l: !1, exports: {} }; return e[r].call(s.exports, s, s.exports, n), s.l = !0, s.exports } n.m = e, n.c = t, n.d = function (e, t, r) { n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r }) }, n.r = function (e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, n.t = function (e, t) { if (1 & t && (e = n(e)), 8 & t) return e; if (4 & t && "object" == typeof e && e && e.__esModule) return e; var r = Object.create(null); if (n.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var s in e) n.d(r, s, function (t) { return e[t] }.bind(null, s)); return r }, n.n = function (e) { var t = e && e.__esModule ? function () { return e.default } : function () { return e }; return n.d(t, "a", t), t }, n.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, n.p = "", n(n.s = 0) }([function (e, t, n) { "use strict"; n.r(t), n.d(t, "wordsToNumbers", (function () { return H })); const r = { zero: 0, first: 1, one: 1, second: 2, two: 2, third: 3, thirteenth: 13, thirteen: 13, three: 3, fourth: 4, fourteenth: 14, fourteen: 14, four: 4, fifteenth: 15, fifteen: 15, fifth: 5, five: 5, sixth: 6, sixteenth: 16, sixteen: 16, six: 6, seventeenth: 17, seventeen: 17, seventh: 7, seven: 7, eighteenth: 18, eighteen: 18, eighth: 8, eight: 8, nineteenth: 19, nineteen: 19, ninth: 9, nine: 9, tenth: 10, ten: 10, eleventh: 11, eleven: 11, twelfth: 12, twelve: 12, a: 1 }, s = { twenty: 20, twentieth: 20, thirty: 30, thirtieth: 30, forty: 40, fortieth: 40, fifty: 50, fiftieth: 50, sixty: 60, sixtieth: 60, seventy: 70, seventieth: 70, eighty: 80, eightieth: 80, ninety: 90, ninetieth: 90 }, o = { hundred: 100, hundredth: 100, thousand: 1e3, million: 1e6, billion: 1e9, trillion: 1e12, quadrillion: 1e15, quintillion: 1e18, sextillion: 1e21, septillion: 1e24, octillion: 1e27, nonillion: 1e30, decillion: 1e33 }, i = { ...r, ...s, ...o }, l = Object.keys(r), u = Object.keys(s), a = Object.keys(o), c = [...l, ...u, ...a], p = ["and"], y = ["point", "dot"], h = [".", ",", "\\", "#", "!", "$", "%", "^", "&", "/", "*", ";", ":", "{", "}", "=", "-", "_", "`", "~", "(", ")", " "], d = 0, f = 1, g = 2, w = 3, b = 4, k = ["a"], v = (e, t, n) => { const { type: r, isHundred: s } = ((e, t) => { if (!e) return { type: t.type }; const n = e.tokens[0], r = n.type === f && t.type === d || n.type === f && t.type === f || n.type === d && t.type === f && i[n.lowerCaseValue] > 9 || n.type === d && t.type === d || n.type === f && t.type === d && e.type === g; return e.type === g ? { type: g, isHundred: r } : r ? { type: b, isHundred: r } : { type: t.type, isHundred: r } })(e, t); return e && ((e, t, { impliedHundreds: n }) => { const { tokens: r } = e, s = r[0]; return !s || (s.type === g && t.type === d || (s.type === g && t.type === f || (!(!n || e.type !== g || s.type !== f || t.type !== d) || (!(!n || e.type !== g || s.type !== d || t.type !== f) || (s.type === f && t.type === d || (!n && s.type === f && t.type === d || (s.type === g && t.type === g || !(!n && s.type === f && t.type === f) && !(!n || s.type !== f || t.type !== f)))))))) })(e, t, n) ? { action: 1, type: r, isHundred: s } : { action: 2, type: r, isHundred: s } }, m = (e, t) => { const n = []; let r; let s = e.tokens.length - 1; for (; s >= 0;) { const o = e.tokens[s], { action: i, type: l, isHundred: u } = v(r, o, t); switch (o.type = u ? b : o.type, i) { case 1: r.type = l, r.tokens.unshift(o); break; case 2: r = { tokens: [o], type: l }, n.unshift(r) }s-- } return n }, C = (e, t, n) => { const r = y.includes(t.lowerCaseValue); return e && e.tokens.length || !r ? h.includes(t.lowerCaseValue) || p.includes(t.lowerCaseValue) ? 0 : r && !e.hasDecimal ? 1 : c.includes(t.lowerCaseValue) ? e && ((e, t, { impliedHundreds: n }) => { const { tokens: r } = e, s = r[r.length - 1]; return !(!n && s.type === d && t.type === d && !e.hasDecimal) && (!(!n && s.type === d && t.type === f) && !(!n && s.type === f && t.type === f)) })(e, t, n) ? 1 : 2 : 3 : 2 }, V = (e, t) => { const n = []; if ((e => 1 === e.length && k.includes(e[0].lowerCaseValue))(e)) return n; let r, s = 0; const o = e.length; for (; s < o;) { const o = e[s]; switch (C(r, o, t)) { case 0: break; case 1: r && (r.end = o.end, r.tokens.push(o), o.type === w && (r.hasDecimal = !0)); break; case 2: r = { start: o.start, end: o.end, tokens: [o] }, n.push(r), o.type === w && (r.hasDecimal = !0); break; case 3: default: r = null }s++ } return n.map(e => ({ ...e, subRegions: m(e, t) })) }, x = e => l.includes(e.toLowerCase()) ? d : u.includes(e.toLowerCase()) ? f : a.includes(e.toLowerCase()) ? g : y.includes(e.toLowerCase()) ? w : void 0; const j = e => { let t = 0, n = !1, r = []; e.subRegions.forEach(e => { const { tokens: s, type: o } = e; let l = 0; if (o !== w) if (n) r.push(e); else { switch (o) { case g: case b: { l = 1; const e = s.length; s.reduce((t, n, r) => { if (n.type === b) { let o = e - 1 ? s.slice(r + 1) : []; o = o.filter((e, t) => 0 === t || o[t - 1].type > e.type); const l = o.reduce((e, t) => e + i[t.lowerCaseValue], 0); return t.concat({ ...s[r + 1], numberValue: l + 100 * i[n.lowerCaseValue] }) } return r > 0 && s[r - 1].type === b || r > 1 && s[r - 1].type === f && s[r - 2].type === b ? t : t.concat({ token: n, numberValue: i[n.lowerCaseValue] }) }, []).forEach(({ numberValue: e }) => { l *= e }); break } case d: case f: s.forEach(e => { l += i[e.lowerCaseValue] }) }t += l } else n = !0 }); let s = 1; return r.forEach(({ tokens: e }) => { e.forEach(({ lowerCaseValue: e }) => { t += i[e] / Math.pow(10, s), s += 1 }) }), t }; var O = ({ regions: e, text: t }) => e ? e[0].end - e[0].start == t.length - 1 ? j(e[0]) : ((e, t) => { let n = t, r = 0; return e.forEach(e => { const t = e.end - e.start + 1, s = `${j(e)}`; n = ((e, t, n, r) => { let s = t; return s < 0 && (s = e.length + s, s < 0 && (s = 0)), e.slice(0, s) + (r || "") + e.slice(s + n) })(n, e.start + r, t, s), r -= t - s.length }), n })(e, t) : t; function H(e, t = {}) { const n = ((e, t) => { const n = e.split(/(\w+|\s|[[:punct:]])/i).reduce((e, n) => { const r = n.length && t.fuzzy && !h.includes(n) ? fuzzyMatch(n) : n, s = e.length ? e[e.length - 1].end + 1 : 0, o = s + n.length; return o !== s ? e.concat({ start: s, end: o - 1, value: r, lowerCaseValue: r.toLowerCase(), type: x(r) }) : e }, []); return V(n, t) })(e, t); return n.length ? O({ text: e, regions: n }) : e } t.default = H; wordsToNumbers = H }]);

(function() {
    'use strict';

    var done = false;

    function replaceEquation(str) {
        str = str.replace(/plus|added(\s*to)?/g, '+');
        str = str.replace(/minus|subtract/g, '-');
        str = str.replace(/times|multiplied(\s*by)?/g, '*');
        str = str.replace(/over|divided(\s*by)?/g, '/');
        str = str.replace(/equals|is(\s*equal\s*to)?/g, '==');
        str = str.replace(/[^\-\+\*\/\d\.=]/g, '');

        return str;
    }

    function solve() {
        let answers = document.getElementsByTagName('gremlin-note');
        for(let element of answers) {
            let text = element.textContent.trim();
            let equation = replaceEquation(wordsToNumbers(text));

            if(/\d.*==.*\d/.test(equation)) {
                let correct = eval(equation);
                element.style.backgroundColor = correct ? '#daffc9' : '#ff3b3b';
            }
        }
    }

    let interval = setInterval(() => {
        if(!done && document.getElementsByTagName('gremlin-note').length > 0) {
            solve();
            clearInterval(interval);
        }

    }, 100);
})();
