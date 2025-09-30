import { calculatorRegistry } from '../../data/calculatorRegistry';
import { return_on_ad_spend_roas_calculatorCalculatorCalculator } from './return_on_ad_spend_roas_calculatorCalculatorCalculator';

export function registerreturn_on_ad_spend_roas_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new return_on_ad_spend_roas_calculatorCalculatorCalculator());
}
