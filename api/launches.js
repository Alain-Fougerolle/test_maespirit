const retrieve = async (settings = { page: 1, locations: [] }) => {
	const limit = 10;
	const offset = (settings.page - 1) * limit;
	const location__ids = settings.locations.toString();

	const successFilter = (data) => {
		const dataFilter = data.filter(e => e.status.id === 3);

		return dataFilter.map(e => ({
			is_canaveral_or_spaceX: e.pad.location.id === 12 || e.pad.location.id === 143,
			...e
		}))
	};

	const failure_canaveral_spacexFilter = (data) => {
		const dataFilter = data.filter(e => (e.status.id === 3 || e.status.id === 7) && (e.pad.location.id === 12 || e.pad.location.id === 143));

		return dataFilter.length;
	}

	return new Promise((success, failure) => {
		fetch(`https://ll.thespacedevs.com/2.2.0/launch/?limit=${limit}&offset=${offset}&location__ids=${location__ids}`)
			.then((res) => res.json())
			.then((data) => success({
				ids: data.results.map(e => e.id),
				success: successFilter(data.results),
				failure_canaveral_spacex: failure_canaveral_spacexFilter(data.results),
				previousPage: data.previous ? settings.page - 1 : null,
				nextPage: data.next ? settings.page + 1 : null
			}))
			.catch((err) => failure(err))
	})
};

export default retrieve;
