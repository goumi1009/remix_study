import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Form } from 'react-router';
import type { Route } from './+types/signup';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get('email')?.toString() || '';
  const password = formData.get('password')?.toString() || '';
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return { success: true, data: { email, password, uid: user.uid } };
  } catch (e) {
    console.error('Error while signup', e);
    throw new Error('Error while signup');
  }
}

export default function SignUp({ actionData }: Route.ComponentProps) {
  return (
    <div>
      <Form method="post">
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit">Submit</button>
      </Form>
      {actionData?.success && <p>{actionData.data.email} created</p>}
    </div>
  );
}
