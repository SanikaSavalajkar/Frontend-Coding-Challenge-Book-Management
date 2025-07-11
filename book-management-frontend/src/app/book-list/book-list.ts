import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.css']
})
export class BookList implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

 ngOnInit() {
  this.bookService.getBooks().subscribe({
    next: (data) => {
      console.log('📚 Books received:', data); // ← logs book list
      this.books = data;
    },
    error: (err) => {
      console.error('❌ Error fetching books:', err); // ← logs any backend/API error
    }
  });
}

  delete(isbn: string) {
    this.bookService.deleteBook(isbn).subscribe(() => {
      this.books = this.books.filter(b => b.isbn !== isbn);
    });
  }
}