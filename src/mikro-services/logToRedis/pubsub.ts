import {RedisPubSub }  from "graphql-redis-subscriptions";
const connection = {
  port: 6379, // Redis port
  host: "127.0.0.1", // Redis host
  password: "mendi1234",
}
const pubsub = new RedisPubSub({connection})
export default pubsub