import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ConcertTicketCostCalculator } from './ConcertTicketCostCalculator';

export function registerConcertTicketCostCalculator(): void {
  calculatorRegistry.register(ConcertTicketCostCalculator);
}

export { ConcertTicketCostCalculator };
