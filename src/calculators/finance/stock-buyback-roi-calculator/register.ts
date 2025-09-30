import { calculatorRegistry } from '../../data/calculatorRegistry';
import { stockbuybackroicalculatorCalculator } from './stockbuybackroicalculatorCalculator';

export function registerstockbuybackroicalculatorCalculator(): void {
  calculatorRegistry.register(new stockbuybackroicalculatorCalculator());
}
