import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { DaoGovernanceTokenCalculator } from './DaoGovernanceTokenCalculator';

export function registerDaoGovernanceTokenCalculator(): void {
  calculatorRegistry.register(DaoGovernanceTokenCalculator);
}

export { DaoGovernanceTokenCalculator };
