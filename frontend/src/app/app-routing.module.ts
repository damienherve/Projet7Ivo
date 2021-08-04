import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CguComponent } from './cgu/cgu.component';
import { CommentsComponent } from './comments/comments.component';
import { ForumComponent } from './forum/forum.component';
import { HomeComponent } from './home/home.component';
import { PolitiqueComponent } from './politique/politique.component';
import { ProfileComponent } from './profile/profile.component';
import { TopicComponent } from './topic/topic.component';


const routes: Routes = [
  { path:'', component:HomeComponent },
  { path:'login', component:LoginComponent },
  { path:'signup', component:SignupComponent },
  { path:'forum', component:ForumComponent },  
  { path:'profile', component:ProfileComponent },
  {path:'topic', component: TopicComponent},
  {path:'comments', component: CommentsComponent},
  {path:'cgu', component: CguComponent},
  {path:'politique', component: PolitiqueComponent},
  {path:'about', component: AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
