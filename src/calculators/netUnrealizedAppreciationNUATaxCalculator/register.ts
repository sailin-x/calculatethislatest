import { calculatorRegistry } from '../../data/calculatorRegistry';
import { netUnrealizedAppreciationNUATaxCalculator } from './netUnrealizedAppreciationNUATaxCalculator';

export function registernetUnrealizedAppreciationNUATaxCalculator(): void {
  calculatorRegistry.register(new netUnrealizedAppreciationNUATaxCalculator());
}
