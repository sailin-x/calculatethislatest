import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { TaxInputs, TaxOutputs } from './types';
import { calculateTax } from './formulas';
import { validateTaxInputs } from './validation';
import { validateField } from './quickValidation';

export default function TaxCalculator() {
  const [inputs, setInputs] = useState<TaxInputs>({
    // Personal Information
    filingStatus: 'single',
    taxYear: 2024,
    age: 35,
    dependents: 0,
    isBlind: false,
    isDisabled: false,
    
    // Income Information
    wages: 75000,
    selfEmploymentIncome: 0,
    interestIncome: 500,
    dividendIncome: 1000,
    capitalGains: 2000,
    rentalIncome: 0,
    businessIncome: 0,
    otherIncome: 0,
    
    // Deductions
    standardDeduction: 14600,
    itemizedDeductions: 0,
    useStandardDeduction: true,
    
    // Itemized Deductions Breakdown
    stateLocalTaxes: 0,
    mortgageInterest: 0,
    charitableContributions: 0,
    medicalExpenses: 0,
    otherItemizedDeductions: 0,
    
    // Credits
    childTaxCredit: 0,
    earnedIncomeCredit: 0,
    educationCredits: 0,
    retirementSavingsCredit: 0,
    otherCredits: 0,
    
    // Withholding and Payments
    federalWithholding: 12000,
    estimatedTaxPayments: 0,
    priorYearOverpayment: 0,
    otherPayments: 0,
    
    // Additional Information
    hasHealthInsurance: true,
    healthInsuranceCost: 6000,
    hasRetirementPlan: true,
    retirementContribution: 6000,
    hasHSAAccount: false,
    hsaContribution: 0,
    
    // State Information
    stateOfResidence: 'CA',
    stateTaxRate: 9.3,
    stateWithholding: 3000,
    
    // Reporting Preferences
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true,
    includeProjections: true
  });

  const [results, setResults] = useState<TaxOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warnings, setWarnings] = useState<Record<string, string>>({});

  useEffect(() => {
    const validation = validateTaxInputs(inputs);
    if (validation.isValid) {
      try {
        const calculatedResults = calculateTax(inputs);
        setResults(calculatedResults);
        setErrors({});
      } catch (error) {
        setErrors({ calculation: 'Error calculating tax liability' });
      }
    } else {
      setErrors(validation.errors || {});
    }
  }, [inputs]);

  const handleInputChange = (field: keyof TaxInputs, value: any) => {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);

    // Auto-calculate related fields
    if (field === 'useStandardDeduction') {
      if (value) {
        newInputs.itemizedDeductions = 0;
      }
    }

    if (field === 'itemizedDeductions' && value > 0) {
      newInputs.useStandardDeduction = false;
    }

    // Quick validation
    const fieldValidation = validateField(field, value, newInputs);
    if (!fieldValidation.isValid) {
      setErrors(prev => ({ ...prev, [field]: fieldValidation.error || '' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    if (fieldValidation.warning) {
      setWarnings(prev => ({ ...prev, [field]: fieldValidation.warning || '' }));
    } else {
      setWarnings(prev => {
        const newWarnings = { ...prev };
        delete newWarnings[field];
        return newWarnings;
      });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: inputs.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Tax Calculator</h1>
        <p className="text-muted-foreground">
          Calculate your federal and state tax liability for the current year
        </p>
      </div>

      <Tabs defaultValue="inputs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="inputs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="filingStatus">Filing Status</Label>
                  <Select value={inputs.filingStatus} onValueChange={(value) => handleInputChange('filingStatus', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married-filing-jointly">Married Filing Jointly</SelectItem>
                      <SelectItem value="married-filing-separately">Married Filing Separately</SelectItem>
                      <SelectItem value="head-of-household">Head of Household</SelectItem>
                      <SelectItem value="qualifying-widow">Qualifying Widow(er)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxYear">Tax Year</Label>
                  <Select value={inputs.taxYear.toString()} onValueChange={(value) => handleInputChange('taxYear', parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={inputs.age}
                    onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                    className={errors.age ? 'border-red-500' : ''}
                  />
                  {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dependents">Number of Dependents</Label>
                  <Input
                    id="dependents"
                    type="number"
                    value={inputs.dependents}
                    onChange={(e) => handleInputChange('dependents', parseInt(e.target.value) || 0)}
                    className={errors.dependents ? 'border-red-500' : ''}
                  />
                  {errors.dependents && <p className="text-sm text-red-500">{errors.dependents}</p>}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isBlind"
                    checked={inputs.isBlind}
                    onCheckedChange={(checked) => handleInputChange('isBlind', checked)}
                  />
                  <Label htmlFor="isBlind">Blind</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isDisabled"
                    checked={inputs.isDisabled}
                    onCheckedChange={(checked) => handleInputChange('isDisabled', checked)}
                  />
                  <Label htmlFor="isDisabled">Disabled</Label>
                </div>
              </CardContent>
            </Card>

            {/* Income Information */}
            <Card>
              <CardHeader>
                <CardTitle>Income Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="wages">Wages and Salaries</Label>
                  <Input
                    id="wages"
                    type="number"
                    value={inputs.wages}
                    onChange={(e) => handleInputChange('wages', parseFloat(e.target.value) || 0)}
                    className={errors.wages ? 'border-red-500' : ''}
                  />
                  {errors.wages && <p className="text-sm text-red-500">{errors.wages}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="selfEmploymentIncome">Self-Employment Income</Label>
                  <Input
                    id="selfEmploymentIncome"
                    type="number"
                    value={inputs.selfEmploymentIncome}
                    onChange={(e) => handleInputChange('selfEmploymentIncome', parseFloat(e.target.value) || 0)}
                    className={errors.selfEmploymentIncome ? 'border-red-500' : ''}
                  />
                  {errors.selfEmploymentIncome && <p className="text-sm text-red-500">{errors.selfEmploymentIncome}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interestIncome">Interest Income</Label>
                  <Input
                    id="interestIncome"
                    type="number"
                    value={inputs.interestIncome}
                    onChange={(e) => handleInputChange('interestIncome', parseFloat(e.target.value) || 0)}
                    className={errors.interestIncome ? 'border-red-500' : ''}
                  />
                  {errors.interestIncome && <p className="text-sm text-red-500">{errors.interestIncome}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dividendIncome">Dividend Income</Label>
                  <Input
                    id="dividendIncome"
                    type="number"
                    value={inputs.dividendIncome}
                    onChange={(e) => handleInputChange('dividendIncome', parseFloat(e.target.value) || 0)}
                    className={errors.dividendIncome ? 'border-red-500' : ''}
                  />
                  {errors.dividendIncome && <p className="text-sm text-red-500">{errors.dividendIncome}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capitalGains">Capital Gains</Label>
                  <Input
                    id="capitalGains"
                    type="number"
                    value={inputs.capitalGains}
                    onChange={(e) => handleInputChange('capitalGains', parseFloat(e.target.value) || 0)}
                    className={errors.capitalGains ? 'border-red-500' : ''}
                  />
                  {errors.capitalGains && <p className="text-sm text-red-500">{errors.capitalGains}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rentalIncome">Rental Income</Label>
                  <Input
                    id="rentalIncome"
                    type="number"
                    value={inputs.rentalIncome}
                    onChange={(e) => handleInputChange('rentalIncome', parseFloat(e.target.value) || 0)}
                    className={errors.rentalIncome ? 'border-red-500' : ''}
                  />
                  {errors.rentalIncome && <p className="text-sm text-red-500">{errors.rentalIncome}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessIncome">Business Income</Label>
                  <Input
                    id="businessIncome"
                    type="number"
                    value={inputs.businessIncome}
                    onChange={(e) => handleInputChange('businessIncome', parseFloat(e.target.value) || 0)}
                    className={errors.businessIncome ? 'border-red-500' : ''}
                  />
                  {errors.businessIncome && <p className="text-sm text-red-500">{errors.businessIncome}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherIncome">Other Income</Label>
                  <Input
                    id="otherIncome"
                    type="number"
                    value={inputs.otherIncome}
                    onChange={(e) => handleInputChange('otherIncome', parseFloat(e.target.value) || 0)}
                    className={errors.otherIncome ? 'border-red-500' : ''}
                  />
                  {errors.otherIncome && <p className="text-sm text-red-500">{errors.otherIncome}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Deductions */}
            <Card>
              <CardHeader>
                <CardTitle>Deductions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="useStandardDeduction"
                    checked={inputs.useStandardDeduction}
                    onCheckedChange={(checked) => handleInputChange('useStandardDeduction', checked)}
                  />
                  <Label htmlFor="useStandardDeduction">Use Standard Deduction</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="standardDeduction">Standard Deduction</Label>
                  <Input
                    id="standardDeduction"
                    type="number"
                    value={inputs.standardDeduction}
                    onChange={(e) => handleInputChange('standardDeduction', parseFloat(e.target.value) || 0)}
                    className={errors.standardDeduction ? 'border-red-500' : ''}
                    disabled={!inputs.useStandardDeduction}
                  />
                  {errors.standardDeduction && <p className="text-sm text-red-500">{errors.standardDeduction}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="itemizedDeductions">Total Itemized Deductions</Label>
                  <Input
                    id="itemizedDeductions"
                    type="number"
                    value={inputs.itemizedDeductions}
                    onChange={(e) => handleInputChange('itemizedDeductions', parseFloat(e.target.value) || 0)}
                    className={errors.itemizedDeductions ? 'border-red-500' : ''}
                    disabled={inputs.useStandardDeduction}
                  />
                  {errors.itemizedDeductions && <p className="text-sm text-red-500">{errors.itemizedDeductions}</p>}
                </div>

                {!inputs.useStandardDeduction && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="stateLocalTaxes">State and Local Taxes</Label>
                      <Input
                        id="stateLocalTaxes"
                        type="number"
                        value={inputs.stateLocalTaxes}
                        onChange={(e) => handleInputChange('stateLocalTaxes', parseFloat(e.target.value) || 0)}
                        className={errors.stateLocalTaxes ? 'border-red-500' : ''}
                      />
                      {errors.stateLocalTaxes && <p className="text-sm text-red-500">{errors.stateLocalTaxes}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mortgageInterest">Mortgage Interest</Label>
                      <Input
                        id="mortgageInterest"
                        type="number"
                        value={inputs.mortgageInterest}
                        onChange={(e) => handleInputChange('mortgageInterest', parseFloat(e.target.value) || 0)}
                        className={errors.mortgageInterest ? 'border-red-500' : ''}
                      />
                      {errors.mortgageInterest && <p className="text-sm text-red-500">{errors.mortgageInterest}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="charitableContributions">Charitable Contributions</Label>
                      <Input
                        id="charitableContributions"
                        type="number"
                        value={inputs.charitableContributions}
                        onChange={(e) => handleInputChange('charitableContributions', parseFloat(e.target.value) || 0)}
                        className={errors.charitableContributions ? 'border-red-500' : ''}
                      />
                      {errors.charitableContributions && <p className="text-sm text-red-500">{errors.charitableContributions}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="medicalExpenses">Medical Expenses</Label>
                      <Input
                        id="medicalExpenses"
                        type="number"
                        value={inputs.medicalExpenses}
                        onChange={(e) => handleInputChange('medicalExpenses', parseFloat(e.target.value) || 0)}
                        className={errors.medicalExpenses ? 'border-red-500' : ''}
                      />
                      {errors.medicalExpenses && <p className="text-sm text-red-500">{errors.medicalExpenses}</p>}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Tax Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Tax Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Income:</span>
                    <span className="font-bold">{formatCurrency(results.metrics.totalIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Adjusted Gross Income:</span>
                    <span className="font-bold">{formatCurrency(results.metrics.adjustedGrossIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deductions:</span>
                    <span className="font-bold text-green-600">-{formatCurrency(results.metrics.totalDeductions)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxable Income:</span>
                    <span className="font-bold">{formatCurrency(results.metrics.taxableIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Federal Tax:</span>
                    <span className="font-bold text-red-600">{formatCurrency(results.metrics.federalTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>State Tax:</span>
                    <span className="font-bold text-red-600">{formatCurrency(results.metrics.stateTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Tax:</span>
                    <span className="font-bold text-red-600">{formatCurrency(results.metrics.totalTax)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Credits and Payments */}
              <Card>
                <CardHeader>
                  <CardTitle>Credits and Payments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Credits:</span>
                    <span className="font-bold text-green-600">{formatCurrency(results.metrics.totalCredits)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Payments:</span>
                    <span className="font-bold text-green-600">{formatCurrency(results.metrics.totalPayments)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax Due:</span>
                    <span className={`font-bold ${results.metrics.taxDue >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {results.metrics.taxDue >= 0 ? formatCurrency(results.metrics.taxDue) : `Refund: ${formatCurrency(Math.abs(results.metrics.taxDue))}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Effective Tax Rate:</span>
                    <span className="font-bold">{formatPercentage(results.metrics.effectiveTaxRate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Marginal Tax Rate:</span>
                    <span className="font-bold">{formatPercentage(results.metrics.marginalTaxRate)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Tax Brackets */}
              <Card>
                <CardHeader>
                  <CardTitle>Tax Brackets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {results.taxBrackets.map((bracket, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{formatPercentage(bracket.rate)} bracket:</span>
                        <span>{formatCurrency(bracket.tax)}</span>
                      </div>
                      <Progress value={(bracket.tax / results.metrics.federalTax) * 100} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tax Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Tax Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Tax Efficiency:</span>
                      <Badge variant={results.taxAnalysis.taxEfficiency === 'high' ? 'default' : 
                                     results.taxAnalysis.taxEfficiency === 'medium' ? 'secondary' : 'destructive'}>
                        {results.taxAnalysis.taxEfficiency}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax Burden:</span>
                      <Badge variant={results.taxAnalysis.taxBurden === 'low' ? 'default' : 
                                     results.taxAnalysis.taxBurden === 'medium' ? 'secondary' : 'destructive'}>
                        {results.taxAnalysis.taxBurden}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Tax Optimization Opportunities:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.taxAnalysis.optimizationOpportunities.map((opportunity, index) => (
                        <li key={index}>{opportunity}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Recommendations:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.taxAnalysis.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Tax Planning */}
              <Card>
                <CardHeader>
                  <CardTitle>Tax Planning</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Deduction Strategies:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.taxPlanning.deductionStrategies.map((strategy, index) => (
                        <li key={index}>{strategy}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Credit Opportunities:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.taxPlanning.creditOpportunities.map((credit, index) => (
                        <li key={index}>{credit}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Retirement Planning:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.taxPlanning.retirementPlanning.map((plan, index) => (
                        <li key={index}>{plan}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="planning" className="space-y-6">
          {results && (
            <div className="space-y-6">
              {/* Tax Planning Scenarios */}
              <Card>
                <CardHeader>
                  <CardTitle>Tax Planning Scenarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Scenario</th>
                          <th className="text-right p-2">Taxable Income</th>
                          <th className="text-right p-2">Federal Tax</th>
                          <th className="text-right p-2">State Tax</th>
                          <th className="text-right p-2">Total Tax</th>
                          <th className="text-right p-2">Tax Savings</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.taxPlanningScenarios.map((scenario, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2">{scenario.name}</td>
                            <td className="text-right p-2">{formatCurrency(scenario.taxableIncome)}</td>
                            <td className="text-right p-2">{formatCurrency(scenario.federalTax)}</td>
                            <td className="text-right p-2">{formatCurrency(scenario.stateTax)}</td>
                            <td className="text-right p-2">{formatCurrency(scenario.totalTax)}</td>
                            <td className={`text-right p-2 font-bold ${scenario.taxSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {scenario.taxSavings >= 0 ? `+${formatCurrency(scenario.taxSavings)}` : formatCurrency(scenario.taxSavings)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Income Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Income Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.incomeBreakdown.map((income, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{income.category}</span>
                          <span>{formatCurrency(income.amount)} ({formatPercentage(income.percentage)})</span>
                        </div>
                        <Progress value={income.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Deduction Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Deduction Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.deductionBreakdown.map((deduction, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{deduction.category}</span>
                          <span>{formatCurrency(deduction.amount)} ({formatPercentage(deduction.percentage)})</span>
                        </div>
                        <Progress value={deduction.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertDescription>
            Please fix the following errors:
            <ul className="list-disc list-inside mt-2">
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
            <ul className="list-disc list-inside mt-2">
              {Object.entries(warnings).map(([field, warning]) => (
                <li key={field}>{warning}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}