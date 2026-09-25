# Brand Experience 2026 — pacote para GitHub Pages

Este pacote contém o site do evento preparado para publicação no **GitHub Pages**. As imagens dos palestrantes e do painel visual estão em `client/public/images`, portanto não dependem mais de `manus-storage`.

## 1. Imagens que já acompanham o pacote

| Arquivo | Uso |
|---|---|
| `client/public/images/albanir.jpg` | Foto do card de Albanir Américo |
| `client/public/images/alexandre.jpg` | Foto do card de Alexandre Magno |
| `client/public/images/natalia.jpg` | Foto do card de Natália Lima |
| `client/public/images/painel-aplicacoes.png` | Imagem da seção “Além do palco” |

## 2. Como trocar as imagens

Substitua os arquivos mantendo exatamente estes nomes:

```text
client/public/images/albanir.jpg
client/public/images/alexandre.jpg
client/public/images/natalia.jpg
client/public/images/painel-aplicacoes.png
```

Se preferir usar outros nomes ou formatos, altere os caminhos em:

```text
client/src/pages/Home.tsx
```

Procure por `defaultAssets` e pelos campos `image` dentro da constante `speakers`.

### Logomarca

O projeto atual desenha a marca com CSS quando não existe um arquivo de logomarca. Para usar a logomarca oficial, adicione, por exemplo:

```text
client/public/images/logo-claro.png
client/public/images/logo-escuro.png
```

Depois, em `client/src/pages/Home.tsx`, ajuste o objeto `defaultAssets`:

```tsx
const defaultAssets: MediaAssets = {
  logo: "/images/logo-claro.png",
  albanir: "/images/albanir.jpg",
  alexandre: "/images/alexandre.jpg",
  natalia: "/images/natalia.jpg",
  board: "/images/painel-aplicacoes.png",
};
```

O valor de `logo` será aplicado ao componente de marca usado no topo e no rodapé. Se a versão clara e escura precisarem ser diferentes, use duas propriedades no componente `BrandMark` ou substitua manualmente as chamadas do componente no mesmo arquivo.

## 3. Publicar no GitHub

1. Crie um repositório no GitHub, por exemplo `brand-experience-2026`.
2. Envie todos os arquivos deste pacote para a raiz do repositório.
3. Faça commit na branch `main` ou `master`.
4. O arquivo `.github/workflows/deploy-pages.yml` compilará e publicará o site automaticamente.
5. No GitHub, abra **Settings → Pages** e selecione **GitHub Actions** como fonte, se o GitHub solicitar essa configuração.
6. O endereço normalmente será:

```text
https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO/
```

O workflow já configura automaticamente o caminho-base usando o nome do repositório.

## 4. Executar localmente

Requisitos: Node.js 20+ e pnpm 10+.

```bash
pnpm install
pnpm exec vite --host
```

Abra o endereço exibido pelo Vite. Para gerar a versão de produção:

```bash
BASE_PATH=/brand-experience-2026/ pnpm exec vite build
```

A versão final ficará em `dist/public`.

## 5. Estrutura principal

```text
client/src/pages/Home.tsx       Página completa do evento
client/src/index.css            Sistema visual e responsividade
client/src/App.tsx              Entrada do aplicativo
client/index.html               Metadados da página
client/public/images/           Imagens editáveis do site
.github/workflows/              Publicação automática no GitHub Pages
vite.config.ts                  Configuração do build e caminho-base
```

## 6. Observação sobre edição de imagens

O editor visual que existia na versão Manus salva arquivos no navegador via `localStorage`. Ele não altera os arquivos do GitHub. Para trocar a imagem de forma permanente para todos os visitantes, substitua os arquivos dentro de `public/images` e faça um novo commit. O GitHub Actions publicará a nova versão automaticamente.

Caminhos `file:///C:/Users/...` não devem ser usados no código publicado: eles apontam somente para o computador local e quebram quando o site é aberto por outras pessoas.
