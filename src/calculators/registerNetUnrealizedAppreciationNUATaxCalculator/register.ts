import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerNetUnrealizedAppreciationNUATaxCalculator } from './registerNetUnrealizedAppreciationNUATaxCalculator';

export function registerregisterNetUnrealizedAppreciationNUATaxCalculator(): void {
  calculatorRegistry.register(new registerNetUnrealizedAppreciationNUATaxCalculator());
}
