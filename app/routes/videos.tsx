import { PageTitle } from "~/components/page-title";
import { useApparenceStore } from "~/stores/apparence";
import { getTranslations } from "~/locales/locale";
import type { Route } from "./+types/videos";

export async function clientLoader() {
	const { language } = useApparenceStore.getState();
	let lang = navigator.language.split("-")[0];
	if (language !== "browser") {
		lang = language;
	}
	const t = (await getTranslations(lang)).layout;
	return { t };
}
export default function Videos({ loaderData }: Route.ComponentProps) {
	const { t } = loaderData;
	return (
		<div className="p-2 flex-1">
			<PageTitle title={t.videos} />
		</div>
	);
}
