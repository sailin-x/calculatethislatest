import { calculatorRegistry } from '../../data/calculatorRegistry';
import { AlimonySpousalSupportCalculator } from './AlimonySpousalSupportCalculator';

export function registerAlimonySpousalSupportCalculator(): void {
  calculatorRegistry.register(new AlimonySpousalSupportCalculator());
}
