import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CustomerAcquisitionCostCalculator } from './CustomerAcquisitionCostCalculator';

export function registerCustomerAcquisitionCostCalculator(): void {
  calculatorRegistry.register(new CustomerAcquisitionCostCalculator());
}
