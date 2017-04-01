export function formatDate (date, fmt) {
	if(/(Y+)/.test(fmt)) {
		// debugger
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	};
	let o = {
		'M+': date.getMonth() + 1,
		'D+': date.getDate(),
		'H+': date.getHours(),
		'm+': date.getMinutes(),
		'S+': date.getSeconds()
	};
	for(let k in o) {
		if(new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			// debugger
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1 ? str : padLeftZero(str)));
		}
	};

	return fmt;
};
function padLeftZero(str) {
	return ('00' + str).substr(str.length)
}
