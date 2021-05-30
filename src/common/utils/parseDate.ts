/**
 * 
 * @param date a date string to parse
 * @returns a locale date string in format MMM DD, YYYY
 */
const parseDate = (date: string) => {
    if(!date) return ''
	return new Date(date).toLocaleDateString(undefined, {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});
};

export default parseDate;
