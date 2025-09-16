import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { irrevocableLifeInsuranceTrustILITValueCalculator } from './IrrevocableLifeInsuranceTrustILITValueCalculator';

/**
 * Register the Irrevocable Life Insurance Trust (ILIT) Value Calculator
 */
export function registerIrrevocableLifeInsuranceTrustILITValueCalculator(): void {
  calculatorRegistry.register(irrevocableLifeInsuranceTrustILITValueCalculator);
}