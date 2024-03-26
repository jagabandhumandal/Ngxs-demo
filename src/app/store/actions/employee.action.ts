import { Employee } from 'src/app/models/Employee';

export class AddEmployee {
  static readonly type = '[Employee] Add';
  constructor(public payload: Employee) {}
}

export class GetEmployee {
  static readonly type = '[Employee] Get';
}

export class SetSelectedEmployee {
  static readonly type = '[Employee] Set';
  constructor(public id: number) {}
}

export class DeleteEmployee {
  static readonly type = '[Employee] Delete';
  constructor(public id: number) {}
}

export class UpdateEmployee {
  static readonly type = '[Employee] Update';
  constructor(public id: Number, public payload: Employee) {}
}
