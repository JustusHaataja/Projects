from analyzer.data_loader import DataLoader

loader = DataLoader("data/portfolio.csv")
df = loader.load_data()


print(df)

