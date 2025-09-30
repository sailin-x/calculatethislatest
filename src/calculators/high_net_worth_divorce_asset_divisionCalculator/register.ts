import { calculatorRegistry } from '../../data/calculatorRegistry';
import { high_net_worth_divorce_asset_divisionCalculatorCalculator } from './high_net_worth_divorce_asset_divisionCalculatorCalculator';

export function registerhigh_net_worth_divorce_asset_divisionCalculatorCalculator(): void {
  calculatorRegistry.register(new high_net_worth_divorce_asset_divisionCalculatorCalculator());
}
