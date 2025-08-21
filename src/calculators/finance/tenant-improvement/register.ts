import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { TenantImprovementCalculator } from './TenantImprovementCalculator';

// Register the Tenant Improvement (TI) Allowance Calculator
CalculatorRegistry.register(TenantImprovementCalculator);
