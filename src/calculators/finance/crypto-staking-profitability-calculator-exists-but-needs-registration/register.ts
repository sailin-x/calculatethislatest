import { calculatorRegistry } from '../../data/calculatorRegistry';
import { cryptostakingprofitabilitycalculatorexistsbutneedsregistrationCalculator } from './cryptostakingprofitabilitycalculatorexistsbutneedsregistrationCalculator';

export function registercryptostakingprofitabilitycalculatorexistsbutneedsregistrationCalculator(): void {
  calculatorRegistry.register(new cryptostakingprofitabilitycalculatorexistsbutneedsregistrationCalculator());
}
