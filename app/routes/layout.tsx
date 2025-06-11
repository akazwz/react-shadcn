import { NavLink, Outlet } from "react-router";
import {
	RiHomeLine,
	RiHomeFill,
	RiUserLine,
	RiUserFill,
	RiImageLine,
	RiImageFill,
	RiVideoLine,
	RiVideoFill,
} from "react-icons/ri";
import { LuSparkles } from "react-icons/lu";
import type { IconType } from "react-icons";

import { getTranslations } from "~/locales/locale";
import { Button } from "~/components/ui/button";

import type { Route } from "./+types/layout";
import { useApparenceStore } from "~/stores/apparence";

export async function clientLoader() {
	let lang = navigator.language.split("-")[0];
	const { language } = useApparenceStore.getState();
	if (language !== "browser") {
		lang = language;
	}
	const t = (await getTranslations(lang)).layout;
	return {
		t,
		lang,
	};
}

export default function Layout({ loaderData }: Route.ComponentProps) {
	const { t } = loaderData;
	const navItems = navs.map((nav) => ({
		...nav,
		label: t[nav.label as keyof typeof t],
	}));
	return (
		<div className="flex h-dvh overflow-hidden">
			<DesktopSidebar navItems={navItems} />
			<Outlet />
			<MobileBottomBar navItems={navItems} />
		</div>
	);
}

interface Nav {
	Icon: IconType;
	ActiveIcon: IconType;
	label: string;
	path: string;
}

const navs: Nav[] = [
	{
		Icon: RiHomeLine,
		ActiveIcon: RiHomeFill,
		label: "home",
		path: "/",
	},
	{
		Icon: RiImageLine,
		ActiveIcon: RiImageFill,
		label: "images",
		path: "/images",
	},
	{
		Icon: RiVideoLine,
		ActiveIcon: RiVideoFill,
		label: "videos",
		path: "/videos",
	},
	{
		Icon: RiUserLine,
		ActiveIcon: RiUserFill,
		label: "account",
		path: "/account",
	},
];

function MobileBottomBar({ navItems }: { navItems: Nav[] }) {
	return (
		<div className="bg-muted/70 backdrop-blur-sm border-t h-16 fixed bottom-0 w-full md:hidden">
			<div className="flex h-full justify-between items-center">
				{navItems.map((nav) => (
					<NavLink to={nav.path} key={nav.path} className="w-full">
						{({ isActive }) => {
							return (
								<Button
									asChild
									variant="ghost"
									className="w-full h-fit hover:bg-transparent gap-1"
								>
									<div className="flex flex-col items-center">
										{isActive ? (
											<nav.ActiveIcon className="size-5" />
										) : (
											<nav.Icon className="size-5" />
										)}
										<span className="text-xs font-normal">{nav.label}</span>
									</div>
								</Button>
							);
						}}
					</NavLink>
				))}
			</div>
		</div>
	);
}

function DesktopSidebar({ navItems }: { navItems: Nav[] }) {
	return (
		<div className="w-72 h-full hidden md:flex flex-col">
			<div className="flex items-center justify-center p-4">
				<LuSparkles className="size-10" />
			</div>
			<div className="flex flex-col gap-1 p-2">
				{navItems.map((nav) => (
					<NavLink to={nav.path} key={nav.path} className="w-full">
						{({ isActive }) => {
							return (
								<Button
									asChild
									variant={isActive ? "secondary" : "ghost"}
									size="lg"
									className="w-full h-fit"
								>
									<div className="flex flex-row items-center justify-start gap-2 p-4">
										{isActive ? (
											<nav.ActiveIcon className="size-6" />
										) : (
											<nav.Icon className="size-6" />
										)}
										<span className="text-sm font-medium">{nav.label}</span>
									</div>
								</Button>
							);
						}}
					</NavLink>
				))}
			</div>
		</div>
	);
}
