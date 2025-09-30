import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { WebsiteCostCalculator } from './WebsiteCostCalculator';

export function registerWebsiteCostCalculator(): void {
  calculatorRegistry.register(WebsiteCostCalculator);
}

export { WebsiteCostCalculator };
