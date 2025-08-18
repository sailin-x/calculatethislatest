import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { CommercialRealEstateCashFlowCalculator } from './CommercialRealEstateCashFlowCalculator';

export function registerCommercialRealEstateCashFlowCalculator(registry: CalculatorRegistry): void {
  registry.register(CommercialRealEstateCashFlowCalculator);
}

export { CommercialRealEstateCashFlowCalculator };
