/**
 * @param str the string to capitalize
 * @returns a capitalized string
 */
 const capitalizeString = (str: string) => {
	const lowerCaseStr = str.toLowerCase();
	const capitalizedStr =
		lowerCaseStr.charAt(0).toUpperCase() + lowerCaseStr.slice(1);
	return capitalizedStr;
};

export default capitalizeString;