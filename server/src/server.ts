import cookieParser from "cookie-parser";
import express, { Application } from "express";
import * as cors from 'cors';
import { Factory } from "./factory";
import { config } from "./config/config";
import * as Bluebird from 'bluebird';
import path from 'path';

export class Server {
    private app: Application = express();
    private factory: Factory = Factory.getInstance();

    constructor() {
        this.init();
        this.start();
    }

    /**
     * Method used to initiate the express application
     * 
     * @returns {void} initiaites the express application
     */
    private init(): void {
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(cors.default());
        this.app.use(this.factory.getRoutes().getRouter());

        this.app.use(express.static(path.join(__dirname, '../../frontend/dist')));
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'))
        })
    }

    /**
     * Method used to start the exress app
     * 
     * @returns {void} starts the server
     */
    public start(): void {
        this.app.listen(config.express.PORT, () => {
            console.log(`Server started listentning on port ${config.express.PORT}`)
        })
    }
}