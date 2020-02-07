import { Component, OnInit } from '@angular/core';

import * as fromFiltro from '../../filter/filter.actions';
import * as fromTodo from '../todo.actions';

import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  pendientes: number;

  filtrosValidos: fromFiltro.filtrosValidos [] = ['todos', 'completados', 'pendientes'];
  filtroActual: fromFiltro.filtrosValidos;

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe( state => {
      this.contarPendientes( state.todos );
      this.filtroActual = state.filtro;
    });
    this.cambiarFiltro('todos');
  }

  cambiarFiltro( nuevoFiltro: fromFiltro.filtrosValidos ) {
    const accion = new fromFiltro.SetFiltroAction(nuevoFiltro);
    this.store.dispatch(accion);
  }

  contarPendientes( todos: Todo[] ) {
    this.pendientes = todos.filter( todo => !todo.completado ).length;
  }

  borrarTodo() {
    const accion = new fromTodo.BorrarAllTodoAciton();
    this.store.dispatch(accion);
  }

}
