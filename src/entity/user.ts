export enum Gender {
    Male = "Male",
    Female = "Female",
}


export class User {
    private _ID?: string;
    private _name: string;
    private _age: number;
    private _gender: Gender

    private constructor(name: string, age: number, gender: Gender, ID?: string) {
        this._name = name;
        this._age = age;
        this._gender = gender;
        this._ID = ID;
    }

    private static isValid(name: string, age: number, gender: string): string[] {
        const errors: string[]= []

        if (!name || name.length < 2 || name.length > 20){
            errors.push("Invalid Name");
        }

        if (!age || age <= 0 || age > 150){
            errors.push("Invalid age");
        }

        if (gender !== Gender.Male && gender !== Gender.Female) {
            errors.push("Invalid gender");
        }
        return errors;
    }

    public static NewUser(name: string, age: number, gender: string, ID?: string): User {
        const errors = this.isValid(name, age, gender);
        if (errors.length !== 0) {
            throw new Error("Invalid data")
        }

        return new User(name, age, gender == Gender.Male ? Gender.Male : Gender.Female, ID)
    }

    set ID(ID: string | undefined) {
        this._ID = ID;
    }

    get ID(): string | undefined {
        return this._ID;
    }

    get name(): string {
        return this._name;
    }

    get age(): number {
        return this._age;
    }

    get gender(): Gender {
        return this._gender;
    }
}

