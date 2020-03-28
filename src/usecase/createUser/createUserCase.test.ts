import { UserRepository } from "../../infrastucture/repository/userRepository";
import { CreateUserUseCase } from "./createUserUseCase";

const userRepositoryMock = jest.fn();
jest.mock("../../infrastucture/repository/userRepository");


describe("Testing couponService create", () => {
    beforeEach(() => {
        userRepositoryMock.mockClear()
    });

    it("It should call CouponRepo create once and return coupon", async () => {
        // const createUserUseCase = new CreateUserUseCase(new userRepositoryMock,);

        // const userData = {
        //     name: "shahin",
        //     age: 19,
        //     gender: "Male",
        // }

        // const mi = userRepositoryMock.mock.instances[0]. mockReturnValue(coupon);
        // const res = await createUserUseCase.createUser(coupon);

        // expect(mi).toHaveBeenCalledWith(coupon);
        // expect(mi).toHaveBeenCalledTimes(1);
        // expect(res).toEqual(coupon);
    });
});