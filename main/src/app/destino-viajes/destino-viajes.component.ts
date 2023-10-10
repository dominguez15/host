import { Component, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { DestinoViajes } from '../model/destino-viajes.model';
import { VoteDownAction, VoteUpAction } from '../model/destino-viajes-state.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';

@Component({
  selector: 'app-destino-viajes',
  templateUrl: './destino-viajes.component.html',
  styleUrls: ['./destino-viajes.component.css']
})

export class DestinoViajesComponent {
  @Input() destino: DestinoViajes;
  @Input('idx') posicion: number;
  @HostBinding('class') cssClass = 'col-md-4 pb-4';
  @Output() clicked: EventEmitter<DestinoViajes>;

  constructor(private store: Store<AppState>) {
    this.clicked = new EventEmitter();
  }

  ir() {
    this.clicked.emit(this.destino);
    return false;
  }

  // voteUp() {
  //   this.store.dispatch(new VoteUpAction(this.destino));
  //   return false;
  // }

  // voteDown() {
  //   this.store.dispatch(new VoteDownAction(this.destino));
  //   return false;
  // }
}
