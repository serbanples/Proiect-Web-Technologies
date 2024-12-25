import { ModelsInstance } from "../models/ModelsInstance";
import { AuthLib } from "./lib/AuthLib";

export class BzlInstance {
    public authLib: AuthLib;
    private modelsInstance: ModelsInstance;

    constructor(models: ModelsInstance, hashSalt: string) {
        this.modelsInstance = models;
        this.authLib = new AuthLib(models.userModel, hashSalt);
    }
}