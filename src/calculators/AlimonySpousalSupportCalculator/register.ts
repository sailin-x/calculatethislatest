import { calculatorRegistry } from '../../data/calculatorRegistry';
import { AlimonySpousalSupportCalculatorCalculator } from './AlimonySpousalSupportCalculatorCalculator';

export function registerAlimonySpousalSupportCalculatorCalculator(): void {
  calculatorRegistry.register(new AlimonySpousalSupportCalculatorCalculator());
}
