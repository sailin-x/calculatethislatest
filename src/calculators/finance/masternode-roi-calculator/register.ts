import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MasternodeRoiCalculator } from './MasternodeRoiCalculator';

export function registerMasternodeRoiCalculator(): void {
  calculatorRegistry.register(MasternodeRoiCalculator);
}

export { MasternodeRoiCalculator };
