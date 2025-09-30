import { Calculator } from '../../engines/CalculatorEngine';
import { it_outsourcing_vs_in_house_cost_benefit_analysisCalculatorInputs, it_outsourcing_vs_in_house_cost_benefit_analysisCalculatorResults, it_outsourcing_vs_in_house_cost_benefit_analysisCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class it_outsourcing_vs_in_house_cost_benefit_analysisCalculatorCalculator implements Calculator<it_outsourcing_vs_in_house_cost_benefit_analysisCalculatorInputs, it_outsourcing_vs_in_house_cost_benefit_analysisCalculatorResults> {
  readonly id = 'it_outsourcing_vs_in_house_cost_benefit_analysisCalculator';
  readonly name = 'it_outsourcing_vs_in_house_cost_benefit_analysisCalculator Calculator';
  readonly description = 'Calculate it_outsourcing_vs_in_house_cost_benefit_analysisCalculator values';

  calculate(inputs: it_outsourcing_vs_in_house_cost_benefit_analysisCalculatorInputs): it_outsourcing_vs_in_house_cost_benefit_analysisCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: it_outsourcing_vs_in_house_cost_benefit_analysisCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: it_outsourcing_vs_in_house_cost_benefit_analysisCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
