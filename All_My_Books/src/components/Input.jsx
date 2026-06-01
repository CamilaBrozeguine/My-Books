import styled from "styled-components";
import { motion } from "framer-motion";

export const Input = styled(motion.input)`
  padding: 10px;
    border: 1px solid var(--quasebranco);
    border-radius: 40px; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
    transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
    font-size: 16px;
    width: 60%;
    background:rgba(255,255,255,.35);
    backdrop-filter:blur(3px);
    border:1px solid rgba(255,255,255,.4);
    color: var(--text); 
    transition: border-color 0.3s ease;
    

    &:focus {
      outline: none;
      border-color: var(--quasebranco);
    }
    
    &: hover{
      border-color: var(--quasebranco);
      }
`;