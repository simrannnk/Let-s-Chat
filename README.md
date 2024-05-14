# Lets-Chat
Let's Chat is a real-time chatting and video calling web app.

For real time chat communication and video calls, we will be using Web Socket and peer to peer connection. It basically starts with a single handshake mechanism as an HTTP request/response, allowing servers to handle HTTP connections as well as WebSocket connections on the same port. Once the connection is established, communication switches to a bidirectional binary protocol which does not conform to the HTTP protocol.

## WebSocket  and WebRTC

The WebSocket API is an advanced technology that makes it possible to open a two-way interactive communication session between the user's browser and a server. With this API, you can send messages to a server and receive event-driven responses 
without having to poll the server for a reply.

We are developing the client on React which is a javascript library and we are going to use its extended framework which is Next.js. The perks of using next.js are mentioned below:-

Its server-side rendered
SEO optimization
Easy Routing
Browser’s bot capture the data easily
Image optimization ( Lazy loaded )

For giving our application an interactive UX, we are going to use Chakra UI and SCSS. The main advantage of using Chakra UI is it already has customisable components which are responsive in nature and pre-defined css properties.

We are developing a server on Node which is a runtime environment. It is primarily used for non-blocking, event-driven servers, due to its single-threaded nature.We are using ExpressJs for developing api on NodeJS. Advantages of using ExpressJs are:-

Easy Middleware structure
Pre-defined functions for generating server
Pre build body parser
Scalable

JWT stands for Javascript Web Token. We are using JWT for Auth verification and third party sign-up support.JWTs are used as a secure way to authenticate users and share information. Typically, a private key, or secret,which is used by the issuer to sign the JWT. 
 
Our application’s client and server will be written in Typescript. It adds additional syntax to JavaScript to support a tighter integration and catch errors early while developing.

We are going to use a non-relational database for storing the user’s details and chats.
We will use MongoDb as it is fast and we can have an easy view of all the collections in compass. It also provides features like sharding and database indexing.


# 
### Snippets of Project
#

![a24245c1-4c50-4261-b90a-e863aafe496a](https://user-images.githubusercontent.com/51900952/158317773-e4f5a479-a4da-4720-b0d2-28751e26a908.jpg)

![b1287ad3-0b4c-4e36-930f-dd62c1b1f97e](https://user-images.githubusercontent.com/51900952/158317856-61be24a8-e588-4a35-8e21-c4b258866f54.jpg)

![a0a036e7-6905-4cb4-92bc-fd8d89e2df0d](https://user-images.githubusercontent.com/51900952/158317879-835844b0-95cd-4521-b20b-cecf65076a3c.jpg)

