import { Calculator } from '../../engines/CalculatorEngine';
import { commercial_fleet_insurance_premium_estimatorCalculatorInputs, commercial_fleet_insurance_premium_estimatorCalculatorResults, commercial_fleet_insurance_premium_estimatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class commercial_fleet_insurance_premium_estimatorCalculatorCalculator implements Calculator<commercial_fleet_insurance_premium_estimatorCalculatorInputs, commercial_fleet_insurance_premium_estimatorCalculatorResults> {
  readonly id = 'commercial_fleet_insurance_premium_estimatorCalculator';
  readonly name = 'commercial_fleet_insurance_premium_estimatorCalculator Calculator';
  readonly description = 'Calculate commercial_fleet_insurance_premium_estimatorCalculator values';

  calculate(inputs: commercial_fleet_insurance_premium_estimatorCalculatorInputs): commercial_fleet_insurance_premium_estimatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: commercial_fleet_insurance_premium_estimatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: commercial_fleet_insurance_premium_estimatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
