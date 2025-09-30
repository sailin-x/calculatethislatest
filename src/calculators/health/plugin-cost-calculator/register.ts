import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PluginCostCalculator } from './PluginCostCalculator';

export function registerPluginCostCalculator(): void {
  calculatorRegistry.register(PluginCostCalculator);
}

export { PluginCostCalculator };
