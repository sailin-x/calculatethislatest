import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ImpermanentLossCalculator } from './ImpermanentLossCalculator';

export function registerImpermanentLossCalculator(): void {
  calculatorRegistry.register(ImpermanentLossCalculator);
}

export { ImpermanentLossCalculator };
