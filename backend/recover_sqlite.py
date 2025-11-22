import sqlite3
import shutil
from pathlib import Path

DB = Path(__file__).resolve().parent / "exito.db"
BACKUP = DB.with_name("exito.db.corrupt.bak")
NEW = DB.with_name("new_exito.db")
DUMP = DB.with_name("dump.sql")

print("DB:", DB)
if not DB.exists():
    print("exito.db not found. Aborting.")
    raise SystemExit(1)

print("Backing up database to:", BACKUP)
shutil.copy(str(DB), str(BACKUP))

try:
    conn = sqlite3.connect(str(DB))
    cur = conn.cursor()
    print("Running PRAGMA integrity_check;")
    cur.execute("PRAGMA integrity_check;")
    res = cur.fetchone()
    print("integrity_check result:", res)
except Exception as e:
    print("Error opening DB or running integrity_check:", e)
    conn = None

if conn:
    try:
        print("Attempting to dump database via iterdump()")
        with open(DUMP, "w", encoding="utf-8") as f:
            for line in conn.iterdump():
                f.write(f"{line}\n")
        print("Dump written to", DUMP)
    except Exception as e:
        print("iterdump failed:", e)
        conn.close()
        raise SystemExit(1)
    conn.close()

    # Try to import dump into a new DB
    try:
        print("Importing dump into new DB:", NEW)
        if NEW.exists():
            NEW.unlink()
        with open(DUMP, "r", encoding="utf-8") as f:
            sql = f.read()
        conn2 = sqlite3.connect(str(NEW))
        conn2.executescript(sql)
        conn2.commit()
        cur2 = conn2.cursor()
        cur2.execute("PRAGMA integrity_check;")
        res2 = cur2.fetchone()
        print("new_exito.db integrity_check result:", res2)
        conn2.close()
        print("Recovery import complete. If integrity_check is 'ok', replace exito.db with new_exito.db")
    except Exception as e:
        print("Failed to import dump into new DB:", e)
        raise SystemExit(1)
else:
    print("Skipping dump/import because DB could not be opened.")
