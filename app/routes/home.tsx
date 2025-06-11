import { PageTitle } from "~/components/page-title";

import type { Route } from "./+types/home";
import { useApparenceStore } from "~/stores/apparence";
import { getTranslations } from "~/locales/locale";

export function meta({ data }: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export async function clientLoader() {
	const { language } = useApparenceStore.getState();
	let lang = navigator.language.split("-")[0];
	if (language !== "browser") {
		lang = language;
	}
	const t = (await getTranslations(lang)).layout;
	return { t };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { t } = loaderData;
	return (
		<div className="p-2 flex-1">
			<PageTitle title={t.home} />
		</div>
	);
}
