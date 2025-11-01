import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { billOfMaterialsCalculator } from './BillOfMaterialsCalculator';

export function registerBillOfMaterialsCalculator() {
  calculatorRegistry.register(BillOfMaterialsCalculator);
}
