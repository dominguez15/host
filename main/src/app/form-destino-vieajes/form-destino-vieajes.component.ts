import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DestinoViajes } from '../model/destino-viajes.model';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';


@Component({
  selector: 'app-form-destino-vieajes',
  templateUrl: './form-destino-vieajes.component.html',
  styleUrls: ['./form-destino-vieajes.component.css']
})

export class FormDestinoVieajesComponent implements OnInit {

  searchResults: string[] = [];

  campoNombreVacio: boolean = true;

  get nombreControl(): AbstractControl | null {
    return this.fb.get('nombre');
  }

  ngOnInit() {
    const elemNombre = <HTMLInputElement>document.getElementById('nombre');
    fromEvent(elemNombre, 'input')
      .pipe(
        map((e: Event) => (e.target as HTMLInputElement).value),
        debounceTime(200),
        distinctUntilChanged(),
        tap((text: string) => {
          this.campoNombreVacio = text.trim() === '';
        }),
        filter(text => text.length > 4),
        switchMap(() => ajax<string[]>('/assets/datos.json'))
      )
      .subscribe((ajaxResponse: AjaxResponse<string[]>) => {
        this.searchResults = ajaxResponse.response;
      });
  }

  @Output() onItemAdded: EventEmitter<DestinoViajes>;
  fb: FormGroup;


  constructor(fb: FormBuilder) {
    this.onItemAdded = new EventEmitter();
    this.fb = fb.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      url: ['']

    });

    this.fb.valueChanges.subscribe((form: any) => {
      console.log('cambio el formulario: ', form);
    });
  }

  guardar(nombre: string, url: string): boolean {
    let d = new DestinoViajes(nombre, url);
    this.onItemAdded.emit(d);
    return false;
  }
}

