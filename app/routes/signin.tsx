import { Form } from 'react-router';
import type { Route } from './+types/signin';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const title = formData.get('email');
  const password = formData.get('password');
  const res = null; //api 호출들어가고
  console.log(title, password);
  return res;
}

export default function SignIn() {
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
