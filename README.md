
# MyBooks

MyBooks é um front-end de biblioteca e organização literária pensado para oferecer uma experiência mais emocional, visual e personalizada do que uma interface genérica de catálogo. A proposta central não é apenas buscar livros, mas criar uma sensação de scrapbook literário: uma estante que parece viva, com elementos decorativos, cartões, adesivos, páginas manuscritas e uma identidade visual que lembra diários, cadernos e materiais artesanais.

O objetivo do projeto é unir funcionalidade de catálogo, autenticação, favoritos e estatísticas com uma interface que escape do padrão frio da maioria dos apps de leitura. Em vez de parecer uma ferramenta utilitária, o app tenta funcionar como um espaço íntimo para guardar descobertas, acompanhar leituras e construir uma relação mais pessoal com a biblioteca do usuário.

---

## Objetivo do front-end

O front-end foi desenvolvido para:

- entregar uma experiência interativa e visualmente marcante;
- permitir ao usuário buscar livros e salvar seus favoritos;
- transformar favoritos em uma estante personalizada;
- dar sensação de colecionismo e memória literária, em vez de simples listagem;
- oferecer um fluxo de autenticação com login e cadastro;
- apresentar métricas sobre leituras e hábitos literários;
- criar uma identidade visual forte, inspirada em scrapbook, papel, fita, desenhos de bordas e materiais artesanais.

A ideia é que a UI/UX tenha personalidade própria. Em vez de uma tela neutra e previsível, o app tenta reproduzir a sensação de um caderno de leituras pessoal: com overlays, elementos decorativos, layouts irregulares, contraste de texturas e grafismos que misturam estética artesanal e funcionalidade moderna.

---

## Visão geral da aplicação

O projeto combina:

- busca de livros via API externa;
- autenticação local e com Google;
- controle de sessão do usuário;
- gerenciamento de favoritos;
- filtros e organização das leituras;
- dashboard de estatísticas pessoais;
- layout visual fragmentado, acolhedor e artesanal.

Esses elementos transformam a experiência em algo mais próximo de um diário literário do que de um catálogo industrial.

---

## Funcionalidades principais

### 1. Busca de livros
A página inicial permite ao usuário procurar títulos, autores ou temas. A busca usa a API do Google Books como principal fonte e conta com fallback para a Open Library quando necessário.

### 2. Autenticação
O sistema de autenticação suporta:

- cadastro de usuário;
- login com email e senha;
- login com Google;
- controle de sessão do usuário;
- logout seguro.

A autenticação foi pensada para não depender de segredos expostos diretamente no código-fonte, mantendo variáveis sensíveis em ambiente.

### 3. Favoritos
O app permite salvar livros em uma lista pessoal. A funcionalidade inclui:

- adicionar/remover favoritos;
- manter os dados associados ao usuário;
- exibir os livros em uma página dedicada;
- filtrar por status, gênero e busca textual;
- abrir detalhes do item em modal.

### 4. Estatísticas literárias
A seção de estatísticas transforma a coleção em dados pessoais, como:

- quantidade total de livros lidos;
- mês mais produtivo;
- autores mais frequentes;
- gêneros mais lidos;
- gráfico de livros por mês.

Isso ajuda a dar ao usuário a sensação de acompanhamento de sua jornada.

### 5. Scrapbook visual
A visual identity é um dos diferenciais do projeto. O app usa:

- elementos decorativos como fitas, laços, estrelas e papéis;
- composição visual irregular;
- paleta quente e acolhedora;
- tipografia com estética manuscrita e editorial;
- motion e interatividade para dar sensação de profundidade.

---

## Arquitetura do projeto

A estrutura foi organizada para separar responsabilidades e facilitar manutenção.

\`\`\`text
MyBooks/
├── public/
├── src/
│   ├── api/
│   │   └── api.js
│   ├── assets/
│   ├── components/
│   │   ├── BookCard.jsx
│   │   ├── BookModal.jsx
│   │   ├── Button.jsx
│   │   ├── FavoriteCard.jsx
│   │   ├── Input.jsx
│   │   ├── NavBar.tsx
│   │   ├── login.jsx
│   │   └── ...
│   ├── config/
│   │   └── env.js
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── FavoritesContext.jsx
│   ├── hooks/
│   │   └── useBooks.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Favorite.jsx
│   │   ├── Statistics.jsx
│   │   └── ...
│   ├── services/
│   │   ├── authService.js
│   │   ├── favoritosService.js
│   │   ├── firebase.js
│   │   ├── server.js
│   │   └── ...
│   ├── styles/
│   │   ├── favorite.css
│   │   ├── login.css
│   │   ├── MacicStyle.js
│   │   └── statistics.css
│   ├── utils/
│   │   └── storage.js
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env.example
├── .gitignore
├── Dockerfile
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── ...
\`\`\`

### Organização por camadas

#### `src/api/`
Responsável por integrar APIs externas de livros, principalmente Google Books e fallback para a Open Library.

#### `src/components/`
Contém blocos visuais reutilizáveis e independentes:

- `BookCard`: cartão de livro na listagem;
- `FavoriteCard`: item visual da estante de favoritos;
- `BookModal`: modal para detalhes e edição de status;
- `NavBar`: navegação principal do app;
- `Input`, `Button`: componentes de interface mais simples.

#### `src/context/`
Responsável pelo estado global do app:

- `AuthContext`: autenticação, sessão e logout;
- `FavoritesContext`: catálogo de favoritos e ações de atualização.

Essa separação evita espalhar lógica de negócio pelo restante da interface.

#### `src/hooks/`
A lógica de busca e consulta de livros fica encapsulada em hooks para tornar o uso mais limpo e reutilizável.

#### `src/pages/`
Cada rota principal do app possui uma página específica:

- `Home`: busca e descarte visual das coleções;
- `Favorite`: estante e filtros de leitura;
- `Statistics`: dados literários e visão do progresso.

#### `src/services/`
Camada de integração com back-end e autenticação:

- `authService.js`: login, cadastro e autenticação social;
- `favoritosService.js`: operações com itens salvos;
- `firebase.js`: configuração do Firebase;
- `server.js`: instância de cliente HTTP centralizada.

#### `src/styles/`
Arquivos CSS e tema visual do projeto, com forte componente de identidade artesanal e editorial.

#### `src/utils/`
Funções utilitárias de sessão e persistência do usuário.

---

## Modularidade e design de código

O projeto foi pensado para ser legível e escalável, mesmo sendo um front-end visualmente rico.

### Princípios aplicados

- separação entre visual e lógica;
- componentes com foco único;
- contexto para dados globais;
- hooks para comportamento reutilizável;
- serviços isolados para integrações externas;
- configuração externa para variáveis sensíveis.

Isso reduz acoplamento e evita que o código fique concentrado em poucos arquivos gigantes.

---

## Tecnologias e ferramentas utilizadas

### Front-end

- React
- Vite
- TypeScript
- React Router DOM

### Estilização e UI

- Styled Components
- CSS customizado
- Lucide React para ícones
- Framer Motion para interatividade visual

### Integração e dados

- Axios
- Google Books API
- Open Library como fallback
- Firebase para autenticação social

### Qualidade e manutenção

- ESLint
- TypeScript compiler
- estrutura modular e organizada por pastas

---

## Estrutura visual e identidade do produto

A identidade do projeto é voltada para um público que gosta de estética pessoal, de materiais físicos e de uma experiência mais íntima.

### Características da UI/UX

- sensação de scrapbook e diário pessoal;
- elementos decorativos sobrepostos;
- combinações de cores suaves e quentes;
- composição irregular, não padronizada;
- uso de texturas, fitas, papeis e pequenas marcas visuais;
- navegação que parece parte de um caderno de leitura.

Em vez de uma interface genérica e sem personalidade, o app busca criar uma conexão emocional com o usuário, reforçando a relação entre leitura e memória.

---

## Fluxo principal de uso

1. O usuário acessa a aplicação.
2. Realiza login ou cadastro.
3. Busca livros na página inicial.
4. Salva títulos em favoritos.
5. Organiza a estante por filtros e status.
6. Acompanha a evolução literária na área de estatísticas.
7. Mantém uma biblioteca pessoal com identidade visual própria.

---

## Variáveis de ambiente

O projeto usa um arquivo `.env.example` como referência para configuração sensível. As variáveis incluem:

- URL base da API;
- URL de autenticação;
- chave da API do Google Books;
- configuração do Firebase.

Esse padrão evita expor valores sensíveis no repositório e facilita a configuração em diferentes ambientes.

---

## Como rodar o projeto

### 1. Instale as dependências

\`\`\`bash
npm install
\`\`\`

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` com base no exemplo:

\`\`\`bash
cp .env.example .env
\`\`\`

### 3. Inicie o ambiente de desenvolvimento

\`\`\`bash
npm run dev
\`\`\`

### 4. Build para produção

\`\`\`bash
npm run build
\`\`\`

### 5. Pré-visualização da build

\`\`\`bash
npm run preview
\`\`\`

---

## Observações importantes

- O projeto foi desenhado para priorizar identidade visual e experiência emocional.
- A arquitetura foi pensada para facilitar manutenção e expansão.
- Segurança e configuração foram ajustadas para evitar segredos expostos no código e reduzir risco de armazenamento inseguro de tokens.
- Como qualquer front-end com autenticação e integrações externas, é importante manter as variáveis de ambiente protegidas em produção.

---

## Conclusão

MyBooks não é apenas uma plataforma para buscar livros. É uma experiência de leitura com personalidade, associando organização, descoberta e memória pessoal em uma interface que se assemelha a um scrapbook literário.

O principal diferencial do projeto está em unir funcionalidade útil com estética marcante: um app de livros que parece uma estante de quem realmente vive a leitura, em vez de uma interface fria e padronizada.

