import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AirlineTicketCostCalculator } from './AirlineTicketCostCalculator';

export function registerAirlineTicketCostCalculator(): void {
  calculatorRegistry.register(AirlineTicketCostCalculator);
}

export { AirlineTicketCostCalculator };
