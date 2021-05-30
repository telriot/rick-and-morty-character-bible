/**
 * 
 * @param params the query params object to be stringified
 * @param index the page/id index to append to the string
 * @returns a key for a cache object
 */
const buildCacheKey = (
	params: Record<string, string | number | null>,
	index: number | string
) => {
    if(!params) return ''
	const filtersQuery = Object.entries(params)
		.map(([key, value]) => `${key.slice(0,3)}-${value}`)
		.sort()
		.join('-')
		.toLowerCase();
	const query = `${filtersQuery}$${index}`;
	return query;
};

export default buildCacheKey