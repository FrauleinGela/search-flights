import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { AuthService } from './auth.service';

import { TokenInterceptor } from './token.interceptor';

describe('TokenInterceptor', () => {
  let spectator: SpectatorService<TokenInterceptor>;
  const createService = createServiceFactory({
    service: TokenInterceptor,
    providers: [],
    mocks: [AuthService],
    imports: [],
    entryComponents: [],
  });
  beforeEach(() => {
    spectator = createService();
  })
  it('should be created', () => {
    expect(spectator).toBeDefined();
  });
});
