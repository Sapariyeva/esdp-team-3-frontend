export const formatPhoneNumber = (valueInput: string) => {
	const prefixNumber = (prefix: string) => {
		if (prefix === '7') {
			return '7 (';
		}
		if (prefix === '8') {
			return '8 (';
		}
		if (prefix === '9') {
			return '7 (9';
		}
		return `7 (${prefix}`;
	};
	const value = valueInput.replace(/\D+/g, '');
	const numberLength = 11;

	let result;
	if (valueInput.includes('+8') || valueInput[0] === '8') {
		result = '';
	} else {
		result = '+';
	}
	for (let i = 0; i < value.length && i < numberLength; i++) {
		switch (i) {
			case 0:
				result += prefixNumber(value[i]);
				continue;
			case 4:
				result += ') ';
				break;
			case 7:
				result += '-';
				break;
			case 9:
				result += '-';
				break;
			default:
				break;
		}
		result += value[i];
	}
	return result;
};
