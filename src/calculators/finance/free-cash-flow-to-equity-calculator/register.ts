import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FreeCashFlowToEquityCalculator } from './FreeCashFlowToEquityCalculator';

export function registerFreeCashFlowToEquityCalculator(): void {
  calculatorRegistry.register(FreeCashFlowToEquityCalculator);
}

export { FreeCashFlowToEquityCalculator };
