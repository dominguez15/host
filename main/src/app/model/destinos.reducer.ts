// destinos.reducer.ts

import { createReducer, on } from '@ngrx/store';
import * as DestinosActions from './destinos.state';
import { DestinosState } from './destinos.state';

export const initialState: DestinosState = {
    destinos: [],
    ultimaSuscripcion: ''
};

export const destinosReducer = createReducer(
    initialState,
    on(DestinosActions.agregarDestino, (state, { destino }) => ({
        ...state,
        destinos: [...state.destinos, destino]
    })),
    on(DestinosActions.elegirDestino, (state, { destino }) => {
        // Asegúrate de que este log muestre el estado Redux correctamente
        return {
            ...state,
            destinos: state.destinos.map(d => {
                if (destino === d) {
                    destino.setSelected(true);
                } else {
                    d.setSelected(false);
                }
                return d;
            }),
        };
    }),
    on(DestinosActions.marcarComoPreferido, (state, { destino }) => ({
        ...state,
        // Aquí asumimos que existe una función setSelected en el modelo DestinoViajes
        destinos: state.destinos.map(d => {
            if (destino === d) {
                destino.setSelected(true);
            } else {
                d.setSelected(false);
            }
            return d;
        }),
    })),
    on(DestinosActions.actualizarUltimaSuscripcion, (state, { mensaje }) => ({
        ...state,
        ultimaSuscripcion: mensaje
    }))
);
