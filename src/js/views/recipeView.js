import View from './View';
import icons from '../../img/icons.svg'; //parcel 1
// import icons from 'url:../img/icons.svg'; // parcel 2
// console.log(icons);

import { Fraction } from 'fractional';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMsg = 'We could not find this recipe. Please try another one !';
  _successMsg = '';

  // Publisher-Subscriber design => Publisher
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(event =>
      window.addEventListener(event, handler)
    );
  }
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-update-serving');

      if (!btn) return;

      const updateTo = +btn.dataset.updateTo;

      if (updateTo > 0) handler(updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-bookmark');

      if (!btn) return;

      handler();
    });
  }

  _generateMarkup() {
    return `
      <figure class="recipe-fig">
         <img class="recipe-img" src=${this._data.image} alt=${
      this._data.title
    }>
         <h1 class="recipe-title"><span>${this._data.title}</span></h1>
      </figure>

      <div class="recipe-details">
         <div class="recipe-info">
         <svg class="recipe-info-icon">
            <use href="${icons}#icon-clock"></use>
         </svg> 
         <span class="recipe-info-data recipe-info-data-minutes">${
           this._data.cookingTime
         }</span>
         <span class="recipe-info-text"> Minutes</span>
         </div>
         <div class="recipe-info">
         <svg class="recipe-info-icon">
            <use href="${icons}#icon-user"></use>
         </svg>
         <span class="recipe-info-data recipe-info-data-people">
         ${this._data.servings}
         </span>
         <span class="recipe-info-text"> Servings</span>
      </div>

      <div class="recipe-info-buttons">
         <button class="btn-tiny btn-update-serving" data-update-to = '${
           this._data.servings - 1
         }'>
            <svg>
               <use href="${icons}#icon-minus-circle"></use>
            </svg>
         </button>
         <button class="btn-tiny btn-update-serving" data-update-to = '${
           this._data.servings + 1
         }'>
            <svg>
               <use href="${icons}#icon-plus-circle"></use>
            </svg>
         </button>
       </div>
       <div class="recipe-user-generated ${this._data.key ? '' : 'hidden'}">
               <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
         </div>
    
      <button class="btn-round btn-bookmark">
         <svg>
            <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
         </svg>
      </button>
      </div>

      <div class="recipe-ingredients">
         <h2 class="heading-2">Recipe Ingredients</h2>
         <ul class="recipe-ingredient-list">

      ${this._data.ingredients
        .map(this._generateMarkupIngredient)
        .join('')}             
      </ul>
      </div>

      <div class="recipe-direction">
      <h2 class="heading-2">How to cook it</h2>
      <p class="recipe-direction-text">
         This recipe was carefully designed and tested by
         <span class="recipe-publisher">${this._data.publisher}</span>.
         Please check out directions at their website.
      </p>

      <a href=${
        this._data.sourceURL
      } class="btn-small recipe btn" target="_blank">
         <span>Directions</span>
         <svg class="search-icon">
            <use href="${icons}#icon-arrow-right"></use>
         </svg>
      </a>
      </div>
     `;
  }

  _generateMarkupIngredient(ing) {
    return `
         <li class="recipe-ingredient">
            <svg class="recipe-icon">
               <use href="${icons}#icon-check"></use>>
            </svg>
            <div class="recipe-quantity">${
              ing.quantity ? new Fraction(ing.quantity).toString() : ''
            }</div>
            <div class="recipe-description">
               <span class="recipe-unit">${ing.unit}</span>${ing.description}
            </div>
         </li>
      `;
  }
}

export default new RecipeView();
