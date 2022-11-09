import { Injectable } from '@angular/core';
import {Storage } from '@ionic/storage';

@Injectable({providedIn: 'root'})
class StorageService {
    private storage: Storage | null = null;
    private initializationPromise: Promise<void>;
    constructor(private uninitializedStorage: Storage) {
        this.initializationPromise = this.init();
    }

    async init(): Promise<void> {
        this.storage = await this.uninitializedStorage.create();
    }

    public async set(key: string, value: any): Promise<void> {
        await this.initializationPromise;
        await this.storage.set(key, value);
    }

    public async get(key: string): Promise<any> {
        await this.initializationPromise;
        return await this.storage.get(key);
    }
}


export default StorageService;
