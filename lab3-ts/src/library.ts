import type {Identifiable} from "./models";

/**
 * Універсальна колекція для будь-яких типів з id.
 * Під капотом — Map для O(1) доступу.
 *
 *
 * Generics (Дженерики або узагальнення) — це функціональність у програмуванні, яка дозволяє створювати класи, методи
 * та інтерфейси, що можуть працювати з різними типами даних, замість прив'язки до одного конкретного типу.
 */
export class Library<T extends Identifiable> {
    private items = new Map<string,T>();

    constructor(initialItems: T[] = []){
        initialItems.forEach((item) => this.items.set(item.id, item));
    }

    add(item: T): void {
        this.items.set(item.id, item);
    }

    remove(id: string): boolean {
        return this.items.delete(id);
    }

    getById(id: string): T | undefined {
        return this.items.get(id);
    }

    getAll(): T[] {
        return [...this.items.values()];
    }

    upsert(item: T): void {
        this.items.set(item.id, item);
    }

    clear(): void{
        this.items.clear();
    }

    findBy<K extends keyof T>(key: K, value: T[K]): T[] {
        return this.getAll().filter((i) => i[key] === value);
    }

}