import View from './View';
import icons from '../../img/icons.svg';

class resultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMsg = 'No recipes found for this query. Please try again. :)';

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
}

export default new resultsView();
