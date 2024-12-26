import { useNavigate } from 'react-router-dom'
import GenericForm from '../components/form/Form'
import { ButtonType, FormField } from '../components/types';
import './Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const title: string = 'Login';
  const fields: FormField[] = [
    { name: 'email', label: 'Email address', type: 'email', placeholder: 'Enter your email address', required: true},
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter password', required: true }
  ];
  const buttons: ButtonType[] = [
    { name: 'submit', label: 'Log in', type: 'submit' },
    { name: 'signup', label: 'Create Account', type: 'button', onClick: () => {navigate("/signup")} }
  ]
  return (
    <div className="login-page">
      <div className="login-form-container">
        <GenericForm
          title={title}
          fields={fields}
          buttons={buttons}
          onSubmit={(formData) => console.log(formData)}
        />
      </div>
    </div>
  );
  
}

export default Login