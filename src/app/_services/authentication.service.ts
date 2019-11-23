import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';

import { Project, Message, Task, User } from '../_classes'

export interface UserDetails {
    _id: number;
    email: string;
    name: string;
    exp: number;
    iat: number;
}

export interface TaskDetails {
    _id: number;
    assignedTo: User;
    description: string;
    status: string;
    reviewedBy: User;
    // dueDate: Date;
    rating: string;
}

export interface MessageDetails {
    type: string;
    text: string;
    reply: string;
    user: {
    name: string;
    avatar: string;
    };
    date: string;
    files: string;
    quote: string;
    latitude: string;
    longitude: string;
    avatar: string;
}

export interface ProjectDetails {
    _id: string;
    name: string;
    // tasksIDs: string[];
    // createdBy: string;
    // messages: MessageDetails[];
    // metrics: {
    //     tasksOpened: number,
    //     tasksActive: number,
    //     tasksClosed: number
    // }
}

export class ProjectPackage {
    proj: Project;
    user: string;

    constructor(project: Project, userID: string) {
        this.proj = project;
        this.user = userID;
    }
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

@Injectable()
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post' | 'get', type: 'login'|'register'|'profile'|'tasks', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`/api/${type}`, user);
    } else {
      base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  private requestMetrics(type: 'users', id: number): Observable<any> {
      let base;

      base = this.http.get(`/api/metrics/${type}/${id}`, { headers: { Authorization: `Bearer ${this.getToken()}`}});
      const request = base.pipe();
      return request;
  }

  private updateRequest(method: 'patch' | 'put', type: 'tasks', task: TaskDetails): Observable<any> {
    let base;

    if (type === 'tasks') {
        base = this.http.patch(`/api/${type}/${task._id}`, task, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else {
        // Some other type
    }

    const request = base.pipe();

    console.log(request);

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  // Task Operations
    public tasks(projectid: string): Observable<any> {
        let base = this.http.get(`/api/tasks/project/${projectid}`, { headers: { Authorization: `Bearer ${this.getToken()}`}});
        const request = base.pipe();
        return request;
    }

    public postTask(project: ProjectPackage): Observable<any> {
        let base = this.http.post(`/api/projects/tasks`, project, { headers: { Authorization: `Bearer ${this.getToken()}` }});
        const request = base.pipe();
        return request;
    }

  public setTaskDescription(task: Task): Observable<any> {
      var taskDetail = {
          '_id': task._id,
          'assignedTo': task.assignedTo,
          'description': task.description,
          'status': task.status,
          'reviewedBy': task.reviewedBy,
          // 'dueDate': new Date(task.dueDate),
          'rating': task.rating
      }

      let base = this.http.patch(`/api/task/${task._id}`, taskDetail, { headers: { Authorization: `Bearer ${this.getToken()}` }});
      const request = base.pipe();
      return request;
  }

  // Project Operations
  public projects(userid: string):Observable<any> {
      let base = this.http.get(`/api/projects/${userid}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
      const request = base.pipe();
      return request;
  }

  public postProject(project: ProjectPackage): Observable<any> {
      let base = this.http.post(`/api/projects`, project, { headers: { Authorization: `Bearer ${this.getToken()}` }});
      const request = base.pipe();
      return request;
  }

  public patchUser(project: any, userid: string): Observable<any> {
      let base = this.http.patch(`/api/users/${userid}`, project, { headers: { Authorization: `Bearer ${this.getToken()}` }});
      const request = base.pipe();
      return request;
  }

  // Chat Operations
  public patchMessages(projectid: string, message: Message): Observable<any> {
      let base = this.http.patch(`/api/projects/${projectid}/messages`, message, { headers: { Authorization: `Bearer ${this.getToken()}` }});
      const request = base.pipe();
      return request;
  }

  public getMessages(projectid: string): Observable<any> {
      let base = this.http.get(`/api/${projectid}/messages`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
      const request = base.pipe();
      return request;
  }

  // User Metric Operations
  public getUserMetrics(id: number): Observable<any> {
      return this.requestMetrics('users', id);
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  // Example HTTP Error logging from official Angular site
  // /**
  //  * Handle Http operation that failed.
  //  * Let the app continue.
  //  * @param operation - name of the operation that failed
  //  * @param result - optional value to return as the observable result
  //  */
  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead
  //
  //     // TODO: better job of transforming error for user consumption
  //     this.log(`${operation} failed: ${error.message}`);
  //
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }
  //
  // /** Log a AuthenticationService message with the MessageService */
  // private log(message: string) {
  //   console.log(message);
  // }
}
