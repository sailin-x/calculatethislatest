import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BlogCostCalculator } from './BlogCostCalculator';

export function registerBlogCostCalculator(): void {
  calculatorRegistry.register(BlogCostCalculator);
}

export { BlogCostCalculator };
