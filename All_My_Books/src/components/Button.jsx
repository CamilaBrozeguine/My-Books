import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Button = styled(motion.button)`
background: var(--verde_escuro);
color: var(--quasebranco);
border: none;
padding: 10px 20px;
border-radius: 30px;
margin: 10px 0px;
font-family: 'Poppins', sans-serif;
cursor: pointer;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);glow: 0 0 8px var(--quasebranco);
transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;

&:hover {
  background: var(--nude);
  color: var(--quasebranco);
  transform: translateY(-2px);
}
  `;
