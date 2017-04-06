/*
 * 解析url参数
 * @example ?id=123&a=b
 * @return Object {id:123,a:b}
 */
export function urlParse() {
	let url = window.location.search;
	let obj = {};
	let reg = /[?&][^?&]+=[^?&]+/g;
	let arr = url.match(reg);
	// arr ['?id=123', '&a=b']
	if(arr) {
		arr.forEach((item) => {
			let temArr = item.substring(1).split('=');
			let key = decodeURIComponent(temArr[0]);
			let val = decodeURIComponent(temArr[1]);
			obj[key] = val;
		})
	}
	return obj
}
// function saveToLocal (id, key, val) {

// }

// export function Store () {

// 	this.prototype.get = function (id, key, def) {
// 		return JSON.parse(localStorage.getItem(k));
// 	}
// 	this.prototype.set = function (id, key, val) {
// 		localStorage.setItem(k, JSON.stringify(v));
// 	}
// 	this.prototype.del = function (id, key) {
// 		localStorage.removeItem(k);
// 	}
// }
// export {urlParse, store}