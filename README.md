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

**lint-staged ejecuta `biome check --write`** sobre archivos staged, que:
- ✅ Arregla automáticamente formato (comillas, semicolons, indentación)
- ✅ Detecta errores de lógica (variables no usadas) pero los bloquea (requieren corrección manual)

## Flujo recomendado (simplificado)

1. Haz tus cambios como prefieras
2. Haz `git add .` y `git commit -m "mensaje"`
3. **Husky ejecuta Biome automáticamente:**
   - Si hay errores de formato → Biome los arregla automáticamente ✅
   - Si hay errores de lógica → Se bloquea el commit (tú debes arreglarlo)

**Si el commit falla por errores de lógica:**

```bash
# Corrige manualmente los errores reportados
# (ej: variables no usadas)
git add .
git commit -m "fix: corregir errores de lógica"
```
