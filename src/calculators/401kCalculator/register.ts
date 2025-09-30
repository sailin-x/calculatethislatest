import { calculatorRegistry } from '../../data/calculatorRegistry';
import { Four01kCalculatorCalculator } from './Four01kCalculatorCalculator';

export function registerFour01kCalculatorCalculator(): void {
  calculatorRegistry.register(new Four01kCalculatorCalculator());
}
