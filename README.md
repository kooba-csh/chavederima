# Chave de Rima – versão 3

App de chaves para batalha de rima, com cronômetro, repescagem e gerador de cartazes (divulgação e campeão) feito 100% em Canvas 2D.

## Como abrir
1. Descompacte a pasta.
2. Abra `index.html` no Chrome (com internet, para carregar as fontes de grafite e o compactador do banco .zip).

## Arquivos
- `index.html` – tela do app (configuração, batalha atual, chave, artes).
- `js/app.js` – chave, formatos de batalha, repescagem, cronômetro, sorteios.
- `js/dados-ia.js` – paletas, muros, letras, layouts e selos (inclui as opções do `opcoes-ia.json`).
- `js/arte-base.js` – utilitários, muros por camadas, fumaça, papel rasgado, pinceladas e o motor de letras (throw-up, wildstyle, bloco 3D, pincel, tag, cromo, neon…).
- `js/arte-desenhos.js` – desenhos: silhueta de MC, mão com microfone, microfone, lata de spray, caixa de som, toca-discos, corrente, megafone, boné, tênis, skyline da quebrada, coroa, troféu, polaroid.
- `js/arte.js` – layouts (posições em %), elementos do cartaz, chave da arte, geração da imagem, banco .zip e controles.
- `opcoes-ia.json` – o JSON original com as opções criadas com outra IA.

## Para adicionar opções novas
- Paleta: acrescente no `PALS` (arquivo `js/dados-ia.js`).
- Muro: siga o formato de "camadas" do `opcoes-ia.json` e coloque em `MUROS_CAMADAS`.
- Letra: acrescente em `LETRAS` (`js/arte-base.js`).
- Layout: acrescente em `LAYOUTS_CASA` (`js/arte.js`), com a área de cada elemento em % [x, y, largura, altura].
