import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
    route("/", "./pages/index.tsx"),
    route("*?", "catchall.tsx"),
] satisfies RouteConfig;
