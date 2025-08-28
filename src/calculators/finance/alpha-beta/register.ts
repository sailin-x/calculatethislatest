import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AlphaBetaCalculator } from './AlphaBetaCalculator';

export function registerAlphaBetaCalculator() {
  calculatorRegistry.register(AlphaBetaCalculator);
}
