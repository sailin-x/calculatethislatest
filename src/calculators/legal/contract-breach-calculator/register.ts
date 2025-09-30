import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ContractBreachCalculator } from './ContractBreachCalculator';

export function registerContractBreachCalculator(): void {
  calculatorRegistry.register(ContractBreachCalculator);
}

export { ContractBreachCalculator };
