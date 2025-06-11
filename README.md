# Agenda de Contatos

Um aplicativo web moderno para gerenciamento de contatos desenvolvido com Angular 17.

## 🚀 Tecnologias Utilizadas

- Angular 17
- TypeScript
- SCSS
- Angular Material
- NgxMask
- SweetAlert2
- Jest (Testes unitários)

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- NPM (Node Package Manager)
- Angular CLI

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Navegue até a pasta do projeto:
```bash
cd test
```

3. Instale as dependências:
```bash
npm install
```

## 🧪 Testes

O projeto utiliza Jest para testes unitários. Os testes cobrem os principais componentes e funcionalidades:

- Testes de formulário e validações
- Testes de navegação
- Testes de integração com serviços
- Testes de manipulação de contatos
- Testes de confirmações e modais

Para executar os testes:

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

Os arquivos de teste estão localizados junto aos seus componentes com a extensão `.spec.ts`.

## 💻 Executando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
ng serve
```

Acesse o aplicativo em `http://localhost:4200`

## 🛠️ Funcionalidades

- Listagem de contatos
- Adição de novos contatos
- Remoção de contatos
- Máscara para número de telefone
- Interface responsiva
- Validação de formulários
- Confirmações via modal

## 📱 Layout

- Design moderno e intuitivo
- Totalmente responsivo
- Temas claros e escuros
- Feedback visual para ações do usuário

## 🔗 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── contacts-list/
│   │   └── new-contact/
│   ├── shared/
│   │   ├── components/
│   │   ├── services/
│   │   └── models/
│   └── app.component.ts
└── styles.scss
```

## 👥 Autor

Desenvolvido como projeto de demonstração de habilidades em Angular e TypeScript.