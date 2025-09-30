import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { VitaminDCalculator } from './VitaminDCalculator';

export function registerVitaminDCalculator(): void {
  calculatorRegistry.register(VitaminDCalculator);
}

export { VitaminDCalculator };
