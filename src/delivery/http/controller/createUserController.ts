import { Request, Response } from "express";
import { object, string, number} from "@hapi/joi";
import { CreateUserUseCase, CreateUserUseCaseRequest } from "../../../usecase/createUser/createUserUseCase";
import { Gender } from "../../../entity/user";

export class CreateUserController {
    private createUserUseCase: CreateUserUseCase;

    constructor(createUserUseCase: CreateUserUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.createUser = this.createUser.bind(this);
    }

    private seralize() {
        // pass
    }

    public async createUser(req: Request, res: Response) {
        const schema = object().keys({
            name: string().required(),
            age: number().positive().required(),
            gender: string().valid(Gender.Male, Gender.Female).required(),
        });

        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).send({message: "Please fill up with valid data in all the required fields."});
        }

        try {
            const userData: CreateUserUseCaseRequest = {
                name: req.body.name,
                age: req.body.age,
                gender: req.body.gender,
            }

            const response = await this.createUserUseCase.createUser(userData);

            return res.status(500).send(response);
        } catch(e) {
            console.log(e)
            return res.status(500).send({message: "Something went Wrong"});
        }
       
    }
}

export const newCreateUserController = (createUser: CreateUserUseCase) => {
    return new CreateUserController(createUser);
}