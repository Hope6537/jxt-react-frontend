var CryptoJS = require("crypto-js");
var Dimensions = require('react-dimensions');
//example

/* var param = {
 postObject: {
 title: "test"
 }
 };
 Util.getJSON(Service.host + Service.getEvent, param, undefined, function (responseJSON) {
 console.log(responseJSON);
 })
 Util.postJSON(Service.host + Service.getEvent, param, function (resp) {
 console.log(resp);
 }, 'debug')*/

var Util = {
    //屏幕尺寸
    AES_KEY: "xComicHentai6537",
    AES_IV: "4798145623545678",
    getNowDate: function () {
        var myDate = new Date();
        return myDate.getFullYear() + "年" + myDate.getMonth() + "月" + myDate.getDate() + "日"
    },
    getJSON: function (url, param, otherParam, func) {
        if (otherParam != undefined && otherParam != null && otherParam != "") {
            param = Util.extend(param, otherParam);
        }
        url = url + "?data=" + encodeURIComponent(Util.encrypt(JSON.stringify(param)));
        var header = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };
        fetch(url, header).then((response) => response.json())
            .then((responseJSON) => {
                func(responseJSON);
            });

    },
    postJSON: function (url, param, func, auth) {
        var header = {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                _auth: auth,
                data: Util.encrypt(JSON.stringify(param))
            })
        };
        fetch(url, header).then((response) => response.json())
            .then((responseJSON) => {
                func(responseJSON);
            });
    },
    putJSON: function (url, param, func, auth) {
        var header = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                _auth: auth,
                data: Util.encrypt(JSON.stringify(param))
            })
        };
        fetch(url, header).then((response) => response.json())
            .then((responseJSON) => {
                func(responseJSON);
            });
    },
    encode: function (obj) {
        var parts = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
            }
        }
        return "?" + parts.join('&');
    },
    encrypt: function (word) {
        var key = CryptoJS.enc.Utf8.parse(this.AES_KEY);
        var iv = CryptoJS.enc.Utf8.parse(this.AES_IV);
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    },
    decrypt: function (word) {
        var key = CryptoJS.enc.Utf8.parse(this.AES_KEY);
        var iv = CryptoJS.enc.Utf8.parse(this.AES_IV);
        var decrypted = CryptoJS.AES.decrypt(word, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    },
    extend: function (des, src, override) {
        if (src instanceof Array) {
            for (var i = 0, len = src.length; i < len; i++)
                extend(des, src[i], override);
        }
        for (var i in src) {
            if (override || !(i in des)) {
                des[i] = src[i];
            }
        }
        return des;
    },
};

module.exports = Util;