import { Calculator } from '../../engines/CalculatorEngine';
import { developer_salary_calculatorCalculatorInputs, developer_salary_calculatorCalculatorResults, developer_salary_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class developer_salary_calculatorCalculatorCalculator implements Calculator<developer_salary_calculatorCalculatorInputs, developer_salary_calculatorCalculatorResults> {
  readonly id = 'developer_salary_calculatorCalculator';
  readonly name = 'developer_salary_calculatorCalculator Calculator';
  readonly description = 'Calculate developer_salary_calculatorCalculator values';

  calculate(inputs: developer_salary_calculatorCalculatorInputs): developer_salary_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: developer_salary_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: developer_salary_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
