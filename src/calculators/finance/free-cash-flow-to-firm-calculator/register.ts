import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FreeCashFlowToFirmCalculator } from './FreeCashFlowToFirmCalculator';

export function registerFreeCashFlowToFirmCalculator(): void {
  calculatorRegistry.register(FreeCashFlowToFirmCalculator);
}

export { FreeCashFlowToFirmCalculator };
