import { Calculator } from '../../engines/CalculatorEngine';
import { environmental_remediation_cost_estimatorCalculatorInputs, environmental_remediation_cost_estimatorCalculatorResults, environmental_remediation_cost_estimatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class environmental_remediation_cost_estimatorCalculatorCalculator implements Calculator<environmental_remediation_cost_estimatorCalculatorInputs, environmental_remediation_cost_estimatorCalculatorResults> {
  readonly id = 'environmental_remediation_cost_estimatorCalculator';
  readonly name = 'environmental_remediation_cost_estimatorCalculator Calculator';
  readonly description = 'Calculate environmental_remediation_cost_estimatorCalculator values';

  calculate(inputs: environmental_remediation_cost_estimatorCalculatorInputs): environmental_remediation_cost_estimatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: environmental_remediation_cost_estimatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: environmental_remediation_cost_estimatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
