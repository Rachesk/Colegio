import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot,UrlTree, GuardResult, MaybeAsync } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class noingresadoGuard implements CanActivate{
  constructor(public navCtrl: NavController){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
      if(localStorage.getItem('ingresado')){
        this.navCtrl.navigateRoot('menu-home');
        return false;
      }else{
        return true;
      }
    }
}