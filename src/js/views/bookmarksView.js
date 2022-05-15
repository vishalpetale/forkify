import View from './View';
import icons from '../../img/icons.svg';

class bookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks-list');
  _errorMsg = 'No bookmarks yet. Search a nice recipe and bookmark it. :)';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);

    return `
      <li class="preview">
         <a class="preview-link ${
           result.id === id ? 'preview-link-active' : ''
         }" href= #${result.id}>
            <figure class="preview-fig">
               <img src="${result.image}" alt=${result.title}>
            </figure>
            <div class="preview-data">
               <h4 class="preview-name">${result.title}</h4>
               <p class="preview-publisher">${result.publisher}</p>
               <div class="preview-user-generated ${
                 result.key ? '' : 'hidden'
               }">
              <svg>
                 <use href="${icons}#icon-user"></use>
               </svg>
        </div>
            </div>
         </a>
      </li>
     `;
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new bookmarksView();
