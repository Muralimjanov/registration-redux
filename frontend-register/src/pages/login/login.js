import React from 'react'
import styles from "./login.module.css";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form';
import { authServices } from '../../http/auth-services';
import { useDispatch } from "react-redux"
import { getMeReduxServices } from '../../redux/services';

const Login = () => {
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (values) => {
        const data = await authServices.loginServices(values)
        console.log("login>>>", data);
        dispatch(getMeReduxServices())
        localStorage.setItem('userData', JSON.stringify(data.data.token))
    }

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Вход аккаунта
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    type="email"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register("email", { required: "Укажите почту" })}
                    label="E-Mail"
                    fullWidth
                />
                <TextField
                    type="password"
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register("password", { required: "Укажите Пароль" })}
                    className={styles.field}
                    label="Пароль"
                    fullWidth
                />
                <Button
                    disabled={!isValid}
                    type="submit"
                    size="large"
                    variant="contained"
                    fullWidth
                >
                    Войти
                </Button>
            </form>
        </Paper>
    )
}

export default Login