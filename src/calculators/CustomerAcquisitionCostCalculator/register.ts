import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CustomerAcquisitionCostCalculatorCalculator } from './CustomerAcquisitionCostCalculatorCalculator';

export function registerCustomerAcquisitionCostCalculatorCalculator(): void {
  calculatorRegistry.register(new CustomerAcquisitionCostCalculatorCalculator());
}
