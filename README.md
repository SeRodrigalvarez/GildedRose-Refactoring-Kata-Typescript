# Gilded Rose

This is the Gilded Rose kata in TypeScript.

## Refactor branches

Initial messy code: [main](/../../tree/main)

Semantic refactor: [01-semantic-refactor](/../../tree/01-semantic-refactor)

SOLIDification: [02-solidification-with-item-class-modification](/../../tree/02-solidification-with-item-class-modification)

## Getting started

Install dependencies

```sh
npm install
```

## Running app
_You may need to install `ts-node`_

```sh
npx ts-node test/golden-master-text-test.ts
```

Or with number of days as args:
```sh
npx ts-node test/golden-master-text-test.ts 10
```

## Running tests

To run all tests

### Jest way

```sh
npm run test:jest
```

To run all tests in watch mode

```sh
npm run test:jest:watch
```

### Mocha way

```sh
npm run test:mocha
```
