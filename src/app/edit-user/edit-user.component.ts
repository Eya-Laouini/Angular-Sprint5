import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../model/Role';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  user!:User;
  r!:string;
  err:number = 0;
  constructor(
    private authService :AuthService,
    private router:Router,
    private  activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
   this.authService.getUserById(this.activatedRoute.snapshot.params['id']).subscribe((res)=>{
      console.log(res);
      this.user =res
    }
    )



  }


  updateUser(){
    console.log(this.user)
    this.authService.updateUser(this.user).subscribe({
      next:(res)=>{
        console.log(res);
         this.router.navigate(["/allUsers"])
      },
      error:(err:any)=>{
        this.err = 1;
      }
    }
    )





    // this.authService.login(this.user).subscribe({
    //   next: (data) => {
    //   let jwToken = data.headers.get('Authorization')!;
    //   this.authService.saveToken(jwToken);
    //   this.router.navigate(['/']);
    //   },
    //   error: (err: any) => {
    //   this.err = 1;
    //   }
    //   });








  }

deleteRole(role : string){
  
  this.user.roles = this.user.roles?.filter((r)=>r.role!=role)

}

addRole(id: number) {
  if (!this.r || this.user.roles.find((r) => r.role === this.r)) {
    return;
  }

  let role: Role = new Role();
  role.role = this.r;

  this.user.roles.push(role);

  const idUtilisateur = id; // Remplacez par l'ID de l'utilisateur que vous souhaitez modifier.
  this.authService.addRoleToUser(idUtilisateur, role).subscribe((user) => {
    // Traitez la réponse ici.
  });
}

}
