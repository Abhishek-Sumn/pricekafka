"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from 'sonner';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Please select a demand level.",
    })
    .email(),
})

export function SelectForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You selected:",{
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="demand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Demand</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select how demand will affect price" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1" className="bg-green-800">Latent Demand</SelectItem>
                  <SelectItem value="3" className="bg-yellow-800">Stable Demand</SelectItem>
                  <SelectItem value="6" className="bg-orange-600">High Demand</SelectItem>
                  <SelectItem value="10" className="bg-red-800">Excess Demand</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-wrap ">
                Higher demand will affect price greatly  <br/>
                similar to when we try to book cab in office time
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" >Submit</Button>
      </form>
    </Form>
  )
}
