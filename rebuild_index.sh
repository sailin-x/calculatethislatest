#!/bin/bash

# Rebuild index.ts with only working calculators

echo "Rebuilding index.ts with working calculators..."

# Start with a clean index.ts
cat > src/calculators/index.ts << 'EOF'
import { calculatorRegistry } from '../data/calculatorRegistry';

// Import working calculators
import { MortgagePaymentCalculator as mortgageCalculator } from './finance/mortgage-payment';
import { LoanToCostCalculator as loanToCostCalculator } from './finance/loan-to-cost';
import { HomeInsuranceCalculator as homeInsuranceCalculator } from './finance/home-insurance';
import { HotelFeasibilityADRCalculator as hotelFeasibilityADRCalculator } from './finance/hotel-feasibility-adr';

/**
 * Register all calculators with the system
 */
export function registerAllCalculators(): void {
  // Finance calculators
  calculatorRegistry.register(mortgageCalculator);
  calculatorRegistry.register(loanToCostCalculator);
  calculatorRegistry.register(homeInsuranceCalculator);
  calculatorRegistry.register(hotelFeasibilityADRCalculator);
}

// Auto-register calculators when module is imported
Promise.resolve().then(() => {
  registerAllCalculators();
});
EOF

echo "✅ index.ts rebuilt with working calculators only"