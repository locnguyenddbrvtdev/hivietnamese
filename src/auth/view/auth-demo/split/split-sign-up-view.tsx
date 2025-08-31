'use client';

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
import { FormDivider } from '../../../components/form-divider';
import { FormSocials } from '../../../components/form-socials';
import { SignUpTerms } from '../../../components/sign-up-terms';
import { signUp } from 'src/auth/context/jwt';
import { toast } from 'src/components/snackbar';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
interface IProps {
  content: any;
}
export function SplitSignUpView({ content }: IProps) {
  type SignUpSchemaType = zod.infer<typeof SignUpSchema>;

  const SignUpSchema = zod.object({
    firstName: zod.string().min(1, { message: content.requiredFirstNameErrMess }),
    lastName: zod.string().min(1, { message: content.requiredLastNameErrMess }),
    email: zod
      .string()
      .min(1, { message: content.requiredEmailErrMess })
      .email({ message: content.invalidEmailErrMess }),
    password: zod
      .string()
      .min(1, { message: content.requiredPasswordErrMess })
      .min(6, { message: content.tooShortPasswordErrMess }),
  });
  const showPassword = useBoolean();

  const defaultValues: SignUpSchemaType = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp({ ...data }).then(() => toast.success(content.successMess));
    } catch (error) {
      console.error(error);
    }
  });

  const renderForm = () => (
    <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{ display: 'flex', gap: { xs: 3, sm: 2 }, flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <Field.Text
          name="firstName"
          label={content.labelFirstNameField}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <Field.Text
          name="lastName"
          label={content.labelLastNameField}
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Box>

      <Field.Text
        name="email"
        label={content.labelEmailField}
        slotProps={{ inputLabel: { shrink: true } }}
      />

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
                  <Iconify icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Button
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Create account..."
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
            <Link component={RouterLink} href={paths.auth.signIn} variant="subtitle2">
              {content.signInLink}
            </Link>
          </>
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>

      <SignUpTerms content={content.terms} />

      <FormDivider label={content.or} />

      <FormSocials
        signInWithGoogle={() => {}}
        singInWithGithub={() => {}}
        signInWithTwitter={() => {}}
      />
    </>
  );
}
