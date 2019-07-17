class PageLoader {
  constructor() {
    this.currentProgress = 0;
    this.pageLoaded = false;

    this.init();
  }

  init() {
    this.insertLoader();

    this.startTimer();

    window.addEventListener('load', () => {
      this.pageLoaded = true;
    });
  }

  insertLoader() {
    document.addEventListener('DOMContentLoaded', () => {
      this.pageLoader = document.createElement('div');
      this.pageLoader.classList.add('page-loader');
      document.body.appendChild(this.pageLoader);
    });
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.tick();
    }, 100);
  }

  tick() {
    if (this.pageLoaded) {
      if (this.currentProgress > 99) {
        this.currentProgress = 100;
        this.stopTimer();
      } else {
        this.currentProgress += 10;
      }
    } else {
      if (this.currentProgress < 81) {
        this.currentProgress += this.random();
      }
    }

    this.setWidth();
  }

  setWidth() {
    this.pageLoader.style.width = `${this.currentProgress}%`;
  }

  stopTimer() {
    clearInterval(this.timer);
    this.destroy();
  }

  destroy() {
    if (this.pageLoader) {
      setTimeout(() => {
        this.pageLoader.parentNode.removeChild(this.pageLoader);
        delete this.pageLoader;
      }, 500);
    }
  }

  random() {
    return Math.floor(Math.random() * 10) + 1;
  }
}

new PageLoader();
