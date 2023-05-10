class CatImg extends HTMLElement {
  constructor() {
    super();

    this.build();
  }

  build() {
    this.shadow = this.attachShadow({ mode: 'open' });

    this.shadow.innerHTML = 'New Component!';
  }
}

customElements.define('cat-img', CatImg);
