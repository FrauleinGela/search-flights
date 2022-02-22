import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { of } from 'rxjs';
import { AuthService } from './auth.service';


describe('AuthService', () => {
  let spectator: SpectatorService<AuthService>;
  const createService = createServiceFactory({
    service: AuthService,
    providers: [],
    imports: [HttpClientTestingModule],
    entryComponents: [],
  });
  function mockDate() {
    return 1645446254191;
  }
  let store: any = {};
  const mockLocalStorage = {
    getItem: (key: string): string | null => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = value;
    }
  };

  beforeEach(() => {
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    Date.now = mockDate;
    spectator = createService()
  });

  it('should authenticate store token and expires_in in localStorage', () => {
    const httpClient = spectator.inject(HttpClient);
    const expectedResponse = {
      access_token: '1234',
      expires_in: 60
    }
    spyOn(httpClient, 'post').and.returnValue(of(expectedResponse));
    spectator.service.authenticate().subscribe();
    const mockedDatePlusExpiresIn = mockDate() + expectedResponse.expires_in * 1000;
    expect(spectator.service.getExpiresIn()).toBe(mockedDatePlusExpiresIn);
    expect(spectator.service.getToken()).toBe(expectedResponse.access_token);
  });
});

