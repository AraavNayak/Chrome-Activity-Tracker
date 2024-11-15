import pandas as pd
import matplotlib.pyplot as plt

def create_pie_chart(csv_file):
    # Reading CSV file
    try:
        data = pd.read_csv(csv_file)
        if 'Domain' not in data.columns or 'Time Spent' not in data.columns:
            possible_domain_col = [col for col in data.columns if 'domain' in col.lower()]
            possible_time_col = [col for col in data.columns if 'time' in col.lower()]
            
            if possible_domain_col and possible_time_col:
                data.rename(columns={possible_domain_col[0]: 'Domain', possible_time_col[0]: 'Time Spent'}, inplace=True)
            else:
                print("Error: CSV file must contain columns related to 'Domain' and 'Time Spent'.")
                return
        grouped_data = data.groupby('Domain')['Time Spent'].sum()
        plt.figure(figsize=(10, 6))
        grouped_data.plot.pie(autopct='%1.1f%%', startangle=140)
        plt.title('Time Spent on Websites')
        plt.ylabel('')
        plt.show()
    
    except FileNotFoundError:
        print(f"Error: File '{csv_file}' not found.")
    except pd.errors.EmptyDataError:
        print("Error: CSV file is empty.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


create_pie_chart('/Users/AraavNayak/Desktop/activityTracker/browsing_data.csv')
