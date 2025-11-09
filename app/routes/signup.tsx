import { db } from 'app/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { Form } from 'react-router';
import type { Route } from './+types/signup';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get('email')?.toString() || '';
  const password = formData.get('password');
  try {
    const ref = await addDoc(collection(db, 'users'), {
      email,
      password,
    });
    console.log(email, password);
    return { success: true, data: { email, password } };
  } catch (e) {
    console.error('Error while signup');
    return { success: false, data: { email: 'a', password: 'b' } };
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
