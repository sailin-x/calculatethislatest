import { calculatorRegistry } from '../../data/calculatorRegistry';
import { private_mortgage_insuranceCalculatorCalculator } from './private_mortgage_insuranceCalculatorCalculator';

export function registerprivate_mortgage_insuranceCalculatorCalculator(): void {
  calculatorRegistry.register(new private_mortgage_insuranceCalculatorCalculator());
}
