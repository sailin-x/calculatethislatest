import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TokenVestingScheduleCalculator } from './TokenVestingScheduleCalculator';

export function registerTokenVestingScheduleCalculator(): void {
  calculatorRegistry.register(TokenVestingScheduleCalculator);
}

export { TokenVestingScheduleCalculator };
