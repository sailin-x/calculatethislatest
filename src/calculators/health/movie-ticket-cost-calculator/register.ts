import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MovieTicketCostCalculator } from './MovieTicketCostCalculator';

export function registerMovieTicketCostCalculator(): void {
  calculatorRegistry.register(MovieTicketCostCalculator);
}

export { MovieTicketCostCalculator };
