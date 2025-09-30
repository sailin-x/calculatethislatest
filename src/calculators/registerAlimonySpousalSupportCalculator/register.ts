import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerAlimonySpousalSupportCalculatorCalculator } from './registerAlimonySpousalSupportCalculatorCalculator';

export function registerregisterAlimonySpousalSupportCalculatorCalculator(): void {
  calculatorRegistry.register(new registerAlimonySpousalSupportCalculatorCalculator());
}
