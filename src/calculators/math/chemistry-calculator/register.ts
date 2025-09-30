import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ChemistryCalculator } from './ChemistryCalculator';

export function registerChemistryCalculator(): void {
  calculatorRegistry.register(ChemistryCalculator);
}

export { ChemistryCalculator };
