# deporstats

Sitio brutalista en galego sobre o Deportivo de La Coruña: do título de Liga de 2000 á beira do regreso a Primeira.

## App

```sh
npm install
npm run dev
```

## Datos

O proxecto xera tres capas:

- `data/raw/*.csv`: CSV orixinais de Football-Data para Primeira e Segunda.
- `data/processed/deportivo_1993_2026_matches.csv`: partidos do Dépor cando hai arquivo CSV reproducible.
- `data/processed/deportivo_seasons.csv`: unha fila por tempada, incluíndo anos curados en Segunda División B e Primeira RFEF.
- `public/data/depor_story.json`: payload usado polo sitio.

Reconstrución e validación:

```sh
npm run data
npm run check:data
npm run build
```

## Cobertura

- Tempadas: `1990-91` a `2025-26`.
- Partidos CSV: `1993-94` a `2019-20`, máis `2024-25` e a tempada en curso `2025-26`.
- Buraco curado: `2020-21` a `2023-24`, cando o Dépor estivo en Segunda División B e Primeira RFEF / Primeira Federación.
- Estado actual datado: `21/05/2026`, segundo con 74 puntos en 40 partidos.

## Fontes

- [Football-Data.co.uk](https://www.football-data.co.uk/spainm.php)
- [BDFutbol](https://www.bdfutbol.com/es/e/e13.html)
- [AS](https://as.com/futbol/segunda/el-depor-con-dos-balas-para-el-ascenso-y-rivales-sin-margen-de-error-f202605-n/)
- [LaLiga](https://www.laliga.com/laliga-hypermotion/clasificacion)

O nome do equipo nos CSV de Football-Data é `La Coruna`.
