import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { GroundLeaseValuationCalculator } from './GroundLeaseValuationCalculator';

export function registerGroundLeaseValuationCalculator(registry: CalculatorRegistry): void {
  registry.register(GroundLeaseValuationCalculator);
}

export { GroundLeaseValuationCalculator };
