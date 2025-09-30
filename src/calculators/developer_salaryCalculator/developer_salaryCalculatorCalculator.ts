import { Calculator } from '../../engines/CalculatorEngine';
import { developer_salaryCalculatorInputs, developer_salaryCalculatorResults, developer_salaryCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class developer_salaryCalculatorCalculator implements Calculator<developer_salaryCalculatorInputs, developer_salaryCalculatorResults> {
  readonly id = 'developer_salaryCalculator';
  readonly name = 'developer_salaryCalculator Calculator';
  readonly description = 'Calculate developer_salaryCalculator values';

  calculate(inputs: developer_salaryCalculatorInputs): developer_salaryCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: developer_salaryCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: developer_salaryCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
