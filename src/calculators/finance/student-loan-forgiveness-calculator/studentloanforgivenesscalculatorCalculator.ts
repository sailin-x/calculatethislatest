import { Calculator } from '../../engines/CalculatorEngine';
import { studentloanforgivenesscalculatorCalculatorInputs, studentloanforgivenesscalculatorCalculatorOutputs } from './types';
import { calculatestudentloanforgivenesscalculatorCalculatorResults } from './formulas';
import { validatestudentloanforgivenesscalculatorCalculatorInputs } from './validation';

export class studentloanforgivenesscalculatorCalculator implements Calculator<
  studentloanforgivenesscalculatorCalculatorInputs,
  studentloanforgivenesscalculatorCalculatorOutputs
> {
  readonly id = 'student_loan_forgiveness_calculator_calculator';
  readonly name = 'student loan forgiveness calculator Calculator';
  readonly description = 'Professional student loan forgiveness calculator calculator with domain-specific functionality';

  calculate(inputs: studentloanforgivenesscalculatorCalculatorInputs): studentloanforgivenesscalculatorCalculatorOutputs {
    const validation = validatestudentloanforgivenesscalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatestudentloanforgivenesscalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: studentloanforgivenesscalculatorCalculatorInputs): boolean {
    const validation = validatestudentloanforgivenesscalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
