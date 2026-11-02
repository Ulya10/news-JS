import './news.css';
import { Article } from '../../../types/news';

class News {
    draw(data: Article[]) {
        const news: Article[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item: Article, idx: number) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            const photo = newsClone.querySelector('.news__meta-photo') as HTMLElement;
            photo.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'
                })`;

            const author = newsClone.querySelector('.news__meta-author') as HTMLElement;
            author.textContent = item.author || item.source.name;

            const date = newsClone.querySelector('.news__meta-date') as HTMLElement;
            date.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            const title = newsClone.querySelector('.news__description-title') as HTMLElement;
            title.textContent = item.title;

            const source = newsClone.querySelector('.news__description-source') as HTMLElement;
            source.textContent = item.source.name;

            const content = newsClone.querySelector('.news__description-content') as HTMLElement;
            content.textContent = item.description;

            const link = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement;
            link.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news') as HTMLElement;
         newsContainer.innerHTML = '';
         newsContainer.appendChild(fragment);
    }
}

export default News;
