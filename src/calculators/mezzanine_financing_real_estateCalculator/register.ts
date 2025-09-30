import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mezzanine_financing_real_estateCalculatorCalculator } from './mezzanine_financing_real_estateCalculatorCalculator';

export function registermezzanine_financing_real_estateCalculatorCalculator(): void {
  calculatorRegistry.register(new mezzanine_financing_real_estateCalculatorCalculator());
}
