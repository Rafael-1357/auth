import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CardContent, CardDescription, CardFooter, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

import { Link, useNavigate } from "react-router-dom";

const formRegisterSchema = z.object({
  username: z.string()
    .min(5, { message: 'Usuário deve ter no mínimo 5 letras' })
    .max(25, { message: 'Usuário dever ter no máximo 24 letras' })
    .regex(/^[A-Za-z]+$/i, { message: 'O campo usuário permite somente letras' }),
    email: z.string().email('Insira um e-mail válido.'),
  password: z.string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
    .max(24, { message: 'A senha deve ter no máximo 24 caracteres' }),
  confirmPassword: z.string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
    .max(24, { message: 'A senha deve ter no máximo 24 caracteres' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas devem ser iguais.",
  path: ["confirmPassword"],
});

export function Register() {

  const [errRegister, setErrRegister] = useState('');
  const [authRequest, setAuthRequest] = useState(false);

  const navegate = useNavigate()

  const formRegister = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  async function onSubmit(data) {

    console.log(data)

    // setAuthRequest(true)

    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    const dataResponse = await response.json();

    console.log(dataResponse)
  }

  return (
    <>
      <Form {...formRegister}>
        <form onSubmit={formRegister.handleSubmit(onSubmit)}>
          <div className="flex flex-col min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
            <div className="w-full max-w-md space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight">Faça seu cadastro</h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Digite seu usuário e senha abaixo para criar sua conta.
                </p>
              </div>
              <Card>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <FormField
                      control={formRegister.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite o usuário" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={formRegister.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite o e-mail" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={formRegister.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>Senha</FormLabel>
                          </div>
                          <FormControl>
                            <Input type='password' placeholder="Digite a senha" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={formRegister.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>Confirmar senha</FormLabel>
                          </div>
                          <FormControl>
                            <Input type='password' placeholder="Confirme a senha" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardDescription>
                  {
                    errRegister != '' && <p className="text-red-500 px-6 pb-6">• {errRegister}</p>
                  }
                </CardDescription>
                <CardFooter>
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={authRequest ? true : false}>
                    {
                      !authRequest
                        ? 'Cadastrar'
                        : <Loader2Icon className="animate-spin" />
                    }
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="pt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              Já possui conta?
              <Link to={'/'} className="font-medium text-gray-900 pl-1 hover:underline dark:text-gray-50">
                Entre
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}