import mysql.connector

# ---------- DATABASE CONNECTIONS ----------
db1 = mysql.connector.connect(
    host="10.2.42.5",
    user="root",
    password="140053ken!",
    database="db_a84cf7_cbsua"     # source DB
)

db2 = mysql.connector.connect(
    host="10.2.42.5",
    user="root",
    password="140053ken!",
    database="nextjs16"     # destination DB
)

src = db1.cursor(dictionary=True)
dest = db2.cursor()

# ---------- FETCH DATA FROM DATABASE1 ----------
src.execute("SELECT * FROM books")
rows = src.fetchall()

print(f"Fetched {len(rows)} rows from database1.books")

# ---------- PREPARE INSERT QUERY ----------
insert_query = """
INSERT INTO books (
    Title, Maintext, Fil, Ref, Bio, Fic, Res, Copy, Inn, t_Out, t_TimesOut,
    images, tm, gc, tr, easy, circ, fr, sm, entered_by, date_entered,
    updated_by, date_updated, schl, acquisitionmode, donor, bkID, branch,
    restricted, filsts, coding
)
VALUES (
    %(Title)s, %(Maintext)s, %(Fil)s, %(Ref)s, %(Bio)s, %(Fic)s, %(Res)s, %(Copy)s, %(Inn)s,
    %(t_Out)s, %(t_TimesOut)s, %(images)s, %(tm)s, %(gc)s, %(tr)s, %(easy)s, %(circ)s,
    %(fr)s, %(sm)s, %(entered_by)s, %(date_entered)s, %(updated_by)s, %(date_updated)s,
    %(schl)s, %(acquisitionmode)s, %(donor)s, %(bkID)s, %(branch)s, %(restricted)s,
    %(filsts)s, %(coding)s
)
"""

# ---------- INSERT INTO DATABASE2 ----------
count = 0

for row in rows:
    try:
        dest.execute(insert_query, row)
        count += 1
    except mysql.connector.Error as err:
        print(f"Error inserting bkID={row['bkID']}: {err}")

db2.commit()
print(f"Inserted {count} rows into database2.books")

src.close()
dest.close()
db1.close()
db2.close()
