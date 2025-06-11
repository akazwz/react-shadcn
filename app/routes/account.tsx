import { useTheme } from "next-themes";

import { PageTitle } from "~/components/page-title";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { getTranslations } from "~/locales/locale";
import { useApparenceStore } from "~/stores/apparence";

import type { Route } from "./+types/account";
import { useNavigate } from "react-router";

export async function clientLoader() {
	let lang = navigator.language.split("-")[0];
	const { language } = useApparenceStore.getState();
	if (language !== "browser") {
		lang = language;
	}
	const t = (await getTranslations(lang)).account;
	return {
		t,
		lang,
	};
}

export default function Account({ loaderData }: Route.ComponentProps) {
	const { t, lang } = loaderData;
	const { theme, setTheme } = useTheme();

	const { setLanguage } = useApparenceStore();

	const themeOptions = [
		{ label: t.theme.light, value: "light" },
		{ label: t.theme.dark, value: "dark" },
		{ label: t.theme.system, value: "system" },
	];

	const currentTheme = themeOptions.find((option) => option.value === theme);

	const languageOptions = [
		{ label: t.language.zh, value: "zh" },
		{ label: t.language.en, value: "en" },
		{ label: t.language.browser, value: "browser" },
	];

	const currentLanguage = languageOptions.find(
		(option) => option.value === lang || option.value === "browser",
	);

	const navigate = useNavigate();

	function reloadPage() {
		navigate(0);
	}

	return (
		<div className="p-2 flex-1 flex flex-col gap-2">
			<PageTitle title={t.title} />
			<div className="flex flex-col gap-2 items-center py-8">
				<Avatar className="size-24 mx-auto">
					<AvatarImage src="https://github.com/akazwz.png" />
					<AvatarFallback>AK</AvatarFallback>
				</Avatar>
				<div className="flex flex-col gap-2 text-center">
					<div className="flex flex-col gap-2">
						<h2 className="text-lg font-bold">Akazwz</h2>
						<p className="text-sm text-muted-foreground">akazwz@gmail.com</p>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-2 border rounded-md p-2 mx-auto w-full max-w-2xl">
				<div className="flex gap-2 justify-between items-center p-2">
					<span className="text-sm font-medium">{t.theme.title}</span>
					<Select
						onValueChange={(value) => setTheme(value)}
						value={currentTheme?.value}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder={currentTheme?.label} />
						</SelectTrigger>
						<SelectContent>
							{themeOptions.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="flex flex-col gap-2 border rounded-md p-2 mx-auto w-full max-w-2xl">
				<div className="flex gap-2 justify-between items-center p-2">
					<span className="text-sm font-medium">{t.language.title}</span>
					<Select
						onValueChange={(value) => {
							setLanguage(value);
							reloadPage();
						}}
						value={currentLanguage?.value}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder={currentLanguage?.label} />
						</SelectTrigger>
						<SelectContent>
							{languageOptions.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
}
