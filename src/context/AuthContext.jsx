import { createContext, useContext , useState , useEffect} from 'react';
import { login as loginService, cadastrar as cadastrarService , loginComGoogle as loginComGoogleService
 } from '../services/authService';


const AuthContext = createContext({
    usuario: null,
    token: null,
    login: async () => {},
    cadastrar: async () => {},
    loginComGoogle: async () => {},
    logout: () => {},
    carregando: true,
});
import { getGoogleResult } from '../services/authService';



export function AuthProvider({ children }){
    const [usuario , setUsuario] = useState(null);
    const [token , setToken ] = useState(null);
    const [carregando , setCarregando ] = useState(true);

    useEffect(() => {
    getGoogleResult().then(dados => {
        if (dados?.token) {
        localStorage.setItem('token', dados.token);
        localStorage.setItem('usuario', JSON.stringify(dados.usuario));
        setToken(dados.token);
        setUsuario(dados.usuario);
        }
    }).catch(() => {});
    }, []);

    useEffect(() =>{
        const tokenSalvo = localStorage.getItem('token');
        const usuarioSalvo = localStorage.getItem('usuario');
        if(tokenSalvo && usuarioSalvo){
            setToken(tokenSalvo);
            setUsuario(JSON.parse(usuarioSalvo));
        }
        setCarregando(false);
    }, []);
        async function loginComGoogle() {
    const dados = await loginComGoogleService();
    localStorage.setItem('token', dados.token);
    localStorage.setItem('usuario', JSON.stringify(dados.usuario));
    setToken(dados.token);
    setUsuario(dados.usuario);
    } 
    async function login (email ,senha){
        const dados = await loginService(email, senha);
        localStorage.setItem('token' ,dados.token);
        localStorage.setItem('usuario' ,JSON.stringify(dados.usuario));
        setToken(dados.token);
        setUsuario(dados.usuario);
    }

    async function cadastrar(nome,email,senha) {
        await cadastrarService(nome , email , senha);
        await login(email, senha);
        
    }

    function logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        setToken(null);
        setUsuario(null);
    }

    return(
        <AuthContext.Provider value={{usuario, token, login, cadastrar , loginComGoogle , logout, carregando}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }

    return context;
}