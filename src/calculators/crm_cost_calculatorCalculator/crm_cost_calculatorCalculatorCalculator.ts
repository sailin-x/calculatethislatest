import { Calculator } from '../../engines/CalculatorEngine';
import { crm_cost_calculatorCalculatorInputs, crm_cost_calculatorCalculatorResults, crm_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class crm_cost_calculatorCalculatorCalculator implements Calculator<crm_cost_calculatorCalculatorInputs, crm_cost_calculatorCalculatorResults> {
  readonly id = 'crm_cost_calculatorCalculator';
  readonly name = 'crm_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate crm_cost_calculatorCalculator values';

  calculate(inputs: crm_cost_calculatorCalculatorInputs): crm_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: crm_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: crm_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
