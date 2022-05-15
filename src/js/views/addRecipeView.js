import View from './View';
import icons from '../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _successMsg = 'Recipe is successfully uploaded. :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav-btn-add-recipe');
  _btnClose = document.querySelector('.btn-close-modal');

  constructor() {
    super();
    this.addHandlerShowWindow();
    this.addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHandlerHideWindow() {
    [this._btnClose, this._overlay].forEach(btn => {
      btn.addEventListener('click', this.toggleWindow.bind(this));
    });
  }

  // Handling upload
  addHanlderUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr); // ES-19 -> Object from key-value pairs

      handler(data);
    });
  }
}

export default new AddRecipeView();
