export function loginFunction(email: string, password: string): Promise<boolean> {

  return new Promise((resolve) => {
    setTimeout(() => {
      const isAuthenticated = email === "admin@gmail.com" && password === "12345";
      resolve(isAuthenticated);
    }, 1000); 
  });

}