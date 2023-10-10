import { DestinoViajes } from "./destino-viajes.model";
import { Subject, BehaviorSubject } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ElegidoFavoritoAction, NuevoDestinoAction } from "./destino-viajes-state.model";
import { AppState } from "../app.module";
import { HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";

@Injectable()
export class DestinoApiModel {

    destinos: DestinoViajes[] = [];

    constructor(private store: Store<AppState>) {
        this.destinos = [] as DestinoViajes[]   //inicializa el array;
        this.store
            .select(state => state.destinos)
            .subscribe((data) => {
                this.destinos = data.items;
            });
    }


    add(d: DestinoViajes) {
        this.store.dispatch(new NuevoDestinoAction(d));
    }


    getAll(): DestinoViajes[] {
        return this.destinos;
    }

    getById(id: string): DestinoViajes {
        return this.destinos.filter(function (d) { return d.id.toString() === id; })[0];
    }

    elegido(d: DestinoViajes) {
        this.store.dispatch(new ElegidoFavoritoAction(d));
    }
}

