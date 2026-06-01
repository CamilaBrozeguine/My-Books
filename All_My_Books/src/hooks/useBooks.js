import {useState , useCallback} from 'react'
import { searchBooks } from '../api/api'

export function useBooks(){
    const [books , setBooks] = useState([])
    const [loading , setLoading] = useState(false)
    const [error, setError] = useState(null)

    const search = useCallback(async (query) =>{
        if(!query.trim())  return
        setLoading(true)
        setError(null)
        try{
            const results = await searchBooks(query)
            setBooks(results.items || [])
        }catch(err){
            setError('Falha ao conjurar os livros.Tente novamente')
            setBooks([])
        }finally{
            setLoading(false)
        }
    },[])

    return {books, loading, error , search}
}