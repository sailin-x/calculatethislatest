import { calculatorRegistry } from '../../data/calculatorRegistry';
import { pricefixingoverchargeestimatorCalculator } from './pricefixingoverchargeestimatorCalculator';

export function registerpricefixingoverchargeestimatorCalculator(): void {
  calculatorRegistry.register(new pricefixingoverchargeestimatorCalculator());
}
