import { Calculator } from '../../engines/CalculatorEngine';
import { mold_remediation_cost_calculatorCalculatorInputs, mold_remediation_cost_calculatorCalculatorResults, mold_remediation_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mold_remediation_cost_calculatorCalculatorCalculator implements Calculator<mold_remediation_cost_calculatorCalculatorInputs, mold_remediation_cost_calculatorCalculatorResults> {
  readonly id = 'mold_remediation_cost_calculatorCalculator';
  readonly name = 'mold_remediation_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate mold_remediation_cost_calculatorCalculator values';

  calculate(inputs: mold_remediation_cost_calculatorCalculatorInputs): mold_remediation_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mold_remediation_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mold_remediation_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
