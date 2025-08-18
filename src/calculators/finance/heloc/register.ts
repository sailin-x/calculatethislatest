import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { HELOCCalculator } from './HELOCCalculator';

export function registerHELOCCalculator(registry: CalculatorRegistry): void {
  registry.register(HELOCCalculator);
}

export { HELOCCalculator };
