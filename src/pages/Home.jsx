
import { Search } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import BookCard from '../components/BookCard';
import { useBooks } from '../hooks/useBooks';
import { useState, useRef } from 'react';
import Moveable from 'react-moveable';
import raminhoImg from '../assets/raminho.png';
import fitaImg from '../assets/fita.png';
import staramar from '../assets/startamar.png';
import lacoImg from '../assets/laço.png';
import startImg from '../assets/start.png';
import favLinedImg from '../assets/fav-lined.png';

export default function Home() {
  const [query, setQuery] = useState('');
  const { books, loading, error, search } = useBooks();
   const [toast,          setToast]          = useState(false); // ← movido pra dentro
     const [selecionado, setSelecionado] = useState(null);
   
     const refTr   = useRef(null);
     const refBl   = useRef(null);
     const refBr   = useRef(null);
     const refFdTr = useRef(null);
     const refFdBl = useRef(null);
   
  async function handleSearch(event) {
    event.preventDefault();
    await search(query);

  }
 
   

  return (
    <div className='fav-background'>
     <section className='home-hero'>
  
  {/* adesivos FORA do paper, posicionados ao redor */}
  <div className='hero-stickers'>
    <img ref={refTr} src={raminhoImg} className="sticker sticker-tl" aria-hidden="true"
      onClick={e => { e.stopPropagation(); setSelecionado(refTr); }}
      style={{ cursor: 'pointer' }} />

    <img ref={refBl} src={fitaImg} className="sticker sticker-tr" aria-hidden="true"
      onClick={e => { e.stopPropagation(); setSelecionado(refBl); }}
      style={{ cursor: 'pointer' }} />

    <img ref={refBr} src={staramar} className="sticker sticker-bl" aria-hidden="true"
      onClick={e => { e.stopPropagation(); setSelecionado(refBr); }}
      style={{ cursor: 'pointer' }} />

    <img ref={refFdTr} src={lacoImg} className="sticker sticker-br" aria-hidden="true"
      onClick={e => { e.stopPropagation(); setSelecionado(refFdTr); }}
      style={{ cursor: 'pointer' }} />

    <img ref={refFdBl} src={startImg} className="sticker sticker-ml" aria-hidden="true"
      onClick={e => { e.stopPropagation(); setSelecionado(refFdBl); }}
      style={{ cursor: 'pointer' }} />

    {/* papel com título no centro */}
    <div className='title-wifh-paper' onClick={() => setSelecionado(null)}>
      <div className='titulo-header'>
        <h1>MyBooks</h1>
        <p className='titulo-sub'>Seu scrapbook literário</p>
      </div>
    </div>

    {selecionado?.current && (
      <Moveable
        target={selecionado}
        draggable={true}
        rotatable={true}
        resizable={true}
        keepRatio={true}
        onDrag={({ target, transform }) => target.style.transform = transform}
        onRotate={({ target, transform }) => target.style.transform = transform}
        onResize={({ target, width, height, drag }) => {
          target.style.width = `${width}px`;
          target.style.height = `${height}px`;
          target.style.transform = drag.transform;
        }}
      />
    )}
  </div>

  <p className='instrucao'>Encontre seu próximo livro favorito</p>

  <form className='busca-form' onSubmit={handleSearch}>
    <Input
      placeholder='Ex: O Hobbit, Dom Casmurro...'
      value={query}
      onChange={(event) => setQuery(event.target.value)}
    />
    <Button type='submit' className='botao-conjurar'>
      <Search size={18} />
      {loading ? 'Procurando...' : 'Procurar'}
    </Button>
  </form>
</section>

    <div className="borda-scalloped">

</div>

      <section className='home-busca'>
        <div className='resultados-wrapper'>
          <div className='resultados-grid'>
            {loading && <p className='msg-resultados'>Procurando seus livros... </p>}
            {!loading && error && <p className='msg-resultados'>{error}</p>}
            {!loading && !error && books.length === 0 && (
              <p className='msg-resultados'>Pesquise um livro para ver os resultados aqui.</p>
            )}
            {books.map((book) => (
              <BookCard key={book.id || book.googleBookId} book={book} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

