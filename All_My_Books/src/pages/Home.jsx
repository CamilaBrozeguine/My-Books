import { Search } from 'lucide-react'
import { searchBooks } from '../api/api'
import { Button } from '../components/Button'
import { useState, Suspense } from 'react'
import { BookCard } from '../components/bookCard'
import { Input } from '../components/Input'

const Home = () => {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    const results = await searchBooks(query)
    setBooks(results.items || [])
    setLoading(false)
  }

  return (
    <>
      
      <header className='flex flex-col items-center justify-center'>

        <div className='fundo'>

        
          <div className='fundo-overlay'>
            <div className='titulo-header'>
              <div className='titulo-linha'></div>
              <h1>My Book Word</h1>
              <div className='titulo-linha'></div>
              <p className='titulo-sub'>uma biblioteca pessoal</p>
            </div>
          </div>

        </div>

       
        <p className='instrucao'>
          Digite o nome de um livro para encontrá-lo nas prateleiras do tempo.
        </p>

 
        <form className='busca-form' onSubmit={handleSearch}>
          <Input
            placeholder="Ex: O Hobbit, Alquimia..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type='submit' className='botao-conjurar'>
            <Search size={18} />
            {loading ? 'Conjurando...' : 'Conjurar'}
          </Button>
        </form>

      </header>

      {/* Grade de resultados */}
      <div className='resultados-grid'>
        {loading && (
          <p className='msg-resultados'>Conjurando livros...</p>
        )}
        {!loading && books.length === 0 && (
          <p className='msg-resultados'>
            Pesquise um livro para ver os resultados aqui.
          </p>
        )}

        {books.map((book) => (
          <BookCard key={book.id} book={book}>
            <div className='book-cover'>
              <img
                src={book.volumeInfo.imageLinks?.thumbnail || book.volumeInfo.imageLinks?.smallThumbnail}
                alt={book.volumeInfo.title}
              />
            </div>
            <h3>{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors?.join(', ')}</p>
            <p><strong>{book.volumeInfo.publishedDate}</strong></p>
          </BookCard>
        ))}
      </div>
    </>
  )
}

export default Home