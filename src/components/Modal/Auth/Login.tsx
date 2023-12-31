import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FaTwitter } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { IResolveParams, LoginSocialGoogle } from 'reactjs-social-login';
import * as Yup from 'yup';
import Logo from '~/assets/img/logo_large.png';
import { Button, Image, Input } from '~/components/UI/index.ts';
import { useAuth } from '~/providers/AuthProvider';

import { useMutation } from '@tanstack/react-query';
import { trpc } from '~/helpers/trpc';
import { appActions } from '~/store';

const googleClientID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const schema = Yup.object({
  email: Yup.string().email().required('Please provide a valid email'),
});

export const LoginModal: React.FC = () => {
  const navigate = useNavigate();
  const { getUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const login = useMutation({
    mutationFn: async (data: { email: string }) => await trpc.mutation('auth.login', data),
    onSuccess: (data: any) => {
      localStorage.setItem('token', (data as { token: string }).token);

      // go to next step here -> show dialog with code input for 6 characters

      appActions.auth.step('validate');
    },
    onError: (_error: any) => {
      // show error message in toast
    },
  });
  const googleLogin = useMutation({
    mutationFn: async (req: {
      token: string;
      type: string;
      name: string;
      uid: string;
      picture: string;
      nickname: string;
    }) => await trpc.mutation('auth.social', req),
    onSuccess: (data: any) => {
      localStorage.setItem('token', (data as { token: string }).token);
      appActions.auth.isModalOpen(false);
      getUser();
      navigate('/play');
    },
    onError: (_error: any) => {
      // show error message in toast
    },
  });

  function onSubmit(data: { email: string }) {
    // make sure to remove previous token
    localStorage.removeItem('token');
    login.mutate(data);
  }
  return (
    <div className="relative w-full h-full bg-white-100 outline-none px-6 py-[15px] rounded-2xl">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex justify-center mb-8">
          <Image source={Logo} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col w-full my-2 gap-4">
            <Input
              {...register('email')}
              error={errors.email?.message}
              placeholder="Email address"
              height="h-12"
            />
            <Button
              type="submit"
              text="Continue"
              bg_color="bg-purple-100"
              height="h-12"
              text_color="text-white-100"
            />
          </div>
        </form>
        <div className="flex items-center w-full my-[35px]">
          <div className="flex h-[1px] bg-gray-400 w-full"></div>
          <div className="px-2 text-gray-500">OR</div>
          <div className="flex h-[1px] bg-gray-400 w-full"></div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <LoginSocialGoogle
            client_id={googleClientID}
            scope="email"
            onResolve={({ provider, data }: IResolveParams) => {
              const req = {
                token: data?.access_token,
                name: data?.name || '',
                picture: data?.picture,
                uid: data?.sub,
                nickname: data?.given_name || '',
                type: provider,
              };
              googleLogin.mutate(req);
            }}
          >
            <Button
              text="Continue with Google"
              icon={<FcGoogle />}
              height="h-12"
              bg_color="bg-white-100"
              border="border"
              text_color="text-black-100"
              className="inline-flex items-center justify-center w-full"
            />
          </LoginSocialGoogle>
          <Button
            text="Continue with Twitter"
            icon={<FaTwitter />}
            height="h-12"
            bg_color="bg-blue-100"
            text_color="text-white-100"
            className="inline-flex items-center justify-center"
          />
        </div>
      </div>
    </div>
  );
};
