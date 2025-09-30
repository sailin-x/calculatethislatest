import { calculatorRegistry } from '../../data/calculatorRegistry';
import { asset_based_lending_calculatorCalculatorCalculator } from './asset_based_lending_calculatorCalculatorCalculator';

export function registerasset_based_lending_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new asset_based_lending_calculatorCalculatorCalculator());
}
