import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetImagesService {

  BASE_URL = "https://pixabay.com/api/";
  API_KEY = "9656065-a4094594c34f9ac14c7fc4c39";
  searchTerm = "red roses";

  constructor(private http: HttpClient) {

   }

  ngOnInit() { }

  getImages() {
    return this.http.get(this.BASE_URL + "?key=" + this.API_KEY + "&q=" + encodeURIComponent(this.searchTerm));
    // return this.http.get("https://pixabay.com/api/?key=9656065-a4094594c34f9ac14c7fc4c39&q=beautiful+landscape&image_type=photo");
  }

}
