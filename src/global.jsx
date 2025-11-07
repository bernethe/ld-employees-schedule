// Capitalize the first letter of each word in a string
export const capitalizeFirstLetter = (text) => {
	if (!text) {
		return '';
	}
	return (text.toLowerCase()).charAt(0).toUpperCase() + text.slice(1);
};

// Capitalize the first letter of each word in a string
export const capitalizeEachWord = (text) => {
	if (!text) {
		return '';
	}
	const words = text.toLowerCase().split(' '); // Split the string into an array of words
	const capitalizedWords = words.map(word => capitalizeFirstLetter(word)); // Capitalize each word
	return capitalizedWords.join(' '); // Join the capitalized words back into a string
};

export const scheduleTracks = [
	{
		label: '01 Seg - Lunes a Domingo de 07:00 a 16:00 Domingo Libre',
		tracks: ['7:00 - 16:00', '7:00 - 16:00', '7:00 - 16:00', '7:00 - 16:00', '7:00 - 16:00', '7:00 - 16:00', '']
	},
	{
		label: '02 Seg - Lunes a Domingo de 10:00 a 18:00 Sábado Libre',
		tracks: ['10:00 - 18:00', '10:00 - 18:00', '10:00 - 18:00', '10:00 - 18:00', '10:00 - 18:00', '', '10:00 - 18:00']
	},
	{
		label: '03 Seg - Lunes a Domingo de 07:00 a 16:00 Sábado Libre',
		tracks: ['7:00 - 16:00', '7:00 - 16:00', '7:00 - 16:00', '7:00 - 16:00', '7:00 - 16:00', '7:00 - 16:00', '']
	},
	{
		label: '04 Seg - Lunes a Domingo de 10:00 a 18:00 Domingo Libre',
		tracks: ['10:00 - 18:00', '10:00 - 18:00', '10:00 - 18:00', '10:00 - 18:00', '10:00 - 18:00', '', '10:00 - 18:00']
	},
	{
		label: '05 Seg - Lunes a Domingo de 08:00 a 17:00 Domingo Libre',
		tracks: ['8:00 - 17:00', '8:00 - 17:00', '8:00 - 17:00', '8:00 - 17:00', '8:00 - 17:00', '8:00 - 17', '']
	},
];
