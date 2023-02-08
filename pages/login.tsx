import { Logo } from "@/components/icons";
import { Formik } from "formik";
import { Body, Box, Button, Heading, LoginPage, Textfield } from "legion-ui";
import { match, P } from "ts-pattern";

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const isValidEmail = (email: string): boolean => emailRegex.test(email);

const FormInput = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        return match<{ email: string; password: string }, { email?: string; password?: string }>(values)
          .with({ email: "", password: "" }, () => ({ email: "Required", password: "Required" }))
          .with({ email: "", password: P.string }, () => ({ email: "Required" }))
          .with({ email: P.string, password: "" }, () => ({ password: "Required" }))
          .with({ email: P.not(P.when(isValidEmail)), password: P.string }, () => ({
            email: "Invalid email format",
          }))
          .with({ email: P.string, password: P.string }, () => ({}))
          .exhaustive();
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Box color={"black"}>
            <Logo />
          </Box>
          <Heading size="h3" mt={"80px"}>
            Sign In
          </Heading>
          <Body size="sm_regular">Please enter your username and password</Body>
          <Box mt={"28px"}>
            <Textfield
              label="Username"
              type="email"
              placeholder="Enter your username"
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={(touched.email && errors.email) || undefined}
            />
          </Box>
          <Box>
            <Textfield
              label="Password"
              type="password"
              placeholder="Enter your password"
              errorMessage={(touched.email && errors.email) || undefined}
            />
          </Box>
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default function Login() {
  return (
    <Box bg="#F6F7FC">
      <LoginPage
        background="/images//bg_login.png"
        formPosition="left"
        logo="/images/logo.svg"
        form={<FormInput />}
      />
    </Box>
  );
}
