import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PeerToPeerLendingCalculator } from './PeerToPeerLendingCalculator';

export function registerPeerToPeerLendingCalculator(): void {
  calculatorRegistry.register(PeerToPeerLendingCalculator);
}

export { PeerToPeerLendingCalculator };
