const data = [
  {
    name: 'Cassels Milk Stou',
    description: 'Cassels & Sons Brewing. Cerveza porter y stout.',
    price: 75000,
    img: 'cassels.png',
    filterId: 1,
  },
  {
    name: 'Camba Pale Ale',
    description: 'La Souche Franc-Bois d’hiver. Cerveza pale.',
    price: 85300,
    img: 'camba.png',
    filterId: 2,
  },
  {
    name: 'Votus Nº 001',
    description: 'India Pale Ale del año 2019. Nº 001 Red IPA.',
    price: 75000,
    img: 'votus.png',
    filterId: 3,
  },
  {
    name: 'Prairie Artisian',
    description: 'Ales Prairie Noir Whiskey Barrel Aged Imperial Stout 12oz.',
    price: 85300,
    img: 'prairie-artisian.png',
    filterId: 1,
  },
  {
    name: 'Lost Abbey',
    description: 'The Lost Abbey Citrus Sin American Wild Ale 750ml.',
    price: 75000,
    img: 'lost-abbey.png',
    filterId: 2,
  },
  {
    name: 'Prairie',
    description: 'Prairie Artisa Ales Paradise Imperial Stout 12oz.',
    price: 85300,
    img: 'prairie.png',
    filterId: 3,
  },
  {
    name: 'Redrice',
    description: 'Hitachino Nest Beer Red Rice Ale 330ml.',
    price: 85300,
    img: 'redrice.png',
    filterId: 1,
  },
  {
    name: 'Cascade',
    description: 'Cascade Brewing 2017 Brunch Line BA NORTHWEST Sour Ale.',
    price: 175000,
    img: 'cascade.png',
    filterId: 2,
  },
  {
    name: 'Topa Topa',
    description: 'Topa Topa BREWING CO. 5th Year Anniversary clear Ipa 16oz.',
    price: 85300,
    img: 'topa.png',
    filterId: 3,
  },
  {
    name: 'Mira Brune Nº 6',
    description: 'Brown Ale, Brown Mira American Style.',
    price: 375000,
    img: 'mira.png',
    filterId: 1,
  },
];
const CACHE_KEY = 'beers-filter';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: data,
      showModal: false,
      filters: [],
    };
  }

  componentWillMount() {
    let beersFilter = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (beersFilter && beersFilter.length) {
      this.setState({ filters: beersFilter });
      this.setState({
        beers: data.filter((beer) => beersFilter.includes(beer.filterId)),
      });
    }
  }

  selectBeer = (value) => {
    if (this.state.filters.includes(value)) {
      this.setState({
        filters: this.state.filters.filter((id) => id !== value),
      });
    } else {
      this.setState({ filters: [...this.state.filters, value] });
    }
  };

  cleanSelection = () => {
    const filters = JSON.stringify([]);
    localStorage.setItem(CACHE_KEY, filters);

    this.setState({ filters: [] });
    this.setState({ showModal: false });
    this.setState({ beers: data });
  };

  filterBeers = () => {
    const filters = JSON.stringify(this.state.filters);
    localStorage.setItem(CACHE_KEY, filters);

    if (this.state.filters.length) {
      const filteredBeers = data.filter((beer) =>
        this.state.filters.includes(beer.filterId)
      );
      this.setState({ beers: filteredBeers });
    } else {
      this.setState({ beers: data });
    }
    this.setState({ showModal: false });
  };

  render() {
    const hbr = `

      <header>
        <img src=img/{{img}} alt="beer">
        <h2>{{name}}</h2>
        <p class='description'>{{description}}</p>
        <p class='price'>$ {{ price }}</p> 
      </header>
      <div>
        <button>Agregar</button>
      </div>`;
    let template = Handlebars.compile(hbr);

    return (
      <>
        <header class='header'>
          <div>
            <img src='/svg/menu.svg' />
            <img src='/svg/logo.svg' />
          </div>
          <div>
            <img src='/svg/search.svg' />
            <div class='cart-container'>
              <img src='/svg/cart.svg' />
              <div class='cart-counter'>
                <p>0</p>
              </div>
            </div>
          </div>
        </header>
        <main class={this.state.showModal ? 'opacity' : null}>
          <header>
            <h1>Cervezas</h1>
          </header>
          <section>
            <ol>
              {this.state.beers.map((beer) => (
                <article
                  key={beer.name}
                  dangerouslySetInnerHTML={{
                    __html: template(beer),
                  }}
                />
              ))}
            </ol>
            <aside>
              <div>
                <p>Sigue mercando</p>
                <h3>Vinos</h3>
              </div>
              <img src='/svg/arrow-right.svg'></img>
            </aside>
          </section>
        </main>
        <footer class={this.state.showModal ? 'opacity' : null}>
          <h4>¿Podemos ayudarte?</h4>
          <div class='help-container'>
            <div>
              <div class='help-button-container'>
                <img src='/svg/intercom.svg' />
              </div>
              <p class='help-paragraph'>Chat</p>
            </div>
            <div>
              <div class='help-button-container'>
                <img src='/svg/phone.svg' />
              </div>
              <p class='help-paragraph'>Llamar</p>
            </div>
          </div>
          <section>
            <ul>
              <li>
                <a href='#'>Sobre nosotros</a>
              </li>
              <li>
                <a href='#'>Medidas de seguridad(COVID-19)</a>
              </li>
              <li>
                <a href='#'>Cómo mercar</a>
              </li>
              <li>
                <a href='#'>Proveedores</a>
              </li>
              <li>
                <a href='#'>Contáctenos</a>
              </li>
              <li>
                <a href='#'>Zona de cobertura</a>
              </li>
            </ul>
            <hr />
            <div class='instagram-container'>
              <img src='/svg/instagram.svg'></img>
            </div>
            <h6>Politica de tratamiento de datos personales</h6>
          </section>
        </footer>
        {this.state.showModal ? (
          <div class='modal-container'>
            <div class='close-icon-container'>
              <img
                class='close-icon'
                src='/svg/close.svg'
                onClick={() => this.setState({ showModal: false })}
              />
            </div>
            <h3>Filtros</h3>
            <form>
              <label>
                Rubia
                <input
                  type='checkbox'
                  key={1}
                  defaultChecked={this.state.filters.includes(1)}
                  onClick={() => this.selectBeer(1)}
                />
              </label>
              <label>
                Morena
                <input
                  type='checkbox'
                  key={2}
                  defaultChecked={this.state.filters.includes(2)}
                  onClick={() => this.selectBeer(2)}
                />
              </label>
              <label>
                Roja
                <input
                  type='checkbox'
                  key={3}
                  defaultChecked={this.state.filters.includes(3)}
                  onClick={() => this.selectBeer(3)}
                />
              </label>
            </form>
            <div class='modal-buttons-container'>
              <button
                disabled={!this.state.filters.length}
                onClick={this.cleanSelection}
              >
                Limpiar
              </button>
              <button class='filter-button' onClick={this.filterBeers}>
                <div class='filter-button-label'>
                  <span>Filtrar</span>
                  <img src='/svg/filters.svg'></img>
                  {this.state.filters.length > 0 && (
                    <div class='total-beers'>{this.state.filters.length}</div>
                  )}
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div class='filter-button-container'>
            <button onClick={() => this.setState({ showModal: true })}>
              <div class='filter-button-label'>
                <span>Filtrar</span>
                <img src='/svg/filters.svg'></img>
              </div>
            </button>
          </div>
        )}
      </>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
