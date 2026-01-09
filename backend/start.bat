@echo 
call t1/Scripts/activate
uvicorn main:app --host 0.0.0.0 --port 4001 --reload