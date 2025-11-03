"use client";

import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState, useEffect } from "react";
import { BookDataTable } from "./book-data-table";

import { columns, Book, CollectionColumns } from "@/components/custom/books";

export function SearchBar() {
  const [books, setBooks] = useState<Book[]>([]);     // results
  const [query, setQuery] = useState("");     // search keyword
  const [loading, setLoading] = useState(false);

  // ✅ Fetch only when user types
  useEffect(() => {
    if (!query.trim()) {
      setBooks([]); // clear results when empty
      return;
    }

    const delay = setTimeout(() => {
      setLoading(true);

      fetch(`/api/db/collection/books?search=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((json) => {
          setBooks(json.data ?? []);
          console.log("Search results:", json.data); // ✅ Console log here
        })
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="grid w-full m-5">
      <InputGroup>
        <InputGroupInput
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <InputGroupAddon>
          <Search />
        </InputGroupAddon>

        <InputGroupAddon align="inline-end">
          {loading ? "..." : `${books.length} results`}
        </InputGroupAddon>
      </InputGroup>

        {books.length > 0 &&  <BookDataTable columns={CollectionColumns} data={books} />}


        <div className="border mt-3 text-center p-2 rounded-2xl">
            <em>Search results will appear here.</em>

            <BookDataTable columns={CollectionColumns} data={[]} />
        </div>

       
    </div>
  );
}
