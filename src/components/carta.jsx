import {useState} from 'react'
import '/carta.css'
import { div, p } from 'framer-motion/client'

const Carta = () =>{
    const [open, setAberta] = useState(false)

    return(

        <div
          className= {`carta ${open ? 'aberta' : 'carta-fechada'}`}
          onClick={() => setAberta(!open)}
          title = {open ? 'Clique para fechar' : 'Clique para abrir'}
          >
            <img 
              className='carta-img'
              src={open ? 'src/assets/cartaaberta01.png' : 'src/assets/cartafechada01.png'}
            />

            {!open && <p className='carta-texto'>clique para abrir</p>}
         </div>
    )
}

export default Carta