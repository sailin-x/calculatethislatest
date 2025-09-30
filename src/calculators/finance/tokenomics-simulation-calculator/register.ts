import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TokenomicsSimulationCalculator } from './TokenomicsSimulationCalculator';

export function registerTokenomicsSimulationCalculator(): void {
  calculatorRegistry.register(TokenomicsSimulationCalculator);
}

export { TokenomicsSimulationCalculator };
