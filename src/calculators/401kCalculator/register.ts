import { calculatorRegistry } from '../../data/calculatorRegistry';
import { 401kCalculatorCalculator } from './401kCalculatorCalculator';

export function register401kCalculatorCalculator(): void {
  calculatorRegistry.register(new 401kCalculatorCalculator());
}
