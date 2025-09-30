import { calculatorRegistry } from '../../data/calculatorRegistry';
import { shitcoininvestmentcalculatorCalculator } from './shitcoininvestmentcalculatorCalculator';

export function registershitcoininvestmentcalculatorCalculator(): void {
  calculatorRegistry.register(new shitcoininvestmentcalculatorCalculator());
}
