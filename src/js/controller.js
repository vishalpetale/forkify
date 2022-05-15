import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';
import { MODAL_CLOSE_SEC } from './config';

import 'core-js/stable';

async function controlRecipe() {
  try {
    ///// get the hash from url
    const id = window.location.hash.slice(1);
    if (!id) return;

    // spinner
    recipeView.renderSpinner();

    // 0) update bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 1) Update resultsView to mark selected result
    resultsView.update(model.getSearchResultsPage());

    // 2) Loading Recipe
    await model.loadRecipe(id);

    // 3) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
}

async function controlSearchResults() {
  try {
    // Render Spinner
    resultsView.renderSpinner();

    // 1) get query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load search results
    await model.loadSearchResults(query);

    // 3) render search results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch {
    resultsView.renderError();
  }
}

function controlPagination(goto) {
  // Render NEW results as per page
  resultsView.render(model.getSearchResultsPage(goto));

  // Render NEW Pagination buttons
  paginationView.render(model.state.search);
}

function controlServings(newServings) {
  // 1) Update recipe servings in state
  model.updateServings(newServings);
  // 2) Re-render recipe view
  recipeView.update(model.state.recipe);
}

function controlAddBookmark() {
  // 1) add/ remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // 2) update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

export function controlBookmarks() {
  bookmarksView.render(model.state.bookmarks);
}

async function controlAddRecipe(newRecipe) {
  try {
    // Render spinner
    addRecipeView.renderSpinner();

    // Upload Recipe
    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage('Recipe was successfully uploaded.');

    // Render bookmarks view
    bookmarksView.render(model.state.bookmarks);

    // Change id in Url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close window
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err);
  }
}
// Publisher-subsciber Method => Subscriber - controlRecipe;
function init() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHanlderUpload(controlAddRecipe);
}
init();
