import { calculatorRegistry } from '../../data/calculatorRegistry';
import { clinicaltrialcostestimatorCalculator } from './clinicaltrialcostestimatorCalculator';

export function registerclinicaltrialcostestimatorCalculator(): void {
  calculatorRegistry.register(new clinicaltrialcostestimatorCalculator());
}
