# ds

Deno simple shell

## Usage

```ts
import { $, $$, $e, $o, $s } from "https://deno.land/x/simple_shell/mod.ts";

const list = $("ls -l");
const data = list.split("\n").slice(1).map((l) => l.split(/\s+/).at(-1));
$$`file ${data[0]!}`;
```

Requires `--unstable` flag
