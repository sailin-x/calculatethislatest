import { calculatorRegistry } from '../../data/calculatorRegistry';
import { asset-protection-calculatorCalculator } from './asset-protection-calculatorCalculator';

export function registerasset-protection-calculatorCalculator(): void {
  calculatorRegistry.register(new asset-protection-calculatorCalculator());
}
