type ErrorObj = {
 name?: string;
 email?: string;
 password?: string;
 confirmPassword?: string;
 username?: string;
 handle?: string;
};

export function isFirstPageInvalid(form: any) {
 let errors: ErrorObj = {};
 const name = form.watch("name");
 const email = form.watch("email");
 const password = form.watch("password");
 const confirmPassword = form.watch("confirmPassword");
 if (name) {
  if (name.length > 50) {
   errors.name = "Name must be less than 50 characters";
  }
 }
 if (email) {
  if (email.length > 100) {
   errors.email = "Email must be less than 100 characters";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
   errors.email = "Email is invalid";
  }
 }
 if (password) {
  if (password.length < 6 || password.length > 50) {
   errors.password = "Password must be between 6 and 50 characters";
  }
 }
 if (confirmPassword) {
  if (password !== confirmPassword) {
   errors.confirmPassword = "Passwords must match";
  }
 }
 if (Object.keys(errors).length > 0) {
  return { errors };
 }
 return !name || !email || !password || !confirmPassword;
}
export function isSecondPageInvalid(form: any) {
 let errors: ErrorObj = {};
 const username = form.watch("username");
 const handle = form.watch("handle");
 if (username) {
  if (username.length < 3 || username.length > 20) {
   errors.username = "Username must be between 3 and 20 characters";
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
   errors.username =
    "Username must only contain alphanumeric characters and underscores";
  }
 }
 if (handle) {
  if (handle.length < 1 || handle.length > 20) {
   errors.handle = "Handle must be between 3 and 20 characters";
  }
  if (!/^[^<>[\]{}\\|`~]+$/.test(handle)) {
   errors.handle = "Handle must not contain certain special characters";
  }
 }
 if (Object.keys(errors).length > 0) {
  return { errors };
 }
 return !username || !handle;
}
