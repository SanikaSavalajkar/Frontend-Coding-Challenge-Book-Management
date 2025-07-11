import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Book } from './models/book.model';

@Injectable({
  providedIn: 'root'
})

export class BookService {

  private baseUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getHeaders() {
  const token = this.authService.getToken();
  const headers = token
    ? new HttpHeaders({ Authorization: `Bearer ${token}` })
    : new HttpHeaders();
    return { headers };
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl, this.getHeaders());
  }

  getBook(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${isbn}`);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, book, this.getHeaders());
  }

  updateBook(isbn: string, book: Book): Observable<Book> {
  return this.http.put<Book>(`${this.baseUrl}/${isbn}`, book);
  }

  deleteBook(isbn: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${isbn}`, this.getHeaders());
  }
  
}
