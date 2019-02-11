import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
const httpOptionsForFormData = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data'
  })
}

@Injectable({
  providedIn: 'root'
})
export class FolderStructureService {

  constructor(private http: HttpClient) { }
  apiEndPoint: string = "http://localhost:29816/api/";

  getFolderContents(path: string): Observable<object[]> {
    return this.http.post<object[]>(this.apiEndPoint + 'values/GetFolderContents?path=' + path, { path });
  }

  createNewFolder(formData: FormData) {
    return this.http.post<object[]>(this.apiEndPoint + 'values/createNewFolder', formData);
  }

  uploadFile(formData: FormData): Observable<object[]> {
    return this.http.post<object[]>(this.apiEndPoint + 'values/uploadFile', formData);
  }
}
