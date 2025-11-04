from db_module import *
import csv
from colorama import Fore, Back, Style

selcol = ""
selkurso = ""
selSub = ""

# ============================
# SELECT COLLEGE
# ============================
college = getCollege()

for col in college:
    print(f"{Fore.GREEN}ID: {col['id']} {col['name']}{Style.RESET_ALL}")

selcol = input(Fore.RED + "Select College: " + Style.RESET_ALL)

print(f"{Fore.YELLOW}Selected College: {selcol}!{Style.RESET_ALL}")

# ============================
# SELECT COURSE
# ============================
kurso = getCourseBYCollege(selcol)

for k in kurso:
    print(f"{Fore.GREEN}ID: {k['id']} {k['name']}{Style.RESET_ALL}")

selkurso = input(Fore.RED + "Select Course: " + Style.RESET_ALL)

# ============================
# SELECT SUBJECT
# ============================
subjects = getSubjectByCourse(selkurso)

for s in subjects:
    print(f"{Fore.GREEN}ID: {s['id']} {s['code']} - {s['name']}{Style.RESET_ALL}")

selSub = input(Fore.RED + "Select Subject: " + Style.RESET_ALL)

# ============================
# CREATE OUTPUT FILES
# ============================
found_file = open("found.csv", "w", newline="", encoding="utf-8")
notfound_file = open("notfound.csv", "w", newline="", encoding="utf-8")

found_writer = csv.writer(found_file)
notfound_writer = csv.writer(notfound_file)

# headers
found_writer.writerow(["title", "bkID", "parsed_biblio"])
notfound_writer.writerow(["title"])

# ============================
# PROCESS TITLES
# ============================
with open("title.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)

    for row in reader:
        title = row["title"].strip()
        author = row['author'].strip()
        cpr = row["copyright"].strip()
        book = getBookbyTitle(title, author, cpr)

        if book and len(book) > 0:
            b = book[0]

            #print(Fore.GREEN + f"FOUND: {b['Title']}" + Style.RESET_ALL)

            parsed = parse_biblio(b["Maintext"])
            #print(parsed)

            success = insert_collection_by_subject(
                subject_id=int(selSub),
                bkid=b["bkID"],
                parsed=parsed
            )

            if success:
                print(Fore.GREEN + f"Inserted : {b['Title']}" + Style.RESET_ALL)
            else:
                print(Fore.RED + "Insert failed!" + Style.RESET_ALL)

            # ✅ Write to found.csv
            found_writer.writerow([title, b["bkID"], parsed])

        else:
            print(Fore.RED + f"NOT FOUND: {title}" + Style.RESET_ALL)

            # ✅ Write to notfound.csv
            notfound_writer.writerow([title])

# ============================
# CLOSE FILES
# ============================
found_file.close()
notfound_file.close()

print(Fore.CYAN + "\nProcessing completed!" + Style.RESET_ALL)
print("✅ found.csv created")
print("✅ notfound.csv created")
