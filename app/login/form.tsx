"use client";

import { FormEvent } from "react";
import {signIn} from 'next-auth/react';
import { useRouter } from "next/navigation";

export default function Form() {
    const router = useRouter();
    
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const response = await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false
    });
    console.log({response});

    if(!response?.error) {
        router.push('/');
        router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      action=""
      className="flex flex-col gap-2 mx-auto max-w-md mt-10"
    >
      <input className="border border-black" name="email" type="email" />
      <input className="border border-black" name="password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
}
