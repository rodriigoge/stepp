# Stepp

Um app de hábitos para acompanhar sua consistência, um dia de cada vez.

O Stepp combina uma interface minimalista com um histórico fácil de editar. Crie um hábito apenas com o nome, registre suas conclusões e acompanhe a sequência atual, o total acumulado e seu recorde. Os dados ficam no dispositivo e o app funciona offline.

## Demonstração

[Assista ao vídeo do Stepp](docs/media/stepp-video-app.mp4)

## Funcionalidades

- **Registro em um toque:** marque ou desmarque uma conclusão diretamente na Home.
- **Últimos seis dias:** visualize os cinco dias anteriores e o dia atual em cada hábito.
- **Histórico completo:** navegue pelo calendário e corrija registros de dias passados, inclusive anteriores ao cadastro do hábito.
- **Progresso sempre visível:** acompanhe dias seguidos, total de conclusões e melhor sequência.
- **Gerenciamento simples:** edite o nome ou exclua um hábito com confirmação.
- **Feedback imediato:** as marcações e métricas são atualizadas na hora, com animações discretas e feedback tátil quando disponível.

A interface usa a fonte Inter, cards brancos e uma paleta discreta, com foco em legibilidade e clareza.

## Como funciona

1. Toque no botão **+** e informe o nome do hábito.
2. Toque no indicador de um dia para marcar ou desmarcar sua conclusão.
3. Abra o card para consultar as métricas e editar o histórico no calendário.
4. Use o menu dos três pontos para editar ou excluir o hábito.

Cada hábito aceita uma conclusão por dia. Datas futuras não podem ser marcadas. A sequência atual permanece ativa enquanto o dia de hoje ainda está em andamento, desde que ontem tenha sido concluído. Qualquer alteração no histórico recalcula o total, a sequência atual e o recorde.

## Dados locais

Hábitos e conclusões são armazenados em SQLite no dispositivo. Não é necessário criar uma conta nem ter conexão com a internet para usar o app. A fonte também é incluída no aplicativo.

Os dados não são sincronizados entre dispositivos. Excluir um hábito remove seu histórico de conclusões.

## Tecnologias

| Área         | Tecnologia                          |
| ------------ | ----------------------------------- |
| Aplicativo   | React Native e Expo SDK 57          |
| Linguagem    | TypeScript                          |
| Navegação    | Expo Router                         |
| Persistência | SQLite com expo-sqlite              |
| Tipografia   | Inter com expo-font                 |
| Testes       | Jest e React Native Testing Library |

## Executar localmente

### Requisitos

- Node.js 24.15 ou superior na linha 24 e npm.
- Expo Go compatível com o SDK 57 em um dispositivo físico, ou um emulador Android configurado.
- Para o simulador iOS: macOS e Xcode.

### Instalação

Na pasta do projeto, instale as dependências e inicie o servidor de desenvolvimento:

```sh
npm ci
npm start
```

Abra o projeto no Expo Go pelo QR code exibido no terminal. Para uma conexão local, o celular e o computador devem estar na mesma rede.

Para abrir em um emulador Android:

```sh
npm run android
```

Para abrir no simulador iOS, no macOS:

```sh
npm run ios
```

Se alterações não aparecerem, reinicie o servidor com o cache limpo e recarregue o app:

```sh
npx expo start --clear
```

## Comandos de desenvolvimento

| Comando                | Descrição                    |
| ---------------------- | ---------------------------- |
| `npm start`            | Inicia o servidor Expo       |
| `npm run android`      | Abre o app no Android        |
| `npm run ios`          | Abre o app no simulador iOS  |
| `npm run typecheck`    | Verifica os tipos TypeScript |
| `npm run lint`         | Verifica o código com ESLint |
| `npm test`             | Executa os testes            |
| `npm run format:check` | Verifica a formatação        |
| `npm run format`       | Aplica a formatação          |

Os testes cobrem cálculo de sequências, datas, persistência SQLite e interações das telas. Os testes de persistência usam o SQLite nativo do Node.js.

## Organização do código

```text
app/                         Rotas e layout do aplicativo
src/
  database/                  Conexão SQLite e migrações
  design-system/             Tokens visuais e componentes compartilhados
  features/habits/
    components/              Home, calendário, formulários e modais
    domain/                  Regras de conclusão e cálculo de métricas
    hooks/                   Estado e coordenação das interações
    repository/              Acesso aos hábitos e ao histórico
  shared/date/               Operações com datas locais
__tests__/                   Testes automatizados
```

As métricas são derivadas do histórico de conclusões. Cada conclusão usa uma data de calendário local no formato `YYYY-MM-DD`, e o banco impede registros duplicados para o mesmo hábito e dia.
