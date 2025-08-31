import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { RetirementPlanningCalculatorInputs, RetirementPlanningCalculatorOutputs } from './types';
import { calculateRetirementPlanning } from './formulas';
import { validateRetirementPlanningCalculatorInputs } from './validation';
import { validateField } from './quickValidation';

export default function RetirementPlanningCalculator() {
  const [inputs, setInputs] = useState<RetirementPlanningCalculatorInputs>({
    personalInfo: {
      basicInfo: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        age: 30,
        gender: 'male',
        maritalStatus: 'single',
        dependents: 0,
        occupation: '',
        employer: '',
        employmentStatus: 'employed',
        education: '',
        healthStatus: 'good',
        lifeExpectancy: 85,
        expectedRetirementAge: 65,
        expectedRetirementDate: '',
        yearsToRetirement: 35
      },
      spouseInfo: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        age: 30,
        gender: 'female',
        occupation: '',
        employer: '',
        employmentStatus: 'employed',
        healthStatus: 'good',
        lifeExpectancy: 87,
        expectedRetirementAge: 65,
        expectedRetirementDate: '',
        yearsToRetirement: 35
      },
      contactInfo: {
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'USA'
        },
        phone: '',
        email: '',
        emergencyContact: {
          name: '',
          relationship: '',
          phone: '',
          email: ''
        }
      },
      taxInfo: {
        taxFilingStatus: 'single',
        taxBracket: 0.22,
        stateOfResidence: '',
        stateTaxRate: 0.05,
        localTaxRate: 0.02,
        alternativeMinimumTax: false,
        itemizedDeductions: false,
        taxDeductions: 0,
        taxCredits: 0
      }
    },
    incomeInfo: {
      employmentIncome: [],
      selfEmploymentIncome: [],
      investmentIncome: [],
      otherIncome: [],
      totalIncome: 0
    },
    assetsInfo: {
      retirementAccounts: [],
      investmentAccounts: [],
      realEstate: [],
      businessInterests: [],
      otherAssets: [],
      totalAssets: 0
    },
    expensesInfo: {
      currentExpenses: {
        housing: 0,
        transportation: 0,
        food: 0,
        healthcare: 0,
        insurance: 0,
        utilities: 0,
        entertainment: 0,
        debtPayments: 0,
        otherExpenses: 0,
        totalExpenses: 0
      },
      retirementExpenses: {
        housing: 0,
        transportation: 0,
        food: 0,
        healthcare: 0,
        insurance: 0,
        utilities: 0,
        entertainment: 0,
        travel: 0,
        otherExpenses: 0,
        totalExpenses: 0
      },
      inflationRate: 0.03
    },
    goalsInfo: {
      retirementGoals: [],
      retirementIncomeNeeds: 0,
      retirementLifestyle: 'modest',
      retirementLocation: '',
      retirementAge: 65,
      retirementDuration: 20,
      legacyGoals: 0
    },
    riskInfo: {
      riskTolerance: 'moderate',
      investmentHorizon: 35,
      liquidityNeeds: 'medium',
      inflationRisk: 0.03,
      marketRisk: 0.15,
      longevityRisk: 0.02,
      healthcareRisk: 0.05
    },
    strategyInfo: {
      savingsStrategy: {
        currentSavingsRate: 0.10,
        targetSavingsRate: 0.15,
        employerMatch: 0.06,
        catchUpContributions: false,
        automaticEscalation: true
      },
      investmentStrategy: {
        assetAllocation: 'moderate',
        targetReturn: 0.07,
        rebalancingFrequency: 'annual',
        taxEfficientInvesting: true,
        dollarCostAveraging: true
      },
      withdrawalStrategy: {
        withdrawalRate: 0.04,
        withdrawalMethod: 'systematic',
        inflationAdjustment: true,
        requiredMinimumDistributions: true
      }
    }
  });

  const [results, setResults] = useState<RetirementPlanningCalculatorOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warnings, setWarnings] = useState<Record<string, string>>({});

  useEffect(() => {
    const validation = validateRetirementPlanningCalculatorInputs(inputs);
    if (validation.isValid) {
      try {
        const calculatedResults = calculateRetirementPlanning(inputs);
        setResults(calculatedResults);
        setErrors({});
      } catch (error) {
        setErrors({ calculation: 'Error calculating retirement planning' });
      }
    } else {
      setErrors(validation.errors || {});
    }
  }, [inputs]);

  const handleInputChange = (field: string, value: any) => {
    const fieldPath = field.split('.');
    setInputs(prev => {
      const newInputs = { ...prev };
      let current: any = newInputs;
      
      for (let i = 0; i < fieldPath.length - 1; i++) {
        current = current[fieldPath[i]];
      }
      
      current[fieldPath[fieldPath.length - 1]] = value;
      
      // Perform quick validation
      const validation = validateField(field, value, newInputs);
      if (!validation.isValid) {
        setErrors(prev => ({ ...prev, [field]: validation.error || '' }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
      
      if (validation.warning) {
        setWarnings(prev => ({ ...prev, [field]: validation.warning || '' }));
      } else {
        setWarnings(prev => {
          const newWarnings = { ...prev };
          delete newWarnings[field];
          return newWarnings;
        });
      }
      
      return newInputs;
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Retirement Planning Calculator</h1>
        <p className="text-muted-foreground">
          Comprehensive retirement planning and analysis tool
        </p>
      </div>

      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertDescription>
            Please fix the following errors:
            <ul className="mt-2 list-disc list-inside">
              {Object.entries(errors).map(([field, error]) => (
                <li key={field}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {Object.keys(warnings).length > 0 && (
        <Alert>
          <AlertDescription>
            Warnings:
            <ul className="mt-2 list-disc list-inside">
              {Object.entries(warnings).map(([field, warning]) => (
                <li key={field}>{warning}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Enter your basic personal and financial information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={inputs.personalInfo.basicInfo.firstName}
                    onChange={(e) => handleInputChange('personalInfo.basicInfo.firstName', e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={inputs.personalInfo.basicInfo.lastName}
                    onChange={(e) => handleInputChange('personalInfo.basicInfo.lastName', e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={inputs.personalInfo.basicInfo.dateOfBirth}
                    onChange={(e) => handleInputChange('personalInfo.basicInfo.dateOfBirth', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={inputs.personalInfo.basicInfo.age}
                    onChange={(e) => handleInputChange('personalInfo.basicInfo.age', parseInt(e.target.value) || 0)}
                    placeholder="Enter age"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={inputs.personalInfo.basicInfo.gender}
                    onValueChange={(value) => handleInputChange('personalInfo.basicInfo.gender', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Select
                    value={inputs.personalInfo.basicInfo.maritalStatus}
                    onValueChange={(value) => handleInputChange('personalInfo.basicInfo.maritalStatus', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select marital status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedRetirementAge">Expected Retirement Age</Label>
                  <Input
                    id="expectedRetirementAge"
                    type="number"
                    value={inputs.personalInfo.basicInfo.expectedRetirementAge}
                    onChange={(e) => handleInputChange('personalInfo.basicInfo.expectedRetirementAge', parseInt(e.target.value) || 0)}
                    placeholder="Enter retirement age"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lifeExpectancy">Life Expectancy</Label>
                  <Input
                    id="lifeExpectancy"
                    type="number"
                    value={inputs.personalInfo.basicInfo.lifeExpectancy}
                    onChange={(e) => handleInputChange('personalInfo.basicInfo.lifeExpectancy', parseInt(e.target.value) || 0)}
                    placeholder="Enter life expectancy"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Income Information</CardTitle>
              <CardDescription>Enter your current and projected income sources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employmentIncome">Employment Income</Label>
                  <Input
                    id="employmentIncome"
                    type="number"
                    placeholder="Enter annual employment income"
                    onChange={(e) => {
                      const income = parseFloat(e.target.value) || 0;
                      const employmentIncome = [{
                        source: 'Primary Employment',
                        amount: income,
                        frequency: 'annually',
                        growthRate: 0.03,
                        expectedRetirementAge: inputs.personalInfo.basicInfo.expectedRetirementAge,
                        benefits: {
                          healthInsurance: 0,
                          dentalInsurance: 0,
                          visionInsurance: 0,
                          lifeInsurance: 0,
                          disabilityInsurance: 0,
                          retirementMatch: 0.06,
                          stockOptions: 0,
                          otherBenefits: 0
                        }
                      }];
                      handleInputChange('incomeInfo.employmentIncome', employmentIncome);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employerMatch">Employer Retirement Match (%)</Label>
                  <Input
                    id="employerMatch"
                    type="number"
                    placeholder="Enter employer match percentage"
                    onChange={(e) => {
                      const match = parseFloat(e.target.value) || 0;
                      if (inputs.incomeInfo.employmentIncome.length > 0) {
                        const updated = [...inputs.incomeInfo.employmentIncome];
                        updated[0] = {
                          ...updated[0],
                          benefits: {
                            ...updated[0].benefits,
                            retirementMatch: match / 100
                          }
                        };
                        handleInputChange('incomeInfo.employmentIncome', updated);
                      }
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Asset Information</CardTitle>
              <CardDescription>Enter your current retirement and investment assets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="retirementAccounts">Retirement Accounts</Label>
                  <Input
                    id="retirementAccounts"
                    type="number"
                    placeholder="Enter total retirement account value"
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      const retirementAccounts = [{
                        type: '401(k)',
                        balance: value * 0.6,
                        contribution: 0,
                        employerMatch: 0,
                        expectedReturn: 0.07,
                        withdrawalAge: 65
                      }, {
                        type: 'IRA',
                        balance: value * 0.4,
                        contribution: 0,
                        employerMatch: 0,
                        expectedReturn: 0.07,
                        withdrawalAge: 65
                      }];
                      handleInputChange('assetsInfo.retirementAccounts', retirementAccounts);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="investmentAccounts">Investment Accounts</Label>
                  <Input
                    id="investmentAccounts"
                    type="number"
                    placeholder="Enter total investment account value"
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      const investmentAccounts = [{
                        type: 'Brokerage',
                        balance: value,
                        contribution: 0,
                        expectedReturn: 0.07,
                        taxEfficiency: 0.8
                      }];
                      handleInputChange('assetsInfo.investmentAccounts', investmentAccounts);
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Information</CardTitle>
              <CardDescription>Enter your current and expected retirement expenses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentExpenses">Current Annual Expenses</Label>
                  <Input
                    id="currentExpenses"
                    type="number"
                    placeholder="Enter current annual expenses"
                    onChange={(e) => {
                      const expenses = parseFloat(e.target.value) || 0;
                      const currentExpenses = {
                        housing: expenses * 0.3,
                        transportation: expenses * 0.15,
                        food: expenses * 0.12,
                        healthcare: expenses * 0.08,
                        insurance: expenses * 0.05,
                        utilities: expenses * 0.06,
                        entertainment: expenses * 0.08,
                        debtPayments: expenses * 0.08,
                        otherExpenses: expenses * 0.08,
                        totalExpenses: expenses
                      };
                      handleInputChange('expensesInfo.currentExpenses', currentExpenses);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retirementExpenses">Expected Retirement Expenses</Label>
                  <Input
                    id="retirementExpenses"
                    type="number"
                    placeholder="Enter expected retirement expenses"
                    onChange={(e) => {
                      const expenses = parseFloat(e.target.value) || 0;
                      const retirementExpenses = {
                        housing: expenses * 0.25,
                        transportation: expenses * 0.12,
                        food: expenses * 0.10,
                        healthcare: expenses * 0.15,
                        insurance: expenses * 0.08,
                        utilities: expenses * 0.05,
                        entertainment: expenses * 0.10,
                        travel: expenses * 0.10,
                        otherExpenses: expenses * 0.05,
                        totalExpenses: expenses
                      };
                      handleInputChange('expensesInfo.retirementExpenses', retirementExpenses);
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Retirement Goals</CardTitle>
              <CardDescription>Define your retirement goals and lifestyle expectations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="retirementIncomeNeeds">Desired Retirement Income</Label>
                  <Input
                    id="retirementIncomeNeeds"
                    type="number"
                    value={inputs.goalsInfo.retirementIncomeNeeds}
                    onChange={(e) => handleInputChange('goalsInfo.retirementIncomeNeeds', parseFloat(e.target.value) || 0)}
                    placeholder="Enter desired retirement income"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retirementLifestyle">Retirement Lifestyle</Label>
                  <Select
                    value={inputs.goalsInfo.retirementLifestyle}
                    onValueChange={(value) => handleInputChange('goalsInfo.retirementLifestyle', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select lifestyle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modest">Modest</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retirementAge">Retirement Age</Label>
                  <Input
                    id="retirementAge"
                    type="number"
                    value={inputs.goalsInfo.retirementAge}
                    onChange={(e) => handleInputChange('goalsInfo.retirementAge', parseInt(e.target.value) || 0)}
                    placeholder="Enter retirement age"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retirementDuration">Retirement Duration (Years)</Label>
                  <Input
                    id="retirementDuration"
                    type="number"
                    value={inputs.goalsInfo.retirementDuration}
                    onChange={(e) => handleInputChange('goalsInfo.retirementDuration', parseInt(e.target.value) || 0)}
                    placeholder="Enter retirement duration"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Investment Strategy</CardTitle>
              <CardDescription>Configure your investment and savings strategy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentSavingsRate">Current Savings Rate (%)</Label>
                  <Input
                    id="currentSavingsRate"
                    type="number"
                    value={inputs.strategyInfo.savingsStrategy.currentSavingsRate * 100}
                    onChange={(e) => handleInputChange('strategyInfo.savingsStrategy.currentSavingsRate', (parseFloat(e.target.value) || 0) / 100)}
                    placeholder="Enter current savings rate"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetSavingsRate">Target Savings Rate (%)</Label>
                  <Input
                    id="targetSavingsRate"
                    type="number"
                    value={inputs.strategyInfo.savingsStrategy.targetSavingsRate * 100}
                    onChange={(e) => handleInputChange('strategyInfo.savingsStrategy.targetSavingsRate', (parseFloat(e.target.value) || 0) / 100)}
                    placeholder="Enter target savings rate"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetReturn">Target Return (%)</Label>
                  <Input
                    id="targetReturn"
                    type="number"
                    value={inputs.strategyInfo.investmentStrategy.targetReturn * 100}
                    onChange={(e) => handleInputChange('strategyInfo.investmentStrategy.targetReturn', (parseFloat(e.target.value) || 0) / 100)}
                    placeholder="Enter target return"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="withdrawalRate">Withdrawal Rate (%)</Label>
                  <Input
                    id="withdrawalRate"
                    type="number"
                    value={inputs.strategyInfo.withdrawalStrategy.withdrawalRate * 100}
                    onChange={(e) => handleInputChange('strategyInfo.withdrawalStrategy.withdrawalRate', (parseFloat(e.target.value) || 0) / 100)}
                    placeholder="Enter withdrawal rate"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {results ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Retirement Readiness Summary</CardTitle>
                  <CardDescription>Your retirement planning analysis results</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {formatPercentage(results.retirementReadinessScore)}
                      </div>
                      <div className="text-sm text-muted-foreground">Retirement Readiness</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatCurrency(results.retirementIncomeGap)}
                      </div>
                      <div className="text-sm text-muted-foreground">Income Gap</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {formatCurrency(results.requiredRetirementSavings)}
                      </div>
                      <div className="text-sm text-muted-foreground">Required Savings</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Income Replacement Rate</Label>
                      <div className="text-lg font-semibold">
                        {formatPercentage(results.retirementIncomeReplacement)}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Success Probability</Label>
                      <div className="text-lg font-semibold">
                        {formatPercentage(results.retirementSuccessProbability)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Recommendation</Label>
                    <Badge variant={results.recommendation === 'excellent' ? 'default' : 'secondary'}>
                      {results.recommendation.charAt(0).toUpperCase() + results.recommendation.slice(1)}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <Label>Retirement Readiness Progress</Label>
                    <Progress value={results.retirementReadinessScore * 100} className="w-full" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {results.recommendations && results.recommendations.length > 0 ? (
                    <div className="space-y-2">
                      {results.recommendations.slice(0, 3).map((rec, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="font-semibold">{rec.category}</div>
                          <div className="text-sm text-muted-foreground">{rec.recommendation}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Expected improvement: {formatPercentage(rec.expectedImprovement)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No specific recommendations available</p>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">
                  Enter your personal information and financial data to see retirement planning results
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}