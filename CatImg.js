class CatImg extends HTMLElement {
  constructor() {
    super();

    this.width = this.getAttribute('width') || 200;
    this.height = this.getAttribute('height') || 200;

    this.build();
  }

  build() {
    this.shadow = this.attachShadow({ mode: 'open' });

    this.refresh();
  }

  async refresh() {
    
    const styles = this.createStyles();
    const container = this.createContainer();

    container.innerHTML = 'Carregando...';
    
    this.shadow.innerHTML = '';
    this.shadow.appendChild(styles);
    this.shadow.appendChild(container);
    
    const img = await this.createImage();
    
    container.innerHTML = '';
    container.appendChild(img)

    this.shadow.appendChild(styles);
    this.shadow.appendChild(container);
  }

  createStyles() {
    const styles = document.createElement('style');
    
    styles.textContent = `
      .container {
        display: flex;
        overflow: hidden;
        min-width: 100px;
        min-height: 100px;
        max-width: ${this.width}px;
        max-height: ${this.height}px;
        align-items: center;
        justify-content: center;
        border: 3px solid black;
      }

      .image {
        max-width: 100%;
        max-height: 100%;
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
