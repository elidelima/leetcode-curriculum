import { z } from "zod";

import { goodyBaseParser } from "./goodyBaseParser";
import { nonBlankStringParser } from "./nonBlankStringParser";

export const python3GoodyParser = goodyBaseParser.extend({
  // TODO: remove -- globalModuleDeclarations are a TypeScript concept
  globalModuleDeclarations: z.array(nonBlankStringParser),
  language: z.literal("python3"),
});

export type Python3Goody = z.infer<typeof python3GoodyParser>;