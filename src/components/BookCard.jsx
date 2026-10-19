import { Heart } from 'lucide-react';
import { Button } from './Button';
import { useFavoritos } from '../context/FavoritesContext';
import '../styles/favorite.css';

export function BookCard({ book }) {
  const { favoritos, toggleFavorito, isFavorite } = useFavoritos();
  
  // Handle both API format (with volumeInfo) and database format (flattened)
  const bookId = book.id || book.googleBookId;
  const favorited = isFavorite(bookId);
  const title = book.volumeInfo?.title || book.title || 'Título desconhecido';
  const authorsList = book.volumeInfo?.authors || (book.authors ? (Array.isArray(book.authors) ? book.authors : [book.authors]) : []);
  const authors = authorsList.join(', ') || 'Autor desconhecido';
  const publishedDate = book.volumeInfo?.publishedDate || book.publishedDate || 'N/A';
  const thumbnail = book.volumeInfo?.imageLinks?.thumbnail || book.thumbnail || 'https://via.placeholder.com/150';

  return (
    <div className="fav-card compact">
      <div className={`fav-washi washi-beige`} />

      <img
        className="fav-card-img"
        src={thumbnail}
        alt={title}
      />

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); toggleFavorito(book); }}
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          width: 36,
          height: 36,
          minWidth: 0,
          padding: 0,
          border: 'none',
          borderRadius: '50%',
          background: 'var(--quasebranco)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <Heart fill={favorited ? 'var(--vermelho_escuro)' : 'none'} />
      </button>

      <div className="fav-card-info">
        <div className="fav-card-title">{title}</div>
        <div className="fav-card-author">{authors}</div>
        <div className="fav-card-published"><strong>Publicação:</strong> {publishedDate}</div>
      </div>

      <div style={{ padding: '0.6rem' }}>
        <Button
          type="button"
          style={{ width: '100%', background: 'var(--nude)', color: 'var(--quasebranco)' }}
          onClick={(e) => { e.stopPropagation(); toggleFavorito(book); }}
        >
          {favorited ? 'Remover dos Favoritos' : 'Adicionar à Minha Biblioteca'}
        </Button>
      </div>
    </div>
  );
}

export default BookCard;
