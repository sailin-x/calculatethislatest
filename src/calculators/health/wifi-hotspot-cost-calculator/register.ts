import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { WifiHotspotCostCalculator } from './WifiHotspotCostCalculator';

export function registerWifiHotspotCostCalculator(): void {
  calculatorRegistry.register(WifiHotspotCostCalculator);
}

export { WifiHotspotCostCalculator };
