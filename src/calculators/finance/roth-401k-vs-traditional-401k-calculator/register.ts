import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { Roth401kVsTraditional401kCalculator } from './Roth401kVsTraditional401kCalculator';

export function registerRoth401kVsTraditional401kCalculator(): void {
  calculatorRegistry.register(Roth401kVsTraditional401kCalculator);
}

export { Roth401kVsTraditional401kCalculator };
