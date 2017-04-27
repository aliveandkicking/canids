import { serverApi } from '../server-api';

export class BaseModel {
  save () {
    serverApi.save(this, null)
  }
}
