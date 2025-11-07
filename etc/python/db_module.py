# db_module.py
import mysql.connector
import re
from mysql.connector import Error
from datetime import datetime

def get_connection():
    return mysql.connector.connect(
        host="10.2.42.7",
        user="root",
        password="140053ken!",
        database="nextjs16"
    )

def fetch_books():
    db = get_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT * FROM books")
    rows = cursor.fetchall()

    cursor.close()
    db.close()

    return rows

def getBookbyTitle(title, author, cpr):
    db = get_connection()
    cursor = db.cursor(dictionary=True)

    sql = """
        SELECT *
        FROM books
        WHERE title = %s
          AND Maintext LIKE %s
          AND Maintext LIKE %s
    """

    # Normalize search inputs
    author_clean = author.strip() if author else ""
    cpr_clean = cpr.strip() if cpr else ""

    # ✅ Build MARC tag patterns
    # We allow ANY text before and after
    author_pattern = f"%<004>%{author_clean}%<005>%" if author_clean else "%"
    cpr_pattern = f"%<0011>%{cpr_clean}%<0012>%" if cpr_clean else "%"

    params = (title, author_pattern, cpr_pattern)

    cursor.execute(sql, params)

    rows = cursor.fetchall()

    cursor.close()
    db.close()

    return rows


def getCollege():
    db = get_connection()
    cursor = db.cursor(dictionary=True)

    # ✅ Correct MySQL placeholder
    cursor.execute("SELECT * FROM colleges")

    rows = cursor.fetchall()

    cursor.close()
    db.close()

    return rows

def getCourseBYCollege(collegeid):
    db = get_connection()
    cursor = db.cursor(dictionary=True)

    # ✅ Correct MySQL placeholder
    cursor.execute("SELECT * FROM courses where college_id = %s", (collegeid,))

    rows = cursor.fetchall()

    cursor.close()
    db.close()

    return rows

def getSubjectByCourse(courseid):
    db = get_connection()
    cursor = db.cursor(dictionary=True)

    # ✅ Correct MySQL placeholder
    cursor.execute("SELECT * FROM subjects where course_id = %s", (courseid,))

    rows = cursor.fetchall()

    cursor.close()
    db.close()

    return rows


def parse_biblio(maintext: str) -> dict:
    """
    Parse MARC-like <00X> fields from Maintext into a dictionary.

    Example format:
    <001>Title<007>Contributors<009>Place...
    """

    parsed = {}

    # Split by the record separator ""
    parts = maintext.split("")

    for part in parts:
        # Match fields like <001>Value
        match = re.match(r"<(\d+?)>(.*)", part.strip())
        if match:
            tag = match.group(1)     # e.g. "001"
            value = match.group(2).strip() or None

            # Save to dictionary
            parsed[tag] = value

    return parsed

def parse_maintext(raw: str) -> dict:
    """
    Extract MARC-like <00X> tags into a dictionary.
    Cleans ASCII control characters like 
    """

    if not raw:
        return {}

    # Remove control chars
    cleaned = raw.replace("", "").strip()

    # Find tags <000>, <001>, ... <0039>, <0042>
    pattern = r"<(\d{3,4})>(.*?)((?=<\d{3,4}>)|$)"
    matches = re.findall(pattern, cleaned, flags=re.DOTALL)

    parsed = {}
    for tag, value, _ in matches:
        parsed[tag] = value.strip() if value else ""

    return parsed


def insert_collection_by_subject(subject_id: int, bkid: str, parsed: dict):
    sql = """
        INSERT INTO collection_by_subjects (
            subject_id, bkid, title, author, contributor, publisher,
            copyrights, isbn, call_number, accession_number,
            edition, place_of_publication, material_type, code,
            is_fil, created_at, updated_at, copies
        ) VALUES (
            %(subject_id)s, %(bkid)s, %(title)s, %(author)s, %(contributor)s, %(publisher)s,
            %(copyrights)s, %(isbn)s, %(call_number)s, %(accession_number)s,
            %(edition)s, %(place_of_publication)s, %(material_type)s, %(code)s,
            %(is_fil)s, %(created_at)s, %(updated_at)s, %(copies)s
        )
    """

    # ✅ MAP FIELDS FROM PARSED MAIN TEXT
    title       = parsed.get("001")
    author      = parsed.get("004")      # Authors
    contributor = parsed.get("007")      # Sometimes blank
    place       = parsed.get("009")
    publisher   = parsed.get("0010")
    year        = parsed.get("0011")
    edition     = parsed.get("0012")
    pages       = parsed.get("0013")
    size        = parsed.get("0015")
    isbn        = parsed.get("0019")
    subject     = parsed.get("0020")
    code        = parsed.get("0024")
    callno      = parsed.get("0025")
    accno_raw   = parsed.get("0026", "")
    language    = parsed.get("0027")
    shelf       = parsed.get("0028")
    copy_count  = parsed.get("0030")
    availability= parsed.get("0032")
    material    = parsed.get("0039")     # "Text"

    # ✅ Flag if FIL collection
    is_fil = 1 if code and "FIL" in code.upper() else 0

    # ✅ Handle multiple accession numbers
    if accno_raw:
        acc_list = [a.strip() for a in accno_raw.split(";") if a.strip()]
        copies = len(acc_list)
        accno = acc_list[0] if len(acc_list) > 0 else None
    else:
        copies = 0
        accno = None

    data = {
        "subject_id": subject_id,
        "bkid": bkid,
        "title": title,
        "author": author,
        "contributor": contributor,
        "publisher": publisher,
        "copyrights": year,
        "isbn": isbn,
        "call_number": callno,
        "accession_number": accno,
        "edition": edition,
        "place_of_publication": place,
        "material_type": material,
        "code": code,
        "copies": copies,
        "is_fil": is_fil,
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
    }

    try:
        db = get_connection()
        cursor = db.cursor()
        cursor.execute(sql, data)
        db.commit()
        return True

    except Error as e:
        print("❌ ERROR inserting:", e)
        print("📌 FULL DATA:", data)
        return False