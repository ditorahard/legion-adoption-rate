import { useIsLoggedIn } from "@/auth";
import { Logo } from "@/components/icons";
import { Formik } from "formik";
import { Body, Box, Button, Heading, LoginPage, Textfield } from "legion-ui";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { match, P } from "ts-pattern";
import { v4 as uuidv4 } from "uuid";

const FormInput = () => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validate={(values) => {
        return match<{ username: string; password: string }, { username?: string; password?: string }>(values)
          .with({ username: "", password: "" }, () => ({ username: "Required", password: "Required" }))
          .with({ username: "", password: P.string }, () => ({ username: "Required" }))
          .with({ username: P.string, password: "" }, () => ({ password: "Required" }))
          .with({ username: P.string, password: P.string }, () => ({}))
          .exhaustive();
      }}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        if (values.username === values.password) {
          localStorage.setItem("_token", uuidv4());
        } else {
          setErrors({ password: "username and password do not match" });
        }
        setSubmitting(false);
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
              id="username"
              label="Username"
              placeholder="Enter your username"
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={(touched.username && errors.username) || undefined}
            />
          </Box>
          <Box>
            <Textfield
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              errorMessage={(touched.password && errors.password) || undefined}
            />
          </Box>
          <Button mt={3} type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default function Login() {
  const { replace } = useRouter();
  const isLoggedIn = useIsLoggedIn();
  console.log(isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      replace("/");
    }
  }, [isLoggedIn]);
  return (
    isLoggedIn === false && (
      <Box bg="#F6F7FC">
        <LoginPage
          background="/images//bg_login.png"
          formPosition="left"
          logo="/images/logo.svg"
          form={<FormInput />}
        />
      </Box>
    )
  );
}
