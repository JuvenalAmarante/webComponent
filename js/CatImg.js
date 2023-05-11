class CatImg extends HTMLElement {
  constructor() {
    super();

    this.width =
      +this.getAttribute('width') >= 100 ? this.getAttribute('width') : 200;
    this.height =
      +this.getAttribute('height') >= 100 ? this.getAttribute('height') : 200;

    this.init();
  }

  init() {
    this.shadow = this.attachShadow({ mode: 'open' });

    this.build();
  }

  async build() {
    const styles = this.createStyles();
    const container = this.createContainer();

    container.innerHTML = '<p>Carregando...</p>';

    this.shadow.innerHTML = '';
    this.shadow.appendChild(styles);
    this.shadow.appendChild(container);

    const img = await this.createImage();

    container.innerHTML = '';
    container.appendChild(img);

    this.shadow.appendChild(styles);
    this.shadow.appendChild(container);
  }

  createStyles() {
    const styles = document.createElement('style');

    styles.textContent = `
      .container {
        display: block;
        margin: auto;
        overflow: hidden;
        min-width: 100px;
        min-height: 100px;
        max-width: ${this.width}px;
        max-height: ${this.height}px;
        border: 3px solid black;
      }

      .image {
        display: block;
        margin: auto;
        width: 100%;
        height: 100%;
      }

      p {
        display: block;
        margin: auto;
        line-height: calc(100px - 6px);
        width: 100%;
        text-align: center;
      }
    `;

    return styles;
  }

  createContainer() {
    const container = document.createElement('div');

    container.className = 'container';

    return container;
  }

  async createImage() {
    const image = document.createElement('img');

    image.setAttribute('src', await this.getImage());
    image.className = 'image';

    return image;
  }

  async getImage() {
    try {
      const retorno = await (
        await fetch('https://api.thecatapi.com/v1/images/search')
      ).json();

      return retorno[0].url;
    } catch {
      return 'Deu ruim';
    }
  }
}

customElements.define('cat-img', CatImg);
