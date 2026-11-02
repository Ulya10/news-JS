import './sources.css';
import { Source } from '../../../types/sources';

class Sources {
    draw(data: Source[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item: Source) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const name = sourceClone.querySelector('.source__item-name') as HTMLElement;
            name.textContent = item.name;

            const id = sourceClone.querySelector('.source__item') as HTMLElement;
            id.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesContainer =
            document.querySelector('.sources') as HTMLElement;
        sourcesContainer.append(fragment);
    }
}

export default Sources;
