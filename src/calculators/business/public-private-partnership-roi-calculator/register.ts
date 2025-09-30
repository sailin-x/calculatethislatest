import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PublicPrivatePartnershipRoiCalculator } from './PublicPrivatePartnershipRoiCalculator';

export function registerPublicPrivatePartnershipRoiCalculator(): void {
  calculatorRegistry.register(PublicPrivatePartnershipRoiCalculator);
}

export { PublicPrivatePartnershipRoiCalculator };
