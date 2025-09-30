import { calculatorRegistry } from '../../data/calculatorRegistry';
import { Roth401kVsTraditional401kCalculatorCalculator } from './Roth401kVsTraditional401kCalculatorCalculator';

export function registerRoth401kVsTraditional401kCalculatorCalculator(): void {
  calculatorRegistry.register(new Roth401kVsTraditional401kCalculatorCalculator());
}
