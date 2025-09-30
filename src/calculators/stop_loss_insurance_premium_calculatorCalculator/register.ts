import { calculatorRegistry } from '../../data/calculatorRegistry';
import { stop_loss_insurance_premium_calculatorCalculatorCalculator } from './stop_loss_insurance_premium_calculatorCalculatorCalculator';

export function registerstop_loss_insurance_premium_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new stop_loss_insurance_premium_calculatorCalculatorCalculator());
}
