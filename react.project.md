## Dive To React Project (justice-adminportal-website)


#### Role & Permission
Permission is the action (CRUD) accessibility of resource (API).

Combine permissions to a Role.

Assign roles to manager.

```
export class Role {
  roleId: string = '';
  roleName: string = '';
  adminStatus: boolean = false;
  permissions: RolePermission[] = [];
}

export class RolePermission {
  resource: string;
  action: number;
  schedAction?: number;
  schedCron?: string;
  schedRange?: string[];
}

export class RoleManager {
  userId: string;
  nameSpace: string;
  displayName: string;
  role: string[];
}
```

#### Private Route

```
const PrivateRoute = ({ component: Component, location, navTabs, isPageReady, ...rest }: any) => {
  if (!extendedStorage.localStorage.getObject('userMetadata')) {
    return redirectToLogin();
  }
  const { accessToken, grantType, emailVerified } = extendedStorage.localStorage.getObject('userMetadata');

  const hasLoggedIn = accessToken && (grantType === 'password' || grantType === 'refresh_token');

  if (!hasLoggedIn) {
    return redirectToLogin();
  }

  // check emailVerified
  const isRedirectToVerify = emailVerified !== 'verified' && location.pathname !== '/verify';

  if (isRedirectToVerify) {
    return <Redirect to="/verify" />;
  }

  const makeRouteComponent = (navTabs: any) => (params: any) => {
    const props = {
      ...params,
      navTabs,
    };

    return isPageReady ? <Component {...props} /> : <Dashboard {...props} />;
  };

  return <Route {...rest} component={makeRouteComponent(navTabs)} />;
};
```

#### RouteConfig

```
export interface RouteConfig {
  route: string;
  icon: string;
  translation: string;

  isPublisherOnly: boolean;
  component?: React.ReactElement<any>;
  navTabs?: string[];
  permissions?: {
    resource: string;
    action: CrudType;
  }[];
  dataQa?: string;
}

export const Routes: RouteConfig[] = [
  {
    route: '/user-management',
    icon: 'icon-ab-sidebar-user',
    translation: 'nav.user.management',
    isPublisherOnly: false,
    component: UserManagementRoutes,
    navTabs: ['users', 'admins'],  // sub route, like `/user-management/users`
    permissions: [
      {
        resource: 'NAMESPACE:{namespace}:USER:*',
        action: CrudType.READ,
      },
    ],
    dataQa: 'sidebar.users',
  }
];
```


#### Enhance Component with HOC or Just another Component/Function