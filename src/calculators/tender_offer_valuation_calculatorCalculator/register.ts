import { calculatorRegistry } from '../../data/calculatorRegistry';
import { tender_offer_valuation_calculatorCalculatorCalculator } from './tender_offer_valuation_calculatorCalculatorCalculator';

export function registertender_offer_valuation_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new tender_offer_valuation_calculatorCalculatorCalculator());
}
