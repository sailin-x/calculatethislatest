import { calculatorRegistry } from '../../data/calculatorRegistry';
import { private_mortgage_insuranceCalculator } from './private_mortgage_insuranceCalculator';

export function registerprivate_mortgage_insuranceCalculator(): void {
  calculatorRegistry.register(new private_mortgage_insuranceCalculator());
}
