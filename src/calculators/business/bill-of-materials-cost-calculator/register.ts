import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BillOfMaterialsCostCalculator } from './BillOfMaterialsCostCalculator';

export function registerBillOfMaterialsCostCalculator(): void {
  calculatorRegistry.register(BillOfMaterialsCostCalculator);
}

export { BillOfMaterialsCostCalculator };
