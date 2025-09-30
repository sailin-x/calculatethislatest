import { calculatorRegistry } from '../../data/calculatorRegistry';
import { stock_buyback_roi_calculatorCalculatorCalculator } from './stock_buyback_roi_calculatorCalculatorCalculator';

export function registerstock_buyback_roi_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new stock_buyback_roi_calculatorCalculatorCalculator());
}
