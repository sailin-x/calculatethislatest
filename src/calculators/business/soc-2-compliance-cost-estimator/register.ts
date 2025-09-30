import { calculatorRegistry } from '../../data/calculatorRegistry';
import { soc2compliancecostestimatorCalculator } from './soc2compliancecostestimatorCalculator';

export function registersoc2compliancecostestimatorCalculator(): void {
  calculatorRegistry.register(new soc2compliancecostestimatorCalculator());
}
