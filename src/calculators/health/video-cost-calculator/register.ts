import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { VideoCostCalculator } from './VideoCostCalculator';

export function registerVideoCostCalculator(): void {
  calculatorRegistry.register(VideoCostCalculator);
}

export { VideoCostCalculator };
