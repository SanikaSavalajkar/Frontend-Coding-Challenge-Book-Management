import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: false,
  templateUrl: './book-form.html',
  styleUrls: ['./book-form.css']
})
export class BookForm implements OnInit {
  bookForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      isbn: ['', Validators.required],
      title: ['', Validators.required],
      author: ['', Validators.required],
      publicationYear: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    const isbn = this.route.snapshot.paramMap.get('isbn');
    if (isbn) {
      this.isEditMode = true;
      this.bookService.getBook(isbn).subscribe(book => {
        this.bookForm.patchValue(book);
      });
    }
  }

  onSubmit(): void {
    const book: Book = this.bookForm.value;
    if (this.isEditMode) {
      this.bookService.updateBook(book.isbn, book).subscribe(() => {
        this.router.navigate(['/books']);
      });
    } else {
      this.bookService.addBook(book).subscribe(() => {
        this.router.navigate(['/books']);
      });
    }
  }
}