import { calculatorRegistry } from '../../data/calculatorRegistry';
import { home_insuranceCalculator } from './home_insuranceCalculator';

export function registerhome_insuranceCalculator(): void {
  calculatorRegistry.register(new home_insuranceCalculator());
}
