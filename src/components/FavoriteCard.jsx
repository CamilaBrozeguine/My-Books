import { X } from 'lucide-react';



const washiStyles = ['washi-green', 'washi-pink', 'washi-beige'];
const statusClassMap = {
  lendo: 'tag-lendo',
  lido: 'tag-lido',
  quero: 'tag-quero',
  'quero ler': 'tag-quero',
};

export function FavoriteCard({ favorito, index, onClick, onRemove }) {
  const washi = washiStyles[index % washiStyles.length];
  const statusClass = favorito.status
    ? statusClassMap[favorito.status.toLowerCase()] || 'tag-quero'
    : '';

  const authorText = Array.isArray(favorito.authors)
    ? favorito.authors.join(', ')
    : Array.isArray(favorito.author)
      ? favorito.author.join(', ')
      : favorito.authors || favorito.author || favorito.volumeInfo?.authors || 'Autor não especificado';

  const publishedText = favorito.publishedDate || favorito.published_date || favorito.volumeInfo?.publishedDate || 'Data de publicação não especificada';
  const pageText = favorito.pageCount ?? favorito.page_count ?? favorito.pages ?? favorito.volumeInfo?.pageCount ?? 'Número de páginas não especificado';

 const handleRemoveClick = (e) => {
  e.stopPropagation();
  if (onRemove) onRemove(favorito._id); // ← só _id
};

  return (
    <div className="fav-card" onClick={() => onClick(favorito)}>
      <div className={`fav-washi ${washi}`} />
      <img
        className="fav-card-img"
        src={favorito.thumbnail || 'https://via.placeholder.com/150x220?text=sem+capa'}
        alt={favorito.title || 'Capa do livro'}
      />
            <button className="fav-card-remove" type="button" onClick={handleRemoveClick}>
              <X color="#f32075" strokeWidth={1.75} />
            </button>

      {favorito.status && (
        <span className={`fav-status-tag ${statusClass}`}>
          {favorito.status}
        </span>
      )}

      <div className="fav-card-info">
        <div className="fav-card-title">{favorito.title}</div>
        <div className="fav-card-author">{authorText}</div>
        <div className="fav-card-published">{publishedText}</div>
        <div className="fav-card-pag">{pageText}</div>
      </div>
    </div>
  );
}

export default FavoriteCard;