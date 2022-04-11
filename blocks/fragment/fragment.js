import { decorateArea, loadLazy } from '../../scripts/scripts.js';

export default async function init(a) {
  const resp = await fetch(`${a.href}.plain.html`);
  if (resp.ok) {
    try {
      const html = await resp.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const fragment = doc.querySelector('div');
      fragment.className = 'fragment';
      const blocks = decorateArea(fragment);
      await loadLazy(blocks);

      a.parentElement.replaceChild(fragment, a);
    } catch (e) {
      console.log('Could not make fragment');
    }
  } else {
    console.log('Could not get fragment');
  }
}