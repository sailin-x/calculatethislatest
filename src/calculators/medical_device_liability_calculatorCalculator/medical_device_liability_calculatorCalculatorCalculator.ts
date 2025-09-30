import { Calculator } from '../../engines/CalculatorEngine';
import { medical_device_liability_calculatorCalculatorInputs, medical_device_liability_calculatorCalculatorResults, medical_device_liability_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class medical_device_liability_calculatorCalculatorCalculator implements Calculator<medical_device_liability_calculatorCalculatorInputs, medical_device_liability_calculatorCalculatorResults> {
  readonly id = 'medical_device_liability_calculatorCalculator';
  readonly name = 'medical_device_liability_calculatorCalculator Calculator';
  readonly description = 'Calculate medical_device_liability_calculatorCalculator values';

  calculate(inputs: medical_device_liability_calculatorCalculatorInputs): medical_device_liability_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: medical_device_liability_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: medical_device_liability_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
