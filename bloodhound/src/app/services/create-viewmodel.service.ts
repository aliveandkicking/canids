import { OpaqueToken } from '@angular/core';

export const CreateViewModelToken = new OpaqueToken('CreateViewModelToken');

export function createViewModel(c: { new(): Object; }): Object {
    return new c();
};
