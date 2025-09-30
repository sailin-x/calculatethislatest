import { Calculator } from '../../engines/CalculatorEngine';
import { business_loan_qualification_calculatorCalculatorInputs, business_loan_qualification_calculatorCalculatorResults, business_loan_qualification_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class business_loan_qualification_calculatorCalculatorCalculator implements Calculator<business_loan_qualification_calculatorCalculatorInputs, business_loan_qualification_calculatorCalculatorResults> {
  readonly id = 'business_loan_qualification_calculatorCalculator';
  readonly name = 'business_loan_qualification_calculatorCalculator Calculator';
  readonly description = 'Calculate business_loan_qualification_calculatorCalculator values';

  calculate(inputs: business_loan_qualification_calculatorCalculatorInputs): business_loan_qualification_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: business_loan_qualification_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: business_loan_qualification_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
