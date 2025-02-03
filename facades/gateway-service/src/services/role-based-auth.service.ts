import {injectable, BindingScope, Provider, BindingKey} from '@loopback/core';
import {
  AuthorizationContext,
  AuthorizationDecision,
  AuthorizationMetadata,
  authorize,
  Authorizer,
} from '@loopback/authorization';

@injectable({scope: BindingScope.TRANSIENT})
export class RoleBasedAuthProvider implements Provider<Authorizer> {
  constructor() {}

  value(): Authorizer {
    return async (
      ctx: AuthorizationContext,
      metadata: AuthorizationMetadata,
    ) => {
      const user = ctx.principals[0]; // authenticated user
      console.log('user details', {user});
      if (!user) {
        return AuthorizationDecision.DENY;
      }
      const allowedRoles = metadata.allowedRoles || [];
      const userRoles = [user.role || ''];

      const isAuthorized = userRoles.some(role => allowedRoles.includes(role));
      return isAuthorized
        ? AuthorizationDecision.ALLOW
        : AuthorizationDecision.DENY;
    };
  }
}

export function roleAuth(spec: AuthorizationMetadata) {
  return authorize({
    voters: [AuthorizationBindings.ROLE_BASED_AUTHORIZER],
    ...spec,
  });
}

export namespace AuthorizationBindings {
  export const ROLE_BASED_AUTHORIZER = BindingKey.create<Authorizer>(
    'authorization.roleBasedProvider',
  );
}
