import {
    type RouteConfig,
    layout,
    index,
    route,
} from "@react-router/dev/routes";

export default [
    layout("layouts/main-layout.tsx", [
        index("pages/home.tsx"),
        route("search", "pages/search.tsx"),
        route("source/:id", "pages/source.tsx"),
    ]),
    route("*", "catchall.tsx"),
] satisfies RouteConfig;
