/**
 * @param str the string to capitalize
 * @returns a capitalized string
 */
 const capitalizeString = (str: string) => {
	if(!str || typeof str !== 'string') return ''
	const lowerCaseStr = str.toLowerCase();
	const capitalizedStr =
		lowerCaseStr.charAt(0).toUpperCase() + lowerCaseStr.slice(1);
	return capitalizedStr;
};

export default capitalizeString;