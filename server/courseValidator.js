import { z } from "zod";

const coursenValidator = z.object({
    name: z.string({message: "400"}).min(3),
  });

  export { coursenValidator }