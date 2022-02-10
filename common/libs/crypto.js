/*!
  Crypto-JS v1.1.0
  http://code.google.com/p/crypto-js/
  Copyright (c) 2009, Jeff Mott. All rights reserved.
  http://code.google.com/p/crypto-js/wiki/License
 */
var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
let Crypto = {};
var util = Crypto.util = {
	rotl: function(n, b) {
		return (n << b) | (n >>> (32 - b));
	},
	rotr: function(n, b) {
		return (n << (32 - b)) | (n >>> b);
	},
	endian: function(n) {
		if (n.constructor == Number) {
			return util.rotl(n, 8) & 0x00FF00FF | util.rotl(n, 24) & 0xFF00FF00;
		}
		for (var i = 0; i < n.length; i++) n[i] = util.endian(n[i]);
		return n;
	},
	randomBytes: function(n) {
		for (var bytes = []; n > 0; n--) bytes.push(Math.floor(Math.random() * 256));
		return bytes;
	},
	stringToBytes: function(str) {
		var bytes = [];
		for (var i = 0; i < str.length; i++) bytes.push(str.charCodeAt(i));
		return bytes;
	},
	bytesToString: function(bytes) {
		var str = [];
		for (var i = 0; i < bytes.length; i++) str.push(String.fromCharCode(bytes[i]));
		return str.join("");
	},
	stringToWords: function(str) {
		var words = [];
		for (var c = 0, b = 0; c < str.length; c++, b += 8) words[b >>> 5] |= str.charCodeAt(c) << (24 - b %
		32);
		return words;
	},
	bytesToWords: function(bytes) {
		var words = [];
		for (var i = 0, b = 0; i < bytes.length; i++, b += 8) words[b >>> 5] |= bytes[i] << (24 - b % 32);
		return words;
	},
	wordsToBytes: function(words) {
		var bytes = [];
		for (var b = 0; b < words.length * 32; b += 8) bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
		return bytes;
	},
	bytesToHex: function(bytes) {
		var hex = [];
		for (var i = 0; i < bytes.length; i++) {
			hex.push((bytes[i] >>> 4).toString(16));
			hex.push((bytes[i] & 0xF).toString(16));
		}
		return hex.join("");
	},
	hexToBytes: function(hex) {
		var bytes = [];
		for (var c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16));
		return bytes;
	},
	bytesToBase64: function(bytes) {
		// if (typeof btoa == "function") return btoa(util.bytesToString(bytes));
		var base64 = [],
			overflow;
		for (var i = 0; i < bytes.length; i++) {
			switch (i % 3) {
				case 0:
					base64.push(base64map.charAt(bytes[i] >>> 2));
					overflow = (bytes[i] & 0x3) << 4;
					break;
				case 1:
					base64.push(base64map.charAt(overflow | (bytes[i] >>> 4)));
					overflow = (bytes[i] & 0xF) << 2;
					break;
				case 2:
					base64.push(base64map.charAt(overflow | (bytes[i] >>> 6)));
					base64.push(base64map.charAt(bytes[i] & 0x3F));
					overflow = -1;
			}
		}
		if (overflow != undefined && overflow != -1) base64.push(base64map.charAt(overflow));
		while (base64.length % 4 != 0) base64.push("=");
		return base64.join("");
	},
	base64ToBytes: function(base64) {
		if (typeof atob == "function") return util.stringToBytes(atob(base64));
		base64 = base64.replace(/[^A-Z0-9+\/]/ig, "");
		var bytes = [];
		for (var i = 0; i < base64.length; i++) {
			switch (i % 4) {
				case 1:
					bytes.push((base64map.indexOf(base64.charAt(i - 1)) << 2) | (base64map.indexOf(base64
						.charAt(i)) >>> 4));
					break;
				case 2:
					bytes.push(((base64map.indexOf(base64.charAt(i - 1)) & 0xF) << 4) | (base64map.indexOf(
						base64.charAt(i)) >>> 2));
					break;
				case 3:
					bytes.push(((base64map.indexOf(base64.charAt(i - 1)) & 0x3) << 6) | (base64map.indexOf(
						base64.charAt(i))));
					break;
			}
		}
		return bytes;
	}
};
Crypto.mode = {};
export default Crypto;
