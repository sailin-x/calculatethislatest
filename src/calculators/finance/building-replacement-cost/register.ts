import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BuildingReplacementCostCalculator } from './BuildingReplacementCostCalculator';

// Register the Building Replacement Cost Calculator
calculatorRegistry.register(BuildingReplacementCostCalculator);

console.log('✅ Building Replacement Cost Calculator registered successfully');
