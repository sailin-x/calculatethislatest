import { calculatorRegistry } from '../../data/calculatorRegistry';
import { './health/plugin-cost-calculator/plugin_cost_calculator';Calculator } from './'./health/plugin-cost-calculator/plugin_cost_calculator';Calculator';

export function register'./health/plugin-cost-calculator/plugin_cost_calculator';Calculator(): void {
  calculatorRegistry.register(new './health/plugin-cost-calculator/plugin_cost_calculator';Calculator());
}
