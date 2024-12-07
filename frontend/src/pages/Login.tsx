import { useNavigate } from 'react-router-dom'
import GenericForm from '../components/Form'
import { ButtonType, FormField } from '../components/types';

const Login = () => {
  const navigate = useNavigate();
  const title: string = 'Login';
  const fields: FormField[] = [
    { name: 'email', label: 'Email address', type: 'email', placeholder: 'Enter your email address', required: true},
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter password', required: true }
  ];
  const buttons: ButtonType[] = [
    { name: 'login', label: 'Log in', type: 'submit' },
    { name: 'nav', label: 'Create Account', type: 'button', onClick: () => {navigate("/signup")} }
  ]
  return (
    <GenericForm
      title={title}
      fields={fields}
      buttons={buttons}
      onSubmit={(formData) => console.log(formData)} 
    >
    </GenericForm>
  )
}

export default Login