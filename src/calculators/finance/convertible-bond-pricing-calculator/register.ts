import { calculatorRegistry } from '../../data/calculatorRegistry';
import { convertiblebondpricingcalculatorCalculator } from './convertiblebondpricingcalculatorCalculator';

export function registerconvertiblebondpricingcalculatorCalculator(): void {
  calculatorRegistry.register(new convertiblebondpricingcalculatorCalculator());
}
