import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DestinoViajes } from './destino-viajes.model';
import { HttpClientModule } from '@angular/common/http';


//estados

export interface DestinosviajesState {
    items: DestinoViajes[];
    loading: boolean;
    favorito: DestinoViajes;
}
export function intializeDestinosviajesState() {
    return {
        items: [],
        loading: false,
        favorito: null
    };
};
///////acciones
export enum DestinosviajesActionTypes {
    NUEVO_DESTINO = '[Destinos viajes] Nuevo',
    ELEGIDO_FAVORITO = '[Destinos viajes] Favorito',
    VOTE_UP = '[Destinos viajes] Vote Up',
    VOTE_DOWN = '[Destinos viajes] Vote Down',
    INIT_MY_DATA = '[Destinos Viajes] Init My Data'
}
export class NuevoDestinoAction implements Action {
    type = DestinosviajesActionTypes.NUEVO_DESTINO;
    constructor(public destino: DestinoViajes) { }

}
export class ElegidoFavoritoAction implements Action {
    type = DestinosviajesActionTypes.ELEGIDO_FAVORITO;
    constructor(public destino: DestinoViajes) { }
}
export class VoteUpAction implements Action {
    type = DestinosviajesActionTypes.VOTE_UP;
    constructor(public destino: DestinoViajes) { }
}
export class VoteDownAction implements Action {
    type = DestinosviajesActionTypes.VOTE_DOWN;
    constructor(public destino: DestinoViajes) { }
}
export class InitMyDataAction implements Action {
    type = DestinosviajesActionTypes.INIT_MY_DATA;
    constructor(public destinos: string[]) { }
}
export type DestinosviajesActions = NuevoDestinoAction | ElegidoFavoritoAction
    | VoteUpAction | VoteDownAction | InitMyDataAction;
//////////reducers
export function reducerDestinosviajes(
    state: DestinosviajesState,
    action: DestinosviajesActions
): DestinosviajesState {
    switch (action.type) {
        case DestinosviajesActionTypes.INIT_MY_DATA: {
            const destinos: string[] = (action as InitMyDataAction).destinos;
            return {
                ...state,
                items: destinos.map((d) => new DestinoViajes(d, ''))
            };
        }
        case DestinosviajesActionTypes.NUEVO_DESTINO: {
            return {
                ...state,
                items: [...state.items, (action as NuevoDestinoAction).destino]
            };
        }
        case DestinosviajesActionTypes.ELEGIDO_FAVORITO: {
            state.items.forEach(x => x.setSelected(false));
            const fav: DestinoViajes = (action as ElegidoFavoritoAction).destino;
            fav.setSelected(true);
            return {
                ...state,
                favorito: fav
            };
        }
        case DestinosviajesActionTypes.VOTE_UP: {
            const d: DestinoViajes = (action as VoteUpAction).destino;
            d.voteUp();
            return { ...state };

        }
        case DestinosviajesActionTypes.VOTE_DOWN: {
            const d: DestinoViajes = (action as VoteDownAction).destino;
            d.voteDown();
            return { ...state };

        }
    }
    return state;

}
@Injectable()
export class DestinosviajesEffects {
    nuevoAgregado$ = createEffect(() => this.actions$.pipe(
        ofType(DestinosviajesActionTypes.NUEVO_DESTINO),
        switchMap((action: NuevoDestinoAction) => [
            new ElegidoFavoritoAction(action.destino)
        ])
    ));

    constructor(private actions$: Actions) { }
}