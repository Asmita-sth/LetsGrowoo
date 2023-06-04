export interface PersonModel {
  nbf: number | null;
  exp: number | null;
  iss: string | null;
  aud: string[];
  client_id: string | null;
  sub: string | null;
  auth_time: string | null;
  website: string | null;
  personId: number | null;

  userName: string | null;
  scope: string[] | null;
  amr: string | null;
  title: number | null;
  roleId: number | null;
  roleName: string | null;
  organizationId: number | null;
  organizationName: string | null;
  officeId: number | null;
  office: string | null;
  officeName: string | null;
  officePortalName: string | null;
  applicationId: number | null;
  application: string | null;
  landingPage: string | null;
  profilePic: string | null;
  expireInDays: string | null;
  isInternal: string | null;
  twoFactorEnabled: boolean | false;
  isNewDevice: boolean | false;
  rememberMe: boolean | false;
  recipientEmail: string | null;
  name: string | null;
  organization: string | null;
  dBA: string | null;
  tenantId: string;
  tenant: string;
  calendarId: number | null
}
