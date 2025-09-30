import { Calculator } from '../../engines/CalculatorEngine';
import { self_funded_health_plan_vs_fully_insured_calculatorCalculatorInputs, self_funded_health_plan_vs_fully_insured_calculatorCalculatorResults, self_funded_health_plan_vs_fully_insured_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class self_funded_health_plan_vs_fully_insured_calculatorCalculatorCalculator implements Calculator<self_funded_health_plan_vs_fully_insured_calculatorCalculatorInputs, self_funded_health_plan_vs_fully_insured_calculatorCalculatorResults> {
  readonly id = 'self_funded_health_plan_vs_fully_insured_calculatorCalculator';
  readonly name = 'self_funded_health_plan_vs_fully_insured_calculatorCalculator Calculator';
  readonly description = 'Calculate self_funded_health_plan_vs_fully_insured_calculatorCalculator values';

  calculate(inputs: self_funded_health_plan_vs_fully_insured_calculatorCalculatorInputs): self_funded_health_plan_vs_fully_insured_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: self_funded_health_plan_vs_fully_insured_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: self_funded_health_plan_vs_fully_insured_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
