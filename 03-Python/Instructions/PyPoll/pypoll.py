import csv
filepath = "Instructions/PyPoll/Resources/election_data.csv"

# set initial value
total_votes = 0
# list to capture names
candidates = []
# dict to store votes per candidate
candiDict = {}

# read in csv and seperate by delimiter

with open(filepath, "r") as file:
    csvreader = csv.reader(file,delimiter=',')
    # skip header 
    csvheader = next(csvreader)


    # loop through csv
    for row in csvreader:
        total_votes = total_votes + 1 


        if row[2] not in candidates:
            candidates.append(row[2])
        
        # add 1 to candidate in a dictionary 
        if row[2] in candiDict.keys():
            candiDict[row[2]] += 1
        else:
            candiDict[row[2]] = 1

    print(candiDict)   

# https://stackoverflow.com/questions/268272/getting-key-with-maximum-value-in-dictionary
bestCand = max(candiDict, key=candiDict.get)
mostVotes = candiDict[bestCand]

results = f"""Election Results
---------------------------
Total Votes: {total_votes}
---------------------------\n"""

for cand in candiDict.keys():
    percent = (candiDict[cand]/ total_votes) * 100
    results += f"{cand} {round(percent, 2)}% ({candiDict[cand]})\n"

results += f"""---------------------------
Winner: {bestCand}"""

print(results)

# writes to file
with open("Instructions/PyPoll/results.txt", "w") as file:
    file.write(results)