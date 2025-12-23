## 慢SQL 优化

### or条件
使用union all替换
```sql
select * from tablea A,tableb B where A.id = B.sourceId and A.tran_code = B.tran_code
and A.name = B.name
or A.name != ''
or A.name is null
or A.name = 'TEST'
or A.name exists (select 'X' from tablec C where A.name = C.name)
```
修改为
```sql
select * from tablea A,tableb B where A.id = B.sourceId and A.tran_code = B.tran_code
and A.name = B.name

union all

select * from tablea A,tableb B where A.id = B.sourceId and A.tran_code = B.tran_code
and A.name != ''

union all

select * from tablea A,tableb B where A.id = B.sourceId and A.tran_code = B.tran_code
and A.name is null

union all

select * from tablea A,tableb B where A.id = B.sourceId and A.tran_code = B.tran_code
and A.name = 'TEST'

union all

select * from tablea A,tableb B where A.id = B.sourceId and A.tran_code = B.tran_code
and A.name exists (select 'X' from tablec C where A.name = C.name)
```
> or不满足最左索引匹配，需要对tablea增加联合索引id,tran_code,name;tableb增加sourceId,tran_code,name和name两个索引

