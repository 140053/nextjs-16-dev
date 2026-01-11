from mod.db1 import migrate_patron_master

# Source Database
db1_cfg = {
    "host": "127.0.0.1",
    "user": "root",
    "password": "140053ken!",
    "database": "idmaker"
}

# Destination
db2_cfg = {
    "host": "127.0.0.1",
    "user": "root",
    "password": "140053ken!",
    "database": "nextjs16"
}

migrate_patron_master(db1_cfg, db2_cfg)
