import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import H5 from '@material-tailwind/react/Heading5';
import Checkbox from '@material-tailwind/react/Checkbox';
import Button from '@material-tailwind/react/Button';
import DefaultNavbar from 'components/DefaultNavbar';
import SimpleFooter from 'components/SimpleFooter';
import Page from 'components/login/Page';
import Container from 'components/login/Container';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { createToast } from 'utils/createToast';
import { useHistory } from 'react-router';

export default function Login() {
    const history = useHistory();
    const initialValues = {
        email: '',
        password: ''
    }
    const onSubmit = async (values) => {
        await axios.post('http://localhost:5000/api/auth/login', {
            email: values.email,
            password: values.password
        })
        .then((response) => {
            if(response.status === 200)
            {
                localStorage.setItem('userData', JSON.stringify(response.data))
                history.push('/')
            }
        })
        .catch((err) => createToast(err))
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is a required field'),
        password: Yup.string().required('Password is a required field'),
      });
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ isSubmitting, dirty, isValid, setFieldValue, errors, touched }) => (
            <Form>
                <Page>
                    <DefaultNavbar />
                    <Container>
                        <Card>
                            <CardHeader color="lightBlue">
                                <H5 color="white" style={{ marginBottom: 0 }}>
                                    Login
                                </H5>
                            </CardHeader>

                            <CardBody>
                                <div className="mb-12 px-4 bg-bb">
                                    <input 
                                        type="text" 
                                        placeholder="Email"  
                                        class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                                        onChange={(e) => {
                                            setFieldValue('email', e.currentTarget.value)
                                        }}
                                    />
                                    {errors.email && touched.email && errors.email}
                                </div>
                                <div className="mb-8 px-4">
                                    <input 
                                        type="password" 
                                        placeholder="Password"  
                                        class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                                        onChange={(e) => {
                                            setFieldValue('password', e.currentTarget.value)
                                        }}
                                    />
                                    <ErrorMessage name="password" component="span" className="error-message" />
                                </div>
                                <div className="mb-4 px-4">
                                    <Checkbox
                                        color="lightBlue"
                                        text="Remember Me"
                                        id="remember"
                                    />
                                </div>
                            </CardBody>
                            <CardFooter>
                                <div className="flex justify-center bg-bb">
                                    <Button
                                        color="lightBlue"
                                        buttonType="link"
                                        size="lg"
                                        ripple="dark"
                                        type="submit"
                                    >
                                        Login
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </Container>
                    <SimpleFooter />
                </Page>
            </Form>
            )}
        </Formik>
    );
}
