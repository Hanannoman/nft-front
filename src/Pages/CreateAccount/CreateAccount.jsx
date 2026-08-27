import './CreateAccount.css';
import ConnectCreateAccount from '../../Components/ConnectCreateAccount/ConnectCreateAccount';
import { Link } from 'react-router-dom';

export default function CreateAccount() {
  return (
 <>
    <ConnectCreateAccount
      title='Create Account'
      text='Welcome! enter your details and start buying and selling NFTs.'
      creatYs={true}
    />
    <p className='create-account-login-text'>
        Already have an account?
        <Link to="/login" className='create-account-login-link'>
          Log in
        </Link>
      </p>
    
   </>
  );
}