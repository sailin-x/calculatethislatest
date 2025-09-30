import { Calculator } from '../../engines/CalculatorEngine';
import { technical_debt_calculatorCalculatorInputs, technical_debt_calculatorCalculatorResults, technical_debt_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class technical_debt_calculatorCalculatorCalculator implements Calculator<technical_debt_calculatorCalculatorInputs, technical_debt_calculatorCalculatorResults> {
  readonly id = 'technical_debt_calculatorCalculator';
  readonly name = 'technical_debt_calculatorCalculator Calculator';
  readonly description = 'Calculate technical_debt_calculatorCalculator values';

  calculate(inputs: technical_debt_calculatorCalculatorInputs): technical_debt_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: technical_debt_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: technical_debt_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
