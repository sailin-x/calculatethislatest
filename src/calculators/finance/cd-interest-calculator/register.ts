import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CdInterestCalculator } from './CdInterestCalculator';

export function registerCdInterestCalculator(): void {
  calculatorRegistry.register(CdInterestCalculator);
}

export { CdInterestCalculator };
