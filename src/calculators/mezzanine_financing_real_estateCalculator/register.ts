import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mezzanine_financing_real_estateCalculator } from './mezzanine_financing_real_estateCalculator';

export function registermezzanine_financing_real_estateCalculator(): void {
  calculatorRegistry.register(new mezzanine_financing_real_estateCalculator());
}
