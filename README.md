# 🧙‍♂️ Dank Dungeon — Frontend (Angular 20 + PrimeNG)

Este repositório contém o **frontend completo do projeto Dank Dungeon**, uma plataforma de RPG baseada em texto e combate interativo, integrada a um backend em FastAPI.  
Aqui está implementada toda a interface web do jogador — desde o login até a criação de personagens e campanhas.

---

## 🚀 Funcionalidades Principais

### 🔐 Autenticação e Sessão

- **Login e Registro** de usuários com formulários reativos e validações completas.
- **Persistência de token JWT** no `localStorage` com `AuthInterceptor` para autenticação automática.
- **Proteção de rotas** através do `authGuard` (impede acesso não autenticado).
- **Estado reativo de login** utilizando `Angular signals` e `computed()`.

### 🧙‍♀️ Gerenciamento de Personagens

- Criação e visualização de personagens com atributos como:
  - Raça, classe, nível, vida e descrição.
- Exibição de **lista de personagens** com design temático de pergaminho.
- Opções para **iniciar novas campanhas** ou **entrar em campanhas ativas**.
- **Barras de vida dinâmicas** e exibição de status detalhado.

### ⚔️ Campanhas e Jogo

- Cada personagem pode ingressar em campanhas e continuar sua jornada.
- **Histórico de campanhas anteriores** acessível ao jogador.
- **Integração com o backend** para salvar e recuperar dados do jogo em tempo real.

### 👤 Perfil e Dados do Usuário

- Página de **perfil do jogador** com dados obtidos via `DataService`.
- Atualização automática das informações após login/logout.

### 🏠 Outras Seções

- **Página inicial** temática com ambientação de fantasia.
- **Histórico de campanhas** e **modo de jogo (play)** integrados.
- **Cabeçalho dinâmico** com itens diferentes para usuários logados e visitantes.

## 🧩 Estrutura do Projeto

```
src/app/
│
├── core/
│ ├── auth/ # Autenticação e segurança
│ │ ├── login/ # Página de login
│ │ ├── register/ # Página de registro
│ │ ├── services/ # AuthService + JWT handling
│ │ ├── auth.guard.ts # Proteção de rotas
│ │ └── auth-interceptor.ts # Interceptor HTTP para JWT
│ │
│ └── layout/
│ └── header/ # Navbar dinâmica (Menubar PrimeNG)
│
├── features/
│ ├── characters/ # Lista e detalhes de personagens
│ ├── components/ # Componentes reutilizáveis (criação, cards, etc.)
│ ├── history/ # Histórico de campanhas
│ ├── play/ # Tela principal de jogo
│ ├── profile/ # Perfil do jogador
│ └── services/ # DataService para comunicação com backend
│
├── app.config.ts # Configuração principal do app
├── app.routes.ts # Definição de rotas Angular
├── app.html / app.css # Estrutura base da aplicação
└── main.ts # Ponto de entrada
```

## 🛠️ Tecnologias Utilizadas

### 🌐 Framework & Linguagem

- **Angular 20** — Framework principal do frontend.
- **TypeScript** — Tipagem estática e modularidade.

### 🎨 UI e Estilo

- **PrimeNG** — Biblioteca de componentes UI (cards, buttons, toasts, menubar, etc).
- **TailwindCSS** — Estilização responsiva e utilitária.
- **Custom CSS** — Aparência inspirada em pergaminhos e fantasia medieval.
- **Animações suaves** em SVG e efeitos de hover.

### 🧠 Estado e Reatividade

- **Signals e computed()** — Gerenciamento de estado moderno do Angular.
- **ChangeDetectionStrategy.OnPush** — Otimização de performance de renderização.

### 🔗 Comunicação com Backend

- **HttpClient** — Integração com o backend FastAPI.
- **Interceptors** — Inclusão automática do token JWT.
- **Observables (RxJS)** — Requisições assíncronas e reativas.
