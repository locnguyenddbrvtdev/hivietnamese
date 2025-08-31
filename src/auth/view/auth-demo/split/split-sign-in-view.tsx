'use client';
import Cookie from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { FormHead } from '../../../components/form-head';
import { FormSocials } from '../../../components/form-socials';
import { FormDivider } from '../../../components/form-divider';
import { DEVICE_ID_KEY, signInWithPassword } from 'src/auth/context/jwt';
import { toast } from 'src/components/snackbar';
import { useAuthContext } from 'src/auth/hooks';
import { useRouter } from 'src/routes/hooks';
import { wait } from 'src/utils/common';
import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
interface IProps {
  content: any;
}
export function SplitSignInView({ content }: IProps) {
  type SignInSchemaType = zod.infer<typeof SignInSchema>;

  const SignInSchema = zod.object({
    email: zod
      .string()
      .min(1, { message: content.requiredEmailErrMess })
      .email({ message: content.invalidEmailErrMess }),
    password: zod.string().min(1, { message: content.requiredPasswordErrMess }),
    // .min(6, { message: content.tooShortPasswordErrMess }),
  });
  const router = useRouter();
  const { checkUserSession } = useAuthContext();
  const { t } = useTranslate('messages');
  const showPassword = useBoolean();

  const defaultValues: SignInSchemaType = {
    email: '',
    password: '',
  };

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const existingDeviceId = Cookie.get(DEVICE_ID_KEY);
      if (!existingDeviceId) {
        const newDeviceId = uuidv4();
        Cookie.set(DEVICE_ID_KEY, newDeviceId);
      }
      const deviceId = Cookie.get(DEVICE_ID_KEY) || uuidv4();
      await signInWithPassword({ email: data.email, password: data.password, deviceId }).then(
        async () => {
          toast.success(content.successMess);
          await checkUserSession?.();
          await wait(1000);
          router.refresh();
        }
      );
    } catch (error: any) {
      if (error?.message === 'Email or password is incorrect') {
        setError('email', { message: content.signInInforIsInCorrect });
        setError('password', { message: '' });
        return;
      }
      toast.error(t('axiosFailed'));
    }
  });

  const renderForm = () => (
    <Box
      sx={{
        gap: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Field.Text
        name="email"
        label={content.labelEmailField}
        slotProps={{ inputLabel: { shrink: true } }}
      />

      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Link
          component={RouterLink}
          href={paths.auth.resetPassword}
          variant="body2"
          color="inherit"
          sx={{ alignSelf: 'flex-end' }}
        >
          {content.forgotPasswordLink}
        </Link>

        <Field.Text
          name="password"
          label={content.labelPasswordField}
          placeholder={content.placeholderPasswordField}
          type={showPassword.value ? 'text' : 'password'}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={showPassword.onToggle} edge="end">
                    <Iconify
                      icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Button
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Sign in..."
      >
        {content.submitBtn}
      </Button>
    </Box>
  );

  return (
    <>
      <FormHead
        title={content.title}
        description={
          <>
            {content.dontHaveAnAccount}
            <Link component={RouterLink} href={paths.auth.signUp} variant="subtitle2">
              {content.signUpLink}
            </Link>
          </>
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>

      <FormDivider label={content.or} />

      <FormSocials
        signInWithGoogle={() => {}}
        singInWithGithub={() => {}}
        signInWithTwitter={() => {}}
      />
    </>
  );
}
