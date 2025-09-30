import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { HotAirBalloonCostCalculator } from './HotAirBalloonCostCalculator';

export function registerHotAirBalloonCostCalculator(): void {
  calculatorRegistry.register(HotAirBalloonCostCalculator);
}

export { HotAirBalloonCostCalculator };
