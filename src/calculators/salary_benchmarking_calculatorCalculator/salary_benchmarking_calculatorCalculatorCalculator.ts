import { Calculator } from '../../engines/CalculatorEngine';
import { salary_benchmarking_calculatorCalculatorInputs, salary_benchmarking_calculatorCalculatorResults, salary_benchmarking_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class salary_benchmarking_calculatorCalculatorCalculator implements Calculator<salary_benchmarking_calculatorCalculatorInputs, salary_benchmarking_calculatorCalculatorResults> {
  readonly id = 'salary_benchmarking_calculatorCalculator';
  readonly name = 'salary_benchmarking_calculatorCalculator Calculator';
  readonly description = 'Calculate salary_benchmarking_calculatorCalculator values';

  calculate(inputs: salary_benchmarking_calculatorCalculatorInputs): salary_benchmarking_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: salary_benchmarking_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: salary_benchmarking_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
