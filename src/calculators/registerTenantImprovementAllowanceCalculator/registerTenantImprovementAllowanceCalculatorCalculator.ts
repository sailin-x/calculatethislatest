import { Calculator } from '../../engines/CalculatorEngine';
import { registerTenantImprovementAllowanceCalculatorInputs, registerTenantImprovementAllowanceCalculatorResults, registerTenantImprovementAllowanceCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerTenantImprovementAllowanceCalculatorCalculator implements Calculator<registerTenantImprovementAllowanceCalculatorInputs, registerTenantImprovementAllowanceCalculatorResults> {
  readonly id = 'registerTenantImprovementAllowanceCalculator';
  readonly name = 'registerTenantImprovementAllowanceCalculator Calculator';
  readonly description = 'Calculate registerTenantImprovementAllowanceCalculator values';

  calculate(inputs: registerTenantImprovementAllowanceCalculatorInputs): registerTenantImprovementAllowanceCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerTenantImprovementAllowanceCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerTenantImprovementAllowanceCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
