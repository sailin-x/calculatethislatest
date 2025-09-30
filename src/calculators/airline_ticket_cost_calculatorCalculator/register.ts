import { calculatorRegistry } from '../../data/calculatorRegistry';
import { airline_ticket_cost_calculatorCalculatorCalculator } from './airline_ticket_cost_calculatorCalculatorCalculator';

export function registerairline_ticket_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new airline_ticket_cost_calculatorCalculatorCalculator());
}
