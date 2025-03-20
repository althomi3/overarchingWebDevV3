import { z } from "zod";

const questionValidator = z.object({
    title: z.string({message: "400"}).min(3),
    text: z.string({message: "400"}).min(3),
  });

  export { questionValidator }