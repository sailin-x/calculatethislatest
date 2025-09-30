import { calculatorRegistry } from '../../data/calculatorRegistry';
import { masternode_roi_calculatorCalculatorCalculator } from './masternode_roi_calculatorCalculatorCalculator';

export function registermasternode_roi_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new masternode_roi_calculatorCalculatorCalculator());
}
