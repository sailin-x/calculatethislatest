import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { ConservationEasementTaxBenefitCalculator } from './ConservationEasementTaxBenefitCalculator';

export function registerConservationEasementTaxBenefitCalculator(registry: CalculatorRegistry): void {
  registry.register(ConservationEasementTaxBenefitCalculator);
}

export { ConservationEasementTaxBenefitCalculator };
