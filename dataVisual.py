import pandas as pd
import plotly.express as px

def create_interactive_pie_chart(csv_file):
    try:
        data = pd.read_csv(csv_file)
        print("Columns in CSV:", data.columns)

        if 'Domain' not in data.columns or 'Time Spent' not in data.columns:
            possible_domain_col = [col for col in data.columns if 'domain' in col.lower()]
            possible_time_col = [col for col in data.columns if 'time' in col.lower()]

            if possible_domain_col and possible_time_col:
                data.rename(columns={possible_domain_col[0]: 'Domain', possible_time_col[0]: 'Time Spent'}, inplace=True)
            else:
                print("Error: CSV file must contain columns related to 'Domain' and 'Time Spent'.")
                return

        # Group by domain and sum time spent
        grouped_data = data.groupby('Domain')['Time Spent'].sum().reset_index()

        # Interactive pie chart
        fig = px.pie(
            grouped_data,
            names='Domain',
            values='Time Spent',
            title='Time Spent on Websites',
            hover_data=['Time Spent'],
            labels={'Time Spent': 'Total Time (seconds)'}
        )
        fig.update_traces(textinfo='percent', hovertemplate='<b>%{label}</b><br>Total Time: %{value}s<br>Proportion: %{percent}')

        fig.show()

    except FileNotFoundError:
        print(f"Error: File '{csv_file}' not found.")
    except pd.errors.EmptyDataError:
        print("Error: CSV file is empty.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

create_interactive_pie_chart('/Users/AraavNayak/Desktop/activityTracker/browsing_data.csv')
