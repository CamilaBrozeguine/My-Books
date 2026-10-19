import { useFavoritos } from '../context/FavoritesContext';
import '../styles/statistics.css';

const meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];


export default function Statistics() {
  const { favorites } = useFavoritos();

  // só livros com status "lido"
  const lidos = favorites.filter(f => f.status === 'lido');

  // livros por mês
  const porMes = Array(12).fill(0);
  lidos.forEach(f => {
    if (f.dataTermino) {
      const mes = new Date(f.dataTermino).getMonth();
      porMes[mes]++;
    }
  });
  

  // mês mais produtivo
  const maxLivros = Math.max(...porMes);
  const mesMaisLido = porMes.indexOf(maxLivros);

  // gêneros
  const porGenero = {};
  lidos.forEach(f => {
    if (f.genero) porGenero[f.genero] = (porGenero[f.genero] || 0) + 1;
  });
  const totalGenero = Object.values(porGenero).reduce((a, b) => a + b, 0);
  const generosSorted = Object.entries(porGenero).sort((a, b) => b[1] - a[1]);

  // autores
  const porAutor = {};
  lidos.forEach(f => {
    f.authors?.forEach(a => {
      porAutor[a] = (porAutor[a] || 0) + 1;
    });
  });
  const autoresSorted = Object.entries(porAutor)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3); // top 3

  const coresGenero = ['#e8b4b8', '#a8c090', '#b4c8e8', '#e8d4a0', '#d4b4e8'];
  const washiCards = ['card-1', 'card-2', 'card-3', 'card-4'];

  return (
    <div className="stats-page">
      <div className="stats-header">
        <div className="stats-titulo">Minha Jornada Literária</div>
        <div className="stats-sub">✿ sua história em livros ✿</div>
        <div className="stats-divider">— ✦ —</div>
      </div>

      <div className="stats-grid">

        {/* total de livros */}
        <div className="stats-card card-1">
          <span className="stats-lbl">livros lidos</span>
          <div className="stats-big-num">{lidos.length}</div>
          <div className="stats-big-sub">no total ✨</div>
        </div>

        {/* mês mais produtivo */}
        <div className="stats-card card-2">
          <span className="stats-lbl">mês mais produtivo</span>
          {maxLivros > 0 ? (
            <>
              <div className="stats-highlight-mes">{meses[mesMaisLido]}</div>
              <div className="stats-highlight-sub">{maxLivros} {maxLivros === 1 ? 'livro' : 'livros'} neste mês</div>
              <span className="stats-badge">✦ recorde pessoal</span>
            </>
          ) : (
            <div className="stats-highlight-sub">ainda sem dados </div>
          )}
        </div>

        {/* autores favoritos */}
        <div className="stats-card card-3">
          <span className="stats-lbl">autores favoritos</span>
          {autoresSorted.length > 0 ? (
            <div className="stats-autores">
              {autoresSorted.map(([autor, qtd], i) => (
                <div className="stats-autor-item" key={autor}>
                  <div className="stats-autor-rank">0{i + 1}</div>
                  <div className="stats-autor-name">{autor}</div>
                  <div className="stats-autor-livros">{qtd} {qtd === 1 ? 'livro' : 'livros'}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="stats-highlight-sub">ainda sem dados </div>
          )}
        </div>

        {/* gêneros */}
        <div className="stats-card card-4">
          <span className="stats-lbl">gêneros mais lidos</span>
          {generosSorted.length > 0 ? (
            <div className="stats-generos">
              {generosSorted.map(([genero, qtd], i) => (
                <div className="stats-genero-item" key={genero}>
                  <div className="stats-genero-name">{genero}</div>
                  <div className="stats-genero-bar-bg">
                    <div
                      className="stats-genero-bar"
                      style={{
                        width: `${(qtd / totalGenero) * 100}%`,
                        background: coresGenero[i % coresGenero.length]
                      }}
                    />
                  </div>
                  <div className="stats-genero-pct">
                    {Math.round((qtd / totalGenero) * 100)}%
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="stats-highlight-sub">ainda sem dados </div>
          )}
        </div>

        {/* livros por mês */}
        <div className="stats-card card-1 stats-card-wide">
          <span className="stats-lbl">livros por mês</span>
          <div className="stats-months">
            {porMes.map((qtd, i) => (
              <div className="stats-month-col" key={i}>
                <div className="stats-month-bar-wrap">
                  <div
                    className="stats-month-bar"
                    style={{
                      height: maxLivros > 0 ? `${(qtd / maxLivros) * 60}px` : '0px',
                      background: i === mesMaisLido && qtd > 0 ? '#5a7a3a' : '#a8c090'
                    }}
                  />
                </div>
                <div className="stats-month-num">{qtd}</div>
                <div className="stats-month-lbl">
                  {meses[i]}{i === mesMaisLido && qtd > 0 ? ' ⭐' : ''}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

