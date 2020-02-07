# Abrir proyecto en VS Code desde la terminal

```
code -n ./todoapp
```

# Instalando el CSS del proyecto

```
npm install todomvc-app-css --save
```

# Instalando y configurando el store

```
npm install @ngrx/store --save
```

## Importo y configuro el store en el app.module.ts

```
import { StoreModule } from '@ngrx/store';

StoreModule.forRoot({ todos: todoReducer }),
```
# Instalando las herramientas del Store

```
npm install @ngrx/store-devtools --save
```

## Importo y configuro el StoreDevetools en el app.module.ts

```
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

StoreDevtoolsModule.instrument({
    maxAge: 5,
    logOnly: environment.production,
})
```

# Creo un modelo para el state ./model

```
export class Todo {
    public id: number;
    public texto: string;
    public completado: boolean;

    constructor( texto: string ) {
        this.texto = texto.charAt(0).toUpperCase() + texto.slice(1);
        this.completado = false;

        this.id = Math.random();

    }
}
```

# Creo una interface para el modelo

```
import { Todo } from './todo/model/todo.model';

export interface AppState {
    todos: Todo[];
}
```

# Creo las acciones name.actions.ts

```
import { Action } from '@ngrx/store';

export const AGREGAR_TODO = '[TODO] Agregar todo';

export class AgregarTodoAciton implements Action {
    readonly type = AGREGAR_TODO;

    constructor( public texto: string ) {}
}

export type Acciones = AgregarTodoAciton;

```

# Creo los reducers name.reducer.ts

```
import * as fromTodo from './todo.actions';
import { Todo } from './model/todo.model';

const estadoInicial: Todo[] = [];

export function todoReducer( state = estadoInicial, action: fromTodo.Acciones ): Todo[] {
    switch (action.type) {
        case fromTodo.AGREGAR_TODO:
            const todo = new Todo( action.texto );
            return [ ...state, todo ];
        default:
            return state;
    }
}
```

# Información general

Para saber en que ruta estoy, en la consola tipeo: pwd