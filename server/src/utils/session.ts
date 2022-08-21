import { UserSession } from "../types/user";

export var sessions: UserSession[] = [];

export const StartSession = (params: UserSession) => {
  const isExists = sessions.filter((session) => session.user.name === params.user.name)[0];
  if (isExists) {
    sessions = sessions.map((session) => {
      if (session.user.name === params.user.name) {
        return {
          ...params,
          date_logged: new Date(),
          date_last_action: new Date(),
        };
      }
      return session;
    });
    return;
  }

  sessions.push({
    ...params,
    date_logged: new Date(),
    date_last_action: new Date(),
  });
};

export const LogSessionChange = (jwt: string) => {
  sessions = sessions.map((session) => {
    if (session.jwt === jwt) return { ...session, date_last_action: new Date() };
    return session;
  });
};

export const suspendSession = (jwt: string) => {
  sessions = sessions.map((session) => {
    if (session.jwt === jwt) {
      return {
        ...session,
        jwt: null,
      };
    }
    return session;
  });
};
