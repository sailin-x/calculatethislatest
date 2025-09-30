import { Calculator } from '../../engines/CalculatorEngine';
import { project_management_cost_calculatorCalculatorInputs, project_management_cost_calculatorCalculatorResults, project_management_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class project_management_cost_calculatorCalculatorCalculator implements Calculator<project_management_cost_calculatorCalculatorInputs, project_management_cost_calculatorCalculatorResults> {
  readonly id = 'project_management_cost_calculatorCalculator';
  readonly name = 'project_management_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate project_management_cost_calculatorCalculator values';

  calculate(inputs: project_management_cost_calculatorCalculatorInputs): project_management_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: project_management_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: project_management_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
