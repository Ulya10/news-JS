import { Article } from './news';

export type ArticlePreview = Pick<Article, 'title' | 'url'>;
export type ArticleUpdate = Partial<Article>;

export type ReadonlyConfig = Readonly<{
    apiUrl: string;
    apiKey: string;
}>;
