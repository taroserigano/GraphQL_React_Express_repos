import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    me: User
    // show all the posts
    posts: [Post!]!
    // show profile (with the userId) 
    profile(userId: ID!): Profile
  }

  type Mutation {
    // just send the body for new Post 
    postCreate(post: PostInput!): PostPayload!
    //send the postId and then the body to replace
    postUpdate(postId: ID!, post: PostInput!): PostPayload!
    postDelete(postId: ID!): PostPayload!
    postPublish(postId: ID!): PostPayload!
    postUnpublish(postId: ID!): PostPayload!
    signup(
      credentials: CredentialsInput!
      name: String!
      bio: String!
    ): AuthPayload!
    signin(credentials: CredentialsInput!): AuthPayload!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    published: Boolean!
    user: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Profile {
    id: ID!
    bio: String!
    isMyProfile: Boolean!
    user: User!
  }

  type UserError {
    message: String!
  }

  type PostPayload {
    userErrors: [UserError!]!
    post: Post
  }
  
  // for Authentication 
  type AuthPayload {
  // if there's error, catach it here 
    userErrors: [UserError!]!
    // otherwise, send the token 
    token: String
  }

  input PostInput {
    title: String
    content: String
  }

  input CredentialsInput {
    email: String!
    password: String!
  }
`;
