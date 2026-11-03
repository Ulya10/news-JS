import AppLoader from './appLoader';
import { NewsResponse } from '../../types/news';
import { SourcesResponse } from '../../types/sources';
import { Endpoint } from '../../types/endpoints';

class AppController extends AppLoader {
    getSources(callback: (data: SourcesResponse) => void): void {
        super.getResp<SourcesResponse>({ endpoint: Endpoint.MockSources }, callback);
    }

    public getNews(e: MouseEvent, callback: (data: NewsResponse) => void): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');

                if (!sourceId) {
                    return;
                }

                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<NewsResponse>(
                        {
                            endpoint: Endpoint.MockEverything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            const parent = target.parentNode;
            if (!(parent instanceof HTMLElement)) {
                return;
            }
            target = parent;
        }
    }
}

export default AppController;
