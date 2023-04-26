export interface Controller{
    select() : void;
    find(id: string) : void;
    insert(json: string) : void;
    update(json: string) : void;
    remove(id: string) : void;
}