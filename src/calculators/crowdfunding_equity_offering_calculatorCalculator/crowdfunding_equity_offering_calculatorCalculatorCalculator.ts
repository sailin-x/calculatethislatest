import { Calculator } from '../../engines/CalculatorEngine';
import { crowdfunding_equity_offering_calculatorCalculatorInputs, crowdfunding_equity_offering_calculatorCalculatorResults, crowdfunding_equity_offering_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class crowdfunding_equity_offering_calculatorCalculatorCalculator implements Calculator<crowdfunding_equity_offering_calculatorCalculatorInputs, crowdfunding_equity_offering_calculatorCalculatorResults> {
  readonly id = 'crowdfunding_equity_offering_calculatorCalculator';
  readonly name = 'crowdfunding_equity_offering_calculatorCalculator Calculator';
  readonly description = 'Calculate crowdfunding_equity_offering_calculatorCalculator values';

  calculate(inputs: crowdfunding_equity_offering_calculatorCalculatorInputs): crowdfunding_equity_offering_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: crowdfunding_equity_offering_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: crowdfunding_equity_offering_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
