---
title: Databases
author: Zoltan Fabian
tags:
    - database
---
# MySQL

## dbdump

```bash
mysqldump --add-drop-database --add-drop-table -v --single-transaction -R -E -F --flush-privileges --add-locks -B ${DBNAME} -p | gzip -c > dbdump_${DBNAME}.sql.gz
mysqldump.exe --defaults-file="c:\users\fz000005\appdata\local\temp\tmpdcjgcf.cnf"  --set-gtid-purged=OFF --host=hisatv2.global-intra.net --order-by-primary=TRUE --protocol=tcp --user=root --flush-logs=TRUE --port=3306 --default-character-set=utf8 --routines --events --single-transaction=TRUE --databases "databasename" "databasename2"
```

## binary log purge

```sql
purge binary logs before '2017-05-31'
```

## MySQL table recover

To repair a corrupted MySQL ISAM database:

```bash
myisamchk --check *.MYI ; myisamchk --recover xxx.MYI
```

## Queries

### Update by Join

```sql
UPDATE shipping_price sp
    LEFT JOIN company_site cs ON sp.company_id = cs.company_id
        SET sp.company_site_id = COALESCE (cs.id, 0)
    WHERE sp.id>0;
```
