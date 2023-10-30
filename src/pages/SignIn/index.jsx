import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label } from '../../components/Auth';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';
import useSignInGitHub from '../../hooks/api/useSignInGitHub';
import styled from 'styled-components';
import GitHubIcon from '../../assets/images/GitHubIcon';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loadingSignIn, signIn } = useSignIn();
  const { LoadingSignInGH, signInGH } = useSignInGitHub();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const codeParam = urlParams.get("code");
      if (codeParam) {
        try{
          const userData = await signInGH(codeParam);
          setUserData(userData);
          toast('Login realizado com sucesso!');
          navigate('/dashboard')
        } catch (err) {
          toast('Não foi possível fazer o login!');
        }
        
      }
    };

    fetchData();
  }, []);
  
  async function submit(event) {
    event.preventDefault();

    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  }
  
  function LoginWithGitHUb(){
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID_GITHUB}`);
  }

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>Entrar</Button>
          <ButtonLoginGH type="button" disabled={LoadingSignInGH} onClick={() => LoginWithGitHUb()}><GitHubIcon/> Login com GitHub</ButtonLoginGH>
          
        </form>
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}

const ButtonLoginGH = styled.button`
  background-color: #444444;
  border: none;
  min-width: 64px;
  padding: 6px 16px;
  border-radius: 4px;
  width: 100%;
  color: #fff;
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  margin-top: 20px;
  cursor: pointer;
`
