import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ProjectManagementCostCalculator } from './ProjectManagementCostCalculator';

export function registerProjectManagementCostCalculator(): void {
  calculatorRegistry.register(ProjectManagementCostCalculator);
}

export { ProjectManagementCostCalculator };
