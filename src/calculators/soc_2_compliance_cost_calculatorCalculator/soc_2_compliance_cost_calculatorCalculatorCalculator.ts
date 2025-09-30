import { Calculator } from '../../engines/CalculatorEngine';
import { soc_2_compliance_cost_calculatorCalculatorInputs, soc_2_compliance_cost_calculatorCalculatorResults, soc_2_compliance_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class soc_2_compliance_cost_calculatorCalculatorCalculator implements Calculator<soc_2_compliance_cost_calculatorCalculatorInputs, soc_2_compliance_cost_calculatorCalculatorResults> {
  readonly id = 'soc_2_compliance_cost_calculatorCalculator';
  readonly name = 'soc_2_compliance_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate soc_2_compliance_cost_calculatorCalculator values';

  calculate(inputs: soc_2_compliance_cost_calculatorCalculatorInputs): soc_2_compliance_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: soc_2_compliance_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: soc_2_compliance_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
