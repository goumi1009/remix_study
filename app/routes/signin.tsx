import { useEffect } from 'react';
import { Form, useActionData } from 'react-router';
import { signInFirebase } from '~/lib/firebase';
import { useAuth } from '~/stores/auth';
import type { Route } from './+types/signin';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  if (!email || !password) {
    return 'Missing email or password';
  }
  console.log(email, password);
  const res = await signInFirebase(email?.toString(), password?.toString());
  console.log('signin res', res);
  return res;
}

export default function SignIn() {
  const actionData = useActionData();
  const setTokens = useAuth((state) => state.setTokens);

  useEffect(() => {}, [actionData, setTokens]);

  console.log(actionData);
  return (
    <div>
      <Form method="post">
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}
