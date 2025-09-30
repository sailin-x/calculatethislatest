import { Calculator } from '../../engines/CalculatorEngine';
import { soc_2_compliance_cost_estimatorCalculatorInputs, soc_2_compliance_cost_estimatorCalculatorResults, soc_2_compliance_cost_estimatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class soc_2_compliance_cost_estimatorCalculatorCalculator implements Calculator<soc_2_compliance_cost_estimatorCalculatorInputs, soc_2_compliance_cost_estimatorCalculatorResults> {
  readonly id = 'soc_2_compliance_cost_estimatorCalculator';
  readonly name = 'soc_2_compliance_cost_estimatorCalculator Calculator';
  readonly description = 'Calculate soc_2_compliance_cost_estimatorCalculator values';

  calculate(inputs: soc_2_compliance_cost_estimatorCalculatorInputs): soc_2_compliance_cost_estimatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: soc_2_compliance_cost_estimatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: soc_2_compliance_cost_estimatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
