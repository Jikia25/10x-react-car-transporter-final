// services/auth.ts
export interface FakeLoginResponse {
  ok: boolean;
  token: string;
}

export function fakeLogin(email: string, password: string, delay = 1000): Promise<FakeLoginResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // უბრალოდ ავთენტიკაცია ყველა შემთხვევისთვის "successful"
      resolve({ ok: true, token: "fake_jwt_token_123" });
    }, delay);
  });
}

// მაგალითად Google Login simulation
export function fakeGoogleLogin(delay = 1000): Promise<FakeLoginResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ok: true, token: "fake_google_token_456" });
    }, delay);
  });
}
