import { calculatorRegistry } from '../../data/calculatorRegistry';
import { impermanent_loss_calculatorCalculatorCalculator } from './impermanent_loss_calculatorCalculatorCalculator';

export function registerimpermanent_loss_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new impermanent_loss_calculatorCalculatorCalculator());
}
