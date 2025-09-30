import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { OutOfHomeOhAdvertisingRoiCalculator } from './OutOfHomeOhAdvertisingRoiCalculator';

export function registerOutOfHomeOhAdvertisingRoiCalculator(): void {
  calculatorRegistry.register(OutOfHomeOhAdvertisingRoiCalculator);
}

export { OutOfHomeOhAdvertisingRoiCalculator };
