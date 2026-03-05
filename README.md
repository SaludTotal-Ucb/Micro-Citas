# Micro-Citas Backend

Backend Node.js/Express para Micro-Citas.

## Toolchain de calidad de código

Este repositorio usa **Biome** como herramienta unificada de:
- Formateo de código
- Linting (análisis estático)

Además, integra **Husky + lint-staged** para validar cambios antes de cada commit.

## Requisitos

- Node.js 18+
- npm 9+

## Instalación

```bash
npm install
```

> Al instalar dependencias, se ejecuta automáticamente `prepare` para activar Husky.

## Scripts disponibles

- `npm run check`: ejecuta lint + validaciones de Biome
- `npm run lint`: alias de `check`
- `npm run lint:fix`: corrige automáticamente lo que Biome pueda arreglar
- `npm run format`: aplica formateo en el proyecto

## Reglas de formateo/lint

Configuradas en `biome.json`:
- Punto y coma obligatorio (`semicolons: always`)
- Comillas simples (`quoteStyle: single`)
- Indentación de 2 espacios (`indentWidth: 2`)
- Variables no usadas en error (`noUnusedVariables: error`)

## Pre-commit automático

Antes de cada commit, Husky ejecuta:

```bash
npx lint-staged
```

`lint-staged` corre Biome sobre archivos staged (`*.js`, `*.ts`, `*.json`, etc.).
Si hay errores de formato o lint, el commit se bloquea.

## Flujo recomendado

1. Realiza tus cambios.
2. Ejecuta:

```bash
npm run format
npm run check
```

3. Haz `git add .` y luego `git commit`.

Si falla el commit, corrige los errores reportados por Biome y vuelve a intentar.
