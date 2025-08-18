import { Formula, CalculationResult } from '../../../types/calculator';

export interface UnitConversionInputs {
  category: 'length' | 'weight' | 'temperature' | 'volume' | 'area' | 'speed' | 'pressure' | 'energy' | 'time' | 'digital';
  fromUnit: string;
  toUnit: string;
  value: number;
  precision: number;
}

export interface ConversionDefinition {
  name: string;
  symbol: string;
  toBase: number; // Factor to convert to base unit
  offset?: number; // For temperature conversions
}

export class UnitConversionFormulas {
  // Base units for each category
  private static readonly baseUnits = {
    length: 'meter',
    weight: 'kilogram',
    temperature: 'celsius',
    volume: 'liter',
    area: 'square_meter',
    speed: 'meter_per_second',
    pressure: 'pascal',
    energy: 'joule',
    time: 'second',
    digital: 'byte'
  };

  // Comprehensive unit definitions
  private static readonly unitDefinitions: Record<string, Record<string, ConversionDefinition>> = {
    length: {
      // Metric
      meter: { name: 'Meter', symbol: 'm', toBase: 1 },
      kilometer: { name: 'Kilometer', symbol: 'km', toBase: 1000 },
      centimeter: { name: 'Centimeter', symbol: 'cm', toBase: 0.01 },
      millimeter: { name: 'Millimeter', symbol: 'mm', toBase: 0.001 },
      micrometer: { name: 'Micrometer', symbol: 'μm', toBase: 0.000001 },
      nanometer: { name: 'Nanometer', symbol: 'nm', toBase: 0.000000001 },
      
      // Imperial
      inch: { name: 'Inch', symbol: 'in', toBase: 0.0254 },
      foot: { name: 'Foot', symbol: 'ft', toBase: 0.3048 },
      yard: { name: 'Yard', symbol: 'yd', toBase: 0.9144 },
      mile: { name: 'Mile', symbol: 'mi', toBase: 1609.344 },
      
      // Nautical
      nautical_mile: { name: 'Nautical Mile', symbol: 'nmi', toBase: 1852 },
      
      // Astronomical
      light_year: { name: 'Light Year', symbol: 'ly', toBase: 9.461e15 },
      astronomical_unit: { name: 'Astronomical Unit', symbol: 'AU', toBase: 1.496e11 }
    },

    weight: {
      // Metric
      kilogram: { name: 'Kilogram', symbol: 'kg', toBase: 1 },
      gram: { name: 'Gram', symbol: 'g', toBase: 0.001 },
      milligram: { name: 'Milligram', symbol: 'mg', toBase: 0.000001 },
      metric_ton: { name: 'Metric Ton', symbol: 't', toBase: 1000 },
      
      // Imperial
      pound: { name: 'Pound', symbol: 'lb', toBase: 0.453592 },
      ounce: { name: 'Ounce', symbol: 'oz', toBase: 0.0283495 },
      stone: { name: 'Stone', symbol: 'st', toBase: 6.35029 },
      ton: { name: 'Ton (US)', symbol: 'ton', toBase: 907.185 },
      
      // Troy
      troy_ounce: { name: 'Troy Ounce', symbol: 'oz t', toBase: 0.0311035 },
      troy_pound: { name: 'Troy Pound', symbol: 'lb t', toBase: 0.373242 }
    },

    temperature: {
      celsius: { name: 'Celsius', symbol: '°C', toBase: 1, offset: 0 },
      fahrenheit: { name: 'Fahrenheit', symbol: '°F', toBase: 5/9, offset: -32 },
      kelvin: { name: 'Kelvin', symbol: 'K', toBase: 1, offset: -273.15 },
      rankine: { name: 'Rankine', symbol: '°R', toBase: 5/9, offset: -459.67 }
    },

    volume: {
      // Metric
      liter: { name: 'Liter', symbol: 'L', toBase: 1 },
      milliliter: { name: 'Milliliter', symbol: 'mL', toBase: 0.001 },
      cubic_meter: { name: 'Cubic Meter', symbol: 'm³', toBase: 1000 },
      cubic_centimeter: { name: 'Cubic Centimeter', symbol: 'cm³', toBase: 0.001 },
      
      // Imperial
      gallon_us: { name: 'Gallon (US)', symbol: 'gal', toBase: 3.78541 },
      gallon_uk: { name: 'Gallon (UK)', symbol: 'gal', toBase: 4.54609 },
      quart_us: { name: 'Quart (US)', symbol: 'qt', toBase: 0.946353 },
      pint_us: { name: 'Pint (US)', symbol: 'pt', toBase: 0.473176 },
      cup_us: { name: 'Cup (US)', symbol: 'cup', toBase: 0.236588 },
      fluid_ounce_us: { name: 'Fluid Ounce (US)', symbol: 'fl oz', toBase: 0.0295735 },
      tablespoon: { name: 'Tablespoon', symbol: 'tbsp', toBase: 0.0147868 },
      teaspoon: { name: 'Teaspoon', symbol: 'tsp', toBase: 0.00492892 }
    },

    area: {
      square_meter: { name: 'Square Meter', symbol: 'm²', toBase: 1 },
      square_kilometer: { name: 'Square Kilometer', symbol: 'km²', toBase: 1000000 },
      square_centimeter: { name: 'Square Centimeter', symbol: 'cm²', toBase: 0.0001 },
      hectare: { name: 'Hectare', symbol: 'ha', toBase: 10000 },
      
      square_foot: { name: 'Square Foot', symbol: 'ft²', toBase: 0.092903 },
      square_inch: { name: 'Square Inch', symbol: 'in²', toBase: 0.00064516 },
      square_yard: { name: 'Square Yard', symbol: 'yd²', toBase: 0.836127 },
      acre: { name: 'Acre', symbol: 'ac', toBase: 4046.86 },
      square_mile: { name: 'Square Mile', symbol: 'mi²', toBase: 2589988 }
    },

    speed: {
      meter_per_second: { name: 'Meter per Second', symbol: 'm/s', toBase: 1 },
      kilometer_per_hour: { name: 'Kilometer per Hour', symbol: 'km/h', toBase: 0.277778 },
      mile_per_hour: { name: 'Mile per Hour', symbol: 'mph', toBase: 0.44704 },
      foot_per_second: { name: 'Foot per Second', symbol: 'ft/s', toBase: 0.3048 },
      knot: { name: 'Knot', symbol: 'kn', toBase: 0.514444 },
      mach: { name: 'Mach', symbol: 'M', toBase: 343 } // At sea level
    },

    pressure: {
      pascal: { name: 'Pascal', symbol: 'Pa', toBase: 1 },
      kilopascal: { name: 'Kilopascal', symbol: 'kPa', toBase: 1000 },
      bar: { name: 'Bar', symbol: 'bar', toBase: 100000 },
      atmosphere: { name: 'Atmosphere', symbol: 'atm', toBase: 101325 },
      psi: { name: 'Pounds per Square Inch', symbol: 'psi', toBase: 6894.76 },
      torr: { name: 'Torr', symbol: 'Torr', toBase: 133.322 },
      mmhg: { name: 'Millimeter of Mercury', symbol: 'mmHg', toBase: 133.322 }
    },

    energy: {
      joule: { name: 'Joule', symbol: 'J', toBase: 1 },
      kilojoule: { name: 'Kilojoule', symbol: 'kJ', toBase: 1000 },
      calorie: { name: 'Calorie', symbol: 'cal', toBase: 4.184 },
      kilocalorie: { name: 'Kilocalorie', symbol: 'kcal', toBase: 4184 },
      watt_hour: { name: 'Watt Hour', symbol: 'Wh', toBase: 3600 },
      kilowatt_hour: { name: 'Kilowatt Hour', symbol: 'kWh', toBase: 3600000 },
      btu: { name: 'British Thermal Unit', symbol: 'BTU', toBase: 1055.06 }
    },

    time: {
      second: { name: 'Second', symbol: 's', toBase: 1 },
      minute: { name: 'Minute', symbol: 'min', toBase: 60 },
      hour: { name: 'Hour', symbol: 'h', toBase: 3600 },
      day: { name: 'Day', symbol: 'd', toBase: 86400 },
      week: { name: 'Week', symbol: 'wk', toBase: 604800 },
      month: { name: 'Month', symbol: 'mo', toBase: 2629746 }, // Average month
      year: { name: 'Year', symbol: 'yr', toBase: 31556952 }, // Average year
      millisecond: { name: 'Millisecond', symbol: 'ms', toBase: 0.001 },
      microsecond: { name: 'Microsecond', symbol: 'μs', toBase: 0.000001 },
      nanosecond: { name: 'Nanosecond', symbol: 'ns', toBase: 0.000000001 }
    },

    digital: {
      byte: { name: 'Byte', symbol: 'B', toBase: 1 },
      kilobyte: { name: 'Kilobyte', symbol: 'KB', toBase: 1024 },
      megabyte: { name: 'Megabyte', symbol: 'MB', toBase: 1048576 },
      gigabyte: { name: 'Gigabyte', symbol: 'GB', toBase: 1073741824 },
      terabyte: { name: 'Terabyte', symbol: 'TB', toBase: 1099511627776 },
      petabyte: { name: 'Petabyte', symbol: 'PB', toBase: 1125899906842624 },
      bit: { name: 'Bit', symbol: 'bit', toBase: 0.125 },
      kilobit: { name: 'Kilobit', symbol: 'Kbit', toBase: 128 },
      megabit: { name: 'Megabit', symbol: 'Mbit', toBase: 131072 },
      gigabit: { name: 'Gigabit', symbol: 'Gbit', toBase: 134217728 }
    }
  };

  /**
   * Get available units for a category
   */
  static getUnitsForCategory(category: string): ConversionDefinition[] {
    const units = this.unitDefinitions[category];
    if (!units) return [];
    
    return Object.entries(units).map(([key, def]) => ({
      ...def,
      key
    })) as (ConversionDefinition & { key: string })[];
  }

  /**
   * Convert between units
   */
  static convert(value: number, fromUnit: string, toUnit: string, category: string): {
    result: number;
    formula: string;
    conversionFactor: number;
    reverseFormula: string;
  } {
    const categoryUnits = this.unitDefinitions[category];
    if (!categoryUnits) {
      throw new Error(`Unknown category: ${category}`);
    }

    const fromDef = categoryUnits[fromUnit];
    const toDef = categoryUnits[toUnit];
    
    if (!fromDef || !toDef) {
      throw new Error(`Unknown unit in category ${category}`);
    }

    let result: number;
    let formula: string;
    let conversionFactor: number;

    if (category === 'temperature') {
      // Special handling for temperature conversions
      result = this.convertTemperature(value, fromUnit, toUnit);
      formula = this.getTemperatureFormula(fromUnit, toUnit);
      conversionFactor = 1; // Temperature conversions don't have simple factors
    } else {
      // Standard conversion through base unit
      const baseValue = value * fromDef.toBase;
      result = baseValue / toDef.toBase;
      conversionFactor = fromDef.toBase / toDef.toBase;
      formula = `1 ${fromDef.name} = ${conversionFactor} ${toDef.name}`;
    }

    const reverseFormula = category === 'temperature' ? 
      this.getTemperatureFormula(toUnit, fromUnit) :
      `1 ${toDef.name} = ${(1 / conversionFactor).toFixed(8)} ${fromDef.name}`;

    return { result, formula, conversionFactor, reverseFormula };
  }

  /**
   * Convert temperature between units
   */
  private static convertTemperature(value: number, fromUnit: string, toUnit: string): number {
    // Convert to Celsius first
    let celsius: number;
    
    switch (fromUnit) {
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = (value - 32) * 5/9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      case 'rankine':
        celsius = (value - 491.67) * 5/9;
        break;
      default:
        throw new Error(`Unknown temperature unit: ${fromUnit}`);
    }

    // Convert from Celsius to target unit
    switch (toUnit) {
      case 'celsius':
        return celsius;
      case 'fahrenheit':
        return celsius * 9/5 + 32;
      case 'kelvin':
        return celsius + 273.15;
      case 'rankine':
        return celsius * 9/5 + 491.67;
      default:
        throw new Error(`Unknown temperature unit: ${toUnit}`);
    }
  }

  /**
   * Get temperature conversion formula
   */
  private static getTemperatureFormula(fromUnit: string, toUnit: string): string {
    const formulas: Record<string, Record<string, string>> = {
      celsius: {
        fahrenheit: '°F = (°C × 9/5) + 32',
        kelvin: 'K = °C + 273.15',
        rankine: '°R = (°C × 9/5) + 491.67'
      },
      fahrenheit: {
        celsius: '°C = (°F - 32) × 5/9',
        kelvin: 'K = (°F - 32) × 5/9 + 273.15',
        rankine: '°R = °F + 459.67'
      },
      kelvin: {
        celsius: '°C = K - 273.15',
        fahrenheit: '°F = (K - 273.15) × 9/5 + 32',
        rankine: '°R = K × 9/5'
      },
      rankine: {
        celsius: '°C = (°R - 491.67) × 5/9',
        fahrenheit: '°F = °R - 459.67',
        kelvin: 'K = °R × 5/9'
      }
    };

    return formulas[fromUnit]?.[toUnit] || `${fromUnit} to ${toUnit}`;
  }

  /**
   * Get common equivalent values
   */
  static getCommonEquivalents(value: number, unit: string, category: string): string[] {
    const categoryUnits = this.unitDefinitions[category];
    if (!categoryUnits || !categoryUnits[unit]) return [];

    const equivalents: string[] = [];
    const commonUnits = this.getCommonUnitsForCategory(category);
    
    for (const commonUnit of commonUnits) {
      if (commonUnit !== unit) {
        try {
          const conversion = this.convert(value, unit, commonUnit, category);
          const unitDef = categoryUnits[commonUnit];
          equivalents.push(`${conversion.result.toFixed(4)} ${unitDef.symbol}`);
        } catch (error) {
          // Skip if conversion fails
        }
      }
    }

    return equivalents.slice(0, 5); // Return top 5 equivalents
  }

  /**
   * Get common units for each category
   */
  private static getCommonUnitsForCategory(category: string): string[] {
    const commonUnits: Record<string, string[]> = {
      length: ['meter', 'foot', 'inch', 'kilometer', 'mile'],
      weight: ['kilogram', 'pound', 'gram', 'ounce'],
      temperature: ['celsius', 'fahrenheit', 'kelvin'],
      volume: ['liter', 'gallon_us', 'milliliter', 'cup_us'],
      area: ['square_meter', 'square_foot', 'hectare', 'acre'],
      speed: ['meter_per_second', 'kilometer_per_hour', 'mile_per_hour'],
      pressure: ['pascal', 'bar', 'psi', 'atmosphere'],
      energy: ['joule', 'calorie', 'kilowatt_hour', 'btu'],
      time: ['second', 'minute', 'hour', 'day'],
      digital: ['byte', 'kilobyte', 'megabyte', 'gigabyte']
    };

    return commonUnits[category] || [];
  }
}

export const unitConversionCalculatorFormula: Formula = {
  id: 'unit-conversion-calculator',
  name: 'Comprehensive Unit Conversion System',
  description: 'Complete unit conversion system supporting all measurement systems',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const conversionInputs = inputs as UnitConversionInputs;
    
    try {
      const conversion = UnitConversionFormulas.convert(
        conversionInputs.value,
        conversionInputs.fromUnit,
        conversionInputs.toUnit,
        conversionInputs.category
      );

      const precision = conversionInputs.precision || 6;
      const result = Number(conversion.result.toFixed(precision));
      
      const commonEquivalents = UnitConversionFormulas.getCommonEquivalents(
        conversionInputs.value,
        conversionInputs.fromUnit,
        conversionInputs.category
      );

      return {
        outputs: {
          result,
          formula: conversion.formula,
          conversionFactor: conversion.conversionFactor,
          reverseConversion: conversion.reverseFormula,
          commonEquivalents: commonEquivalents.join(', ') || 'None available'
        },
        explanation: `Converted ${conversionInputs.value} ${conversionInputs.fromUnit} to ${result} ${conversionInputs.toUnit}`,
        intermediateSteps: {
          'Original Value': `${conversionInputs.value} ${conversionInputs.fromUnit}`,
          'Conversion Method': conversionInputs.category === 'temperature' ? 'Temperature formula' : 'Base unit conversion',
          'Formula Used': conversion.formula,
          'Final Result': `${result} ${conversionInputs.toUnit}`
        }
      };
    } catch (error) {
      throw new Error(`Unit conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};