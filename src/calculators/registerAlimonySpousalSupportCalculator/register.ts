import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerAlimonySpousalSupportCalculator } from './registerAlimonySpousalSupportCalculator';

export function registerregisterAlimonySpousalSupportCalculator(): void {
  calculatorRegistry.register(new registerAlimonySpousalSupportCalculator());
}
