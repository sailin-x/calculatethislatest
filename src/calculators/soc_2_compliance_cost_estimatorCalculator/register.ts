import { calculatorRegistry } from '../../data/calculatorRegistry';
import { soc_2_compliance_cost_estimatorCalculatorCalculator } from './soc_2_compliance_cost_estimatorCalculatorCalculator';

export function registersoc_2_compliance_cost_estimatorCalculatorCalculator(): void {
  calculatorRegistry.register(new soc_2_compliance_cost_estimatorCalculatorCalculator());
}
