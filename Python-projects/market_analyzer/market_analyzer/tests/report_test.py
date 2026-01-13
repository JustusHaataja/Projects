from analyzer.data_loader import DataLoader
from analyzer.risk_metrics import RiskCalculator
from analyzer.report_generator import ReportGenerator

# Step 1: Load portfolio
loader = DataLoader("data/portfolio.csv")
portfolio_df = loader.load_data()

# Step 2: Run risk calculations
risk_calc = RiskCalculator(portfolio_df)
risk_calc.calculate_exposure()
risk_df = risk_calc.calculate_volatility_risk()

# Here we still have all the trades in the risk_df

# Step 3: Flag high-risk trades (this is where we set high_risk=True)
risk_df = risk_calc.flag_high_risk_positions()

# After this we only have the high-risk trades in risk_df


# Step 4: Generate reports
reporter = ReportGenerator()
reporter.generate_excel_report(risk_df)
reporter.generate_pdf_report(risk_df)
