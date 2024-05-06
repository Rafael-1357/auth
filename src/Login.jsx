import { useState } from "react";
import { Input } from "./components/ui/input";
import { CardContent, CardDescription, CardFooter, Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Loader2Icon } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod";

const formLoginSchema = z.object({
  username: z.string()
    .min(5, { message: 'Usuário deve ter no mínimo 5 letras' })
    .max(25, { message: 'Usuário dever ter no máximo 24 letras' })
    .regex(/^[A-Za-z]+$/i, { message: 'O campo usuário permite somente letras' }),
  password: z.string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
    .max(24, { message: 'A senha deve ter no máximo 24 caracteres' }),
})

export function Login() {

  const [errLogin, setErrLogin] = useState('');
  const [authRequest, setAuthRequest] = useState(false);

  const formLogin = useForm({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      username: '',
      password: '',
    }
  })

  async function onSubmit(data) {

    setAuthRequest(true)

    const response = await fetch('http://localhost:3000/api/auth', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    const dataResponse = await response.json();

    if (dataResponse.err != '') {
      return setErrLogin(dataResponse.err);
    };

    localStorage.setItem('token', dataResponse.result)
  }

  return (
    <>
      <Form {...formLogin}>
        <form onSubmit={formLogin.handleSubmit(onSubmit)}>
          <div className="flex flex-col min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
            <div className="w-full max-w-md space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight">Faça login em sua conta</h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Digite seu usuário e senha abaixo para acessar sua conta.
                </p>
              </div>
              <Card>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <FormField
                      control={formLogin.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite seu usuário" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={formLogin.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>Senha</FormLabel>
                            <a className="text-sm font-medium text-gray-900 hover:underline dark:text-gray-50" href="#">
                              Esqueceu a senha?
                            </a>
                          </div>
                          <FormControl>
                            <Input type='password' placeholder="Digite sua senha" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardDescription>
                  {
                    errLogin != '' && <p className="text-red-500 px-6 pb-6">• {errLogin}</p>
                  }
                </CardDescription>
                <CardFooter>
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={authRequest ? true : false}>
                    {
                      !authRequest
                        ? 'Entrar'
                        : <Loader2Icon className="animate-spin" />
                    }
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="pt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              Não tem uma conta?
              <a className="font-medium text-gray-900 pl-1 hover:underline dark:text-gray-50" href="#">
                Registre-se
              </a>
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}