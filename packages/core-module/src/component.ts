import {
  Application,
  injectable,
  Component,
  config,
  ContextTags,
  CoreBindings,
  inject,
} from '@loopback/core';
import {CoreModuleComponentBindings} from './keys'
import {DEFAULT_CORE_MODULE_OPTIONS, CoreModuleComponentOptions} from './types';

// Configure the binding for CoreModuleComponent
@injectable({tags: {[ContextTags.KEY]: CoreModuleComponentBindings.COMPONENT}})
export class CoreModuleComponent implements Component {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    private application: Application,
    @config()
    private options: CoreModuleComponentOptions = DEFAULT_CORE_MODULE_OPTIONS,
  ) {}
}
