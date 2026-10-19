const BASE_URL = 'http://localhost:3000/favoritos';

function getToken(){
  return localStorage.getItem('token');
}
async function fetchComAuth(url, options = {}) {
  const token = getToken();
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (res.status === 401 && token) {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '/login';
  }

  return res;
}

function headers() {
  const token = getToken();

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function getFavoritos() {
  const res = await fetchComAuth(BASE_URL, {
    headers: headers(),
  });

  if (!res.ok) {
    throw new Error('Erro ao carregar favoritos');
  }

  const payload = await res.json();
  return normalizeFavoritos(payload);
}

export async function getFavorito(googleBookId) {
  const res = await fetchComAuth(`${BASE_URL}/${googleBookId}`, {
    headers: headers(),
  });
  return res.json();
}
// aqui os dados do favorito podem vir de diferentes formas, então normalizamos para um formato consistente como por exemplo: { title, authors, publishedDate, pageCount, thumbnail, status } de dados do backend ou da API do Google Books
function normalizeAuthors(favorito) {
  if (Array.isArray(favorito?.authors)) return favorito.authors;
  if (Array.isArray(favorito?.author)) return favorito.author;
  if (Array.isArray(favorito?.volumeInfo?.authors)) return favorito.volumeInfo.authors;
  if (typeof favorito?.authors === 'string') return [favorito.authors];
  if (typeof favorito?.author === 'string') return [favorito.author];
  return [];
}

function normalizeFavoritos(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.value)) return payload.value;
  if (payload && Array.isArray(payload.favoritos)) return payload.favoritos;
  return [];
}

function normalizeFavorite(favorito) {
  return {
    ...favorito,
    title: favorito.title || favorito.volumeInfo?.title || 'Título desconhecido',
    authors: normalizeAuthors(favorito),
    author: normalizeAuthors(favorito),
    publishedDate: favorito.publishedDate || favorito.published_date || favorito.volumeInfo?.publishedDate || '',
    pageCount: favorito.pageCount ?? favorito.page_count ?? favorito.pages ?? favorito.volumeInfo?.pageCount ?? null,
    thumbnail: favorito.thumbnail || favorito.volumeInfo?.imageLinks?.thumbnail || '',
    status: favorito.status || '',
  };
}

export async function adicionarFavorito(favorito) {
  const res = await fetchComAuth(BASE_URL, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      googleBookId: favorito.id,
      title: favorito.volumeInfo?.title,
      authors: favorito.volumeInfo?.authors,
      thumbnail: favorito.volumeInfo?.imageLinks?.thumbnail,
      publishedDate: favorito.volumeInfo?.publishedDate,
      pageCount: favorito.volumeInfo?.pageCount,
    }),
  });

  if (!res.ok) {
    throw new Error('Erro ao adicionar favorito');
  }
  return res.json();
}

export async function removerFavorito(id) {
  const res = await fetchComAuth(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: headers(),
  });
  if (!res.ok) throw new Error('Erro ao remover favorito');
}

export async function atualizarFavorito(id, dados) {
  const url = `${BASE_URL.replace(/\/$/, '')}/${id}`;

  const res = await fetchComAuth(url, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify(dados),
  });

  if (!res.ok) {
    // Tenta ler a mensagem de erro que o backend retornou
    const erroBackend = await res.text();
    console.error(`[Erro HTTP ${res.status}] Resposta do servidor:`, erroBackend);
    
    throw new Error(`Erro ao atualizar favorito (${res.status})`);
  }

  return res.json();
}