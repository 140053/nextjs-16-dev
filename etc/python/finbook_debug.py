from db_module import fetch_books

books = fetch_books()

print("TOTAL ROWS:", len(books))
print("SAMPLE ROW:")
print(books[0])   # show first row so we know the actual column names
