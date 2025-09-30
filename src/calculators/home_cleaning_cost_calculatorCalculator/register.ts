import { calculatorRegistry } from '../../data/calculatorRegistry';
import { home_cleaning_cost_calculatorCalculatorCalculator } from './home_cleaning_cost_calculatorCalculatorCalculator';

export function registerhome_cleaning_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new home_cleaning_cost_calculatorCalculatorCalculator());
}
