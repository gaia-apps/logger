import { AsyncLocalStorage } from 'async_hooks';

type RequestContext = {
  ip?: string;
  requestId?: string;
};

export class ContextService {
  private readonly storage = new AsyncLocalStorage<RequestContext>();

  enterWith(context: RequestContext) {
    this.storage.enterWith(context);
  }

  get(): RequestContext | undefined {
    return this.storage.getStore();
  }
}