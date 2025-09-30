import { calculatorRegistry } from '../../data/calculatorRegistry';
import { './business/restricted-stock-unit-vs-stock-option-calculator/restricted_stock_unit_vs_stock_option_calculator';Calculator } from './'./business/restricted-stock-unit-vs-stock-option-calculator/restricted_stock_unit_vs_stock_option_calculator';Calculator';

export function register'./business/restricted-stock-unit-vs-stock-option-calculator/restricted_stock_unit_vs_stock_option_calculator';Calculator(): void {
  calculatorRegistry.register(new './business/restricted-stock-unit-vs-stock-option-calculator/restricted_stock_unit_vs_stock_option_calculator';Calculator());
}
