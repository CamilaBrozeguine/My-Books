const BASE_URL = 'http://localhost:3000/auth';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import { signInWithRedirect, getRedirectResult } from 'firebase/auth';


export async function loginComGoogle() {
  await signInWithRedirect(auth, googleProvider);
}

// chama isso quando a página carrega pra pegar o resultado do redirect
export async function getGoogleResult() {
  const resultado = await getRedirectResult(auth);
  if (!resultado) return null;
  
  const tokenFirebase = await resultado.user.getIdToken();
  const res = await fetch('http://localhost:3000/auth/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tokenFirebase }),
  });
  return res.json();
}


export async function cadastrar(nome, email, senha) {
  const res = await fetch(`${BASE_URL}/cadastrar`, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}


export async function login(email, senha) {
  const res = await fetch(`${BASE_URL}/login`, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}






