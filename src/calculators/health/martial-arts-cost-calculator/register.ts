import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MartialArtsCostCalculator } from './MartialArtsCostCalculator';

export function registerMartialArtsCostCalculator(): void {
  calculatorRegistry.register(MartialArtsCostCalculator);
}

export { MartialArtsCostCalculator };
