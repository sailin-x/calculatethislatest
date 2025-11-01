import { calculatorRegistry } from '../../data/calculatorRegistry';
import { high_net_worth_divorce_asset_divisionCalculator } from './high_net_worth_divorce_asset_divisionCalculator';

export function registerhigh_net_worth_divorce_asset_divisionCalculator(): void {
  calculatorRegistry.register(new high_net_worth_divorce_asset_divisionCalculator());
}
