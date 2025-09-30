import { calculatorRegistry } from '../../data/calculatorRegistry';
import { preventativemaintenancesavingscalculatorCalculator } from './preventativemaintenancesavingscalculatorCalculator';

export function registerpreventativemaintenancesavingscalculatorCalculator(): void {
  calculatorRegistry.register(new preventativemaintenancesavingscalculatorCalculator());
}
