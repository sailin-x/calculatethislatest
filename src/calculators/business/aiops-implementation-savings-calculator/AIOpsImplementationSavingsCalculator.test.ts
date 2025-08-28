import { AIOpsImplementationSavingsCalculator } from './AIOpsImplementationSavingsCalculator';

describe('AIOpsImplementationSavingsCalculator', () => {
  let calculator: AIOpsImplementationSavingsCalculator;

  beforeEach(() => {
    calculator = new AIOpsImplementationSavingsCalculator();
  });

  describe('calculate', () => {
    it('should calculate AIOps implementation savings correctly', () => {
      const inputs = {
        currentManualProcesses: 50,
        averageTimePerProcess: 2,
        hourlyLaborCost: 50,
        incidentsPerMonth: 100,
        averageResolutionTime: 4,
        downtimeCostPerHour: 1000,
        automationEfficiency: 0.8,
        implementationCost: 50000,
        maintenanceCost: 10000,
        trainingCost: 15000,
        softwareLicensingCost: 25000,
        expectedUptimeImprovement: 0.05,
        currentUptime: 0.95,
        teamSize: 10,
        salaryPerEmployee: 80000,
        productivityImprovement: 0.2,
        errorReduction: 0.3,
        complianceCostSavings: 20000,
        energyCostSavings: 5000
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.totalSavings).toBeGreaterThan(0);
      expect(result.implementationCost).toBeGreaterThan(0);
      expect(result.netSavings).toBeDefined();
      expect(result.paybackPeriod).toBeGreaterThan(0);
      expect(result.roi).toBeDefined();
      expect(result.annualSavings).toBeGreaterThan(0);
      expect(result.laborSavings).toBeGreaterThan(0);
      expect(result.downtimeSavings).toBeGreaterThan(0);
      expect(result.productivitySavings).toBeGreaterThan(0);
      expect(result.errorSavings).toBeGreaterThan(0);
      expect(result.complianceSavings).toBeGreaterThan(0);
      expect(result.energySavings).toBeGreaterThan(0);
      expect(result.analysis).toBeDefined();
    });

    it('should handle zero values', () => {
      const inputs = {
        currentManualProcesses: 0,
        averageTimePerProcess: 0,
        hourlyLaborCost: 0,
        incidentsPerMonth: 0,
        averageResolutionTime: 0,
        downtimeCostPerHour: 0,
        automationEfficiency: 0,
        implementationCost: 0,
        maintenanceCost: 0,
        trainingCost: 0,
        softwareLicensingCost: 0,
        expectedUptimeImprovement: 0,
        currentUptime: 0,
        teamSize: 0,
        salaryPerEmployee: 0,
        productivityImprovement: 0,
        errorReduction: 0,
        complianceCostSavings: 0,
        energyCostSavings: 0
      };

      const result = calculator.calculate(inputs);

      expect(result.totalSavings).toBe(0);
      expect(result.implementationCost).toBe(0);
      expect(result.netSavings).toBe(0);
      expect(result.paybackPeriod).toBe(0);
      expect(result.roi).toBe(0);
      expect(result.annualSavings).toBe(0);
      expect(result.laborSavings).toBe(0);
      expect(result.downtimeSavings).toBe(0);
      expect(result.productivitySavings).toBe(0);
      expect(result.errorSavings).toBe(0);
      expect(result.complianceSavings).toBe(0);
      expect(result.energySavings).toBe(0);
    });

    it('should handle high efficiency scenario', () => {
      const inputs = {
        currentManualProcesses: 100,
        averageTimePerProcess: 4,
        hourlyLaborCost: 75,
        incidentsPerMonth: 200,
        averageResolutionTime: 6,
        downtimeCostPerHour: 5000,
        automationEfficiency: 0.95,
        implementationCost: 100000,
        maintenanceCost: 20000,
        trainingCost: 25000,
        softwareLicensingCost: 50000,
        expectedUptimeImprovement: 0.1,
        currentUptime: 0.90,
        teamSize: 20,
        salaryPerEmployee: 100000,
        productivityImprovement: 0.4,
        errorReduction: 0.5,
        complianceCostSavings: 50000,
        energyCostSavings: 15000
      };

      const result = calculator.calculate(inputs);

      expect(result.automationEfficiency).toBeGreaterThan(0.9);
      expect(result.totalSavings).toBeGreaterThan(result.implementationCost);
      expect(result.netSavings).toBeGreaterThan(0);
      expect(result.roi).toBeGreaterThan(1);
      expect(result.paybackPeriod).toBeLessThan(12);
      expect(result.analysis.isFeasible).toBe(true);
    });
  });

  describe('validateInputs', () => {
    it('should validate required inputs', () => {
      const inputs = {
        currentManualProcesses: 50,
        averageTimePerProcess: 2,
        hourlyLaborCost: 50,
        incidentsPerMonth: 100,
        averageResolutionTime: 4,
        downtimeCostPerHour: 1000,
        automationEfficiency: 0.8,
        implementationCost: 50000,
        maintenanceCost: 10000,
        trainingCost: 15000,
        softwareLicensingCost: 25000,
        expectedUptimeImprovement: 0.05,
        currentUptime: 0.95,
        teamSize: 10,
        salaryPerEmployee: 80000,
        productivityImprovement: 0.2,
        errorReduction: 0.3,
        complianceCostSavings: 20000,
        energyCostSavings: 5000
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(true);
    });

    it('should reject negative values', () => {
      const inputs = {
        currentManualProcesses: -50,
        averageTimePerProcess: 2,
        hourlyLaborCost: 50,
        incidentsPerMonth: 100,
        averageResolutionTime: 4,
        downtimeCostPerHour: 1000,
        automationEfficiency: 0.8,
        implementationCost: 50000,
        maintenanceCost: 10000,
        trainingCost: 15000,
        softwareLicensingCost: 25000,
        expectedUptimeImprovement: 0.05,
        currentUptime: 0.95,
        teamSize: 10,
        salaryPerEmployee: 80000,
        productivityImprovement: 0.2,
        errorReduction: 0.3,
        complianceCostSavings: 20000,
        energyCostSavings: 5000
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Current manual processes must be non-negative');
    });
  });
});
