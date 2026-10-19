import { useState } from 'react';
import { useFavoritos } from '../context/FavoritesContext';
import { FavoriteCard } from '../components/FavoriteCard';
import { BookModal } from '../components/BookModal';
import '../styles/favorite.css';
import { Funnel } from 'lucide-react';

export function Favorites() {
  const { favorites, removeFavorites, updateFavorite } = useFavoritos();
  const [selecionado,   setSelecionado]   = useState(null);
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  const [filtroStatus,  setFiltroStatus]  = useState('todos');
  const [filtroGenero,  setFiltroGenero]  = useState('todos');
  const [busca,         setBusca]         = useState(''); // ← aqui, junto com os outros estados

  const favoritosFiltrados = favorites.filter(fav => {
    const passaStatus = filtroStatus === 'todos' || fav.status === filtroStatus;
    const passaGenero = filtroGenero === 'todos' || fav.genero === filtroGenero;
    const passaBusca  = !busca ||
      fav.title?.toLowerCase().includes(busca.toLowerCase()) ||
      fav.authors?.join(', ').toLowerCase().includes(busca.toLowerCase());
    return passaStatus && passaGenero && passaBusca;
  });

  function handleSave(atualizado) {
    updateFavorite(atualizado);
  }

  return (
    <div className="fav-page">
      <div className="fav-header">
        <h1 className="fav-titulo">Meus Favoritos</h1>
        <div className="fav-sub">✿ minha estante ✿</div>
        <div className="fav-divider">— ✦ —</div>
      </div>

      {/* botão funil */}
<div className='btn-funil'>
  <Funnel
    
    color="#e86868"
    strokeWidth={1.75}
    style={{ cursor: 'pointer' }}
    onClick={() => setFiltrosAbertos(!filtrosAbertos)}
    
  />
  <span >Filtros</span>
</div>

{/* filtros só aparecem quando abertos */}
{filtrosAbertos && (
  <div className="fav-filtros">

    {/* busca */}
    <div className="fav-filtro-grupo">
      <span className="fav-filtro-lbl">Buscar</span>
      <div className="fav-busca-wrap">
        <span>🔍</span>
        <input
          className="fav-busca-input"
          placeholder="título ou autor..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
      </div>
    </div>

    {/* status */}
    <div className="fav-filtro-grupo">
      <span className="fav-filtro-lbl">Status</span>
      <div className="fav-filtro-btns">
        {['todos', 'lendo', 'lido', 'quero ler'].map(s => (
          <button
            key={s}
            className={`fav-filtro-btn ${filtroStatus === s ? 'ativo' : ''}`}
            onClick={() => setFiltroStatus(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>

    {/* gênero */}
    <div className="fav-filtro-grupo">
      <span className="fav-filtro-lbl">Gênero</span>
      <div className="fav-filtro-btns">
        {['todos', 'Romance', 'Terror', 'Aventura', 'Fantásia'].map(g => (
          <button
            key={g}
            className={`fav-filtro-btn ${filtroGenero === g ? 'ativo' : ''}`}
            onClick={() => setFiltroGenero(g)}
          >
            {g}
          </button>
        ))}
      </div>
    </div>

  </div>
)}

      <div className="fav-grid">
        {favoritosFiltrados.length === 0 ? (
          <div className="fav-vazio">Nenhum favorito encontrado 🌸</div>
        ) : (
          favoritosFiltrados.map((fav, i) => (
            <FavoriteCard
              key={fav._id}
              favorito={fav}
              index={i}
              onClick={setSelecionado}
              onRemove={removeFavorites}
            />
          ))
        )}
      </div>

      {selecionado && (
        <BookModal
          favorito={selecionado}
          onClose={() => setSelecionado(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default Favorites;