export const dateFormatter = (date) => {
	return new Intl.DateTimeFormat().format(new Date(date))
}
