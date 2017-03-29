import { OpaqueToken } from '@angular/core';

export const CreateViewModelToken = new OpaqueToken('HumanData')

export function createViewModel(c: { new(): Object; }): Object {
    return new c();
}
// export function createViewModel<T>(c: { new(): T; }): T {
//     return new c();
// }
