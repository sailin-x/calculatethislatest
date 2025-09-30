import { calculatorRegistry } from '../../data/calculatorRegistry';
import { affiliate_marketing_roi_calculatorCalculator } from './affiliate_marketing_roi_calculatorCalculator';

export function registeraffiliate_marketing_roi_calculatorCalculator(): void {
  calculatorRegistry.register(new affiliate_marketing_roi_calculatorCalculator());
}
