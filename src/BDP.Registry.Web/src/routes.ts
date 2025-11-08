import {
    type RouteConfig,
    layout,
    index,
    route,
} from "@react-router/dev/routes";

export default [
    layout("layouts/main-layout.tsx", [index("pages/home.tsx")]),
    route("*", "catchall.tsx"),
] satisfies RouteConfig;
