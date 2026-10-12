# AGENTS.md

## Projeto

Stepp é um app mobile de hábitos, minimalista, local-first e offline-first. Priorize simplicidade, consistência e qualidade visual.

## Documentação

Consulte as fontes de verdade antes de alterar comportamento:

1. `docs/PRD.md`: regras do produto.
2. `docs/UX_SPEC.md`: interação e experiência.
3. `docs/TECHNICAL_SPEC.md`: arquitetura e implementação.
4. Código existente.

Não ajuste regras documentadas silenciosamente para acomodar o código. Explicite divergências e resolva decisões de produto com o usuário. Instruções explícitas do usuário têm precedência.

## Regras do produto

- Criar um hábito exige somente nome, obrigatório após trim e limitado a 80 caracteres.
- O histórico de conclusões é a fonte de verdade para todas as métricas.
- Cada hábito aceita no máximo uma conclusão por data local.
- A Home exibe exatamente hoje e os cinco dias anteriores, em ordem cronológica.
- Dias passados são editáveis, inclusive anteriores ao cadastro do hábito.
- Datas futuras são bloqueadas na interface e no domínio.
- O calendário permite consultar anos anteriores e todos os meses até dezembro do ano atual.
- O dia atual incompleto não quebra a sequência se ontem foi concluído.
- Se hoje e ontem estão incompletos, a sequência atual é zero.
- Melhor sequência é a maior sequência consecutiva no histórico completo; edições retroativas podem aumentá-la ou reduzi-la.
- Marcar ou desmarcar deve atualizar imediatamente estado visual, total, sequência e recorde. Falha de persistência reverte a alteração com feedback discreto.
- Renomear preserva histórico e métricas. Excluir exige confirmação e remove as conclusões relacionadas.

## Arquitetura

Use React Native, Expo, TypeScript estrito, Expo Router e SQLite.

Mantenha separadas as responsabilidades de UI, aplicação, domínio e dados:

- UI renderiza, navega e apresenta feedback; não executa SQL nem calcula sequências.
- Hooks coordenam as interações e o estado; prefira estado local e derivado.
- Domínio contém regras e funções puras, sem dependência de React Native ou SQLite.
- Repositories específicos de hábitos encapsulam consultas e persistência.

Centralize datas em `src/shared/date`. Conclusões usam `YYYY-MM-DD` no calendário local, nunca timestamps UTC como identidade do dia.

Mantenha `UNIQUE(habit_id, date)`, foreign keys e exclusão em cascata. Use migrações para mudanças de esquema. Não duplique cálculo de métricas.

## Interface

- Use tokens semânticos de cor, espaçamento, tipografia e dimensões.
- Preserve Inter, cards brancos, fundo cinza claro e hierarquia simples.
- Use animações curtas para comunicar mudanças, sem atrasar interações.
- Haptics são opcionais e não podem impedir funcionalidades.
- Controles devem ter rótulos acessíveis, área de toque adequada e estados reconhecíveis sem depender apenas da cor.
- Preserve ampliação de texto e layouts adaptáveis.

## Escopo e dependências

Implemente somente a alteração solicitada. Reutilize componentes e mantenha o código pequeno e explícito.

Não adicione backend, autenticação, sincronização, Redux, gamificação, recursos sociais, IA, frequência configurável ou análises avançadas sem solicitação explícita.

Evite repositórios genéricos, frameworks de injeção, abstrações especulativas e bibliotecas para utilidades triviais. Antes de instalar uma dependência, confira as existentes, as APIs da plataforma e a compatibilidade com o SDK Expo do projeto.

Evite `any`, supressões de TypeScript e mudanças sem relação com o pedido.

## Validação

```sh
npm run typecheck
npm run lint
npm test
```

Execute os testes pertinentes à alteração e revise os avisos. Mudanças de domínio exigem testes: histórico vazio, hoje, ontem, sequência interrompida, recorde, edições retroativas, mudança de mês/ano, ano bissexto, entrada desordenada e duplicatas defensivas.

Teste persistência e fluxos de interface quando aplicável. Para alterações somente de documentação, confira formatação, links e consistência com o código.
