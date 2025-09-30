import { calculatorRegistry } from '../../data/calculatorRegistry';
import { plugin_cost_calculatorCalculatorCalculator } from './plugin_cost_calculatorCalculatorCalculator';

export function registerplugin_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new plugin_cost_calculatorCalculatorCalculator());
}
