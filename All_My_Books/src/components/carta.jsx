import {useState} from 'react'
import '/carta.css'
import { div, p } from 'framer-motion/client'

const Carta = () =>{
    const [aberta, setAberta] = useState(false)

    return(

        <div
          className= {`carta ${aberta ? 'aberta' : 'carta-fechada'}`}
          onClick={() => setAberta(!aberta)}
          title = {aberta ? 'Clique para fechar' : 'Clique para abrir'}
          >
            <img 
              className='carta-img'
              src={aberta ? 'src/assets/cartaaberta01.png' : 'src/assets/cartafechada01.png'}
            />

            {!aberta && <p className='carta-texto'>clique para abrir</p>}
         </div>
    )
}

export default Carta