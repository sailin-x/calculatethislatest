import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerNetUnrealizedAppreciationNUATaxCalculatorCalculator } from './registerNetUnrealizedAppreciationNUATaxCalculatorCalculator';

export function registerregisterNetUnrealizedAppreciationNUATaxCalculatorCalculator(): void {
  calculatorRegistry.register(new registerNetUnrealizedAppreciationNUATaxCalculatorCalculator());
}
