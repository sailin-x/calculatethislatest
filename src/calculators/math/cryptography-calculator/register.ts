import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CryptographyCalculator } from './CryptographyCalculator';

export function registerCryptographyCalculator(): void {
  calculatorRegistry.register(CryptographyCalculator);
}

export { CryptographyCalculator };
