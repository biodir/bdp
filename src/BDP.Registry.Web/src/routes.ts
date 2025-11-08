import { type RouteConfig, layout, index, route } from "@react-router/dev/routes";

export default [
    layout("layouts/main-layout.tsx", [
        index("pages/index.tsx"),
    ]),
    route("*", "catchall.tsx"),
] satisfies RouteConfig;
