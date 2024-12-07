import cookieParser from "cookie-parser";
import express, { Application } from "express";
import * as cors from 'cors';
import { Factory } from "./factory";
import { config } from "./config/config";

export class Server {
    private app: Application = express();
    private factory: Factory = Factory.getInstance();

    constructor() {
        this.init();
        this.start();
    }

    private init() {
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(cors.default());
        this.app.use(Factory.getInstance().getRoutes().getRouter());
    }

    private start() {
        this.app.listen(config.express.PORT, () => {
            console.log(`Server started listentning on port ${config.express.PORT}`)
        })
    }
}