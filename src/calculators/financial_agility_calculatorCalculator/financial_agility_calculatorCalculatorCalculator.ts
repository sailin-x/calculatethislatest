import { Calculator } from '../../engines/CalculatorEngine';
import { financial_agility_calculatorCalculatorInputs, financial_agility_calculatorCalculatorResults, financial_agility_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_agility_calculatorCalculatorCalculator implements Calculator<financial_agility_calculatorCalculatorInputs, financial_agility_calculatorCalculatorResults> {
  readonly id = 'financial_agility_calculatorCalculator';
  readonly name = 'financial_agility_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_agility_calculatorCalculator values';

  calculate(inputs: financial_agility_calculatorCalculatorInputs): financial_agility_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_agility_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_agility_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
