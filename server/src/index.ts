import { config } from "dotenv";
config({ path: "../.env" });

import fastifyWebsocket from "@fastify/websocket";
import fastify, {
	type RouteOptions,
	type HTTPMethods,
	type RouteHandler,
} from "fastify";
import { readdirSync } from "fs";

const app = fastify();
app.register(fastifyWebsocket);

const routes = readdirSync(`${import.meta.dirname}/routes`, {
	recursive: true,
});

for (let file of routes) {
	if (typeof file === "string") {
		if (!file.endsWith(".ts")) {
			continue;
		}

		file = file.replaceAll("\\", "/");

		let route = `/${file.split(".").slice(0, -1).join(".")}`;
		route = route.replaceAll("_", ":");

		let routePath = route.endsWith("/index") ? route.slice(0, -6) : route;
		if (routePath === "") {
			routePath = "/";
		}

		console.log(`Loading route: ${routePath}`);

		const routeModule = await import(`./routes/${file}`);
		const ROUTE_METHODS: HTTPMethods[] = [
			"get",
			"post",
			"put",
			"delete",
			"patch",
		];

		Object.entries(routeModule.methods).forEach(([method, options]) => {
			ROUTE_METHODS.splice(ROUTE_METHODS.indexOf(method), 1);

			if (options instanceof Function) {
				(options as unknown as RouteOptions).handler = options as RouteHandler;
			}

			app.route({
				method,
				url: routePath,
				...(options as RouteOptions),
			});
		});

		for (const method of ROUTE_METHODS) {
			app.route({
				method,
				url: routePath,
				handler: () => ({
					code: "METHOD_NOT_ALLOWED",
					message: `${method.toUpperCase()} is not allowed`,
				}),
			});
		}
	}
}

await app.listen({ port: Number(process.env.PORT), host: process.env.HOST });

console.log("App ready on", `http://${process.env.HOST}:${process.env.PORT}`);
