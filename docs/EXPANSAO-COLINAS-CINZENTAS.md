# Expansão de Crônicas de Pinheiral — Colinas Cinzentas

Status: conteúdo de expansão preparado; ainda não integrado ao runtime.
Base protegida: `pinheiral.html` permanece sem alterações.

## Objetivo

Continuar a história depois da decisão final sobre o Cristal da Aurora, ampliar o mundo com uma quarta região explorável e adicionar missões principais e secundárias. A expansão deve aproveitar os recursos já auditados do Pixel Crawler, sem trocar o Teo nem os três mapas existentes.

## Região nova: Colinas Cinzentas

- Dimensão proposta: 56 × 36 tiles de 16 × 16 px.
- Tema: vale seco, estrada de pedra, ruínas de aqueduto, pedreira abandonada, acampamento orc e observatório antigo.
- Paleta: terra ocre, pedra cinza, vegetação seca e pequenos pontos de verde perto de água subterrânea.
- Percurso principal: entrada sul → aldeia do vale → aqueduto partido → pedreira → observatório.
- Atalhos: trilha lateral entre aldeia e pedreira; passagem subterrânea curta entre pedreira e observatório, liberada por missão.
- Retorno: portal/saída sul dedicada que retorna à Vila de Pinheiral no ponto de entrada. Não reaproveitar nem alterar as saídas atuais da Floresta ou da Masmorra.

### Distribuição espacial proposta

| Setor | Área aproximada | Conteúdo |
|---|---:|---|
| Entrada da Estrada Seca | x 24–18, y 32–27 | Placa, carroça quebrada, primeiro encontro |
| Aldeia do Vale | x 8–25, y 18–27 | 4 casas, poço seco, NPCs, fogueira |
| Aqueduto Partido | x 27–43, y 18–27 | Canal seco, pontes quebradas, passagem bloqueada |
| Pedreira Velha | x 34–51, y 7–19 | Rochas, depósitos, orcs e entrada subterrânea |
| Observatório | x 8–24, y 5–15 | Torre em ruínas, puzzle de luz e conclusão do arco |

Coordenadas são células do mapa novo, não coordenadas do HTML atual. A geometria final deve ser conferida visualmente e contra colisões antes de entrar no jogo.

## Assets que a auditoria já confirmou

Usar primeiro o pacote Pixel Crawler:
- Ambiente: árvores, vegetação, rochas, estruturas, telhados, móveis, fornalha, bigorna, serraria e fogueiras.
- NPCs: Peasant, Knight, Rogue e Wizzard, incluindo animações idle/run/death já mapeadas no piloto.
- Inimigos: Skeleton Base e Orc, com idle/run/death confirmados; variantes de Skeleton e Orc disponíveis no pacote, mas precisam de exportação e inspeção individual.

Não usar FreeEnvironment até confirmar a licença. Cute Fantasy Free é restrito a projetos não comerciais. Não substituir sprites incorporados do HTML por alternativas apenas parecidas.

## Continuidade narrativa

A expansão começa após o final atual. O roubo do Cristal e a história de Grumbo deixam de ser o fim da aventura: tornam-se a descoberta de um conflito maior.

A escolha atual continua valendo:
- **Dividir a luz:** as Colinas recebem chuva e a comunidade orc aceita negociar. A região começa com mais NPCs disponíveis e menos hostilidade.
- **Guardar a luz:** Pinheiral prospera, mas as Colinas seguem secas. A região começa com postos de guarda tensos e mais encontros hostis. Ainda é possível conquistar uma solução pacífica por missões.

Nenhuma escolha deve bloquear o conteúdo inteiro.

## Arco principal: A Água que a Pedra Esconde

1. **A estrada sem água** — uma mensageira do vale chega a Pinheiral pedindo ajuda. Teo encontra a estrada e conhece a aldeia.
2. **O poço vazio** — investigar o poço e recuperar três peças de uma bomba antiga na estrada, na aldeia e na pedreira.
3. **O aqueduto partido** — localizar duas comportas e descobrir que a água foi desviada para uma câmara subterrânea.
4. **A pedreira dos exilados** — enfrentar ou negociar com o grupo que guarda a passagem. Um diário revela que a seca foi agravada por uma máquina antiga, não causada apenas pelo Cristal.
5. **As lentes do observatório** — recuperar três lentes e alinhar a luz no observatório para revelar o mapa da nascente.
6. **A nascente de pedra** — descer à câmara, derrotar o Guardião de Basalto e decidir como distribuir a água.
7. **Um pacto para o vale** — conclusão variável conforme a escolha do Cristal e as alianças feitas durante as missões secundárias.

## Missões secundárias

- **A última semente:** encontrar 4 sementes resistentes na região e entregá-las à agricultora. Recompensa: moedas, XP e canteiro restaurado.
- **Ferramentas perdidas:** recuperar 3 ferramentas da pedreira. Recompensa: desconto do ferreiro e acesso à passagem subterrânea.
- **O vigia desaparecido:** seguir rastros entre o aqueduto e as ruínas; resgatar um guarda preso. Recompensa: atalho seguro.
- **Ecos na torre:** encontrar 3 páginas do astrônomo no observatório. Recompensa: lore sobre o Cristal e XP.
- **Uma mesa para todos:** entregar ingredientes à cozinheira e convidar dois NPCs de facções diferentes. Recompensa: refeição de cura e mudança de diálogo na aldeia.
- **O desafio do escudeiro:** duelo opcional contra um cavaleiro. Recompensa: item defensivo, sem obrigar o jogador a vencer para seguir a campanha.

## Personagens novos

- **Lina, mensageira:** inicia o arco principal e acompanha a evolução da região.
- **Dário, guardião do poço:** conhece a história da bomba e das comportas.
- **Mira, agricultora:** oferece a missão das sementes.
- **Bram, ferreiro da pedreira:** oferece ferramentas perdidas e explica a passagem subterrânea.
- **Narek, chefe dos exilados:** antagonista negociável, não um vilão automático.
- **Astrônoma Íria:** deixou os registros no observatório.
- **Vigia Cael:** personagem resgatável.

## Regras técnicas obrigatórias antes da integração

1. Fazer cópia/commit de segurança e registrar o SHA atual do HTML.
2. Adicionar o mapa como ID 3 sem renumerar IDs 0, 1 e 2.
3. Criar entradas e saídas explícitas, com coordenadas de spawn livres e validação de colisão.
4. Acrescentar estado de missão com valores padrão, preservando salvamentos antigos. Não reutilizar `S.m`, `S.b`, `S.q`, `S.z`, `S.br` ou IDs `S.o` existentes para objetivos novos.
5. Dar prefixos exclusivos a todos os IDs de baús, páginas, ferramentas, sementes e eventos da região.
6. Não mudar `dr()`, a tabela `M`, a física, o combate, a IA atual, o sistema de salvamento nem os diálogos antigos.
7. Carregar assets novos por caminho aditivo; conferir dimensões, quadros e transparência.
8. Testar: jogo novo, save antigo, ida e volta dos três mapas atuais, final original nas duas escolhas, entrada/saída da região nova, colisões, NPCs, missões, combate e tela Android.
9. Só declarar a expansão jogável depois de executar esses testes no navegador.

## Critério de conclusão

A expansão só está pronta quando a quarta região for acessível dentro do jogo, tiver caminho de ida e volta, missões que atualizam e persistem corretamente, diálogos em PT-BR e não quebrar nenhum dos três mapas existentes.
