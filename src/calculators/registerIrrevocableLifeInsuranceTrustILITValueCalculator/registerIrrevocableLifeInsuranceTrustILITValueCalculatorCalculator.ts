import { Calculator } from '../../engines/CalculatorEngine';
import { registerIrrevocableLifeInsuranceTrustILITValueCalculatorInputs, registerIrrevocableLifeInsuranceTrustILITValueCalculatorResults, registerIrrevocableLifeInsuranceTrustILITValueCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerIrrevocableLifeInsuranceTrustILITValueCalculatorCalculator implements Calculator<registerIrrevocableLifeInsuranceTrustILITValueCalculatorInputs, registerIrrevocableLifeInsuranceTrustILITValueCalculatorResults> {
  readonly id = 'registerIrrevocableLifeInsuranceTrustILITValueCalculator';
  readonly name = 'registerIrrevocableLifeInsuranceTrustILITValueCalculator Calculator';
  readonly description = 'Calculate registerIrrevocableLifeInsuranceTrustILITValueCalculator values';

  calculate(inputs: registerIrrevocableLifeInsuranceTrustILITValueCalculatorInputs): registerIrrevocableLifeInsuranceTrustILITValueCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerIrrevocableLifeInsuranceTrustILITValueCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerIrrevocableLifeInsuranceTrustILITValueCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
