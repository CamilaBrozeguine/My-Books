import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../styles/login.css';


export default function Login() {
    const {login, cadastrar, loginComGoogle} = useAuth();
    const navigate = useNavigate();

    const [modo , setModo] = useState('login');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);
    

      async function handleGoogle() {
        try {
          await loginComGoogle();
          navigate('/');
        } catch (err) {
          setErro(err.message);
        }
      }

    async function handleSubmit(e){
        e.preventDefault();
        setErro('');
        setCarregando(true);

        try{
            if(modo === 'login'){
                await login(email, senha);
            } else if(modo === 'cadastro'){
                await cadastrar(nome, email, senha);
            }
            navigate('/'); // Redireciona para a página inicial após o login ou cadastro
        }catch(err){
            setErro(err.message);
        }finally{
            setCarregando(false);
        }
    }

    return (
        <div className="login-container">
             <form onSubmit={handleSubmit} className="login-form">
         <div className="login-header">
          <h1 className="login-title">{modo === 'login' ? 'Login' : 'Cadastro'}</h1>
          <div className="login-subtitle">{modo === 'login' ? 'Bem-vindo de volta!' : 'Crie sua conta e descubra um mundo de livros'}</div>
         </div>
          
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '1rem' }}>
            <button type="button" className="login-button" onClick={() => setModo('login')}>Entrar</button>
            <button type="button" className="login-button" onClick={() => setModo('cadastro')}>Cadastrar</button>
          </div>

       
        {/* <form onSubmit={handleSubmit} className="login-form"> */}
        {modo === 'cadastro' && (
          <>
           <label className="label-login" htmlFor="nome">Nome:</label>
          <input className="login-input"
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
          </>
        )}

      <>
      <label className="label-login" htmlFor="email">Email:</label>
        <input className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </>

      <label className="label-login" htmlFor="senha">Senha:</label>

        <input className="login-input"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
       />

      

        {erro && <p style={{ color: 'red' }}>{erro}</p>}

        <button className="button-login" type="submit" disabled={carregando}>
          {carregando ? 'Aguarde...' : modo === 'login' ? 'Entrar' : 'Criar conta'}
        </button>
        
      {/* botão no JSX */}
      <button  className = "login-google" type="button" onClick={handleGoogle}>
        Entrar com Google
      </button>
      </form>
      
    </div>
  );
}

