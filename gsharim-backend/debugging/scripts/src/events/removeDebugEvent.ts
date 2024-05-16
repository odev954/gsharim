import { existsSync as exists, unlinkSync as remove } from "fs";
import { join } from "path";

export default function removeDebugEventFile() {
	const path = join(__dirname, "../../../debugEvent.json");

	if (exists(path)) {
		remove(path);
	}
}
