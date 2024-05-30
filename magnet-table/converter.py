import pandas as pd

# Read the CSV file into a Pandas DataFrame
df = pd.read_csv('magnet_table_v1_2.csv')

# Convert the DataFrame to JSON format
json_data = df.to_json(orient='records')

# Print or save the JSON data
print(json_data)
# To save to a file, use:
# with open('output.json', 'w') as f:
#     f.write(json_data)
