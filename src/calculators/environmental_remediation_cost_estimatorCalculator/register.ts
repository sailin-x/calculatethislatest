import { calculatorRegistry } from '../../data/calculatorRegistry';
import { environmental_remediation_cost_estimatorCalculator } from './environmental_remediation_cost_estimatorCalculator';

export function registerenvironmental_remediation_cost_estimatorCalculator(): void {
  calculatorRegistry.register(new environmental_remediation_cost_estimatorCalculator());
}
