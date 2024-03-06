import moment from "moment";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import queryString from "query-string";

export const routeFilter = (params) => {
  const str = queryString.stringify(params);
  return str;
}
	export function validURL(url) {
		const pattern = new RegExp(
			"^(https?:\\/\\/)?" + // protocol
				"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
				"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
				"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
				"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
				"(\\#[-a-z\\d_]*)?$",
			"i"
		); //
	
		return !!pattern.test(url);
	}
	
	export const formatDate = (date: string | Date): string => {
		if (!date) {
			return "no data";
		}
		return moment(date).format("D MMM YYYY");
	};
	
	export const safeFormatString = (word: string): string => {
		return word ?? "no data";
	};
	
	export const cn = (...inputs: ClassValue[]) => {
		return twMerge(clsx(inputs));
	};
