import { calculatorRegistry } from '../../data/calculatorRegistry';
import { cryptominingprofitabilitycalculatorCalculator } from './cryptominingprofitabilitycalculatorCalculator';

export function registercryptominingprofitabilitycalculatorCalculator(): void {
  calculatorRegistry.register(new cryptominingprofitabilitycalculatorCalculator());
}
