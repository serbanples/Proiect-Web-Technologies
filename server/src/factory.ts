import _ from "lodash";
import { RoutesInstance } from "./routes/RoutesInstance";
import { MiddlewareInstance } from "./middleware/MiddlewareInstance";

export class Factory {
    private static instance: Factory;
    private routesInstance: RoutesInstance;
    private middlewareInstance: MiddlewareInstance;

    private constructor() {
        this.middlewareInstance = new MiddlewareInstance();
        this.routesInstance = new RoutesInstance(this.middlewareInstance);
        this.init();
    }

    static getInstance() {
        if(_.isNil(Factory.instance)) Factory.instance = new Factory();
        return Factory.instance;
    }

    private init() {

    }

    getRoutes(): RoutesInstance {
        return this.routesInstance;
    }

    getMiddlewares(): MiddlewareInstance {
        return this.middlewareInstance;
    }

}