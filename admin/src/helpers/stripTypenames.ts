export function stripTypenames(value: any): any {
	if (Array.isArray(value)) {
		return value.map(stripTypenames);
	} else if (value !== null && typeof value === 'object') {
		const newObject: any = {};
		for (const property in value) {
			if (property !== '__typename') {
				newObject[property] = stripTypenames(value[property]);
			}
		}
		return newObject;
	} else {
		return value;
	}
}
