import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PatentFilingCalculator } from './PatentFilingCalculator';

export function registerPatentFilingCalculator(): void {
  calculatorRegistry.register(PatentFilingCalculator);
}

export { PatentFilingCalculator };
