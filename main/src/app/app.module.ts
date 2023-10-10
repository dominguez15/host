import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaViajesComponent } from './lista-viajes/lista-viajes.component';
import { DestinoViajesComponent } from './destino-viajes/destino-viajes.component';
import { DestinoComponent } from './destino/destino.component';
import { FormDestinoVieajesComponent } from './form-destino-vieajes/form-destino-vieajes.component';
import { DestinoApiModel } from './model/destino-api.model';
import { StoreModule as NgRxStoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DestinosviajesEffects, DestinosviajesState, intializeDestinosviajesState, reducerDestinosviajes } from './model/destino-viajes-state.model';

const rutas: Routes = [
  { path: '', component: ListaViajesComponent },
  { path: 'destinos', component: DestinoComponent }
]

//redux init
export interface AppState {
  destinos: DestinosviajesState;
}
///redux fin init
const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinosviajes
};

const reducersInitialState = {
  destinos: intializeDestinosviajesState()
};

@NgModule({
  declarations: [
    AppComponent,
    ListaViajesComponent,
    DestinoViajesComponent,
    DestinoComponent,
    FormDestinoVieajesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(rutas),
    FormsModule,
    ReactiveFormsModule,
    NgRxStoreModule.forRoot(
      reducers,
      { initialState: reducersInitialState }
    ),
    EffectsModule.forRoot([DestinosviajesEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: false })
  ],
  providers: [
    DestinoApiModel
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }