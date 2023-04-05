const Register = () => {
  return (
    <>
      <div className="register">
        <h1>Register here</h1>
      </div>
      <form action="" method="post">
        <div>
          <label htmlFor="first">First Name</label>
          <input type="text" id="first" name="first" required />
        </div>
        <div>
          <label htmlFor="last">Last Name</label>
          <input type="text" id="last" name="last" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </>
  );
};

export default Register;

// export default function Wraped() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Register />
//     </QueryClientProvider>
//   );
// }
