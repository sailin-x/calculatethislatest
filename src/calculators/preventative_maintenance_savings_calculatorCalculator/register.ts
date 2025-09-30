import { calculatorRegistry } from '../../data/calculatorRegistry';
import { preventative_maintenance_savings_calculatorCalculatorCalculator } from './preventative_maintenance_savings_calculatorCalculatorCalculator';

export function registerpreventative_maintenance_savings_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new preventative_maintenance_savings_calculatorCalculatorCalculator());
}
