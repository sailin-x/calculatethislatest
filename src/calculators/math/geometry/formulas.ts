import { Formula, CalculationResult } from '../../../types/calculator';

export interface GeometryInputs {
  calculationType: 'triangle' | 'circle' | 'rectangle' | 'polygon' | 'sphere' | 'cylinder' | 'cone' | 'trigonometry' | 'coordinate';
  sideA?: number;
  sideB?: number;
  sideC?: number;
  angleA?: number;
  angleB?: number;
  angleC?: number;
  numberOfSides?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
}

export class GeometryFormulas {
  /**
   * Convert degrees to radians
   */
  static degreesToRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }

  /**
   * Convert radians to degrees
   */
  static radiansToDegrees(radians: number): number {
    return radians * 180 / Math.PI;
  }

  /**
   * Calculate triangle properties using various methods
   */
  static calculateTriangle(a?: number, b?: number, c?: number, angleA?: number, angleB?: number, angleC?: number): {
    sides: { a: number; b: number; c: number };
    angles: { A: number; B: number; C: number };
    area: number;
    perimeter: number;
    type: string;
  } {
    let sides = { a: a || 0, b: b || 0, c: c || 0 };
    let angles = { A: angleA || 0, B: angleB || 0, C: angleC || 0 };

    // If all three sides are given (SSS)
    if (a && b && c) {
      // Use law of cosines to find angles
      angles.A = this.radiansToDegrees(Math.acos((b * b + c * c - a * a) / (2 * b * c)));
      angles.B = this.radiansToDegrees(Math.acos((a * a + c * c - b * b) / (2 * a * c)));
      angles.C = 180 - angles.A - angles.B;
    }
    // If two sides and included angle are given (SAS)
    else if (a && b && angleC) {
      const radC = this.degreesToRadians(angleC);
      sides.c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(radC));
      angles.A = this.radiansToDegrees(Math.asin(a * Math.sin(radC) / sides.c));
      angles.B = 180 - angleC - angles.A;
      angles.C = angleC;
    }
    // If two angles and one side are given (AAS or ASA)
    else if (angleA && angleB && a) {
      angles.A = angleA;
      angles.B = angleB;
      angles.C = 180 - angleA - angleB;
      
      const radA = this.degreesToRadians(angleA);
      const radB = this.degreesToRadians(angleB);
      const radC = this.degreesToRadians(angles.C);
      
      sides.a = a;
      sides.b = a * Math.sin(radB) / Math.sin(radA);
      sides.c = a * Math.sin(radC) / Math.sin(radA);
    }

    // Calculate area using Heron's formula
    const s = (sides.a + sides.b + sides.c) / 2;
    const area = Math.sqrt(s * (s - sides.a) * (s - sides.b) * (s - sides.c));
    const perimeter = sides.a + sides.b + sides.c;

    // Determine triangle type
    let type = 'Scalene';
    if (Math.abs(sides.a - sides.b) < 0.001 && Math.abs(sides.b - sides.c) < 0.001) {
      type = 'Equilateral';
    } else if (Math.abs(sides.a - sides.b) < 0.001 || Math.abs(sides.b - sides.c) < 0.001 || Math.abs(sides.a - sides.c) < 0.001) {
      type = 'Isosceles';
    }

    if (Math.abs(angles.A - 90) < 0.1 || Math.abs(angles.B - 90) < 0.1 || Math.abs(angles.C - 90) < 0.1) {
      type += ' Right';
    }

    return { sides, angles, area, perimeter, type };
  }

  /**
   * Calculate circle properties
   */
  static calculateCircle(radius: number): {
    area: number;
    circumference: number;
    diameter: number;
  } {
    return {
      area: Math.PI * radius * radius,
      circumference: 2 * Math.PI * radius,
      diameter: 2 * radius
    };
  }

  /**
   * Calculate rectangle properties
   */
  static calculateRectangle(length: number, width: number): {
    area: number;
    perimeter: number;
    diagonal: number;
  } {
    return {
      area: length * width,
      perimeter: 2 * (length + width),
      diagonal: Math.sqrt(length * length + width * width)
    };
  }

  /**
   * Calculate regular polygon properties
   */
  static calculateRegularPolygon(sides: number, sideLength: number): {
    area: number;
    perimeter: number;
    interiorAngle: number;
    exteriorAngle: number;
    apothem: number;
  } {
    const perimeter = sides * sideLength;
    const apothem = sideLength / (2 * Math.tan(Math.PI / sides));
    const area = (perimeter * apothem) / 2;
    const interiorAngle = ((sides - 2) * 180) / sides;
    const exteriorAngle = 360 / sides;

    return { area, perimeter, interiorAngle, exteriorAngle, apothem };
  }

  /**
   * Calculate sphere properties
   */
  static calculateSphere(radius: number): {
    volume: number;
    surfaceArea: number;
    diameter: number;
  } {
    return {
      volume: (4 / 3) * Math.PI * radius * radius * radius,
      surfaceArea: 4 * Math.PI * radius * radius,
      diameter: 2 * radius
    };
  }

  /**
   * Calculate cylinder properties
   */
  static calculateCylinder(radius: number, height: number): {
    volume: number;
    surfaceArea: number;
    lateralArea: number;
    baseArea: number;
  } {
    const baseArea = Math.PI * radius * radius;
    const lateralArea = 2 * Math.PI * radius * height;
    
    return {
      volume: baseArea * height,
      surfaceArea: 2 * baseArea + lateralArea,
      lateralArea,
      baseArea
    };
  }

  /**
   * Calculate cone properties
   */
  static calculateCone(radius: number, height: number): {
    volume: number;
    surfaceArea: number;
    lateralArea: number;
    baseArea: number;
    slantHeight: number;
  } {
    const baseArea = Math.PI * radius * radius;
    const slantHeight = Math.sqrt(radius * radius + height * height);
    const lateralArea = Math.PI * radius * slantHeight;
    
    return {
      volume: (1 / 3) * baseArea * height,
      surfaceArea: baseArea + lateralArea,
      lateralArea,
      baseArea,
      slantHeight
    };
  }

  /**
   * Calculate trigonometric functions
   */
  static calculateTrigonometry(angle: number, unit: 'degrees' | 'radians' = 'degrees'): {
    sin: number;
    cos: number;
    tan: number;
    csc: number;
    sec: number;
    cot: number;
  } {
    const radians = unit === 'degrees' ? this.degreesToRadians(angle) : angle;
    
    const sin = Math.sin(radians);
    const cos = Math.cos(radians);
    const tan = Math.tan(radians);
    
    return {
      sin,
      cos,
      tan,
      csc: 1 / sin,
      sec: 1 / cos,
      cot: 1 / tan
    };
  }

  /**
   * Calculate distance between two points
   */
  static calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }

  /**
   * Calculate midpoint between two points
   */
  static calculateMidpoint(x1: number, y1: number, x2: number, y2: number): { x: number; y: number } {
    return {
      x: (x1 + x2) / 2,
      y: (y1 + y2) / 2
    };
  }

  /**
   * Calculate slope between two points
   */
  static calculateSlope(x1: number, y1: number, x2: number, y2: number): number {
    if (x2 - x1 === 0) return Infinity;
    return (y2 - y1) / (x2 - x1);
  }
}

export const geometryCalculatorFormula: Formula = {
  id: 'geometry-calculator',
  name: 'Advanced Geometry & Trigonometry Calculator',
  description: 'Comprehensive geometric calculations with visual representations',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const geometryInputs = inputs as GeometryInputs;
    
    try {
      let result: any = {};
      let explanation = '';
      let steps: any = {};

      switch (geometryInputs.calculationType) {
        case 'triangle':
          const triangleResult = GeometryFormulas.calculateTriangle(
            geometryInputs.sideA,
            geometryInputs.sideB,
            geometryInputs.sideC,
            geometryInputs.angleA,
            geometryInputs.angleB,
            geometryInputs.angleC
          );
          
          result = {
            area: Math.round(triangleResult.area * 100) / 100,
            perimeter: Math.round(triangleResult.perimeter * 100) / 100,
            angles: `A: ${triangleResult.angles.A.toFixed(2)}°, B: ${triangleResult.angles.B.toFixed(2)}°, C: ${triangleResult.angles.C.toFixed(2)}°`,
            sides: `a: ${triangleResult.sides.a.toFixed(2)}, b: ${triangleResult.sides.b.toFixed(2)}, c: ${triangleResult.sides.c.toFixed(2)}`,
            type: triangleResult.type
          };
          
          explanation = `${triangleResult.type} triangle with area ${result.area} and perimeter ${result.perimeter}`;
          steps = {
            'Triangle Type': triangleResult.type,
            'Area Formula': 'Using Heron\'s formula: √(s(s-a)(s-b)(s-c))',
            'Semi-perimeter': `s = ${(triangleResult.perimeter / 2).toFixed(2)}`
          };
          break;

        case 'circle':
          if (geometryInputs.sideA) {
            const circleResult = GeometryFormulas.calculateCircle(geometryInputs.sideA);
            result = {
              area: Math.round(circleResult.area * 100) / 100,
              perimeter: Math.round(circleResult.circumference * 100) / 100,
              diameter: circleResult.diameter
            };
            explanation = `Circle with radius ${geometryInputs.sideA}`;
            steps = {
              'Area Formula': 'A = πr²',
              'Circumference Formula': 'C = 2πr',
              'Radius': geometryInputs.sideA.toString()
            };
          }
          break;

        case 'rectangle':
          if (geometryInputs.sideA && geometryInputs.sideB) {
            const rectResult = GeometryFormulas.calculateRectangle(geometryInputs.sideA, geometryInputs.sideB);
            result = {
              area: rectResult.area,
              perimeter: rectResult.perimeter,
              diagonal: Math.round(rectResult.diagonal * 100) / 100
            };
            explanation = `Rectangle with dimensions ${geometryInputs.sideA} × ${geometryInputs.sideB}`;
            steps = {
              'Area Formula': 'A = length × width',
              'Perimeter Formula': 'P = 2(length + width)',
              'Diagonal Formula': 'd = √(l² + w²)'
            };
          }
          break;

        case 'sphere':
          if (geometryInputs.sideA) {
            const sphereResult = GeometryFormulas.calculateSphere(geometryInputs.sideA);
            result = {
              volume: Math.round(sphereResult.volume * 100) / 100,
              surfaceArea: Math.round(sphereResult.surfaceArea * 100) / 100,
              diameter: sphereResult.diameter
            };
            explanation = `Sphere with radius ${geometryInputs.sideA}`;
            steps = {
              'Volume Formula': 'V = (4/3)πr³',
              'Surface Area Formula': 'SA = 4πr²',
              'Radius': geometryInputs.sideA.toString()
            };
          }
          break;

        case 'cylinder':
          if (geometryInputs.sideA && geometryInputs.sideB) {
            const cylinderResult = GeometryFormulas.calculateCylinder(geometryInputs.sideA, geometryInputs.sideB);
            result = {
              volume: Math.round(cylinderResult.volume * 100) / 100,
              surfaceArea: Math.round(cylinderResult.surfaceArea * 100) / 100,
              lateralArea: Math.round(cylinderResult.lateralArea * 100) / 100,
              baseArea: Math.round(cylinderResult.baseArea * 100) / 100
            };
            explanation = `Cylinder with radius ${geometryInputs.sideA} and height ${geometryInputs.sideB}`;
            steps = {
              'Volume Formula': 'V = πr²h',
              'Surface Area Formula': 'SA = 2πr² + 2πrh',
              'Base Area': `πr² = ${result.baseArea}`
            };
          }
          break;

        case 'trigonometry':
          if (geometryInputs.angleA) {
            const trigResult = GeometryFormulas.calculateTrigonometry(geometryInputs.angleA);
            result = {
              sin: Math.round(trigResult.sin * 10000) / 10000,
              cos: Math.round(trigResult.cos * 10000) / 10000,
              tan: Math.round(trigResult.tan * 10000) / 10000,
              csc: Math.round(trigResult.csc * 10000) / 10000,
              sec: Math.round(trigResult.sec * 10000) / 10000,
              cot: Math.round(trigResult.cot * 10000) / 10000
            };
            explanation = `Trigonometric functions for angle ${geometryInputs.angleA}°`;
            steps = {
              'Angle (radians)': (geometryInputs.angleA * Math.PI / 180).toFixed(4),
              'Primary Functions': `sin, cos, tan`,
              'Reciprocal Functions': `csc = 1/sin, sec = 1/cos, cot = 1/tan`
            };
          }
          break;
      }

      return {
        outputs: result,
        explanation,
        intermediateSteps: steps
      };
    } catch (error) {
      throw new Error(`Geometry calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};