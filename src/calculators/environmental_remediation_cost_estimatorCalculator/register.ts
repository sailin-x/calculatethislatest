import { calculatorRegistry } from '../../data/calculatorRegistry';
import { environmental_remediation_cost_estimatorCalculatorCalculator } from './environmental_remediation_cost_estimatorCalculatorCalculator';

export function registerenvironmental_remediation_cost_estimatorCalculatorCalculator(): void {
  calculatorRegistry.register(new environmental_remediation_cost_estimatorCalculatorCalculator());
}
