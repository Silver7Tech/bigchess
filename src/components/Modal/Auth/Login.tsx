import Logo from '~/assets/img/logo_large.png';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { Button, Image, Input } from '~/components/UI/index.ts';
import { useAppState } from '~/providers/StateProvider/StateProvider';
import { FaGoogle, FaTwitter } from 'react-icons/fa';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { trpc } from '~/helpers/trpc';
const schema = Yup.object({
  email: Yup.string().email().required('Please provide a valid email'),
});
export const LoginModal: React.FC = () => {
  const { actions } = useAppState();
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

  const { mutate } = useMutation({
    mutationFn: async (data: { email: string }) => await trpc.mutation('auth.login', data),
    onSuccess: (data: any) => {
      localStorage.setItem('token', (data as { token: string }).token);

      // go to next step here -> show dialog with code input for 6 characters
      actions.setLoginState('validate');
    },
    onError: (_error: any) => {
      // show error message in toast
    },
  });


  function onSubmit(data: { email: string }) {
    // make sure to remove previous token
    localStorage.removeItem('token');
    mutate(data);
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
            client_id='555715297484-s2rquac8fhqfc1dk6j852tcqdrpg0j7t.apps.googleusercontent.com'
            onResolve={({ data }: any) => {
              console.warn(data);
              // mutateGoogle(data.access_token);
            }}
            onReject={(err : any) => {
              // console.log(err);
            }}
          >
            <Button
              text="Continue with Google"
              icon={<FaGoogle fill="grey" />}
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
