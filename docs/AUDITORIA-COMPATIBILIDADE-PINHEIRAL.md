# Auditoria de compatibilidade: Pinheiral HTML x pacotes de assets

Data: 17/11/2026  
Base analisada: `pinheiral.html` (127.095 bytes; Canvas 2D; sprites incorporados em Base64).

## Resultado executivo

- O HTML contém **49 entradas de sprite** na tabela `M`.
- **28 entradas** tiveram correspondência pixel a pixel com imagens extraídas dos pacotes (25 arquivos-fonte distintos; algumas entradas de tiles são imagens idênticas).
- **21 entradas** não tiveram correspondência pixel a pixel nos PNGs extraídos. São principalmente árvores, casa, rochas, vegetação, lâmpadas, troncos, cogumelos e cristais.
- Os arquivos extraídos contêm **400 arquivos reais**: 205 PNG, 193 Aseprite e 2 TXT.
- O inventário automático contou 401 porque incluiu `__MACOSX/FreeEnvironment/._FreePack.png`, um arquivo auxiliar de metadados do macOS, não um asset utilizável.
- Os três ZIPs passaram na verificação de integridade. Não há ZIPs internos nos pacotes examinados.

**Nenhuma alteração foi feita em `pinheiral.html` ou na lógica do jogo.**

## 1. Recursos que já estão integrados no HTML

As correspondências abaixo foram confirmadas comparando os pixels RGBA, não apenas nome ou dimensão.

| Chave no HTML | Dimensão / animação | Arquivo-fonte confirmado |
|---|---|---|
| `pl` | 192×320; quadros 32×32; 6 | Cute Fantasy / Player / Player.png |
| `sl` | 512×192; quadros 64×64; 8 | Cute Fantasy / Enemies / Slime_Green.png |
| `chick` | 64×64; quadros 16×16; 4 | Cute Fantasy / Animals / Chicken.png |
| `cow` | 64×64; quadros 32×32; 2 | Cute Fantasy / Animals / Cow.png |
| `pig` | 64×64; quadros 32×32; 2 | Cute Fantasy / Animals / Pig.png |
| `sheep` | 64×64; quadros 32×32; 2 | Cute Fantasy / Animals / Sheep.png |
| `wz` | 128×32; quadros 32×32; 4 | Pixel Crawler / NPCs / Wizzard / Idle |
| `kn` | 128×32; quadros 32×32; 4 | Pixel Crawler / NPCs / Knight / Idle |
| `rg` | 128×32; quadros 32×32; 4 | Pixel Crawler / NPCs / Rogue / Idle |
| `pe` | 256×64; quadros 64×64; 4 | Pixel Crawler / NPCs / Peasant_A / Idle |
| `ta` | 256×64; quadros 64×64; 4 | Pixel Crawler / NPCs / Tavern_A ou Tavern_B / Idle Side (os dois arquivos são pixel-idênticos) |
| `lg` | 128×32; quadros 32×32; 4 | Pixel Crawler / Bonfire_03 |
| `fl` | 128×48; quadros 32×48; 4 | Pixel Crawler / Fire_01 |
| `sm` | 128×48; quadros 32×48; 4 | Pixel Crawler / Smoke |
| `skI` | 128×32; quadros 32×32; 4 | Pixel Crawler / Skeleton Base / Idle |
| `skR` | 384×64; quadros 64×64; 6 | Pixel Crawler / Skeleton Base / Run |
| `skD` | 768×64; quadros 64×64; 12 | Pixel Crawler / Skeleton Base / Death |
| `orI` | 128×32; quadros 32×32; 4 | Pixel Crawler / Orc / Idle |
| `orR` | 384×64; quadros 64×64; 6 | Pixel Crawler / Orc / Run |
| `orD` | 384×64; quadros 64×64; 6 | Pixel Crawler / Orc / Death |
| `chest` | 16×16; 1 | Cute Fantasy / Outdoor decoration / Chest.png |

As sete chaves de terreno `gr`, `pa`, `wa`, `st0`, `st1`, `st2` e `br0` também encontraram imagens de 16×16 pixel-idênticas no pacote Cute Fantasy. Como essas pequenas imagens são idênticas entre si, a comparação não permite atribuir cada chave a um arquivo-fonte único. O HTML usa essas chaves como cores/tiles distintos na renderização do terreno.

## 2. Sprites existentes sem correspondência exata nos ZIPs

Estas 21 chaves já estão incorporadas no HTML, mas não foram encontradas como imagem pixel-idêntica nos PNGs extraídos:

`oak`, `oaks`, `house`, `pine`, `pineS`, `pineO`, `pineT`, `dead`, `rock`, `fl1`, `fl2`, `fl3`, `stump`, `rk1`, `rk2`, `lamp`, `log`, `mush`, `cry`, `cryG`, `pot`.

**Decisão segura:** preservar esses sprites como estão. O pacote Cute Fantasy tem algumas alternativas visuais (árvores e casa), mas não são substituições equivalentes confirmadas. Não trocar automaticamente.

## 3. Recursos adicionais disponíveis para expansão

### Personagem principal
O Pixel Crawler contém 90 arquivos na pasta de animações do personagem Body_A (48 projetos Aseprite e 42 PNG). Há conjuntos de:
- Idle, Walk e Run, em direções Down, Side e Up;
- ataques Slice e Pierce;
- Hit e Death;
- Carry Idle, Carry Walk e Carry Run;
- Collect, Crush, Fishing e Watering.

Esses recursos podem permitir novas ações, mas o personagem tem aparência diferente do Teo atual. Não substituir o protagonista sem uma decisão visual explícita. A integração precisa respeitar direção, tamanho de quadro, número de quadros, velocidade e ponto de apoio.

### NPCs
41 arquivos (22 Aseprite e 19 PNG), incluindo aldeões, personagens de taverna, cavaleiro, ladino e mago. Os arquivos de caminhada de NPCs podem ampliar a vida da vila sem alterar os NPCs já existentes.

### Inimigos
48 arquivos (24 Aseprite e 24 PNG), incluindo:
- Esqueletos: base, mago, ladino e guerreiro;
- Orcs: comum, ladino, guerreiro e xamã;
- Animações de idle, corrida e morte para os conjuntos.

O HTML já usa o esqueleto base e o orc comum. As variantes podem ser adicionadas como novos tipos, com atributos próprios, sem substituir os inimigos atuais.

### Ambiente
O pacote Pixel Crawler contém 184 arquivos na pasta Environment (92 PNG e 92 Aseprite), com árvores de vários tamanhos, vegetação, rochas, recursos, móveis, construções, telhados, interiores, estações de trabalho, fornalhas, bigornas, serrarias, alquimia e fogueiras. É o maior conjunto para construir áreas novas.

O pacote FreeEnvironment contém um atlas PNG de 512×384. Antes de usar, será necessário mapear as regiões do atlas e confirmar sua licença, pois não veio acompanhado de um arquivo de termos no ZIP.

### Cute Fantasy
Além dos recursos já integrados, há ponte de madeira, cercas, decoração exterior, árvores, casa, tiles de praia, água, caminho, terreno agrícola e penhascos. O arquivo de licença limita a versão gratuita a projetos não comerciais.

## 4. Estrutura atual do jogo e impacto de uma expansão

O código atual cria três mapas dentro de `world()`:
- Vila de Pinheiral: 48×30 tiles;
- Floresta Sussurrante: 64×32 tiles;
- Masmorra de Grumbo: 40×28 tiles.

O terreno usa tiles de 16×16 pixels. O desenho de sprites passa por `dr(k,c,r,...)`, que espera metadados de quadro fixos (`fw`, `fh`, `n`) na tabela `M`. Os inimigos atuais também dependem de `EN`, `mob()`, `de()` e da lógica de colisão/IA.

As transições entre os mapas estão codificadas explicitamente para os IDs 0, 1 e 2. A música também tem uma condição especial para o mapa 2. Portanto, simplesmente acrescentar um quarto mapa ao array não basta: seria necessário definir uma saída/entrada própria e revisar as condições de transição, sem mudar os caminhos atuais.

## 5. Plano de implementação com risco mínimo

1. **Congelar a base aprovada:** manter o HTML original intacto como referência e preservar uma cópia/commit de segurança.
2. **Preparar assets novos separadamente:** exportar Aseprite para PNG mantendo os arquivos originais, documentar dimensões, quadros, direções e FPS. Não sobrescrever sprites incorporados.
3. **Criar um registro de animações aditivo:** novos nomes e metadados isolados; não mudar o comportamento de `dr()` para os sprites atuais.
4. **Adicionar conteúdo em uma área nova:** criar mapa adicional com colisões, objetos, NPCs e inimigos próprios; só depois conectar uma saída/entrada nova.
5. **Testar regressão:** iniciar jogo novo, carregar salvamento, percorrer os três mapas existentes, testar colisões, diálogos, combate, baús, transições e controles móveis antes de liberar a expansão.

## 6. Licenças observadas nos próprios pacotes

- **Cute Fantasy Free:** o `read_me.txt` permite uso e modificação apenas em projetos não comerciais e proíbe redistribuição/revenda dos assets, mesmo modificados.
- **Pixel Crawler:** `Terms.txt` permite uso em projetos comerciais e modificações, mas proíbe vender os assets como produto final ou pacote de assets. Não vender os sprites isoladamente.
- **FreeEnvironment:** o ZIP contém o atlas e metadados auxiliares, mas não foi encontrado termo de licença no pacote. Não incorporar ao produto até confirmar a licença original.

## 7. Limites desta auditoria

- A comparação pixel a pixel identifica com alta confiança os arquivos que já aparecem exatamente no HTML.
- Um recurso visualmente semelhante, mas com pixels diferentes, foi classificado como não correspondente; isso não significa que seja incompatível, apenas que não foi provado como a mesma origem.
- Os 193 arquivos Aseprite tiveram cabeçalhos válidos. Ainda será preciso exportar e conferir cada animação antes de integrar.
- Nenhum mapa novo, personagem ou asset foi adicionado ao jogo nesta etapa.

**Conclusão:** a expansão mais segura é começar com novos NPCs e variantes de inimigos do Pixel Crawler, mantendo Teo, os sprites atuais, os três mapas e toda a lógica aprovados. Em seguida, preparar uma área nova com os recursos de ambiente, sem alterar as áreas existentes.
