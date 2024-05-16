import moment from "moment";

export function buildDurationDisplayString(
	hoursPostfix: string,
	minutesPrefix: string,
	minutesPostfix: string,
	durationInMinutes: number
): string {
	const durationHours = Math.floor(
		moment.duration(durationInMinutes, "minutes").asHours()
	);
	const durationMinutes = moment
		.duration(durationInMinutes, "minutes")
		.minutes();
	const minutesDurationString = `${minutesPrefix}${durationMinutes} ${minutesPostfix}`;

	const durationString = `${durationHours} ${hoursPostfix} ${
		durationMinutes !== 0 ? `${minutesDurationString}` : ""
	}`;

	return durationString;
}
