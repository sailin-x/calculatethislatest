import { Calculator } from '../../engines/CalculatorEngine';
import { CarLoanCalculatorInputs, CarLoanCalculatorResults, CarLoanCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class CarLoanCalculatorCalculator implements Calculator<CarLoanCalculatorInputs, CarLoanCalculatorResults> {
  readonly id = 'CarLoanCalculator';
  readonly name = 'CarLoanCalculator Calculator';
  readonly description = 'Calculate CarLoanCalculator values';

  calculate(inputs: CarLoanCalculatorInputs): CarLoanCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: CarLoanCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: CarLoanCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
