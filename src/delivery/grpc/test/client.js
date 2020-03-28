const grpc = require("grpc");
const { UserCrudClient } = require("../proto/user/user_grpc_pb");
const { GetUserRequest } = require("../proto/user/user_pb");
const { User, CreateUserRequest } = require("../proto/user/user_pb");
//const config = require("../../../configuration");


const client = new UserCrudClient(`0.0.0.0:${3000}`, grpc.credentials.createInsecure());

const TestCreateUser = async () => {
    var userData = new CreateUserRequest();
    userData.setName("shahin");
    userData.setAge(23);
    userData.setGender(User.Gender.MALE);

    client.createUser(userData, function(err, user) {
      if (err) {
        console.log(err)
      } else {
        console.log(user.toObject());
      }
    });
}

const TestGetUser = async () => {
  var userData = new GetUserRequest();
  userData.setUserid("5e7f1b5e16ba4d23a1ee487a");

  client.getUser(userData, function(err, user) {
    if (err) {
      console.log(err)
    } else {
      console.log(user.toObject());
    }
  });
}

(async function main() {
  TestCreateUser();
  TestGetUser();
})()