# Design Document

## Overview

The calculatethis.ai platform will be a React-based web application featuring hundreds of industry-leading calculators across 7 major categories. Each calculator will be a specialized tool that delivers professional-grade functionality with real-world accuracy and comprehensive features that match or exceed industry standards.

## Calculator Implementation Framework

### Autonomous Implementation Process

Each calculator will be implemented following this exact 8-step framework to ensure industry-leading quality and consistency:

#### Step 1: Calculator Definition & Research
1. **Research Industry Standards**: Study professional tools, regulatory requirements, and industry best practices
2. **Define Calculator Specification**: Create detailed spec with inputs, outputs, formulas, and validation rules
3. **Identify Edge Cases**: Document boundary conditions, error scenarios, and special cases
4. **Validate Requirements**: Ensure calculator meets or exceeds advertised capabilities

#### Step 2: Formula Implementation
1. **Create Formula File**: `src/calculators/[category]/[calculator-name]/formulas.ts`
2. **Implement Core Calculations**: Industry-standard mathematical formulas with proper precision
3. **Add Advanced Features**: Complex scenarios, multiple calculation methods, optimization algorithms
4. **Include Intermediate Steps**: Detailed breakdown for user understanding and transparency

#### Step 3: Validation Rules Creation
1. **Define Input Constraints**: Realistic bounds, format requirements, business rules
2. **Implement Cross-Field Validation**: Complex interdependent validation logic
3. **Add Industry-Specific Rules**: Regulatory compliance, professional standards
4. **Create Contextual Help**: Smart suggestions and guidance for users

#### Step 4: Calculator Registration
1. **Create Calculator Definition**: Complete Calculator interface implementation
2. **Register with System**: Add to calculatorRegistry with proper categorization
3. **Configure Routing**: Ensure calculator is discoverable and accessible
4. **Set Up Examples**: Real-world usage examples with expected results

#### Step 5: Testing & Validation
1. **Unit Tests**: Test all formulas against known benchmarks and edge cases
2. **Integration Tests**: End-to-end calculator workflow testing
3. **Professional Validation**: Compare results with industry-standard tools
4. **Accuracy Verification**: Ensure results match professional-grade expectations

#### Step 6: User Experience Enhancement
1. **Input Optimization**: Smart defaults, helpful placeholders, intuitive ordering
2. **Output Formatting**: Professional presentation with proper precision and units
3. **Explanations**: Clear methodology explanations and calculation breakdowns
4. **Visual Enhancements**: Charts, graphs, and visual aids where appropriate

#### Step 7: Documentation & Examples
1. **Usage Instructions**: Step-by-step guidance for optimal calculator use
2. **Real-World Examples**: Multiple scenarios covering common use cases
3. **Professional Context**: When and why to use this calculator
4. **Limitations & Disclaimers**: Appropriate professional disclaimers

#### Step 8: Quality Assurance & Completion
1. **Final Testing**: Comprehensive testing across all scenarios
2. **Performance Optimization**: Ensure fast calculation and smooth UX
3. **Accessibility Compliance**: Screen reader support, keyboard navigation
4. **Task Completion**: Mark task as complete and move to next calculator

### Implementation Standards

#### Code Organization
```
src/calculators/
├── finance/
│   ├── mortgage/
│   │   ├── MortgageCalculator.ts
│   │   ├── formulas.ts
│   │   ├── validation.ts
│   │   └── examples.ts
│   ├── investment/
│   └── retirement/
├── health/
├── business/
├── construction/
├── legal/
├── math/
└── lifestyle/
```

#### Quality Requirements
- **Accuracy**: Results must match or exceed industry-standard tools (±0.01% tolerance)
- **Performance**: Calculations complete in <100ms for complex scenarios
- **Validation**: Comprehensive input validation with helpful error messages
- **Documentation**: Complete usage instructions and real-world examples
- **Testing**: 100% test coverage for all calculation paths

#### Professional Standards
- **Financial Calculators**: Must comply with CFPB guidelines and industry regulations
- **Health Calculators**: Use medically validated formulas and appropriate disclaimers
- **Business Calculators**: Follow accounting standards and business best practices
- **Legal Calculators**: Incorporate jurisdiction-specific rules and legal precedents
- **Construction Calculators**: Use building codes and engineering standards

### Autonomous Execution Protocol

#### Task Progression Rules
1. **Sequential Execution**: Complete one calculator fully before starting the next
2. **Quality Gates**: Each step must meet quality standards before proceeding
3. **Validation Checkpoints**: Verify accuracy against industry benchmarks
4. **Documentation Requirements**: Complete all documentation before task completion
5. **Testing Standards**: All tests must pass before marking task complete

#### Completion Criteria
Each calculator is considered complete when:
- ✅ All formulas implemented with industry-standard accuracy
- ✅ Comprehensive validation rules with contextual help
- ✅ Professional-quality user interface and experience
- ✅ Complete test coverage with passing tests
- ✅ Real-world examples and usage documentation
- ✅ Performance meets optimization standards
- ✅ Accessibility compliance verified
- ✅ Task marked complete in task tracking system

#### Autonomous Workflow
1. **Start Task**: Mark current task as "in_progress"
2. **Implement Calculator**: Follow 8-step framework systematically
3. **Validate Quality**: Ensure all completion criteria are met
4. **Complete Task**: Mark task as "completed" 
5. **Begin Next Task**: Automatically proceed to next calculator in sequence
6. **Continue Until Complete**: Repeat process for all 17 tasks

This framework ensures every calculator delivers on its advertised promise with professional-grade accuracy, comprehensive features, and industry-leading quality.

## Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Calculator     │    │   Data Layer    │
│   - Navigation   │◄──►│  Engine Core    │◄──►│   - Formulas    │
│   - UI Components│    │  - Validation   │    │   - Constants   │
│   - State Mgmt   │    │  - Computation  │    │   - Lookup Data │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Stack

- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context + useReducer for complex calculators
- **Routing**: React Router for navigation
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library
- **Deployment**: Static hosting (Vercel/Netlify)

## Components and Interfaces

### Core Calculator Framework

```typescript
interface Calculator {
  id: string;
  title: string;
  category: CalculatorCategory;
  subcategory?: string;
  description: string;
  usageInstructions: string[];
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  formulas: Formula[];
  validationRules: ValidationRule[];
  examples: CalculatorExample[];
}

interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'currency' | 'percentage' | 'date' | 'select' | 'boolean';
  required: boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: SelectOption[];
  tooltip?: string;
  placeholder?: string;
}

interface CalculatorOutput {
  id: string;
  label: string;
  type: 'currency' | 'percentage' | 'number' | 'text' | 'chart';
  format?: string;
  explanation?: string;
}
```

### Category-Specific Implementations

#### Finance & Investment Calculators

**Mortgage Calculator Example (Industry-Leading Features):**
- Support for multiple loan types (conventional, FHA, VA, USDA, jumbo)
- PMI calculations with automatic removal thresholds
- Property tax and insurance integration
- Amortization schedules with extra payment scenarios
- Regional cost-of-living adjustments
- Down payment assistance program integration
- Refinancing break-even analysis

```typescript
interface MortgageCalculatorInputs {
  homePrice: number;
  downPayment: number;
  loanTerm: number; // months
  interestRate: number;
  propertyTax: number; // annual
  homeInsurance: number; // annual
  pmiRate?: number;
  hoaFees?: number; // monthly
  loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo';
  zipCode?: string; // for regional adjustments
}
```

**Investment Portfolio Calculator Features:**
- Modern Portfolio Theory optimization
- Risk-adjusted returns (Sharpe, Sortino, Calmar ratios)
- Monte Carlo simulations for retirement planning
- Tax-loss harvesting optimization
- Asset allocation rebalancing strategies
- Factor-based investing analysis

#### Legal & Insurance Calculators

**Personal Injury Settlement Calculator (Industry-Leading Features):**
- Jurisdiction-specific multiplier tables
- Medical cost inflation projections
- Lost wage calculations with career progression
- Pain and suffering valuation matrices
- Comparative negligence adjustments
- Structured settlement vs. lump sum analysis

```typescript
interface PersonalInjuryInputs {
  medicalCosts: {
    past: number;
    future: number;
    lifeCareCost?: number;
  };
  lostWages: {
    past: number;
    future: number;
    careerProgression: number; // annual increase %
  };
  jurisdiction: string;
  injurySeverity: 'minor' | 'moderate' | 'severe' | 'catastrophic';
  comparativeNegligence?: number; // percentage
  ageAtInjury: number;
  lifeExpectancy: number;
}
```

#### Business Operations Calculators

**SaaS Metrics Calculator (Industry-Leading Features):**
- Cohort-based LTV analysis
- Churn prediction modeling
- Unit economics optimization
- CAC payback period by channel
- Net revenue retention tracking
- Rule of 40 compliance monitoring

```typescript
interface SaaSMetricsInputs {
  monthlyRecurringRevenue: number;
  customerAcquisitionCost: number;
  churnRate: {
    monthly: number;
    annual: number;
  };
  averageRevenuePerUser: number;
  grossMargin: number;
  cohortData?: CohortData[];
  acquisitionChannels: AcquisitionChannel[];
}
```

### Calculator Engine Core

```typescript
class CalculatorEngine {
  private validators: Map<string, ValidationRule[]>;
  private formulas: Map<string, Formula>;
  private constants: Map<string, any>;

  validate(inputs: Record<string, any>, rules: ValidationRule[]): ValidationResult {
    // Industry-specific validation logic
    // Real-world constraints and business rules
  }

  calculate(inputs: Record<string, any>, formula: Formula): CalculationResult {
    // Precise calculations using industry-standard formulas
    // Error handling for edge cases
    // Rounding rules appropriate to the domain
  }

  generateExplanation(result: CalculationResult): string {
    // Step-by-step breakdown of calculations
    // Industry context and interpretation
  }
}
```

## Data Models

### Industry-Standard Formula Library

Each calculator category will have a comprehensive formula library:

**Finance Formulas:**
- Present Value, Future Value, NPV, IRR
- Black-Scholes for options pricing
- CAPM for cost of equity
- Mortgage amortization with various payment schedules

**Legal Settlement Formulas:**
- Structured settlement present value calculations
- Life expectancy tables (SSA actuarial data)
- Jurisdiction-specific damage multipliers
- Medical cost inflation indices

**Business Valuation Formulas:**
- DCF with terminal value calculations
- Comparable company analysis
- Precedent transaction analysis
- Sum-of-the-parts valuation

### Real-World Data Integration

```typescript
interface IndustryData {
  mortgageRates: {
    conventional: number;
    fha: number;
    va: number;
    jumbo: number;
    lastUpdated: Date;
  };
  
  regionalData: {
    [zipCode: string]: {
      propertyTaxRate: number;
      costOfLiving: number;
      averageHomePrice: number;
    };
  };
  
  legalMultipliers: {
    [jurisdiction: string]: {
      painSufferingMultiplier: number;
      medicalMultiplier: number;
      comparativeNegligenceRules: string;
    };
  };
}
```

## Error Handling

### Input Validation Strategy

1. **Real-time Validation**: Immediate feedback as users type
2. **Business Rule Validation**: Industry-specific constraints
3. **Cross-field Validation**: Logical consistency between inputs
4. **Range Validation**: Realistic bounds for each input type

```typescript
interface ValidationRule {
  field: string;
  type: 'required' | 'range' | 'format' | 'business' | 'cross-field';
  message: string;
  validator: (value: any, allInputs?: Record<string, any>) => boolean;
}

// Example: Mortgage validation
const mortgageValidationRules: ValidationRule[] = [
  {
    field: 'downPayment',
    type: 'business',
    message: 'FHA loans require minimum 3.5% down payment',
    validator: (value, inputs) => {
      if (inputs?.loanType === 'fha') {
        return value >= inputs.homePrice * 0.035;
      }
      return true;
    }
  }
];
```

### Calculation Error Handling

1. **Precision Management**: Appropriate decimal places for each domain
2. **Overflow Protection**: Handle extreme values gracefully
3. **Division by Zero**: Prevent mathematical errors
4. **Convergence Issues**: Handle iterative calculations (IRR, etc.)

## Testing Strategy

### Unit Testing Approach

1. **Formula Accuracy**: Test against known industry benchmarks
2. **Edge Case Handling**: Boundary conditions and extreme values
3. **Validation Logic**: Ensure business rules are enforced
4. **Cross-browser Compatibility**: Consistent calculations across platforms

### Integration Testing

1. **End-to-End Calculator Flows**: Complete user journeys
2. **Data Integration**: Real-world data sources and updates
3. **Performance Testing**: Complex calculations under load
4. **Accessibility Testing**: Screen reader and keyboard navigation

### Industry Validation

1. **Professional Review**: Subject matter experts validate formulas
2. **Benchmark Comparison**: Results match industry-standard tools
3. **Regulatory Compliance**: Meet industry-specific requirements
4. **Continuous Validation**: Regular updates with industry changes

## Implementation Priorities

### Phase 1: Core Infrastructure (Weeks 1-2)
- Calculator framework and engine
- Base UI components and navigation
- Input validation system
- Basic formula library

### Phase 2: Finance Hub (Weeks 3-6)
- Mortgage and real estate calculators (20 calculators)
- Investment and portfolio tools (15 calculators)
- Retirement planning suite (10 calculators)

### Phase 3: Business & Legal Hubs (Weeks 7-10)
- Business operations calculators (15 calculators)
- Legal settlement tools (10 calculators)
- Insurance valuation calculators (10 calculators)

### Phase 4: Specialized Domains (Weeks 11-14)
- Health and fitness calculators (15 calculators)
- Construction and materials (10 calculators)
- Math and science tools (10 calculators)

### Phase 5: Lifestyle & Polish (Weeks 15-16)
- Lifestyle and automotive calculators (10 calculators)
- Performance optimization
- Final testing and validation

## Quality Assurance

### Industry-Leading Standards

1. **Accuracy Requirements**: 
   - Financial calculations: 0.01% tolerance
   - Legal settlements: Match court-approved methods
   - Business valuations: Align with CFA Institute standards

2. **Professional Validation**:
   - CPA review for financial calculators
   - Attorney review for legal calculators
   - Industry expert validation for specialized tools

3. **Continuous Improvement**:
   - Regular formula updates
   - Industry regulation compliance
   - User feedback integration

This design ensures each calculator will be a professional-grade tool that delivers exactly what its title promises, with no generic implementations or placeholder functionality.