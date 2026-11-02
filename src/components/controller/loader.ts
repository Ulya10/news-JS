type RequestOptions = Record<string, string | number>;

class Loader {

    private baseLink: string;
    private options: RequestOptions;

    constructor(baseLink: string, options: RequestOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: { endpoint: string; options?: RequestOptions },
        callback: (data: T) => void = () => {
            console.error('No callback for GET response');
        },
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: RequestOptions, endpoint: string): string {
        const urlOptions: RequestOptions = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(method: string,
        endpoint: string,
        callback: (data: T) => void,
        options: RequestOptions = {},) : void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json() as Promise<unknown>)
            .then((data: unknown) => callback(data as T))
            .catch((err: unknown) => console.error(err));
    }
}

export default Loader;
