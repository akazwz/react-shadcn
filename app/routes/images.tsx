import { PageTitle } from "~/components/page-title";
import { useApparenceStore } from "~/stores/apparence";
import { getTranslations } from "~/locales/locale";
import type { Route } from "./+types/images";
import { ScrollArea } from "~/components/ui/scroll-area";
import { ImageGridExample } from "~/components/image-grid-example";

export async function clientLoader() {
	const { language } = useApparenceStore.getState();
	let lang = navigator.language.split("-")[0];
	if (language !== "browser") {
		lang = language;
	}
	const t = (await getTranslations(lang)).layout;
	return { t };
}
export default function Images({ loaderData }: Route.ComponentProps) {
	const { t } = loaderData;
	return (
		<div className="p-2 flex-1 flex flex-col">
			<PageTitle title={t.images} />
			<ScrollArea className="flex-1 min-h-0 ">
				<ImageGridExample />
				<div className="h-16 md:hidden"/>
			</ScrollArea>
		</div>
	);
}
