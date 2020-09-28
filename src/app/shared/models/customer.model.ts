export class Customer {
    public id: number;
    public accounID: number;
    public tenCongty: string;
    public diaChi: string;
    public website: string;
    public tinhTrang: string;
    public created_at: Date;
    public updated_at: Date;
    constructor (id: number, accounID: number, tenCongty: string, diaChi: string, tinhTrang:string, created_at: Date, updated_at: Date) {
        this.id = id;
        this.accounID = accounID;
        this.tenCongty= tenCongty;
        this.diaChi=diaChi;
        this.tinhTrang=tinhTrang;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}