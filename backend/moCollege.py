from mod.db1 import migrate_College, migrate_Course


# Source Database
db1_cfg = {
    "host": "127.0.0.1",
    "user": "root",
    "password": "140053ken!",
    "database": "library_manager"
}

# Destination
db2_cfg = {
    "host": "127.0.0.1",
    "user": "root",
    "password": "140053ken!",
    "database": "nextjs16"
}

#migrate_College(db1_cfg, db2_cfg)
migrate_Course(db1_cfg, db2_cfg)

