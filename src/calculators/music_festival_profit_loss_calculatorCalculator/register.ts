import { calculatorRegistry } from '../../data/calculatorRegistry';
import { music_festival_profit_loss_calculatorCalculatorCalculator } from './music_festival_profit_loss_calculatorCalculatorCalculator';

export function registermusic_festival_profit_loss_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new music_festival_profit_loss_calculatorCalculatorCalculator());
}
