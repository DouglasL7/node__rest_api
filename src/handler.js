import { parse } from "node:url";
import { DEFALUT_HEADER } from "./util/ultil.js";

const allRoutes = {
  "/heroes:get": async (request, response) => {
    throw new Error("Testtt")
    response.write("GET")
    response.end()
  },
  // 404 routes
  default: (request, response) => {
    response.writeHead(404, DEFALUT_HEADER)
    response.write("Uuups, node found")
    response.end()
  }
}

export function handler(request, response) {
  const { url, method } = request;
  const { pathname } = parse(url, true);
  const key = `${pathname}:${method.toLowerCase()}`;
  const chosen = allRoutes[key] || allRoutes.default;

  return Promise.resolve(chosen(request, response))
    .catch(handlerError(response))
}

function handlerError(response) {
  return error => {
    console.log("Somethig bad has happened**", error.stack);
    response.writeHead(500, DEFALUT_HEADER)
    response.write(JSON.stringify({
      error: "Intenet server error"
    }))

    return response.end()
  }
}
