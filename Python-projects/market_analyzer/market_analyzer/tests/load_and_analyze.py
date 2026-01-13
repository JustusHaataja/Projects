from analyzer.data_loader import DataLoader
from analyzer.exposure_calc import ExposureCalculator

# Load portfolio
loader = DataLoader("data/portfolio.csv")
portfolio_df = loader.load_data()

# Calculate exposures
calculator = ExposureCalculator(portfolio_df)
exposure_table = calculator.calculate_exposure()
print("Exposure by Asset Type & Currency:")
print(exposure_table)

print("\nTotal Exposure by Currency:")
print(calculator.total_exposure_by_currency())

print("\nTotal Exposure by Asset Type:")
print(calculator.total_exposure_by_asset_type())
