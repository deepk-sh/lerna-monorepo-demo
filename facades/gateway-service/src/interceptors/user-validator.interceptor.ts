import {ROLE, User} from '@demo/core-module';
import {Interceptor} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';

export const userValidator: Interceptor = async (invocationCtx, next) => {
  console.log('VALIDATING USER DETAILS');
  const user = new User();

  // check for method name, so interceptor works only for "create" method
  if (['create', 'signup'].some(m => m === invocationCtx.methodName)) {
    Object.assign(user, invocationCtx.args[0]);
  }

  const errors = validateUser(user);
  if (!errors.valid) {
    const errorList = JSON.stringify(errors.errors);
    throw new HttpErrors.BadRequest(`Invalid User details. ${errorList}`);
  }

  return await next();
};

function validateUser(user: User) {
  const errors: string[] = [];

  // Validate name (must be at least 3 characters)
  if (
    !user.name ||
    typeof user.name !== 'string' ||
    user.name.trim().length < 3
  ) {
    errors.push('Name must be at least 3 characters long.');
  }

  // Validate email (basic regex check)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!user.email || !emailRegex.test(user.email)) {
    errors.push('Invalid email format.');
  }

  // Validate role (must be one of: "admin", "subscriber", "superadmin")
  const validRoles = [ROLE.ADMIN, ROLE.SUBSCRIBER, ROLE.SUPERADMIN];
  if (!user.role || !validRoles.includes(user.role)) {
    errors.push(`Role must be one of: ${validRoles.join(', ')}.`);
  }

  // Return result
  return errors.length > 0 ? {valid: false, errors} : {valid: true};
}
