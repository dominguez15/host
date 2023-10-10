// destinos.state.ts

import { createAction, props } from '@ngrx/store';
import { DestinoViajes } from './destino-viajes.model';

export interface DestinosState {
    destinos: DestinoViajes[];
    ultimaSuscripcion: string;
}

export const agregarDestino = createAction(
    '[Destinos] Agregar Destino',
    props<{ destino: DestinoViajes }>()
);

export const elegirDestino = createAction(
    '[Destinos] Elegir Destino',
    props<{ destino: DestinoViajes }>()
);

export const marcarComoPreferido = createAction(
    '[Destinos] Marcar Como Preferido',
    props<{ destino: DestinoViajes }>()
);

export const actualizarUltimaSuscripcion = createAction(
    '[Destinos] Actualizar Última Suscripción',
    props<{ mensaje: string }>()
);

