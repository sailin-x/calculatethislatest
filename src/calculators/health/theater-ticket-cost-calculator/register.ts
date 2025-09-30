import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TheaterTicketCostCalculator } from './TheaterTicketCostCalculator';

export function registerTheaterTicketCostCalculator(): void {
  calculatorRegistry.register(TheaterTicketCostCalculator);
}

export { TheaterTicketCostCalculator };
