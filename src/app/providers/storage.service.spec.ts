import { TestBed, waitForAsync } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import StorageService from './storage.service';

describe('StorageService', () => {
    const storageSpyObj: any = jasmine.createSpyObj('Storage', ['get', 'set', 'create']);
    let storageService: StorageService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({ providers: [StorageService, { provide: Storage, useValue: storageSpyObj }] }).compileComponents();
        storageSpyObj.create.and.returnValue(Promise.resolve(storageSpyObj));
        storageService = TestBed.inject(StorageService);
    }));


    describe('get', () => {
        it('should get the key from local storage', (done: DoneFn) => {
            const key = 'test';
            const value = 'value for testing';
            storageSpyObj.get.withArgs(key).and.returnValue(value);
            storageService.get(key).then((result: any) => {
                expect(result).toEqual(value);
                done();
            });

        });
    });

    describe('set', () => {
        it('should get the key from local storage', (done: DoneFn) => {
            const key = 'test';
            const value = 'value for testing';
            storageService.set(key, value).then(() => {
                expect(storageSpyObj.set).toHaveBeenCalledWith(key, value);
                done();
            });
        });
    });
});
