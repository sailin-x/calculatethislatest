import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ReturnOnAssetsCalculator } from './ReturnOnAssetsCalculator';

export function registerReturnOnAssetsCalculator(): void {
  calculatorRegistry.register(ReturnOnAssetsCalculator);
}

export { ReturnOnAssetsCalculator };
