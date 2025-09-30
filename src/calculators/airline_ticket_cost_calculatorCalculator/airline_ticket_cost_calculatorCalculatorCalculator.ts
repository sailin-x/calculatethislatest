import { Calculator } from '../../engines/CalculatorEngine';
import { airline_ticket_cost_calculatorCalculatorInputs, airline_ticket_cost_calculatorCalculatorResults, airline_ticket_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class airline_ticket_cost_calculatorCalculatorCalculator implements Calculator<airline_ticket_cost_calculatorCalculatorInputs, airline_ticket_cost_calculatorCalculatorResults> {
  readonly id = 'airline_ticket_cost_calculatorCalculator';
  readonly name = 'airline_ticket_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate airline_ticket_cost_calculatorCalculator values';

  calculate(inputs: airline_ticket_cost_calculatorCalculatorInputs): airline_ticket_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: airline_ticket_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: airline_ticket_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
