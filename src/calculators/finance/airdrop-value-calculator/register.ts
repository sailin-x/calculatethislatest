import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AirdropValueCalculator } from './AirdropValueCalculator';

export function registerAirdropValueCalculator(): void {
  calculatorRegistry.register(AirdropValueCalculator);
}

export { AirdropValueCalculator };
