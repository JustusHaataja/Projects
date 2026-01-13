from analyzer.data_loader import DataLoader
from analyzer.exposure_calc import ExposureCalculator
from analyzer.risk_metrics import RiskCalculator
from analyzer.report_generator import ReportGenerator

def main():
    # 1️⃣ Load portfolio
    loader = DataLoader("data/portfolio.csv")
    portfolio_df = loader.load_data()
    print("Portfolio loaded and cleaned:")
    print()
    print(portfolio_df.head(), "\n")

    # 2️⃣ Calculate exposures
    exposure_calc = ExposureCalculator(portfolio_df)
    exposure_df = exposure_calc.calculate_exposure()
    print("Exposure by Asset Type & Currency:")
    print(exposure_df, "\n")

    # 3️⃣ Calculate risk
    risk_calc = RiskCalculator(portfolio_df)
    risk_calc.calculate_exposure()
    risk_df = risk_calc.calculate_volatility_risk()
    high_risk = risk_calc.flag_high_risk_positions(threshold=5000)
    print("High-risk trades (risk > 5000):")
    print(high_risk, "\n")

    # 4️⃣ Generate reports
    reporter = ReportGenerator()
    reporter.generate_excel_report(high_risk)
    reporter.generate_pdf_report(high_risk)

if __name__ == "__main__":
    main()