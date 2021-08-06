import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentComponent } from './components/comment/comment.component';
import { CreateCommentComponent } from './components/create-comment/create-comment.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PostComponent } from './components/post/post.component';
import { PostsComponent } from './components/posts/posts.component';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { AboutComponent } from './pages/about/about.component';
import { CguComponent } from './pages/cgu/cgu.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { ForumComponent } from './pages/forum/forum.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PolitiqueComponent } from './pages/politique/politique.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { AdminComponent } from './pages/admin/admin.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForumComponent,
    HomeComponent,
    CommentsComponent,
    CguComponent,
    PolitiqueComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    CreatePostComponent,
    PostsComponent,
    CreateCommentComponent,
    CommentComponent,
    PostComponent,
    PostDetailComponent,
    UserItemComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
