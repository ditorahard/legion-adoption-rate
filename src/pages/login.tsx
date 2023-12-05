import { TOKEN, useIsLoggedIn } from "@/util/auth";
import { Logo } from "@/components/icons";
import { Formik } from "formik";
import { Body, Box, Button, Heading, LoginPage, Textfield } from "legion-ui";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { match, P } from "ts-pattern";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const FormInput = () => {
  const { replace } = useRouter();
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    
    // fetch('/api/profile-data')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setData(data)
    //     setLoading(false)
    //   })
  }, []);
  

  async function _postLogin({username, password}: {username: string, password: string}){
    axios.post('http://legion-tracker-api.telkom.design/api/v1/users/login', {
      username: username,
      password: password
    })
    .then((response) => {
      console.log(response);
      localStorage.setItem(TOKEN, response.data.data.token);
      replace("/new2");
    })
    .catch((error)=> {
      console.log(error);
    });
  }
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
        const {username, password} = values
        if (values.username && values.password) {
          _postLogin({username, password})
        } else {
          setErrors({ password: "Username and password cant be empty" });
        }
        setSubmitting(false);
      }}
    >
      {({ errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Box color={"black"}>
            <Logo />
          </Box>
          <Box sx={{ color: "#424242" }}>
            <Heading size="h3" mt={"80px"}>
              Sign In
            </Heading>
          </Box>
          <Body size="sm_regular">Please enter your username and password</Body>
          <Box
            mt={"28px"}
            sx={{
              "& span": {
                color: "#2E3032",
              },
              "& input": {
                color: "#2E3032",
              },
            }}
          >
            <Box>
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
  useEffect(() => {
    if (isLoggedIn) {
      replace("/new2");
    }
  }, [isLoggedIn, replace]);
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
