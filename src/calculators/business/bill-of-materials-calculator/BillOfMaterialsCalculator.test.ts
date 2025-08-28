import { BillOfMaterialsCalculator } from './BillOfMaterialsCalculator';

describe('BillOfMaterialsCalculator', () => {
  let calculator: BillOfMaterialsCalculator;

  beforeEach(() => {
    calculator = new BillOfMaterialsCalculator();
  });

  describe('calculate', () => {
    it('should calculate bill of materials correctly', () => {
      const inputs = {
        materials: [
          {
            name: 'Steel',
            quantity: 100,
            unitCost: 2.5,
            wasteFactor: 0.05,
            leadTime: 14,
            supplier: 'SteelCo'
          },
          {
            name: 'Aluminum',
            quantity: 50,
            unitCost: 4.0,
            wasteFactor: 0.03,
            leadTime: 7,
            supplier: 'AlumCorp'
          }
        ],
        laborCosts: {
          assembly: 25,
          machining: 35,
          finishing: 20,
          qualityControl: 30
        },
        overheadCosts: {
          utilities: 5000,
          rent: 10000,
          insurance: 2000,
          maintenance: 3000
        },
        productionVolume: 1000,
        batchSize: 100,
        setupTime: 2,
        cycleTime: 0.5,
        qualityTarget: 0.99,
        scrapRate: 0.02
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.totalMaterialCost).toBeGreaterThan(0);
      expect(result.totalLaborCost).toBeGreaterThan(0);
      expect(result.totalOverheadCost).toBeGreaterThan(0);
      expect(result.totalCost).toBeGreaterThan(0);
      expect(result.costPerUnit).toBeGreaterThan(0);
      expect(result.materialBreakdown).toBeDefined();
      expect(result.laborBreakdown).toBeDefined();
      expect(result.overheadBreakdown).toBeDefined();
      expect(result.analysis).toBeDefined();
    });

    it('should handle zero quantities', () => {
      const inputs = {
        materials: [
          {
            name: 'Steel',
            quantity: 0,
            unitCost: 2.5,
            wasteFactor: 0.05,
            leadTime: 14,
            supplier: 'SteelCo'
          }
        ],
        laborCosts: {
          assembly: 0,
          machining: 0,
          finishing: 0,
          qualityControl: 0
        },
        overheadCosts: {
          utilities: 0,
          rent: 0,
          insurance: 0,
          maintenance: 0
        },
        productionVolume: 0,
        batchSize: 0,
        setupTime: 0,
        cycleTime: 0,
        qualityTarget: 0,
        scrapRate: 0
      };

      const result = calculator.calculate(inputs);

      expect(result.totalMaterialCost).toBe(0);
      expect(result.totalLaborCost).toBe(0);
      expect(result.totalOverheadCost).toBe(0);
      expect(result.totalCost).toBe(0);
      expect(result.costPerUnit).toBe(0);
    });

    it('should handle high volume production', () => {
      const inputs = {
        materials: [
          {
            name: 'Steel',
            quantity: 10000,
            unitCost: 2.0,
            wasteFactor: 0.02,
            leadTime: 7,
            supplier: 'SteelCo'
          },
          {
            name: 'Aluminum',
            quantity: 5000,
            unitCost: 3.5,
            wasteFactor: 0.01,
            leadTime: 3,
            supplier: 'AlumCorp'
          }
        ],
        laborCosts: {
          assembly: 20,
          machining: 25,
          finishing: 15,
          qualityControl: 25
        },
        overheadCosts: {
          utilities: 20000,
          rent: 50000,
          insurance: 10000,
          maintenance: 15000
        },
        productionVolume: 100000,
        batchSize: 1000,
        setupTime: 1,
        cycleTime: 0.2,
        qualityTarget: 0.995,
        scrapRate: 0.005
      };

      const result = calculator.calculate(inputs);

      expect(result.totalMaterialCost).toBeGreaterThan(0);
      expect(result.totalLaborCost).toBeGreaterThan(0);
      expect(result.totalOverheadCost).toBeGreaterThan(0);
      expect(result.costPerUnit).toBeLessThan(10);
      expect(result.analysis.isEfficient).toBe(true);
    });
  });

  describe('validateInputs', () => {
    it('should validate required inputs', () => {
      const inputs = {
        materials: [
          {
            name: 'Steel',
            quantity: 100,
            unitCost: 2.5,
            wasteFactor: 0.05,
            leadTime: 14,
            supplier: 'SteelCo'
          }
        ],
        laborCosts: {
          assembly: 25,
          machining: 35,
          finishing: 20,
          qualityControl: 30
        },
        overheadCosts: {
          utilities: 5000,
          rent: 10000,
          insurance: 2000,
          maintenance: 3000
        },
        productionVolume: 1000,
        batchSize: 100,
        setupTime: 2,
        cycleTime: 0.5,
        qualityTarget: 0.99,
        scrapRate: 0.02
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(true);
    });

    it('should reject negative values', () => {
      const inputs = {
        materials: [
          {
            name: 'Steel',
            quantity: -100,
            unitCost: 2.5,
            wasteFactor: 0.05,
            leadTime: 14,
            supplier: 'SteelCo'
          }
        ],
        laborCosts: {
          assembly: 25,
          machining: 35,
          finishing: 20,
          qualityControl: 30
        },
        overheadCosts: {
          utilities: 5000,
          rent: 10000,
          insurance: 2000,
          maintenance: 3000
        },
        productionVolume: 1000,
        batchSize: 100,
        setupTime: 2,
        cycleTime: 0.5,
        qualityTarget: 0.99,
        scrapRate: 0.02
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Material quantity must be non-negative');
    });
  });
});
