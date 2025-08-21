import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { VineyardProfitabilityCalculator } from './VineyardProfitabilityCalculator';

// Register the Vineyard Profitability Calculator
calculatorRegistry.register(VineyardProfitabilityCalculator);

export { VineyardProfitabilityCalculator };
