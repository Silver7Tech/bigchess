import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Logo from '~/assets/img/logo_large.png';
import { Button, Image, Input } from '~/components/UI';
import { trpc } from '~/helpers/trpc';
import { useAuth } from '~/providers/AuthProvider';
import { appActions } from '~/store';

const schema = Yup.object({
  code: Yup.string()
    .length(6)
    .matches(/\d{6}/, { message: 'Provide digits only!' })
    .required('Please provide a valid OTP'),
});
export const ValidateOTPModal: React.FC = () => {
  const navigate = useNavigate();
  const { getUser } = useAuth();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      code: '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data: { code: string }) => await trpc.mutation('auth.verifyOTP', data),
    onSuccess: () => {
      appActions.auth.isModalOpen(false);
      appActions.auth.step('login');
      getUser();
      navigate('/');
    },
  });

  function onSubmit(data: { code: string }) {
    mutate(data);
  }
  return (
    <div className="relative w-full h-full bg-white-100 outline-none px-6 py-[15px] rounded-2xl">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex justify-center">
          <Image source={Logo} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col w-full my-2 gap-4">
            <Input
              {...register('code')}
              error={formState.errors.code?.message}
              maxLength={6}
              placeholder="6 digit code you received"
              height="h-12"
            />
            <Button
              type="submit"
              text="Continue"
              bg_color="bg-purple-100"
              text_color="text-white-100"
              height="h-12"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
