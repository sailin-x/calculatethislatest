import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { NetUnrealizedAppreciationNuaTaxCalculator } from './NetUnrealizedAppreciationNuaTaxCalculator';

export function registerNetUnrealizedAppreciationNuaTaxCalculator(): void {
  calculatorRegistry.register(NetUnrealizedAppreciationNuaTaxCalculator);
}

export { NetUnrealizedAppreciationNuaTaxCalculator };
