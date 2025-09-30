import { calculatorRegistry } from '../../data/calculatorRegistry';
import { cryptoportfoliorebalancingcalculatorCalculator } from './cryptoportfoliorebalancingcalculatorCalculator';

export function registercryptoportfoliorebalancingcalculatorCalculator(): void {
  calculatorRegistry.register(new cryptoportfoliorebalancingcalculatorCalculator());
}
