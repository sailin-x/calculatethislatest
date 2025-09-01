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
import { FinancialGratitudeInputs, FinancialGratitudeOutputs } from './types';
import { calculateFinancialGratitude } from './formulas';
import { validateFinancialGratitudeInputs } from './validation';
import { validateField } from './quickValidation';

export default function FinancialGratitudeCalculator() {
  const [inputs, setInputs] = useState<FinancialGratitudeInputs>({
    // Personal Information
    age: 30,
    income: 75000,
    expenses: 50000,
    savings: 25000,
    debt: 15000,
    netWorth: 10000,

    // Gratitude Assessment
    gratitudeLevel: 7,
    financialSatisfaction: 6,
    lifeSatisfaction: 7,
    stressLevel: 5,
    optimismLevel: 7,

    // Financial Goals
    shortTermGoals: ['Build emergency fund', 'Pay off credit cards'],
    mediumTermGoals: ['Save for down payment', 'Increase retirement contributions'],
    longTermGoals: ['Financial independence', 'Leave legacy'],
    goalPriorities: [8, 7, 9],

    // Values and Priorities
    coreValues: ['Family', 'Health', 'Education', 'Community'],
    valuePriorities: [9, 8, 7, 6],
    spendingAlignment: 6,
    savingMotivation: 7,

    // Behavioral Factors
    impulseControl: 6,
    delayedGratification: 7,
    financialLiteracy: 6,
    riskTolerance: 5,
    socialComparison: 4,

    // Environmental Factors
    economicOutlook: 'neutral',
    jobSecurity: 7,
    marketConditions: 'stable',
    inflationExpectations: 3,
    interestRateOutlook: 'stable',

    // Gratitude Practices
    gratitudeJournaling: true,
    gratitudeFrequency: 'daily',
    reflectionTime: 15,
    mindfulnessPractice: true,
    appreciationExpressions: 8,

    // Social Support
    familySupport: 8,
    friendSupport: 7,
    professionalSupport: 6,
    communityInvolvement: 5,
    mentorship: false,

    // Analysis Parameters
    analysisPeriod: 12,
    confidenceLevel: 85,
    scenarioCount: 3,

    // Reporting Preferences
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true,
    includeProjections: true
  });

  const [results, setResults] = useState<FinancialGratitudeOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warnings, setWarnings] = useState<Record<string, string>>({});

  useEffect(() => {
    const validation = validateFinancialGratitudeInputs(inputs);
    if (validation.isValid) {
      try {
        const calculatedResults = calculateFinancialGratitude(inputs);
        setResults(calculatedResults);
        setErrors({});
      } catch (error) {
        setErrors({ calculation: 'Error calculating gratitude metrics' });
      }
    } else {
      setErrors(validation.errors || {});
    }
  }, [inputs]);

  const handleInputChange = (field: keyof FinancialGratitudeInputs, value: any) => {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);

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
    return `${value.toFixed(1)}%`;
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Financial Gratitude Calculator</h1>
        <p className="text-muted-foreground">
          Assess your financial gratitude and build a more fulfilling financial life
        </p>
      </div>

      <Tabs defaultValue="inputs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
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
                  <Label htmlFor="income">Annual Income</Label>
                  <Input
                    id="income"
                    type="number"
                    value={inputs.income}
                    onChange={(e) => handleInputChange('income', parseFloat(e.target.value) || 0)}
                    className={errors.income ? 'border-red-500' : ''}
                  />
                  {errors.income && <p className="text-sm text-red-500">{errors.income}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expenses">Annual Expenses</Label>
                  <Input
                    id="expenses"
                    type="number"
                    value={inputs.expenses}
                    onChange={(e) => handleInputChange('expenses', parseFloat(e.target.value) || 0)}
                    className={errors.expenses ? 'border-red-500' : ''}
                  />
                  {errors.expenses && <p className="text-sm text-red-500">{errors.expenses}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="savings">Current Savings</Label>
                  <Input
                    id="savings"
                    type="number"
                    value={inputs.savings}
                    onChange={(e) => handleInputChange('savings', parseFloat(e.target.value) || 0)}
                    className={errors.savings ? 'border-red-500' : ''}
                  />
                  {errors.savings && <p className="text-sm text-red-500">{errors.savings}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="debt">Current Debt</Label>
                  <Input
                    id="debt"
                    type="number"
                    value={inputs.debt}
                    onChange={(e) => handleInputChange('debt', parseFloat(e.target.value) || 0)}
                    className={errors.debt ? 'border-red-500' : ''}
                  />
                  {errors.debt && <p className="text-sm text-red-500">{errors.debt}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Gratitude Assessment */}
            <Card>
              <CardHeader>
                <CardTitle>Gratitude Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gratitudeLevel">Gratitude Level (1-10)</Label>
                  <Input
                    id="gratitudeLevel"
                    type="number"
                    min="1"
                    max="10"
                    value={inputs.gratitudeLevel}
                    onChange={(e) => handleInputChange('gratitudeLevel', parseInt(e.target.value) || 0)}
                    className={errors.gratitudeLevel ? 'border-red-500' : ''}
                  />
                  {errors.gratitudeLevel && <p className="text-sm text-red-500">{errors.gratitudeLevel}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="financialSatisfaction">Financial Satisfaction (1-10)</Label>
                  <Input
                    id="financialSatisfaction"
                    type="number"
                    min="1"
                    max="10"
                    value={inputs.financialSatisfaction}
                    onChange={(e) => handleInputChange('financialSatisfaction', parseInt(e.target.value) || 0)}
                    className={errors.financialSatisfaction ? 'border-red-500' : ''}
                  />
                  {errors.financialSatisfaction && <p className="text-sm text-red-500">{errors.financialSatisfaction}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lifeSatisfaction">Life Satisfaction (1-10)</Label>
                  <Input
                    id="lifeSatisfaction"
                    type="number"
                    min="1"
                    max="10"
                    value={inputs.lifeSatisfaction}
                    onChange={(e) => handleInputChange('lifeSatisfaction', parseInt(e.target.value) || 0)}
                    className={errors.lifeSatisfaction ? 'border-red-500' : ''}
                  />
                  {errors.lifeSatisfaction && <p className="text-sm text-red-500">{errors.lifeSatisfaction}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stressLevel">Stress Level (1-10)</Label>
                  <Input
                    id="stressLevel"
                    type="number"
                    min="1"
                    max="10"
                    value={inputs.stressLevel}
                    onChange={(e) => handleInputChange('stressLevel', parseInt(e.target.value) || 0)}
                    className={errors.stressLevel ? 'border-red-500' : ''}
                  />
                  {errors.stressLevel && <p className="text-sm text-red-500">{errors.stressLevel}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="optimismLevel">Optimism Level (1-10)</Label>
                  <Input
                    id="optimismLevel"
                    type="number"
                    min="1"
                    max="10"
                    value={inputs.optimismLevel}
                    onChange={(e) => handleInputChange('optimismLevel', parseInt(e.target.value) || 0)}
                    className={errors.optimismLevel ? 'border-red-500' : ''}
                  />
                  {errors.optimismLevel && <p className="text-sm text-red-500">{errors.optimismLevel}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Values and Priorities */}
            <Card>
              <CardHeader>
                <CardTitle>Values and Priorities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="spendingAlignment">Spending Alignment with Values (1-10)</Label>
                  <Input
                    id="spendingAlignment"
                    type="number"
                    min="1"
                    max="10"
                    value={inputs.spendingAlignment}
                    onChange={(e) => handleInputChange('spendingAlignment', parseInt(e.target.value) || 0)}
                    className={errors.spendingAlignment ? 'border-red-500' : ''}
                  />
                  {errors.spendingAlignment && <p className="text-sm text-red-500">{errors.spendingAlignment}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="savingMotivation">Saving Motivation (1-10)</Label>
                  <Input
                    id="savingMotivation"
                    type="number"
                    min="1"
                    max="10"
                    value={inputs.savingMotivation}
                    onChange={(e) => handleInputChange('savingMotivation', parseInt(e.target.value) || 0)}
                    className={errors.savingMotivation ? 'border-red-500' : ''}
                  />
                  {errors.savingMotivation && <p className="text-sm text-red-500">{errors.savingMotivation}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="impulseControl">Impulse Control (1-10)</Label>
                  <Input
                    id="impulseControl"
                    type="number"
                    min="1"
                    max="10"
                    value={inputs.impulseControl}
                    onChange={(e) => handleInputChange('impulseControl', parseInt(e.target.value) || 0)}
                    className={errors.impulseControl ? 'border-red-500' : ''}
                  />
                  {errors.impulseControl && <p className="text-sm text-red-500">{errors.impulseControl}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="delayedGratification">Delayed Gratification (1-10)</Label>
                  <Input
                    id="delayedGratification"
                    type="number"
                    min="1"
                    max="10"
                    value={inputs.delayedGratification}
                    onChange={(e) => handleInputChange('delayedGratification', parseInt(e.target.value) || 0)}
                    className={errors.delayedGratification ? 'border-red-500' : ''}
                  />
                  {errors.delayedGratification && <p className="text-sm text-red-500">{errors.delayedGratification}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="financialLiteracy">Financial Literacy (1-10)</Label>
                  <Input
                    id="financialLiteracy"
                    type="number"
                    min="1"
                    max="10"
                    value={inputs.financialLiteracy}
                    onChange={(e) => handleInputChange('financialLiteracy', parseInt(e.target.value) || 0)}
                    className={errors.financialLiteracy ? 'border-red-500' : ''}
                  />
                  {errors.financialLiteracy && <p className="text-sm text-red-500">{errors.financialLiteracy}</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Gratitude Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Gratitude Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Gratitude Score:</span>
                    <span className="font-bold">{results.metrics.gratitudeScore.toFixed(1)}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Financial Wellness:</span>
                    <span className="font-bold">{results.metrics.financialWellness.toFixed(1)}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Life Satisfaction:</span>
                    <span className="font-bold">{results.metrics.lifeSatisfaction.toFixed(1)}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stress Level:</span>
                    <span className="font-bold">{results.metrics.stressLevel.toFixed(1)}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Optimism Index:</span>
                    <span className="font-bold">{results.metrics.optimismIndex.toFixed(1)}/10</span>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Health */}
              <Card>
                <CardHeader>
                  <CardTitle>Financial Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Savings Rate:</span>
                    <span className="font-bold">{formatPercentage(results.metrics.savingsRate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Debt-to-Income:</span>
                    <span className="font-bold">{formatPercentage(results.metrics.debtToIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Worth:</span>
                    <span className="font-bold">{formatCurrency(results.metrics.netWorth)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Financial Security:</span>
                    <span className="font-bold">{results.metrics.financialSecurity.toFixed(1)}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Financial Freedom:</span>
                    <span className="font-bold">{results.metrics.financialFreedom.toFixed(1)}/10</span>
                  </div>
                </CardContent>
              </Card>

              {/* Behavioral Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Behavioral Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Self-Control:</span>
                    <span className="font-bold">{results.metrics.selfControl.toFixed(1)}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Goal Achievement:</span>
                    <span className="font-bold">{results.metrics.goalAchievement.toFixed(1)}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Value Alignment:</span>
                    <span className="font-bold">{results.metrics.valueAlignment.toFixed(1)}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Social Comparison:</span>
                    <span className="font-bold">{results.metrics.socialComparison.toFixed(1)}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gratitude Practice:</span>
                    <span className="font-bold">{results.metrics.gratitudePractice.toFixed(1)}/10</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gratitude Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Gratitude Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Overall Assessment:</span>
                      <Badge variant={results.gratitudeAnalysis.overallAssessment === 'high' ? 'default' :
                                     results.gratitudeAnalysis.overallAssessment === 'medium' ? 'secondary' : 'destructive'}>
                        {results.gratitudeAnalysis.overallAssessment.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Confidence Level:</span>
                      <Badge variant={results.gratitudeAnalysis.confidenceLevel >= 7 ? 'default' :
                                     results.gratitudeAnalysis.confidenceLevel >= 4 ? 'secondary' : 'destructive'}>
                        {results.gratitudeAnalysis.confidenceLevel}/10
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Key Strengths:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.gratitudeAnalysis.keyStrengths.map((strength, index) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Areas for Improvement:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.gratitudeAnalysis.areasForImprovement.map((area, index) => (
                        <li key={index}>{area}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Opportunities:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.gratitudeAnalysis.opportunities.map((opportunity, index) => (
                        <li key={index}>{opportunity}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Financial Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Financial Position:</span>
                      <Badge variant={results.financialAnalysis.financialPosition === 'strong' ? 'default' :
                                     results.financialAnalysis.financialPosition === 'stable' ? 'secondary' : 'destructive'}>
                        {results.financialAnalysis.financialPosition.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Level:</span>
                      <Badge variant={results.financialAnalysis.riskLevel === 'low' ? 'default' :
                                     results.financialAnalysis.riskLevel === 'medium' ? 'secondary' : 'destructive'}>
                        {results.financialAnalysis.riskLevel}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Financial Factors:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.financialAnalysis.financialFactors.map((factor, index) => (
                        <li key={index}>{factor}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Financial Outlook:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.financialAnalysis.financialOutlook.map((outlook, index) => (
                        <li key={index}>{outlook}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          {results && (
            <div className="space-y-6">
              {/* Key Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.keyInsights.map((insight, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-2">{insight.title}</h4>
                        <p className="text-sm text-gray-600">{insight.description}</p>
                        <div className="mt-2">
                          <Badge variant={insight.impact === 'positive' ? 'default' :
                                         insight.impact === 'neutral' ? 'secondary' : 'destructive'}>
                            {insight.impact}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          {results && (
            <div className="space-y-6">
              {/* Actionable Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Actionable Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Recommendation</th>
                          <th className="text-right p-2">Priority</th>
                          <th className="text-right p-2">Effort</th>
                          <th className="text-right p-2">Impact</th>
                          <th className="text-right p-2">Timeframe</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.recommendations.map((recommendation, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2">{recommendation.title}</td>
                            <td className="text-right p-2">
                              <Badge variant={recommendation.priority === 'high' ? 'destructive' :
                                            recommendation.priority === 'medium' ? 'secondary' : 'default'}>
                                {recommendation.priority}
                              </Badge>
                            </td>
                            <td className="text-right p-2">
                              <Badge variant={recommendation.effort === 'low' ? 'default' :
                                            recommendation.effort === 'medium' ? 'secondary' : 'destructive'}>
                                {recommendation.effort}
                              </Badge>
                            </td>
                            <td className="text-right p-2">
                              <Badge variant={recommendation.impact === 'high' ? 'default' :
                                            recommendation.impact === 'medium' ? 'secondary' : 'destructive'}>
                                {recommendation.impact}
                              </Badge>
                            </td>
                            <td className="text-right p-2">{recommendation.timeframe}</td>
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