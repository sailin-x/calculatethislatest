#!/bin/bash

# Batch generate more calculators

# More finance calculators
./generate_calculator.sh finance roth-conversion-tax-calculator "Roth Conversion Tax Calculator" "Calculate tax implications of converting traditional IRA to Roth IRA"
./generate_calculator.sh finance roth-ira-calculator "Roth IRA Calculator" "Calculate growth and benefits of Roth IRA investments"
./generate_calculator.sh finance sep-ira-calculator "SEP IRA Calculator" "Calculate contributions and benefits for SEP IRA plans"
./generate_calculator.sh finance simple-ira-calculator "SIMPLE IRA Calculator" "Calculate SIMPLE IRA contribution limits and benefits"
./generate_calculator.sh finance social-security-optimization-calculator "Social Security Optimization Calculator" "Optimize Social Security benefit claiming strategies"
./generate_calculator.sh finance stretch-ira-calculator "Stretch IRA Calculator" "Calculate benefits of stretching IRA distributions over lifetime"
./generate_calculator.sh finance structured-settlement-payout-calculator "Structured Settlement Payout Calculator" "Calculate payout options for structured settlements"
./generate_calculator.sh finance student-loan-forgiveness-calculator "Student Loan Forgiveness Calculator" "Calculate eligibility and benefits of student loan forgiveness programs"
./generate_calculator.sh finance student-loan-refinancing-calculator "Student Loan Refinancing Calculator" "Compare student loan refinancing options and savings"
./generate_calculator.sh finance student-loan-repayment-calculator "Student Loan Repayment Calculator" "Calculate student loan repayment options and strategies"
./generate_calculator.sh finance tax-loss-harvesting-calculator "Tax-Loss Harvesting Calculator" "Calculate benefits of tax-loss harvesting strategies"
./generate_calculator.sh finance traditional-ira-calculator "Traditional IRA Calculator" "Calculate traditional IRA contribution limits and tax benefits"
./generate_calculator.sh finance trust-fund-distribution-calculator "Trust Fund Distribution Calculator" "Calculate optimal trust fund distribution strategies"
./generate_calculator.sh finance ugma-utma-custodial-account-calculator "UGMA/UTMA Custodial Account Calculator" "Calculate benefits and tax implications of custodial accounts"
./generate_calculator.sh finance variable-annuity-calculator "Variable Annuity Calculator" "Calculate variable annuity payout options and benefits"
./generate_calculator.sh finance viatical-settlement-value-calculator "Viatical Settlement Value Calculator" "Calculate value of viatical settlements for life insurance policies"

echo "Second batch generation completed. Remember to register all calculators in src/calculators/index.ts"