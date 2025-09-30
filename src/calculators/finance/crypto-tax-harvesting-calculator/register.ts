import { calculatorRegistry } from '../../data/calculatorRegistry';
import { cryptotaxharvestingcalculatorCalculator } from './cryptotaxharvestingcalculatorCalculator';

export function registercryptotaxharvestingcalculatorCalculator(): void {
  calculatorRegistry.register(new cryptotaxharvestingcalculatorCalculator());
}
