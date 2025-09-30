import { Calculator } from '../../engines/CalculatorEngine';
import { pension_plan_funding_calculatorCalculatorInputs, pension_plan_funding_calculatorCalculatorResults, pension_plan_funding_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class pension_plan_funding_calculatorCalculatorCalculator implements Calculator<pension_plan_funding_calculatorCalculatorInputs, pension_plan_funding_calculatorCalculatorResults> {
  readonly id = 'pension_plan_funding_calculatorCalculator';
  readonly name = 'pension_plan_funding_calculatorCalculator Calculator';
  readonly description = 'Calculate pension_plan_funding_calculatorCalculator values';

  calculate(inputs: pension_plan_funding_calculatorCalculatorInputs): pension_plan_funding_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: pension_plan_funding_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: pension_plan_funding_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
