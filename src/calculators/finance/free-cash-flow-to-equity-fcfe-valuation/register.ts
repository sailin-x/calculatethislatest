import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FreeCashFlowToEquityFcfeValuation } from './FreeCashFlowToEquityFcfeValuation';

export function registerFreeCashFlowToEquityFcfeValuation(): void {
  calculatorRegistry.register(FreeCashFlowToEquityFcfeValuation);
}

export { FreeCashFlowToEquityFcfeValuation };
