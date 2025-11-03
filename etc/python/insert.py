import mysql.connector

# ---------- DATABASE CONNECTIONS ----------
db1 = mysql.connector.connect(
    host="localhost",
    user="root",
    password="140053ken!",
    database="db_a84cf7_cbsua",   # source DB
    port=3306
)

db2 = mysql.connector.connect(
    host="localhost",
    user="root",
    password="140053ken!",
    database="nextjs16"    # destination DB
)

src = db1.cursor(dictionary=True)
dest = db2.cursor(dictionary=True)

# ---------- FETCH DATA FROM DATABASE1 ----------
src.execute("SELECT * FROM books")
rows = src.fetchall()

print(f"Fetched {len(rows)} rows from database1.books")

# ---------- PREPARE INSERT QUERY ----------
insert_query = """
INSERT INTO books (
    Title, Maintext, Fil, Ref, Bio, Fic, Res, Copy, Inn, t_Out, t_TimesOut,
    images, tm, gc, tr, easy, circ, fr, sm, entered_by, date_entered,
    updated_by, date_updated, schl, acquisitionmode, donor, branch,
    restricted, filsts, coding
)
VALUES (
    %(Title)s, %(Maintext)s, %(Fil)s, %(Ref)s, %(Bio)s, %(Fic)s, %(Res)s,
    %(Copy)s, %(Inn)s, %(t_Out)s, %(t_TimesOut)s, %(images)s, %(tm)s,
    %(gc)s, %(tr)s, %(easy)s, %(circ)s, %(fr)s, %(sm)s, %(entered_by)s,
    %(date_entered)s, %(updated_by)s, %(date_updated)s, %(schl)s,
    %(acquisitionmode)s, %(donor)s, %(branch)s, %(restricted)s,
    %(filsts)s, %(coding)s
)
"""

# ---------- CHECK + INSERT ----------
check_query = "SELECT 1 FROM books WHERE Title = %s LIMIT 1"

inserted = 0
skipped = 0

for row in rows:
    title = row["Title"]

    # Check duplicate title
    dest.execute(check_query, (title,))
    exists = dest.fetchone()

    if exists:
        skipped += 1
        print(f"SKIPPED (duplicate): {title}")
        continue

    # Insert into DB2 (without bkID so DB2 auto-generates it)
    dest.execute(insert_query, row)
    inserted += 1
    print(f"INSERTED: {title}")

db2.commit()

print("--------------------------------------------------")
print(f"Inserted: {inserted}")
print(f"Skipped (duplicates): {skipped}")
print("Done!")

src.close()
dest.close()
db1.close()
db2.close()
