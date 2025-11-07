from db_module import *
import csv
from colorama import Fore, Style

def process_titles(selSub):
    """Process titles from title.csv and insert them by subject"""
    found_file = open("found.csv", "w", newline="", encoding="utf-8")
    notfound_file = open(f"notfound-{selSub}.csv", "w", newline="", encoding="utf-8")

    found_writer = csv.writer(found_file)
    notfound_writer = csv.writer(notfound_file)

    found_writer.writerow(["title", "bkID", "parsed_biblio"])
    notfound_writer.writerow(["title"])

    with open("title.csv", "r", encoding="utf-8-sig", errors="replace") as f:
        reader = csv.DictReader(f)
        for row in reader:
            title = row["title"].strip()
            author = row["author"].strip()
            cpr = row["copyright"].strip()

            book = getBookbyTitle(title, author, cpr)

            if book and len(book) > 0:
                b = book[0]
                parsed = parse_biblio(b["Maintext"])

                success = insert_collection_by_subject(
                    subject_id=int(selSub),
                    bkid=b["bkID"],
                    parsed=parsed
                )

                if success:
                    print(Fore.GREEN + f"Inserted: {b['Title']} : {author}" + Style.RESET_ALL)
                else:
                    print(Fore.RED + "Insert failed!" + Style.RESET_ALL)

                found_writer.writerow([title, b["bkID"], parsed])
            else:
                print(Fore.RED + f"NOT FOUND: {title} : {author}" + Style.RESET_ALL)
                notfound_writer.writerow([title])

    found_file.close()
    notfound_file.close()

    print(Fore.CYAN + "\nProcessing completed!" + Style.RESET_ALL)
    print("✅ found.csv created")
    print(f"✅ notfound-{selSub}.csv created\n")

# ===========================================================
# MAIN LOOP
# ===========================================================
while True:
    print(Fore.CYAN + "\n===== COLLEGE SELECTION =====" + Style.RESET_ALL)
    college = getCollege()
    for col in college:
        print(f"{Fore.GREEN}ID: {col['id']} {col['name']}{Style.RESET_ALL}")

    selcol = input(Fore.RED + "Select College (or 'q' to quit): " + Style.RESET_ALL)
    if selcol.lower() == 'q':
        print(Fore.CYAN + "Exiting program..." + Style.RESET_ALL)
        break

    print(Fore.YELLOW + f"Selected College: {selcol}" + Style.RESET_ALL)

    print(Fore.CYAN + "\n===== COURSE SELECTION =====" + Style.RESET_ALL)
    kurso = getCourseBYCollege(selcol)
    for k in kurso:
        print(f"{Fore.GREEN}ID: {k['id']} {k['name']}{Style.RESET_ALL}")

    selkurso = input(Fore.RED + "Select Course (or 'b' to go back): " + Style.RESET_ALL)
    if selkurso.lower() == 'b':
        continue

    print(Fore.CYAN + "\n===== SUBJECT SELECTION =====" + Style.RESET_ALL)
    subjects = getSubjectByCourse(selkurso)
    for s in subjects:
        print(f"{Fore.GREEN}ID: {s['id']} {s['level']} {s['code']} - {s['name']}{Style.RESET_ALL}")

    selSub = input(Fore.RED + "Select Subject (or 'b' to go back): " + Style.RESET_ALL)
    if selSub.lower() == 'b':
        continue

    print(Fore.YELLOW + f"\nSelected Subject: {selSub}" + Style.RESET_ALL)
    confirm = input(Fore.CYAN + "Proceed with processing title.csv? (y/n): " + Style.RESET_ALL)
    if confirm.lower() == 'n':
        print(Fore.YELLOW + "Skipping processing..." + Style.RESET_ALL)
    else:
        process_titles(selSub)
       

    again = input(Fore.CYAN + "Do you want to select again? (y/n): " + Style.RESET_ALL)
    if again.lower() == 'n':
        print(Fore.CYAN + "Goodbye!" + Style.RESET_ALL)
        break
