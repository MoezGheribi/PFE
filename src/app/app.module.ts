import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ErreurComponent } from './erreur/erreur.component';
import {RouterModule,Routes} from "@angular/router";
import {AuthguardGuard} from "./services/authguard.guard";
import {AuthService} from "./services/auth.service";
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { LayoutComponent } from './home/layout/layout.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RestService} from "./services/rest.service";
import { GestionPublicationComponent } from './home/layout/gestion-publication/gestion-publication.component';
import { BoiteReceptionComponent } from './home/layout/boite-reception/boite-reception.component';
import { SerchPipe } from './recherche/serch.pipe';
import { Serch1Pipe } from './recherche/serch1.pipe';
import { Serch2Pipe } from './recherche/serch2.pipe';
import { GestionVoyageurComponent } from './home/layout/gestion-voyageur/gestion-voyageur.component';
import { GestionConducteurComponent } from './home/layout/gestion-conducteur/gestion-conducteur.component';
import {Delete} from "./home/layout/gestion-voyageur/delete-model";


  const router: Routes= [
    {path:'',component: LoginComponent},

    {path:'home',component: HomeComponent,canActivateChild :[AuthguardGuard],
     children : [
       {path:'' , component : LayoutComponent},
       {path:'accueil' , component : LayoutComponent},
       {path:'gestionconducteur' , component : GestionConducteurComponent},
       {path:'gestionvoyageur' , component : GestionVoyageurComponent},
       {path:'gestionpublication' , component : GestionPublicationComponent},
       {path:'boitereception' , component : BoiteReceptionComponent},


     ]},

    {path:'**',component: ErreurComponent}

  ]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErreurComponent,
    LoginComponent,
    SidebarComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    GestionConducteurComponent,
    GestionVoyageurComponent,
    GestionPublicationComponent,
    BoiteReceptionComponent,
    SerchPipe,
    Serch1Pipe,
    Serch2Pipe,
    Delete





  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router),
    HttpClientModule,
    FormsModule,

  ],
  providers: [AuthguardGuard,AuthService,RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
