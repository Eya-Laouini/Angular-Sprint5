import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role } from '../model/Role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /*users: User[] = [{"username":"admin","password":"123","roles":['ADMIN']},
                  {"username":"Ons","password":"123","roles":['USER']} ];*/
  public loggedUser!:string;
  public isloggedIn: Boolean = false;
  public roles!:string[];
  apiURL: string = 'http://localhost:8081/users';
  token!:string;
  private helper = new JwtHelperService();
  constructor(private router: Router,private http:HttpClient,
  ) { }
  login(user : User)
  {
  return this.http.post<User>(this.apiURL+'/login', user , {observe:'response'});
  }
  saveToken(jwt:string){
    localStorage.setItem('jwt',jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
    
   }
   decodeJWT()
{ if (this.token == undefined)
 return;
const decodedToken = this.helper.decodeToken(this.token);
this.roles = decodedToken.roles;
this.loggedUser = decodedToken.sub;
}
loadToken() {
this.token = localStorage.getItem('jwt')!;
this.decodeJWT();
}

  /*SignIn(user: User): Boolean {
    let validUser: Boolean = false;

    this.users.forEach((curUser) => {
      if (user.username == curUser.username && user.password == curUser.password) {
                    validUser = true;

      this.loggedUser = curUser.username;
      this.isloggedIn = true;
      this.roles = curUser.roles;
      localStorage.setItem('loggedUser', this.loggedUser);
      localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });
    return validUser;
  }*/
      logout() {
        this.loggedUser = undefined!;
          this.roles = undefined!;
          this.token= undefined!;
          this.isloggedIn = false;
          localStorage.removeItem('jwt');
          this.router.navigate(['/login']);

        }

        isAdmin():Boolean{
            if (!this.roles)
            return false;
            return this.roles.indexOf('ADMIN') >=0;
          }

          setLoggedUserFromLocalStorage(login : string) {
            this.loggedUser = login;
            this.isloggedIn = true;
           // this.getUserRoles(login);
            }
            
          /*getUserRoles(username :string){
            this.users.forEach((curUser) => {
            if( curUser.username == username ) {
            this.roles = curUser.roles;
            }
            });
            }*/
            
              getToken():string {
              return this.token;
              }

              isTokenExpired(): Boolean
                {
                    return this.helper.isTokenExpired(this.token); 
                }
              
              deleteUser(id : number){
                return this.http.delete<User>(this.apiURL+'/delete/'+id, {observe:'response'});
              }
            
              getAllUsers(){
                return this.http.get<User[]>(this.apiURL+'/allUsers');
              }



              getUserById(id : number){
                return this.http.get<User>(this.apiURL+'/user/'+id);
              }


              
  updateUser(user : User){
    return this.http.put<User>(this.apiURL+'/Userapi/users', user, {observe:'response'});
  }


  addRoleToUser(id: number, role: Role): Observable<User> {
    const url = `${this.apiURL}/addRole/${id}`;
    return this.http.post<User>(url, role);
  }
            }
