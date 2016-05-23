import {nativeScriptBootstrap} from "nativescript-angular/application";
import {AppComponent} from "./app.component";
import {enableProdMode} from "@angular/core";
enableProdMode();

nativeScriptBootstrap(AppComponent);