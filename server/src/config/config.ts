import { CONFIG_TYPES } from "./configTypes";

export const config: CONFIG_TYPES = {
    express: {
        PORT: 3000,
    },
    db: 'mongodb://localhost:27017/webTech?authSource=admin',
    mongoQueryLimit: 500,
}