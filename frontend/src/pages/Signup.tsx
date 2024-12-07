import GenericForm from '../components/Form'
import { ButtonType, FormField } from '../components/types';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const title: string = 'Sign up';
  const fields: FormField[] = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your full name', required: true },
    { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter your username', required: true },
    { name: 'email', label: 'Email address', type: 'email', placeholder: 'Enter your email address', required: true },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter a password', required: true },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Re-enter your password', required: true }
  ];
  const buttons: ButtonType[] = [
    { name: 'signup', label: 'Create account', type: 'submit' },
    { name: 'nav', label: 'Log in', type: 'button', onClick: () => {navigate("/login")} }
  ]

  const handleSignup = (formData: Record<string, string | number>) => {
    console.log(formData)
    if (formData.password !== formData.confirmPassword) {
      // TO DO: toast
      console.log ("nu")
    }
  }

  return (
    <GenericForm
      title={title}
      fields={fields}
      buttons={buttons}
      onSubmit={handleSignup} 
    >
    </GenericForm>
  )
}

export default Signup;