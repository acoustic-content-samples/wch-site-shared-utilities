# wch-site-shared-utilities
This npm module contains a set of shared utilities leveraged in the Watson Content Hub starter site applications. See https://github.com/ibm-wch/wch-site-application for more information on the Watson Content Hub starter application.

## Prerequisites

* A WCH tenant in Trial or Standard Tier
* A WCH site application repo (e.g. https://github.com/ibm-wch/wch-site-application)
* Node.js v6.11.1 or above
* Angular >=6.0.0
* **Note:**: We recommend to run `npm install` after getting the latest from this repository to get the latest prerequisites. 

## Overview
This github repository contains all shared Angular utility components that can be imported via npm commands to all WCH site application based project, such as Oslo and Stockholm. Following Angular utility components are included in this package:

* AuthService
* ConfigServiceService
* DateFilterPipe
* FormattedTextPipe
* HighlightService
* ItemSortPipe
* UtilsService

## Packages
[`@ibm-wch/components-ng-shared-utilities`](https://www.npmjs.com/package/@ibm-wch/components-ng-shared-utilities)
* **Note:** This package follows [`Angular Package Format (APF) v6.0`](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs) to support all of the commonly used development tools and workflow


## Usage

In WCH site application based project call:

```bash
ng add @ibm-wch/components-ng-shared-utilities
```



## Unit test

If you want to run all unit tests in this repo:
* Run `npm test`

If you want to run unit tests separately:
* Run `npm run test:schematics` to run unit tests for the installing scripts
* Run `npm run test:src` to run unit tests for Angular components

## Publishing

This package showcases how one can componentize code leveraged inside the applications in Watson Content Hub. If creating your own package you can publish to npm via:

```bash
npm version <npm package version>
npm run build
npm publish dist
```

## Getting Started With Schematics

This repository is a basic Schematic implementation that serves as a starting point to create and publish Schematics to NPM.

To test the function of Schematics locally, install `@angular-devkit/schematics` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with
```bash
schematics --help
```



## License

See the included license file [License](LICENSE) .
