import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FreeCashFlowToFirmFcffValuation } from './FreeCashFlowToFirmFcffValuation';

export function registerFreeCashFlowToFirmFcffValuation(): void {
  calculatorRegistry.register(FreeCashFlowToFirmFcffValuation);
}

export { FreeCashFlowToFirmFcffValuation };
