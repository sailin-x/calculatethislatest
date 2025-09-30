import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AviationAccidentCalculator } from './AviationAccidentCalculator';

export function registerAviationAccidentCalculator(): void {
  calculatorRegistry.register(AviationAccidentCalculator);
}

export { AviationAccidentCalculator };
