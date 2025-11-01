import { calculatorRegistry } from '../../data/calculatorRegistry';
import { Four01kCalculator } from './fourZeroOneKCalculator';

export function registerfourZeroOneKCalculator(): void {
  calculatorRegistry.register(new Four01kCalculator());
}
