import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BillOfMaterialsCalculator } from './BillOfMaterialsCalculator';

export function registerBillOfMaterialsCalculator() {
  calculatorRegistry.register(BillOfMaterialsCalculator);
}
