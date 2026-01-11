import mysql.connector
from mysql.connector import errorcode


def get_connection(host, user, password, database):
    try:
        return mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            raise Exception("Invalid database credentials")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            raise Exception("Database does not exist")
        else:
            raise



def normalize_gender(value):
    if not value:
        return "Other"

    v = str(value).strip().lower()

    if v in ("m", "male"):
        return "Male"
    if v in ("f", "female"):
        return "Female"

    return "Other"


def migrate_patron_master(db1_cfg, db2_cfg):
    """
    Copy patron_master records from db1 to db2 (safe migration)
    """

    src_conn = None
    dst_conn = None
    src_cursor = None
    dst_cursor = None

    try:
        # Connect to source DB
        src_conn = get_connection(**db1_cfg)
        src_cursor = src_conn.cursor(dictionary=True)

        # Connect to destination DB
        dst_conn = get_connection(**db2_cfg)
        dst_cursor = dst_conn.cursor()

        # Fetch data
        src_cursor.execute("SELECT * FROM patron_master")
        rows = src_cursor.fetchall()

        if not rows:
            print("No records found.")
            return

        # 🔧 Normalize gender BEFORE insert
        for row in rows:
            row["gender"] = normalize_gender(row.get("gender"))

        insert_sql = """
        INSERT INTO patron_master (
            name, address, Degree_Course, User_Class, Year_Level, IDnum,
            DateApplied, DateExpired, email, gender, campus, Bkloan,
            telephone, Overdue, remarks, suspended, tag, photo, esig,
            reg_date, College, Course_Code
        ) VALUES (
            %(name)s, %(address)s, %(Degree_Course)s, %(User_Class)s, %(Year_Level)s, %(IDnum)s,
            %(DateApplied)s, %(DateExpired)s, %(email)s, %(gender)s, %(campus)s, %(Bkloan)s,
            %(telephone)s, %(Overdue)s, %(remarks)s, %(suspended)s, %(tag)s, %(photo)s, %(esig)s,
            %(reg_date)s, %(College)s, %(Course_Code)s
        )
        ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            address = VALUES(address),
            email = VALUES(email),
            telephone = VALUES(telephone),
            remarks = VALUES(remarks)
        """

        dst_cursor.executemany(insert_sql, rows)
        dst_conn.commit()

        print(f"✅ Migrated {dst_cursor.rowcount} records successfully.")

    except Exception as e:
        dst_conn.rollback()
        print("❌ Migration failed:", e)

    finally:
        if src_cursor:
            src_cursor.close()
        if dst_cursor:
            dst_cursor.close()
        if src_conn:
            src_conn.close()
        if dst_conn:
            dst_conn.close()


        

def migrate_College(db1_cfg, db2_cfg):
    """
    Copy College from the idmaker to the database
    """
    src_conn = None
    dst_conn = None
    src_cursor = None
    dst_cursor = None

    try:
        # Connect to source DB
        src_conn = get_connection(**db1_cfg)
        src_cursor = src_conn.cursor(dictionary=True)

        # Connect to destination DB
        dst_conn = get_connection(**db2_cfg)
        dst_cursor = dst_conn.cursor()

        # Fetch data
        src_cursor.execute("SELECT * FROM colleges")
        rows = src_cursor.fetchall()


        if not rows:
            print("No records found.")
            return
        

        insert_sql = """
        INSERT INTO colleges (
            name, code
        ) VALUES (
            %(name)s, %(code)s
        )
        ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            code = VALUES(code)            
        """

        dst_cursor.executemany(insert_sql, rows)
        dst_conn.commit()

        print(f"✅ Migrated {dst_cursor.rowcount} records successfully.")


    except Exception as e:
        dst_conn.rollback()
        print("❌ Migration failed:", e)
    finally:
        if src_cursor:
            src_cursor.close()
        if dst_cursor:
            dst_cursor.close()
        if src_conn:
            src_conn.close()
        if dst_conn:
            dst_conn.close()

def migrate_Course(db1_cfg, db2_cfg):
    """
    Copy College from the idmaker to the database
    """
    src_conn = None
    dst_conn = None
    src_cursor = None
    dst_cursor = None

    try:
        # Connect to source DB
        src_conn = get_connection(**db1_cfg)
        src_cursor = src_conn.cursor(dictionary=True)

        # Connect to destination DB
        dst_conn = get_connection(**db2_cfg)
        dst_cursor = dst_conn.cursor()

        # Fetch data
        src_cursor.execute("SELECT * FROM courses")
        rows = src_cursor.fetchall()


        if not rows:
            print("No records found.")
            return
        

        insert_sql = """
        INSERT INTO courses (
            college_id, name, code
        ) VALUES (
            %(college_id)s,%(name)s, %(code)s
        )
        ON DUPLICATE KEY UPDATE
            college_id = VALUES(college_id),
            name = VALUES(name),
            code = VALUES(code)            
        """

        dst_cursor.executemany(insert_sql, rows)
        dst_conn.commit()

        print(f"✅ Migrated {dst_cursor.rowcount} records successfully.")


    except Exception as e:
        dst_conn.rollback()
        print("❌ Migration failed:", e)
    finally:
        if src_cursor:
            src_cursor.close()
        if dst_cursor:
            dst_cursor.close()
        if src_conn:
            src_conn.close()
        if dst_conn:
            dst_conn.close()




if __name__ == "__main__":
    get_connection()
    migrate_College()
    migrate_patron_master()
        



    


    
