import { calculatorRegistry } from '../../data/calculatorRegistry';
import { adult_affiliate_commission_calculatorCalculator } from './adult_affiliate_commission_calculatorCalculator';

export function registeradult_affiliate_commission_calculatorCalculator(): void {
  calculatorRegistry.register(new adult_affiliate_commission_calculatorCalculator());
}
