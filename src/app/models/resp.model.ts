import { BaseModel } from "./base.model";

export class Response extends BaseModel {
    count?: number;
    next?: string;
    previous?: string;
    results?: any;
}
