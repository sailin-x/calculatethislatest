import { calculatorRegistry } from '../../data/calculatorRegistry';
import { netUnrealizedAppreciationNUATaxCalculatorCalculator } from './netUnrealizedAppreciationNUATaxCalculatorCalculator';

export function registernetUnrealizedAppreciationNUATaxCalculatorCalculator(): void {
  calculatorRegistry.register(new netUnrealizedAppreciationNUATaxCalculatorCalculator());
}
