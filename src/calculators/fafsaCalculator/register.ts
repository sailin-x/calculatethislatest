import { calculatorRegistry } from '../../data/calculatorRegistry';
import { fafsaCalculator } from './fafsaCalculator';

export function registerfafsaCalculator(): void {
  calculatorRegistry.register(new fafsaCalculator());
}
