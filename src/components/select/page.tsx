"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormDescription, FormField,
  FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";

import { updateDemand, SetUpdatedPrice } from "@/store/store";
import { useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const FormSchema = z.object({
  demand: z.string().min(1, "Please select a demand level."),
});

export function SelectForm() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { demand: "0" }, // Must match type expected by Select (string)
  });

  const { reset } = form;

  useEffect(() => {
    async function fetchGoal() {
      const res = await axios.get(`${API_URL}/Price/getState?value=demand`);
      const demandValue = String(res.data); // Ensure it's a string
     
      reset({ demand: demandValue });
    }
    fetchGoal();
  }, [reset]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
       await axios.get(`${API_URL}/Price/updateDemand`, {
        params: { Demand: data.demand },
        headers: { Accept: "*/*" },
      });

      updateDemand(data.demand);
      await SetUpdatedPrice();
      toast.success("Demand Updated Successfully");

    } catch (err: unknown) {
      toast.error("Error", {
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(
                err instanceof Error ? err.message : 'Unknown error',
                null,
                2
              )}
            </code>
          </pre>
        ),
      });
    }
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
              <Select onValueChange={field.onChange} value={field.value}>
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
              <FormDescription>
                Higher demand will affect price greatly. <br />
                Similar to when we try to book a cab during office hours.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
