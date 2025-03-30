import browser from './libs/browser.min.js';

const rules = {
	regexes: [/aarch64|arm64|armv8/i, /armeabi-v7a|(arm$)|armv7/i, /armeabi$/i,
			 /x86_64|x64|amd64/i, /x86|i[36]86/i],
	names: ['arm64-v8a', 'armeabi-v7a', 'armeabi', 'x86_64', 'x86']
}

function parseArch(arch) {
	let result = false;
	rules.regexes.forEach(
		(regex, index) => {
			if(regex.test(arch))
				result = `${rules.names[index]}(${arch})`;
		}
	);
	return result;
}

export const check = async() => {
	if(!navigator.userAgent) throw new Error('cannot-get-ua');

	const info = await browser.getInfo();
	// console.log(info);

	return {
		osVer: `${info.system} ${info.systemVersion}`,
		arch: parseArch(info.platform) || info.platform
	}
}