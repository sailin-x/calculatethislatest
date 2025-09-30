import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PodcastCostCalculator } from './PodcastCostCalculator';

export function registerPodcastCostCalculator(): void {
  calculatorRegistry.register(PodcastCostCalculator);
}

export { PodcastCostCalculator };
