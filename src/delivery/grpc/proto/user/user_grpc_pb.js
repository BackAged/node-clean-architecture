// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var user_pb = require('./user_pb.js');

function serialize_nodeCleanArchitecture_CreateUserRequest(arg) {
  if (!(arg instanceof user_pb.CreateUserRequest)) {
    throw new Error('Expected argument of type nodeCleanArchitecture.CreateUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nodeCleanArchitecture_CreateUserRequest(buffer_arg) {
  return user_pb.CreateUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nodeCleanArchitecture_GetUserRequest(arg) {
  if (!(arg instanceof user_pb.GetUserRequest)) {
    throw new Error('Expected argument of type nodeCleanArchitecture.GetUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nodeCleanArchitecture_GetUserRequest(buffer_arg) {
  return user_pb.GetUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nodeCleanArchitecture_User(arg) {
  if (!(arg instanceof user_pb.User)) {
    throw new Error('Expected argument of type nodeCleanArchitecture.User');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nodeCleanArchitecture_User(buffer_arg) {
  return user_pb.User.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserCrudService = exports.UserCrudService = {
  createUser: {
    path: '/nodeCleanArchitecture.UserCrud/CreateUser',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.CreateUserRequest,
    responseType: user_pb.User,
    requestSerialize: serialize_nodeCleanArchitecture_CreateUserRequest,
    requestDeserialize: deserialize_nodeCleanArchitecture_CreateUserRequest,
    responseSerialize: serialize_nodeCleanArchitecture_User,
    responseDeserialize: deserialize_nodeCleanArchitecture_User,
  },
  getUser: {
    path: '/nodeCleanArchitecture.UserCrud/GetUser',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetUserRequest,
    responseType: user_pb.User,
    requestSerialize: serialize_nodeCleanArchitecture_GetUserRequest,
    requestDeserialize: deserialize_nodeCleanArchitecture_GetUserRequest,
    responseSerialize: serialize_nodeCleanArchitecture_User,
    responseDeserialize: deserialize_nodeCleanArchitecture_User,
  },
};

exports.UserCrudClient = grpc.makeGenericClientConstructor(UserCrudService);
