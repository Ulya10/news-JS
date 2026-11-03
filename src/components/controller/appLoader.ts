import Loader from './loader';
import { ReadonlyConfig } from '../../types/utility';

class AppLoader extends Loader {
    constructor() {
        const apiUrl = process.env.API_URL;
        const apiKey = process.env.API_KEY;

        if (!apiUrl || !apiKey) {
            throw new Error('API_URL and API_KEY must be defined in .env');
        }

        const config: ReadonlyConfig = {
            apiUrl,
            apiKey,
        };

        super(config.apiUrl, { apiKey: config.apiKey });
    }
}

export default AppLoader;
