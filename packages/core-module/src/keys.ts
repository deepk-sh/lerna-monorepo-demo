import {BindingKey, CoreBindings} from '@loopback/core';
import {CoreModuleComponent} from './component';

/**
 * Binding keys used by this component.
 */
export namespace CoreModuleComponentBindings {
  export const COMPONENT = BindingKey.create<CoreModuleComponent>(
    `${CoreBindings.COMPONENTS}.CoreModuleComponent`,
  );
}
