#!/bin/sh
source t1/bin/activate
uvicorn main:app --host 0.0.0.0 --port 4001 --reload
