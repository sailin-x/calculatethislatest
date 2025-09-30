import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SuretyBondCalculator } from './SuretyBondCalculator';

export function registerSuretyBondCalculator(): void {
  calculatorRegistry.register(SuretyBondCalculator);
}

export { SuretyBondCalculator };
