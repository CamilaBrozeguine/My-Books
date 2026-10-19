import { useState } from 'react';
import { atualizarFavorito } from '../services/favoritosService';
import Moveable from 'react-moveable';
import { useRef } from 'react';
import raminhoImg from '../assets/raminho.png';
import fitaImg from '../assets/fita.png';
import fitaamareImg from '../assets/fitaamare.png';
import lacoImg from '../assets/laço.png';
import butterflyImg from '../assets/butterfly.png';
import favLinedImg from '../assets/fav-lined04.png';
import startwifhheartImg from '../assets/starwifhheart.png';  
import stickercartaImg from '../assets/cartaaberta01.png';
import staramar from '../assets/startamar.png';


const fontes = [
  { label: 'Caveat',   value: 'Caveat, cursive' },
  { label: 'Playfair', value: '"Playfair Display", serif' },
  { label: 'Georgia',  value: 'Georgia, serif' },
  { label: 'Courier',  value: '"Courier New", monospace' },
];



const starLabels = ['', 'Horrível', 'não curti', 'Bom', 'Gostei', 'Ameiii'];

export function BookModal({ favorito, onClose, onSave }) {
  const [anotacao,       setAnotacao]       = useState(favorito.anotacao       || '');
  const [musicaLink,     setMusicaLink]     = useState(favorito.musicaLink     || '');
  const [fonteEscolhida, setFonteEscolhida] = useState(favorito.fonteEscolhida || 'Caveat, cursive');
  const [status,         setStatus]         = useState(favorito.status         || '');
  const [genero ,        setGenero]         = useState(favorito.genero || '');
  const [dataInicio, setInicio]             = useState(favorito.dataInicio || '');
  const [dataTermino , setDataTermino]      = useState(favorito.dataTermino || '');
  const [rating,         setRating]         = useState(favorito.rating         || 0);
  const [hovered,        setHovered]        = useState(0);
  const [salvando,       setSalvando]       = useState(false);
  const [toast,          setToast]          = useState(false); // ← movido pra dentro
  const [selecionado, setSelecionado] = useState(null);

  const refTr   = useRef(null);
  const refBl   = useRef(null);
  const refBr   = useRef(null);
  const refFdTr = useRef(null);
  const refFdBl = useRef(null);

  function getMusicIcon() {
    if (musicaLink.includes('spotify'))
      return { bg: '#1db954', icon: '♫' };
    if (musicaLink.includes('youtube') || musicaLink.includes('youtu.be'))
      return { bg: '#ff0000', icon: '▶' };
    return { bg: '#c9b49a', icon: '♪' };
  }

  
  function onTransform({ target, transform }) {
           target.style.transform = transform;
  }

  async function handleSalvar() {
  setSalvando(true);
  
  console.log("ID enviado para atualizar:", favorito._id);

  try {
    const atualizado = await atualizarFavorito(favorito._id, {
      anotacao, 
      musicaLink, 
      fonteEscolhida, 
      status, 
      rating,
    });

    onSave(atualizado);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
    onClose();
  } catch (err) {
    console.error('erro ao salvar:', err);
  } finally {
    setSalvando(false);
  }
}
  function getEmbedUrl(link) {
  if (!link) return null;
  
  // pega o track ID independente do formato do link
  if (link.includes('spotify') && link.includes('track')) {
    const id = link.split('track/')[1].split('?')[0];
    return `https://open.spotify.com/embed/track/${id}`;
  }
  if (link.includes('youtube.com/watch')) {
    const id = new URL(link).searchParams.get('v');
    return `https://www.youtube.com/embed/${id}`;
  }
  if (link.includes('youtu.be')) {
    const id = link.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  return null;
}

  const music = getMusicIcon();

  return (
    <div className='fav-overlay' onClick={onClose}>
      <div className='fav-modal' onClick={e => e.stopPropagation()}>
        <div className='fav-modal-washi' />
        <button type="button" className='fav-close' onClick={onClose}>✕</button>

        <div className='fav-modal-body'>

          {/* ── esquerda ── */}
          <div className='fav-modal-left'>
            <img
              className='fav-modal-cover'
              src={favorito.thumbnail || 'https://via.placeholder.com/100x148'}
              alt={favorito.title}
            />
            <div className='fav-modal-title'>{favorito.title}</div>
            <div className='fav-modal-author'>
              {favorito.authors?.join(', ') || 'Autor desconhecido'}
            </div>
            <div className='fav-modal-pub'>{favorito.publishedDate || 'Data de publicação desconhecida'}</div>
            

            <div className='fav-lbl-ava'>Avaliação</div>
            <div className='fav-stars'>
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  type="button"
                  className={`fav-star ${(hovered || rating) >= n ? 'on' : ''}`}
                  onMouseEnter={() => setHovered(n)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(n)}
                >★</button>
              ))}
              <span className='fav-star-label'>
                {hovered ? `— ${starLabels[hovered]}` : rating ? `— ${starLabels[rating]}` : ''}
              </span>
            </div>

            <div className='fav-pills'>
              {[
                { label: 'lendo',     cls: 'pill-y' },
                { label: 'lido',      cls: 'pill-g' },
                { label: 'quero ler', cls: 'pill-p' },
              ].map(p => (
                <button
                  key={p.label}
                  className={`fav-pill ${p.cls} ${status === p.label ? 'ativo' : ''}`}
                  onClick={() => setStatus(p.label)}
                >
                  {p.label}
                </button>
              ))}
            </div>
            {/* mostra "início" se lendo ou lido */}
              {(status === 'lendo' || status === 'lido') && (
                <div className='fav-data-wrap'>
                  <label className='fav-lbl-d'>início</label>
                  <input type='date' className='fav-date-input' 
                    value={dataInicio} onChange={e => setDataInicio(e.target.value)} />
                </div>
              )}

              {/* mostra "término" só se lido */}
              {status === 'lido' && (
                <div className='fav-data-wrap'>
                  <label className='fav-lbl-d'>Término</label>
                  <input type='date' className='fav-date-input'
                    value={dataTermino} onChange={e => setDataTermino(e.target.value)} />
                </div>
              )}
      </div>
          

          {/* ── direita ── */}
      



      
      <div className='fav-modal-right'>
        <div className='fav-lbl-f'>Anotações</div>
        <div className="fav-note-wrap" onClick={() => setSelecionado(null)}>
        

          <img ref={refTr}   src={startwifhheartImg}   className="fav-note-corner fnc-tr" aria-hidden="true" onClick={e => { e.stopPropagation(); setSelecionado(refTr); }}   style={{ cursor: 'pointer', zIndex: 10 }} />
          <img ref={refBl}   src={fitaImg}      className="fav-note-corner fnc-bl" aria-hidden="true" onClick={e => { e.stopPropagation(); setSelecionado(refBl); }}   style={{ cursor: 'pointer', zIndex: 10 }} />
          <img ref={refBr}   src={stickercartaImg} className="fav-note-corner fnc-br" aria-hidden="true" onClick={e => { e.stopPropagation(); setSelecionado(refBr); }}   style={{ cursor: 'pointer', zIndex: 10 }} />
          <img ref={refFdTr} src={lacoImg}      className="fav-dots fd-tr"         aria-hidden="true" onClick={e => { e.stopPropagation(); setSelecionado(refFdTr); }} style={{ cursor: 'pointer', zIndex: 10 }} />
          <img ref={refFdBl} src={butterflyImg} className="fav-dots fd-bl"         aria-hidden="true" onClick={e => { e.stopPropagation(); setSelecionado(refFdBl); }} style={{ cursor: 'pointer', zIndex: 10 }} />
          <img ref ={refTr}   src={staramar}   className="fav-note-corner fnc-tr" aria-hidden="true" onClick={e => { e.stopPropagation(); setSelecionado(refTr); }}   style={{ cursor: 'pointer', zIndex: 10 }} />

  
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

          <textarea
            className="fav-lined"
            style={{ fontFamily: fonteEscolhida }}
            value={anotacao}
            onChange={e => setAnotacao(e.target.value)}
            placeholder="Escreva seus pensamentos sobre este livro..."
          />
        </div>

              
         <div className='fav-section-divider' />
          <div className="row-split">
            <div className="section">
              <div className='fav-lbl-f'>Fonte</div>
                <div className='fav-font-row'>
                  {fontes.map(f => (
                    <button
                      key={f.value}
                      type="button"
                      className={`fav-fc ${fonteEscolhida === f.value ? 'on' : ''}`}
                      style={{ fontFamily: f.value }}
                      onClick={() => setFonteEscolhida(f.value)}
                    >
                      {f.label}
                    </button>
              ))}
            </div>
            </div>
              <div className="section">
                  <div className= 'fav-lbl-f'>Genero </div>
                      <div className ='fav-gen'> 
                        {[
                          { label: 'Romance',     cls: 'pill-r' },
                          { label: 'Terror',      cls: 'pill-t' },
                          { label: 'Aventura',    cls: 'pill-a'},
                          {label: 'Fantásia',     cls : 'pill-p'}
                        ].map(g => (
                          <button
                            key={g.label}
                            className={`fav-gen ${g.cls} ${genero === g.label ? 'ativo' : ''}`}
                            onClick={() => setGenero(g.label)}
                          >
                        {g.label}
                      </button>
              ))}
                    </div>
                  </div>
             </div>

            <div className='fav-section-divider' />
              <div className='fav-lbl-f'>Música do livro</div>
                <div className='fav-musica-wrap'>
                  <div className='fav-music-icon' style={{ background: music.bg }}>
                  {music.icon}
                </div>
                  <input
                    className='fav-music-input'
                    value={musicaLink}
                    onChange={e => setMusicaLink(e.target.value)}
                    placeholder="cole um link do Spotify ou YouTube..."
                  />
              </div>

            {getEmbedUrl(musicaLink) && (
              <iframe
                src={getEmbedUrl(musicaLink)}
                width="100%"
                height="80"
                frameBorder="0"
                allow='autoplay; clipboard-write; encrypted-media; fullscreen'
                style={{ borderRadius: '8px', border: 'none' }}
              />
            )}

            {/* ← botão salvar aqui dentro do right */}
            <div className='fav-save-row'>
              <button type="button" className='fav-save-btn' onClick={handleSalvar}>
                {salvando ? 'salvando...' : 'salvar '}
              </button>
            </div>

          </div>
        </div>
      </div>


      {/* toast de confirmação */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#a8c090',
          color: '#1e3a10',
          padding: '10px 24px',
          borderRadius: '20px',
          fontFamily: 'Caveat, cursive',
          fontSize: '1rem',
          fontWeight: 600,
          boxShadow: '2px 2px 0 #7a9a60',
          zIndex: 9999,
          animation: 'fadeIn 0.3s ease',
        }}>
          ✓ anotações salvas!
        </div>
      )}
    </div>
  );
}

export default BookModal;