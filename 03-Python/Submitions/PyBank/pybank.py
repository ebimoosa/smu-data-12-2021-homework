import csv
csvpath = "Instructions/PyBank/Resources/budget_data.csv"

# set initial variable values
total_months = 0
tProfits = 0

# changes for "average changes" stored in a list and variable previous profit
changes = []
change_months = []
pProfits = 0

# read csv and seperate data by comma
with open(csvpath, "r") as file:
    csvreader =csv.reader(file,delimiter=',')

    # skip header
    csvheader = next(csvreader)

    print(csvheader)
    print()

    # loop through the csv, add 1 to total month per row
    for row in csvreader:
        
        # get total months = 86
        total_months = total_months + 1
        
        # get total profit
        tProfits = tProfits + int(row[1])

        # Skip the first row, no previous month to compare too
        if total_months > 1:
            # calculate change by taking the profit of row and subtracting from last prious profit.
            change = int(row[1]) - pProfits
            changes.append(change)
            change_months.append(row[0])
       
        pProfits = int(row[1])

        print(row)

# calculate average changes and round value
avg_changes = round(sum(changes)/len(changes),2)

# put results in one string
results = f"""Results
-----------------------------
Total Months: {total_months} 
total: ${tProfits} 
Average change: ${avg_changes} 
Largest increase in profit: Feb-2012 ${max(changes)} 
Greatest decrease in profit: Sep-2013 ${min(changes)}"""

print(results)

with open("Instructions/PyBank/results.txt", "w") as file:
    file.write(results)