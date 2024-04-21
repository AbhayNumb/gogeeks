[Demonstration URL
](https://www.youtube.com/watch?v=HfoH0-G21fc)


<iframe width="560" height="315" src="https://www.youtube.com/watch?v=HfoH0-G21fc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


# Setting Up and Running the Application

1. **Clone the Project**

   ```bash
   git clone https://github.com/AbhayNumb/gogeeks.git
   ```

2. **Switch to the Backend Repository**

   ```bash
   cd backend
   ```

3. **Running the Backend Node Server**

   ```bash
   npm install
   node server.js
   ```

   **Note:** The `.env` file is not present in the repository due to security reasons.

4. **Switch to the Frontend Repository**

   ```bash
   cd frontend/front
   ```

5. **Running the Frontend Development Server**

   ```bash
   npm install
   npm start
   ```

# Backend Architecture

1. **Signup API:** Create a user by providing necessary details.
2. **SendOTP API:** Send a one-time password (OTP) to the registered email for login verification.
3. **Verify OTP API:** Verify the OTP entered by the user for login authentication.
4. **Is Auth API:** Check if the provided token is valid and if the user exists.
5. **Get All UserInfo API:** Retrieve information for all users, with authentication and authorization middleware for "admin" and "manager" roles.
6. **Update User API:** Update user information, with authentication and authorization middleware for "admin" role only.
7. **Delete User API:** Delete a user account, with authentication and authorization middleware for "admin" role only.
8. **Get Chart Data API:** Retrieve chart data, with authentication middleware only.

# Frontend Architecture

1. **User Authentication:** Users without authentication can access only the signup and login pages.
2. **Signup Page:** Users can fill in their information and submit it.
3. **Login Page:** Users can request and verify an OTP sent to their registered email for login authentication.
4. **Dashboard Features:** After login, users can access various features:
   - **User Information:** View their own information.
   - **All User Information:** View information for all users.
   - **Update User:** Update user information.
   - **Delete User:** Delete a user account.
   - **Chart Features:** Access various charts, including role-based distribution, age distribution, occupation distribution, state distribution, and country distribution.
   - **Logout:** Logout from the application.

| Role    | UserInfo | AllUserInfo | UpdateUser | DeleteUser | ChartFeature | Logout |
| ------- | -------- | ----------- | ---------- | ---------- | ------------ | ------ |
| admin   | ✔️       | ✔️          | ✔️         | ✔️         | ✔️           | ✔️     |
| manager | ✔️       | ✔️          | ❌         | ❌         | ✔️           | ✔️     |
| user    | ✔️       | ❌          | ❌         | ❌         | ✔️           | ✔️     |

...

# Requirements fulfilled

The application meets all the core requirements listed above.

The code is clean, well-organized, and commented where necessary.

The application incorporates basic security best practices.

The application is intuitive and easy to use.

As the application grows and evolves, it's essential to consider scalability to ensure it can handle increased load and maintain performance.

Here are some key considerations for future scalability:

1. **Infrastructure Scalability:** It can scale horizontally to accommodate increased traffic and workload. We can use containerization with technologies like Docker and orchestration platforms such as Kubernetes for efficient resource management and scaling.

2. **Database Scaling:** Built using MongoDB so horizontal scaling can be done to handle growing data volumes and concurrent user requests.

3. **Caching:** Caching mechanisms can be implemented to reduce database load and improve application performance.We can utilize in-memory caching solutions like Redis to store frequently accessed data and minimize response times.

4. **Load Balancing:** We can impement load balancing techniques to distribute incoming traffic across multiple servers or instances. Use load balancers such as NGINX or AWS Elastic Load Balancer to evenly distribute requests and prevent overloading individual servers.

5. **Microservices Architecture:** We can consider transitioning to a microservices architecture to decouple components and facilitate independent development, deployment, and scaling of services.

6. **Auto-scaling:** We can implement auto-scaling policies to automatically provision or deprovision resources based on predefined criteria such as CPU utilization, request latency, or traffic volume.

7. **Continuous Optimization:** We can regularly review and optimize application code, database queries, and infrastructure configurations to improve efficiency and reduce resource consumption.
