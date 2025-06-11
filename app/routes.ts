import {
	type RouteConfig,
	index,
	layout,
	route,
} from "@react-router/dev/routes";

export default [
	layout("routes/layout.tsx", [
		index("routes/home.tsx"),
		route("/images", "routes/images.tsx"),
		route("/videos", "routes/videos.tsx"),
		route("/account", "routes/account.tsx"),
	]),
] satisfies RouteConfig;
