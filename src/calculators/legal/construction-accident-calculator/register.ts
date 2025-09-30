import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ConstructionAccidentCalculator } from './ConstructionAccidentCalculator';

export function registerConstructionAccidentCalculator(): void {
  calculatorRegistry.register(ConstructionAccidentCalculator);
}

export { ConstructionAccidentCalculator };
