import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { CommercialLeaseBuyoutCalculator } from './CommercialLeaseBuyoutCalculator';

export function registerCommercialLeaseBuyoutCalculator(registry: CalculatorRegistry): void {
  registry.register(CommercialLeaseBuyoutCalculator);
}

export { CommercialLeaseBuyoutCalculator };
