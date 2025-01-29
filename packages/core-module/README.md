# core-module

[![LoopBack](https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

## Installation

Install CoreModuleComponent using `npm`;

```sh
$ [npm install | yarn add] core-module
```

## Basic Use

Configure and load CoreModuleComponent in the application constructor
as shown below.

```ts
import {CoreModuleComponent, CoreModuleComponentOptions, DEFAULT_CORE_MODULE_OPTIONS} from 'core-module';
// ...
export class MyApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
  constructor(options: ApplicationConfig = {}) {
    const opts: CoreModuleComponentOptions = DEFAULT_CORE_MODULE_OPTIONS;
    this.configure(CoreModuleComponentBindings.COMPONENT).to(opts);
      // Put the configuration options here
    });
    this.component(CoreModuleComponent);
    // ...
  }
  // ...
}
```
